import type { Config } from "@netlify/functions";
import { Resend } from "resend";
import { supabaseAdmin, siteUrl, jsonResponse } from "./_shared.mts";

interface JoinPayload {
  email: string;
  firstName?: string;
  virtue?: string;
  source: string;
  honeypot?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(body: Partial<JoinPayload>): string | null {
  if (typeof body.email !== "string" || !EMAIL_RE.test(body.email)) return "Please enter a valid email address.";
  if (body.email.length > 200) return "Invalid email address.";
  if (body.firstName && body.firstName.length > 40) return "First name is too long.";
  if (body.virtue && body.virtue.length > 40) return "Invalid virtue.";
  if (typeof body.source !== "string" || !body.source.trim()) return "Missing source.";
  if (body.honeypot) return "Rejected.";
  return null;
}

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export default async (req: Request): Promise<Response> => {
  if (req.method !== "POST") return jsonResponse(405, { error: "Method not allowed" });

  let body: Partial<JoinPayload>;
  try {
    body = (await req.json()) as Partial<JoinPayload>;
  } catch {
    return jsonResponse(400, { error: "Invalid JSON body." });
  }

  const validationError = validate(body);
  if (validationError) return jsonResponse(400, { error: validationError });

  let supabase: ReturnType<typeof supabaseAdmin>;
  try {
    supabase = supabaseAdmin();
  } catch (e) {
    console.error("join-workshop misconfigured:", e);
    return jsonResponse(500, { error: "Signups aren't available right now. Please try again later." });
  }

  const email = body.email!.trim().toLowerCase();
  const firstName = body.firstName?.trim() || null;
  const virtue = body.virtue?.trim() || null;
  const source = body.source!.trim();

  // ON CONFLICT DO NOTHING via ignoreDuplicates: a returning row means this is
  // a brand new member; an empty result means they were already on the list.
  const { data: inserted, error } = await supabase
    .from("workshop_members")
    .upsert({ email, first_name: firstName, virtue, source }, { onConflict: "email", ignoreDuplicates: true })
    .select("id, email, first_name, source, created_at");

  if (error) {
    console.error("join-workshop insert failed:", error);
    return jsonResponse(500, { error: "Could not save your signup. Please try again." });
  }

  const isNew = (inserted?.length ?? 0) > 0;

  if (isNew) {
    const resendKey = process.env.RESEND_API_KEY;
    const moderatorEmail = process.env.MODERATOR_EMAIL || "gerard@wigglytoothworkshop.com";
    const fromAddress = process.env.EMAIL_FROM || "Wiggly Tooth Workshop <letters@wigglytoothworkshop.com>";

    if (resendKey) {
      const resend = new Resend(resendKey);

      // Welcome email — best-effort, doesn't fail the signup.
      try {
        await resend.emails.send({
          from: fromAddress,
          to: email,
          subject: "Welcome to the Workshop ✨",
          html: `<div style="font-family: Georgia, serif; max-width: 480px; margin: 0 auto; color: #2A2540;">
            <p>Hi ${firstName ? escapeHtml(firstName) : "friend"},</p>
            <p>You're in.</p>
            <p>The Wiggly Tooth Workshop is a quiet corner of the internet where new
            CeCe and Arlo stories, free printables, and the occasional sketch from
            the workshop find their way to you first. We don't send often - only
            when there's something worth sharing.</p>
            <p>In the meantime:</p>
            <ul>
              <li><a href="${siteUrl()}/watch">Watch the short film</a></li>
              <li><a href="${siteUrl()}/letters-to-the-tooth-fairy">Write your own letter to the Tooth Fairy</a></li>
            </ul>
            <p>With love,<br>The Wiggly Tooth Workshop</p>
            <p style="color:#8B6F1A; font-size: 12px;">wigglytoothworkshop.com</p>
          </div>`,
        });
      } catch (e) {
        console.error("Welcome email failed:", e);
      }

      // Heartbeat notification for Gerard, with a running total so it's a
      // genuine growth signal, not just a bare "someone signed up" ping.
      try {
        const { count } = await supabase
          .from("workshop_members")
          .select("id", { count: "exact", head: true });
        await resend.emails.send({
          from: fromAddress,
          to: moderatorEmail,
          subject: `New Workshop member${firstName ? `: ${firstName}` : ""}`,
          html: `<div style="font-family: Georgia, serif; max-width: 480px; margin: 0 auto; color: #2A2540;">
            <p>${firstName ? escapeHtml(firstName) : "Someone"} (${escapeHtml(email)}) just joined the Workshop from <strong>${escapeHtml(source)}</strong>.</p>
            ${virtue ? `<p>Virtue quiz result: <strong>${escapeHtml(virtue)}</strong></p>` : ""}
            <p style="font-size: 20px; margin-top: 20px;">You now have <strong>${count ?? "?"}</strong> Workshop members.</p>
          </div>`,
        });
      } catch (e) {
        console.error("Moderator heartbeat email failed:", e);
      }
    }
  }

  return jsonResponse(200, { ok: true, isNew });
};

export const config: Config = {
  path: "/.netlify/functions/join-workshop",
};
