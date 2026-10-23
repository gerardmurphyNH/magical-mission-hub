import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { AppShell } from "./App";

// Route pages are React.lazy chunks. renderToString can't wait on them, so the
// first pass emits the Suspense fallback while React starts loading the chunk;
// once it has resolved, a later pass renders the real page. Retry until the
// fallback marker is gone.
export async function render(url: string): Promise<string> {
  for (let attempt = 0; attempt < 80; attempt++) {
    const html = renderToString(
      <StaticRouter location={url}>
        <AppShell />
      </StaticRouter>,
    );
    if (!html.includes("data-prerender-fallback")) return html;
    await new Promise((resolve) => setTimeout(resolve, 25));
  }
  throw new Error(`still suspended after retries: ${url}`);
}
