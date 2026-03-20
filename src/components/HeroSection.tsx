import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import heroFairy from "@/assets/hero-fairy.png";
import { trackCTAClick, trackEvent } from "@/lib/analytics";

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
  </svg>
);

const TikTokIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
  </svg>
);

const HeroSection = () => {
  const scrollToSignup = () => {
    trackCTAClick("hero");
    document.getElementById("signup")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[90vh] md:min-h-[90vh] flex flex-col md:flex-row items-center justify-center overflow-hidden">
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

      {/* Hero fairy image - desktop: positioned absolutely, mobile: below content */}
      <div className="hidden md:block absolute right-0 bottom-0 w-2/3 lg:w-1/2 h-full opacity-60">
        <img
          src={heroFairy}
          alt="The Tooth Fairy holding a glowing tooth"
          className="w-full h-full object-cover object-left-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(244_45%_25%)] via-transparent to-[hsl(244_45%_35%)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(244_45%_30%)] via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="container relative z-10 px-6 pt-20 pb-8 md:py-20 text-center md:text-left">
        <div className="max-w-xl mx-auto md:mx-0">
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
            A magical story world for curious kids is coming to life. Follow Arlo, CeCe, and the Tooth Fairy through an animated film, a children's book, and ToothSafe - and be here from the very beginning.
          </p>

          {/* Primary CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mb-8">
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

          {/* Secondary social CTA */}
          <div className="border-t border-starlight/15 pt-6">
            <p className="text-sm font-medium text-starlight/60 mb-3 text-center md:text-left">
              Follow the Workshop
            </p>
            <div className="flex gap-3 justify-center md:justify-start flex-wrap">
              <a
                href="https://www.instagram.com/wigglytoothworkshop/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("social_click", { platform: "instagram", location: "hero" })}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-starlight/10 border border-starlight/20 text-starlight/80 hover:text-starlight hover:bg-starlight/20 hover:border-starlight/40 transition-all text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label="Follow Wiggly Tooth Workshop on Instagram"
              >
                <InstagramIcon />
                <span>Instagram</span>
              </a>
              <a
                href="https://www.tiktok.com/@wigglytoothworkshop"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("social_click", { platform: "tiktok", location: "hero" })}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-starlight/10 border border-starlight/20 text-starlight/80 hover:text-starlight hover:bg-starlight/20 hover:border-starlight/40 transition-all text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label="Follow Wiggly Tooth Workshop on TikTok"
              >
                <TikTokIcon />
                <span>TikTok</span>
              </a>
            </div>
            <p className="text-xs text-starlight/40 mt-2.5 text-center md:text-left">
              Behind-the-scenes magic, sneak peeks, and Tooth Fairy fun
            </p>
          </div>
        </div>
      </div>

      {/* Mobile hero fairy image - shown below content on mobile only */}
      <div className="relative md:hidden w-full px-6 pb-12">
        <div className="relative w-full max-w-sm mx-auto aspect-square rounded-3xl overflow-hidden shadow-magical">
          <img
            src={heroFairy}
            alt="The Tooth Fairy holding a glowing tooth"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(244_45%_25%)/50] via-transparent to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
