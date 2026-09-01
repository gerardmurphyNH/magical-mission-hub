import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { YOUTUBE_CHANNEL_URL } from "@/lib/config";

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

const YouTubeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const Footer = () => {
  return (
    <footer className="py-12 bg-background border-t border-border">
      <div className="container px-6">
        {/* Top grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="font-display font-semibold text-foreground">
                Wiggly Tooth Workshop
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Where every tiny tooth becomes part of something bigger.
            </p>
          </div>

          {/* Watch & Explore */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wide text-foreground mb-4">
              Watch &amp; Explore
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link
                  to="/watch"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Watch the Short Film
                </Link>
              </li>
              <li>
                <a
                  href="/#world"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Explore the World
                </a>
              </li>
              <li>
                <Link
                  to="/is-the-tooth-fairy-real"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Is the Tooth Fairy real?
                </Link>
              </li>
              <li>
                <Link
                  to="/what-does-the-tooth-fairy-do-with-teeth"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  What does the Tooth Fairy do with teeth?
                </Link>
              </li>
              <li>
                <Link
                  to="/how-much-does-the-tooth-fairy-leave"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  How much does the Tooth Fairy leave?
                </Link>
              </li>
              <li>
                <Link
                  to="/why-does-the-tooth-fairy-leave-money"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Why does the Tooth Fairy leave money?
                </Link>
              </li>
              <li>
                <Link
                  to="/tooth-fairy-story"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  The Tooth Fairy story
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wide text-foreground mb-4">
              Resources
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link
                  to="/printables"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Tooth Fairy printables
                </Link>
              </li>
              <li>
                <Link
                  to="/coloring-page"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Coloring page (free)
                </Link>
              </li>
              <li>
                <Link
                  to="/first-tooth-tradition"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  First tooth tradition &amp; certificate
                </Link>
              </li>
              <li>
                <Link
                  to="/tooth-fairy-letter"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Tooth Fairy letter template
                </Link>
              </li>
              <li>
                <Link
                  to="/for-teachers"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Teacher &amp; classroom resources
                </Link>
              </li>
            </ul>
          </div>

          {/* News */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wide text-foreground mb-4">
              News
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link
                  to="/news"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  News from the Workshop
                </Link>
              </li>
              <li>
                <Link
                  to="/tooth-fairy-film-premiere"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  World Premiere — June 7
                </Link>
              </li>
              <li>
                <a
                  href="https://www.reynoldstlc.org/blog/elevating-the-tooth-fairy-story-to-a-sense-of-mission"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Reynolds Center feature
                </a>
              </li>
            </ul>
          </div>

          {/* Social + Join */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wide text-foreground mb-4">
              Follow Along
            </h4>
            <ul className="space-y-3 mb-5">
              <li>
                <a
                  href={YOUTUBE_CHANNEL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Watch on YouTube"
                >
                  <YouTubeIcon />
                  <span>YouTube</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/wigglytoothworkshop/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Follow on Instagram"
                >
                  <InstagramIcon />
                  <span>Instagram</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.tiktok.com/@wigglytoothworkshop"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Follow on TikTok"
                >
                  <TikTokIcon />
                  <span>TikTok</span>
                </a>
              </li>
            </ul>
            <a
              href="/#signup"
              className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              Join the Workshop →
            </a>
          </div>
        </div>

        {/* Legal bottom row */}
        <div className="pt-8 border-t border-border space-y-3 text-center">
          <div className="flex justify-center gap-5">
            <Link
              to="/privacy"
              className="text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              Privacy
            </Link>
            <Link
              to="/terms"
              className="text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              Terms
            </Link>
          </div>
          <p className="text-xs text-muted-foreground max-w-2xl mx-auto">
            Collaboration credit shown with permission. This site is operated by Wiggly Tooth
            Workshop and is not an official website of FableVision Studios or Peter H. Reynolds.
          </p>
          <p className="text-xs text-muted-foreground">
            © 2026 Wiggly Tooth Workshop. All teeth carefully catalogued.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
