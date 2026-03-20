import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
  </svg>
);

const TikTokIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
  </svg>
);

const Footer = () => {
  return (
    <footer className="py-12 bg-background border-t border-border">
      <div className="container px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="font-display font-semibold text-foreground">
              Wiggly Tooth Workshop
            </span>
          </div>

          <p className="text-sm text-muted-foreground text-center md:text-left max-w-md">
            Where every tiny tooth becomes part of something bigger.
            Tinkering away, one smile at a time.
          </p>

          <div className="flex gap-6">
            <Link
              to="/privacy"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Privacy
            </Link>
            <Link
              to="/terms"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Terms
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border flex flex-col items-center gap-3">
          <p className="text-sm font-medium text-foreground">Follow along for tooth-fairy magic ✨</p>
          <div className="flex items-center gap-5">
            <a
              href="https://www.instagram.com/wigglytoothworkshop/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              aria-label="Follow us on Instagram"
            >
              <InstagramIcon />
              <span>Instagram</span>
            </a>
            <a
              href="https://www.tiktok.com/@wigglytoothworkshop"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              aria-label="Follow us on TikTok"
            >
              <TikTokIcon />
              <span>TikTok</span>
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border text-center space-y-3">
          <p className="text-xs text-muted-foreground max-w-2xl mx-auto">
            Collaboration credit shown with permission. This site is operated by
            Wiggly Tooth Workshop and is not an official website of FableVision
            Studios or Peter H. Reynolds.
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
