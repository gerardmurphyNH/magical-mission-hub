import { Link } from "react-router-dom";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import PageSeo from "@/components/PageSeo";
import FilmEmbed from "@/components/FilmEmbed";
import { YOUTUBE_VIDEO_URL } from "@/lib/config";
import { trackCTAClick, trackEvent } from "@/lib/analytics";

const PAGE_URL = "https://wigglytoothworkshop.com/what-does-the-tooth-fairy-look-like";
const SITE_URL = "https://wigglytoothworkshop.com/";
const IMG_BASE = "https://wigglytoothworkshop.com";
// PageSeo's static prerender only resolves a plain string-literal constant, not
// a template literal — see scripts/prerender.mjs resolveAttr.
const HERO_IMAGE_ABS = "https://wigglytoothworkshop.com/images/tooth-fairy-portrait.jpg";

// Stable, unhashed paths in /public/images so PageSeo's static prerender (which
// resolves a plain string literal, not an import) and the ImageObject schema
// both point at the same real URL.
const stills = [
  {
    src: "/images/tooth-fairy-portrait.jpg",
    alt: "CeCe the Tooth Fairy - a small winged tinkerer with a curled ponytail, goggles pushed up, and a tool belt, from The Tooth Fairy's Secret Workshop",
    caption: "CeCe, the Wiggly Tooth Workshop's Tooth Fairy - small, winged, and dressed for work.",
  },
  {
    src: "/images/tooth-fairy-first-glimpse.jpg",
    alt: "A child's first glimpse of the Tooth Fairy - a small glowing winged figure appearing in a bedroom doorway at night, from The Tooth Fairy's Secret Workshop",
    caption: "Most people describe seeing her the same way: a small glow, and then she's gone.",
  },
  {
    src: "/images/tooth-fairy-flying-with-letter.jpg",
    alt: "The Tooth Fairy flying through the night sky carrying a child's letter and tooth, from The Tooth Fairy's Secret Workshop",
    caption: "Wings built for quiet flight - she carries more than she looks like she could.",
  },
  {
    src: "/images/tooth-fairy-workshop-tooth.jpg",
    alt: "The Tooth Fairy holding a collected tooth inside her workshop lined with labeled jars, from The Tooth Fairy's Secret Workshop",
    caption: "At work in the Workshop, where every tooth's quality gets sorted with care.",
  },
];

const faqs = [
  {
    question: "What does the Tooth Fairy actually look like?",
    answer:
      "There's no single official answer - that's part of her charm. In a well-known 1984 study, researcher Rosemary Wells found that about 74% of people picture the Tooth Fairy as female, while the rest imagine her as male or as neither. In our story, she's CeCe: small, winged, with goggles and a tool belt for her work in the Workshop.",
  },
  {
    question: "Is the Tooth Fairy a girl or a boy?",
    answer:
      "Either, and both. There isn't just one Tooth Fairy - there are many, all over the world, and some are girls while others are boys. CeCe, the Tooth Fairy in our story, happens to be a she, but she's only one of many.",
  },
  {
    question: "Why do people picture the Tooth Fairy so differently?",
    answer:
      "Because she's a folk figure with no single fixed author. Different families, cultures, and children have imagined her their own way for generations - a winged pixie, a tiny ballerina, a mouse, a dragon, even a flying dentist. Every version is really just someone's best guess at what kindness, working quietly at night, might look like.",
  },
  {
    question: "What does CeCe, the Tooth Fairy in the film, look like?",
    answer:
      "CeCe is small - about hand-sized - with a curled ponytail, big curious eyes, dragonfly-like wings, and a well-worn tool belt and shoulder bag for her work in the Workshop. She looks less like a storybook fairy and more like a careful, capable tinkerer who happens to fly.",
  },
];

const WhatDoesTheToothFairyLookLike = () => {
  return (
    <div className="min-h-screen bg-background">
      <PageSeo
        title="What Does the Tooth Fairy Look Like? | Wiggly Tooth Workshop"
        description="What does the Tooth Fairy really look like? Meet CeCe, the small, winged Tooth Fairy from our film, and see how people around the world imagine her."
        canonical={PAGE_URL}
        image={HERO_IMAGE_ABS}
        jsonLd={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Wiggly Tooth Workshop", item: SITE_URL },
                { "@type": "ListItem", position: 2, name: "What Does the Tooth Fairy Look Like?", item: PAGE_URL },
              ],
            },
            {
              "@type": "Article",
              headline: "What Does the Tooth Fairy Look Like?",
              description:
                "There's no single official picture of the Tooth Fairy. See CeCe, the small, winged Tooth Fairy from The Tooth Fairy's Secret Workshop, and how she's imagined around the world.",
              url: PAGE_URL,
              mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL },
              publisher: { "@type": "Organization", name: "Wiggly Tooth Workshop", url: SITE_URL },
              author: { "@type": "Organization", name: "Wiggly Tooth Workshop", url: SITE_URL },
              // Ties this page to the film entity — the stills above are frames
              // from it, and the film is the fullest visual answer to this question.
              mentions: {
                "@type": "Movie",
                name: "The Tooth Fairy's Secret Workshop",
                url: "https://wigglytoothworkshop.com/watch",
                sameAs: [
                  "https://www.wikidata.org/wiki/Q140607725",
                  "https://www.imdb.com/title/tt43689600/",
                  "https://www.themoviedb.org/movie/1733539-the-tooth-fairy-s-secret-workshop",
                ],
              },
            },
            ...stills.map((s) => ({
              "@type": "ImageObject",
              contentUrl: `${IMG_BASE}${s.src}`,
              url: `${IMG_BASE}${s.src}`,
              description: s.alt,
              creditText: "Wiggly Tooth Workshop",
              creator: { "@type": "Organization", name: "Wiggly Tooth Workshop", url: SITE_URL },
              copyrightNotice: "© 2026 Wiggly Tooth Workshop. Illustrations by Peter H. Reynolds.",
              license: PAGE_URL,
              acquireLicensePage: "https://wigglytoothworkshop.com/terms",
            })),
            {
              "@type": "FAQPage",
              mainEntity: faqs.map((f) => ({
                "@type": "Question",
                name: f.question,
                acceptedAnswer: { "@type": "Answer", text: f.answer },
              })),
            },
          ],
        }}
      />
      <NavBar />

      <main>
        {/* ── Hero ── */}
        <section className="night-sky-section py-20 md:py-28 relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 18 }, (_, i) => (
              <div key={i} className="absolute w-1 h-1 bg-starlight rounded-full sparkle"
                style={{ left: `${(i * 17 + 7) % 100}%`, top: `${(i * 23 + 11) % 85}%`, animationDelay: `${(i * 0.15) % 2}s` }} />
            ))}
          </div>
          <div className="container px-6 relative z-10 max-w-2xl mx-auto text-center">
            <Link to="/" className="inline-flex items-center gap-2 text-starlight/70 hover:text-starlight transition-colors text-sm mb-10">
              <ArrowLeft className="w-4 h-4" /> Wiggly Tooth Workshop
            </Link>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-starlight mb-5 leading-tight">
              What Does the <span className="text-primary">Tooth Fairy</span> Look Like?
            </h1>
            <p className="text-starlight/80 text-lg leading-relaxed max-w-xl mx-auto">
              There's no single official picture - which is part of the magic.
              Here's what people around the world imagine, and what she looks
              like in our story.
            </p>
          </div>
        </section>

        {/* ── Direct answer ── */}
        <section className="py-14 md:py-16 bg-background">
          <div className="container px-6 max-w-2xl mx-auto">
            <div className="p-6 rounded-2xl bg-secondary/40 border border-border">
              <p className="text-foreground text-lg leading-relaxed">
                <span className="font-display font-bold">The short answer:</span>{" "}
                small, quick, and hard to catch a good look at. In a well-known
                1984 study, researcher Rosemary Wells found about 74% of people
                picture the Tooth Fairy as female, while the rest imagine her as
                male or as neither. Beyond that, everyone pictures her a little
                differently - which is exactly why we made our own.
              </p>
            </div>
          </div>
        </section>

        {/* ── Meet CeCe: image gallery ── */}
        <section className="py-16 md:py-20 bg-secondary/30">
          <div className="container px-6 max-w-5xl mx-auto">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3 text-center">
              Meet CeCe, Our Tooth Fairy
            </h2>
            <p className="text-muted-foreground text-center max-w-xl mx-auto mb-10">
              From <em>The Tooth Fairy's Secret Workshop</em> - small, winged, and
              dressed for a night of careful work.
            </p>
            <div className="grid sm:grid-cols-2 gap-5">
              {stills.map((s, i) => (
                <figure key={i} className="rounded-2xl overflow-hidden shadow-card bg-background">
                  <img src={s.src} alt={s.alt} width={1000} height={534} loading={i < 2 ? "eager" : "lazy"} className="w-full h-auto" />
                  <figcaption className="p-4 text-sm text-muted-foreground leading-relaxed">{s.caption}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ── Why she looks different to everyone ── */}
        <section className="py-16 md:py-20 bg-background">
          <div className="container px-6 max-w-2xl mx-auto">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6 leading-tight">
              Why Everyone Pictures Her Differently
            </h2>
            <div className="space-y-4 text-foreground/80 text-lg leading-relaxed">
              <p>
                The Tooth Fairy is a folk figure with no single fixed author, so
                every family - and every child - gets to imagine her their own
                way. Depending who you ask, she's been pictured as a winged
                pixie, a tiny ballerina, a mouse, a dragon, or even a flying
                dentist.
              </p>
              <p>
                In our story, she's CeCe: a small, clever tinkerer with goggles
                and a tool belt, more capable engineer than storybook fairy.
                That's simply our version of a character the whole world has
                been imagining for a very long time - one who works quietly, at
                night, drawing the good out of every tooth she collects.
              </p>
            </div>
          </div>
        </section>

        {/* ── Film embed ── */}
        <FilmEmbed
          location="what_does_she_look_like"
          heading="See CeCe in Motion"
          blurb="Watch The Tooth Fairy's Secret Workshop to see CeCe fly, work, and meet the boy whose letter changes everything. Free to watch."
        />

        {/* ── FAQ ── */}
        <section className="py-16 md:py-20 bg-secondary/30">
          <div className="container px-6 max-w-2xl mx-auto">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">Questions About What She Looks Like</h2>
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="magical-card border-0 data-[state=open]:shadow-magical transition-shadow">
                  <AccordionTrigger className="text-left font-display font-semibold text-foreground hover:text-primary transition-colors hover:no-underline px-0">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pt-2">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* ── Cross-links ── */}
        <section className="py-16 md:py-20 bg-background">
          <div className="container px-6 max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <Sparkles className="w-6 h-6 text-primary mx-auto mb-4" />
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">Continue Exploring</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {[
                { to: "/is-the-tooth-fairy-real", label: "Is the Tooth Fairy Real?", desc: "Where the legend comes from, around the world." },
                { to: "/tooth-fairy-story", label: "Read the Tooth Fairy Story", desc: "The tale of Arlo, CeCe, and the workshop above the clouds." },
                { to: "/letters-to-the-tooth-fairy", label: "Write a Letter to the Tooth Fairy", desc: "Share the quality in your child's tooth." },
              ].map((link) => (
                <Link key={link.to} to={link.to} onClick={() => trackEvent("explore_click", { page: link.to, source: "look_like" })}
                  className="magical-card group hover:shadow-magical transition-all duration-300 hover:-translate-y-0.5">
                  <p className="font-display font-semibold text-foreground group-hover:text-primary transition-colors mb-1">{link.label}</p>
                  <p className="text-sm text-muted-foreground">{link.desc}</p>
                </Link>
              ))}
            </div>
            <a href={YOUTUBE_VIDEO_URL} target="_blank" rel="noopener noreferrer"
              onClick={() => trackEvent("social_click", { platform: "youtube", location: "look_like" })}
              className="block w-full rounded-2xl bg-[hsl(244_45%_15%)] border border-primary/25 hover:border-primary/50 p-6 text-center transition-all hover:shadow-magical group">
              <Sparkles className="w-5 h-5 text-primary mx-auto mb-3" />
              <p className="font-display font-semibold text-starlight group-hover:text-primary transition-colors mb-1">Watch the Animated Short Film</p>
              <p className="text-sm text-starlight/80">See the Tooth Fairy's world come to life - free on YouTube.</p>
            </a>
          </div>
        </section>

        {/* ── Join the Workshop ── */}
        <section className="py-16 bg-secondary/30">
          <div className="container px-6 max-w-xl mx-auto text-center">
            <div className="magical-card">
              <Sparkles className="w-6 h-6 text-primary mx-auto mb-3" />
              <h2 className="font-display text-xl font-semibold text-foreground mb-2">Join the Workshop</h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                A quiet place for new stories, free printables, and the
                continuing world of the Tooth Fairy.
              </p>
              <Button variant="magical" size="sm" asChild>
                <a href="/#signup" onClick={() => trackCTAClick("look_like")}>
                  <Sparkles className="w-3.5 h-3.5" /> Join the Workshop
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default WhatDoesTheToothFairyLookLike;
