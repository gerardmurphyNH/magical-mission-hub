# The Tooth Fairy's Secret Workshop

Website for the animated short film *The Tooth Fairy's Secret Workshop*: free printables, a Tooth Fairy letter maker, a payout calculator, and articles for parents and teachers.

**Live Site:** https://wigglytoothworkshop.com

## Tech Stack

- Vite + React + TypeScript
- Tailwind CSS + shadcn/ui
- Every route prerendered to static HTML at build time (`scripts/prerender.mjs`)
- Netlify hosting + Netlify Functions (`netlify/functions/`)
- Supabase (letters, Wall of Stories, Workshop signups) and Resend (email)

## Local Development

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:8080)
npm run dev

# Build for production: runs the SEO tests, builds, then prerenders every route
npm run build

# Run the tests
npm test
```

`npm run preview` serves the homepage for every route, so other pages show hydration warnings there. That's expected: see [CLAUDE.md](./CLAUDE.md) for how to serve `dist/` the way Netlify does.

## Deployment

The site is hosted on **Netlify**, which builds and deploys automatically on every push to `main`. Merging a PR publishes it. If a build fails (including the SEO tests), the previous deploy stays live.

- **Confirm a deploy:** `netlify api listSiteDeploys --data '{"site_id":"6a7c3674-6a36-4b5f-a5b0-1755eb15b34a","per_page":3}'` should show `state: ready` for the merge commit.
- **Manual deploy (fallback):** `netlify deploy --build --prod`
- **Environment variables** live in Netlify (Site configuration → Environment variables), not in the repo: Supabase, Resend, `MODERATION_SECRET` and `SITE_URL`. See [CLAUDE.md](./CLAUDE.md) for the full list.
- **DNS** (Squarespace Domains): the apex domain points at Netlify (`75.2.60.5`, `99.83.231.61`), and `www` is a CNAME to `chic-queijadas-c602d3.netlify.app`.

Redirects, the not-found fallback (a real 404 status) and the functions directory are configured in `netlify.toml`.

## Configuration

- **Google Analytics (GA4):** already set up as `G-8M7LNF6VW7` in `index.html` and `src/lib/config.ts`. Event helpers live in `src/lib/analytics.ts`.
- **Workshop signups:** the form posts to the `join-workshop` Netlify function, which stores members in Supabase (`workshop_members`), sends them a welcome email, and notifies the moderator (both through Resend).
- **Letters & Wall of Stories:** `submit-letter` and `moderate-letter` functions. Each story is reviewed by a person before it appears on the public wall. Database schemas are in `supabase/schema/`.
- **Printables:** the HTML sources for the downloadable PDFs and JPGs are in `scripts/printables/`, each with a one-line regenerate command.

## Features

- Free printables: Tooth Fairy letter template and filled-in example, short notes and messages, three coloring pages, a first-tooth certificate, and a parent guide
- Letter maker: a personalized letter to or from the Tooth Fairy, downloadable as PDF or JPG, with an optional anonymous Wall of Stories
- Tooth Fairy payout calculator
- Articles for parents and teachers, plus classroom printables
- The short film, embedded from YouTube
- Email signup ("Join the Workshop") and GA4 event tracking
- SEO: per-page titles and descriptions, JSON-LD, a sitemap with images, prerendered HTML, and tests guarding all of it (`src/test/seo.test.ts`)
- Responsive design, with type that scales up on large screens

## More Documentation

See [CLAUDE.md](./CLAUDE.md) for the project structure, the build pipeline, deployment details and content guidelines.
