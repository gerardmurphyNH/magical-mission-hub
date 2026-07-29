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

const faqs = [
  {
    question: "Why does the Tooth Fairy want teeth and not something else?",
    answer:
      "Because teeth are the only part of you that falls off on its own, at just the right time, carrying everything you've grown so far. Hair grows too fast. Fingernails don't hold memories the same way. A tooth that's been growing for years holds years.",
  },
  {
    question: "Does the Tooth Fairy take adult teeth too?",
    answer:
      "No. Adult teeth are permanent; they're not meant to be collected. The baby teeth are the special ones: they fall away naturally at exactly the moment when a child is ready for something bigger. That timing isn't an accident.",
  },
  {
    question: "What if I want to keep my tooth?",
    answer:
      "The Tooth Fairy understands. Some families keep teeth as keepsakes, and she respects that. If there's no tooth under the pillow, she simply moves on. The qualities in a kept tooth stay with the family.",
  },
  {
    question: "Why does she leave money instead of something else?",
    answer:
      "The money she leaves is her thank-you. What you gave her had real value, and she knows it. It's her way of saying: I see what you grew. The world needed it.",
  },
  {
    question: "Is the exchange fair?",
    answer:
      "That depends on how you think about it. You give her something that took years to grow, packed with memories and qualities. She gives you some money in return. But the money isn't the point. The point is that what was in your tooth is now out in the world, doing something good. Most people would say that's more than fair.",
  },
];

const WhyDoesTheToothFairyTakeTeeth = () => {
  return (
    <>
      <PageSeo
        title="Why Does the Tooth Fairy Take Teeth? | Wiggly Tooth Workshop"
        description="The Tooth Fairy takes teeth because each one holds a quality you grew - bravery, kindness, patience - and the world quietly needs more of it. Here's why."
        canonical="https://wigglytoothworkshop.com/why-does-the-tooth-fairy-take-teeth"
        jsonLd={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Wiggly Tooth Workshop",
                  item: "https://wigglytoothworkshop.com/",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Why Does the Tooth Fairy Take Teeth?",
                  item: "https://wigglytoothworkshop.com/why-does-the-tooth-fairy-take-teeth",
                },
              ],
            },
            {
              "@type": "Article",
              headline: "Why Does the Tooth Fairy Take Teeth?",
              description:
                "Why the Tooth Fairy collects baby teeth: each one holds a quality a child grew, and she uses those qualities to quietly help the world.",
              mainEntityOfPage:
                "https://wigglytoothworkshop.com/why-does-the-tooth-fairy-take-teeth",
              publisher: {
                "@type": "Organization",
                name: "Wiggly Tooth Workshop",
                url: "https://wigglytoothworkshop.com/",
              },
              // Ties this page to the film entity — the short film shows exactly
              // why she collects teeth and what she does with them.
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
              mainEntity: faqs.slice(0, 4).map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.answer,
                },
              })),
            },
          ],
        }}
      />

      <div className="min-h-screen bg-background">
        <NavBar />
        <main>
          {/* Hero */}
          <section className="night-sky-section py-20 md:py-28 relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              {Array.from({ length: 15 }, (_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-starlight rounded-full sparkle"
                  style={{
                    left: `${(i * 17 + 7) % 100}%`,
                    top: `${(i * 23 + 11) % 100}%`,
                    animationDelay: `${(i * 0.13) % 2}s`,
                  }}
                />
              ))}
            </div>
            <div className="container px-6 relative z-10 text-center max-w-3xl mx-auto">
              <div className="flex flex-col items-center gap-4 mb-8">
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 text-starlight/80 hover:text-starlight transition-colors text-sm"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Wiggly Tooth Workshop
                </Link>
                <span className="inline-block text-xs font-semibold uppercase tracking-wide text-primary bg-primary/10 px-3 py-1 rounded-full">
                  Behind the Tradition
                </span>
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-starlight mb-6 leading-tight">
                Why Does the Tooth Fairy<br />
                <span className="text-primary">Take Teeth?</span>
              </h1>
              <p className="text-lg text-starlight/80 mb-8 leading-relaxed max-w-2xl mx-auto">
                Not because she needs them. Because of what's inside them. And because the world needs that too.
              </p>
            </div>
          </section>

          {/* AEO Answer Block */}
          <section className="py-12 md:py-16 bg-secondary/30">
            <div className="container px-6 max-w-2xl mx-auto">
              <div className="magical-card p-8">
                <span className="inline-block text-xs font-semibold uppercase tracking-wide text-primary bg-primary/10 px-3 py-1 rounded-full mb-4">
                  The Short Answer
                </span>
                <p className="text-foreground text-lg leading-relaxed">
                  The Tooth Fairy takes teeth because every tooth holds <strong>good qualities</strong>
                  (bravery, kindness, creativity, patience) that grew in you while the tooth was
                  growing. She collects them because the world constantly needs more of these, and
                  children are the only ones who can grow them. She draws those qualities out at her
                  workshop and uses them to help fix small problems in the world: helping someone find
                  courage, or bringing patience to a moment when it's running out.
                </p>
              </div>
            </div>
          </section>

          {/* Film embed */}
          <FilmEmbed
            location="why_tf_takes_teeth"
            heading="Watch the short film"
            blurb="See the reason the Tooth Fairy collects teeth come to life in The Tooth Fairy's Secret Workshop."
            bg="bg-background"
          />

          {/* Main Content */}
          <section className="py-12 md:py-16 bg-background">
            <div className="container px-6 max-w-2xl mx-auto space-y-12">

              <div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Why Teeth, Specifically?
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    You might wonder why she doesn't collect something else: your drawings, your
                    favorite toys, the notes you passed in class. But teeth are different.
                  </p>
                  <p>
                    A tooth grows slowly, over years, inside your jaw. It's there during your first
                    day of school and your first time staying at a friend's house. It's there when you
                    try something scary for the first time, and when you're kind to someone who was
                    having a bad day. It absorbs all of that. Not in a way you can see, but in a way
                    the Tooth Fairy can sense.
                  </p>
                  <p>
                    And then, at just the right moment, it falls out. That timing isn't a coincidence.
                    The tooth falls when it's ready, when it has grown alongside you long enough
                    to hold something real.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                  What Makes a Tooth Special
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Think about everything that happened while your teeth were growing in.
                    Every time you tried something new. Every time you helped someone.
                    Every time you waited for something you really wanted, even when waiting was hard.
                  </p>
                  <p>
                    Each of those moments left a small trace. Not visible, but real,
                    like the way a book absorbs the smell of the room where it was read.
                    Your teeth carry the record of your childhood. And childhood, as it turns out,
                    is where qualities come from.
                  </p>
                  <p>
                    Bravery. Kindness. Creativity. Patience. These are the four the Tooth Fairy
                    finds most often. She uses every one, to fix something in the world that
                    needs exactly what you grew.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                  The Trade
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    The money under your pillow is the Tooth Fairy's way of saying thank you.
                    Not for the tooth itself. But for what was in it. For years of growth.
                    For small moments of courage and care that added up to something real.
                  </p>
                  <p>
                    You grew that tooth. You filled it with something good.
                    And now it's out in the world, doing what it was always meant to do.
                  </p>
                  <p>
                    It's small compared to what you gave her. But it means something.
                    <em> I see what you grew. The world needed it. Thank you.</em>
                  </p>
                </div>
              </div>

              <div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Why It Only Works With Children's Teeth
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Adult teeth stay in. They're not meant to fall. And in a way, that makes
                    sense; adults have already grown their qualities. The Tooth Fairy's work happens
                    in childhood, when everything is new, and when the best qualities are grown.
                  </p>
                  <p>
                    That's why the Tooth Fairy visits children specifically. And why she comes
                    every time, because every tooth matters. Every lost tooth holds something
                    the world can use.
                  </p>
                </div>
              </div>

            </div>
          </section>

          {/* FAQ */}
          <section className="py-12 md:py-16 bg-secondary/30">
            <div className="container px-6 max-w-2xl mx-auto">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
                Questions about this
              </h2>
              <Accordion type="single" collapsible className="space-y-3">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
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

          {/* Related Pages */}
          <section className="py-12 md:py-16 bg-background">
            <div className="container px-6 max-w-2xl mx-auto">
              <h2 className="font-display text-xl font-bold text-foreground mb-6 text-center">
                Keep exploring
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { to: "/what-does-the-tooth-fairy-do-with-teeth", label: "What does she do with the teeth?", desc: "Inside the Tooth Fairy's workshop" },
                  { to: "/is-the-tooth-fairy-real", label: "Is the Tooth Fairy real?", desc: "A serious answer to a serious question" },
                  { to: "/how-much-does-the-tooth-fairy-leave", label: "How much does the Tooth Fairy leave?", desc: "The money, the thank-you, and why it varies" },
                  { to: "/tooth-fairy-faq", label: "All Tooth Fairy questions answered", desc: "The complete FAQ" },
                ].map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="magical-card group hover:shadow-magical transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <p className="font-display font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
                      {link.label}
                    </p>
                    <p className="text-sm text-muted-foreground">{link.desc}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-16 md:py-20 night-sky-section relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              {Array.from({ length: 10 }, (_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-starlight rounded-full sparkle"
                  style={{
                    left: `${(i * 19 + 5) % 100}%`,
                    top: `${(i * 31 + 9) % 100}%`,
                    animationDelay: `${(i * 0.2) % 2}s`,
                  }}
                />
              ))}
            </div>
            <div className="container px-6 max-w-2xl mx-auto text-center relative z-10">
              <Sparkles className="w-8 h-8 text-primary mx-auto mb-4" />
              <h2 className="font-display text-2xl md:text-3xl font-bold text-starlight mb-4">
                The full story is coming
              </h2>
              <p className="text-starlight/70 mb-8 leading-relaxed">
                <em>The Tooth Fairy's Secret Workshop</em> is an animated short film that follows
                Arlo and CeCe as they discover exactly why the Tooth Fairy takes teeth, and what
                she does with them. Coming Summer 2026.
              </p>
              <Button variant="hero" size="lg" asChild>
                <a href="/#signup">
                  <Sparkles className="w-4 h-4" />
                  Join the Workshop for updates
                </a>
              </Button>
              <p className="mt-4 text-xs text-starlight/70">
                Free · No spam · Unsubscribe anytime
              </p>
            </div>
          </section>

          {/* Related pages */}
          <section className="py-12 md:py-16 bg-background">
            <div className="container px-6 max-w-2xl mx-auto">
              <h2 className="font-display text-lg font-semibold text-foreground mb-4">
                More from the Workshop
              </h2>
              <ul className="space-y-2">
                <li>
                  <Link to="/what-does-the-tooth-fairy-do-with-teeth" className="text-sm text-primary hover:underline">
                    What does the Tooth Fairy do with teeth? →
                  </Link>
                </li>
                <li>
                  <Link to="/why-does-the-tooth-fairy-leave-money" className="text-sm text-primary hover:underline">
                    Why does the Tooth Fairy leave money? →
                  </Link>
                </li>
                <li>
                  <Link to="/is-the-tooth-fairy-real" className="text-sm text-primary hover:underline">
                    Is the Tooth Fairy real? →
                  </Link>
                </li>
                <li>
                  <Link to="/watch" className="text-sm text-primary hover:underline">
                    Watch the short film →
                  </Link>
                </li>
              </ul>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default WhyDoesTheToothFairyTakeTeeth;
