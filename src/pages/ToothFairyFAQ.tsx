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

const categories = [
  {
    title: "Why the Tooth Fairy Takes Teeth",
    faqs: [
      {
        question: "Why does the Tooth Fairy take my teeth?",
        answer:
          "Every tooth you lose holds something special: a memory, a moment of bravery, a flash of kindness. The Tooth Fairy collects these tiny treasures because they contain the qualities of childhood: bravery, kindness, creativity, and patience. And those qualities are exactly what the world needs.",
      },
      {
        question: "Why does she want teeth specifically?",
        answer:
          "Teeth grow slowly, over years. They're there during your first day of school, your first brave moment, your first time being really kind to someone. That time leaves a trace, a quality, that only shows up in something that grew with you. Hair grows too fast. Fingernails don't hold memory the same way. A tooth that's been growing for years holds years.",
      },
      {
        question: "Why does the Tooth Fairy only take children's teeth?",
        answer:
          "Adult teeth don't fall out naturally; they're meant to stay. Baby teeth fall away at exactly the right moment, carrying the full record of early childhood. That's when the collection happens. By the time you're an adult, your qualities are already grown and out in the world.",
      },
      {
        question: "Why does the Tooth Fairy leave money?",
        answer:
          "It's her thank-you. You gave her something that took years to grow, packed with good qualities. That little gift is her way of saying: I see what you grew. The world needed it. The amount isn't the point. The thank-you is.",
      },
    ],
  },
  {
    title: "What She Does With the Teeth",
    faqs: [
      {
        question: "What does the Tooth Fairy do with all the teeth?",
        answer:
          "She takes them to her workshop, an enormous place that looks a bit like a library, if libraries sparkled. There she carefully lifts the quality out of each tooth. Bravery in one jar. Kindness in another. Creativity in a third. Patience in the fourth. Then she sends those qualities back out into the world to help people who need them.",
      },
      {
        question: "Does the Tooth Fairy keep the teeth?",
        answer:
          "The workshop has millions of them, sorted by quality, organized by year, sorted by where they came from. Some say the collection goes back centuries. The teeth are kept after the quality is taken out, carefully stored as a record.",
      },
      {
        question: "Where do the qualities go after she collects them?",
        answer:
          "She uses them to fix small problems in the world: the kind that need exactly the right quality at the right moment. A firefighter who needs to stay calm. A shy child finding the courage to try something new. A parent who has run out of patience on a long day. The Tooth Fairy doesn't announce this. She just does the work, quietly, every night.",
      },
      {
        question: "What are the four qualities?",
        answer:
          "Bravery, kindness, creativity, and patience. These are the four that teeth most commonly hold. Every child grows a little of each one, though different teeth tend to carry different amounts depending on what was happening in your life when that tooth was growing.",
      },
    ],
  },
  {
    title: "How She Works",
    faqs: [
      {
        question: "Why does the Tooth Fairy come at night?",
        answer:
          "Fairies work best in the quiet hours, when dreams are deep and imaginations are wide open. There's also something about starlight that helps her fly faster. She visits thousands of children each night. Timing is everything.",
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
          "Her bag is much bigger on the inside than on the outside. A well-known property of fairy equipment. She also doesn't visit every child on the same night. She works efficiently, and she's been doing this for a very long time.",
      },
      {
        question: "What if I stay up to try to catch her?",
        answer:
          "She knows, and she waits. The Tooth Fairy is patient; she has been doing this for centuries. She'll come when the time is right, and not a moment before. Most children who try to wait up fall asleep eventually. She counts on it.",
      },
    ],
  },
  {
    title: "Common Situations",
    faqs: [
      {
        question: "What if I swallow my tooth by accident?",
        answer:
          "Don't worry. It happens. Just leave a note under your pillow explaining what happened. The Tooth Fairy has been doing this long enough to have encountered every possible situation. She appreciates the honesty.",
      },
      {
        question: "What if the Tooth Fairy doesn't come the first night?",
        answer:
          "She visits millions of children. Sometimes she runs a little behind schedule. If the tooth is still there in the morning, leave it one more night. She always finds a way.",
      },
      {
        question: "What if I want to keep my tooth?",
        answer:
          "The Tooth Fairy understands. Some families keep teeth as keepsakes, and she respects that. If there's no tooth under the pillow, she moves on to the next child. The qualities in a kept tooth stay with the family.",
      },
      {
        question: "What if my tooth has a cavity?",
        answer:
          "The quality is in the tooth itself, not in its condition. A tooth with a cavity still holds something real. The Tooth Fairy doesn't judge. She just collects.",
      },
    ],
  },
  {
    title: "Is She Real?",
    faqs: [
      {
        question: "Is the Tooth Fairy real?",
        answer:
          "Yes. She just does her work in ways most people don't see. She works quietly, at night, drawing good qualities out of children's teeth and using them to help fix small problems in the world. When you lose a tooth, it doesn't disappear by accident. The Tooth Fairy takes it. The clues are there, if you know where to look.",
      },
      {
        question: "Has anyone ever seen the Tooth Fairy?",
        answer:
          "Very few people. She works in the quiet hours, when most children are deeply asleep. Some have caught a glimpse: a movement at the edge of a dream, a small light near the window. But she's fast, and she's careful.",
      },
      {
        question: "Does the Tooth Fairy exist in other countries?",
        answer:
          "Yes, though she goes by different names. In France she's La Petite Souris, a small mouse. In parts of Asia, children throw teeth onto roofs or under floors. In the Middle East, teeth are sometimes thrown toward the sun. The tradition exists everywhere, in some form. The Tooth Fairy's workshop has teeth from all over the world.",
      },
      {
        question: "My parents say they left the money there. Is that true?",
        answer:
          "Parents help. They always have. The Tooth Fairy works through the people who love you, especially on nights when she can't get there in time. The money still means the same thing.",
      },
    ],
  },
  {
    title: "The Workshop and the Film",
    faqs: [
      {
        question: "Who are Arlo and CeCe?",
        answer:
          "Arlo and CeCe are the two young characters at the heart of The Tooth Fairy's Secret Workshop. They're curious, imaginative kids who discover what really happens to lost teeth, and what goes on inside the workshop when nobody is watching. They're the kind of characters who ask the questions every kid wonders about, and aren't afraid to follow the answer wherever it leads.",
      },
      {
        question: "What is the Wiggly Tooth Workshop?",
        answer:
          "The Wiggly Tooth Workshop is the creative studio behind The Tooth Fairy's Secret Workshop: an animated short film, children's book, and ToothSafe product all built around the same story world. It's being developed in collaboration with Peter H. Reynolds and FableVision Studios.",
      },
      {
        question: "When does The Tooth Fairy's Secret Workshop come out?",
        answer:
          "The animated short film is in production and scheduled for Summer 2026. The children's book and ToothSafe product will follow. Join the Workshop mailing list at wigglytoothworkshop.com to get early access and launch updates.",
      },
      {
        question: "What is ToothSafe?",
        answer:
          "ToothSafe is a beautifully designed keepsake box for lost teeth, created by the Wiggly Tooth Workshop so kids have a special, safe place to leave their tooth for the Tooth Fairy. It's designed to make the whole experience feel more magical and intentional. ToothSafe is currently in development and will be available for early access to Workshop members first.",
      },
    ],
  },
];

// Flatten for JSON-LD
const allFaqs = categories.flatMap((c) => c.faqs);

const ToothFairyFAQ = () => {
  return (
    <>
      <PageSeo
        title="Tooth Fairy FAQ: Every Question Answered | Wiggly Tooth Workshop"
        description="The Tooth Fairy FAQ: every question children and parents ask, answered honestly and with the magic intact. Why she takes teeth, what she does with them, and more."
        canonical="https://wigglytoothworkshop.com/tooth-fairy-faq"
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
                  name: "Tooth Fairy FAQ",
                  item: "https://wigglytoothworkshop.com/tooth-fairy-faq",
                },
              ],
            },
            {
              "@type": "Article",
              headline: "Tooth Fairy FAQ",
              url: "https://wigglytoothworkshop.com/tooth-fairy-faq",
              author: { "@type": "Organization", name: "Wiggly Tooth Workshop" },
              publisher: {
                "@type": "Organization",
                name: "Wiggly Tooth Workshop",
                url: "https://wigglytoothworkshop.com/",
              },
            },
            {
              "@type": "FAQPage",
              mainEntity: allFaqs.map((faq) => ({
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
                  Every Question Answered
                </span>
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-starlight mb-6 leading-tight">
                Tooth Fairy FAQ
              </h1>
              <p className="text-lg text-starlight/80 mb-8 leading-relaxed max-w-2xl mx-auto">
                Every question children (and parents) ask about the Tooth Fairy, answered honestly,
                completely, and with the magic intact.
              </p>
            </div>
          </section>

          {/* FAQ Categories */}
          <section className="py-12 md:py-16 bg-background">
            <div className="container px-6 max-w-2xl mx-auto space-y-14">
              {categories.map((category) => (
                <div key={category.title}>
                  <h2 className="font-display text-xl md:text-2xl font-bold text-foreground mb-6 pb-3 border-b border-border">
                    {category.title}
                  </h2>
                  <Accordion type="single" collapsible className="space-y-3">
                    {category.faqs.map((faq, index) => (
                      <AccordionItem
                        key={index}
                        value={`${category.title}-${index}`}
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

          {/* Deep Dives */}
          <section className="py-12 md:py-16 bg-secondary/30">
            <div className="container px-6 max-w-2xl mx-auto">
              <h2 className="font-display text-2xl font-bold text-foreground mb-6 text-center">
                Want the full answer?
              </h2>
              <p className="text-muted-foreground text-center mb-8 max-w-lg mx-auto">
                These pages go deeper on the questions that deserve more than a paragraph.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { to: "/what-does-the-tooth-fairy-do-with-teeth", label: "What does she do with the teeth?", desc: "The workshop, the qualities, the whole story" },
                  { to: "/why-does-the-tooth-fairy-take-teeth", label: "Why does she take teeth?", desc: "The reason behind the tradition" },
                  { to: "/is-the-tooth-fairy-real", label: "Is the Tooth Fairy real?", desc: "A serious answer to a serious question" },
                  { to: "/how-much-does-the-tooth-fairy-leave", label: "How much does the Tooth Fairy leave?", desc: "The money, the first tooth, and why it varies" },
                  { to: "/first-tooth-what-to-do", label: "First lost tooth: what to do", desc: "A practical guide for families" },
                  { to: "/tooth-fairy-letter", label: "Free Tooth Fairy letter template", desc: "A printable letter for kids, ready to personalise" },
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
                Still have questions?
              </h2>
              <p className="text-starlight/70 mb-8 leading-relaxed">
                <em>The Tooth Fairy's Secret Workshop</em> answers them all, in the most
                magical way possible. An animated short film and children's book coming
                Summer 2026 from the Wiggly Tooth Workshop.
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

export default ToothFairyFAQ;
