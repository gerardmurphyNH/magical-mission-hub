import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, Check, AlertCircle } from "lucide-react";
import { useVirtue } from "@/context/VirtueContext";
import { CONTACT_EMAIL } from "@/lib/config";
import { joinWorkshop } from "@/lib/workshop";
import { trackSignupSuccess, trackFormStart, trackFormError } from "@/lib/analytics";

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
  const [wasAlreadyMember, setWasAlreadyMember] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasStartedForm, setHasStartedForm] = useState(false);
  const { virtue } = useVirtue();

  const handleFormInteraction = () => {
    if (!hasStartedForm) {
      setHasStartedForm(true);
      trackFormStart();
    }
  };

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
      trackFormError("empty_email");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      trackFormError("invalid_email");
      return;
    }

    setIsLoading(true);

    try {
      const { isNew } = await joinWorkshop({ email, firstName, virtue: virtue || undefined, source: "homepage", honeypot });
      setWasAlreadyMember(!isNew);
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
          <div className="w-16 h-16 mx-auto rounded-full bg-primary/30 flex items-center justify-center mb-6 float">
            <Sparkles className="w-8 h-8 text-primary" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-starlight mb-4">
            Join the Workshop
          </h2>
          <p className="text-starlight/80 text-sm mb-4">Workshop members receive:</p>
          <ul className="text-left max-w-xs mx-auto mb-8 space-y-2.5">
            {[
              "New CeCe and Arlo stories as they're made",
              "Free printables and classroom resources",
              "Word when the ToothSafe is ready",
              "Occasional sketches and quiet notes from the workshop",
            ].map((benefit) => (
              <li key={benefit} className="flex items-start gap-2.5 text-sm text-starlight/70">
                <Sparkles className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>

          {isSubmitted ? (
            <div className="p-8 rounded-3xl bg-night-sky/80 backdrop-blur-sm border border-starlight/30 animate-fade-in-up">
              <div className="w-12 h-12 mx-auto rounded-full bg-primary flex items-center justify-center mb-4">
                <Check className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="font-display text-xl font-semibold text-starlight mb-2">
                {wasAlreadyMember ? "You're already in the Workshop." : "You're in the Workshop."}
              </h3>
              <p className="text-starlight/70 text-sm">
                We'll write when there's something worth sharing.
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
                  onFocus={handleFormInteraction}
                  required
                  aria-label="Email address"
                  className="h-14 px-6 rounded-full bg-starlight/10 border-starlight/30 text-starlight placeholder:text-starlight/60 focus:border-primary focus:ring-primary"
                />
                <Input
                  type="text"
                  placeholder="First name (optional)"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  onFocus={handleFormInteraction}
                  aria-label="First name (optional)"
                  className="h-14 px-6 rounded-full bg-starlight/10 border-starlight/30 text-starlight placeholder:text-starlight/60 focus:border-primary focus:ring-primary"
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
            </form>
          )}

          <p className="mt-6 text-xs text-starlight/70">
            We respect your privacy. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignupSection;
