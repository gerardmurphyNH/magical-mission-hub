import { Sparkles } from "lucide-react";

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
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Terms
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">
            © 2026 Wiggly Tooth Workshop. All teeth carefully catalogued.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
