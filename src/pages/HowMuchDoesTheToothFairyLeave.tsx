import { Link } from "react-router-dom";
import { Sparkles, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import PageSeo from "@/components/PageSeo";
import { YOUTUBE_CHANNEL_URL } from "@/lib/config";
import { trackCTAClick, trackEvent } from "@/lib/analytics";

const faqs = [
  {
    question: "How much does the Tooth Fairy usually leave per tooth?",
    answer:
      "Recent American surveys put the average somewhere between $3 and $6 per tooth, with first teeth often getting a premium. Some families give $10 or $20 for a first tooth; some give less. All of these are fine - consistency matters more than the exact amount.",
  },
  {
    question: "Should the first tooth get more than the rest?",
    answer:
      "Many parents give more for the first tooth - it's a milestone and it takes courage. In the Wiggly Tooth Workshop telling, first teeth hold the most concentrated quality, which is why the Tooth Fairy values them most highly.",
  },
  {
    question: "Why does the Tooth Fairy leave money?",
    answer:
      "The money isn't a payment for the tooth. It's a thank-you for the quality you grew inside it - your bravery, your kindness, your patience. It's the Tooth Fairy's way of saying the tooth mattered, the growing was real, and what was inside is now off to help someone.",
  },
  {
    question: "Does the amount really matter to children?",
    answer:
      "Less than you'd think. A small note, a few coins with some heft and jingle, or a tiny certificate often lands better than a larger bill left in silence. The ritual is what children remember.",
  },
];

const FilmCTA = () => (
  <div className="my-8 p-6 rounded-2xl bg-secondary/50 border border-border text-center">
    <Sparkles className="w-6 h-6 text-primary mx-auto mb-3" />
    <p className="font-display font-semibold text-foreground mb-2">
      Want to see this idea come to life?
    </p>
    <p className="text-muted-foreground text-sm mb-4">
      Watch <em>The Tooth Fairy's Secret Workshop</em> — a short film about what the Tooth Fairy
      really does with the teeth she collects.
    </p>
    <div className="flex flex-col sm:flex-row gap-3 justify-center flex-wrap">
      <Button variant="magical" size="sm" asChild>
        <a href={YOUTUBE_CHANNEL_URL} target="_blank" rel="noopener noreferrer">
          Watch the Short Film
        </a>
      </Button>
      <Button variant="hero" size="sm" asChild>
        <Link
          to="/letters-to-the-tooth-fairy"
          onClick={() => trackEvent("explore_click", { page: "/letters-to-the-tooth-fairy", source: "how_much_tf_leaves" })}
        >
          Write a Letter
        </Link>
      </Button>
      <Button variant="workshop" size="sm" asChild>
        <a href="/#signup" onClick={() => trackCTAClick("seo_page_how_much_tf_leaves")}>
          Join the Workshop
        </a>
      </Button>
    </div>
  </div>
);

const HowMuchDoesTheToothFairyLeave = () => {
  return (
    <div className="min-h-screen bg-background">
      <PageSeo
        title="How Much Does the Tooth Fairy Leave? | Wiggly Tooth Workshop"
        description="How much money does the Tooth Fairy leave? The going rate is about $3-$6 per tooth, often more for the first. See typical amounts by age and why she leaves money."
        canonical="https://wigglytoothworkshop.com/how-much-does-the-tooth-fairy-leave"
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
                  name: "How Much Does the Tooth Fairy Leave?",
                  item: "https://wigglytoothworkshop.com/how-much-does-the-tooth-fairy-leave",
                },
              ],
            },
            {
              "@type": "Article",
              headline: "How Much Does the Tooth Fairy Leave?",
              description:
                "Typical Tooth Fairy amounts per tooth, the first-tooth question, and why the Tooth Fairy leaves money at all.",
              mainEntityOfPage:
                "https://wigglytoothworkshop.com/how-much-does-the-tooth-fairy-leave",
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
          For Parents
        </span>

        <h1 className="font-display text-4xl font-bold text-foreground mb-6 leading-tight">
          How Much Does the Tooth Fairy Leave?
        </h1>

        <p className="text-muted-foreground text-lg leading-relaxed mb-6">
          There's no single right answer — the Tooth Fairy's exchange rate has never
          been officially standardized. But there are useful patterns, reasonable
          ranges, and a few things worth knowing before you set the amount.
        </p>

        <FilmCTA />

        <div className="space-y-6">
          <h2 className="font-display text-2xl font-bold text-foreground">
            What surveys say
          </h2>
          <p className="text-foreground leading-relaxed">
            In recent years, American surveys have put the average Tooth Fairy payment
            somewhere between $3 and $6 per tooth, with first teeth often getting a
            premium. Some families go higher — $10 or $20 for a first tooth is not
            unheard of. Some families are more modest. All of these are fine.
          </p>
          <p className="text-foreground leading-relaxed">
            The national average has generally trended upward over time, tracking
            roughly with inflation and with what other parents report to their children.
            Kids compare notes.
          </p>

          <h2 className="font-display text-2xl font-bold text-foreground">
            The "first tooth" question
          </h2>
          <p className="text-foreground leading-relaxed">
            Many parents give more for the first tooth — it's a milestone, it takes
            courage, and there's a symbolic weight to it. If you give $5 for the first
            tooth and $2 for subsequent ones, most children accept this graciously once
            it's explained that first teeth are particularly rare and special.
          </p>
          <p className="text-foreground leading-relaxed">
            The Wiggly Tooth Workshop version of this: first teeth hold the most
            concentrated virtue, which is why the Tooth Fairy values them most highly.
          </p>

          <h2 className="font-display text-2xl font-bold text-foreground">
            Practical considerations
          </h2>
          <p className="text-foreground leading-relaxed">
            Whatever you choose, consistency matters more than the specific amount.
            Children discuss. If the Tooth Fairy is giving $10 at a friend's house and
            $2 at yours, be prepared for a negotiation. Having a family rate you
            stick to is simpler than trying to explain fluctuating market conditions.
          </p>
          <p className="text-foreground leading-relaxed">
            Coins often land better with younger children than bills — the physical
            heft and jingle of coins feels more magical, even if the dollar amount is
            lower.
          </p>

          <h2 className="font-display text-2xl font-bold text-foreground">
            Beyond the money
          </h2>
          <p className="text-foreground leading-relaxed">
            Some families write a small note from the Tooth Fairy. Some leave glitter
            footprints. Some include a tiny certificate. None of these require large
            sums — a well-executed note often lands better than a $20 bill left in
            silence.
          </p>
          <p className="text-foreground leading-relaxed">
            If you're looking for something tangible, the ToothSafe from Wiggly Tooth
            Workshop is designed to make the whole ritual — the leaving, the waiting,
            the finding — feel special.
          </p>

          <h2 className="font-display text-2xl font-bold text-foreground">
            Why does the Tooth Fairy leave money?
          </h2>
          <p className="text-foreground leading-relaxed">
            The money isn't a payment, and the tooth isn't really being bought. What the
            Tooth Fairy is thanking you for is the quality you grew inside that tooth -
            the bravery, the kindness, the patience that gathered there while it was
            yours. The coin under the pillow is her way of saying that the tooth
            mattered.
          </p>
          <p className="text-foreground leading-relaxed">
            Think of it as a small token of exchange rather than a price. You gave her
            something that took years to grow, and she gives a little something back so
            the trade feels real on both sides. It's an acknowledgment: the growing was
            worth noticing, and what was inside is now off to help someone, somewhere.
          </p>
          <p className="text-foreground leading-relaxed">
            That's also why the exact amount matters less than the gesture. A few coins
            left with care says the same thing a larger bill does - I see what you grew,
            and the world needed it. The money is just how she leaves a thank-you a child
            can hold.
          </p>
          <p className="text-foreground leading-relaxed">
            It's also not the end of the story. Whatever quality the Tooth Fairy
            drew from the tooth doesn't stop with the coin - she passes it
            forward, quietly, to keep the good going. Read more about{" "}
            <Link to="/why-does-the-tooth-fairy-leave-money" className="text-primary hover:underline">
              what the money really means
            </Link>
            , or{" "}
            <Link to="/letters-to-the-tooth-fairy" className="text-primary hover:underline">
              write your own letter to the Tooth Fairy
            </Link>
            .
          </p>
        </div>

        <FilmCTA />

        <div className="mt-10 pt-8 border-t border-border">
          <h3 className="font-display text-lg font-semibold text-foreground mb-4">
            More from the Workshop
          </h3>
          <ul className="space-y-2">
            <li>
              <Link to="/why-does-the-tooth-fairy-leave-money" className="text-sm text-primary hover:underline">
                Why does the Tooth Fairy leave money? →
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
              <Link to="/printables" className="text-sm text-primary hover:underline">
                Free Tooth Fairy printables →
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

export default HowMuchDoesTheToothFairyLeave;
