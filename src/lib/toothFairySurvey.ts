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
// don't report a separate first-tooth figure outside the US). Kept as a cited
// reference figure - not what we actually recommend handing over (see
// getRecommendedRange below for that).
export const FIRST_TOOTH_MULTIPLIER = 7.17 / 5.84;

export function deltaDentalReferenceRate(currency: Currency, isFirstTooth: boolean): number {
  const { base } = CURRENCIES[currency];
  const amount = isFirstTooth ? base * FIRST_TOOTH_MULTIPLIER : base;
  return currency === "JPY" ? Math.round(amount) : Math.round(amount * 100) / 100;
}

export function formatAmount(currency: Currency, amount: number): string {
  const { symbol } = CURRENCIES[currency];
  return currency === "JPY" ? `${symbol}${Math.round(amount)}` : `${symbol}${amount.toFixed(2)}`;
}

// --- Our actual recommendation: a rounded, human range, not a raw average ---
//
// Real parents don't leave $7.17 - they leave a $5 or a $10. So instead of
// reporting the precise survey figure as "the answer," we round to whatever
// families actually hand over, informed by three real patterns:
//   1. Round denominations - the ladders below only contain amounts anyone
//      would actually have in a wallet or piggy bank.
//   2. Age - younger kids are just as delighted by a smaller amount; older
//      kids (losing molars around 10+) expect more, since a $1 bill means
//      less to a 12-year-old than a 5-year-old.
//   3. First tooth premium - the milestone tooth typically earns one step up.
// USD gets its own ladder a step above CAD/GBP/EUR, reflecting that the US
// figure in Delta Dental's own data runs consistently higher than the
// international figures (which land within a few cents of each other once
// converted). JPY uses yen-appropriate round denominations at the same tier
// positions as the CAD/GBP/EUR ladder (Japan's converted figure was the poll's
// lowest, so it's treated as the non-premium base rather than the US's).
const INTL_LADDER = [2, 5, 10, 15];
const USD_LADDER = [5, 10, 15, 20];
const JPY_LADDER = [100, 500, 1000, 2000];

function ladderFor(currency: Currency): number[] {
  if (currency === "USD") return USD_LADDER;
  if (currency === "JPY") return JPY_LADDER;
  return INTL_LADDER;
}

/** 0-3: higher = an older child and/or a first tooth. `age` is optional - unspecified assumes a typical (tier 1) age. */
export function ageToothTier(age: number | undefined, isFirstTooth: boolean): number {
  let tier: number;
  if (age === undefined || Number.isNaN(age)) tier = 1;
  else if (age <= 6) tier = 0;
  else if (age <= 9) tier = 1;
  else tier = 2;
  if (isFirstTooth) tier += 1;
  return Math.min(tier, 3);
}

export interface RecommendedRange {
  low: number;
  high: number;
  tier: number;
}

/** Our actual recommendation: a rounded low-high range, not a single precise figure. */
export function getRecommendedRange(
  currency: Currency,
  age: number | undefined,
  isFirstTooth: boolean
): RecommendedRange {
  const ladder = ladderFor(currency);
  const tier = ageToothTier(age, isFirstTooth);
  const low = ladder[tier];
  const high = ladder[Math.min(tier + 1, ladder.length - 1)];
  return { low, high, tier };
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
