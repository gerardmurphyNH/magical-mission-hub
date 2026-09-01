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

const steps = [
  {
    title: "Stay calm, even if there's a little blood",
    body: "A tiny bit of blood is completely normal when a baby tooth comes out. Rinse with cold water and press a clean cloth gently against the spot for a minute or two. It stops quickly.",
  },
  {
    title: "Find somewhere special to keep the tooth",
    body: "Before the Tooth Fairy can visit, the tooth needs a safe place to wait. Some families use a small pouch under the pillow. Some use a special tooth box on the bedside table. The Tooth Fairy is good at finding both.",
  },
  {
    title: "Let the child decide how much they want to know",
    body: "Some children want to know everything: what the Tooth Fairy does, why she comes, where the tooth goes. Others just want to know the money will be there in the morning. Both are fine. Follow their lead.",
  },
  {
    title: "Make something of the moment",
    body: "The first lost tooth only happens once. Write the date down. Take a photo with the gap-toothed smile. Tell them something true: you grew that tooth. It held something real. And now it gets to go somewhere important.",
  },
  {
    title: "Be ready for the morning-after questions",
    body: "Did she come? How did she get in? Why did she take it? These are good questions. The real answers are on the pages below.",
  },
];

const faqs = [
  {
    question: "What age do children usually lose their first tooth?",
    answer:
      "Most children lose their first tooth between ages 5 and 7, though anywhere from 4 to 8 is completely normal. The bottom front teeth (lower central incisors) usually come out first, the same ones that came in first when they were a baby.",
  },
  {
    question: "Should I pull out a loose tooth or wait?",
    answer:
      "It's almost always better to wait. A tooth will come out when it's ready, and a tooth that comes out on its own is much less uncomfortable than one that's pulled too early. If it's very loose and hanging by a thread, a gentle wiggle is fine. If it's just loose, let it wiggle itself out.",
  },
  {
    question: "What if my child swallows their tooth by accident?",
    answer:
      "It happens, and it's nothing to worry about medically. The Tooth Fairy also understands. Just leave a note explaining what happened. She's been doing this long enough to have encountered every possible situation, and she appreciates the honesty.",
  },
  {
    question: "How much does the Tooth Fairy leave?",
    answer:
      "This varies a lot between families. The average in the United States is around $4–5 per tooth, though it ranges from coins to $20 for a first tooth. There's no official amount; the Tooth Fairy adjusts for circumstances. What matters is that it feels like a proper thank-you.",
  },
  {
    question: "What if the Tooth Fairy doesn't come the first night?",
    answer:
      "It happens. The Tooth Fairy visits millions of children. Sometimes she runs a little behind schedule. If the tooth is still there in the morning, just reassure your child that the Fairy will come the next night. She always finds a way.",
  },
  {
    question: "Should I keep my child's baby teeth?",
    answer:
      "Many families do. Some keep all of them, some keep just the first. Baby teeth are a physical record of childhood: small, surprising, and gone before you know it. If you want to keep them, the Tooth Fairy understands. The qualities inside a kept tooth stay with the family.",
  },
];

const FirstToothWhatToDo = () => {
  return (
    <>
      <PageSeo
         title="First Lost Tooth: What to Do Next | Wiggly Tooth Workshop"
        description="Your child lost their first baby tooth. Here is what to do right now, how to keep the tooth safe for the Tooth Fairy, and how to answer the questions that follow."
        canonical="https://wigglytoothworkshop.com/first-tooth-what-to-do"
        jsonLd={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://wigglytoothworkshop.com/",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Your Child's First Lost Tooth",
                  item: "https://wigglytoothworkshop.com/first-tooth-what-to-do",
                },
              ],
            },
            {
              "@type": "Article",
              headline: "Your Child's First Lost Tooth: What Happens Next",
              url: "https://wigglytoothworkshop.com/first-tooth-what-to-do",
              author: { "@type": "Organization", name: "Wiggly Tooth Workshop" },
              publisher: {
                "@type": "Organization",
                name: "Wiggly Tooth Workshop",
                url: "https://wigglytoothworkshop.com/",
              },
            },
            {
              "@type": "FAQPage",
              mainEntity: faqs.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: { "@type": "Answer", text: faq.answer },
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
                  The First One
                </span>
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-starlight mb-6 leading-tight">
                Your Child's First Lost Tooth<br />
                <span className="text-primary">What Happens Next</span>
              </h1>
              <p className="text-lg text-starlight/80 mb-8 leading-relaxed max-w-2xl mx-auto">
                It's out. They're grinning with a gap in their smile.
                Here's what to do next, and what to tell them when the questions start.
              </p>
            </div>
          </section>

          {/* AEO Answer Block */}
          <section className="py-12 md:py-16 bg-secondary/30">
            <div className="container px-6 max-w-2xl mx-auto">
              <div className="magical-card p-8">
                <span className="inline-block text-xs font-semibold uppercase tracking-wide text-primary bg-primary/10 px-3 py-1 rounded-full mb-4">
                  What To Do Right Now
                </span>
                <p className="text-foreground text-lg leading-relaxed">
                  Keep the tooth safe. Put it somewhere the Tooth Fairy can find it:
                  under the pillow, in a small pouch, or in a special tooth box near the bed.
                  Then tell your child the truth: that tooth held something real,
                  and the Tooth Fairy is coming to collect it tonight.
                </p>
              </div>
            </div>
          </section>

          {/* Steps */}
          <section className="py-12 md:py-16 bg-background">
            <div className="container px-6 max-w-2xl mx-auto">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">
                Five things to do when a tooth comes out
              </h2>
              <div className="space-y-6">
                {steps.map((step, i) => (
                  <div key={i} className="magical-card flex gap-5">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold flex items-center justify-center mt-0.5">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-display font-semibold text-foreground mb-2">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        {step.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* The Questions */}
          <section className="py-12 md:py-16 bg-secondary/10">
            <div className="container px-6 max-w-2xl mx-auto space-y-8">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                When they ask "where does my tooth go?"
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Children always ask this one. The full answer is on the pages below,
                  but here's the short version:
                </p>
                <p>
                  The Tooth Fairy takes every tooth to her workshop. Inside each tooth
                  is a good quality (bravery, kindness, creativity, or patience) that grew
                  during the years the tooth was there. She carefully lifts that quality out
                  and uses it to help fix small problems in the world: helping someone find
                  courage, or bringing patience to a difficult moment.
                </p>
                <p>
                  Then she leaves a little money as a thank-you. Because what she took was
                  genuinely valuable, and she knows it.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="magical" size="lg" asChild>
                  <Link to="/what-does-the-tooth-fairy-do-with-teeth">
                    What does she do with teeth?
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/is-the-tooth-fairy-real">
                    Is she real?
                  </Link>
                </Button>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="py-12 md:py-16 bg-secondary/30">
            <div className="container px-6 max-w-2xl mx-auto">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
                Practical questions
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
                  { to: "/what-does-the-tooth-fairy-do-with-teeth", label: "What does she do with the teeth?", desc: "The full story from the workshop" },
                  { to: "/is-the-tooth-fairy-real", label: "Is the Tooth Fairy real?", desc: "A serious answer to a serious question" },
                  { to: "/tooth-fairy-letter", label: "Free Tooth Fairy letter template", desc: "A printable letter from the Tooth Fairy for your child" },
                  { to: "/how-much-does-the-tooth-fairy-leave", label: "How much does the Tooth Fairy leave?", desc: "The money, the first tooth, and why it varies" },
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
                <em>The Tooth Fairy's Secret Workshop</em> is an animated short film and children's
                book that answers every question your child will ever ask about the Tooth Fairy,
                in the most magical way possible. Coming Summer 2026.
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
        </main>
        <Footer />
      </div>
    </>
  );
};

export default FirstToothWhatToDo;
