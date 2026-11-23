import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import PageSeo from "@/components/PageSeo";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <PageSeo title="Page Not Found | Wiggly Tooth Workshop" noindex />
      <div className="text-center px-6">
        <h1 className="font-display text-4xl md:text-5xl mb-4 font-bold leading-tight">404</h1>
        <p className="mb-6 text-xl text-muted-foreground">
          Even the Tooth Fairy couldn't find this page.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
          <a href="/" className="text-primary underline hover:text-primary/90">
            Return to Home
          </a>
          <Link to="/watch" className="text-primary underline hover:text-primary/90">
            Watch the short film
          </Link>
          <Link to="/printables" className="text-primary underline hover:text-primary/90">
            Free printables
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
