import { supabase } from "@/lib/supabase";

export type LetterType = "to" | "from";

/** A moderated, publicly visible letter (from the public_letters view). Never includes a name. */
export interface PublicLetter {
  id: string;
  created_at: string;
  letter_type: LetterType;
  quality: string;
  letter_body: string;
  city_state: string | null;
  approved_at: string | null;
}

export interface LetterSubmission {
  letterType: LetterType;
  letterBody: string;
  quality: string;
  /** TO letters: "because ___" */
  reason?: string;
  /** TO letters: "please use it to help ___" */
  helpCause?: string;
  /** FROM letters: what the Tooth Fairy did with the quality */
  fairyAction?: string;
  childFirstName: string;
  cityState: string;
  parentEmail: string;
  parentConsent: boolean;
  /** Show (anonymously — no name) on the public Wall of Stories */
  wallOptIn: boolean;
  /** OK to feature the child's first name + city on our own social channels */
  socialFeatureConsent: boolean;
  /** Hidden anti-spam field — must be empty for real people. */
  honeypot: string;
}

/** Fetch approved, wall-opted-in letters for the public gallery. Returns [] if Supabase isn't configured. */
export async function fetchApprovedLetters(limit = 60): Promise<PublicLetter[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("public_letters")
    .select("id, created_at, letter_type, quality, letter_body, city_state, approved_at")
    .order("approved_at", { ascending: false })
    .limit(limit);
  if (error) throw error;
  return data ?? [];
}

/**
 * Submit a letter via the submit-letter Netlify Function, which inserts it
 * (server-side, using the Supabase service role — no client-side RLS
 * dependency for writes) and emails the moderator a one-click approve/reject
 * link. The letter lands as `pending` and is invisible until approved.
 */
export async function submitLetter(s: LetterSubmission): Promise<void> {
  const res = await fetch("/.netlify/functions/submit-letter", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      letterType: s.letterType,
      letterBody: s.letterBody.trim(),
      quality: s.quality.trim(),
      reason: s.reason?.trim() || undefined,
      helpCause: s.helpCause?.trim() || undefined,
      fairyAction: s.fairyAction?.trim() || undefined,
      childFirstName: s.childFirstName.trim() || undefined,
      cityState: s.cityState.trim() || undefined,
      parentEmail: s.parentEmail.trim() || undefined,
      parentConsent: s.parentConsent,
      wallOptIn: s.wallOptIn,
      socialFeatureConsent: s.socialFeatureConsent,
      honeypot: s.honeypot,
    }),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || "Something went wrong submitting your letter.");
  }
}
