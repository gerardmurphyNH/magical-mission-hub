-- Letters to the Tooth Fairy — UGC submissions
-- Run this in the Supabase SQL editor for the Wiggly Tooth Workshop project.
-- Safe to re-run: every statement is idempotent, so this file is the single
-- source of truth for the schema (re-run it after every change described here).
--
-- Safety model:
--   * Anonymous visitors may INSERT a pending, parent-consented letter.
--   * Anonymous visitors' only SELECT access to the base table is column- and
--     row-restricted (approved + wall_opt_in rows only — see the grant/policy
--     by public_letters below) so the view can run with security_invoker
--     instead of bypassing RLS. parent_email, child_first_name, honeypot,
--     social_feature_consent, and any pending/rejected letters are never
--     reachable by anon. (status and wall_opt_in are column-grantable too,
--     since the view's WHERE clause needs to read them — but their value is
--     never informative on its own: every row anon can reach already has
--     status = 'approved' and wall_opt_in = true.)
--   * Only APPROVED + wall_opt_in letters, and only anonymous-safe columns
--     (never a name), are exposed — via the public_letters view.
--   * child_first_name + city_state are usable for the PARENT'S OWN print/PDF/
--     email and, only with explicit social_feature_consent, a card WE post to
--     our own social channels. They are never shown on the public wall.
--   * Moderation (approve/reject) is done in Supabase Studio, or later via a
--     signed-link Netlify Function, both using the service role which bypasses
--     RLS. There is deliberately NO public update policy.

create extension if not exists "pgcrypto";

create table if not exists public.letters (
  id               uuid primary key default gen_random_uuid(),
  created_at       timestamptz not null default now(),

  -- Which template was used, and the assembled narrative shown everywhere.
  letter_type      text not null default 'to',
  letter_body      text not null check (char_length(letter_body) between 1 and 1200),

  -- Structured fields behind the assembled text (lets us restyle/re-render later).
  quality          text not null, -- the virtue the tooth carries (ties to the site's virtue system)
  reason           text,          -- TO letters: "because ___"
  help_cause       text,          -- TO letters: "please use it to help ___"
  fairy_action     text,          -- FROM letters: what the Tooth Fairy did with it

  -- Usable for the parent's own PDF/email and (only with social_feature_consent)
  -- a card we post ourselves. NEVER exposed on the public wall.
  child_first_name text,
  city_state       text,          -- e.g. "Dorchester, MA" — optional

  -- Private — never exposed publicly
  parent_email     text,

  -- Consent + visibility
  parent_consent          boolean not null default false, -- required to submit at all
  wall_opt_in              boolean not null default true,  -- show (anonymously) on the public wall
  social_feature_consent   boolean not null default false, -- OK to feature name+city on our own social

  -- Moderation
  status           text not null default 'pending'
                     check (status in ('pending', 'approved', 'rejected')),
  approved_at      timestamptz,

  -- Anti-spam: bots fill hidden fields; humans leave them empty
  honeypot         text
);

-- Idempotent upgrade path for a table created by an earlier version of this file.
alter table public.letters add column if not exists letter_type text not null default 'to';
alter table public.letters add column if not exists reason text;
alter table public.letters add column if not exists help_cause text;
alter table public.letters add column if not exists fairy_action text;
alter table public.letters add column if not exists city_state text;
alter table public.letters add column if not exists wall_opt_in boolean not null default true;
alter table public.letters add column if not exists social_feature_consent boolean not null default false;

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'letters_letter_type_check'
  ) then
    alter table public.letters
      add constraint letters_letter_type_check check (letter_type in ('to', 'from'));
  end if;
end $$;

alter table public.letters enable row level security;

drop policy if exists "anon can submit letters" on public.letters;
create policy "anon can submit letters"
  on public.letters for insert to anon
  with check (
    parent_consent = true
    and status = 'pending'
    and coalesce(honeypot, '') = ''
    and letter_type in ('to', 'from')
    and char_length(coalesce(letter_body, '')) between 1 and 1200
    and char_length(coalesce(quality, '')) between 1 and 60
    and char_length(coalesce(reason, '')) <= 300
    and char_length(coalesce(help_cause, '')) <= 300
    and char_length(coalesce(fairy_action, '')) <= 300
    and char_length(coalesce(child_first_name, '')) <= 40
    and char_length(coalesce(city_state, '')) <= 80
  );

-- Approved + wall-opted-in letters, anonymous-safe columns only. This is what
-- the public "Wall of Stories" reads — no name is ever included.
--
-- security_invoker: a plain view runs with the OWNER's permissions when
-- checking RLS, not the querying role's — Supabase's advisor flags this as
-- "Security Definer View" (critical) because it silently bypasses RLS on the
-- underlying table. With security_invoker on, the view's WHERE clause and
-- the RLS policy below both run as the actual querying role (anon), so anon
-- needs column-level SELECT on every column either one *references* — not
-- just the ones the view outputs. That means status and wall_opt_in must be
-- grantable too (their value is never returned by the view or otherwise
-- informative on its own: every row anon can reach already has status =
-- 'approved' and wall_opt_in = true, that's the whole point of the filter).
-- parent_email / child_first_name / honeypot / social_feature_consent /
-- reason / help_cause / fairy_action stay fully ungranted either way.
drop view if exists public.public_letters;
create view public.public_letters
  with (security_invoker = true, security_barrier = true) as
  select id, created_at, letter_type, quality, letter_body, city_state, approved_at
  from public.letters
  where status = 'approved' and wall_opt_in = true;

grant select on public.public_letters to anon;

revoke select on public.letters from anon;
grant select (
  id, created_at, letter_type, quality, letter_body, city_state, approved_at,
  status, wall_opt_in
) on public.letters to anon;

drop policy if exists "anon can select approved wall-opted-in letters" on public.letters;
create policy "anon can select approved wall-opted-in letters"
  on public.letters for select to anon
  using (status = 'approved' and wall_opt_in = true);

create index if not exists letters_status_created_idx
  on public.letters (status, created_at desc);
