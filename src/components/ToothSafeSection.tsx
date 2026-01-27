import { Button } from "@/components/ui/button";
import { Check, Sparkles } from "lucide-react";
import toothsafeBox from "@/assets/toothsafe-box.png";

const benefits = [
  "Keeps your tooth safe all night long",
  "The Tooth Fairy can find it easily",
  "Beautifully designed by workshop artisans",
  "A keepsake you'll treasure forever",
];

const ToothSafeSection = () => {
  const scrollToSignup = () => {
    document.getElementById("signup")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-20 md:py-28 bg-secondary/30">
      <div className="container px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative order-2 lg:order-1">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-magical">
              <img
                src={toothsafeBox}
                alt="ToothSafe - A magical box for keeping teeth safe"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-night-sky/20 to-transparent" />
            </div>
            {/* Floating badge */}
            <div className="absolute -top-4 -right-4 md:top-6 md:-right-6 bg-primary text-primary-foreground px-4 py-2 rounded-full shadow-glow font-display font-semibold text-sm">
              Coming soon ✨
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <span className="inline-block text-xs font-semibold uppercase tracking-wide text-primary bg-primary/10 px-3 py-1 rounded-full mb-4">
              From the Workshop
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Meet ToothSafe
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              When a tooth wiggles free, where does it go? Not under the pillow -at least, 
              not just anywhere. ToothSafe is a special little keeper, designed by the 
              Tooth Fairy's workshop, to hold your precious tooth until she arrives.
            </p>

            <ul className="space-y-3 mb-8">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-foreground">{benefit}</span>
                </li>
              ))}
            </ul>

            <Button variant="workshop" size="lg" onClick={scrollToSignup}>
              <Sparkles className="w-4 h-4" />
              Join the Workshop for updates
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ToothSafeSection;
