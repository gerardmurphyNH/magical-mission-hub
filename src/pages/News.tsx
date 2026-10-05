import { Link } from "react-router-dom";
import { ArrowUpRight, Calendar, Film, BookOpen, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import PageSeo from "@/components/PageSeo";
import { YOUTUBE_VIDEO_URL } from "@/lib/config";
import { trackCTAClick } from "@/lib/analytics";

const REYNOLDS_URL = "https://www.reynoldstlc.org/blog/elevating-the-tooth-fairy-story-to-a-sense-of-mission";

const newsItems = [
  {
    id: "premiere",
    tag: "Event Recap",
    tagColor: "bg-primary/10 text-primary",
    icon: Calendar,
    date: "June 7, 2026",
    title: "Our World Premiere in Dedham",
    description:
      "Over 100 people joined the world premiere of The Tooth Fairy's Secret Workshop at TLC Studios in Dedham - with a live FaceTime visit from Peter H. Reynolds. See how it went.",
    cta: "Read the recap",
    href: "/tooth-fairy-film-premiere",
    internal: true,
    featured: true,
  },
  {
    id: "reynolds",
    tag: "Workshop Notes",
    tagColor: "bg-secondary text-foreground",
    icon: BookOpen,
    date: "2026",
    title: "Elevating the Tooth Fairy Story to a Sense of Mission",
    description:
      "The Reynolds Center shares the story behind The Tooth Fairy's Secret Workshop and how the project grew from one simple question: what does the Tooth Fairy actually do with the teeth?",
    cta: "Read the story",
    href: REYNOLDS_URL,
    internal: false,
    featured: false,
  },
  {
    id: "youtube",
    tag: "On YouTube",
    tagColor: "bg-secondary text-foreground",
    icon: Film,
    date: "2026",
    title: "The Short Film Arrives on YouTube",
    description:
      "Watch The Tooth Fairy's Secret Workshop and discover what the Tooth Fairy really does with children's lost teeth.",
    cta: "Watch the film",
    href: YOUTUBE_VIDEO_URL,
    internal: false,
    featured: false,
  },
];

const News = () => {
  return (
    <div className="min-h-screen bg-background">
      <PageSeo
        title="Wiggly Tooth Workshop News & Updates | Wiggly Tooth Workshop"
        description="The latest Wiggly Tooth Workshop news: the world premiere of The Tooth Fairy's Secret Workshop, behind-the-scenes stories, community events, and project updates."
        canonical="https://wigglytoothworkshop.com/news"
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
                  name: "News",
                  item: "https://wigglytoothworkshop.com/news",
                },
              ],
            },
            {
              "@type": "Article",
              datePublished: "2026-06-01",
              dateModified: "2026-07-10",
              headline: "News from the Workshop",
              description:
                "Updates, behind-the-scenes stories, and community events from the world of CeCe, Arlo, and the Wiggly Tooth Workshop.",
              about: "Wiggly Tooth Workshop news",
              author: { "@type": "Organization", name: "Wiggly Tooth Workshop" },
              publisher: {
                "@type": "Organization",
                name: "Wiggly Tooth Workshop",
                url: "https://wigglytoothworkshop.com/",
              },
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": "https://wigglytoothworkshop.com/news",
              },
            },
          ],
        }}
      />
      <NavBar />

      <main>
        {/* Page header */}
        <div className="bg-secondary/30 border-b border-border">
          <div className="container px-6 py-16 md:py-20 max-w-3xl mx-auto text-center">
            <span className="inline-block text-xs font-semibold uppercase tracking-wide text-primary bg-primary/10 px-3 py-1 rounded-full mb-5">
              Workshop Notes
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-5 leading-tight">
              News from the Workshop
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              A quiet corner for updates, behind-the-scenes stories, community
              events, and the latest news from the world of CeCe, Arlo, and the
              Wiggly Tooth Workshop.
            </p>
          </div>
        </div>

        {/* News cards */}
        <div className="container px-6 py-16 md:py-20 max-w-3xl mx-auto space-y-6">

          {newsItems.map((item) => (
            <article
              key={item.id}
              className={`rounded-2xl border overflow-hidden transition-shadow hover:shadow-magical ${
                item.featured
                  ? "bg-[hsl(244_45%_15%)] border-primary/30"
                  : "bg-card border-border"
              }`}
            >
              <div className="p-7 md:p-8">
                {/* Tag + date row */}
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className={`inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full ${item.tagColor}`}
                  >
                    <item.icon className="w-3 h-3" />
                    {item.tag}
                  </span>
                  <span
                    className={`text-xs ${
                      item.featured ? "text-starlight/70" : "text-muted-foreground"
                    }`}
                  >
                    {item.date}
                  </span>
                </div>

                <h2
                  className={`font-display text-2xl font-bold mb-3 leading-snug ${
                    item.featured ? "text-starlight" : "text-foreground"
                  }`}
                >
                  {item.title}
                </h2>

                <p
                  className={`text-base leading-relaxed mb-6 ${
                    item.featured ? "text-starlight/70" : "text-muted-foreground"
                  }`}
                >
                  {item.description}
                </p>

                {item.internal ? (
                  <Link
                    to={item.href}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors"
                  >
                    {item.cta}
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                ) : (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                  >
                    {item.cta}
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* Join the Workshop CTA */}
        <div className="container px-6 pb-20 max-w-3xl mx-auto">
          <div className="magical-card text-center">
            <Sparkles className="w-6 h-6 text-primary mx-auto mb-3" />
            <h2 className="font-display text-xl font-semibold text-foreground mb-2">
              Follow the story as it grows
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-5 max-w-md mx-auto">
              Join the Workshop for new CeCe and Arlo adventures, free
              printables, classroom resources, and early updates about the
              ToothSafe.
            </p>
            <Button variant="magical" size="sm" asChild>
              <a href="/#signup" onClick={() => trackCTAClick("news_page")}>
                <Sparkles className="w-3.5 h-3.5" />
                Join the Workshop
              </a>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default News;
