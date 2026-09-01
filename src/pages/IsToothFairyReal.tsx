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

const faqCategories = [
  {
    title: "Is She Real?",
    faqs: [
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
        question: "Is the Tooth Fairy real, or is it your parents?",
        answer:
          "It's the question every child eventually asks - and the honest answer is: both can be true. Parents help. They always have, slipping the coin under the pillow on the nights the Tooth Fairy can't make it. But the part that isn't pretend is what the tradition is really about: the courage, kindness, and wonder a child grows are real, and they really do matter. Parents are the Tooth Fairy's helpers, not her replacement. The magic is in what your child is becoming.",
      },
      {
        question: "What do I tell my child when they ask if the Tooth Fairy is real?",
        answer:
          "You don't have to settle it in a single sentence. A gentle answer is to ask what they think, then lean into what's true underneath the story: the courage, kindness, and creativity the Tooth Fairy looks for are real qualities your child really is growing. The wonder and the honesty can both stay. If you want a longer guide to this conversation, see what to say when a child asks if the Tooth Fairy is real.",
      },
    ],
  },
  {
    title: "Where the Tradition Comes From",
    faqs: [
      {
        question: "How old is the Tooth Fairy tradition?",
        answer:
          "Customs around lost teeth date back thousands of years. Norse and Northern European traditions from the 10th century mention a tooth fee, a small payment for a child's first lost tooth. The figure of the Tooth Fairy as we know her in the English-speaking world became more widespread in the early 20th century.",
      },
      {
        question: "Is the Tooth Fairy the same in every country?",
        answer:
          "No - the tradition exists almost everywhere, but it takes different forms. In France and Belgium it's La Petite Souris, a small mouse. In Spain and Latin America it's Ratoncito Pérez. In parts of Asia, children throw teeth onto the roof or bury them in the ground. The Tooth Fairy's workshop, in our telling, has teeth from all of these traditions.",
      },
      {
        question: "What is Ratoncito Pérez?",
        answer:
          "Ratoncito Pérez - also called El Ratón de los Dientes, 'the tooth mouse' - is the Spanish and Latin American version of the Tooth Fairy. Instead of a winged fairy, a small mouse collects the tooth left under the pillow and leaves a coin or little gift behind.",
      },
      {
        question: "Who created Ratoncito Pérez?",
        answer:
          "The Spanish priest and author Luis Coloma created Ratoncito Pérez in 1894, in a story written to comfort the young King Alfonso XIII of Spain, who had just lost a milk tooth. The little tooth mouse went on to become the Spanish and Latin American counterpart of the Tooth Fairy.",
      },
      {
        question: "When did the Tooth Fairy get her name?",
        answer:
          "She appears in print as early as a 1908 Chicago Daily Tribune column, but the name was cemented in 1927, when children's playwright Esther Watkins Arnold published a short playlet called The Tooth Fairy. No single person invented her - she grew out of much older customs around lost teeth.",
      },
    ],
  },
  {
    title: "Who She Is",
    faqs: [
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
        question: "Who are Arlo and CeCe?",
        answer:
          "Arlo and CeCe are the two characters at the heart of The Tooth Fairy's Secret Workshop. Arlo is a curious boy who sets out to learn what the Tooth Fairy really does with his lost tooth; CeCe is the Tooth Fairy he meets on a late-night adventure - a small, clever tinkerer with goggles and a tool belt, whose workshop and whose secret the story follows.",
      },
      {
        question: "Why does the Tooth Fairy take teeth?",
        answer:
          "Not because the teeth themselves are valuable, but because of what's inside them - the courage, kindness, and patience a child grew while it was theirs. For the full answer, including what she does with them afterward, see what the Tooth Fairy does with the teeth she collects.",
      },
    ],
  },
  {
    title: "How She Works",
    faqs: [
      {
        question: "Why does the Tooth Fairy come at night?",
        answer:
          "Fairies work best in the quiet hours, when dreams are deep and imaginations are wide open. There's also something about starlight that helps her fly faster. She visits thousands of children each night, and timing is everything.",
      },
      {
        question: "How does the Tooth Fairy get into your house?",
        answer:
          "Fairies are very small, about the size of your hand, and they can slip through the tiniest spaces: a crack in a window, a gap under a door, even the space between moonbeams. Your house is never as sealed as you think.",
      },
      {
        question: "How does she know whose tooth is whose?",
        answer:
          "Teeth carry a kind of fingerprint, not a visible one, but something the Tooth Fairy can sense. Every tooth knows where it came from.",
      },
      {
        question: "How does she carry so many teeth in one night?",
        answer:
          "Her bag is much bigger on the inside than on the outside - a well-known property of fairy equipment. She also doesn't visit every child on the same night. She works efficiently, and she's been doing this for a very long time.",
      },
      {
        question: "What if I stay up to try to catch her?",
        answer:
          "She knows, and she waits. The Tooth Fairy is patient; she has been doing this for centuries. She'll come when the time is right, and not a moment before. Most children who try to wait up fall asleep eventually. She counts on it.",
      },
      {
        question: "Why doesn't the Tooth Fairy let anyone see her?",
        answer:
          "Partly because she works better unseen, and partly because the mystery is part of how the tradition works. A visitor who leaves something in the night is wondrous; a visitor you can watch is just a person. Most important things - courage, kindness, the wind - work quietly. The Tooth Fairy fits right in.",
      },
    ],
  },
  {
    title: "Common Situations",
    faqs: [
      {
        question: "What if I swallow my tooth by accident?",
        answer:
          "Don't worry - it happens. Just leave a note under your pillow explaining what happened. The Tooth Fairy has been doing this long enough to have encountered every possible situation, and she appreciates the honesty.",
      },
      {
        question: "What if the Tooth Fairy doesn't come the first night?",
        answer:
          "She visits millions of children, so sometimes she runs a little behind schedule. If the tooth is still there in the morning, leave it one more night. She always finds a way.",
      },
      {
        question: "What if I want to keep my tooth?",
        answer:
          "The Tooth Fairy understands. Some families keep teeth as keepsakes, and she respects that. If there's no tooth under the pillow, she simply moves on. The qualities in a kept tooth stay with the family.",
      },
      {
        question: "What if my tooth has a cavity?",
        answer:
          "The quality is in the tooth itself, not in its condition. A tooth with a cavity still holds something real. The Tooth Fairy doesn't judge - she just collects.",
      },
    ],
  },
];

const faqs = faqCategories.flatMap((c) => c.faqs);

const exploreLinks = [
  {
    to: "/what-does-the-tooth-fairy-do-with-teeth",
    label: "What Does the Tooth Fairy Do With Teeth?",
    desc: "Inside the workshop, and what happens after she visits.",
  },
  {
    to: "/tooth-fairy-story",
    label: "Read the Tooth Fairy Story",
    desc: "The tale of Arlo, CeCe, and the workshop above the clouds.",
  },
  {
    to: "/what-to-say-when-child-asks-if-tooth-fairy-is-real",
    label: "What to Say When a Child Asks",
    desc: "A guide for the conversation, when it comes.",
  },
  {
    to: "/why-does-the-tooth-fairy-leave-money",
    label: "Why Does the Tooth Fairy Leave Money?",
    desc: "The real meaning behind the coin under the pillow.",
  },
];

const IsToothFairyReal = () => {
  return (
    <div className="min-h-screen bg-background">
      <PageSeo
        title="Is the Tooth Fairy Real? | Wiggly Tooth Workshop"
        description="Is the Tooth Fairy real? Yes - and the reason will surprise you. Watch how one lost tooth becomes something bigger in our free animated short film."
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
                "Yes, the Tooth Fairy is real - she just works in ways most people never see. What she really does with children's lost teeth, where the tradition comes from, and why it matters.",
              about: [
                "is the tooth fairy real",
                "tooth fairy history",
                "tooth fairy origin",
                "tooth fairy traditions around the world",
                "Ratoncito Pérez",
                "tooth fairy FAQ",
              ],
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

        {/* ── Where the tradition really comes from ── */}
        <section className="py-20 md:py-28 bg-background">
          <div className="container px-6 max-w-2xl mx-auto">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary/80 mb-4 text-center">
              The Story Behind the Story
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-8 leading-tight text-center">
              Where the Tradition
              <br className="hidden sm:block" /> Really Comes From
            </h2>

            <div className="space-y-6 text-foreground/80 text-lg leading-relaxed mb-10">
              <p>
                That's our answer to why she is real. But the question of where the
                Tooth Fairy tradition itself comes from has a real, documented history
                too - and it's older and stranger than most people realize.
              </p>
            </div>

            <div className="space-y-10">
              <div>
                <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mb-3">
                  A Very Old Question
                </h3>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    For as long as there have been children, there have been lost
                    teeth, and people trying to explain where they go. Norse and
                    Northern European traditions from the 10th century record a
                    "tooth fee," a small payment given to a child for their first
                    lost tooth - Vikings were said to wear children's teeth as good
                    luck in battle. In parts of Asia, children throw the tooth
                    instead: a lower tooth onto the roof so the new one grows
                    upward, an upper tooth buried in the ground so the new one
                    grows downward. Different logic, same instinct - a lost tooth
                    is significant, and it deserves a ritual.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mb-3">
                  How She Got Her Name
                </h3>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    The Tooth Fairy as we know her in the English-speaking world
                    took shape in the early 20th century. One of the earliest
                    printed references appeared in the <em>Chicago Daily Tribune</em>{" "}
                    on September 27, 1908 - a household-hints column suggesting
                    parents use a "tooth fairy" who leaves a small gift to coax
                    children through losing a tooth. The name was cemented in 1927,
                    when children's playwright Esther Watkins Arnold published an
                    eight-page playlet called <em>The Tooth Fairy</em>. No single
                    author invented her - she grew out of the same instinct that
                    gave us Santa Claus and the Easter Bunny: explaining an ordinary
                    event with an extraordinary character.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mb-3">
                  Different Names, Same Idea
                </h3>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    In Spain and much of Latin America, a small mouse named{" "}
                    <em>Ratoncito Pérez</em> slips in to collect the tooth. He has a
                    surprisingly precise origin: the priest and author Luis Coloma
                    invented him in 1894, in a story written to comfort the
                    boy-king Alfonso XIII of Spain after he lost a milk tooth.
                    France and Belgium have their own mouse, <em>La Petite Souris</em>.
                    In Japan, children throw a lower tooth straight up and an upper
                    tooth down, so each new tooth grows in straight. In Korea, teeth
                    go onto the roof with a little song to a magpie. In parts of the
                    Middle East, teeth are thrown toward the sun, and in Mali, a
                    lost tooth goes into a chicken coop. Different characters,
                    different rituals - the same instinct underneath, everywhere: a
                    lost tooth matters, and the moment deserves to be marked.
                  </p>
                  <p>
                    There's no single, official picture of her either. In a
                    well-known 1984 study, researcher Rosemary Wells found that
                    about 74% of people imagined the Tooth Fairy as female, while
                    the rest pictured her as either gender or as neither.{" "}
                    <Link
                      to="/what-does-the-tooth-fairy-look-like"
                      className="text-primary font-medium hover:underline"
                    >
                      See what she looks like in our film →
                    </Link>
                  </p>
                </div>
              </div>
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
          <div className="container px-6 max-w-2xl mx-auto space-y-12">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground text-center">
              Every Question, Answered
            </h2>
            {faqCategories.map((category) => (
              <div key={category.title}>
                <h3 className="font-display text-lg font-bold text-foreground mb-4 pb-2 border-b border-border">
                  {category.title}
                </h3>
                <Accordion type="single" collapsible className="space-y-3">
                  {category.faqs.map((faq, i) => (
                    <AccordionItem
                      key={i}
                      value={`${category.title}-${i}`}
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
            ))}
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
