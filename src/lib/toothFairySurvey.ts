import { supabase } from "@/lib/supabase";

export type Currency = "USD" | "CAD" | "GBP" | "EUR" | "JPY";

export const CURRENCIES: Record<Currency, { symbol: string; label: string; base: number }> = {
  USD: { symbol: "$", label: "US Dollars", base: 5.84 },
  CAD: { symbol: "C$", label: "Canadian Dollars", base: 8.0 },
  GBP: { symbol: "£", label: "British Pounds", base: 4.34 },
  EUR: { symbol: "€", label: "Euros", base: 4.96 },
  JPY: { symbol: "¥", label: "Japanese Yen", base: 904 },
};

// Delta Dental's 2026 Original Tooth Fairy Poll: national US average $5.84,
// first-tooth average $7.17 - about a 23% premium. Applied to every currency's
// base rate above as the best available proxy (the poll's country breakdowns
// don't report a separate first-tooth figure outside the US).
export const FIRST_TOOTH_MULTIPLIER = 7.17 / 5.84;

export function calculateGoingRate(currency: Currency, isFirstTooth: boolean): number {
  const { base } = CURRENCIES[currency];
  const amount = isFirstTooth ? base * FIRST_TOOTH_MULTIPLIER : base;
  return currency === "JPY" ? Math.round(amount) : Math.round(amount * 100) / 100;
}

export function formatAmount(currency: Currency, amount: number): string {
  const { symbol } = CURRENCIES[currency];
  return currency === "JPY" ? `${symbol}${Math.round(amount)}` : `${symbol}${amount.toFixed(2)}`;
}

export interface SurveyStats {
  currency: Currency;
  is_first_tooth: boolean;
  response_count: number;
  average_amount: number;
}

/** Fetch aggregated (never individual) survey stats for one currency + first-tooth bucket. */
export async function fetchToothFairyStats(
  currency: Currency,
  isFirstTooth: boolean
): Promise<SurveyStats | null> {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("public_tooth_fairy_stats")
    .select("currency, is_first_tooth, response_count, average_amount")
    .eq("currency", currency)
    .eq("is_first_tooth", isFirstTooth)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export interface SurveySubmission {
  amount: number;
  currency: Currency;
  isFirstTooth: boolean;
  childAge?: number;
  /** Hidden anti-spam field — must be empty for real people. */
  honeypot: string;
}

/** Submit a "what did you actually leave" answer via the Netlify Function (service role, bypasses RLS). */
export async function submitToothFairyAmount(s: SurveySubmission): Promise<void> {
  const res = await fetch("/.netlify/functions/submit-tooth-fairy-amount", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      amount: s.amount,
      currency: s.currency,
      isFirstTooth: s.isFirstTooth,
      childAge: s.childAge,
      honeypot: s.honeypot,
    }),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || "Something went wrong submitting your answer.");
  }
}
