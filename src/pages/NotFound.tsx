import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import RelatedPages from "@/components/RelatedPages";
import PageSeo from "@/components/PageSeo";

// Served by the netlify.toml catch-all with a real 404 status (see seo.test.ts).
const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background">
      <PageSeo title="Page Not Found | Wiggly Tooth Workshop" noindex />
      <NavBar />
      <main>
        <section className="night-sky-section py-20 md:py-28 relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 16 }, (_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-starlight rounded-full sparkle"
                style={{
                  left: `${(i * 17 + 7) % 100}%`,
                  top: `${(i * 23 + 11) % 95}%`,
                  animationDelay: `${(i * 0.13) % 2}s`,
                }}
              />
            ))}
          </div>
          <div className="container px-6 relative z-10 max-w-2xl mx-auto text-center">
            <span className="inline-block text-xs font-semibold uppercase tracking-wide text-primary bg-primary/10 px-3 py-1 rounded-full mb-5">
              404 · Page not found
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-starlight leading-tight mb-5">
              Even the Tooth Fairy couldn't find this page
            </h1>
            <p className="text-lg text-starlight/80 leading-relaxed mb-8">
              It may have moved, or the link may have a small typo. The pages below are the
              ones families look for most.
            </p>
            <Button variant="hero" size="lg" asChild>
              <Link to="/">
                <ArrowLeft className="w-4 h-4" />
                Back to Wiggly Tooth Workshop
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <RelatedPages
        from="not-found"
        heading="Popular pages"
        links={[
          "/tooth-fairy-letter",
          "/how-much-does-the-tooth-fairy-leave",
          "/coloring-page",
          "/first-tooth-tradition",
          "/what-to-say-when-child-asks-if-tooth-fairy-is-real",
          "/watch",
        ]}
      />
      <Footer />
    </div>
  );
};

export default NotFound;
