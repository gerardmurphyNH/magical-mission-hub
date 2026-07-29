import { Link } from "react-router-dom";
import { Sparkles, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import PageSeo from "@/components/PageSeo";
import LiteYouTube from "@/components/LiteYouTube";
import { YOUTUBE_CHANNEL_URL, YOUTUBE_VIDEO_URL } from "@/lib/config";
import { trackCTAClick, trackEvent } from "@/lib/analytics";

const SITE_URL = "https://wigglytoothworkshop.com/";
const SHORT_VIDEO_ID = "EKcMHucpQcU";

const faqs = [
  {
    question: "What does the Tooth Fairy do with the teeth she collects?",
    answer:
      "She draws out the quality that grew inside each tooth - courage, kindness, creativity, patience - and weaves it back into the world in small, quiet ways. The tooth is just the container; the quality is what she's really after.",
  },
  {
    question: "What happens to baby teeth after the Tooth Fairy takes them?",
    answer:
      "Each baby tooth is carried back to her workshop, where its quality is gently drawn out, logged, and catalogued by virtue and by year. Particularly rare teeth are kept in the archive; the rest are returned to the earth once their quality has been used. Nothing is wasted.",
  },
  {
    question: "Why does the Tooth Fairy keep and catalogue the teeth?",
    answer:
      "Because every tooth holds a record of a real moment a child grew through. Sorting them by virtue lets her find exactly the right quality when some corner of the world is running low on it.",
  },
  {
    question: "Why does she leave money behind?",
    answer:
      "The coin or bill is a thank-you and an acknowledgment - the work you did while growing that tooth was real, it mattered, and it's going to help somebody.",
  },
];

const FilmCTA = () => (
  <div className="my-8 p-6 rounded-2xl bg-secondary/50 border border-border text-center">
    <Sparkles className="w-6 h-6 text-primary mx-auto mb-3" />
    <p className="font-display font-semibold text-foreground mb-2">
      Want to see this idea come to life?
    </p>
    <p className="text-muted-foreground text-sm mb-4">
      Watch <em>The Tooth Fairy's Secret Workshop</em> — the short film that answers this very question.
    </p>
    <div className="flex flex-col sm:flex-row gap-3 justify-center">
      <Button variant="magical" size="sm" asChild>
        <a href={YOUTUBE_CHANNEL_URL} target="_blank" rel="noopener noreferrer">
          Watch the Short Film
        </a>
      </Button>
      <Button variant="workshop" size="sm" asChild>
        <a href="/#signup" onClick={() => trackCTAClick("seo_page_what_tf_does")}>
          Join the Workshop
        </a>
      </Button>
    </div>
  </div>
);

const WhatDoesTheToothFairyDo = () => {
  return (
    <div className="min-h-screen bg-background">
      <PageSeo
        title="What Does the Tooth Fairy Do With Teeth? Where Baby Teeth Go | Wiggly Tooth Workshop"
        description="What does the Tooth Fairy do with teeth? Find out what really happens to baby teeth after she collects them, and the quiet reason she gathers every single one."
        canonical="https://wigglytoothworkshop.com/what-does-the-tooth-fairy-do-with-teeth"
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
                  name: "What Does the Tooth Fairy Do With Teeth?",
                  item: "https://wigglytoothworkshop.com/what-does-the-tooth-fairy-do-with-teeth",
                },
              ],
            },
            {
              "@type": "Article",
              headline: "What Does the Tooth Fairy Do With Teeth?",
              description:
                "Inside the Tooth Fairy's workshop: how baby teeth are collected, the qualities inside them drawn out, and what happens to the teeth afterward.",
              mainEntityOfPage:
                "https://wigglytoothworkshop.com/what-does-the-tooth-fairy-do-with-teeth",
              publisher: {
                "@type": "Organization",
                name: "Wiggly Tooth Workshop",
                url: "https://wigglytoothworkshop.com/",
              },
            },
            {
              // A short (not the main film) whose entire content is this page's
              // exact question - a clean 1:1 watch-page pairing, unlike the main
              // film which intentionally has VideoObject only on /watch.
              "@type": "VideoObject",
              name: "What Does the Tooth Fairy Actually Do With the Teeth?",
              description:
                "A short answer: she draws out the quality that grew inside each tooth - courage, kindness, creativity, patience - and weaves it back into the world.",
              thumbnailUrl: [`https://i.ytimg.com/vi/${SHORT_VIDEO_ID}/maxresdefault.jpg`],
              uploadDate: "2026-07-01",
              contentUrl: `https://youtube.com/shorts/${SHORT_VIDEO_ID}`,
              embedUrl: `https://www.youtube.com/embed/${SHORT_VIDEO_ID}`,
              publisher: { "@type": "Organization", name: "Wiggly Tooth Workshop", url: SITE_URL },
            },
            {
              "@type": "FAQPage",
              mainEntity: faqs.map((faq) => ({
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
          What Does the Tooth Fairy Do With Teeth?
        </h1>

        <p className="text-muted-foreground text-lg leading-relaxed mb-6">
          Every tooth a child loses holds something the Tooth Fairy needs — and what
          she does with it is more meaningful than most people realize.
        </p>

        <div className="my-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary mb-3 text-center">
            Watch: What Does the Tooth Fairy Actually Do With the Teeth?
          </p>
          <LiteYouTube
            videoId={SHORT_VIDEO_ID}
            title="What Does the Tooth Fairy Actually Do With the Teeth? - Wiggly Tooth Workshop"
            onActivate={() => trackEvent("video_play", { location: "what_does_tf_do_short", video_id: SHORT_VIDEO_ID })}
          />
          <p className="text-sm text-muted-foreground text-center mt-3">
            Want the full story?{" "}
            <a
              href={YOUTUBE_VIDEO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
              onClick={() => trackEvent("social_click", { platform: "youtube", location: "what_does_tf_do" })}
            >
              Watch the short film
            </a>
          </p>
        </div>

        <div className="space-y-6">
          <h2 className="font-display text-2xl font-bold text-foreground">
            The tooth is just the container
          </h2>
          <p className="text-foreground leading-relaxed">
            What the Tooth Fairy is really collecting isn't calcium and enamel. It's
            the invisible thing that grew inside the tooth while it was yours: courage,
            kindness, creativity, patience, or wonder.
          </p>
          <p className="text-foreground leading-relaxed">
            A tooth that fell out after a child faced something scary holds bravery. A
            tooth that came loose while a child was learning to be gentle holds kindness.
            These qualities don't disappear when the tooth does — they get extracted,
            catalogued, and put to work.
          </p>

          <h2 className="font-display text-2xl font-bold text-foreground">
            The workshop
          </h2>
          <p className="text-foreground leading-relaxed">
            The Tooth Fairy's workshop looks a bit like a library, if libraries
            sparkled. Millions of teeth, sorted by virtue, organized by year, catalogued
            by country. The Tooth Fairy and her small team process each tooth carefully —
            extracting its virtue, logging it, and preparing it for use.
          </p>
          <p className="text-foreground leading-relaxed">
            The virtues extracted from children's teeth are then woven back into the
            world in ways that are hard to see but easy to feel. The stranger who held a
            door open when you really needed it. The child who shared when it cost them
            something. The courage that appeared, unexpectedly, when someone needed to
            be brave.
          </p>

          <h2 className="font-display text-2xl font-bold text-foreground">
            Why she leaves something behind
          </h2>
          <p className="text-foreground leading-relaxed">
            The coin (or bill, depending on the Tooth Fairy's current exchange rate) is
            a thank-you. You're giving something that took real time and real growth to
            produce. A small piece of yourself. The Tooth Fairy doesn't take that lightly.
          </p>
          <p className="text-foreground leading-relaxed">
            The payment is also an acknowledgment: the work you did while growing that
            tooth was real, it mattered, and it's going to help somebody.
          </p>

          <h2 className="font-display text-2xl font-bold text-foreground">
            What happens to the tooth after
          </h2>
          <p className="text-foreground leading-relaxed">
            Some teeth are kept. Particularly special ones — teeth that held a very
            rare or very concentrated virtue — are preserved in the archive. Most teeth
            are returned to the earth eventually, once their virtue has been extracted.
            Nothing is wasted.
          </p>

          <h2 className="font-display text-2xl font-bold text-foreground">
            What happens to baby teeth?
          </h2>
          <p className="text-foreground leading-relaxed">
            Once a baby tooth leaves the pillow, the Tooth Fairy carries it back to her
            workshop. There, she gently draws out the quality that grew inside it while
            it was yours — the bravery, the kindness, the patience — and that quality is
            what goes to work in the world. The tooth itself was only ever holding it
            safe.
          </p>
          <p className="text-foreground leading-relaxed">
            The tooth is then carefully kept. Each one is logged and catalogued by
            virtue, by year, and by the child it came from, so the workshop always knows
            exactly what it has and where it came from. Baby teeth aren't tossed aside;
            they're treated like what they are — small records of a child growing up.
          </p>
          <p className="text-foreground leading-relaxed">
            The rarest teeth stay in the archive for good. The rest rest quietly until
            their quality has been fully used, and then they're returned, softly, to the
            earth. So the honest answer to "what happens to baby teeth" is this: the
            quality inside them is set loose to help someone, and the teeth themselves
            are looked after with more care than most people would guess.
          </p>
        </div>

        <FilmCTA />

        <div className="mt-10 pt-8 border-t border-border">
          <h3 className="font-display text-lg font-semibold text-foreground mb-4">
            More questions from curious kids
          </h3>
          <ul className="space-y-2">
            <li>
              <Link to="/is-the-tooth-fairy-real" className="text-sm text-primary hover:underline">
                Is the Tooth Fairy real? →
              </Link>
            </li>
            <li>
              <Link to="/why-does-the-tooth-fairy-leave-money" className="text-sm text-primary hover:underline">
                Why does the Tooth Fairy leave money? →
              </Link>
            </li>
            <li>
              <Link to="/how-much-does-the-tooth-fairy-leave" className="text-sm text-primary hover:underline">
                How much does the Tooth Fairy leave? →
              </Link>
            </li>
            <li>
              <Link to="/watch" className="text-sm text-primary hover:underline">
                Watch the short film →
              </Link>
            </li>
            <li>
              <Link to="/printables" className="text-sm text-primary hover:underline">
                Free Tooth Fairy printables →
              </Link>
            </li>
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default WhatDoesTheToothFairyDo;
