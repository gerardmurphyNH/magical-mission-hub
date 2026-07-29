export interface JoinWorkshopParams {
  email: string;
  firstName?: string;
  virtue?: string;
  /** Which page/form this signup came from, e.g. "homepage", "teacher_resources" */
  source: string;
  /** Hidden anti-spam field — must be empty for real people. */
  honeypot?: string;
}

export interface JoinWorkshopResult {
  ok: true;
  /** false if this email was already a member (no duplicate email sent) */
  isNew: boolean;
}

/**
 * Joins the Workshop mailing list via the join-workshop Netlify Function,
 * which stores the signup in Supabase (service role — no client-side RLS
 * dependency) and, for genuinely new members, sends a welcome email plus a
 * heartbeat notification to the team.
 */
export async function joinWorkshop(params: JoinWorkshopParams): Promise<JoinWorkshopResult> {
  const res = await fetch("/.netlify/functions/join-workshop", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: params.email.trim(),
      firstName: params.firstName?.trim() || undefined,
      virtue: params.virtue?.trim() || undefined,
      source: params.source,
      honeypot: params.honeypot ?? "",
    }),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || "Something went wrong joining the Workshop.");
  }
  return res.json();
}
