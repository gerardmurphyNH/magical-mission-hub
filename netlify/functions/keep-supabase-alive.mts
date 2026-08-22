import type { Config } from "@netlify/functions";
import { Resend } from "resend";
import { supabaseAdmin, jsonResponse } from "./_shared.mts";

// Supabase's own docs describe the free-tier pause threshold loosely as "a few
// requests each day over the previous week" - twice-weekly wasn't enough in
// practice. This runs daily and does a normal row-returning read (not a
// HEAD/count-only request) so it looks unambiguously like real API traffic.
async function alertOnFailure(detail: string) {
  const resendKey = process.env.RESEND_API_KEY;
  const moderatorEmail = process.env.MODERATOR_EMAIL;
  const fromAddress = process.env.EMAIL_FROM || "Wiggly Tooth Workshop <letters@wigglytoothworkshop.com>";
  if (!resendKey || !moderatorEmail) return;
  try {
    await new Resend(resendKey).emails.send({
      from: fromAddress,
      to: moderatorEmail,
      subject: "Supabase keep-alive ping failed",
      html: `<p>The keep-supabase-alive scheduled function failed:</p><pre>${detail}</pre><p>The Supabase project may pause if this keeps failing.</p>`,
    });
  } catch (e) {
    console.error("keep-supabase-alive: failure alert email also failed:", e);
  }
}

export default async (): Promise<Response> => {
  let supabase: ReturnType<typeof supabaseAdmin>;
  try {
    supabase = supabaseAdmin();
  } catch (e) {
    console.error("keep-supabase-alive misconfigured:", e);
    await alertOnFailure(String(e));
    return jsonResponse(500, { ok: false, error: "Supabase admin client not configured." });
  }

  const { error } = await supabase.from("workshop_members").select("id").limit(1);

  if (error) {
    console.error("keep-supabase-alive query failed:", error);
    await alertOnFailure(error.message);
    return jsonResponse(500, { ok: false, error: error.message });
  }

  console.log("keep-supabase-alive: ping succeeded");
  return jsonResponse(200, { ok: true });
};

export const config: Config = {
  schedule: "0 9 * * *",
};
