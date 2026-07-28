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
    question: "Is the Tooth Fairy the same in every country?",
    answer:
      "The tradition exists all over the world, but it takes different forms. In France and other parts of Europe, it's La Petite Souris, a small mouse who takes the tooth. In parts of Asia, children throw their lower teeth onto the roof and upper teeth under the floor. In the Middle East, teeth are sometimes thrown toward the sun. The Tooth Fairy's workshop has teeth from all of these traditions.",
  },
  {
    question: "How old is the Tooth Fairy tradition?",
    answer:
      "Customs around lost teeth date back thousands of years. Norse and Northern European traditions from the 10th century mention a tooth fee, a small payment for a child's first lost tooth. The figure of the Tooth Fairy as we know her in the English-speaking world became more widespread in the early 20th century.",
  },
  {
    question: "Who invented the Tooth Fairy?",
    answer:
      "No one invented her; she grew from a tradition that many cultures developed independently. The modern version of the Tooth Fairy story was shaped over generations of parents answering the same question every child eventually asks: what happens to my tooth now?",
  },
  {
    question: "What is The Tooth Fairy's Secret Workshop?",
    answer:
      "It's an animated short film from the Wiggly Tooth Workshop, made in collaboration with Peter H. Reynolds and FableVision Studios. The story follows a curious boy named Arlo who discovers what really happens to lost teeth and what goes on inside the Tooth Fairy's workshop. The short film is free to watch on YouTube now.",
  },
  {
    question: "Who are Arlo and CeCe?",
    answer:
      "Arlo is a curious boy who sets out to learn what the Tooth Fairy really does with his lost tooth. CeCe is the Tooth Fairy he meets on a late-night adventure - the one whose workshop, and whose secret, the story follows. Together they discover what really happens to every tooth that came before.",
  },
  {
    question: "What is Ratoncito Pérez?",
    answer:
      "Ratoncito Pérez - also called El Ratón de los Dientes, 'the tooth mouse' - is the Spanish and Latin American version of the Tooth Fairy. Instead of a winged fairy, a small mouse collects the tooth left under the pillow and leaves a coin or little gift behind. France and Belgium have a similar mouse, La Petite Souris.",
  },
  {
    question: "Why is the Tooth Fairy a mouse in some countries?",
    answer:
      "In many cultures the tooth-taker is a mouse rather than a fairy. One old reason is the wish that a child's new tooth would grow in as strong and sharp as a rodent's. Whatever the character, the ritual is the same: the lost tooth is collected, and something is left behind to mark the moment.",
  },
  {
    question: "Who created Ratoncito Pérez?",
    answer:
      "The Spanish priest and author Luis Coloma created Ratoncito Pérez in 1894, in a story written to comfort the young King Alfonso XIII of Spain, who had just lost a milk tooth. The little tooth mouse went on to become the Spanish and Latin American counterpart of the Tooth Fairy.",
  },
  {
    question: "When did the Tooth Fairy get her name?",
    answer:
      "The Tooth Fairy appears in print as early as a 1908 Chicago Daily Tribune column, but the name was cemented in 1927, when children's playwright Esther Watkins Arnold published a short playlet called The Tooth Fairy. No single person invented her - she grew out of much older customs around lost teeth.",
  },
];

const ToothFairyStoryExplained = () => {
  return (
    <>
      <PageSeo
        title="The Tooth Fairy Story Explained: Origins and Real Meaning | Wiggly Tooth Workshop"
        description="The Tooth Fairy story explained: where the tradition began, how it spread across cultures and centuries, and what losing a tooth has always really meant."
        canonical="https://wigglytoothworkshop.com/tooth-fairy-story-explained"
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
                  name: "The Tooth Fairy Story, Explained",
                  item: "https://wigglytoothworkshop.com/tooth-fairy-story-explained",
                },
              ],
            },
            {
              "@type": "Article",
              headline: "The Tooth Fairy Story, Explained",
              url: "https://wigglytoothworkshop.com/tooth-fairy-story-explained",
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
                  The Story Behind the Story
                </span>
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-starlight mb-6 leading-tight">
                The Tooth Fairy Story,<br />
                <span className="text-primary">Explained</span>
              </h1>
              <p className="text-lg text-starlight/80 mb-8 leading-relaxed max-w-2xl mx-auto">
                Where did the Tooth Fairy come from? Why does the tradition exist in so many places?
                And what does the workshop have to do with any of it?
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
                  The Tooth Fairy tradition exists in some form in almost every culture on earth,
                  though the details vary. What stays the same, everywhere, is the core exchange:
                  a child loses something, a ritual marks the moment, and something is given back.
                  The Tooth Fairy is the answer to the question every child eventually asks:
                  <em> what happens to my tooth now?</em> And that question is as old as childhood itself.
                </p>
                <p className="mt-4 text-sm text-muted-foreground">
                  Looking for a story to read instead of the history?{" "}
                  <Link to="/tooth-fairy-story" className="text-primary font-medium hover:underline">
                    Read the Tooth Fairy story →
                  </Link>
                </p>
              </div>
            </div>
          </section>

          {/* Film embed (prominent) */}
          <FilmEmbed
            location="tooth_fairy_story"
            heading="Watch the story come to life"
            blurb="The Tooth Fairy's Secret Workshop is a short animated film that tells the story in a few magical minutes - free to watch."
            bg="bg-background"
          />

          {/* Main Content */}
          <section className="py-12 md:py-16 bg-background">
            <div className="container px-6 max-w-2xl mx-auto space-y-12">

              <div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Where the Tradition Begins
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    For as long as there have been children, there have been lost teeth, and people
                    trying to explain where they go. Thousands of years ago, in cultures that never
                    had contact with each other, people developed their own rituals for what to do
                    when a child's tooth fell out.
                  </p>
                  <p>
                    In Norse and Northern European traditions from the 10th century,
                    there's a record of a "tooth fee," a small payment given to a child
                    for their first lost tooth. Vikings were said to wear children's teeth as
                    good luck in battle, believing the purity and courage of childhood would
                    protect them.
                  </p>
                  <p>
                    In parts of Asia, the tradition involves throwing the tooth: lower teeth
                    are thrown onto the roof (so the new tooth will grow upward),
                    and upper teeth are buried in the ground (so the new tooth will grow downward).
                    The logic is different, but the instinct is the same: a lost tooth is
                    significant. It deserves a ritual.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                  How the Tooth Fairy Took Shape
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    The Tooth Fairy as we know her in the English-speaking world began to take
                    her modern form in the early 20th century. One of the earliest printed
                    references appeared in the <em>Chicago Daily Tribune</em> on September 27,
                    1908 - a household-hints column by Lillian Brown suggesting parents use a
                    "tooth fairy" who leaves a small gift to coax children through losing a
                    tooth. The fact that it was offered as a handy tip suggests the idea was
                    already familiar.
                  </p>
                  <p>
                    The name itself was cemented a couple of decades later. In 1927, the
                    children's playwright Esther Watkins Arnold published an eight-page playlet
                    for young actors called <em>The Tooth Fairy</em>, giving the elf-like
                    character a stage and a name. No single author truly invented her, though -
                    she grew out of the same instinct that gave us Santa Claus and the Easter
                    Bunny: explaining an ordinary event with an extraordinary character, for
                    children asking very reasonable questions.
                  </p>
                  <p>
                    Over the following decades the tradition spread and grew. By the time most
                    grandparents today were children, the Tooth Fairy was already part of the
                    story - a figure everyone seemed to know, even if no one quite agreed on the
                    details.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Tooth Fairy Traditions Around the World
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    In much of the English-speaking world it's a winged fairy who
                    visits at night. But travel a little and the visitor changes
                    shape - most often into a mouse.
                  </p>
                  <p>
                    In Spain and much of Latin America, a small mouse named
                    <em> Ratoncito Pérez</em> (also called El Ratón de los Dientes,
                    "the tooth mouse") slips in to collect the tooth and leave a
                    coin or gift. He has a surprisingly precise origin: the priest
                    and author Luis Coloma invented him in 1894 in a story written to
                    comfort the boy-king Alfonso XIII of Spain, who had just lost a
                    milk tooth at age eight. France and parts of Belgium have their
                    own mouse, <em> La Petite Souris</em>, and Afrikaans families in
                    South Africa leave the tooth in a slipper for the
                    <em> Tandmuis</em>. The mouse shows up again and again - one old
                    idea being that a child's new tooth might grow in as strong and
                    sharp as a rodent's.
                  </p>
                  <p>
                    Elsewhere, the ritual is about where the tooth goes. In Japan,
                    children throw a lower tooth straight up and an upper tooth down,
                    so each new tooth grows in toward the old one and comes in
                    straight. In Korea, teeth are tossed onto the roof, often with a
                    little song to a magpie for good luck. In parts of the Middle
                    East there's a much older custom of throwing the tooth toward the
                    sun. And in Mali, a lost tooth goes into a chicken coop in the
                    hope of finding a hen the next morning.
                  </p>
                  <p>
                    Different characters, different rituals - but the same instinct
                    underneath, everywhere: a lost tooth matters, and the moment
                    deserves to be marked.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                  What Does the Tooth Fairy Look Like?
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    There's no single, official picture of the Tooth Fairy - which
                    is part of her charm. In a well-known 1984 study, the researcher
                    Rosemary Wells found that about 74% of people imagined the Tooth
                    Fairy as female, while the rest pictured her as either gender or
                    as neither.
                  </p>
                  <p>
                    And the <em>form</em> people imagine varies wildly: a winged
                    pixie, a tiny ballerina, a mouse, a dragon, even a flying dentist.
                    That's the beauty of a folk figure with no fixed author - every
                    family, and every child, gets to picture her their own way. In
                    the Wiggly Tooth Workshop story, she's CeCe: a small, clever
                    tinkerer with goggles and a tool belt. That's simply our version
                    of a character the whole world has been imagining for a very long
                    time.
                  </p>
                  <p>
                    <Link to="/what-does-the-tooth-fairy-look-like" className="text-primary font-medium hover:underline">
                      See what she looks like in our film →
                    </Link>
                  </p>
                </div>
              </div>

              <div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                  What the Tradition Is Really About
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Losing a baby tooth is one of a child's first physical experiences of change.
                    Something that was part of you is suddenly gone. Something new will grow in its
                    place. It can feel strange. A little scary. Sometimes exciting.
                  </p>
                  <p>
                    The Tooth Fairy tradition turns that moment into something meaningful.
                    The child isn't just losing a tooth. They're <em>giving</em> something to someone
                    who wants it, who values it, who will do something good with it. The tooth
                    doesn't just disappear. It goes somewhere. And that changes how the whole
                    thing feels.
                  </p>
                  <p>
                    That's the real magic of the tradition. And it has been working for a very long time.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                  The Workshop's Version
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    The Wiggly Tooth Workshop adds one more layer to the story,
                    an answer to the question the tradition never quite settled:
                    <em> why does she take the teeth?</em>
                  </p>
                  <p>
                    In the world of <em>The Tooth Fairy's Secret Workshop</em>,
                    every lost tooth holds a good quality (bravery, kindness, creativity, or patience)
                    grown during years of childhood. The Tooth Fairy collects them not
                    to hoard them, but to carefully lift them out and use them to help fix the
                    small problems the world keeps running into.
                  </p>
                  <p>
                    It's a story that takes the oldest tradition in childhood and asks:
                    what if the exchange was even more meaningful than anyone knew?
                    What if the teeth actually mattered, not just as objects,
                    but as containers of something real?
                  </p>
                  <p>
                    That's the story Arlo and CeCe go to discover. And it changes how they
                    see every tooth they've ever lost.
                  </p>
                </div>
              </div>

            </div>
          </section>

          {/* FAQ */}
          <section className="py-12 md:py-16 bg-secondary/30">
            <div className="container px-6 max-w-2xl mx-auto">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
                Questions about the tradition
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
                  { to: "/why-does-the-tooth-fairy-take-teeth", label: "Why does she take teeth?", desc: "The reason behind the exchange" },
                  { to: "/is-the-tooth-fairy-real", label: "Is the Tooth Fairy real?", desc: "A serious answer to a serious question" },
                  { to: "/first-tooth-what-to-do", label: "Your child's first lost tooth", desc: "What to do and what to expect" },
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
                See it for yourself
              </h2>
              <p className="text-starlight/70 mb-8 leading-relaxed">
                <em>The Tooth Fairy's Secret Workshop</em> is an animated short film made
                with Peter H. Reynolds and FableVision Studios, now free to watch on YouTube.
                Join the Workshop for behind-the-scenes updates and what's coming next.
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

export default ToothFairyStoryExplained;
