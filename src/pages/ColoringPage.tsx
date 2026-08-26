import { Link } from "react-router-dom";
import { Download, FileText, Image as ImageIcon, Sparkles, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { trackColoringPageDownload } from "@/lib/analytics";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import PageSeo from "@/components/PageSeo";

const PAGE_URL = "https://wigglytoothworkshop.com/coloring-page";
const SITE_URL = "https://wigglytoothworkshop.com/";
const CERT_ABS = "https://wigglytoothworkshop.com/downloads/free-tooth-fairy-coloring-page.jpg";
const PREVIEW_IMG = "/downloads/free-tooth-fairy-coloring-page.jpg";
const PDF_URL = "/downloads/free-tooth-fairy-coloring-page.pdf";
const JPG_URL = "/downloads/free-tooth-fairy-coloring-page.jpg";
const PREVIEW_ALT =
  "Free printable Tooth Fairy coloring page showing CeCe the Tooth Fairy flying through a starry night sky with clouds and her cloud-top workshop, from The Tooth Fairy's Secret Workshop";

const faqs = [
  {
    question: "Is the Tooth Fairy coloring page free?",
    answer:
      "Yes. The Tooth Fairy coloring page is completely free to download and print. There's no sign-up, no email, and no cost. Print as many copies as you'd like for home or the classroom.",
  },
  {
    question: "What's the best way to print the coloring page?",
    answer:
      "Download the PDF version for the cleanest print. Open it in any PDF viewer and print on standard letter-size paper (8.5\" × 11\") or A4. The JPG version works well too if you'd rather print an image directly or use it on a tablet.",
  },
  {
    question: "What ages is this coloring page for?",
    answer:
      "It's designed for children roughly ages 3 to 10. Younger children can enjoy the large, open shapes, while older kids can add detail to the stars, clouds, and the Tooth Fairy's workshop in the sky.",
  },
  {
    question: "Can teachers use this in the classroom?",
    answer:
      "Absolutely. The coloring page is free for classroom and personal use. It pairs well with a quiet activity or with our free Tooth Fairy printables and SEL worksheets for grades 1 and 2.",
  },
  {
    question: "Who illustrated the coloring page?",
    answer:
      "The artwork comes from the world of The Tooth Fairy's Secret Workshop, the animated short film created in collaboration with Peter H. Reynolds and FableVision Studios.",
  },
  {
    question: "Is this a printable coloring sheet I can print at home?",
    answer:
      "Yes. It's a printable Tooth Fairy coloring sheet designed to print at home on standard letter or A4 paper. Download the PDF for the cleanest print, or the JPG if you'd rather print an image or color it on a tablet.",
  },
  {
    question: "Are there more Tooth Fairy coloring pages and pictures to color?",
    answer:
      "This is our first free Tooth Fairy coloring page, with more Tooth Fairy pictures and printables added over time. Join the Workshop and we'll let you know when new coloring pages are ready.",
  },
];

const ColoringPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <PageSeo
        title="Free Printable Tooth Fairy Coloring Page | Wiggly Tooth Workshop"
        description="Download a free printable Tooth Fairy coloring page for kids - the Tooth Fairy flying through a starry night sky. PDF or JPG, free for home and classroom."
        canonical={PAGE_URL}
        image={CERT_ABS}
        jsonLd={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Wiggly Tooth Workshop", item: SITE_URL },
                { "@type": "ListItem", position: 2, name: "Tooth Fairy Coloring Page", item: PAGE_URL },
              ],
            },
            {
              "@type": "ImageObject",
              contentUrl: CERT_ABS,
              url: CERT_ABS,
              name: "Free Printable Tooth Fairy Coloring Page",
              description: PREVIEW_ALT,
              creditText: "Wiggly Tooth Workshop",
              creator: { "@type": "Organization", name: "Wiggly Tooth Workshop", url: SITE_URL },
              copyrightNotice: "© 2026 Wiggly Tooth Workshop. Illustrations by Peter H. Reynolds.",
              license: PAGE_URL,
              acquireLicensePage: "https://wigglytoothworkshop.com/terms",
            },
            {
              "@type": "FAQPage",
              mainEntity: faqs.map((f) => ({
                "@type": "Question",
                name: f.question,
                acceptedAnswer: { "@type": "Answer", text: f.answer },
              })),
            },
          ],
        }}
      />

      <NavBar />
      <main>
        {/* Hero */}
        <section className="night-sky-section py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 16 }, (_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-starlight rounded-full sparkle"
                style={{
                  left: `${(i * 17 + 7) % 100}%`,
                  top: `${(i * 23 + 11) % 95}%`,
                  animationDelay: `${(i * 0.13) % 2}s`,
                }}
              />
            ))}
          </div>
          <div className="container px-6 relative z-10 max-w-5xl mx-auto">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-starlight/80 hover:text-starlight transition-colors text-sm mb-10"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Wiggly Tooth Workshop
            </Link>

            <div className="grid md:grid-cols-2 gap-10 items-center">
              {/* Preview */}
              <figure className="order-1 md:order-2">
                <a href={JPG_URL} target="_blank" rel="noopener noreferrer">
                  <img
                    src={PREVIEW_IMG}
                    alt={PREVIEW_ALT}
                    width={800}
                    height={1035}
                    className="w-full max-w-sm mx-auto rounded-2xl shadow-magical bg-white border border-starlight/20 hover:-translate-y-0.5 transition-transform"
                  />
                </a>
              </figure>

              {/* Copy + downloads */}
              <div className="order-2 md:order-1 text-center md:text-left">
                <span className="inline-block text-xs font-semibold uppercase tracking-wide text-primary bg-primary/10 px-3 py-1 rounded-full mb-5">
                  Free Download
                </span>
                <h1 className="font-display text-4xl md:text-5xl font-bold text-starlight mb-5 leading-tight">
                  Free Tooth Fairy
                  <br />
                  <span className="text-primary">Coloring Page</span>
                </h1>
                <p className="text-lg text-starlight/75 mb-8 leading-relaxed">
                  A printable Tooth Fairy coloring page for kids, straight from
                  the Wiggly Tooth Workshop. Download the PDF or JPG, print it,
                  and color it any way you like.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                  <Button variant="hero" size="lg" asChild>
                    <a
                      href={PDF_URL}
                      download="tooth-fairy-coloring-page.pdf"
                      onClick={trackColoringPageDownload}
                    >
                      <FileText className="w-5 h-5" />
                      Download PDF
                    </a>
                  </Button>
                  <Button variant="workshop" size="lg" asChild>
                    <a
                      href={JPG_URL}
                      download="tooth-fairy-coloring-page.jpg"
                      onClick={trackColoringPageDownload}
                    >
                      <ImageIcon className="w-5 h-5" />
                      Download JPG
                    </a>
                  </Button>
                </div>
                <p className="mt-4 text-xs text-starlight/70">
                  Free for personal &amp; classroom use · No sign-up required
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* About */}
        <section className="py-16 md:py-20 bg-background">
          <div className="container px-6 max-w-2xl mx-auto">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">
              About this coloring page
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                This free Tooth Fairy coloring page features CeCe, the Tooth
                Fairy from <em>The Tooth Fairy's Secret Workshop</em>, flying
                through a starry sky on her nightly rounds, with her cloud-top
                workshop floating in the distance. It's designed for children
                ages 3 to 10 and makes a calm, imaginative activity for home or
                the classroom.
              </p>
              <p>
                The artwork comes from the world of the animated short film,
                created in collaboration with Peter H. Reynolds and FableVision
                Studios. It's a gentle introduction to the story of Arlo, CeCe,
                and what the Tooth Fairy really does with the teeth she collects.
              </p>
            </div>

            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mt-12 mb-6">
              How to print your coloring page
            </h2>
            <ol className="space-y-3 text-muted-foreground leading-relaxed list-none">
              {[
                "Choose your format: PDF for the cleanest print, or JPG for an image you can print or use on a tablet.",
                "Open the file and print on standard letter-size paper (8.5\" × 11\") or A4.",
                "Grab crayons, colored pencils, or markers - whatever you love most.",
                "Color the Tooth Fairy, the stars, and her workshop in the clouds however you imagine them.",
                "Share your finished artwork with us on Instagram @wigglytoothworkshop!",
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 md:py-20 bg-secondary/30">
          <div className="container px-6 max-w-2xl mx-auto">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
              Coloring page questions
            </h2>
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="magical-card border-0 data-[state=open]:shadow-magical transition-shadow"
                >
                  <AccordionTrigger className="text-left font-display font-semibold text-foreground hover:text-primary transition-colors hover:no-underline px-0">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pt-2">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* More to explore */}
        <section className="py-16 md:py-20 bg-background">
          <div className="container px-6 max-w-3xl mx-auto">
            <h2 className="font-display text-xl font-bold text-foreground mb-6 text-center">
              More free printables &amp; stories
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { to: "/tooth-fairy-letter", label: "Tooth Fairy letter template", desc: "A printable letter from the Tooth Fairy, free to download." },
                { to: "/tooth-fairy-printables", label: "Tooth Fairy printables & worksheets", desc: "Free SEL activities for grades 1–2." },
                { to: "/is-the-tooth-fairy-real", label: "Is the Tooth Fairy real?", desc: "The mythology behind every lost tooth." },
                { to: "/what-does-the-tooth-fairy-do-with-teeth", label: "What does she do with teeth?", desc: "Inside the Tooth Fairy's workshop." },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="magical-card group hover:shadow-magical transition-all duration-300 hover:-translate-y-0.5"
                >
                  <p className="font-display font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
                    {link.label}
                  </p>
                  <p className="text-sm text-muted-foreground">{link.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-secondary/30">
          <div className="container px-6 max-w-xl mx-auto text-center">
            <div className="magical-card">
              <Sparkles className="w-6 h-6 text-primary mx-auto mb-3" />
              <h2 className="font-display text-xl font-semibold text-foreground mb-2">
                Join the Workshop
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                New coloring pages, printables, and stories from the world of the
                Tooth Fairy - added as they're made.
              </p>
              <Button variant="magical" size="sm" asChild>
                <a href="/#signup">
                  <Sparkles className="w-3.5 h-3.5" />
                  Join the Workshop
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ColoringPage;
