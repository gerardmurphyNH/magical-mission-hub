import type { Config } from "@netlify/functions";
import { supabaseAdmin, jsonResponse } from "./_shared.mts";

const ALLOWED_CURRENCIES = new Set(["USD", "CAD", "GBP", "EUR", "JPY"]);

interface SurveyPayload {
  amount: number;
  currency: string;
  isFirstTooth: boolean;
  childAge?: number;
  honeypot?: string;
}

function validate(body: Partial<SurveyPayload>): string | null {
  if (typeof body.amount !== "number" || !Number.isFinite(body.amount) || body.amount <= 0 || body.amount > 100000) {
    return "Invalid amount.";
  }
  if (typeof body.currency !== "string" || !ALLOWED_CURRENCIES.has(body.currency)) return "Invalid currency.";
  if (typeof body.isFirstTooth !== "boolean") return "Invalid first-tooth value.";
  if (body.childAge !== undefined) {
    if (typeof body.childAge !== "number" || !Number.isInteger(body.childAge) || body.childAge < 0 || body.childAge > 18) {
      return "Invalid child age.";
    }
  }
  if (body.honeypot) return "Rejected.";
  return null;
}

export default async (req: Request): Promise<Response> => {
  if (req.method !== "POST") return jsonResponse(405, { error: "Method not allowed" });

  let body: Partial<SurveyPayload>;
  try {
    body = (await req.json()) as Partial<SurveyPayload>;
  } catch {
    return jsonResponse(400, { error: "Invalid JSON body." });
  }

  const validationError = validate(body);
  if (validationError) return jsonResponse(400, { error: validationError });

  let supabase: ReturnType<typeof supabaseAdmin>;
  try {
    supabase = supabaseAdmin();
  } catch (e) {
    console.error("submit-tooth-fairy-amount misconfigured:", e);
    return jsonResponse(500, { error: "Not available right now. Please try again later." });
  }

  const { error } = await supabase.from("tooth_fairy_survey").insert({
    amount: body.amount,
    currency: body.currency,
    is_first_tooth: body.isFirstTooth,
    child_age: body.childAge ?? null,
    source: "how_much_calculator",
  });

  if (error) {
    console.error("submit-tooth-fairy-amount insert failed:", error);
    return jsonResponse(500, { error: "Could not save your answer. Please try again." });
  }

  return jsonResponse(200, { ok: true });
};

export const config: Config = {
  path: "/.netlify/functions/submit-tooth-fairy-amount",
};
