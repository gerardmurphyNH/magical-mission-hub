import type { Config } from "@netlify/functions";
import { supabaseAdmin, verifyModerationToken, htmlResponse } from "./_shared.mts";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const page = (title: string, body: string, extra = ""): string => `<!doctype html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<style>
  body { font-family: Georgia, 'Times New Roman', serif; background: #191633; color: #F5F3FF; margin: 0; padding: 0; }
  .card { max-width: 420px; margin: 15vh auto 0; padding: 32px; text-align: center; }
  h1 { font-size: 22px; margin-bottom: 12px; }
  p { color: #C9C2F0; line-height: 1.6; }
  a { color: #FBBF24; }
  .note { background: #2A2550; border-radius: 10px; padding: 10px 14px; font-size: 14px; }
  button { font-family: system-ui, sans-serif; font-size: 15px; font-weight: 600; color: #fff; border: 0; border-radius: 999px; padding: 12px 26px; cursor: pointer; }
  button.approve { background: #16a34a; }
  button.reject { background: #dc2626; }
</style></head>
<body><div class="card"><h1>${title}</h1><p>${body}</p>${extra}<p><a href="https://wigglytoothworkshop.com/letters-to-the-tooth-fairy">View the Wall of Stories →</a></p></div></body></html>`;

const OPTED_OUT_NOTE =
  "The family chose <strong>not</strong> to show this story on the Wall of Stories, so it stays private either way.";

export default async (req: Request): Promise<Response> => {
  if (req.method !== "GET" && req.method !== "POST") {
    return htmlResponse(405, page("Not allowed", "This link can only be opened or confirmed."));
  }

  // GET opens a harmless confirmation page; only the POST from that page's
  // button changes anything. Email security scanners and link previewers
  // prefetch GET links, and they used to be able to approve or reject a letter
  // before a human ever saw it.
  let id = "";
  let action = "";
  let token = "";
  if (req.method === "POST") {
    const form = await req.formData().catch(() => null);
    id = String(form?.get("id") ?? "");
    action = String(form?.get("action") ?? "");
    token = String(form?.get("token") ?? "");
  } else {
    const url = new URL(req.url);
    id = url.searchParams.get("id") || "";
    action = url.searchParams.get("action") || "";
    token = url.searchParams.get("token") || "";
  }

  if (!id || !verifyModerationToken(id, action, token)) {
    return htmlResponse(403, page("Link not valid", "This moderation link is invalid or has expired."));
  }

  let supabase: ReturnType<typeof supabaseAdmin>;
  try {
    supabase = supabaseAdmin();
  } catch (e) {
    console.error("moderate-letter misconfigured:", e);
    return htmlResponse(500, page("Not configured", "The moderation system isn't fully set up yet."));
  }

  const { data: existing, error: fetchError } = await supabase
    .from("letters")
    .select("id, status, quality, letter_type, wall_opt_in")
    .eq("id", id)
    .maybeSingle();

  if (fetchError || !existing) {
    return htmlResponse(404, page("Not found", "This letter could not be found — it may have already been removed."));
  }

  const optedOut = existing.wall_opt_in === false;
  const quality = esc(String(existing.quality ?? ""));

  if (existing.status !== "pending") {
    const extra = existing.status === "approved" && optedOut ? `<p class="note">${OPTED_OUT_NOTE}</p>` : "";
    return htmlResponse(
      200,
      page("Already handled", `This letter was already marked <strong>${esc(existing.status)}</strong>. No changes made.`, extra),
    );
  }

  const approving = action === "approve";

  if (req.method === "GET") {
    const typeLabel = existing.letter_type === "from" ? "FROM the Tooth Fairy" : "TO the Tooth Fairy";
    const note = approving && optedOut ? `<p class="note">${OPTED_OUT_NOTE} Approving just records your OK.</p>` : "";
    const form = `${note}<form method="post">
      <input type="hidden" name="id" value="${esc(id)}">
      <input type="hidden" name="action" value="${esc(action)}">
      <input type="hidden" name="token" value="${esc(token)}">
      <button type="submit" class="${approving ? "approve" : "reject"}">${approving ? "Yes, approve" : "Yes, reject"}</button>
    </form>`;
    return htmlResponse(
      200,
      page(
        approving ? "Approve this story?" : "Reject this story?",
        `The “${quality}” letter ${typeLabel}.`,
        form,
      ),
    );
  }

  const newStatus = approving ? "approved" : "rejected";
  const { error: updateError } = await supabase
    .from("letters")
    .update({ status: newStatus, approved_at: newStatus === "approved" ? new Date().toISOString() : null })
    .eq("id", id);

  if (updateError) {
    return htmlResponse(500, page("Something went wrong", "Please try again, or handle it directly in Supabase Studio."));
  }

  if (newStatus === "rejected") {
    return htmlResponse(200, page("Rejected", `The “${quality}” story will not be shown publicly.`));
  }
  return optedOut
    ? htmlResponse(
        200,
        page("Approved", `The “${quality}” story is approved, but it will <strong>not</strong> appear on the Wall of Stories: the family chose not to share it there.`),
      )
    : htmlResponse(200, page("Approved ✨", `The “${quality}” story is now live on the Wall of Stories.`));
};

export const config: Config = {
  path: "/.netlify/functions/moderate-letter",
};
