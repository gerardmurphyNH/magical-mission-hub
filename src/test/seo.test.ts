import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";

/**
 * SEO / AEO regression guard.
 *
 * These tests statically validate the SEO invariants this site has broken
 * before: pages missing per-page <PageSeo> (so they share the global title),
 * duplicate titles, internal links pointing at routes that don't exist,
 * download/image links pointing at files that don't exist, and the sitemap
 * drifting out of sync with the real routes.
 *
 * They read source files directly (no rendering needed), so they're fast and
 * deterministic. If one fails, the message names the offending page.
 */

const ROOT = process.cwd();
const PAGES_DIR = path.join(ROOT, "src/pages");
const SRC_DIR = path.join(ROOT, "src");
const PUBLIC_DIR = path.join(ROOT, "public");

// Pages that intentionally rely on the global <title> from index.html or are
// not indexable, and therefore don't need a per-page PageSeo title.
const TITLE_EXEMPT = new Set(["Index", "NotFound"]);
// Routes that don't belong in the sitemap.
const SITEMAP_EXEMPT = new Set<string>([]);

// ---- helpers ---------------------------------------------------------------

function read(file: string): string {
  return fs.readFileSync(file, "utf8");
}

function allTsxFiles(dir: string): string[] {
  const out: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "test") continue; // don't scan the tests themselves
      out.push(...allTsxFiles(full));
    } else if (/\.tsx?$/.test(entry.name) && !/\.(test|spec)\.tsx?$/.test(entry.name)) {
      out.push(full);
    }
  }
  return out;
}

// route path -> component name, parsed from App.tsx
function parseRoutes(): Record<string, string> {
  const app = read(path.join(SRC_DIR, "App.tsx"));
  const routes: Record<string, string> = {};
  const re = /<Route\s+path="([^"]+)"\s+element=\{<(\w+)\s*\/>\}/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(app))) {
    routes[m[1]] = m[2];
  }
  return routes;
}

// Extract the <PageSeo ... /> block from a file (or null if none)
function pageSeoBlock(src: string): string | null {
  const start = src.indexOf("<PageSeo");
  if (start === -1) return null;
  const end = src.indexOf("/>", start);
  if (end === -1) return null;
  return src.slice(start, end + 2);
}

function attr(block: string, name: string): string | null {
  const m = block.match(new RegExp(`${name}="([^"]*)"`));
  return m ? m[1] : null;
}

// Resolve a prop that may be a string literal (name="...") or a const
// expression (name={IDENT}, where `const IDENT = "..."` is defined in `src`).
function resolveAttr(block: string, src: string, name: string): string | null {
  const lit = attr(block, name);
  if (lit) return lit;
  const expr = block.match(new RegExp(`${name}=\\{(\\w+)\\}`));
  if (expr) {
    const cm = src.match(new RegExp(`const ${expr[1]}\\s*=\\s*"([^"]*)"`));
    if (cm) return cm[1];
  }
  return null;
}

const routes = parseRoutes();
const indexableRoutes = Object.entries(routes).filter(([p]) => p !== "*");

// ---- tests -----------------------------------------------------------------

describe("routes", () => {
  it("App.tsx defines routes and a catch-all", () => {
    expect(Object.keys(routes).length).toBeGreaterThan(15);
    expect(routes["*"]).toBe("NotFound");
    expect(routes["/"]).toBeTruthy();
  });

  it("every routed page component file exists", () => {
    for (const [p, comp] of Object.entries(routes)) {
      const file = path.join(PAGES_DIR, `${comp}.tsx`);
      expect(fs.existsSync(file), `Missing page file for route ${p}: ${comp}.tsx`).toBe(true);
    }
  });
});

describe("per-page SEO", () => {
  it("every indexable page renders <PageSeo>", () => {
    for (const [p, comp] of indexableRoutes) {
      if (comp === "NotFound") continue;
      const src = read(path.join(PAGES_DIR, `${comp}.tsx`));
      expect(src.includes("<PageSeo"), `Route ${p} (${comp}) is missing <PageSeo>`).toBe(true);
    }
  });

  it("every page (except homepage) sets a non-empty title + canonical", () => {
    for (const [p, comp] of indexableRoutes) {
      if (TITLE_EXEMPT.has(comp)) continue;
      const src = read(path.join(PAGES_DIR, `${comp}.tsx`));
      const block = pageSeoBlock(src);
      expect(block, `Route ${p} (${comp}) has no parseable PageSeo block`).toBeTruthy();
      const title = resolveAttr(block!, src, "title");
      const canonical = resolveAttr(block!, src, "canonical");
      expect(title && title.length > 5, `Route ${p} (${comp}) has no PageSeo title`).toBe(true);
      expect(
        canonical && canonical.startsWith("https://wigglytoothworkshop.com"),
        `Route ${p} (${comp}) has no/invalid canonical`,
      ).toBe(true);
    }
  });

  it("meta descriptions stay within SERP-friendly length (50-165 chars)", () => {
    // No TITLE_EXEMPT skip here (unlike the title test): the homepage sets no
    // per-page title by design, but it still sets a description and must not
    // be exempt from this check just because it's exempt from that one.
    const offenders: string[] = [];
    for (const [p, comp] of indexableRoutes) {
      const src = read(path.join(PAGES_DIR, `${comp}.tsx`));
      const block = pageSeoBlock(src);
      const desc = block && resolveAttr(block, src, "description");
      if (!desc) continue;
      if (desc.length < 50 || desc.length > 165) {
        offenders.push(`${p} (${comp}): ${desc.length} chars`);
      }
    }
    expect(offenders, `Descriptions outside 50-165 chars:\n${offenders.join("\n")}`).toEqual([]);
  });

  it("page titles are unique (no two pages share a <title>)", () => {
    const seen = new Map<string, string>();
    for (const [, comp] of indexableRoutes) {
      if (TITLE_EXEMPT.has(comp)) continue;
      const src = read(path.join(PAGES_DIR, `${comp}.tsx`));
      const block = pageSeoBlock(src);
      const title = block && resolveAttr(block, src, "title");
      if (!title) continue;
      expect(seen.has(title), `Duplicate title "${title}" on ${comp} and ${seen.get(title)}`).toBe(false);
      seen.set(title, comp);
    }
  });

  it("answer/content pages include FAQPage structured data", () => {
    // Pages whose whole purpose is answering a question should expose FAQPage.
    const mustHaveFaq = [
      "IsToothFairyReal",
      "WhatDoesTheToothFairyDo",
      "WhyDoesTheToothFairyLeaveMoney",
      "FirstToothTradition",
    ];
    for (const comp of mustHaveFaq) {
      const src = read(path.join(PAGES_DIR, `${comp}.tsx`));
      expect(src.includes("FAQPage"), `${comp} should include FAQPage structured data`).toBe(true);
    }
  });
});

describe("internal links", () => {
  const files = allTsxFiles(SRC_DIR);
  // Collect candidate internal paths from string literals across all source.
  const ROUTE_LIKE = /"(\/[a-z0-9-]*(?:\/[a-z0-9-]+)*)"/g;

  it("every internal route link points to a defined route", () => {
    const valid = new Set(Object.keys(routes));
    const offenders: string[] = [];
    for (const file of files) {
      const src = read(file);
      let m: RegExpExecArray | null;
      ROUTE_LIKE.lastIndex = 0;
      while ((m = ROUTE_LIKE.exec(src))) {
        const p = m[1];
        if (p === "/") continue;
        if (p.startsWith("/downloads/") || p.startsWith("/images/") || p.startsWith("/assets/")) continue;
        if (!valid.has(p)) offenders.push(`${path.relative(ROOT, file)} -> ${p}`);
      }
    }
    expect(offenders, `Internal links to undefined routes:\n${offenders.join("\n")}`).toEqual([]);
  });

  it("every referenced /downloads and /images asset exists in public/", () => {
    const ASSET = /"(\/(?:downloads|images)\/[^"]+?\.[a-z0-9]+)"/g;
    const offenders: string[] = [];
    for (const file of files) {
      const src = read(file);
      let m: RegExpExecArray | null;
      ASSET.lastIndex = 0;
      while ((m = ASSET.exec(src))) {
        const rel = m[1].replace(/^\//, "");
        if (!fs.existsSync(path.join(PUBLIC_DIR, rel))) {
          offenders.push(`${path.relative(ROOT, file)} -> ${m[1]}`);
        }
      }
    }
    expect(offenders, `Links to missing public files:\n${offenders.join("\n")}`).toEqual([]);
  });
});

describe("images", () => {
  it("every ImageObject has creator, copyrightNotice, and acquireLicensePage", () => {
    // Google Search Console flags ImageObject items missing these fields.
    const offenders: string[] = [];
    for (const file of allTsxFiles(PAGES_DIR)) {
      const src = read(file);
      const imageObjects = (src.match(/"@type":\s*"ImageObject"/g) || []).length;
      if (!imageObjects) continue;
      for (const field of ["creator", "copyrightNotice", "acquireLicensePage"]) {
        const count = (src.match(new RegExp(`${field}:`, "g")) || []).length;
        if (count < imageObjects) {
          offenders.push(`${path.relative(ROOT, file)}: ${imageObjects} ImageObject(s) but ${count} "${field}"`);
        }
      }
    }
    expect(offenders, `ImageObject missing required metadata:\n${offenders.join("\n")}`).toEqual([]);
  });

  it("every <img> has alt text", () => {
    const offenders: string[] = [];
    for (const file of allTsxFiles(SRC_DIR)) {
      const src = read(file);
      const imgs = src.match(/<img[\s\S]*?\/>/g) || [];
      for (const tag of imgs) {
        if (!/\salt=/.test(tag)) offenders.push(`${path.relative(ROOT, file)}: ${tag.slice(0, 60)}...`);
      }
    }
    expect(offenders, `<img> without alt:\n${offenders.join("\n")}`).toEqual([]);
  });
});

describe("sitemap.xml", () => {
  const xml = read(path.join(PUBLIC_DIR, "sitemap.xml"));
  const locs = [...xml.matchAll(/<loc>https:\/\/wigglytoothworkshop\.com(\/[^<]*)<\/loc>/g)].map(
    (m) => (m[1] === "/" ? "/" : m[1].replace(/\/$/, "")),
  );

  it("contains every indexable route", () => {
    const missing = indexableRoutes
      .map(([p]) => p)
      .filter((p) => !SITEMAP_EXEMPT.has(p) && !locs.includes(p));
    expect(missing, `Routes missing from sitemap:\n${missing.join("\n")}`).toEqual([]);
  });

  it("has no stale entries (every <loc> maps to a real route)", () => {
    const valid = new Set(Object.keys(routes));
    const stale = locs.filter((p) => p !== "/" && !valid.has(p));
    expect(stale, `Stale sitemap entries (no matching route):\n${stale.join("\n")}`).toEqual([]);
  });

  it("uses the wigglytoothworkshop.com domain (not tooth-safe.com)", () => {
    expect(xml.includes("tooth-safe.com")).toBe(false);
  });
});

describe("stale domain (tooth-safe.com)", () => {
  // The site moved from tooth-safe.com to wigglytoothworkshop.com. The old
  // domain leaking into a URL (canonical, og:url, or a YouTube embed `origin=`)
  // confuses Google's crawler — this happened on the homepage video embed.
  // Flag any tooth-safe.com used as a URL; allow it only inside an email (@...).
  it("no tooth-safe.com URL appears in shipped source", () => {
    const targets = [
      path.join(ROOT, "index.html"),
      path.join(PUBLIC_DIR, "sitemap.xml"),
      path.join(PUBLIC_DIR, "robots.txt"),
      ...allTsxFiles(SRC_DIR),
    ].filter((f) => fs.existsSync(f));

    const offenders: string[] = [];
    for (const file of targets) {
      const src = read(file);
      const re = /(.)tooth-safe\.com/g;
      let m: RegExpExecArray | null;
      while ((m = re.exec(src))) {
        if (m[1] === "@") continue; // an email address is allowed
        offenders.push(`${path.relative(ROOT, file)}: ...${m[1]}tooth-safe.com`);
      }
    }
    expect(offenders, `Stale tooth-safe.com URL references:\n${offenders.join("\n")}`).toEqual([]);
  });
});
