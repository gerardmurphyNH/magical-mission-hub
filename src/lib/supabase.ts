import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// The publishable/anon key is designed to be public — security is enforced by
// Supabase Row Level Security (see supabase/schema/letters.sql). These VITE_
// vars are read at build time; set them locally in .env and on Netlify.
const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const isSupabaseConfigured = Boolean(url && anonKey);

// Null when env isn't set, so the app (and the build/tests) degrade gracefully.
export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(url as string, anonKey as string, { auth: { persistSession: false } })
  : null;
