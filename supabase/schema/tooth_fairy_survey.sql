-- Tooth Fairy Amount Calculator — "what did you actually leave?" survey
-- Run this in the Supabase SQL editor for the Wiggly Tooth Workshop project.
-- Idempotent, safe to re-run.
--
-- Safety model: same as workshop_members — NO public-facing read of raw rows.
-- RLS is enabled with ZERO policies for anon; every write goes through the
-- submit-tooth-fairy-amount Netlify Function using the service role key,
-- which bypasses RLS entirely. No PII is ever collected here (no name, no
-- email), so the only thing exposed publicly is an aggregated view (counts
-- and averages, grouped by currency + first-tooth) for the "what other
-- families reported" display — never individual submissions.

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

-- Aggregated, anonymous-safe stats — no individual submission is ever exposed.
drop view if exists public.public_tooth_fairy_stats;
create view public.public_tooth_fairy_stats as
  select
    currency,
    is_first_tooth,
    count(*)::int as response_count,
    round(avg(amount)::numeric, 2) as average_amount
  from public.tooth_fairy_survey
  group by currency, is_first_tooth;

grant select on public.public_tooth_fairy_stats to anon;
