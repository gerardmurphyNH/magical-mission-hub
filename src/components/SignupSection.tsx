import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, Check, Mail, AlertCircle } from "lucide-react";
import { useVirtue } from "@/context/VirtueContext";
import { GOOGLE_SHEETS_ENDPOINT, CONTACT_EMAIL } from "@/lib/config";
import { trackSignupSuccess } from "@/lib/analytics";

// Pre-computed star positions to avoid Math.random in render
const stars = Array.from({ length: 15 }, (_, i) => ({
  id: i,
  left: `${(i * 17 + 7) % 100}%`,
  top: `${(i * 23 + 11) % 100}%`,
  delay: `${(i * 0.13) % 2}s`,
}));

const SignupSection = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [honeypot, setHoneypot] = useState(""); // Bot trap
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { virtue } = useVirtue();

  const isEndpointConfigured =
    GOOGLE_SHEETS_ENDPOINT !== "PASTE_YOUR_APPS_SCRIPT_WEB_APP_URL_HERE";

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Bot detection - honeypot should be empty
    if (honeypot) {
      // Silently fail for bots
      setIsSubmitted(true);
      return;
    }

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // If endpoint not configured, show mailto fallback
    if (!isEndpointConfigured) {
      setError(
        `Form not configured yet. Please email us at ${CONTACT_EMAIL} to join the workshop.`
      );
      return;
    }

    setIsLoading(true);

    try {
      await fetch(GOOGLE_SHEETS_ENDPOINT, {
        method: "POST",
        mode: "no-cors", // Apps Script requires no-cors
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          firstName: firstName || "",
          virtue: virtue || "",
          timestamp: new Date().toISOString(),
        }),
      });

      // no-cors mode always returns opaque response, so we assume success
      setIsSubmitted(true);
      trackSignupSuccess(virtue || undefined);
    } catch (err) {
      console.error("Signup error:", err);
      setError(
        `Something went wrong. Please try again or email us at ${CONTACT_EMAIL}.`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      id="signup"
      className="py-20 md:py-28 night-sky-section relative overflow-hidden"
    >
      {/* Animated stars */}
      <div className="absolute inset-0 overflow-hidden">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute w-1 h-1 bg-starlight rounded-full sparkle"
            style={{
              left: star.left,
              top: star.top,
              animationDelay: star.delay,
            }}
          />
        ))}
      </div>

      <div className="container px-6 relative z-10">
        <div className="max-w-xl mx-auto text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-primary/20 flex items-center justify-center mb-6 float">
            <Mail className="w-8 h-8 text-primary" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-starlight mb-4">
            Join the Workshop
          </h2>
          <p className="text-starlight/70 mb-8 leading-relaxed">
            Get occasional updates about the animated short film (Summer 2026),
            the children's book, and ToothSafe. No spam, just a little magic in
            your inbox.
          </p>

          {isSubmitted ? (
            <div className="p-8 rounded-3xl bg-night-sky/80 backdrop-blur-sm border border-starlight/20 animate-fade-in-up">
              <div className="w-12 h-12 mx-auto rounded-full bg-primary flex items-center justify-center mb-4">
                <Check className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="font-display text-xl font-semibold text-starlight mb-2">
                You're in the Workshop!
              </h3>
              <p className="text-starlight/70 text-sm">
                Thank you for joining. We'll send you updates when there's
                something wonderful to share.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col gap-3 mb-3">
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  aria-label="Email address"
                  className="h-14 px-6 rounded-full bg-starlight/10 border-starlight/20 text-starlight placeholder:text-starlight/40 focus:border-primary focus:ring-primary"
                />
                <Input
                  type="text"
                  placeholder="First name (optional)"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  aria-label="First name (optional)"
                  className="h-14 px-6 rounded-full bg-starlight/10 border-starlight/20 text-starlight placeholder:text-starlight/40 focus:border-primary focus:ring-primary"
                />
                {/* Honeypot field - hidden from users, visible to bots */}
                <input
                  type="text"
                  name="website"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    left: "-9999px",
                    opacity: 0,
                    height: 0,
                  }}
                />
                {/* Hidden virtue field */}
                <input type="hidden" name="virtue" value={virtue || ""} />
              </div>

              {error && (
                <div className="flex items-center gap-2 text-red-400 text-sm mb-3 justify-center">
                  <AlertCircle className="w-4 h-4" />
                  <span>{error}</span>
                </div>
              )}

              <Button
                type="submit"
                variant="hero"
                size="lg"
                disabled={isLoading}
                className="h-14 w-full sm:w-auto"
              >
                {isLoading ? (
                  <span className="animate-pulse">Joining...</span>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Join the Workshop
                  </>
                )}
              </Button>

              {!isEndpointConfigured && (
                <p className="mt-4 text-xs text-starlight/50">
                  Or email us directly at{" "}
                  <a
                    href={`mailto:${CONTACT_EMAIL}?subject=Join the Workshop`}
                    className="underline hover:text-primary"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </p>
              )}
            </form>
          )}

          <p className="mt-6 text-xs text-starlight/40">
            We respect your privacy. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignupSection;
