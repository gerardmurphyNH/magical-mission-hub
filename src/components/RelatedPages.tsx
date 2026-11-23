import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

/**
 * Curated "read next" links shown at the bottom of content pages.
 *
 * Most visitors land on one page from Google and leave. These links pass them
 * (and Google's crawler) to the closest related page, so authority earned by the
 * letter and calculator pages flows to the pages that rank less well.
 *
 * Every path here must be a real route - seo.test.ts checks string paths
 * against App.tsx.
 */
const PAGES: Record<string, { title: string; blurb: string }> = {
  "/tooth-fairy-letter": {
    title: "Free printable Tooth Fairy letter",
    blurb: "Fill in a few blanks and print a letter from the Tooth Fairy. No email needed.",
  },
  "/first-tooth-tradition": {
    title: "Free Tooth Fairy certificate",
    blurb: "A printable first-tooth keepsake naming the quality she found inside.",
  },
  "/how-much-does-the-tooth-fairy-leave": {
    title: "How much does the Tooth Fairy leave?",
    blurb: "The 2026 going rate by age, plus a free calculator for your family.",
  },
  "/why-does-the-tooth-fairy-leave-money": {
    title: "Why does the Tooth Fairy leave money?",
    blurb: "It isn't payment for the tooth. Here is what the gift really means.",
  },
  "/what-to-say-when-child-asks-if-tooth-fairy-is-real": {
    title: "What to say when they ask if she's real",
    blurb: "Gentle, honest words by age for the question every parent gets.",
  },
  "/is-the-tooth-fairy-real": {
    title: "Is the Tooth Fairy real?",
    blurb: "Yes, and the reason is not the one most people expect.",
  },
  "/what-does-the-tooth-fairy-do-with-teeth": {
    title: "What does the Tooth Fairy do with teeth?",
    blurb: "What really happens after she collects them, and why she wants them.",
  },
  "/first-tooth-what-to-do": {
    title: "First lost tooth: what to do next",
    blurb: "Keeping the tooth safe, the first night, and the questions that follow.",
  },
  "/letters-to-the-tooth-fairy": {
    title: "Write to the Tooth Fairy",
    blurb: "Make a keepsake letter to or from her, free to print or share.",
  },
  "/coloring-page": {
    title: "Free Tooth Fairy coloring page",
    blurb: "A printable PDF of the Tooth Fairy flying through a starry sky.",
  },
  "/for-teachers": {
    title: "Lost tooth classroom activities",
    blurb: "Free discussion prompts, a class tooth tracker and bulletin board ideas.",
  },
  "/tooth-fairy-printables": {
    title: "Free classroom worksheets",
    blurb: "An SEL worksheet, teacher guide and parent note for grades 1-2.",
  },
  "/tooth-fairy-story": {
    title: "Read the Tooth Fairy story",
    blurb: "A curious boy discovers what she really does with lost teeth.",
  },
  "/watch": {
    title: "Watch the short film",
    blurb: "The Tooth Fairy's Secret Workshop, about four minutes, free to watch.",
  },
  "/for-parents": {
    title: "For parents",
    blurb: "How to answer the big questions and make each lost tooth matter.",
  },
};

interface RelatedPagesProps {
  /** The page these links appear on, for analytics. */
  from: string;
  /** Paths to show, in order. Keep it to three. */
  links: string[];
  heading?: string;
}

const RelatedPages = ({ from, links, heading = "More from the Workshop" }: RelatedPagesProps) => (
  <section aria-labelledby="related-pages-heading" className="container px-6 py-14 max-w-5xl mx-auto">
    <h2
      id="related-pages-heading"
      className="font-display text-2xl font-bold text-foreground mb-6 text-center"
    >
      {heading}
    </h2>
    <div className="grid gap-4 sm:grid-cols-3">
      {links.map((path) => {
        const page = PAGES[path];
        if (!page) return null;
        return (
          <Link
            key={path}
            to={path}
            onClick={() => trackEvent("explore_click", { page: path, source: `related:${from}` })}
            className="group block rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/50"
          >
            <p className="font-display font-semibold text-foreground mb-1.5 group-hover:text-primary transition-colors">
              {page.title}
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">{page.blurb}</p>
            <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
              Read more
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        );
      })}
    </div>
  </section>
);

export default RelatedPages;
