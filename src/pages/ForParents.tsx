import { Link } from "react-router-dom";
import { ArrowLeft, Sparkles, HelpCircle, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import PageSeo from "@/components/PageSeo";
import FilmEmbed from "@/components/FilmEmbed";
import { trackCTAClick } from "@/lib/analytics";

const PAGE_URL = "https://wigglytoothworkshop.com/for-parents";
const SITE_URL = "https://wigglytoothworkshop.com/";

const parentFaqs = [
  {
    question: "How do you answer when your child asks if the Tooth Fairy is real?",
    answer:
      "You don't have to settle it in one sentence. A gentle, honest favourite is to answer the question with a question: \"What do you think?\" It tells you where your child actually is, and it keeps the wonder in their hands. If they're not really doubting yet, they usually just want the magic confirmed. If they are starting to wonder, you can lean into what's true underneath the story - that the courage, kindness, patience, and creativity the Tooth Fairy looks for are real qualities they really are growing.",
  },
  {
    question: "What do I say when my child starts doubting the Tooth Fairy?",
    answer:
      "Take it slowly and follow their lead. You can say that some people picture the Tooth Fairy as one winged person and others see her as the idea of noticing the good growing inside a child - and that both can feel true. The thing that never stops being real is what the story is about: the small, brave, kind things your child does. Most children aren't asking to lose the magic. They're asking whether it's safe to keep loving it.",
  },
  {
    question: "Is it okay to keep the Tooth Fairy going even after my child suspects the truth?",
    answer:
      "Yes. Many children enjoy the tradition long after they've half-figured it out, the same way we enjoy any good story we choose to step into. If your child seems to want the ritual to continue, you can keep it going without over-explaining. The letters, the lost tooth, the quality you noticed in them - those stay meaningful whether or not they believe in a literal fairy.",
  },
  {
    question: "How do I explain what the Tooth Fairy actually does with the teeth?",
    answer:
      "In this version of the story, the Tooth Fairy gathers teeth because each one holds a quality the child has been growing - a spark of bravery, kindness, patience, or creativity - and she uses a little of that magic to quietly help the world. It's a gentle way to tell your child that the good things in them matter beyond their own home.",
  },
];

const forParentsJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "For Parents", item: PAGE_URL },
      ],
    },
    {
      "@type": "Article",
      headline: "How to Answer When Your Child Asks About the Tooth Fairy",
      description:
        "Warm, practical guidance for parents on how to answer when a child asks about the Tooth Fairy - including how to handle the moment doubt begins, while keeping the wonder.",
      url: PAGE_URL,
      mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL },
      publisher: {
        "@type": "Organization",
        name: "Wiggly Tooth Workshop",
        url: SITE_URL,
      },
      author: {
        "@type": "Organization",
        name: "Wiggly Tooth Workshop",
        url: SITE_URL,
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: parentFaqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ],
};

const ForParents = () => {
  return (
    <div className="min-h-screen bg-background">
      <PageSeo
        title="For Parents: Tooth Fairy Questions Answered | Wiggly Tooth Workshop"
        description="Gentle guidance for parents on how to answer when your child asks about the Tooth Fairy, plus meaningful Tooth Fairy ideas to make each lost tooth matter."
        canonical={PAGE_URL}
        jsonLd={forParentsJsonLd}
      />
      <NavBar />
      <main className="container px-6 py-16 max-w-3xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Wiggly Tooth Workshop
        </Link>

        <span className="inline-block text-xs font-semibold uppercase tracking-wide text-primary bg-primary/10 px-3 py-1 rounded-full mb-5">
          For Parents
        </span>

        <h1 className="font-display text-4xl font-bold text-foreground mb-4 leading-tight">
          Bringing the magic home
        </h1>
        <p className="text-muted-foreground text-lg leading-relaxed mb-12">
          Resources, answers, and ideas for making the tooth-losing tradition
          meaningful — and a little more magical.
        </p>

        {/* Film embed */}
        <div className="mb-10">
          <FilmEmbed
            location="for_parents"
            heading="Watch the short film with your child"
            blurb="The Tooth Fairy's Secret Workshop is a wonderful conversation starter - watch it together, then talk about what quality might be growing in their tooth."
          />
        </div>

        {/* Quick links */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          {[
            {
              href: "/is-the-tooth-fairy-real",
              icon: HelpCircle,
              title: "Is the Tooth Fairy real?",
              description: "An honest, magical answer — for when your child starts asking.",
            },
            {
              href: "/what-does-the-tooth-fairy-do-with-teeth",
              icon: Sparkles,
              title: "What does the Tooth Fairy do with teeth?",
              description: "The full story behind where those tiny teeth really go.",
            },
            {
              href: "/how-much-does-the-tooth-fairy-leave",
              icon: HelpCircle,
              title: "How much does the Tooth Fairy leave?",
              description: "Ranges, averages, and what actually lands well with kids.",
            },
            {
              href: "/tooth-fairy-letter",
              icon: Download,
              title: "Tooth Fairy letter template",
              description: "A printable letter from the Tooth Fairy, free to use.",
            },
            {
              href: "/what-to-say-when-child-asks-if-tooth-fairy-is-real",
              icon: HelpCircle,
              title: "What to say when they ask",
              description: "A gentle guide for the conversation that eventually comes.",
            },
            {
              href: "/printables",
              icon: Download,
              title: "Free printables",
              description: "Coloring pages and more, all free.",
            },
          ].map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="group flex items-start gap-3 p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors border border-transparent hover:border-border"
            >
              <item.icon className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
              <div>
                <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                  {item.title}
                </span>
                <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* How to answer */}
        <section className="mb-12">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-5 leading-tight">
            How to answer when your child asks about the Tooth Fairy
          </h2>
          <div className="space-y-5 text-muted-foreground leading-relaxed">
            <p>
              When the questions start coming, the kindest thing you can do is also the
              easiest: don't over-explain. A child who asks "is the Tooth Fairy real?" is
              usually not asking for a lecture. They're testing the edges of something they
              love. A short, warm answer almost always lands better than a long one.
            </p>
            <p>
              One of the gentlest moves is to answer a question with a question. "What do you
              think?" hands the wonder back to your child and tells you where they actually
              are. Some children just want the magic confirmed and will happily tell you
              exactly how it works. Others are quietly wondering, and giving them room to say
              so out loud matters more than getting the facts straight.
            </p>
            <p>
              You can also lean into the meaning underneath the story. The whole idea of the
              Tooth Fairy, in our world, is that each lost tooth holds a real quality the child
              has been growing - bravery, kindness, patience, creativity - and she gathers
              those qualities to quietly help the world. Those qualities don't disappear when a
              child grows up or stops believing in a winged fairy. The courage your child found
              this year is real. That part is always true, and it's a lovely thing to say plainly.
            </p>
            <p>
              And when the moment of real doubt arrives - the one where your child looks at you
              and you can tell they want the truth - go gently and stay honest. You can say that
              some people picture the Tooth Fairy as one person and others see her as the idea
              of noticing the good growing inside a child, and that both can feel true at once.
              Most children aren't trying to end the magic. They're asking whether it's safe to
              keep loving it. Letting them keep the wonder while you tell the truth is not a
              contradiction. It's the gift.
            </p>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed mt-6">
            For more on the exact words to use, see{" "}
            <Link
              to="/what-to-say-when-child-asks-if-tooth-fairy-is-real"
              className="text-primary font-medium hover:underline"
            >
              what to say when they ask
            </Link>{" "}
            and our honest, magical answer to{" "}
            <Link
              to="/is-the-tooth-fairy-real"
              className="text-primary font-medium hover:underline"
            >
              is the Tooth Fairy real?
            </Link>
          </p>
        </section>

        {/* Tooth Fairy ideas */}
        <section className="mb-12">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-5 leading-tight">
            Meaningful Tooth Fairy Ideas
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            The best Tooth Fairy ideas aren't really about the money or the props -
            they're about making a lost tooth <em>mean</em> something. In this
            story, every tooth holds a real quality the child grew, so the most
            meaningful thing you can do is help them notice it, and wonder together
            about the good it will do out in the world.
          </p>
          <ol className="space-y-4">
            {[
              {
                title: "Name the quality in the tooth",
                body: "At bedtime, talk about one good thing they've been growing - a moment of courage, a kindness, a stretch of patience - and tell them that's what their tooth quietly carries.",
              },
              {
                title: "Ask what good their tooth will do",
                body: "\"What do you think your tooth will help with, out in the world?\" It turns a routine night into a real, gentle conversation about character and wonder.",
              },
              {
                title: "Leave a note in the Tooth Fairy's voice",
                body: (
                  <>
                    Use the free{" "}
                    <Link to="/tooth-fairy-letter" className="text-primary font-medium hover:underline">
                      Tooth Fairy letter template
                    </Link>{" "}
                    to name the quality she found and what she did with it.
                  </>
                ),
              },
              {
                title: "Make the first one a keepsake",
                body: (
                  <>
                    Mark the very first lost tooth with the{" "}
                    <Link to="/first-tooth-tradition" className="text-primary font-medium hover:underline">
                      first tooth keepsake certificate
                    </Link>{" "}
                    - a small record of who your child was becoming.
                  </>
                ),
              },
              {
                title: "Keep a record over time",
                body: "Note the quality for each lost tooth. By the last one, you'll have a little portrait of the child they grew into, tooth by tooth.",
              },
              {
                title: "Make the gift meaningful, not big",
                body: (
                  <>
                    A single special coin, chosen with care, lands better than a
                    larger amount left in silence -{" "}
                    <Link to="/why-does-the-tooth-fairy-leave-money" className="text-primary font-medium hover:underline">
                      here's what the gift really means
                    </Link>
                    .
                  </>
                ),
              },
              {
                title: "Watch the story together",
                body: (
                  <>
                    The short film sparks the whole idea in a few minutes -{" "}
                    <Link to="/watch" className="text-primary font-medium hover:underline">
                      watch it together
                    </Link>{" "}
                    and let the conversation follow.
                  </>
                ),
              },
            ].map((idea, i) => (
              <li key={i} className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                <div>
                  <p className="font-display font-semibold text-foreground">{idea.title}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed mt-0.5">{idea.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Workshop CTA */}
        <div className="magical-card text-center">
          <Sparkles className="w-6 h-6 text-primary mx-auto mb-3" />
          <h3 className="font-display text-lg font-semibold text-foreground mb-2">
            Join the Workshop
          </h3>
          <p className="text-muted-foreground text-sm mb-5 leading-relaxed">
            New printables, CeCe and Arlo stories, classroom resources, and early
            updates about the ToothSafe — all free for Workshop members.
          </p>
          <Button
            variant="magical"
            size="sm"
            onClick={() => trackCTAClick("for_parents_page")}
            asChild
          >
            <a href="/#signup">
              <Sparkles className="w-3.5 h-3.5" />
              Join the Workshop
            </a>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ForParents;
