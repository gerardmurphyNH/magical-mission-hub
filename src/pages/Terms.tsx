import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { CONTACT_EMAIL } from "@/lib/config";

const Terms = () => {
  return (
    <main className="min-h-screen bg-background">
      <div className="container px-6 py-12 max-w-2xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-8">
          Terms of Use
        </h1>

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
          <p className="text-muted-foreground">
            Last updated: January 2026
          </p>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground mt-8 mb-4">
              About This Site
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              This is an informational website for "The Tooth Fairy's Magical Mission"
              project, operated by Wiggly Tooth Workshop. The content on this site is
              provided for informational purposes only.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Project details, timelines, and features described on this site are subject
              to change as the project develops.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground mt-8 mb-4">
              Downloadable Content
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              The coloring page and any other downloadable materials provided on this site
              are offered free of charge for personal, non-commercial use only. You may:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Download and print for personal use</li>
              <li>Share with family and friends for personal use</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              You may not:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Sell or distribute for commercial purposes</li>
              <li>Modify and redistribute as your own work</li>
              <li>Use in any commercial product or service</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground mt-8 mb-4">
              No Purchase Offered
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              This site does not currently offer any products or services for purchase.
              The film, book, and ToothSafe products mentioned are in development and will
              be announced when available.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground mt-8 mb-4">
              Intellectual Property
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              All content on this site, including text, images, and designs, is the property
              of Wiggly Tooth Workshop unless otherwise noted. The animated short film is
              being developed in collaboration with Peter H. Reynolds and FableVision Studios.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground mt-8 mb-4">
              Contact
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have questions about these terms, please contact us at{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-primary hover:underline"
              >
                {CONTACT_EMAIL}
              </a>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Terms;
