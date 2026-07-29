-- Workshop mailing list — replaces the old Google Sheets signup.
-- Run this in the Supabase SQL editor. Idempotent, safe to re-run.
--
-- Safety model: stricter than the letters table — there is NO public-facing
-- read requirement here, so RLS is enabled with ZERO policies for anon.
-- Every read/write goes through the join-workshop Netlify Function using the
-- service role key, which bypasses RLS entirely. Nothing is reachable from
-- the browser at all.

create extension if not exists "pgcrypto";

create table if not exists public.workshop_members (
  id         uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  email      text not null unique,  -- always stored lowercase/trimmed by the function
  first_name text,
  virtue     text,                  -- from the homepage virtue quiz, when present
  source     text not null          -- which page/form the signup came from
);

alter table public.workshop_members enable row level security;

create index if not exists workshop_members_created_idx
  on public.workshop_members (created_at desc);
