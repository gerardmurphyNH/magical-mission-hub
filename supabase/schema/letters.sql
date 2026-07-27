-- Letters to the Tooth Fairy — UGC submissions
-- Run this in the Supabase SQL editor for the Wiggly Tooth Workshop project.
--
-- Safety model:
--   * Anonymous visitors may INSERT a pending, parent-consented letter — nothing else.
--   * Anonymous visitors CANNOT SELECT the base table (protects parent_email and
--     any pending/rejected letters).
--   * Only APPROVED letters, and only safe columns, are exposed — via the
--     public_letters view (parent_email is never in it).
--   * Moderation (approve/reject) is done in Supabase Studio using the service
--     role, which bypasses RLS. There is deliberately NO public update policy,
--     so nothing can be edited or published from the browser.

create extension if not exists "pgcrypto";

create table if not exists public.letters (
  id               uuid primary key default gen_random_uuid(),
  created_at       timestamptz not null default now(),

  -- Public-facing content (shown once approved)
  child_first_name text,          -- first name only, or null / "Anonymous"; NEVER last names
  quality          text not null, -- the virtue the tooth carries, e.g. "Bravery" (ties to the virtue system)
  letter_body      text not null check (char_length(letter_body) between 1 and 1200),

  -- Private — never exposed publicly
  parent_email     text,          -- consent record + optional "your letter is live" notification

  -- Consent + moderation
  parent_consent   boolean not null default false,
  status           text not null default 'pending'
                     check (status in ('pending', 'approved', 'rejected')),
  approved_at      timestamptz,

  -- Anti-spam: bots fill hidden fields; humans leave them empty
  honeypot         text
);

alter table public.letters enable row level security;

-- Anonymous visitors may SUBMIT a pending, consented, sane-length letter — only.
create policy "anon can submit letters"
  on public.letters for insert to anon
  with check (
    parent_consent = true
    and status = 'pending'
    and coalesce(honeypot, '') = ''
    and char_length(coalesce(letter_body, '')) between 1 and 1200
    and char_length(coalesce(quality, '')) between 1 and 60
    and char_length(coalesce(child_first_name, '')) <= 40
  );

-- Approved, safe columns only — this is what the website reads.
create or replace view public.public_letters as
  select id, created_at, child_first_name, quality, letter_body, approved_at
  from public.letters
  where status = 'approved';

grant select on public.public_letters to anon;

-- Helpful index for the moderation queue
create index if not exists letters_status_created_idx
  on public.letters (status, created_at desc);
