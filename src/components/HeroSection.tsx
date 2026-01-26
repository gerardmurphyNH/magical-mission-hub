import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import heroFairy from "@/assets/hero-fairy.jpg";

const HeroSection = () => {
  const scrollToSignup = () => {
    document.getElementById("signup")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Night sky gradient background */}
      <div className="absolute inset-0 night-sky-section" />
      
      {/* Animated stars */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
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

      {/* Hero fairy image with glow effect */}
      <div className="absolute right-0 bottom-0 w-full md:w-2/3 lg:w-1/2 h-full opacity-40 md:opacity-60">
        <img
          src={heroFairy}
          alt="The Tooth Fairy holding a glowing tooth"
          className="w-full h-full object-cover object-left-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(244_45%_25%)] via-transparent to-[hsl(244_45%_35%)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(244_45%_30%)] via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="container relative z-10 px-6 py-20 text-center md:text-left">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 bg-starlight/10 backdrop-blur-sm border border-starlight/20 rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-starlight/90 font-medium">
              Animated short film coming Summer 2026
            </span>
          </div>

          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-starlight mb-6 leading-tight">
            The Tooth Fairy's
            <br />
            <span className="text-primary">Magical Mission</span>
          </h1>

          <p className="text-lg md:text-xl text-starlight/80 mb-8 leading-relaxed font-body">
            Every tooth holds a memory. Every tooth holds a virtue. And in the Tooth Fairy's hands, 
            these tiny treasures help quietly fix the world—one smile at a time.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button
              variant="hero"
              size="xl"
              onClick={scrollToSignup}
              className="group"
            >
              <Sparkles className="w-5 h-5 group-hover:animate-spin" />
              Join the Workshop
            </Button>
          </div>

          <p className="mt-6 text-sm text-starlight/50">
            By Gerard Murphy
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
