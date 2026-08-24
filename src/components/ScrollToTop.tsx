import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.slice(1);
      let findAttempts = 0;
      let settleChecks = 0;
      let timer: ReturnType<typeof setTimeout>;

      // Two problems to cover: the target section may not be in the DOM yet
      // if its route is still loading its lazy chunk (e.g. navigating to
      // "/#signup" from another page), and once found, the page can keep
      // growing taller as images further down finish loading - which shifts
      // the target mid-animation. So: retry until it exists, then keep
      // nudging it back into view for a bit rather than scrolling only once.
      const tryScroll = () => {
        const el = document.getElementById(id);
        if (!el) {
          if (findAttempts < 30) {
            findAttempts += 1;
            timer = setTimeout(tryScroll, 100);
          }
          return;
        }
        const settled = Math.abs(el.getBoundingClientRect().top) < 4;
        if (!settled) {
          el.scrollIntoView({ behavior: settleChecks === 0 ? "smooth" : "instant", block: "start" });
        }
        if (settleChecks < 15) {
          settleChecks += 1;
          timer = setTimeout(tryScroll, 200);
        }
      };
      tryScroll();
      return () => clearTimeout(timer);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
