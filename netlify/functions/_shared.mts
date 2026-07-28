import { createClient } from "@supabase/supabase-js";
import { createHmac, timingSafeEqual } from "node:crypto";

// Server-side Supabase client using the SERVICE ROLE key — bypasses Row Level
// Security entirely. Never expose this key to the browser; it lives only in
// Netlify's environment variables. The URL is not secret (same value as the
// client's VITE_SUPABASE_URL), so either env var name works.
export function supabaseAdmin() {
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error("Supabase admin client is not configured (missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY).");
  }
  return createClient(url, key, { auth: { persistSession: false } });
}

export type ModerationAction = "approve" | "reject";

/**
 * Signs a one-click moderation link so it can be clicked from an email with no
 * login: HMAC-SHA256 of "<id>:<action>" using a server-only secret. Anyone
 * without MODERATION_SECRET cannot forge a valid token for a different id or
 * action.
 */
export function signModerationToken(id: string, action: ModerationAction): string {
  const secret = process.env.MODERATION_SECRET;
  if (!secret) throw new Error("MODERATION_SECRET is not configured.");
  return createHmac("sha256", secret).update(`${id}:${action}`).digest("hex");
}

export function verifyModerationToken(id: string, action: string, token: string): boolean {
  if (action !== "approve" && action !== "reject") return false;
  const secret = process.env.MODERATION_SECRET;
  if (!secret || !token) return false;
  const expected = signModerationToken(id, action);
  const a = Buffer.from(expected, "hex");
  const b = Buffer.from(token, "hex");
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export function siteUrl(): string {
  return process.env.SITE_URL || "https://wigglytoothworkshop.com";
}

export function moderationLink(id: string, action: ModerationAction): string {
  const token = signModerationToken(id, action);
  return `${siteUrl()}/.netlify/functions/moderate-letter?id=${encodeURIComponent(id)}&action=${action}&token=${token}`;
}

export const jsonResponse = (status: number, body: unknown): Response =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

export const htmlResponse = (status: number, html: string): Response =>
  new Response(html, { status, headers: { "Content-Type": "text/html; charset=utf-8" } });
