# The Tooth Fairy's Magical Mission

Marketing website for the animated short film and children's book project.

**Live Site:** https://tooth-safe.com

## Tech Stack

- Vite + React + TypeScript
- Tailwind CSS + shadcn/ui
- GitHub Pages hosting

## Local Development

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:8080)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

Pushes to `main` automatically deploy to GitHub Pages via GitHub Actions.

### First-Time GitHub Pages Setup

1. **Enable Pages:** Repo Settings → Pages → Source: "GitHub Actions"
2. **Custom Domain:** Add `tooth-safe.com`, enable "Enforce HTTPS"
3. **DNS Records (Squarespace Domains):**

   | Type | Host | Value |
   |------|------|-------|
   | A | @ | 185.199.108.153 |
   | A | @ | 185.199.109.153 |
   | A | @ | 185.199.110.153 |
   | A | @ | 185.199.111.153 |
   | CNAME | www | gerardmurphyNH.github.io |

## Configuration

### Google Sheets (Email Signup)

1. Create a Google Sheet with columns: `email`, `firstName`, `virtue`, `timestamp`
2. Extensions → Apps Script → Deploy as Web App
3. Edit `src/lib/config.ts`:
   ```typescript
   export const GOOGLE_SHEETS_ENDPOINT = "YOUR_APPS_SCRIPT_URL";
   ```

### Google Analytics

1. Create GA4 property, get Measurement ID
2. Edit `index.html` - replace `G-XXXXXXXXXX` with your ID
3. Edit `src/lib/config.ts`:
   ```typescript
   export const GA_MEASUREMENT_ID = "G-YOUR_ID";
   ```

## Features

- ✅ Email capture → Google Sheets
- ✅ Interactive virtue quiz (4 outcomes)
- ✅ Free coloring page download
- ✅ 8-question FAQ with JSON-LD
- ✅ Privacy & Terms pages
- ✅ GA4 analytics with event tracking
- ✅ Mobile-responsive design
- ✅ SEO optimized

## Project Structure

See [CLAUDE.md](./CLAUDE.md) for detailed documentation.
