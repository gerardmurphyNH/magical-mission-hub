import type { Config } from "@netlify/functions";
import { supabaseAdmin, verifyModerationToken, htmlResponse } from "./_shared.mts";

const page = (title: string, body: string): string => `<!doctype html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<style>
  body { font-family: Georgia, 'Times New Roman', serif; background: #191633; color: #F5F3FF; margin: 0; padding: 0; }
  .card { max-width: 420px; margin: 15vh auto 0; padding: 32px; text-align: center; }
  h1 { font-size: 22px; margin-bottom: 12px; }
  p { color: #C9C2F0; line-height: 1.6; }
  a { color: #FBBF24; }
</style></head>
<body><div class="card"><h1>${title}</h1><p>${body}</p><p><a href="https://wigglytoothworkshop.com/letters-to-the-tooth-fairy">View the Wall of Stories →</a></p></div></body></html>`;

export default async (req: Request): Promise<Response> => {
  const url = new URL(req.url);
  const id = url.searchParams.get("id") || "";
  const action = url.searchParams.get("action") || "";
  const token = url.searchParams.get("token") || "";

  if (!id || !verifyModerationToken(id, action, token)) {
    return htmlResponse(403, page("Link not valid", "This moderation link is invalid or has expired."));
  }

  let supabase: ReturnType<typeof supabaseAdmin>;
  try {
    supabase = supabaseAdmin();
  } catch (e) {
    console.error("moderate-letter misconfigured:", e);
    return htmlResponse(500, page("Not configured", "The moderation system isn't fully set up yet."));
  }

  const { data: existing, error: fetchError } = await supabase
    .from("letters")
    .select("id, status, quality")
    .eq("id", id)
    .maybeSingle();

  if (fetchError || !existing) {
    return htmlResponse(404, page("Not found", "This letter could not be found — it may have already been removed."));
  }

  if (existing.status !== "pending") {
    return htmlResponse(200, page(
      "Already handled",
      `This letter was already marked <strong>${existing.status}</strong>. No changes made.`,
    ));
  }

  const newStatus = action === "approve" ? "approved" : "rejected";
  const { error: updateError } = await supabase
    .from("letters")
    .update({ status: newStatus, approved_at: newStatus === "approved" ? new Date().toISOString() : null })
    .eq("id", id);

  if (updateError) {
    return htmlResponse(500, page("Something went wrong", "Please try again, or handle it directly in Supabase Studio."));
  }

  return newStatus === "approved"
    ? htmlResponse(200, page("Approved ✨", `The "${existing.quality}" story is now live on the Wall of Stories.`))
    : htmlResponse(200, page("Rejected", `The "${existing.quality}" story will not be shown publicly.`));
};

export const config: Config = {
  path: "/.netlify/functions/moderate-letter",
};
