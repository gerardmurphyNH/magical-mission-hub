import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { CONTACT_EMAIL } from "@/lib/config";

const Privacy = () => {
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
          Privacy Policy
        </h1>

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
          <p className="text-muted-foreground">
            Last updated: January 2026
          </p>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground mt-8 mb-4">
              What We Collect
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              When you join the Workshop mailing list, we collect:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Your email address (required)</li>
              <li>Your first name (optional)</li>
              <li>Your quiz result / virtue (optional, if you took the quiz)</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground mt-8 mb-4">
              How We Store It
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Your information is stored securely in a private Google Sheet accessible only
              to the Wiggly Tooth Workshop team. We do not use third-party marketing platforms
              or share your data with advertisers.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground mt-8 mb-4">
              How We Use It
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We use your email address solely to send you occasional updates about:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>The animated short film</li>
              <li>The children's book</li>
              <li>ToothSafe and other Workshop projects</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              We will never sell, rent, or share your personal information with third parties
              for marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground mt-8 mb-4">
              How to Unsubscribe
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              You can unsubscribe at any time by:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Replying to any email with "unsubscribe"</li>
              <li>
                Emailing us at{" "}
                <a
                  href={`mailto:${CONTACT_EMAIL}?subject=Unsubscribe`}
                  className="text-primary hover:underline"
                >
                  {CONTACT_EMAIL}
                </a>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground mt-8 mb-4">
              Analytics
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We use Google Analytics to understand how visitors use our site. This helps us
              improve the experience. Google Analytics collects anonymous usage data and does
              not identify individual users.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground mt-8 mb-4">
              Contact
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have questions about this privacy policy, please contact us at{" "}
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

export default Privacy;
