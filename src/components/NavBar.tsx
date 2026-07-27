import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sparkles, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { YOUTUBE_CHANNEL_URL } from "@/lib/config";
import { trackEvent } from "@/lib/analytics";

const YouTubeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const navLinks = [
  { label: "Watch the Film", href: "/watch" },
  { label: "Explore the World", href: "#world" },
  { label: "For Parents", href: "/for-parents" },
  { label: "For Teachers", href: "/for-teachers" },
  { label: "Printables", href: "/printables" },
  { label: "Letters", href: "/letters-to-the-tooth-fairy" },
  { label: "News", href: "/news" },
];

const NavBar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  const handleAnchorClick = (href: string) => {
    setMobileOpen(false);
    if (!href.startsWith("#")) return;
    if (isHome) {
      const el = document.getElementById(href.slice(1));
      if (el) {
        const offset = 72;
        const top = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    } else {
      // Off the homepage — navigate to the homepage section
      window.location.href = `/${href}`;
    }
  };

  const scrollToSignup = () => {
    setMobileOpen(false);
    trackEvent("cta_click", { type: "join_workshop", location: "nav" });
    if (location.pathname !== "/") {
      // On a sub-page — navigate to homepage signup section via plain anchor
      window.location.href = "/#signup";
      return;
    }
    const el = document.getElementById("signup");
    if (el) {
      const offset = 72;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[hsl(244_45%_20%/95%)] backdrop-blur-md border-b border-starlight/10">
      <nav className="container px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 font-display font-bold text-starlight hover:text-primary transition-colors"
          aria-label="Wiggly Tooth Workshop — home"
        >
          <Sparkles className="w-5 h-5 text-primary" />
          <span className="hidden sm:inline">Wiggly Tooth Workshop</span>
          <span className="sm:hidden">WTW</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) =>
            link.href.startsWith("#") ? (
              <button
                key={link.label}
                onClick={() => handleAnchorClick(link.href)}
                className="text-sm font-medium text-starlight/70 hover:text-starlight transition-colors"
              >
                {link.label}
              </button>
            ) : (
              <Link
                key={link.label}
                to={link.href}
                className="text-sm font-medium text-starlight/70 hover:text-starlight transition-colors"
              >
                {link.label}
              </Link>
            )
          )}
        </div>

        {/* Right side: social + CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href={YOUTUBE_CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("social_click", { platform: "youtube", location: "nav" })}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-starlight/10 border border-starlight/20 text-starlight/70 hover:text-starlight hover:bg-starlight/20 transition-all text-sm"
            aria-label="Watch on YouTube"
          >
            <YouTubeIcon />
            <span className="hidden lg:inline text-xs font-medium">YouTube</span>
          </a>
          <Button
            variant="magical"
            size="sm"
            onClick={scrollToSignup}
            className="text-xs"
          >
            Join the Workshop
          </Button>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="lg:hidden p-2 text-starlight/80 hover:text-starlight transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-[hsl(244_45%_18%)] border-t border-starlight/10 px-6 py-4 space-y-1">
          {navLinks.map((link) =>
            link.href.startsWith("#") ? (
              <button
                key={link.label}
                onClick={() => handleAnchorClick(link.href)}
                className="w-full text-left py-2.5 text-sm font-medium text-starlight/80 hover:text-starlight transition-colors"
              >
                {link.label}
              </button>
            ) : (
              <Link
                key={link.label}
                to={link.href}
                onClick={() => setMobileOpen(false)}
                className="block py-2.5 text-sm font-medium text-starlight/80 hover:text-starlight transition-colors"
              >
                {link.label}
              </Link>
            )
          )}
          <div className="pt-3 flex items-center gap-3">
            <a
              href={YOUTUBE_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-starlight/10 border border-starlight/20 text-starlight/70 hover:text-starlight transition-all text-sm"
              aria-label="Watch on YouTube"
            >
              <YouTubeIcon />
              <span className="text-xs font-medium">YouTube</span>
            </a>
            <Button variant="magical" size="sm" onClick={scrollToSignup} className="text-xs flex-1">
              Join the Workshop
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;
