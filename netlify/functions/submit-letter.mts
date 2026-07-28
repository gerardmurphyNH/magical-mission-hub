import type { Config } from "@netlify/functions";
import { Resend } from "resend";
import { supabaseAdmin, moderationLink, siteUrl, jsonResponse } from "./_shared.mts";

interface LetterPayload {
  letterType: "to" | "from";
  letterBody: string;
  quality: string;
  reason?: string;
  helpCause?: string;
  fairyAction?: string;
  childFirstName?: string;
  cityState?: string;
  parentEmail?: string;
  parentConsent: boolean;
  wallOptIn: boolean;
  socialFeatureConsent: boolean;
  honeypot?: string;
}

const isNonEmptyString = (v: unknown): v is string => typeof v === "string" && v.trim().length > 0;

function validate(body: Partial<LetterPayload>): string | null {
  if (body.letterType !== "to" && body.letterType !== "from") return "Invalid letter type.";
  if (!isNonEmptyString(body.letterBody) || body.letterBody.length > 1200) return "Invalid letter body.";
  if (!isNonEmptyString(body.quality) || body.quality.length > 60) return "Invalid quality.";
  if (body.reason && body.reason.length > 300) return "Reason is too long.";
  if (body.helpCause && body.helpCause.length > 300) return "Help cause is too long.";
  if (body.fairyAction && body.fairyAction.length > 300) return "Fairy action is too long.";
  if (body.childFirstName && body.childFirstName.length > 40) return "First name is too long.";
  if (body.cityState && body.cityState.length > 80) return "City/state is too long.";
  if (body.parentConsent !== true) return "Parent consent is required.";
  if (body.honeypot) return "Rejected.";
  return null;
}

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function moderationEmailHtml(row: { id: string; letter_type: string; quality: string; letter_body: string; child_first_name: string | null; city_state: string | null; parent_email: string | null }): string {
  const approveUrl = moderationLink(row.id, "approve");
  const rejectUrl = moderationLink(row.id, "reject");
  const typeLabel = row.letter_type === "to" ? "TO the Tooth Fairy" : "FROM the Tooth Fairy";
  return `
    <div style="font-family: Georgia, serif; max-width: 480px; margin: 0 auto; color: #2A2540;">
      <p style="font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #8B6F1A;">New letter ${typeLabel}</p>
      <p style="font-size: 14px;"><strong>Quality:</strong> ${escapeHtml(row.quality)}</p>
      ${row.child_first_name ? `<p style="font-size: 14px;"><strong>Child's first name:</strong> ${escapeHtml(row.child_first_name)}</p>` : ""}
      ${row.city_state ? `<p style="font-size: 14px;"><strong>City/state:</strong> ${escapeHtml(row.city_state)}</p>` : ""}
      ${row.parent_email ? `<p style="font-size: 14px;"><strong>Parent email:</strong> ${escapeHtml(row.parent_email)}</p>` : ""}
      <blockquote style="border-left: 3px solid #C9A227; padding-left: 12px; margin: 16px 0; font-size: 15px; line-height: 1.6;">
        ${escapeHtml(row.letter_body)}
      </blockquote>
      <div style="margin: 24px 0;">
        <a href="${approveUrl}" style="display: inline-block; background: #16a34a; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 999px; font-family: system-ui, sans-serif; font-size: 14px; font-weight: 600; margin-right: 10px;">Approve</a>
        <a href="${rejectUrl}" style="display: inline-block; background: #dc2626; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 999px; font-family: system-ui, sans-serif; font-size: 14px; font-weight: 600;">Reject</a>
      </div>
      <p style="font-size: 11px; color: #8B6F1A; font-family: system-ui, sans-serif;">One tap, no login needed. Submission ID: ${row.id}</p>
    </div>`;
}

export default async (req: Request): Promise<Response> => {
  if (req.method !== "POST") return jsonResponse(405, { error: "Method not allowed" });

  let body: Partial<LetterPayload>;
  try {
    body = (await req.json()) as Partial<LetterPayload>;
  } catch {
    return jsonResponse(400, { error: "Invalid JSON body." });
  }

  const validationError = validate(body);
  if (validationError) return jsonResponse(400, { error: validationError });

  let supabase: ReturnType<typeof supabaseAdmin>;
  try {
    supabase = supabaseAdmin();
  } catch (e) {
    console.error("submit-letter misconfigured:", e);
    return jsonResponse(500, { error: "Submissions aren't available right now. Please try again later." });
  }

  const { data: row, error } = await supabase
    .from("letters")
    .insert({
      letter_type: body.letterType,
      letter_body: body.letterBody!.trim(),
      quality: body.quality!.trim(),
      reason: body.reason?.trim() || null,
      help_cause: body.helpCause?.trim() || null,
      fairy_action: body.fairyAction?.trim() || null,
      child_first_name: body.childFirstName?.trim() || null,
      city_state: body.cityState?.trim() || null,
      parent_email: body.parentEmail?.trim() || null,
      parent_consent: true,
      wall_opt_in: body.wallOptIn !== false,
      social_feature_consent: body.socialFeatureConsent === true,
      status: "pending",
    })
    .select("id, letter_type, quality, letter_body, child_first_name, city_state, parent_email")
    .single();

  if (error || !row) {
    console.error("submit-letter insert failed:", error);
    return jsonResponse(500, { error: "Could not save the letter. Please try again." });
  }

  // Best-effort emails — a failure here shouldn't fail the submission, since
  // the letter is already safely stored and awaiting moderation either way.
  const resendKey = process.env.RESEND_API_KEY;
  const moderatorEmail = process.env.MODERATOR_EMAIL || "gerard@wigglytoothworkshop.com";
  const fromAddress = process.env.EMAIL_FROM || "Wiggly Tooth Workshop <letters@wigglytoothworkshop.com>";

  if (resendKey) {
    const resend = new Resend(resendKey);
    try {
      await resend.emails.send({
        from: fromAddress,
        to: moderatorEmail,
        subject: `New letter to review: ${row.quality} (${row.letter_type === "to" ? "TO" : "FROM"} the Tooth Fairy)`,
        html: moderationEmailHtml(row),
      });
    } catch (e) {
      console.error("Moderator notification email failed:", e);
    }

    if (row.parent_email) {
      try {
        await resend.emails.send({
          from: fromAddress,
          to: row.parent_email,
          subject: "We received your letter to the Tooth Fairy",
          html: `<div style="font-family: Georgia, serif; max-width: 480px; margin: 0 auto; color: #2A2540;">
            <p>Thank you for sharing your family's story with the Wiggly Tooth Workshop.</p>
            <p>A person reviews every letter before it's added to our
            <a href="${siteUrl()}/letters-to-the-tooth-fairy">Wall of Stories</a>. We'll be in touch once it's live.</p>
            <p style="color:#8B6F1A; font-size: 12px;">wigglytoothworkshop.com</p>
          </div>`,
        });
      } catch (e) {
        console.error("Parent confirmation email failed:", e);
      }
    }
  }

  return jsonResponse(200, { ok: true, id: row.id });
};

export const config: Config = {
  path: "/.netlify/functions/submit-letter",
};
