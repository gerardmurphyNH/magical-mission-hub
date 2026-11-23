import { Link } from "react-router-dom";
import { FileText, Image as ImageIcon, Sparkles, ArrowLeft } from "lucide-react";
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
import RelatedPages from "@/components/RelatedPages";
import PageSeo from "@/components/PageSeo";

const PAGE_URL = "https://wigglytoothworkshop.com/coloring-page";
const SITE_URL = "https://wigglytoothworkshop.com/";
const ORIGIN = "https://wigglytoothworkshop.com";

// Every coloring page on the site, in display order. Add new designs here:
// each gets its own card, downloads, and ImageObject in the structured data.
const designs = [
  {
    id: "night-sky",
    name: "CeCe Flying Through the Night Sky",
    blurb:
      "The Tooth Fairy on her nightly rounds, flying through a starry sky with her cloud-top workshop floating in the distance.",
    preview: "/downloads/free-tooth-fairy-coloring-page.jpg",
    width: 800,
    height: 1035,
    pdf: "/downloads/free-tooth-fairy-coloring-page.pdf",
    jpg: "/downloads/free-tooth-fairy-coloring-page.jpg",
    pdfName: "tooth-fairy-coloring-page-night-sky.pdf",
    jpgName: "tooth-fairy-coloring-page-night-sky.jpg",
    alt: "Free printable Tooth Fairy coloring page showing CeCe the Tooth Fairy flying through a starry night sky with clouds and her cloud-top workshop, from The Tooth Fairy's Secret Workshop",
    credit: "Illustration by Peter H. Reynolds.",
  },
  {
    id: "tooth-for-the-workshop",
    name: "A Tooth for the Workshop",
    blurb:
      "CeCe carries a freshly collected tooth home under the moon, flying toward her workshop on a cloud. Bold, simple outlines that are easy for little hands.",
    preview: "/downloads/tooth-fairy-coloring-page-a-tooth-for-the-workshop.jpg",
    width: 1275,
    height: 1650,
    pdf: "/downloads/tooth-fairy-coloring-page-a-tooth-for-the-workshop.pdf",
    jpg: "/downloads/tooth-fairy-coloring-page-a-tooth-for-the-workshop.jpg",
    pdfName: "tooth-fairy-coloring-page-a-tooth-for-the-workshop.pdf",
    jpgName: "tooth-fairy-coloring-page-a-tooth-for-the-workshop.jpg",
    alt: "Free printable Tooth Fairy coloring page titled A Tooth for the Workshop, showing CeCe the Tooth Fairy flying past the moon and stars holding a lost tooth, with her workshop on a cloud above",
    credit: "Used with permission from Peter H. Reynolds and FableVision Studios.",
  },
  {
    id: "whats-inside-your-tooth",
    name: "What's Inside Your Tooth?",
    blurb:
      "CeCe in her workshop beside a big jar. Every lost tooth holds a special quality, like kindness or courage. Children color the scene, then write theirs on the jar's label.",
    preview: "/downloads/tooth-fairy-coloring-page-whats-inside-your-tooth.jpg",
    width: 1545,
    height: 2000,
    pdf: "/downloads/tooth-fairy-coloring-page-whats-inside-your-tooth.pdf",
    jpg: "/downloads/tooth-fairy-coloring-page-whats-inside-your-tooth.jpg",
    pdfName: "tooth-fairy-coloring-page-whats-inside-your-tooth.pdf",
    jpgName: "tooth-fairy-coloring-page-whats-inside-your-tooth.jpg",
    alt: "What's Inside Your Tooth? free printable Tooth Fairy coloring page showing CeCe the Tooth Fairy in her workshop beside a big jar with a tooth on it and a blank label for children to write the special quality inside their tooth",
    credit: "Based on artwork by Peter H. Reynolds and FableVision Studios, used with permission.",
  },
];

const faqs = [
  {
    question: "Are these Tooth Fairy coloring pages free?",
    answer:
      "Yes. Every Tooth Fairy coloring page here is completely free to download and print. There's no sign-up, no email, and no cost. Print as many copies as you'd like for home or the classroom.",
  },
  {
    question: "What's the best way to print the coloring pages?",
    answer:
      "Download the PDF version for the cleanest print. Open it in any PDF viewer and print on standard letter-size paper (8.5\" × 11\") or A4. The JPG version works well too if you'd rather print an image directly or use it on a tablet.",
  },
  {
    question: "What ages are these coloring pages for?",
    answer:
      "They're designed for children roughly ages 3 to 10. Younger children do well with the bold, simple outlines of A Tooth for the Workshop and the open shapes of the night-sky page, while older kids can add detail to the workshop page and write on its jar.",
  },
  {
    question: "Can teachers use these in the classroom?",
    answer:
      "Absolutely. The coloring pages are free for classroom and personal use. The workshop page, where children write what makes them special on the jar, works especially well as a quiet reflection activity alongside our free Tooth Fairy worksheets for grades 1 and 2.",
  },
  {
    question: "Who illustrated the coloring pages?",
    answer:
      "The artwork comes from the world of The Tooth Fairy's Secret Workshop, the animated short film created in collaboration with Peter H. Reynolds and FableVision Studios, and is used with permission.",
  },
  {
    question: "Are these printable coloring sheets I can print at home?",
    answer:
      "Yes. Each one is a printable Tooth Fairy coloring sheet designed to print at home on standard letter or A4 paper. Download the PDF for the cleanest print, or the JPG if you'd rather print an image or color it on a tablet.",
  },
  {
    question: "Will there be more Tooth Fairy coloring pages?",
    answer:
      "Yes. More pages from the world of the film are being drawn in the workshop and will appear here as they're finished. Join the Workshop and we'll let you know when new coloring pages are ready.",
  },
];

const ColoringPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <PageSeo
        title="Tooth Fairy Coloring Pages (Free PDF Printables) | Wiggly Tooth Workshop"
        description="Free printable Tooth Fairy coloring pages for kids, with art from the film by Peter H. Reynolds and FableVision. Download PDF or JPG. No sign-up."
        canonical={PAGE_URL}
        image={`${ORIGIN}${designs[0].preview}`}
        jsonLd={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Wiggly Tooth Workshop", item: SITE_URL },
                { "@type": "ListItem", position: 2, name: "Tooth Fairy Coloring Pages", item: PAGE_URL },
              ],
            },
            ...designs.map((d) => ({
              "@type": "ImageObject",
              contentUrl: `${ORIGIN}${d.preview}`,
              url: `${ORIGIN}${d.preview}`,
              name: `Tooth Fairy Coloring Page: ${d.name}`,
              description: d.alt,
              creditText: "Wiggly Tooth Workshop",
              creator: { "@type": "Organization", name: "Wiggly Tooth Workshop", url: SITE_URL },
              copyrightNotice: `© 2026 Wiggly Tooth Workshop. ${d.credit}`,
              license: PAGE_URL,
              acquireLicensePage: "https://wigglytoothworkshop.com/terms",
            })),
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
        <section className="night-sky-section py-16 md:py-20 relative overflow-hidden">
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
          <div className="container px-6 relative z-10 max-w-3xl mx-auto text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-starlight/80 hover:text-starlight transition-colors text-sm mb-10"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Wiggly Tooth Workshop
            </Link>

            <div>
              <span className="inline-block text-xs font-semibold uppercase tracking-wide text-primary bg-primary/10 px-3 py-1 rounded-full mb-5">
                Free PDF Printables
              </span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-starlight mb-5 leading-tight">
              Tooth Fairy <span className="text-primary">Coloring Pages</span>
            </h1>
            <p className="text-lg text-starlight/75 leading-relaxed max-w-2xl mx-auto">
              Free printable Tooth Fairy coloring pages for kids, drawn from the
              world of <em>The Tooth Fairy's Secret Workshop</em>. Pick a page,
              download the PDF or JPG, print it, and color it any way you like.
            </p>
            <p className="mt-4 text-xs text-starlight/70">
              Free for personal &amp; classroom use · No sign-up required
            </p>
          </div>
        </section>

        {/* Gallery */}
        <section className="py-14 md:py-16 bg-background" aria-labelledby="coloring-gallery-heading">
          <div className="container px-6 max-w-5xl mx-auto">
            <h2
              id="coloring-gallery-heading"
              className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8 text-center"
            >
              Choose a coloring page to print
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {designs.map((d) => (
                <article key={d.id} className="magical-card flex flex-col">
                  <a href={d.jpg} target="_blank" rel="noopener noreferrer" className="block mb-5">
                    <img
                      src={d.preview}
                      alt={d.alt}
                      width={d.width}
                      height={d.height}
                      loading={d.id === designs[0].id ? "eager" : "lazy"}
                      className="w-full max-w-xs mx-auto rounded-xl bg-white border border-border shadow-sm hover:-translate-y-0.5 transition-transform"
                    />
                  </a>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                    {d.name}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">
                    {d.blurb}
                  </p>
                  <div className="flex flex-col gap-2.5">
                    <Button variant="hero" asChild className="w-full">
                      <a
                        href={d.pdf}
                        download={d.pdfName}
                        onClick={() => trackColoringPageDownload(d.pdfName)}
                      >
                        <FileText className="w-4 h-4" />
                        Download PDF
                      </a>
                    </Button>
                    <Button variant="outline" asChild className="w-full">
                      <a
                        href={d.jpg}
                        download={d.jpgName}
                        onClick={() => trackColoringPageDownload(d.jpgName)}
                      >
                        <ImageIcon className="w-4 h-4" />
                        Download JPG
                      </a>
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* About */}
        <section className="py-16 md:py-20 bg-secondary/20">
          <div className="container px-6 max-w-2xl mx-auto">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">
              About these coloring pages
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Every page features CeCe, the Tooth Fairy from{" "}
                <em>The Tooth Fairy's Secret Workshop</em>. She flies through a
                starry sky on her nightly rounds, carries a lost tooth home to her
                workshop on a cloud, and asks what's inside your tooth, with a
                big jar whose label your child fills in with their own special
                quality. The pages
                are designed for children ages 3 to 10 and make a calm,
                imaginative activity for home or the classroom.
              </p>
              <p>
                The artwork comes from the world of the animated short film,
                created in collaboration with Peter H. Reynolds and FableVision
                Studios. It's a gentle introduction to the story of Arlo, CeCe,
                and{" "}
                <Link
                  to="/what-does-the-tooth-fairy-do-with-teeth"
                  className="text-primary font-medium hover:underline"
                >
                  what the Tooth Fairy really does with the teeth she collects
                </Link>
                .
              </p>
            </div>

            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mt-12 mb-6">
              How to print your coloring page
            </h2>
            <ol className="space-y-3 text-muted-foreground leading-relaxed list-none">
              {[
                "Choose a page, then a format: PDF for the cleanest print, or JPG for an image you can print or use on a tablet.",
                "Open the file and print on standard letter-size paper (8.5\" × 11\") or A4.",
                "Grab crayons, colored pencils, or markers - whatever you love most.",
                "Color the Tooth Fairy and her world however you imagine them. On the workshop page, write your special quality on the jar.",
                "Share your finished artwork with us on Instagram @wigglytoothworkshop.",
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
        <section className="py-16 md:py-20 bg-background">
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
      <RelatedPages
        from="/coloring-page"
        links={["/tooth-fairy-printables", "/tooth-fairy-letter", "/first-tooth-tradition"]}
      />
      <Footer />
    </div>
  );
};

export default ColoringPage;
