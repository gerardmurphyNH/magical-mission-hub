import { Link } from "react-router-dom";
import { ArrowRight, Palette, FileText, ArrowLeft, Sparkles, GraduationCap, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import PageSeo from "@/components/PageSeo";
import { YOUTUBE_CHANNEL_URL } from "@/lib/config";
import { trackCTAClick } from "@/lib/analytics";

const printables = [
  {
    id: "certificate",
    title: "First Tooth Keepsake Certificate",
    description: "A printable Tooth Fairy certificate she leaves behind after a first lost tooth — naming the special quality she found inside. A keepsake worth saving.",
    icon: Award,
    to: "/first-tooth-tradition",
    label: "Start the tradition",
  },
  {
    id: "coloring-page",
    title: "Tooth Fairy Coloring Page",
    description: "A printable coloring page of the Tooth Fairy flying through a starry night sky. Free PDF or JPG. Perfect for ages 3–10.",
    icon: Palette,
    to: "/coloring-page",
    label: "Preview & download",
  },
  {
    id: "letter",
    title: "Tooth Fairy Letter Template",
    description: "A printable letter from the Tooth Fairy for your child — personalize with their name and the quality found in their tooth.",
    icon: FileText,
    to: "/tooth-fairy-letter",
    label: "Get the letter template",
  },
  {
    id: "teacher",
    title: "Teacher Worksheets & Activities",
    description: "Free SEL worksheets, a coloring page, and a low-prep lesson plan for grades 1–2. Download individually or as a bundle.",
    icon: GraduationCap,
    to: "/tooth-fairy-printables",
    label: "See classroom printables",
  },
];

const Printables = () => {
  const scrollToSignup = () => {
    trackCTAClick("printables_page");
  };

  return (
    <div className="min-h-screen bg-background">
      <PageSeo
        title="Tooth Fairy Printables | Wiggly Tooth Workshop"
        description="Free Tooth Fairy printables for kids, parents, and classrooms: a keepsake certificate, coloring page, letter template, and worksheets. All free."
        canonical="https://wigglytoothworkshop.com/printables"
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
                  name: "Printables",
                  item: "https://wigglytoothworkshop.com/printables",
                },
              ],
            },
            {
              "@type": "CollectionPage",
              name: "Tooth Fairy Printables",
              headline: "Tooth Fairy Printables",
              description:
                "Free Tooth Fairy printables for kids, parents, and classrooms, including a keepsake certificate, coloring page, letter template, and teacher worksheets.",
              about: "free tooth fairy printables",
              publisher: {
                "@type": "Organization",
                name: "Wiggly Tooth Workshop",
                url: "https://wigglytoothworkshop.com/",
              },
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": "https://wigglytoothworkshop.com/printables",
              },
            },
          ],
        }}
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
          Free Downloads
        </span>

        <h1 className="font-display text-4xl font-bold text-foreground mb-4 leading-tight">
          Tooth Fairy Printables
        </h1>
        <p className="text-muted-foreground text-lg leading-relaxed mb-12">
          Free printables for kids, parents, and classrooms — straight from the Workshop.
        </p>

        {/* Film CTA */}
        <div className="mb-10 p-6 rounded-2xl bg-secondary/50 border border-border text-center">
          <Sparkles className="w-6 h-6 text-primary mx-auto mb-3" />
          <p className="font-display font-semibold text-foreground mb-2">
            Watch the short film first
          </p>
          <p className="text-muted-foreground text-sm mb-4">
            <em>The Tooth Fairy's Secret Workshop</em> is a great complement to these printables —
            especially for classroom use.
          </p>
          <Button variant="magical" size="sm" asChild>
            <a href={YOUTUBE_CHANNEL_URL} target="_blank" rel="noopener noreferrer">
              Watch on YouTube
            </a>
          </Button>
        </div>

        {/* Printables grid */}
        <div className="grid sm:grid-cols-2 gap-6 mb-12">
          {printables.map((item) => (
            <div key={item.id} id={item.id} className="magical-card flex flex-col gap-4">
              <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center">
                <item.icon className="w-6 h-6 text-accent-foreground" />
              </div>
              <div className="flex-1">
                <h2 className="font-display font-semibold text-foreground mb-1">{item.title}</h2>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
              </div>
              <Button variant="magical" size="sm" asChild>
                <Link to={item.to}>
                  {item.label}
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </Button>
            </div>
          ))}
        </div>

        {/* More coming - join workshop */}
        <div className="magical-card text-center">
          <Sparkles className="w-6 h-6 text-primary mx-auto mb-3" />
          <h3 className="font-display text-lg font-semibold text-foreground mb-2">
            More printables coming soon
          </h3>
          <p className="text-muted-foreground text-sm mb-5 leading-relaxed">
            Join the Workshop to get new printables, coloring pages, and
            classroom resources as they're released.
          </p>
          <Button variant="magical" size="sm" asChild>
            <a href="/#signup" onClick={scrollToSignup}>
              <Sparkles className="w-3.5 h-3.5" />
              Join the Workshop
            </a>
          </Button>
        </div>

        <div className="mt-10 pt-8 border-t border-border">
          <h3 className="font-display text-lg font-semibold text-foreground mb-4">
            More from the Workshop
          </h3>
          <ul className="space-y-2">
            <li>
              <Link to="/for-teachers" className="text-sm text-primary hover:underline">
                Teacher &amp; classroom resources →
              </Link>
            </li>
            <li>
              <Link to="/is-the-tooth-fairy-real" className="text-sm text-primary hover:underline">
                Is the Tooth Fairy real? →
              </Link>
            </li>
            <li>
              <Link to="/what-does-the-tooth-fairy-do-with-teeth" className="text-sm text-primary hover:underline">
                What does the Tooth Fairy do with teeth? →
              </Link>
            </li>
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Printables;
