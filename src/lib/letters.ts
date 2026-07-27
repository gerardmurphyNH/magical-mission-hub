import { supabase } from "@/lib/supabase";

/** A moderated, publicly visible letter (from the public_letters view). */
export interface PublicLetter {
  id: string;
  created_at: string;
  child_first_name: string | null;
  quality: string;
  letter_body: string;
  approved_at: string | null;
}

export interface LetterSubmission {
  childFirstName: string;
  quality: string;
  letterBody: string;
  parentEmail: string;
  parentConsent: boolean;
  /** Hidden anti-spam field — must be empty for real people. */
  honeypot: string;
}

/** Fetch approved letters for the public gallery. Returns [] if Supabase isn't configured. */
export async function fetchApprovedLetters(limit = 60): Promise<PublicLetter[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("public_letters")
    .select("id, created_at, child_first_name, quality, letter_body, approved_at")
    .order("approved_at", { ascending: false })
    .limit(limit);
  if (error) throw error;
  return data ?? [];
}

/**
 * Submit a letter. It lands as `pending` and is invisible until a moderator
 * approves it in Supabase Studio. RLS also silently rejects the insert if the
 * honeypot is filled or consent is missing.
 */
export async function submitLetter(s: LetterSubmission): Promise<void> {
  if (!supabase) throw new Error("Submissions aren't available right now. Please try again later.");
  const { error } = await supabase.from("letters").insert({
    child_first_name: s.childFirstName.trim() || null,
    quality: s.quality.trim(),
    letter_body: s.letterBody.trim(),
    parent_email: s.parentEmail.trim() || null,
    parent_consent: s.parentConsent,
    honeypot: s.honeypot,
    status: "pending",
  });
  if (error) throw error;
}
