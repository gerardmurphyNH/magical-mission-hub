import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Download,
  FileText,
  Image as ImageIcon,
  Sparkles,
  Heart,
  Camera,
  PenLine,
  Archive,
  Calendar,
  Star,
} from "lucide-react";
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
import { YOUTUBE_VIDEO_URL } from "@/lib/config";
import { trackEvent } from "@/lib/analytics";
import LiteYouTube from "@/components/LiteYouTube";
import certificate from "@/assets/first-tooth-certificate.jpg";

const PAGE_URL = "https://wigglytoothworkshop.com/first-tooth-tradition";
const SITE_URL = "https://wigglytoothworkshop.com/";
const CERT_JPG = "/downloads/first-tooth-keepsake-certificate.jpg";
const CERT_PDF = "/downloads/first-tooth-keepsake-certificate.pdf";
const CERT_ABS = "https://wigglytoothworkshop.com/downloads/first-tooth-keepsake-certificate.jpg";
const CERT_ALT =
  "Printable Tooth Fairy certificate - 'My First Tooth Keepsake', a first tooth certificate the Tooth Fairy leaves behind naming the special quality she found inside the child's tooth";

const steps = [
  "When your child loses their first tooth, tuck it under the pillow as always.",
  "Before bed, talk quietly together about something they've been growing lately.",
  "Choose one quality that feels true to them - kindness, bravery, creativity, curiosity, patience, gratitude, friendship, perseverance, wonder, empathy, responsibility, or hope.",
  "In the morning, your child finds the Tooth Fairy's thank-you and her certificate waiting.",
  "The certificate becomes a keepsake - a record not just of the tooth, but of who your child was at that moment.",
];

const samplePhrases = [
  "The wonderful quality I see in you: kindness.",
  "This tooth will help bring more courage into the world.",
  "A note for you: your curiosity makes ordinary days feel full of discovery.",
  "The wonderful quality I see in you: patience - the quiet kind that waits for what matters.",
  "This tooth carried your creativity. I'll use it to help someone imagine something new.",
  "A note for you: the way you include other children is its own kind of magic.",
  "The wonderful quality I see in you: bravery. You faced something hard and did it anyway.",
  "This tooth held your gratitude, and the world could always use a little more.",
  "A note for you: your gentleness with your little brother did not go unnoticed.",
  "The wonderful quality I see in you: perseverance. You kept going when stopping would have been easier.",
  "This tooth will help bring more wonder into the world - the kind that makes people look up.",
  "A note for you: keep asking your questions. They matter more than you know.",
];

const moreIdeas = [
  { icon: Camera, text: "Take a photo of that gap-toothed grin - first-tooth smiles don't last long." },
  { icon: PenLine, text: "Write down the funny thing they said when the tooth finally came out." },
  { icon: Archive, text: "Tuck the finished certificate into a memory box or baby book." },
  { icon: Heart, text: "Let your child choose the quality the Tooth Fairy noticed in them." },
  { icon: Sparkles, text: "Leave a tiny handwritten note from the Tooth Fairy alongside the certificate." },
  { icon: Calendar, text: "Mark the date on the family calendar so you remember the first." },
  { icon: Star, text: "Revisit the certificate when the next tooth comes out, and see how they've grown." },
];

const faqs = [
  {
    question: "What is a first tooth tradition?",
    answer:
      "A first tooth tradition is a small ritual families create around a child's first lost tooth. Instead of focusing only on money under the pillow, it marks the milestone as meaningful. In the Wiggly Tooth Workshop tradition, the Tooth Fairy leaves a keepsake certificate that names a special quality she found growing inside the child - turning a routine moment into one worth remembering.",
  },
  {
    question: "What should I do when my child loses their first tooth?",
    answer:
      "Place the tooth under the pillow as usual, and before bed, talk together about something your child has been growing lately - a moment of kindness, bravery, or patience. In the morning, the Tooth Fairy's thank-you and her certificate are waiting. The certificate becomes a keepsake of the tooth and the child they were when they lost it.",
  },
  {
    question: "What is a printable Tooth Fairy certificate?",
    answer:
      "It's a free printable certificate designed to look like something the Tooth Fairy left behind after visiting - proof that she came, a thank-you for the tooth, and a keepsake of your child's first lost tooth. You can download it as a PDF or JPG, print it at home, and keep it forever.",
  },
  {
    question: "What should the Tooth Fairy write on a certificate?",
    answer:
      "Keep it simple and personal. Name one quality you've noticed growing in your child - kindness, bravery, creativity, curiosity - and add a short line about a real moment you saw it. A few words written in the Tooth Fairy's voice matter far more than anything elaborate. There are ready-to-use examples on this page.",
  },
  {
    question: "Why does the Tooth Fairy take teeth?",
    answer:
      "Not because the teeth themselves are valuable, but because of what's inside them. Every tooth quietly holds a quality the child grew while it was theirs. The Tooth Fairy collects those qualities and uses them to gently help the world. You can read more on our page about why the Tooth Fairy takes teeth.",
  },
  {
    question: "Why does the Tooth Fairy leave money?",
    answer:
      "The money isn't a payment for the tooth. It's a thank-you - a quiet way of saying the tooth mattered and the quality inside it is now off helping someone, somewhere. The gift is the gesture, not the price.",
  },
  {
    question: "Should I save my child's first tooth?",
    answer:
      "Many families do, and the certificate gives the tooth a story to live alongside. Whether you keep the tooth itself or just the keepsake, what you're really saving is a record of who your child was at that moment - and that's the part worth holding onto.",
  },
  {
    question: "What if my child asks whether the Tooth Fairy is real?",
    answer:
      "Only you know the right moment and words for your child. Many parents find this tradition gives them a gentle way in - a chance to talk about growing up, about wonder, and about the real qualities children carry, whatever they come to believe about the fairy herself. If it helps, our page 'Is the Tooth Fairy real?' explores that question with care.",
  },
];

const FirstToothTradition = () => {
  return (
    <div className="min-h-screen bg-background">
      <PageSeo
        title="First Tooth Tradition & Certificate | Wiggly Tooth Workshop"
        description="Create a warm, magical first tooth tradition with a free printable Tooth Fairy certificate that celebrates the special quality your child has been growing."
        canonical={PAGE_URL}
        image={CERT_ABS}
        jsonLd={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Wiggly Tooth Workshop", item: SITE_URL },
                { "@type": "ListItem", position: 2, name: "First Tooth Tradition", item: PAGE_URL },
              ],
            },
            {
              "@type": "ImageObject",
              contentUrl: CERT_ABS,
              url: CERT_ABS,
              name: "Printable Tooth Fairy Certificate - My First Tooth Keepsake",
              description: CERT_ALT,
              creditText: "Wiggly Tooth Workshop",
              creator: { "@type": "Organization", name: "Wiggly Tooth Workshop", url: SITE_URL },
              copyrightNotice: "© 2026 Wiggly Tooth Workshop. Illustrations by Peter H. Reynolds.",
              license: PAGE_URL,
              acquireLicensePage: "https://wigglytoothworkshop.com/terms",
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

          <div className="container px-6 relative z-10 max-w-5xl mx-auto">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-starlight/70 hover:text-starlight/80 transition-colors text-sm mb-10"
            >
              <ArrowLeft className="w-4 h-4" />
              Wiggly Tooth Workshop
            </Link>

            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div className="order-2 md:order-1">
                <p className="text-xs font-semibold uppercase tracking-widest text-primary/80 mb-5">
                  A First Tooth Tradition
                </p>
                <h1 className="font-display text-4xl md:text-5xl font-bold text-starlight leading-tight mb-6">
                  A First Tooth Tradition That Makes the Tooth Fairy Feel Real
                </h1>
                <p className="text-starlight/75 text-lg leading-relaxed mb-8">
                  Losing a first tooth is a small but powerful milestone - one of
                  the first times a child notices they're growing up. This is a
                  gentle way to make the moment about more than money under the
                  pillow: a certificate the Tooth Fairy leaves behind, showing she
                  visited and found something special inside.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button variant="hero" size="lg" asChild>
                    <a href={CERT_PDF} download onClick={() => trackEvent("certificate_download", { format: "pdf", location: "hero" })}>
                      <Download className="w-5 h-5" />
                      Download the Free Tooth Fairy Certificate
                    </a>
                  </Button>
                </div>
              </div>

              <figure className="order-1 md:order-2">
                <a href={CERT_JPG} target="_blank" rel="noopener noreferrer" aria-label="View the printable Tooth Fairy certificate full size">
                  <img
                    src={certificate}
                    alt={CERT_ALT}
                    width={1103}
                    height={1426}
                    className="w-full max-w-sm mx-auto rounded-2xl shadow-magical border border-starlight/20 hover:-translate-y-0.5 transition-transform"
                  />
                </a>
              </figure>
            </div>
          </div>
        </section>

        {/* What makes a first tooth special */}
        <section className="py-16 md:py-20 bg-background">
          <div className="container px-6 max-w-2xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
              What Makes a First Tooth Special?
            </h2>
            <div className="space-y-4 text-foreground/80 text-lg leading-relaxed">
              <p>
                A first lost tooth arrives with a whole tangle of feelings -
                excitement, a few nervous questions, a little pride, and a good
                deal of wonder. It wobbles for days. Then suddenly it's gone, and
                there's a brand-new gap where it used to be.
              </p>
              <p>
                Often it's the first time a child asks the bigger questions out
                loud. Why does the Tooth Fairy want my tooth? What does she do
                with it? That curiosity is an opening - a chance to turn the
                moment into a quiet conversation about growing up.
              </p>
              <p>
                Because a tooth can stand for something. In this story, every
                tooth holds a little of what the child has been growing inside -
                their kindness, their bravery, their patience. The first one most
                of all.
              </p>
            </div>
          </div>
        </section>

        {/* The tradition, step by step */}
        <section className="py-16 md:py-20 bg-secondary/30">
          <div className="container px-6 max-w-2xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-8 leading-tight">
              A New First Tooth Tradition
            </h2>
            <ol className="space-y-5">
              {steps.map((step, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-9 h-9 rounded-full bg-primary/15 text-primary font-display font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <p className="text-foreground/85 text-lg leading-relaxed pt-1">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* The certificate */}
        <section id="certificate" className="py-16 md:py-24 bg-background scroll-mt-20">
          <div className="container px-6 max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <figure className="order-1">
                <a href={CERT_JPG} target="_blank" rel="noopener noreferrer" aria-label="View the printable Tooth Fairy certificate full size">
                  <img
                    src={certificate}
                    alt={CERT_ALT}
                    width={1103}
                    height={1426}
                    loading="lazy"
                    className="w-full max-w-sm mx-auto rounded-2xl shadow-magical border border-border hover:-translate-y-0.5 transition-transform"
                  />
                </a>
              </figure>
              <div className="order-2">
                <span className="inline-block text-xs font-semibold uppercase tracking-wide text-primary bg-primary/10 px-3 py-1 rounded-full mb-4">
                  Free Printable
                </span>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-5 leading-tight">
                  The Free Printable Tooth Fairy Certificate
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                  This certificate is designed to look like something the Tooth
                  Fairy left behind after her visit. It's proof that she came, a
                  thank-you for the tooth, and a keepsake of your child's first
                  lost tooth - a reminder that the qualities they're growing
                  really do matter.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-7">
                  Print it at home in PDF or JPG. It's free, with no sign-up
                  required.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button variant="hero" size="lg" asChild>
                    <a href={CERT_PDF} download onClick={() => trackEvent("certificate_download", { format: "pdf", location: "main" })}>
                      <FileText className="w-5 h-5" />
                      Download the Printable Certificate
                    </a>
                  </Button>
                  <Button variant="workshop" size="lg" asChild>
                    <a href={CERT_JPG} download onClick={() => trackEvent("certificate_download", { format: "jpg", location: "main" })}>
                      <ImageIcon className="w-5 h-5" />
                      Download JPG
                    </a>
                  </Button>
                </div>
                <div className="mt-4">
                  <a
                    href={YOUTUBE_VIDEO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent("social_click", { platform: "youtube", location: "first_tooth_certificate" })}
                    className="text-sm font-medium text-primary hover:text-primary/80 underline underline-offset-4"
                  >
                    Or watch the short film →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What should the Tooth Fairy write */}
        <section className="py-16 md:py-20 bg-secondary/30">
          <div className="container px-6 max-w-2xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
              What Should the Tooth Fairy Write?
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              A few words in the Tooth Fairy's voice are all it takes. Here are
              lines you're welcome to borrow for the certificate's fields - the
              quality she noticed, what the tooth will help with, and a short note
              just for them.
            </p>
            <ul className="space-y-3">
              {samplePhrases.map((phrase, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 p-4 rounded-xl bg-background border border-border text-foreground/85 leading-relaxed"
                >
                  <Sparkles className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                  <span>{phrase}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Watch the story */}
        <section className="py-16 md:py-20 bg-background">
          <div className="container px-6 max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
                Watch the Story Behind the Tradition
              </h2>
              <p className="text-muted-foreground leading-relaxed max-w-xl mx-auto">
                Sooner or later, most children ask: why does the Tooth Fairy take
                teeth? What does she do with them? Why does she leave money? The
                short film gives them a magical answer - their teeth hold special
                qualities, and the Tooth Fairy uses those qualities to quietly
                help make the world a little better.
              </p>
            </div>

            <LiteYouTube
              title="The Tooth Fairy's Secret Workshop — Short Film by Wiggly Tooth Workshop"
              onActivate={() => trackEvent("video_play", { location: "first_tooth" })}
              className="mb-6"
            />
            <p className="text-center text-muted-foreground">
              Watch{" "}
              <a
                href={YOUTUBE_VIDEO_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("social_click", { platform: "youtube", location: "first_tooth_watch" })}
                className="font-medium text-primary hover:text-primary/80 underline underline-offset-4"
              >
                The Tooth Fairy's Secret Workshop
              </a>{" "}
              with your child.
            </p>
          </div>
        </section>

        {/* More ideas */}
        <section className="py-16 md:py-20 bg-secondary/30">
          <div className="container px-6 max-w-3xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-8 leading-tight text-center">
              More First Tooth Ideas
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {moreIdeas.map((idea, i) => (
                <div key={i} className="flex items-start gap-3 magical-card">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <idea.icon className="w-4 h-4 text-primary" />
                  </div>
                  <p className="text-foreground/85 text-sm leading-relaxed pt-1.5">{idea.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why it works */}
        <section className="py-16 md:py-20 bg-background">
          <div className="container px-6 max-w-2xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
              Why This Tradition Works
            </h2>
            <ul className="space-y-4">
              {[
                "It gives children a story for why their tooth matters - not just a transaction.",
                "It makes the Tooth Fairy feel meaningful instead of merely magical.",
                "It shifts the focus away from money and toward something lasting.",
                "It gives parents language for talking about growth, character, and wonder.",
                "It leaves behind a keepsake genuinely worth saving.",
              ].map((point, i) => (
                <li key={i} className="flex items-start gap-3 text-foreground/85 text-lg leading-relaxed">
                  <Heart className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 md:py-20 bg-secondary/30">
          <div className="container px-6 max-w-2xl mx-auto">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
              First Tooth &amp; Tooth Fairy Questions
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

        {/* Internal links */}
        <section className="py-16 md:py-20 bg-background">
          <div className="container px-6 max-w-3xl mx-auto">
            <h2 className="font-display text-xl font-bold text-foreground mb-6 text-center">
              Keep exploring the Workshop
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { to: "/is-the-tooth-fairy-real", label: "Is the Tooth Fairy real?", desc: "A thoughtful answer for when the question comes." },
                { to: "/why-does-the-tooth-fairy-take-teeth", label: "Why does the Tooth Fairy take teeth?", desc: "The reason behind the tradition." },
                { to: "/what-does-the-tooth-fairy-do-with-teeth", label: "What does she do with the teeth?", desc: "Inside the Tooth Fairy's workshop." },
                { to: "/why-does-the-tooth-fairy-leave-money", label: "Why the Tooth Fairy leaves money", desc: "What the gift really means." },
                { to: "/tooth-fairy-letter", label: "Tooth Fairy letter template", desc: "A free printable letter to go with the certificate." },
                { to: "/coloring-page", label: "Free coloring page", desc: "A printable scene to color and keep." },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="magical-card group hover:shadow-magical transition-all duration-300 hover:-translate-y-0.5"
                >
                  <p className="font-display font-semibold text-foreground group-hover:text-primary transition-colors mb-1 flex items-center gap-1.5">
                    {link.label}
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                  </p>
                  <p className="text-sm text-muted-foreground">{link.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Join the Workshop */}
        <section className="py-16 bg-secondary/30">
          <div className="container px-6 max-w-xl mx-auto text-center">
            <div className="magical-card">
              <Sparkles className="w-6 h-6 text-primary mx-auto mb-3" />
              <h2 className="font-display text-xl font-semibold text-foreground mb-2">
                Join the Workshop
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                New printables, keepsakes, and stories from the world of the Tooth
                Fairy - added quietly as they're made.
              </p>
              <Button variant="magical" size="sm" asChild>
                <a href="/#signup">
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

export default FirstToothTradition;
