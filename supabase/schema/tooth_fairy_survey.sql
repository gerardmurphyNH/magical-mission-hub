-- Tooth Fairy Amount Calculator — "what did you actually leave?" survey
-- Run this in the Supabase SQL editor for the Wiggly Tooth Workshop project.
-- Idempotent, safe to re-run.
--
-- Safety model: every write goes through the submit-tooth-fairy-amount
-- Netlify Function using the service role key, which bypasses RLS entirely.
-- No PII is ever collected here (no name, no email). Anon reads are meant to
-- go through the aggregated public_tooth_fairy_stats view (counts and
-- averages, grouped by currency + first-tooth) for the "what other families
-- reported" display — never individual submissions — but anon does have a
-- narrow, column-restricted RLS-backed SELECT on the base table (currency,
-- is_first_tooth, amount only; see below) so that view can run with
-- security_invoker instead of bypassing RLS. id, created_at, child_age, and
-- source are never granted to anon either way.

create extension if not exists "pgcrypto";

create table if not exists public.tooth_fairy_survey (
  id             uuid primary key default gen_random_uuid(),
  created_at     timestamptz not null default now(),

  amount         numeric not null check (amount > 0 and amount <= 100000),
  currency       text not null check (currency in ('USD', 'CAD', 'GBP', 'EUR', 'JPY')),
  is_first_tooth boolean not null,
  child_age      integer check (child_age is null or child_age between 0 and 18),

  source         text not null default 'how_much_calculator'
);

alter table public.tooth_fairy_survey enable row level security;

create index if not exists tooth_fairy_survey_currency_first_tooth_idx
  on public.tooth_fairy_survey (currency, is_first_tooth);

-- Aggregated, anonymous-safe stats — no individual submission is ever exposed
-- via this view.
--
-- security_invoker: a plain view runs with the OWNER's permissions when
-- checking RLS, not the querying role's — Supabase's advisor flags this as
-- "Security Definer View" (critical) because it silently bypasses RLS on the
-- underlying table. With security_invoker on, the aggregation needs anon to
-- be able to read the rows it aggregates over, so below we add an RLS policy
-- allowing that — restricted, via column grant, to just the 3 non-PII
-- columns the aggregate needs (currency, is_first_tooth, amount). No name or
-- email is ever collected here, so the residual trade-off is narrow: a
-- visitor who queries the base table directly (instead of the aggregate
-- view) could see individual amount/currency/is_first_tooth rows rather than
-- only the grouped stats. id, created_at, child_age, and source stay
-- ungranted either way.
drop view if exists public.public_tooth_fairy_stats;
create view public.public_tooth_fairy_stats
  with (security_invoker = true, security_barrier = true) as
  select
    currency,
    is_first_tooth,
    count(*)::int as response_count,
    round(avg(amount)::numeric, 2) as average_amount
  from public.tooth_fairy_survey
  group by currency, is_first_tooth;

grant select on public.public_tooth_fairy_stats to anon;

revoke select on public.tooth_fairy_survey from anon;
grant select (currency, is_first_tooth, amount) on public.tooth_fairy_survey to anon;

drop policy if exists "anon can select for stats aggregation" on public.tooth_fairy_survey;
create policy "anon can select for stats aggregation"
  on public.tooth_fairy_survey for select to anon
  using (true);
