import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, Check, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SignupSection = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes("@")) {
      toast({
        title: "Please enter a valid email",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    setIsSubmitted(true);
    setIsLoading(false);
    toast({
      title: "Welcome to the Workshop! ✨",
      description: "You'll receive updates about the film, book, and ToothSafe.",
    });
  };

  return (
    <section id="signup" className="py-20 md:py-28 night-sky-section relative overflow-hidden">
      {/* Animated stars */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-starlight rounded-full sparkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
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
            the children's book, and ToothSafe. No spam, just a little magic in your inbox.
          </p>

          {isSubmitted ? (
            <div className="magical-card bg-starlight/10 backdrop-blur-sm border border-starlight/20 animate-fade-in-up">
              <div className="w-12 h-12 mx-auto rounded-full bg-primary flex items-center justify-center mb-4">
                <Check className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="font-display text-xl font-semibold text-starlight mb-2">
                You're in the Workshop!
              </h3>
              <p className="text-starlight/70 text-sm">
                Thank you for joining. We'll send you updates when there's something wonderful to share.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 h-14 px-6 rounded-full bg-starlight/10 border-starlight/20 text-starlight placeholder:text-starlight/40 focus:border-primary focus:ring-primary"
              />
              <Button
                type="submit"
                variant="hero"
                size="lg"
                disabled={isLoading}
                className="h-14"
              >
                {isLoading ? (
                  <span className="animate-pulse">Joining...</span>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Join
                  </>
                )}
              </Button>
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
