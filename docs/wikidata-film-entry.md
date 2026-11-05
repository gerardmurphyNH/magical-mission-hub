# Wikidata Entry: The Tooth Fairy's Secret Workshop

Ready-to-paste content + step-by-step instructions for creating the film's
Wikidata item. Shareable with FableVision.

**Why this matters:** Google ingests Wikidata into its Knowledge Graph. A good
item establishes the film as a distinct entity (separate from the 2010 Disney
"Tooth Fairy" movie), formally connects it to Peter H. Reynolds and FableVision
(both existing Wikidata entities), and anchors the official website + YouTube
video as its canonical properties. Once the item exists, we add its Q-number to
the site's `sameAs` structured data to close the loop.

**Important:** Wikidata content is CC0 and must be strictly factual. Editing
about your own project is allowed on Wikidata (unlike Wikipedia) — just keep
statements neutral and referenced.

---

## Recommended order of operations

1. **(Optional but strongly recommended first) Create a TMDB entry** at
   themoviedb.org — free account, "Add New Movie," ~10 minutes, self-serve, no
   approval queue. This gives the Wikidata item an external identifier to
   anchor it (items with identifiers are far less likely to be challenged).
   Bonus: Letterboxd auto-imports from TMDB.
2. Create the Wikidata item (below).
3. When FableVision lands the IMDb listing, add the IMDb ID to the same item.

---

## Step-by-step: creating the item

1. Go to **wikidata.org** → "Create account" (top right). No waiting period.
2. In the left sidebar, click **"Create a new Item."**
3. Fill in:

| Field | Value |
|---|---|
| **Language** | en |
| **Label** | The Tooth Fairy's Secret Workshop |
| **Description** | 2026 American animated short film |
| **Aliases** | The Tooth Fairy's Magical Mission |

*(The alias preserves the original release title — useful for disambiguation
since early press and the premiere used it.)*

4. Click **Create**. You now have an empty item with a Q-number (e.g.
   Q135XXXXXX). **Save that Q-number** — send it back to me for the site schema.
5. Add the statements below one at a time: click **"+ add statement,"** type the
   property name, and the UI autocompletes both properties and values.

---

## Statements

Where a value is a person/company, type the name and pick the matching
suggestion. Items marked **[verify]** exist on Wikidata but should be matched
by searching the name — confirm the description matches before selecting
(e.g. Peter H. Reynolds the children's author-illustrator, not someone else).

| Property | Value | Notes |
|---|---|---|
| instance of (P31) | animated short film | pick the "animated short film" item from autocomplete |
| title (P1476) | "The Tooth Fairy's Secret Workshop" (English) | monolingual text |
| country of origin (P495) | United States of America | |
| original language of film or TV show (P364) | English | |
| publication date (P577) | 7 June 2026 | world premiere + YouTube release |
| duration (P2047) | [exact runtime in minutes] | fill in the real runtime |
| genre (P136) | children's film | search "children's film"; optionally also "fantasy film" |
| screenwriter (P58) | Gerard Murphy | may need a new item — see "People without items" below |
| producer (P162) | Paul Reynolds **[verify]** | FableVision co-founder — confirm it's the right Paul Reynolds |
| executive producer (P1431) | Gerard Murphy | |
| art director (P3174) | Peter H. Reynolds **[verify]** | credited "Creative Director / Art by"; match the children's book author-illustrator (The Dot) |
| animator (P6942) | John Lechner **[verify if exists]**, Didi Hatcher | |
| voice actor (P725) | Andreas Branigan, Danielle Famble | only if items exist — see below |
| production company (P272) | FableVision **[verify]** | search "FableVision" |
| distributed by (P750) | YouTube | |
| official website (P856) | https://wigglytoothworkshop.com/watch | point at the watch page (the film's canonical page) |
| YouTube video ID (P1651) | m9y5-U8o_pk | this is the key video anchor |
| TMDb movie ID (P4947) | [from step 1] | add once the TMDB entry exists |
| IMDb ID (P345) | [when FableVision creates it] | add later |

### People without existing items
Wikidata person-properties require the person to have their own item — you
can't type a plain name. Gerard Murphy, Michelle Ding, Didi Hatcher, Andreas
Branigan, and Danielle Famble likely don't have items yet.

- **Simplest path:** skip those statements for now. The item is complete and
  valid without them; credits can be added any time.
- **Fuller path:** create a minimal person item first (Label: name;
  Description: e.g. "American filmmaker" / "voice actor"; statements:
  instance of (P31) = human, occupation (P106) = film producer / voice actor),
  then reference it from the film item. Only do this for people with at least
  one public source (the film credits + premiere coverage qualify).
- Peter H. Reynolds, Paul Reynolds, and FableVision almost certainly already
  have items — just search and match.

---

## References (do this — it's the deletion-proofing)

For each significant statement, click **"+ add reference"** on that statement
and add:

- **reference URL (P854):** one of the sources below
- **retrieved (P813):** today's date

Sources to rotate between:
1. `https://www.reynoldstlc.org/blog/elevating-the-tooth-fairy-story-to-a-sense-of-mission` — the Reynolds Center feature (best independent-ish source; use it on P31, P272, P3174, P577)
2. `https://www.youtube.com/watch?v=m9y5-U8o_pk` — the film itself (use on P577, P1651, P725, credits)
3. `https://wigglytoothworkshop.com/watch` — official site (use on P856, P1476)
4. `https://wigglytoothworkshop.com/tooth-fairy-film-premiere` — premiere recap (use on P577; documents the June 7, 2026 Dedham premiere at TLC Studios)

---

## Verified credits (from the official poster)

For your reference / for FableVision's IMDb submission:

- Executive Producer: Gerard Murphy
- Producer: Paul Reynolds
- Creative Director: Peter H. Reynolds
- Associate Producer: Michelle Ding
- Written by: Gerard Murphy
- Art by: Peter H. Reynolds
- Animated by: John Lechner and Didi Hatcher
- Voices: Andreas Branigan & Danielle Famble
- Sound Design: Taiko
- Post Production: FableVision/TLC Studios
- Presented by: The Wiggly Tooth Workshop and FableVision
- Tagline: "The magic under your pillow can help change the world."
- World premiere: June 7, 2026, TLC Studios, Dedham, MA
- Release: YouTube, free (video ID m9y5-U8o_pk)
- Original release title: "The Tooth Fairy's Magical Mission" (retitled after
  YouTube A/B testing)

---

## After it's live

Send the Q-number back and we'll:
1. Add `https://www.wikidata.org/wiki/Q…` to the site's Organization/VideoObject
   `sameAs` arrays (closes the entity loop for Google).
2. Add the TMDB and IMDb URLs to `sameAs` as they come online.

## Notability note (honest assessment)

Wikidata's bar is lower than Wikipedia's, but brand-new items with no
identifiers and no references occasionally get flagged. The three things that
make this item safe: (1) references on key statements, (2) at least one
external identifier (TMDB — do it first), and (3) links to established entities
(Peter H. Reynolds, FableVision). With those, film items routinely stand.
