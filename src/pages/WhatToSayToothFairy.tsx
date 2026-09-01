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
import { trackFAQOpen, trackButtonClick } from "@/lib/analytics";

const faqs = [
  {
    question: "Should I tell my child the Tooth Fairy is real?",
    answer:
      "It depends on what your child is really asking. Some children want reassurance. Others are ready for a more grown-up answer. You don't have to force a yes-or-no. You can preserve wonder without forcing literal belief — and a thoughtful answer often means more to a child than a quick confirmation either way.",
  },
  {
    question: "What age do kids stop believing in the Tooth Fairy?",
    answer:
      "Many children begin questioning the Tooth Fairy between ages 7 and 9, though every child is different. Some ask earlier, especially if they have older siblings or friends who have already had the conversation. There is no single right age — the timing usually comes naturally when a child is ready.",
  },
  {
    question: "Is it lying to let kids believe in the Tooth Fairy?",
    answer:
      "Many parents see the Tooth Fairy as a tradition rather than a lie. The key is how you handle the question when your child asks directly. A thoughtful answer can honor the tradition while respecting your child's growing understanding — and can help them see that the meaning behind the tradition is real, even if the details are ones the family creates together.",
  },
  {
    question: "What should I say if my child asks who leaves the money?",
    answer:
      "You can say that the money is a thank-you and a celebration of the child growing up. If your child is ready for more, you can explain that parents help keep the tradition alive — and that being the one who keeps a little wonder going for someone else is its own kind of magic.",
  },
  {
    question: "How do I keep an older child from ruining it for younger siblings?",
    answer:
      "Invite them into the tradition. Let them know that growing up sometimes means becoming one of the people who helps keep wonder alive for someone else. Most children respond well to being trusted with that — it gives them a new role instead of just taking something away.",
  },
];

const WhatToSayToothFairy = () => {
  return (
    <>
      <PageSeo
        title="What to Say When a Child Asks If the Tooth Fairy Is Real | Wiggly Tooth Workshop"
        description="What do you say when your child asks if the Tooth Fairy is real? Gentle, honest scripts by age that answer the question without making growing up feel like a loss."
        canonical="https://wigglytoothworkshop.com/what-to-say-when-child-asks-if-tooth-fairy-is-real"
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
                  name: "What to Say When Your Child Asks If the Tooth Fairy Is Real",
                  item: "https://wigglytoothworkshop.com/what-to-say-when-child-asks-if-tooth-fairy-is-real",
                },
              ],
            },
            {
              "@type": "Article",
              headline: "What to Say When Your Child Asks If the Tooth Fairy Is Real",
              url: "https://wigglytoothworkshop.com/what-to-say-when-child-asks-if-tooth-fairy-is-real",
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
                  to="/is-the-tooth-fairy-real"
                  className="inline-flex items-center gap-2 text-starlight/80 hover:text-starlight transition-colors text-sm"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Is the Tooth Fairy Real?
                </Link>
                <span className="inline-block text-xs font-semibold uppercase tracking-wide text-primary bg-primary/10 px-3 py-1 rounded-full">
                  For Parents
                </span>
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-starlight mb-6 leading-tight">
                What to Say When Your Child<br className="hidden sm:block" />
                <span className="text-primary"> Asks If the Tooth Fairy Is Real</span>
              </h1>
              <p className="text-lg text-starlight/80 leading-relaxed max-w-2xl mx-auto">
                Without breaking the magic, lying awkwardly, or making growing up feel like a loss.
              </p>
            </div>
          </section>

          {/* Opening */}
          <section className="py-12 md:py-16 bg-secondary/30">
            <div className="container px-6 max-w-2xl mx-auto">
              <div className="magical-card p-8 space-y-4 text-muted-foreground leading-relaxed">
                <p>At some point, many children ask the question parents know is coming:</p>
                <p className="font-display text-xl font-semibold text-foreground">
                  "Is the Tooth Fairy real?"
                </p>
                <p>It can be a surprisingly hard moment.</p>
                <p>
                  You may not want to lie. You may not want to break the magic. You may also have
                  younger siblings in the house who are not ready for the question yet.
                </p>
                <p>The best answer may not be a blunt yes or no.</p>
                <p>
                  Instead, it can be a chance to help your child understand that losing teeth is
                  not just about a tiny visitor in the night. It is about growing up, noticing
                  bigger questions, and learning that the qualities they are growing inside
                  themselves matter.
                </p>
              </div>
            </div>
          </section>

          {/* The Gentle Answer */}
          <section className="py-12 md:py-16 bg-background">
            <div className="container px-6 max-w-2xl mx-auto">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">
                A Gentle Answer You Can Use
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Here is one way to answer when your child asks if the Tooth Fairy is real:
              </p>
              <blockquote className="rounded-2xl border border-primary/20 bg-primary/5 px-8 md:px-10 py-8 space-y-4 text-foreground leading-loose text-[15px]">
                <p>
                  "Maybe part of growing up is starting to notice bigger questions.
                </p>
                <p>
                  Your baby teeth have been with you through some really important years. They
                  were there while you learned to walk, learned to read, made friends, got brave,
                  got hurt, tried new things, and slowly became more you.
                </p>
                <p>That's why losing a tooth feels like such a big milestone.</p>
                <p>
                  An adult tooth means you're changing. Growing. Becoming stronger and more
                  independent. And honestly, as your parent, that's exciting for me to watch.
                </p>
                <p>
                  The Tooth Fairy story exists because people have always known there's something
                  important about that moment.
                </p>
                <p>
                  Adults don't understand everything about the world either. But we do know this:
                  the qualities you grow inside yourself matter. Your kindness matters. Your
                  courage matters. Your creativity matters. The way you treat people matters.
                </p>
                <p>
                  And maybe the Tooth Fairy has always been a way of reminding kids not to lose
                  those things as they grow up.
                </p>
                <p>
                  The money isn't really a payment for a tooth. It's more like a small
                  celebration of who you're becoming — and a reminder that growing up should
                  help you make the world a little better in your own way.
                </p>
                <p>Some people stop looking for magic as they get older.</p>
                <p>
                  But the people who hold onto wonder a little longer often notice things other
                  people miss."
                </p>
              </blockquote>
            </div>
          </section>

          {/* Why This Works */}
          <section className="py-12 md:py-16 bg-primary/5">
            <div className="container px-6 max-w-2xl mx-auto">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                Why This Answer Works
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed mb-8">
                <p>
                  This answer does not force your child to keep believing something they may
                  already be questioning.
                </p>
                <p>It also does not yank the magic away from them.</p>
                <p>
                  Instead, it widens the meaning of the Tooth Fairy tradition. Your child is
                  asking a more grown-up question, so the answer gives them a more grown-up
                  version of the story.
                </p>
              </div>
              <ul className="space-y-3">
                {[
                  "It does not say the Tooth Fairy is fake.",
                  "It does not force literal belief.",
                  "It preserves mystery.",
                  "It treats skepticism as maturity, not betrayal.",
                  "It makes losing a tooth feel meaningful instead of silly.",
                  "It connects the tradition to growth, kindness, courage, creativity, and wonder.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Sparkles className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span className="text-muted-foreground leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Shorter Version */}
          <section className="py-12 md:py-16 bg-background">
            <div className="container px-6 max-w-2xl mx-auto">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                A Shorter Version for Younger Kids
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                If your child is younger, tired, emotional, or not really asking for the full
                truth, you can keep it simpler:
              </p>
              <blockquote className="rounded-2xl border border-primary/20 bg-primary/5 px-8 md:px-10 py-7 text-foreground leading-loose text-[15px]">
                <p>
                  "The Tooth Fairy is part of how we celebrate something really important: you
                  growing up. Your baby teeth helped tell the story of who you've been becoming.
                  When you lose one, it reminds us that your courage, kindness, creativity, and
                  wonder are growing too."
                </p>
              </blockquote>
            </div>
          </section>

          {/* Older Child */}
          <section className="py-12 md:py-16 bg-secondary/20">
            <div className="container px-6 max-w-2xl mx-auto">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                What to Say to an Older Child Who Already Suspects
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed mb-6">
                <p>Some children ask because they genuinely want reassurance.</p>
                <p>
                  Others ask because they already know the answer and want to see what you will say.
                </p>
                <p>
                  For older children, you can invite them into the tradition instead of making
                  them feel foolish for ever believing it.
                </p>
              </div>
              <blockquote className="rounded-2xl border border-primary/20 bg-primary/5 px-8 md:px-10 py-7 text-foreground leading-loose text-[15px] mb-6">
                <p>
                  "Sometimes growing up means becoming part of the people who help keep a little
                  wonder in the world for someone else."
                </p>
              </blockquote>
              <p className="text-muted-foreground leading-relaxed">
                This can be especially helpful if there are younger siblings in the house. It
                gives an older child a new role: not as the person who exposes the secret, but
                as someone trusted to help protect a little magic for others.
              </p>
            </div>
          </section>

          {/* What Not to Say */}
          <section className="py-12 md:py-16 bg-background">
            <div className="container px-6 max-w-2xl mx-auto">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                What Not to Say
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Every family handles this differently, but a few responses can make the moment
                harder than it needs to be.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Laughing at the question",
                  "Saying 'Of course she is real' if your child is clearly asking for a deeper answer",
                  "Immediately saying 'No, it was us' without giving the moment any meaning",
                  "Making your child feel foolish for believing",
                  "Turning the answer into a lecture about honesty",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-primary/60 font-bold mt-0.5 shrink-0">–</span>
                    <span className="text-muted-foreground leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                The goal is not to win the factual argument. The goal is to help your child
                move from one layer of wonder to the next.
              </p>
            </div>
          </section>

          {/* A Different Way to Think */}
          <section className="py-12 md:py-16 bg-primary/5">
            <div className="container px-6 max-w-2xl mx-auto">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">
                A Different Way to Think About the Tooth Fairy
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  At Wiggly Tooth Workshop, we believe losing a tooth is more than a transaction
                  under a pillow.
                </p>
                <p>
                  A tooth has been with a child through years of growing, learning, trying,
                  failing, laughing, imagining, and becoming. That makes it worth celebrating.
                </p>
                <p>
                  The Tooth Fairy tradition works best when it reminds children that the qualities
                  they grow inside themselves matter — kindness, courage, patience, creativity,
                  curiosity, and wonder.
                </p>
                <p>Those qualities do not disappear when children grow up.</p>
                <p>If anything, growing up is the chance to carry them forward.</p>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="py-12 md:py-16 bg-background">
            <div className="container px-6 max-w-2xl mx-auto">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
                FAQs About Answering Tooth Fairy Questions
              </h2>
              <Accordion type="single" collapsible className="space-y-3">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="magical-card border-0 data-[state=open]:shadow-magical transition-shadow"
                  >
                    <AccordionTrigger
                      className="text-left font-display font-semibold text-foreground hover:text-primary transition-colors hover:no-underline px-0"
                      onClick={() => trackFAQOpen(faq.question)}
                    >
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

          {/* Internal Links */}
          <section className="py-12 md:py-16 bg-secondary/30">
            <div className="container px-6 max-w-2xl mx-auto">
              <h2 className="font-display text-xl font-bold text-foreground mb-3 text-center">
                More Tooth Fairy Ideas for Families
              </h2>
              <p className="text-muted-foreground text-center mb-8 text-sm leading-relaxed max-w-lg mx-auto">
                Looking for more ways to make losing a tooth feel meaningful? Explore free
                printables, letters, coloring pages, and stories from Wiggly Tooth Workshop.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { to: "/is-the-tooth-fairy-real", label: "Is the Tooth Fairy real?", desc: "The honest answer, for children who ask" },
                  { to: "/tooth-fairy-letter", label: "Free Tooth Fairy Letter Template", desc: "A printable letter from the Tooth Fairy for your child" },
                  { to: "/tooth-fairy-printables", label: "Tooth Fairy Printables", desc: "Free activities and worksheets for kids" },
                  { to: "/coloring-page", label: "Free Coloring Page", desc: "A magical scene to color and keep" },
                  { to: "/is-the-tooth-fairy-real", label: "The Tooth Fairy story, explained", desc: "Where the tradition comes from and why it matters" },
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

          {/* Soft CTA */}
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
                More thoughtful Tooth Fairy ideas
              </h2>
              <p className="text-starlight/70 mb-8 leading-relaxed">
                Want more printables, stories, and letters that help make losing a tooth feel
                like the milestone it is? Join the free Wiggly Tooth Workshop.
              </p>
              <Button
                variant="hero"
                size="lg"
                asChild
                onClick={() => trackButtonClick("Join the Workshop", "what-to-say-cta")}
              >
                <a href="/#signup">
                  <Sparkles className="w-4 h-4" />
                  Join the Workshop — it's free
                </a>
              </Button>
              <p className="mt-4 text-xs text-starlight/70">
                No spam · Unsubscribe anytime
              </p>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default WhatToSayToothFairy;
