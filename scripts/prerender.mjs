/**
 * Post-build static prerender: full HTML for every route.
 *
 * This is a client-rendered SPA, so without this step every URL serves an empty
 * <div id="root"> and the real content, <title>/<meta> tags and JSON-LD only
 * exist after JavaScript runs. Googlebot renders JS (in a delayed second pass),
 * but social crawlers and AI crawlers (GPTBot, ClaudeBot, PerplexityBot, ...)
 * do NOT - to them the site would be blank.
 *
 * Pipeline (see package.json "build"):
 *   1. vite build                       -> dist/ (client bundle + index.html shell)
 *   2. vite build --ssr entry-server    -> dist-ssr/ (renders <AppShell/> to a string)
 *   3. this script
 *
 * For every route in App.tsx plus "/", it renders the page to HTML, injects it
 * into #root, bakes the route's title/description/canonical/OG tags into <head>
 * (derived from that page's <PageSeo> props - single source of truth), and
 * writes a flat dist/<route>.html. main.tsx hydrates that markup in the browser.
 *
 * dist/index.html (the generic shell with an empty #root) is first copied to
 * dist/app-shell.html, which is what the Netlify SPA fallback serves for URLs
 * that aren't real routes - so unknown URLs never get homepage content baked in.
 *
 * Any render failure exits non-zero. A failed Netlify build leaves the previous
 * deploy live, which is far better than silently shipping a blank site.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(ROOT, "dist");
const SSR_ENTRY = path.join(ROOT, "dist-ssr/entry-server.js");
const PAGES = path.join(ROOT, "src/pages");
const APP = path.join(ROOT, "src/App.tsx");
const SITE = "https://wigglytoothworkshop.com";

const indexHtmlPath = path.join(DIST, "index.html");
if (!fs.existsSync(indexHtmlPath)) {
  console.error("prerender: dist/index.html not found - run the client build first.");
  process.exit(1);
}
if (!fs.existsSync(SSR_ENTRY)) {
  console.error("prerender: dist-ssr/entry-server.js not found - run `vite build --ssr src/entry-server.tsx --outDir dist-ssr`.");
  process.exit(1);
}
const shellHtml = fs.readFileSync(indexHtmlPath, "utf8");
if (!shellHtml.includes('<div id="root"></div>')) {
  console.error('prerender: expected an empty <div id="root"></div> in dist/index.html.');
  process.exit(1);
}
// Preserve the generic shell before "/" overwrites index.html. It's served for
// URLs that aren't real routes, so it must not carry the homepage's JSON-LD.
fs.writeFileSync(
  path.join(DIST, "app-shell.html"),
  shellHtml.replace(/\s*<script type="application\/ld\+json">[\s\S]*?<\/script>/g, ""),
);

// --- parse routes from App.tsx (skip catch-all; "/" handled separately) ---
const appSrc = fs.readFileSync(APP, "utf8");
const routes = {};
const routeRe = /<Route\s+path="([^"]+)"\s+element=\{<(\w+)\s*\/>\}/g;
let m;
while ((m = routeRe.exec(appSrc))) {
  if (m[1] !== "*" && m[1] !== "/") routes[m[1]] = m[2];
}

// --- extract a prop from a page's <PageSeo> block ---
function pageSeoBlock(src) {
  const start = src.indexOf("<PageSeo");
  if (start === -1) return null;
  const end = src.indexOf("/>", start);
  return end === -1 ? null : src.slice(start, end + 2);
}
function resolveAttr(block, src, name) {
  const lit = block.match(new RegExp(`${name}="([^"]*)"`));
  if (lit) return lit[1];
  const expr = block.match(new RegExp(`${name}=\\{(\\w+)\\}`));
  if (expr) {
    const cm = src.match(new RegExp(`const ${expr[1]}\\s*=\\s*"([^"]*)"`));
    if (cm) return cm[1];
  }
  return null;
}

const escAttr = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
const escText = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function applyMeta(html, { title, description, canonical, image }) {
  let out = html;
  if (title) {
    out = out.replace(/<title>[\s\S]*?<\/title>/, `<title>${escText(title)}</title>`);
    out = out.replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${escAttr(title)}$2`);
    out = out.replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${escAttr(title)}$2`);
  }
  if (description) {
    out = out.replace(/(<meta name="description" content=")[^"]*(")/, `$1${escAttr(description)}$2`);
    out = out.replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${escAttr(description)}$2`);
    out = out.replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${escAttr(description)}$2`);
  }
  if (canonical) {
    out = out.replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${escAttr(canonical)}$2`);
    out = out.replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${escAttr(canonical)}$2`);
  }
  if (image) {
    out = out.replace(/(<meta property="og:image" content=")[^"]*(")/, `$1${escAttr(image)}$2`);
    out = out.replace(/(<meta name="twitter:image" content=")[^"]*(")/, `$1${escAttr(image)}$2`);
  }
  // Strip the homepage's static JSON-LD from per-route copies; each page's own
  // structured data is rendered into the body by <PageSeo>.
  out = out.replace(/\s*<script type="application\/ld\+json">[\s\S]*?<\/script>/g, "");
  return out;
}

const withBody = (html, body) => html.replace('<div id="root"></div>', () => `<div id="root">${body}</div>`);

const visibleText = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const { render } = await import(pathToFileURL(SSR_ENTRY).href);

const problems = [];
function check(route, body) {
  if (!/<h1[\s>]/.test(body)) problems.push(`${route}: no <h1> in rendered HTML`);
  if (visibleText(body).length < 400) problems.push(`${route}: rendered text suspiciously short (${visibleText(body).length} chars)`);
  if (body.includes("data-prerender-fallback")) problems.push(`${route}: still contains the Suspense fallback`);
  if (route !== "/" && route !== "/privacy" && route !== "/terms" && !body.includes("application/ld+json")) {
    problems.push(`${route}: no JSON-LD in rendered HTML`);
  }
}

let count = 0;

// Homepage: keep index.html's own static head (meta + JSON-LD), add the body.
{
  const body = await render("/");
  check("/", body);
  fs.writeFileSync(indexHtmlPath, withBody(shellHtml, body));
  count++;
}

for (const [route, comp] of Object.entries(routes)) {
  const file = path.join(PAGES, `${comp}.tsx`);
  if (!fs.existsSync(file)) {
    problems.push(`${route}: page file ${comp}.tsx not found`);
    continue;
  }
  const src = fs.readFileSync(file, "utf8");
  const block = pageSeoBlock(src);
  const title = block && resolveAttr(block, src, "title");
  if (!title) {
    problems.push(`${route}: no static <PageSeo title>`);
    continue;
  }
  const meta = {
    title,
    description: resolveAttr(block, src, "description"),
    canonical: resolveAttr(block, src, "canonical") || `${SITE}${route}`,
    image: resolveAttr(block, src, "image"),
  };
  let body;
  try {
    body = await render(route);
  } catch (e) {
    problems.push(`${route}: render failed - ${e instanceof Error ? e.message : e}`);
    continue;
  }
  check(route, body);
  // Write a FLAT file (route.html), not a directory (route/index.html).
  // A directory makes Netlify 301 /route -> /route/ while our canonicals say
  // /route (no slash) - Google flagged that canonical->redirect ping-pong as a
  // "Redirect error". Netlify serves /route straight from route.html with a
  // clean 200, so the served URL matches the canonical exactly.
  fs.writeFileSync(path.join(DIST, `${route.replace(/^\//, "")}.html`), withBody(applyMeta(shellHtml, meta), body));
  count++;
}

console.log(`prerender: rendered ${count} route(s) + app-shell.html`);
if (problems.length) {
  console.error(`prerender: ${problems.length} problem(s):\n  - ${problems.join("\n  - ")}`);
  process.exit(1);
}
// The Supabase client can keep timers alive; don't let them hang the build.
process.exit(0);
