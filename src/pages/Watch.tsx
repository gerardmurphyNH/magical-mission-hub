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
import { YOUTUBE_VIDEO_ID, YOUTUBE_VIDEO_URL } from "@/lib/config";
import { trackCTAClick, trackEvent } from "@/lib/analytics";

const PAGE_URL = "https://wigglytoothworkshop.com/watch";
const SITE_URL = "https://wigglytoothworkshop.com/";
const TOTAL_DURATION_SECONDS = 250; // 4:10

// Mirrors the YouTube chapter timestamps in the video description — keep the
// two in sync if chapters change. startOffset/endOffset are in seconds.
const CHAPTERS = [
  { name: "Arlo Loses a Tooth", start: 0 },
  { name: "Arlo's Letter to the Tooth Fairy", start: 16 },
  { name: "What Does the Tooth Fairy Look Like?", start: 37 },
  { name: "How Many Teeth Does She Collect in a Night?", start: 69 },
  { name: "Why Does the Tooth Fairy Collect Teeth?", start: 80 },
  { name: "What Does the Tooth Fairy Do With the Teeth?", start: 94 },
  { name: "Inside the Tooth Fairy's Workshop", start: 122 },
  { name: "Why Does the Tooth Fairy Leave Money?", start: 150 },
  { name: "The ToothSafe: A Treasure Chest for Teeth", start: 165 },
  { name: "Credits", start: 234 },
];

const faqs = [
  {
    question: "Is there a new Tooth Fairy movie?",
    answer:
      "Yes - The Tooth Fairy's Secret Workshop is a new animated short film about the Tooth Fairy, made in collaboration with Peter H. Reynolds and FableVision Studios. It's not the 2010 live-action comedy; it's an original animated story for kids and families, free to watch on YouTube.",
  },
  {
    question: "Where can I watch an animated Tooth Fairy film for kids?",
    answer:
      "You can watch The Tooth Fairy's Secret Workshop right here on this page or on YouTube, free. It's a short animated film (a few minutes long) made for children and families - a gentle, magical story about what the Tooth Fairy really does with the teeth she collects.",
  },
  {
    question: "How long is the film, and is it free?",
    answer:
      "It's a short film - a few minutes long - and completely free to watch, with no sign-up required. Press play above or open it on YouTube.",
  },
  {
    question: "What is The Tooth Fairy's Secret Workshop about?",
    answer:
      "A curious boy named Arlo sets out to discover what the Tooth Fairy actually does with lost teeth. He learns that every tooth holds a quality a child grew - courage, kindness, patience, creativity - and the Tooth Fairy uses those qualities to quietly help the world.",
  },
  {
    question: "Does the film show what the Tooth Fairy looks like?",
    answer:
      "Yes. The film shows her in full: CeCe, a small, winged tinkerer with a tool belt, at work in her cloud-top Workshop. If you've ever wondered what the Tooth Fairy looks like, this is the clearest answer we can give - watch her fly, collect a tooth, and get to work.",
  },
  {
    question: "Does this film answer whether the Tooth Fairy is real?",
    answer:
      "Yes - and the answer is yes. The film shows exactly what she does with every tooth she collects: drawing out the quality a child grew and quietly putting it back into the world. That's the honest case for her being real, told in a few minutes instead of a few paragraphs.",
  },
  {
    question: "Does the film explain why the Tooth Fairy takes teeth?",
    answer:
      "Yes. Watching Arlo's journey through the Workshop is the fastest way to understand why she collects teeth at all - not because they're valuable, but because of the courage, kindness, and creativity each one quietly holds.",
  },
  {
    question: "Does the film explain why the Tooth Fairy leaves money?",
    answer:
      "Yes - you see it happen. The Workshop machine draws the quality out of the collected tooth and turns it into the coin left behind, showing exactly why the money is a thank-you and not a payment.",
  },
  {
    question: "What is the Tooth Fairy's name in this film?",
    answer:
      "She's CeCe. The film follows her at work in the Workshop, and shows the small, winged, tool-belted Tooth Fairy behind the tradition many children only ever hear about.",
  },
  {
    question: "Is this a Tooth Fairy story, or just a movie about her?",
    answer:
      "It's the story itself - Arlo's letter, the night he meets CeCe, and what he learns in her Workshop. If you're looking for the Tooth Fairy's story told properly, this film (and our full written version) is it.",
  },
];

const Watch = () => {
  return (
    <div className="min-h-screen bg-background">
      <PageSeo
        title="Watch The Tooth Fairy's Secret Workshop - Animated Short Film | Wiggly Tooth Workshop"
        description="Watch The Tooth Fairy's Secret Workshop, a new animated tooth fairy short film for kids - free to watch. See what the Tooth Fairy really does with lost teeth."
        canonical={PAGE_URL}
        image={`https://i.ytimg.com/vi/${YOUTUBE_VIDEO_ID}/maxresdefault.jpg`}
        jsonLd={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Wiggly Tooth Workshop", item: SITE_URL },
                { "@type": "ListItem", position: 2, name: "Watch the Film", item: PAGE_URL },
              ],
            },
            {
              "@type": "Movie",
              "@id": `${PAGE_URL}#film`,
              name: "The Tooth Fairy's Secret Workshop",
              alternateName: "The Tooth Fairy's Magical Mission",
              description:
                "An animated short film about a curious boy named Arlo who sets out to discover what the Tooth Fairy really does with the teeth she collects - and learns that every lost tooth carries something worth keeping. Created in collaboration with Peter H. Reynolds and FableVision Studios.",
              image: `https://i.ytimg.com/vi/${YOUTUBE_VIDEO_ID}/maxresdefault.jpg`,
              url: PAGE_URL,
              datePublished: "2026-06-07",
              genre: ["Children's film", "Animation", "Fantasy"],
              inLanguage: "en",
              countryOfOrigin: { "@type": "Country", name: "United States" },
              author: { "@type": "Person", name: "Gerard Murphy" },
              creator: {
                "@type": "Person",
                name: "Peter H. Reynolds",
                sameAs: [
                  "https://www.wikidata.org/wiki/Q7174456",
                  "https://www.peterhreynolds.com/",
                ],
              },
              actor: [
                { "@type": "Person", name: "Andreas Branigan" },
                { "@type": "Person", name: "Danielle Famble" },
              ],
              productionCompany: {
                "@type": "Organization",
                name: "FableVision",
                url: "https://www.fablevisionstudios.com/",
                sameAs: "https://www.wikidata.org/wiki/Q5427921",
              },
              duration: "PT4M10S",
              publisher: { "@type": "Organization", name: "Wiggly Tooth Workshop", url: SITE_URL },
              // Entity anchors — ties the film to its authoritative external records
              sameAs: [
                "https://www.wikidata.org/wiki/Q140607725",
                "https://www.themoviedb.org/movie/1733539-the-tooth-fairy-s-secret-workshop",
                "https://www.imdb.com/title/tt43689600/",
                "https://www.fablevisionstudios.com/portfolio/the-tooth-fairys-secret-workshop",
              ],
            },
            {
              "@type": "VideoObject",
              name: "The Tooth Fairy's Secret Workshop",
              description:
                "An animated short film about a curious boy named Arlo who sets out to discover what the Tooth Fairy really does with the teeth she collects - and learns that every lost tooth carries something worth keeping. Created in collaboration with Peter H. Reynolds and FableVision Studios.",
              thumbnailUrl: [`https://i.ytimg.com/vi/${YOUTUBE_VIDEO_ID}/maxresdefault.jpg`],
              uploadDate: "2026-06-07",
              duration: "PT4M10S",
              contentUrl: YOUTUBE_VIDEO_URL,
              embedUrl: `https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}`,
              publisher: { "@type": "Organization", name: "Wiggly Tooth Workshop", url: SITE_URL },
              // The video records the same work as the Movie entity above
              mainEntity: { "@id": `${PAGE_URL}#film` },
              sameAs: [
                "https://www.wikidata.org/wiki/Q140607725",
                "https://www.themoviedb.org/movie/1733539-the-tooth-fairy-s-secret-workshop",
                "https://www.imdb.com/title/tt43689600/",
                "https://www.fablevisionstudios.com/portfolio/the-tooth-fairys-secret-workshop",
              ],
              // Mirrors the YouTube chapters — lets Google's Key Moments jump
              // straight to the segment that answers a given search.
              hasPart: CHAPTERS.map((chapter, i) => ({
                "@type": "Clip",
                name: chapter.name,
                startOffset: chapter.start,
                endOffset: CHAPTERS[i + 1]?.start ?? TOTAL_DURATION_SECONDS,
                url: `${YOUTUBE_VIDEO_URL}&t=${chapter.start}s`,
              })),
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
        {/* Video-first hero — the film is the primary content of this page */}
        <section className="night-sky-section py-12 md:py-16 relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 16 }, (_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-starlight rounded-full sparkle"
                style={{
                  left: `${(i * 17 + 7) % 100}%`,
                  top: `${(i * 23 + 11) % 90}%`,
                  animationDelay: `${(i * 0.13) % 2}s`,
                }}
              />
            ))}
          </div>

          <div className="container px-6 relative z-10 max-w-3xl mx-auto">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-starlight/70 hover:text-starlight/80 transition-colors text-sm mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Wiggly Tooth Workshop
            </Link>

            <h1 className="font-display text-3xl md:text-4xl font-bold text-starlight mb-3 text-center">
              Watch <span className="text-primary">The Tooth Fairy's Secret Workshop</span>
            </h1>
            <p className="text-starlight/70 text-center mb-8 max-w-xl mx-auto">
              A short animated film about what the Tooth Fairy really does with
              the teeth she collects. Free to watch.
            </p>

            {/* The video player */}
            <div
              className="relative w-full rounded-2xl overflow-hidden shadow-magical"
              style={{ paddingBottom: "56.25%" }}
            >
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_VIDEO_ID}?rel=0&modestbranding=1&iv_load_policy=3&color=white&origin=https://wigglytoothworkshop.com`}
                title="The Tooth Fairy's Secret Workshop — Short Film by Wiggly Tooth Workshop"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </section>

        {/* About the film */}
        <section className="py-14 md:py-20 bg-background">
          <div className="container px-6 max-w-2xl mx-auto">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">
              About the film
            </h2>
            <div className="space-y-4 text-foreground/80 text-lg leading-relaxed">
              <p>
                <em>The Tooth Fairy's Secret Workshop</em> follows Arlo, a curious
                boy who loses a tooth and asks the question many children wonder
                about: what does the Tooth Fairy actually do with my tooth - and
                why?
              </p>
              <p>
                The answer leads to a discovery. Every lost tooth quietly holds a
                quality the child grew while it was theirs - courage, kindness,
                patience, creativity - and the Tooth Fairy uses those qualities to
                help make the world a little better. The film was created in
                collaboration with Peter H. Reynolds and FableVision Studios.
              </p>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button variant="hero" size="lg" asChild>
                <a
                  href={YOUTUBE_VIDEO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("social_click", { platform: "youtube", location: "watch_page" })}
                >
                  <Sparkles className="w-5 h-5" />
                  Watch on YouTube
                </a>
              </Button>
              <Button variant="workshop" size="lg" asChild>
                <a href="/#signup" onClick={() => trackCTAClick("watch_page")}>
                  Join the Workshop
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-14 md:py-20 bg-secondary/30">
          <div className="container px-6 max-w-2xl mx-auto">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
              Questions about the film
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

        {/* Explore */}
        <section className="py-14 md:py-20 bg-background">
          <div className="container px-6 max-w-3xl mx-auto">
            <h2 className="font-display text-xl font-bold text-foreground mb-6 text-center">
              After you watch
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { to: "/is-the-tooth-fairy-real", label: "Is the Tooth Fairy real?", desc: "The question the film keeps answering." },
                { to: "/what-does-the-tooth-fairy-do-with-teeth", label: "What does she do with teeth?", desc: "Inside the Tooth Fairy's workshop." },
                { to: "/first-tooth-tradition", label: "Start a first tooth tradition", desc: "A free printable certificate to go with the film." },
                { to: "/tooth-fairy-letter", label: "Tooth Fairy letter template", desc: "A printable letter from the Tooth Fairy." },
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

export default Watch;
