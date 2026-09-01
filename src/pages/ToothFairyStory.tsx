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
import { trackCTAClick } from "@/lib/analytics";

const PAGE_URL = "https://wigglytoothworkshop.com/tooth-fairy-story";
const SITE_URL = "https://wigglytoothworkshop.com/";

const faqs = [
  {
    question: "Is there a Tooth Fairy book?",
    answer:
      "Yes. The Tooth Fairy's Secret Workshop is a children's picture book that tells this story - a curious boy named Arlo and CeCe the Tooth Fairy - and it comes with a ToothSafe of your own. Join the Workshop and we'll let you know the moment it's available.",
  },
  {
    question: "Is this a good Tooth Fairy bedtime story?",
    answer:
      "It's made for it - a short, gentle story you can read in a few minutes at bedtime, especially the night a child loses a tooth. It ends on a warm, reassuring note: every tooth carries something good, and that goodness goes out into the world.",
  },
  {
    question: "How does the Tooth Fairy story end?",
    answer:
      "Arlo wakes the next morning and reaches under his pillow expecting a coin. Instead he finds the ToothSafe, holding his thank-you - and he finally understands. The money was never a payment; it's a thank-you for the good a tooth helps do in the world.",
  },
  {
    question: "Who are Arlo and CeCe?",
    answer:
      "Arlo is the curious boy who wants to know what the Tooth Fairy really does with his tooth. CeCe is the Tooth Fairy he meets - a small, clever tinkerer with goggles and a tool belt who shows him her workshop above the clouds.",
  },
];

const ToothFairyStory = () => {
  return (
    <div className="min-h-screen bg-background">
      <PageSeo
        title="The Tooth Fairy Story | Wiggly Tooth Workshop"
        description="Read the Tooth Fairy story - a curious boy discovers what the Tooth Fairy really does with lost teeth. A warm, magical tale for kids, free to read."
        canonical={PAGE_URL}
        image="https://wigglytoothworkshop.com/og-image.png"
        jsonLd={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Wiggly Tooth Workshop", item: SITE_URL },
                { "@type": "ListItem", position: 2, name: "The Tooth Fairy Story", item: PAGE_URL },
              ],
            },
            {
              "@type": "Article",
              headline: "The Tooth Fairy Story",
              description:
                "A warm, magical Tooth Fairy story for kids: a curious boy named Arlo discovers what the Tooth Fairy really does with the teeth she collects.",
              url: PAGE_URL,
              mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL },
              publisher: { "@type": "Organization", name: "Wiggly Tooth Workshop", url: SITE_URL },
              author: { "@type": "Organization", name: "Wiggly Tooth Workshop", url: SITE_URL },
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
        {/* Hero */}
        <section className="night-sky-section py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 18 }, (_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-starlight rounded-full sparkle"
                style={{
                  left: `${(i * 17 + 7) % 100}%`,
                  top: `${(i * 23 + 11) % 90}%`,
                  animationDelay: `${(i * 0.14) % 2}s`,
                }}
              />
            ))}
          </div>
          <div className="container px-6 relative z-10 max-w-3xl mx-auto text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-starlight/70 hover:text-starlight transition-colors text-sm mb-10"
            >
              <ArrowLeft className="w-4 h-4" />
              Wiggly Tooth Workshop
            </Link>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary/90 mb-5">
              A Tooth Fairy Story
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-starlight leading-tight mb-6">
              The Tooth Fairy Story
            </h1>
            <p className="text-starlight/80 text-lg leading-relaxed max-w-xl mx-auto">
              The night a boy loses his first tooth, he finally gets an answer to
              the question every child wonders: what does the Tooth Fairy really
              do with it - and why?
            </p>
          </div>
        </section>

        {/* The story */}
        <article className="py-16 md:py-20 bg-background">
          <div className="container px-6 max-w-2xl mx-auto space-y-10">
            <div className="space-y-4 text-foreground/85 text-lg leading-relaxed">
              <h2 className="font-display text-2xl font-bold text-foreground">A boy with a question</h2>
              <p>
                On the night he lost his very first tooth, a boy named Arlo stood
                at the mirror, running his tongue over the brand-new gap. He was
                excited for the Tooth Fairy to come - but he had questions. Why
                did she want his tooth? What would she do with it?
              </p>
              <p>
                So he did what curious kids do. He wrote her a note and tucked it
                under his pillow: <em>"Dear Tooth Fairy, what will you do with my
                tooth? And why? Thank you."</em>
              </p>
            </div>

            <div className="space-y-4 text-foreground/85 text-lg leading-relaxed">
              <h2 className="font-display text-2xl font-bold text-foreground">A visitor in the night</h2>
              <p>
                Long after he'd fallen asleep, a soft sound woke him. A tiny,
                glowing figure hovered above his bed - small but sturdy, with
                short hair, goggles pushed up on her head, and a belt full of
                tools around her waist.
              </p>
              <p>
                "You ask good questions," she whispered. "I think you're a
                tinkerer, like me - someone who loves figuring out how things
                work." Her name was CeCe, and she really was the Tooth Fairy.
              </p>
            </div>

            <div className="space-y-4 text-foreground/85 text-lg leading-relaxed">
              <h2 className="font-display text-2xl font-bold text-foreground">Teeth are tiny treasure chests</h2>
              <p>
                "Why do you collect teeth?" Arlo asked. CeCe smiled and cradled
                his tooth in her hand. "Teeth are like tiny treasure chests," she
                said. "Each one holds pieces of your story. Yours shows your
                creativity - and your kindness in sharing your ideas. Every tooth
                carries the qualities that make you, <em>you</em>."
              </p>
              <p>
                She set the tooth on a small gadget from her belt. It hummed to
                life, and glowing streams of light swirled up into the air.
                "These qualities make a kind of energy - powerful magic I can use
                to help fix little things in the world."
              </p>
            </div>

            <div className="space-y-4 text-foreground/85 text-lg leading-relaxed">
              <h2 className="font-display text-2xl font-bold text-foreground">Out into the night</h2>
              <p>
                "How can a tooth do that?" Arlo asked. "Come with me," she said.
                They flew out the window and into the sky. Over one house, CeCe
                felt a tooth beneath a sleeping girl's pillow, swapped it for a
                token of thanks, and held it up to the stars.
              </p>
              <p>
                "This one holds bravery - from the day she climbed a tall tree
                even though she was afraid. Bravery has a way of lighting the
                darkest places." A flick of her wrist, and a distant star glowed
                brighter, guiding night animals safely home.
              </p>
              <p>
                Farther on, above a stormy ocean, she tapped a tooth that held
                patience. The waves calmed, the storm settled, and a little boat
                floated safely to shore. "Sometimes," she said, "it just takes a
                bit of patience to make things right."
              </p>
            </div>

            <div className="space-y-4 text-foreground/85 text-lg leading-relaxed">
              <h2 className="font-display text-2xl font-bold text-foreground">The workshop above the clouds</h2>
              <p>
                At last they reached CeCe's workshop, hidden high above the
                clouds. Gadgets clicked and whirred, tiny gears spun, and shelves
                of glowing teeth sparkled like stars.
              </p>
              <p>
                "This is where I do the real work," she said. "Every night I learn
                what the world might need - a little persistence here, some
                confidence there - and I mix the qualities from the teeth to make
                just the right magic." She held up a smooth, shining tooth.
                "Clean teeth are easiest to work with - healthy teeth hold their
                magic well. So keep brushing."
              </p>
            </div>

            <div className="space-y-4 text-foreground/85 text-lg leading-relaxed">
              <h2 className="font-display text-2xl font-bold text-foreground">The ToothSafe</h2>
              <p>
                On the workbench, Arlo noticed a small invention. "What's this?"
                "A little something I made," CeCe grinned. "I thought if kids kept
                their teeth in it, I could find them faster. I call it the
                ToothSafe." She winked. "There's always a better way to do things,
                don't you think?"
              </p>
              <p>"Can I keep it?" Arlo whispered. "Enjoy," she said.</p>
            </div>

            <div className="space-y-4 text-foreground/85 text-lg leading-relaxed">
              <h2 className="font-display text-2xl font-bold text-foreground">Why she leaves a thank-you</h2>
              <p>
                Arlo's eyes were growing heavy, but he had one more question. "Why
                do you leave money?" CeCe smiled. "It's not a payment," she said.
                "It's a thank-you - to show how much a tooth helps make the world
                better." Arlo nodded. "Thank you, too," he said.
              </p>
            </div>

            <div className="space-y-4 text-foreground/85 text-lg leading-relaxed">
              <h2 className="font-display text-2xl font-bold text-foreground">Morning</h2>
              <p>
                When Arlo woke, the morning sun warmed his face. He didn't usually
                remember his dreams, but this one felt real - and every question
                that had filled his head the night before had been answered.
              </p>
              <p>
                He reached under his pillow, expecting a coin. Instead, he found
                the ToothSafe, holding his thank-you. Finally, he understood:
                every tooth he'd ever lost had carried something special - and
                somewhere out in the world, it was quietly doing good.
              </p>
            </div>
          </div>
        </article>

        {/* Watch the film */}
        <FilmEmbed
          location="tooth_fairy_story_page"
          heading="Watch the story come to life"
          blurb="See Arlo and CeCe's story as an animated short film - The Tooth Fairy's Secret Workshop, free to watch."
        />

        {/* Book CTA */}
        <section className="py-16 md:py-20 bg-background">
          <div className="container px-6 max-w-2xl mx-auto text-center">
            <span className="inline-block text-xs font-semibold uppercase tracking-wide text-primary bg-primary/10 px-3 py-1 rounded-full mb-4">
              The Book
            </span>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
              The Tooth Fairy's Secret Workshop, as a book
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              This story lives on as a children's picture book - and it comes with
              a ToothSafe of your own, for the next tooth your child loses. Join
              the Workshop and we'll let you know the moment it's available.
            </p>
            <Button variant="magical" size="lg" asChild>
              <a href="/#signup" onClick={() => trackCTAClick("tooth_fairy_story_book")}>
                <Sparkles className="w-4 h-4" />
                Join the Workshop
              </a>
            </Button>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 md:py-20 bg-secondary/30">
          <div className="container px-6 max-w-2xl mx-auto">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
              About the story
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

        {/* Related */}
        <section className="py-16 md:py-20 bg-background">
          <div className="container px-6 max-w-3xl mx-auto">
            <h2 className="font-display text-xl font-bold text-foreground mb-6 text-center">
              Keep exploring
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { to: "/is-the-tooth-fairy-real", label: "The real story of the Tooth Fairy", desc: "Where the tradition comes from, and its history around the world." },
                { to: "/what-does-the-tooth-fairy-do-with-teeth", label: "What does she do with teeth?", desc: "Inside the Tooth Fairy's workshop." },
                { to: "/tooth-fairy-letter", label: "Tooth Fairy letter template", desc: "A free printable letter from the Tooth Fairy." },
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
      </main>

      <Footer />
    </div>
  );
};

export default ToothFairyStory;
