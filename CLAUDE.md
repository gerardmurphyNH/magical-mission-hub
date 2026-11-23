# CLAUDE.md

This file provides guidance to Claude Code when working with code in this repository.

## Project Overview

This is a **marketing website** for "The Tooth Fairy's Secret Workshop" - an animated short film and children's book project. The site is designed to capture email signups, provide information about the project, and engage visitors with an interactive virtue quiz.

**Live URL:** https://wigglytoothworkshop.com

### Tech Stack

- **Framework:** Vite + React 18 + TypeScript
- **Styling:** Tailwind CSS + shadcn/ui components
- **Routing:** React Router DOM v6
- **State:** React Context (VirtueContext for quiz results)
- **Build:** Vite with static output to `/dist`
- **Hosting:** Netlify (auto-deploys `main` of this repo), plus Netlify Functions in `netlify/functions/` - see Deployment below

## Project Structure

```
src/
├── assets/              # Images (hero-fairy.jpg, film scenes, etc.)
├── components/
│   ├── ui/              # shadcn/ui components (button, input, etc.)
│   ├── HeroSection.tsx  # Main hero with CTA
│   ├── WhatsComingSection.tsx  # Film/book/ToothSafe cards
│   ├── ToothSafeSection.tsx    # Product explainer
│   ├── VirtueQuizSection.tsx   # Interactive 2-question quiz
│   ├── FAQSection.tsx   # Accordion FAQ
│   ├── DownloadSection.tsx     # Coloring page download
│   ├── SignupSection.tsx       # Email capture form
│   └── Footer.tsx       # Links to Privacy/Terms
├── context/
│   └── VirtueContext.tsx  # Stores quiz result for signup
├── hooks/               # Custom hooks (use-toast, use-mobile)
├── lib/
│   ├── analytics.ts     # GA4 event tracking helpers
│   ├── config.ts        # Configuration constants
│   └── utils.ts         # Tailwind merge utility
├── pages/
│   ├── Index.tsx        # Main landing page
│   ├── Privacy.tsx      # Privacy policy
│   ├── Terms.tsx        # Terms of use
│   └── NotFound.tsx     # 404 page
├── App.tsx              # Routes and providers
└── main.tsx             # Entry point

public/
├── CNAME                # Legacy GitHub Pages file (holds old tooth-safe.com); Netlify ignores it
├── favicon.ico          # Site favicon
├── robots.txt           # SEO robots file
├── sitemap.xml          # SEO sitemap
├── downloads/
│   └── coloring-page.pdf  # Free download (placeholder)
└── placeholder.svg      # Fallback image

netlify/functions/       # submit-letter, moderate-letter, join-workshop, etc.
netlify.toml             # Build, functions dir, redirects, app-shell fallback
scripts/printables/      # HTML sources for downloadable PDFs/JPGs (regenerate commands inside)
```

## Development

### Prerequisites

- Node.js 18+ (recommend 20.x)
- npm or bun

### Local Development

```bash
cd ~/Projects/tooth-fairy
npm install
npm run dev
# Opens at http://localhost:8080
```

### Build

```bash
npm run build
npm run preview  # Preview production build
```

### Prerendering (build pipeline)

`npm run build` = SEO tests -> `vite build` (client) -> `vite build --ssr src/entry-server.tsx --outDir dist-ssr` -> `scripts/prerender.mjs`. The script renders every route from `App.tsx` (plus `/`) to full HTML, injects it into `#root`, bakes each page's `<PageSeo>` title/description/canonical into `<head>`, and writes a flat `dist/<route>.html`. `src/main.tsx` hydrates that markup. Non-JS crawlers (AI crawlers, social unfurlers) therefore see real content and JSON-LD.

- `dist/app-shell.html` is the generic empty shell; the Netlify `/*` fallback in `netlify.toml` serves it for unknown URLs. It must NOT be `index.html`, which now contains the rendered homepage.
- Keep each route in `App.tsx` as a one-line `Route` with a literal path and a bare `element` (no wrapper props) - prerender and `seo.test.ts` parse them with a regex.
- Any render failure fails the build (a failed Netlify build leaves the previous deploy live).
- `npm run preview` falls back to `index.html` (the prerendered homepage) for every route, so non-home routes show hydration warnings there. To test locally, serve `dist/` the way Netlify does (exact file, else `<path>.html`, else `app-shell.html`).

### Type Checking & Linting

```bash
npm run lint
npx tsc --noEmit -p tsconfig.app.json   # the real type-check
```

Plain `npx tsc --noEmit` checks nothing here: the root tsconfig has `"files": []` and only project references, so always pass `-p tsconfig.app.json`. Three pre-existing errors are known (placeholder-ID comparisons in `HeroSection.tsx` and `src/lib/analytics.ts`, and a `YT.Player` type in `LiteYouTube.tsx`).

## Configuration

### Google Sheets Integration

The signup form POSTs to a Google Apps Script Web App. Configure in `src/lib/config.ts`:

```typescript
export const GOOGLE_SHEETS_ENDPOINT = "PASTE_YOUR_APPS_SCRIPT_WEB_APP_URL_HERE";
```

**Apps Script Setup:**
1. Create a Google Sheet with columns: email, firstName, virtue, timestamp
2. Extensions → Apps Script
3. Deploy as Web App (execute as you, anyone can access)
4. Paste the deployment URL in config.ts

### Google Analytics

GA4 is configured in `index.html`. Replace the placeholder:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
```

Also update `src/lib/config.ts`:

```typescript
export const GA_MEASUREMENT_ID = "G-XXXXXXXXXX";
```

**Tracked Events:**
- `signup_success` - Email form submission
- `quiz_completion` - Virtue quiz completed (includes result)
- `coloring_page_download` - PDF download clicked

## Deployment (Netlify)

The live site is the Netlify project `chic-queijadas-c602d3` (site id `6a7c3674-6a36-4b5f-a5b0-1755eb15b34a`), linked to `gerardmurphyNH/magical-mission-hub`, branch `main`. Build command `bun run build`, publish directory `dist`.

- **Merging to `main` publishes.** Netlify builds and deploys automatically; a failed build leaves the previous deploy live.
- **Check a deploy:** `netlify api listSiteDeploys --data '{"site_id":"6a7c3674-6a36-4b5f-a5b0-1755eb15b34a","per_page":3}'` - look for `state: ready` with `commit_ref` equal to the merge commit. Then confirm live titles with `curl -s https://wigglytoothworkshop.com/<route> | grep -o '<title>[^<]*'`.
- **Manual deploy (fallback):** `netlify deploy --build --prod` from a clean checkout of `main`. It uses the site's Netlify env vars and bundles `netlify/functions`.
- **Environment variables** live in Netlify (Site configuration → Environment variables), not in the repo: Supabase (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`), Resend email (`RESEND_API_KEY`, `EMAIL_FROM`, `MODERATOR_EMAIL`), `MODERATION_SECRET`, `SITE_URL`. The letters page, its moderation emails, and Workshop signups (`join-workshop`) depend on them.
- **If merges stop deploying:** check Netlify credits first. Builds are skipped with "account credit usage exceeded" when the account runs out (this happened in Nov 2026).
- **DNS** (Squarespace Domains): the apex points at Netlify's load balancer (`75.2.60.5`, `99.83.231.61`) and `www` is a CNAME to `chic-queijadas-c602d3.netlify.app`.

**Legacy, don't use:** before 2026-11-23 Netlify built from a second repo, `gerardmurphyNH/wiggly-tooth-workshop`, which had to be synced by hand. It's no longer linked. The old GitHub Pages workflow was removed on 2026-11-23. The build and SEO tests now run only in Netlify's build, where a failing test blocks the deploy and leaves the previous one live.

## Key Features

### Virtue Quiz

2-question quiz determines one of 4 virtues: Bravery, Kindness, Creativity, Patience. Result is:
- Displayed to user with personalized message
- Stored in VirtueContext
- Passed to signup form as hidden field
- Tracked in GA4

### Email Signup

- Required: email
- Optional: firstName
- Hidden: virtue (from quiz), honeypot (bot trap)
- Falls back to mailto: link if endpoint not configured
- Inline error/success messages (no alerts)

### SEO

- Full meta tags (title, description, OG, Twitter)
- JSON-LD structured data (FAQPage, WebSite)
- robots.txt with sitemap reference
- Canonical URL

## Content Guidelines

### Attribution Text (Required)

Must appear on the site:
> "Animated short film in development in collaboration with Peter H. Reynolds and FableVision Studios."

And in footer:
> "Collaboration credit shown with permission. This site is operated by Wiggly Tooth Workshop and is not an official website of FableVision Studios or Peter H. Reynolds."

### Key Dates

- Film: released June 2026 (world premiere June 7, 2026); free to watch on YouTube (hosted on the FableVision channel, video ID m9y5-U8o_pk)
- Book & ToothSafe: "Coming soon" (no specific date)

## Troubleshooting

### Build Errors

```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Routing on Netlify

The site uses `BrowserRouter`. Every real route is prerendered to `dist/<route>.html`, which Netlify serves directly. Unknown URLs fall through the `/*` rule in `netlify.toml` to `app-shell.html` (not `index.html`, which holds the rendered homepage), and React Router shows the 404 page. Retired URLs are 301'd by `[[redirects]]` entries in `netlify.toml`.

### Images Not Loading

Assets in `src/assets/` are bundled by Vite. Reference them with imports:
```typescript
import heroFairy from "@/assets/hero-fairy.jpg";
```

## Future Enhancements

- [ ] Replace placeholder coloring page PDF with real artwork
- [ ] Add OG image (currently placeholder)
- [ ] Configure actual Google Sheets endpoint
- [ ] Set up GA4 measurement ID
- [ ] Add email confirmation workflow
