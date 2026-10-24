// @vitest-environment node
import { beforeEach, describe, expect, it, vi } from "vitest";

const db = vi.hoisted(() => ({
  letters: new Map<string, Record<string, unknown>>(),
  updates: [] as { id: string; patch: Record<string, unknown> }[],
  emails: [] as { to: string; html: string }[],
}));

vi.mock("../../netlify/functions/_shared.mts", () => ({
  supabaseAdmin: () => ({
    from: () => ({
      select: () => ({
        eq: (_col: string, val: string) => ({
          maybeSingle: async () => ({ data: db.letters.get(val) ?? null, error: null }),
        }),
      }),
      update: (patch: Record<string, unknown>) => ({
        eq: async (_col: string, val: string) => {
          db.updates.push({ id: val, patch });
          const row = db.letters.get(val);
          if (row) Object.assign(row, patch);
          return { error: null };
        },
      }),
      insert: (payload: Record<string, unknown>) => ({
        select: () => ({
          single: async () => {
            const row = { id: "new-id", ...payload };
            db.letters.set("new-id", row);
            return { data: row, error: null };
          },
        }),
      }),
    }),
  }),
  verifyModerationToken: (_id: string, action: string, token: string) =>
    token === "good" && (action === "approve" || action === "reject"),
  moderationLink: (id: string, action: string) =>
    `https://example.test/.netlify/functions/moderate-letter?id=${id}&action=${action}&token=good`,
  siteUrl: () => "https://example.test",
  htmlResponse: (status: number, html: string) =>
    new Response(html, { status, headers: { "Content-Type": "text/html; charset=utf-8" } }),
  jsonResponse: (status: number, body: unknown) =>
    new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } }),
}));

vi.mock("resend", () => ({
  Resend: class {
    emails = {
      send: async (args: { to: string; html: string }) => {
        db.emails.push(args);
        return {};
      },
    };
  },
}));

import moderate from "../../netlify/functions/moderate-letter.mts";
import submitLetter from "../../netlify/functions/submit-letter.mts";

const BASE = "https://example.test/.netlify/functions/moderate-letter";
const open = (id: string, action: string, token = "good") =>
  moderate(new Request(`${BASE}?id=${id}&action=${action}&token=${token}`));
const confirm = (id: string, action: string, token = "good") =>
  moderate(
    new Request(BASE, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ id, action, token }),
    }),
  );

const addLetter = (over: Record<string, unknown> = {}) =>
  db.letters.set("L1", { id: "L1", status: "pending", quality: "Patience", letter_type: "from", wall_opt_in: true, ...over });

beforeEach(() => {
  db.letters.clear();
  db.updates.length = 0;
  db.emails.length = 0;
});

describe("moderate-letter: two-step approval", () => {
  it("opening the emailed link (GET) shows a confirm page and changes nothing", async () => {
    addLetter();
    for (const action of ["approve", "reject"]) {
      const res = await open("L1", action);
      const html = await res.text();
      expect(res.status).toBe(200);
      expect(html).toContain('<form method="post">');
      expect(html).toContain(action === "approve" ? "Yes, approve" : "Yes, reject");
    }
    expect(db.updates).toEqual([]);
    expect(db.letters.get("L1")!.status).toBe("pending");
  });

  it("confirming (POST) approves and sets approved_at; family opted in is live on the wall", async () => {
    addLetter();
    const res = await confirm("L1", "approve");
    const html = await res.text();
    expect(res.status).toBe(200);
    expect(html).toContain("now live on the Wall of Stories");
    expect(db.updates).toHaveLength(1);
    expect(db.updates[0].patch.status).toBe("approved");
    expect(typeof db.updates[0].patch.approved_at).toBe("string");
  });

  it("confirming a reject sets rejected with no approved_at", async () => {
    addLetter();
    const html = await (await confirm("L1", "reject")).text();
    expect(html).toContain("will not be shown publicly");
    expect(db.updates[0].patch).toEqual({ status: "rejected", approved_at: null });
  });

  it("an opted-out family: confirm page warns up front, and approval says it is NOT on the wall", async () => {
    addLetter({ wall_opt_in: false });
    const preview = await (await open("L1", "approve")).text();
    expect(preview).toContain("chose <strong>not</strong> to show this story");

    const html = await (await confirm("L1", "approve")).text();
    expect(html).toContain("<strong>not</strong> appear on the Wall of Stories");
    expect(html).not.toContain("now live");
    expect(db.updates[0].patch.status).toBe("approved");
  });

  it("an already-approved opted-out letter explains why it is not visible", async () => {
    addLetter({ status: "approved", wall_opt_in: false });
    const html = await (await open("L1", "approve")).text();
    expect(html).toContain("Already handled");
    expect(html).toContain("chose <strong>not</strong> to show this story");
    expect(db.updates).toEqual([]);
  });

  it("an already-handled letter cannot be changed by a second POST", async () => {
    addLetter({ status: "rejected" });
    const html = await (await confirm("L1", "approve")).text();
    expect(html).toContain("Already handled");
    expect(db.updates).toEqual([]);
  });

  it("rejects bad tokens on both GET and POST before touching the database", async () => {
    addLetter();
    expect((await open("L1", "approve", "bad")).status).toBe(403);
    expect((await confirm("L1", "approve", "bad")).status).toBe(403);
    expect(db.updates).toEqual([]);
  });

  it("escapes user-supplied quality text in the pages", async () => {
    addLetter({ quality: '<script>alert("x")</script>' });
    const html = await (await open("L1", "approve")).text();
    expect(html).not.toContain("<script>alert");
    expect(html).toContain("&lt;script&gt;");
  });

  it("404s an unknown letter and 405s other methods", async () => {
    expect((await open("nope", "approve")).status).toBe(404);
    expect((await moderate(new Request(BASE, { method: "DELETE" }))).status).toBe(405);
  });
});

describe("submit-letter: moderator email shows the wall opt-in", () => {
  const submit = (wallOptIn: boolean) => {
    process.env.RESEND_API_KEY = "re_test";
    return submitLetter(
      new Request("https://example.test/.netlify/functions/submit-letter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          letterType: "to",
          letterBody: "Dear Tooth Fairy",
          quality: "Kindness",
          parentConsent: true,
          wallOptIn,
          socialFeatureConsent: false,
        }),
      }),
    );
  };

  it("flags an opted-out family in the email", async () => {
    expect((await submit(false)).status).toBe(200);
    const html = db.emails[0].html;
    expect(html).toContain("family opted OUT");
    expect(html).toContain("confirmation page");
  });

  it("flags an opted-in family in the email", async () => {
    expect((await submit(true)).status).toBe(200);
    expect(db.emails[0].html).toContain("family opted in");
  });
});
