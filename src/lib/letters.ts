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
 * Submit a letter. It lands as `pending` and is invisible until a moderator
 * approves it. RLS also silently rejects the insert if the honeypot is filled
 * or consent is missing.
 */
export async function submitLetter(s: LetterSubmission): Promise<void> {
  if (!supabase) throw new Error("Submissions aren't available right now. Please try again later.");
  const { error } = await supabase.from("letters").insert({
    letter_type: s.letterType,
    letter_body: s.letterBody.trim(),
    quality: s.quality.trim(),
    reason: s.reason?.trim() || null,
    help_cause: s.helpCause?.trim() || null,
    fairy_action: s.fairyAction?.trim() || null,
    child_first_name: s.childFirstName.trim() || null,
    city_state: s.cityState.trim() || null,
    parent_email: s.parentEmail.trim() || null,
    parent_consent: s.parentConsent,
    wall_opt_in: s.wallOptIn,
    social_feature_consent: s.socialFeatureConsent,
    honeypot: s.honeypot,
    status: "pending",
  });
  if (error) throw error;
}
