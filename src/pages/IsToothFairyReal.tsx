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
import VirtueQuizSection from "@/components/VirtueQuizSection";
import { YOUTUBE_VIDEO_URL } from "@/lib/config";
import { trackCTAClick, trackEvent } from "@/lib/analytics";

const PAGE_URL = "https://wigglytoothworkshop.com/is-the-tooth-fairy-real";
const SITE_URL = "https://wigglytoothworkshop.com/";

const faqs = [
  {
    question: "Is the Tooth Fairy real?",
    answer:
      "Yes. The Tooth Fairy is real - she just works in ways most people never see. She visits at night, takes the tooth a child has lost, and draws out the quality that grew inside it while it was theirs: courage, kindness, patience, creativity. Those qualities are real, and so is what she does with them. You may never catch sight of her, but the evidence is left behind every time.",
  },
  {
    question: "Are tooth fairies real?",
    answer:
      "Yes - and there's more than one. Tooth fairies work all over the world, each looking after the children in their own corner of it. Some are girls, some are boys, each with their own name. The one at the heart of our story is CeCe, but she is only one of many. So when you ask if tooth fairies are real, the honest answer is yes, plural.",
  },
  {
    question: "Is there proof the Tooth Fairy is real?",
    answer:
      "The proof is what she leaves behind. The tooth is gone by morning and something waits in its place - and the qualities that tooth carried, the courage and kindness and patience a child grew, are real and don't disappear. Like courage or kindness themselves, the Tooth Fairy is known by what she does, not by being caught in the act.",
  },
  {
    question: "Does the Tooth Fairy really exist?",
    answer:
      "Yes. She exists the way the most important quiet things exist - not as something you can catch on camera, but as something real by its effects. A tooth vanishes, a small gift appears, and the good a child is growing keeps rippling outward. That's the Tooth Fairy, doing exactly what she has always done.",
  },
  {
    question: "Is the Tooth Fairy real for grown-ups too?",
    answer:
      "In a way, yes. Grown-ups stop expecting to see her, but the thing the tradition points at stays true: children really do grow courage, kindness, and wonder, and those qualities really do make the world better. Believing in the Tooth Fairy, for an adult, is mostly believing that what children become matters. It does.",
  },
  {
    question: "Why does the Tooth Fairy take teeth?",
    answer:
      "Not because the teeth themselves are valuable, but because of what's inside them. Every tooth quietly absorbs the qualities a child grows - bravery from facing something scary, kindness from helping, patience from waiting. The Tooth Fairy collects those qualities and uses them to gently help keep the world in balance.",
  },
  {
    question: "Why doesn't the Tooth Fairy let anyone see her?",
    answer:
      "Partly because she works better unseen, and partly because the mystery is part of how the tradition works. A visitor who leaves something in the night is wondrous; a visitor you can watch is just a person. Most important things - courage, kindness, the wind - work quietly. The Tooth Fairy fits right in.",
  },
  {
    question: "Is the Tooth Fairy a girl or a boy?",
    answer:
      "Either - and both. There isn't just one Tooth Fairy; there are many, all over the world, working quietly to keep things in balance. Some are girls, some are boys. The one at the heart of our story is named CeCe, but she's only one of many. So there's no single right answer: the Tooth Fairy who visits your house might be a she, a he, or simply the idea of someone who notices the good a child is growing.",
  },
  {
    question: "What is the Tooth Fairy's name?",
    answer:
      "The Tooth Fairy in our story is named CeCe. But she's one of many tooth fairies who help keep the world in balance - each with their own name, their own corner of the world, and their own children whose teeth they look after. CeCe is simply the one whose story we get to follow.",
  },
  {
    question: "Is the Tooth Fairy real, or is it your parents?",
    answer:
      "It's the question every child eventually asks - and the honest answer is: both can be true. Parents help. They always have, slipping the coin under the pillow on the nights the Tooth Fairy can't make it. But the part that isn't pretend is what the tradition is really about: the courage, kindness, and wonder a child grows are real, and they really do matter. Parents are the Tooth Fairy's helpers, not her replacement. The magic is in what your child is becoming.",
  },
  {
    question: "What do I tell my child when they ask if the Tooth Fairy is real?",
    answer:
      "You don't have to settle it in a single sentence. A gentle answer is to ask what they think, then lean into what's true underneath the story: the courage, kindness, and creativity the Tooth Fairy looks for are real qualities your child really is growing. The wonder and the honesty can both stay.",
  },
];

const exploreLinks = [
  {
    to: "/what-does-the-tooth-fairy-do-with-teeth",
    label: "What Does the Tooth Fairy Do With Teeth?",
    desc: "Inside the workshop, and what happens after she visits.",
  },
  {
    to: "/why-does-the-tooth-fairy-take-teeth",
    label: "Why Does the Tooth Fairy Take Teeth?",
    desc: "The reason behind a tradition older than anyone remembers.",
  },
  {
    to: "/tooth-fairy-story",
    label: "Read the Tooth Fairy Story",
    desc: "The tale of Arlo, CeCe, and the workshop above the clouds.",
  },
  {
    to: "/tooth-fairy-faq",
    label: "Tooth Fairy Questions, Answered",
    desc: "Every question children (and parents) ask.",
  },
];

const IsToothFairyReal = () => {
  return (
    <div className="min-h-screen bg-background">
      <PageSeo
        title="Is the Tooth Fairy Real? Yes, and Here's Why | Wiggly Tooth Workshop"
        description="Is the Tooth Fairy real? Yes. She works quietly at night, collecting the qualities children grow inside their lost teeth. The honest, magical answer."
        canonical={PAGE_URL}
        jsonLd={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Wiggly Tooth Workshop", item: SITE_URL },
                { "@type": "ListItem", position: 2, name: "Is the Tooth Fairy Real?", item: PAGE_URL },
              ],
            },
            {
              "@type": "Article",
              headline: "Is the Tooth Fairy Real?",
              description:
                "Yes, the Tooth Fairy is real - she just works in ways most people never see. What she really does with children's lost teeth, and why it matters.",
              url: PAGE_URL,
              mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL },
              publisher: { "@type": "Organization", name: "Wiggly Tooth Workshop", url: SITE_URL },
              author: { "@type": "Organization", name: "Wiggly Tooth Workshop", url: SITE_URL },
              // Ties this page to the film entity (and its Wikidata/IMDb/TMDB authority)
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
        <section className="night-sky-section py-24 md:py-36 relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 20 }, (_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-starlight rounded-full sparkle"
                style={{
                  left: `${(i * 17 + 7) % 100}%`,
                  top: `${(i * 23 + 11) % 85}%`,
                  animationDelay: `${(i * 0.15) % 2}s`,
                }}
              />
            ))}
          </div>

          <div className="container px-6 relative z-10 max-w-3xl mx-auto text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-starlight/70 hover:text-starlight/80 transition-colors text-sm mb-12"
            >
              <ArrowLeft className="w-4 h-4" />
              Wiggly Tooth Workshop
            </Link>

            <p className="text-xs font-semibold uppercase tracking-widest text-primary/80 mb-6">
              A question worth asking
            </p>

            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-starlight leading-tight mb-8">
              Is the Tooth Fairy
              <br />
              <span className="text-primary">Real?</span>
            </h1>

            <p className="text-starlight/80 text-lg md:text-xl leading-relaxed max-w-xl mx-auto">
              Yes - and the real answer is far more interesting than you've been
              told.
            </p>
          </div>
        </section>

        {/* ── Opening ── */}
        <section className="py-20 md:py-28 bg-background">
          <div className="container px-6 max-w-2xl mx-auto">

            {/* Direct answer first — a self-contained answer for search + AI overviews */}
            <div className="mb-12 p-6 rounded-2xl bg-secondary/40 border border-border">
              <p className="text-foreground text-lg leading-relaxed">
                <span className="font-display font-bold text-foreground">
                  Yes - the Tooth Fairy is real.
                </span>{" "}
                She just works in ways most people never see. She visits at
                night, takes each lost tooth for the quality that grew inside it
                - courage, kindness, patience, creativity - and uses it to
                quietly help the world. You may never catch sight of her, but
                every tooth she collects leaves the evidence behind.
              </p>
            </div>

            <div className="space-y-6 text-foreground/80 text-lg leading-relaxed mb-10">
              <p>
                That's the short answer. The longer one is more interesting -
                and it starts with a few questions worth asking. Why does she
                collect teeth? What happens to them after they disappear beneath
                the pillow?
              </p>
              <p>
                These aren't small questions. They're the kind that open up
                something larger - about what children are really doing when
                they grow, and what that growing is quietly worth.
              </p>
            </div>

            {/* Pull quote */}
            <figure className="my-14 pl-6 border-l-4 border-primary">
              <blockquote className="font-display text-2xl md:text-3xl font-bold text-foreground leading-snug">
                "Every lost tooth carries something worth keeping."
              </blockquote>
            </figure>

            <div className="space-y-6 text-foreground/80 text-lg leading-relaxed">
              <p>
                Childhood is full of invisible work. Every time a child tries
                something frightening, a small piece of courage takes shape.
                Every moment of patience, every act of kindness, every
                afternoon spent building something from nothing - all of it
                accumulates. Not in any place you can point to. But somewhere.
              </p>
              <p>
                Teeth grow slowly, over years, through all of it. A first loose
                tooth arrives after a childhood of small acts - fears faced,
                kindness offered, persistence practiced in quiet rooms. When it
                finally falls, it doesn't leave empty.
              </p>
              <p>
                Maybe that's the part we've been forgetting to notice.
              </p>
            </div>
          </div>
        </section>

        {/* ── Film embed (prominent) ── */}
        <FilmEmbed
          location="is_tf_real"
          heading="See the real story of the Tooth Fairy"
          blurb="Watch The Tooth Fairy's Secret Workshop - the short film that shows what she really does with the teeth she collects, and why she is real. Free to watch."
          bg="bg-background"
        />

        {/* ── What if teeth hold more ── */}
        <section className="py-20 md:py-28 bg-secondary/30">
          <div className="container px-6 max-w-2xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-8 leading-tight">
              What If Teeth Hold More
              <br className="hidden sm:block" /> Than Memories?
            </h2>

            <div className="space-y-6 text-foreground/80 text-lg leading-relaxed mb-10">
              <p>
                There's an old idea at the heart of the Tooth Fairy story - one
                that most people overlook because they're too focused on the
                coin or bill left behind.
              </p>
              <p>
                Baby teeth don't just hold the shape of a child's smile. Over
                the years they form, they quietly absorb the qualities a child
                brings into the world. Not as wishes. Not as magic. But as
                something real and earned.
              </p>
            </div>

            {/* Virtue categories */}
            <div className="my-10 space-y-6">
              {[
                {
                  name: "Spark Virtues",
                  tagline: "The qualities that help ideas begin.",
                  pill: "bg-amber-100 text-amber-800",
                  border: "border-amber-200",
                  virtues: ["Curiosity", "Creativity", "Imagination", "Wonder", "Ingenuity", "Discovery", "Inspiration"],
                },
                {
                  name: "Heart Virtues",
                  tagline: "The qualities that help people care for one another.",
                  pill: "bg-rose-100 text-rose-800",
                  border: "border-rose-200",
                  virtues: ["Kindness", "Compassion", "Empathy", "Friendship", "Generosity", "Gratitude", "Forgiveness", "Love"],
                },
                {
                  name: "Strong Virtues",
                  tagline: "The qualities that help children face difficult things.",
                  pill: "bg-blue-100 text-blue-800",
                  border: "border-blue-200",
                  virtues: ["Bravery", "Courage", "Resilience", "Confidence", "Determination", "Perseverance", "Hope", "Boldness"],
                },
                {
                  name: "Steady Virtues",
                  tagline: "The qualities that help keep the world balanced.",
                  pill: "bg-violet-100 text-violet-800",
                  border: "border-violet-200",
                  virtues: ["Patience", "Honesty", "Thoughtfulness", "Responsibility", "Fairness", "Calmness", "Focus", "Self-Control"],
                },
                {
                  name: "Light Virtues",
                  tagline: "The qualities that brighten the world around us.",
                  pill: "bg-yellow-100 text-yellow-800",
                  border: "border-yellow-200",
                  virtues: ["Joy", "Humor", "Optimism", "Playfulness", "Cheerfulness", "Encouragement"],
                },
              ].map(({ name, tagline, pill, border, virtues }) => (
                <div
                  key={name}
                  className={`p-5 rounded-2xl bg-background border ${border}`}
                >
                  <p className="font-display font-semibold text-foreground mb-0.5">{name}</p>
                  <p className="text-muted-foreground text-sm mb-3 italic">{tagline}</p>
                  <div className="flex flex-wrap gap-2">
                    {virtues.map((v) => (
                      <span
                        key={v}
                        className={`text-xs font-medium px-2.5 py-1 rounded-full ${pill}`}
                      >
                        {v}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <p className="text-foreground/80 text-lg leading-relaxed">
              These qualities are real. Children grow them every day. And when a
              tooth finally lets go, it doesn't leave empty.
            </p>
          </div>
        </section>

        {/* ── Virtue quiz ── */}
        <VirtueQuizSection />

        {/* ── Why does she collect ── */}
        <section className="py-20 md:py-28 bg-background">
          <div className="container px-6 max-w-2xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-8 leading-tight">
              Why Does the Tooth Fairy
              <br className="hidden sm:block" /> Collect Teeth?
            </h2>

            <div className="space-y-6 text-foreground/80 text-lg leading-relaxed mb-10">
              <p>
                The Tooth Fairy doesn't collect teeth because they are rare or
                valuable.
              </p>
              <p>
                She collects them because what's inside them matters.
              </p>
              <p>
                She works carefully with what children leave behind -
                drawing out the qualities that grew inside each tooth and
                finding quiet ways to put them back into the world where
                they're needed most.
              </p>
            </div>

            {/* Pull quote, smaller */}
            <figure className="my-10 py-6 px-8 rounded-2xl bg-secondary/40 border border-border text-center">
              <blockquote className="font-display text-xl md:text-2xl font-semibold text-foreground leading-snug italic">
                "Not as miracles. Not as wishes granted.
                <br className="hidden md:block" />
                As small, invisible nudges."
              </blockquote>
            </figure>

            <div className="space-y-6 text-foreground/80 text-lg leading-relaxed">
              <p>
                A person who finds a little more courage than they expected. A
                moment of patience that prevents something from falling apart.
                An unexpected kindness that arrives at exactly the right time.
              </p>
              <p>
                The Tooth Fairy doesn't change the world dramatically. She
                tends to it - gently, precisely, while it sleeps.
              </p>
            </div>
          </div>
        </section>

        {/* ── Hidden work ── */}
        <section className="py-20 md:py-28 bg-secondary/30 relative overflow-hidden">
          {/* Subtle star accents */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
            {Array.from({ length: 8 }, (_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-primary rounded-full sparkle"
                style={{
                  left: `${(i * 23 + 11) % 100}%`,
                  top: `${(i * 31 + 7) % 100}%`,
                  animationDelay: `${(i * 0.3) % 2}s`,
                }}
              />
            ))}
          </div>

          <div className="container px-6 max-w-2xl mx-auto relative z-10">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-8 leading-tight">
              The Hidden Work of
              <br className="hidden sm:block" /> the Tooth Fairy
            </h2>

            <div className="space-y-6 text-foreground/80 text-lg leading-relaxed">
              <p>
                Most people only notice the coin or bill left behind.
              </p>
              <p>
                They don't stop to wonder about the tooth that disappeared -
                where it went, what it carried, or why someone took such care to
                leave something in its place.
              </p>
              <p>
                The Tooth Fairy's work is ancient and mostly unseen. She works
                while the world sleeps, when the noise has stopped and things
                can finally settle. Small corrections. Quiet contributions. Acts
                of balance too subtle to announce but too important to leave
                undone.
              </p>
              <p>
                She is less like a magical entertainer and more like a careful
                keeper of something most of us forget to notice: that children,
                simply by growing, make the world better.
              </p>
              <p>
                Every child who faces something frightening and tries anyway.
                Every child who learns to be patient, to share, to imagine, to
                keep going. All of that is real. All of it accumulates. None of
                it disappears - even when the tooth does.
              </p>
            </div>
          </div>
        </section>

        {/* ── Proof / how do you know ── */}
        <section className="py-20 md:py-28 bg-background">
          <div className="container px-6 max-w-2xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-8 leading-tight">
              How Do You Know the
              <br className="hidden sm:block" /> Tooth Fairy Is Real?
            </h2>

            <div className="space-y-6 text-foreground/80 text-lg leading-relaxed">
              <p>
                You look for the proof she leaves behind - because that's the
                only way she has ever worked.
              </p>
              <p>
                The tooth is gone by morning, and something waits in its place.
                And the qualities that tooth carried - the bravery, the
                kindness, the patience a child grew - are real, and they don't
                disappear. You can watch a child keep growing them, day after
                day. That is the evidence. Quiet, but everywhere.
              </p>
              <p>
                Some of the most real things in the world work exactly like
                this. You never see courage itself, only what it does. You never
                see kindness, only where it lands. The Tooth Fairy belongs to
                that same order of real - known by what she leaves, not by being
                caught in the act.
              </p>
            </div>
          </div>
        </section>

        {/* ── So is she real ── */}
        <section className="py-24 md:py-36 night-sky-section relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 16 }, (_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-starlight rounded-full sparkle"
                style={{
                  left: `${(i * 19 + 5) % 100}%`,
                  top: `${(i * 27 + 9) % 90}%`,
                  animationDelay: `${(i * 0.18) % 2}s`,
                }}
              />
            ))}
          </div>

          <div className="container px-6 max-w-2xl mx-auto relative z-10">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-starlight mb-10 text-center">
              So... Is the Tooth Fairy Real?
            </h2>

            <div className="space-y-6 text-starlight/75 text-lg leading-relaxed mb-12 text-center max-w-xl mx-auto">
              <p>
                Maybe the real magic was never about coins and bills under pillows.
              </p>
              <p>
                Maybe it was always about recognizing that children leave
                something good behind as they grow.
              </p>
            </div>

            {/* Verse-style list */}
            <div className="my-10 space-y-3 text-center">
              {[
                "Every act of bravery.",
                "Every moment of kindness.",
                "Every new idea.",
                "Every time a child tries again after failing.",
              ].map((line) => (
                <p
                  key={line}
                  className="font-display text-lg md:text-xl font-semibold text-starlight"
                >
                  {line}
                </p>
              ))}
            </div>

            <div className="space-y-6 text-starlight/75 text-lg leading-relaxed text-center max-w-xl mx-auto mb-12">
              <p>
                Those things matter. They ripple outward in ways that can't
                always be traced back to their source. The world becomes better,
                quietly, because children keep growing through it.
              </p>
              <p>
                The Tooth Fairy simply helps make sure none of that goodness
                goes to waste.
              </p>
            </div>

            {/* Final pull quote */}
            <figure className="text-center my-10">
              <blockquote className="font-display text-2xl md:text-3xl font-bold text-primary leading-snug">
                "Every lost tooth carries something worth keeping."
              </blockquote>
            </figure>

            <p className="text-center text-starlight/80 text-lg">
              So - is she real?
              <br />
              Look at what children bring into the world every day.
              <br />
              <em>Then decide.</em>
            </p>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-16 md:py-20 bg-secondary/30">
          <div className="container px-6 max-w-2xl mx-auto">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
              Common questions
            </h2>
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="magical-card border-0 data-[state=open]:shadow-magical transition-shadow"
                >
                  <AccordionTrigger className="text-left font-display font-semibold text-foreground hover:text-primary transition-colors hover:no-underline px-0">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pt-2">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* ── Continue exploring ── */}
        <section className="py-20 md:py-28 bg-background">
          <div className="container px-6 max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <Sparkles className="w-6 h-6 text-primary mx-auto mb-4" />
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
                Continue Exploring the Workshop
              </h2>
              <p className="text-muted-foreground">
                There is more to the Tooth Fairy's world than one question can hold.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {exploreLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => trackEvent("explore_click", { page: link.to, source: "is_tooth_fairy_real" })}
                  className="magical-card group hover:shadow-magical transition-all duration-300 hover:-translate-y-0.5"
                >
                  <p className="font-display font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
                    {link.label}
                  </p>
                  <p className="text-sm text-muted-foreground">{link.desc}</p>
                </Link>
              ))}
            </div>

            {/* Watch the film card */}
            <a
              href={YOUTUBE_VIDEO_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("social_click", { platform: "youtube", location: "is_tooth_fairy_real" })}
              className="block w-full rounded-2xl bg-[hsl(244_45%_15%)] border border-primary/25 hover:border-primary/50 p-6 text-center transition-all hover:shadow-magical group"
            >
              <Sparkles className="w-5 h-5 text-primary mx-auto mb-3" />
              <p className="font-display font-semibold text-starlight group-hover:text-primary transition-colors mb-1">
                Watch the Animated Short Film
              </p>
              <p className="text-sm text-starlight/80">
                See the Tooth Fairy's world come to life - free on YouTube.
              </p>
            </a>
          </div>
        </section>

        {/* ── Join the Workshop ── */}
        <section className="py-16 bg-secondary/30">
          <div className="container px-6 max-w-xl mx-auto text-center">
            <div className="magical-card">
              <Sparkles className="w-6 h-6 text-primary mx-auto mb-3" />
              <h2 className="font-display text-xl font-semibold text-foreground mb-2">
                Join the Workshop
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                A quiet place for new stories, free printables, and the
                continuing world of the Tooth Fairy. For families who still
                believe there's more to discover.
              </p>
              <Button variant="magical" size="sm" asChild>
                <a href="/#signup" onClick={() => trackCTAClick("is_tooth_fairy_real")}>
                  <Sparkles className="w-3.5 h-3.5" />
                  Join the Workshop
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

export default IsToothFairyReal;
