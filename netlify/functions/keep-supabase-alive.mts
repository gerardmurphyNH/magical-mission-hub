import type { Config } from "@netlify/functions";
import { supabaseAdmin, jsonResponse } from "./_shared.mts";

// Supabase pauses free-tier projects after 7 days with no API activity. This
// scheduled function runs twice a week (well under that window) and issues a
// trivial, side-effect-free read so the project never goes to sleep.
export default async (): Promise<Response> => {
  let supabase: ReturnType<typeof supabaseAdmin>;
  try {
    supabase = supabaseAdmin();
  } catch (e) {
    console.error("keep-supabase-alive misconfigured:", e);
    return jsonResponse(500, { ok: false, error: "Supabase admin client not configured." });
  }

  const { error } = await supabase
    .from("workshop_members")
    .select("id", { count: "exact", head: true });

  if (error) {
    console.error("keep-supabase-alive query failed:", error);
    return jsonResponse(500, { ok: false, error: error.message });
  }

  console.log("keep-supabase-alive: ping succeeded");
  return jsonResponse(200, { ok: true });
};

export const config: Config = {
  schedule: "0 9 * * 1,4",
};
