import { Link } from "react-router-dom";
import { Sparkles, ArrowLeft } from "lucide-react";
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
import { trackCTAClick, trackEvent } from "@/lib/analytics";
import LiteYouTube from "@/components/LiteYouTube";

const PAGE_URL = "https://wigglytoothworkshop.com/why-does-the-tooth-fairy-leave-money";
const SITE_URL = "https://wigglytoothworkshop.com/";
const MACHINE_IMG_ABS = "https://wigglytoothworkshop.com/images/tooth-fairy-quality-machine.jpg";
const MACHINE_IMG_ALT =
  "The Tooth Fairy's quality-extraction machine, drawing creativity from a collected tooth and turning it into money to leave behind, from The Tooth Fairy's Secret Workshop";
const SHORT_VIDEO_ID = "7GeEfKaACQg";

const faqs = [
  {
    question: "Why does the Tooth Fairy leave money?",
    answer:
      "The money isn't a payment for the tooth. It's a thank-you. The Tooth Fairy leaves something behind to acknowledge that the tooth mattered - that the quality the child grew inside it was real, and that it's now off helping the world somewhere. The gift is the gesture, not the price.",
  },
  {
    question: "Is the money a payment for the tooth?",
    answer:
      "No. A payment would mean the tooth was bought and sold. That's not what's happening. The Tooth Fairy isn't buying anything - she's saying thank you for something a child gave freely, and acknowledging the courage, kindness, or patience that grew inside it.",
  },
  {
    question: "How much does the Tooth Fairy usually leave?",
    answer:
      "Most families land somewhere between a few coins and a few dollars, with first teeth often getting a little extra. The exact amount matters far less than the gesture. You can read more on our page about how much the Tooth Fairy leaves.",
  },
  {
    question: "Why does the Tooth Fairy sometimes leave coins instead of bills?",
    answer:
      "Coins often feel more magical to a young child - they have weight, they catch the light, they jingle. A single special coin left with care can mean more than a larger bill left in silence. The Tooth Fairy tends to choose what feels meaningful over what's worth most.",
  },
  {
    question: "Does the Tooth Fairy always leave money?",
    answer:
      "Not always, and it doesn't have to be money at all. A small note, a tiny token, or a keepsake can carry the same thank-you. What matters is that something is left behind to mark that the visit happened and the tooth was received with care.",
  },
  {
    question: "What does the Tooth Fairy do with the quality once she has it?",
    answer:
      "She passes it forward. In The Tooth Fairy's Secret Workshop, every collected tooth gives up its quality in her workshop, and she quietly puts it back into the world - a spark of courage here, a moment of kindness there. The money left behind isn't the end of the exchange; it's the receipt for a good deed already set in motion.",
  },
];

const WhyDoesTheToothFairyLeaveMoney = () => {
  return (
    <div className="min-h-screen bg-background">
      <PageSeo
        title="Why Does the Tooth Fairy Leave Money? | Wiggly Tooth Workshop"
        description="Why does the Tooth Fairy leave money? It isn't payment for the tooth - it's a thank-you for what your child grew inside it. Discover what the gift really means."
        canonical={PAGE_URL}
        image={MACHINE_IMG_ABS}
        jsonLd={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Wiggly Tooth Workshop", item: SITE_URL },
                { "@type": "ListItem", position: 2, name: "Why Does the Tooth Fairy Leave Money?", item: PAGE_URL },
              ],
            },
            {
              "@type": "Article",
              headline: "Why Does the Tooth Fairy Leave Money?",
              description:
                "The money the Tooth Fairy leaves isn't a payment - it's a thank-you for the quality a child grew inside their tooth.",
              url: PAGE_URL,
              mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL },
              publisher: { "@type": "Organization", name: "Wiggly Tooth Workshop", url: SITE_URL },
              author: { "@type": "Organization", name: "Wiggly Tooth Workshop", url: SITE_URL },
            },
            {
              "@type": "ImageObject",
              contentUrl: MACHINE_IMG_ABS,
              url: MACHINE_IMG_ABS,
              description: MACHINE_IMG_ALT,
              creditText: "Wiggly Tooth Workshop",
              creator: { "@type": "Organization", name: "Wiggly Tooth Workshop", url: SITE_URL },
              copyrightNotice: "© 2026 Wiggly Tooth Workshop. Illustrations by Peter H. Reynolds.",
              license: PAGE_URL,
              acquireLicensePage: "https://wigglytoothworkshop.com/terms",
            },
            // No VideoObject here for the embedded short — GSC flagged the same
            // pattern on the do-with-teeth page as "video isn't on a watch page"
            // (2026-07-31). This is a text-first article page, not a video-first
            // watch page like /watch, so removing the schema claim proactively
            // rather than waiting for the identical flag here. The embed itself
            // stays (good for engagement); only the schema claim is removed.
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
      <main className="container px-6 py-16 max-w-2xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Wiggly Tooth Workshop
        </Link>

        <span className="inline-block text-xs font-semibold uppercase tracking-wide text-primary bg-primary/10 px-3 py-1 rounded-full mb-5">
          The Big Question
        </span>

        <h1 className="font-display text-4xl font-bold text-foreground mb-6 leading-tight">
          Why Does the Tooth Fairy Leave Money?
        </h1>

        <p className="text-muted-foreground text-lg leading-relaxed mb-8">
          It's the question every child eventually asks, usually right after the
          first coin appears. The answer is gentler than you might expect.
        </p>

        {/* Direct answer */}
        <div className="mb-10 p-6 rounded-2xl bg-secondary/40 border border-border">
          <p className="text-foreground text-lg leading-relaxed">
            <span className="font-display font-bold">The short answer:</span> the
            money isn't a payment for the tooth. It's a thank-you - a quiet way of
            saying the tooth mattered, and that the quality the child grew inside
            it is now off helping the world.
          </p>
        </div>

        <div className="space-y-6">
          <h2 className="font-display text-2xl font-bold text-foreground">
            A thank-you, not a payment
          </h2>
          <p className="text-foreground leading-relaxed">
            A payment would mean the tooth was bought - traded for cash like
            anything else. That's not what's happening here. When a child loses a
            tooth, they're giving up something that quietly held a piece of who
            they're becoming: their bravery, their kindness, their patience. The
            Tooth Fairy doesn't buy that. She receives it, with care, and leaves
            something behind to say thank you.
          </p>

          <h2 className="font-display text-2xl font-bold text-foreground">
            Why something is always left behind
          </h2>
          <p className="text-foreground leading-relaxed">
            The gift is really an acknowledgment. It says: I was here, your tooth
            was received, and the work you did growing that quality was real and
            worth something. For a child, finding a coin where a tooth used to be
            is proof that the exchange meant something to someone else, too.
          </p>
          <p className="text-foreground leading-relaxed">
            That's why what's left behind matters more than how much. A coin
            chosen with care, a tiny note, a small keepsake - any of these can
            carry the same thank-you.
          </p>

          <figure className="my-8">
            <img
              src="/images/tooth-fairy-quality-machine.jpg"
              alt={MACHINE_IMG_ALT}
              width={1200}
              height={636}
              loading="lazy"
              className="w-full h-auto rounded-2xl shadow-card"
            />
            <figcaption className="text-sm text-muted-foreground mt-2 text-center">
              In the film, this is what the exchange actually looks like - the
              quality drawn from the tooth, the money left in its place.
            </figcaption>
          </figure>

          <h2 className="font-display text-2xl font-bold text-foreground">
            Keeping the good going
          </h2>
          <p className="text-foreground leading-relaxed">
            The coin isn't the end of the story - it's the start of the next
            one. Once the Tooth Fairy has the quality a tooth carried, she
            doesn't keep it. She passes it forward, quietly, to wherever it's
            needed. In <em>The Tooth Fairy's Secret Workshop</em>, Arlo puts it
            simply once he understands what's really happening: "let's see
            what good this can do."
          </p>
          <p className="text-foreground leading-relaxed">
            That's the idea worth passing on to your own child. The coin under
            the pillow isn't a transaction that's finished - it's a nudge to
            keep the good going. The bravery, kindness, or creativity that grew
            inside their tooth doesn't disappear with it. It's already off
            helping someone, somewhere.
          </p>

          <div className="my-8">
            <p className="text-sm font-semibold uppercase tracking-wide text-primary mb-3 text-center">
              Watch: Why Does the Tooth Fairy Leave Money?
            </p>
            <LiteYouTube
              videoId={SHORT_VIDEO_ID}
              title="Why Does the Tooth Fairy Leave Money? - Wiggly Tooth Workshop"
              onActivate={() => trackEvent("video_play", { location: "why_leave_money_short", video_id: SHORT_VIDEO_ID })}
            />
          </div>

          <h2 className="font-display text-2xl font-bold text-foreground">
            Coins, bills, and what actually lands
          </h2>
          <p className="text-foreground leading-relaxed">
            Coins often feel more magical to a young child than bills. They have
            weight and shine, they catch the light, and a single special coin can
            mean more than a larger amount left in silence. If you want the gift
            to feel like it came from the Tooth Fairy, lean into the small,
            thoughtful details rather than the dollar amount.
          </p>

          <h2 className="font-display text-2xl font-bold text-foreground">
            Beyond the money
          </h2>
          <p className="text-foreground leading-relaxed">
            Some families add a little more to the moment - a{" "}
            <Link to="/tooth-fairy-letter" className="text-primary hover:underline">
              printable letter from the Tooth Fairy
            </Link>{" "}
            naming the quality she noticed, or a{" "}
            <Link to="/first-tooth-tradition" className="text-primary hover:underline">
              first tooth keepsake certificate
            </Link>{" "}
            for the very first one. The money marks the visit; these turn it into
            something worth keeping.
          </p>
        </div>

        {/* Film CTA */}
        <div className="my-10 p-6 rounded-2xl bg-secondary/50 border border-border text-center">
          <Sparkles className="w-6 h-6 text-primary mx-auto mb-3" />
          <p className="font-display font-semibold text-foreground mb-2">
            See where the tooth really goes
          </p>
          <p className="text-muted-foreground text-sm mb-4">
            Watch <em>The Tooth Fairy's Secret Workshop</em> - a short film about
            what the Tooth Fairy does with the teeth she collects, and why she
            leaves something behind.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center flex-wrap">
            <Button variant="magical" size="sm" asChild>
              <a
                href={YOUTUBE_VIDEO_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("social_click", { platform: "youtube", location: "why_leave_money" })}
              >
                Watch the Short Film
              </a>
            </Button>
            <Button variant="hero" size="sm" asChild>
              <Link
                to="/letters-to-the-tooth-fairy"
                onClick={() => trackEvent("explore_click", { page: "/letters-to-the-tooth-fairy", source: "why_leave_money" })}
              >
                Write a Letter
              </Link>
            </Button>
            <Button variant="workshop" size="sm" asChild>
              <a href="/#signup" onClick={() => trackCTAClick("why_leave_money")}>
                Join the Workshop
              </a>
            </Button>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-12">
          <h2 className="font-display text-2xl font-bold text-foreground mb-6">
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

        {/* Related */}
        <div className="mt-12 pt-8 border-t border-border">
          <h3 className="font-display text-lg font-semibold text-foreground mb-4">
            More from the Workshop
          </h3>
          <ul className="space-y-2">
            <li>
              <Link to="/how-much-does-the-tooth-fairy-leave" className="text-sm text-primary hover:underline">
                How much does the Tooth Fairy leave? →
              </Link>
            </li>
            <li>
              <Link to="/what-does-the-tooth-fairy-do-with-teeth" className="text-sm text-primary hover:underline">
                Why does the Tooth Fairy take teeth? →
              </Link>
            </li>
            <li>
              <Link to="/what-does-the-tooth-fairy-do-with-teeth" className="text-sm text-primary hover:underline">
                What does the Tooth Fairy do with teeth? →
              </Link>
            </li>
            <li>
              <Link to="/is-the-tooth-fairy-real" className="text-sm text-primary hover:underline">
                Is the Tooth Fairy real? →
              </Link>
            </li>
            <li>
              <Link to="/letters-to-the-tooth-fairy" className="text-sm text-primary hover:underline">
                Write a letter to the Tooth Fairy →
              </Link>
            </li>
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default WhyDoesTheToothFairyLeaveMoney;
