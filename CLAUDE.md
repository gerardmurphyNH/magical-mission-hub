# CLAUDE.md

This file provides guidance to Claude Code when working with code in this repository.

## Project Overview

This is a **marketing website** for "The Tooth Fairy's Magical Mission" - an animated short film and children's book project. The site is designed to capture email signups, provide information about the project, and engage visitors with an interactive virtue quiz.

**Live URL:** https://tooth-safe.com

### Tech Stack

- **Framework:** Vite + React 18 + TypeScript
- **Styling:** Tailwind CSS + shadcn/ui components
- **Routing:** React Router DOM v6
- **State:** React Context (VirtueContext for quiz results)
- **Build:** Vite with static output to `/dist`
- **Hosting:** GitHub Pages with custom domain

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
├── CNAME                # Custom domain for GitHub Pages
├── favicon.ico          # Site favicon
├── robots.txt           # SEO robots file
├── sitemap.xml          # SEO sitemap
├── downloads/
│   └── coloring-page.pdf  # Free download (placeholder)
└── placeholder.svg      # Fallback image

.github/workflows/
└── deploy.yml           # GitHub Actions for Pages deployment
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

### Type Checking & Linting

```bash
npm run lint
```

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

## GitHub Pages Deployment

### Automatic Deployment

Push to `main` triggers `.github/workflows/deploy.yml` which:
1. Installs dependencies
2. Builds the site
3. Deploys `/dist` to GitHub Pages

### Manual Setup (First Time)

1. **Enable GitHub Pages:**
   - Repo Settings → Pages
   - Source: "GitHub Actions"

2. **Set Custom Domain:**
   - Add `tooth-safe.com` in Pages settings
   - Check "Enforce HTTPS"

3. **DNS Configuration (Squarespace Domains):**

   | Type | Host | Value |
   |------|------|-------|
   | A | @ | 185.199.108.153 |
   | A | @ | 185.199.109.153 |
   | A | @ | 185.199.110.153 |
   | A | @ | 185.199.111.153 |
   | CNAME | www | gerardmurphyNH.github.io |

4. **Wait 24-48 hours** for DNS propagation and HTTPS certificate.

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

- Film release: "Summer 2026"
- Book & ToothSafe: "Coming soon" (no specific date)

## Troubleshooting

### Build Errors

```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Router Issues on GitHub Pages

The site uses `BrowserRouter`. For SPA routing to work, 404.html must redirect to index.html. GitHub Pages handles this automatically with the current setup.

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
