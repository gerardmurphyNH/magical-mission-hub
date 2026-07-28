-- Seeds the public Wall of Stories with a handful of varied, anonymous example
-- letters so the wall has content from day one instead of an empty state.
-- Run this once in the Supabase SQL editor. Safe to re-run (it always inserts
-- new rows rather than upserting, so re-running will duplicate seeds - only run
-- once, or delete first with the query at the bottom).
--
-- All rows: no name (child_first_name is NULL), status is already 'approved',
-- so they appear on the live wall immediately with no moderation step needed.
-- Wording matches the exact anonymized template the real generator produces,
-- so seeded stories are indistinguishable in tone from real future ones.

insert into public.letters
  (letter_type, quality, reason, help_cause, fairy_action, city_state, letter_body,
   child_first_name, parent_consent, wall_opt_in, social_feature_consent, status, approved_at)
values
  ('to', 'Bravery',
    'I was really scared but I did it anyway',
    'someone who feels nervous about something new',
    null, 'Dedham, MA',
    'I lost a tooth today. I think the quality inside it is Bravery - because I was really scared but I did it anyway. Please use it to help someone who feels nervous about something new. I hope it does some good in the world.',
    null, true, true, false, 'approved', now()),

  ('to', 'Kindness',
    'I gave my extra snack to a friend who forgot theirs',
    'someone who needs a friend today',
    null, 'London, England',
    'I lost a tooth today. I think the quality inside it is Kindness - because I gave my extra snack to a friend who forgot theirs. Please use it to help someone who needs a friend today. I hope it does some good in the world.',
    null, true, true, false, 'approved', now()),

  ('from', 'Creativity',
    null, null,
    'a tired grown-up find a spark of imagination',
    null,
    'Thank you for the tooth - I found it safely. When I looked closely, I saw the quality growing inside it: Creativity. That''s exactly what the world needs more of, so I used a little of it to help a tired grown-up find a spark of imagination - a small spark, passed along. I left a little something behind. Not to buy the tooth, but to say thank you, and to keep the good going.',
    null, true, true, false, 'approved', now()),

  ('to', 'Perseverance',
    'this tooth was so wiggly and took forever to come out, but I kept trying',
    'someone who wants to give up but shouldn''t',
    null, 'Portland, ME',
    'I lost a tooth today. I think the quality inside it is Perseverance - because this tooth was so wiggly and took forever to come out, but I kept trying. Please use it to help someone who wants to give up but shouldn''t. I hope it does some good in the world.',
    null, true, true, false, 'approved', now()),

  ('to', 'Curiosity',
    'I always ask a hundred questions about everything',
    'someone who wants to learn something new',
    null, 'Nashua, NH',
    'I lost a tooth today. I think the quality inside it is Curiosity - because I always ask a hundred questions about everything. Please use it to help someone who wants to learn something new. I hope it does some good in the world.',
    null, true, true, false, 'approved', now()),

  ('from', 'Patience',
    null, null,
    'someone learn to wait a little longer, a little more kindly',
    'Sydney, Australia',
    'Thank you for the tooth - I found it safely. When I looked closely, I saw the quality growing inside it: Patience. That''s exactly what the world needs more of, so I used a little of it to help someone learn to wait a little longer, a little more kindly - a small spark, passed along. I left a little something behind. Not to buy the tooth, but to say thank you, and to keep the good going.',
    null, true, true, false, 'approved', now()),

  ('to', 'Honesty',
    'I told my mom the truth about breaking something even though it was hard',
    'someone who is scared to tell the truth',
    null, 'Chicago, IL',
    'I lost a tooth today. I think the quality inside it is Honesty - because I told my mom the truth about breaking something even though it was hard. Please use it to help someone who is scared to tell the truth. I hope it does some good in the world.',
    null, true, true, false, 'approved', now()),

  ('from', 'Joy',
    null, null,
    'someone who needed a reason to laugh today',
    'Toronto, Canada',
    'Thank you for the tooth - I found it safely. When I looked closely, I saw the quality growing inside it: Joy. That''s exactly what the world needs more of, so I used a little of it to help someone who needed a reason to laugh today - a small spark, passed along. I left a little something behind. Not to buy the tooth, but to say thank you, and to keep the good going.',
    null, true, true, false, 'approved', now());

-- To remove all seed rows later (e.g. once enough real submissions exist):
-- delete from public.letters where child_first_name is null and parent_email is null
--   and city_state in ('Dedham, MA','London, England','Portland, ME','Nashua, NH','Chicago, IL')
--   or (letter_type = 'from' and city_state in ('Sydney, Australia','Toronto, Canada'))
--   or (letter_type = 'from' and quality = 'Creativity' and city_state is null);
