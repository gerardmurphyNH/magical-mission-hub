import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Download,
  Sparkles,
  Check,
  Copy,
  FileText,
  Mail,
  AlertCircle,
  Image as ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import RelatedPages from "@/components/RelatedPages";
import ToothFairyLetterSheet from "@/components/ToothFairyLetterSheet";
import PageSeo from "@/components/PageSeo";
import {
  trackToothFairyLetterPdfDownload,
  trackToothFairyLetterImageDownload,
  trackToothFairyLetterExamplePdfDownload,
  trackToothFairyLetterExampleImageDownload,
  trackToothFairyGuideDownload,
  trackFAQOpen,
  trackEvent,
} from "@/lib/analytics";
import { CONTACT_EMAIL } from "@/lib/config";
import { joinWorkshop } from "@/lib/workshop";

// Pre-computed star positions
const stars = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  left: `${(i * 17 + 9) % 100}%`,
  top: `${(i * 29 + 13) % 100}%`,
  delay: `${(i * 0.19) % 2}s`,
}));

const qualities = [
  {
    name: "Courage",
    examples:
      "trying something new, speaking up, sleeping alone, joining a team, going to the dentist",
  },
  {
    name: "Kindness",
    examples:
      "helping a sibling, including someone, comforting a friend, sharing without being asked",
  },
  {
    name: "Patience",
    examples:
      "practicing something difficult, waiting calmly, sticking with a challenge, learning a new skill",
  },
  {
    name: "Creativity",
    examples:
      "drawing, building, inventing stories, making music, solving problems in a new way",
  },
  {
    name: "Curiosity",
    examples:
      "asking thoughtful questions, exploring how things work, noticing details adults miss",
  },
  {
    name: "Persistence",
    examples:
      "continuing after frustration, trying again after mistakes, finishing something hard",
  },
  {
    name: "Wonder",
    examples:
      "noticing nature, stars, animals, clouds, tiny details, or seeing magic in ordinary things",
  },
  {
    name: "Friendship",
    examples:
      "making someone feel included, listening carefully, forgiving someone, being loyal",
  },
  {
    name: "Confidence",
    examples:
      "trying something independently, performing, raising a hand, sharing an idea",
  },
  {
    name: "Helpfulness",
    examples:
      "pitching in at home, cleaning up, helping a younger child, offering to solve a problem",
  },
  {
    name: "Imagination",
    examples:
      "pretending, storytelling, building worlds, asking \"what if?\" questions",
  },
  {
    name: "Honesty",
    examples:
      "telling the truth, owning a mistake, being trusted with something important",
  },
];

const magicByQuality = [
  {
    quality: "Courage",
    idea: "might light a dark path for a small animal.",
    example:
      "Tonight, I used a little bit of that courage to help a nervous fox kit step out of its den and find its family.",
  },
  {
    quality: "Kindness",
    idea: "might help someone feel less alone.",
    example:
      "Tonight, I used a little bit of that kindness to help a lonely child feel brave enough to ask someone to play.",
  },
  {
    quality: "Patience",
    idea: "might calm rough waves or a windy night.",
    example:
      "Tonight, I used a little bit of that patience to calm the wind just long enough for a small bird to land safely.",
  },
  {
    quality: "Creativity",
    idea: "might help a stuck inventor, artist, or builder see a new solution.",
    example:
      "Tonight, I used a little bit of that creativity to help someone solve a problem they had almost given up on.",
  },
  {
    quality: "Wonder",
    idea: "might make the stars shine a little brighter for someone looking up.",
    example:
      "Tonight, I used a little bit of that wonder to make the stars shine a little brighter for someone who needed to look up.",
  },
];

const faqs = [
  {
    question: "What should a Tooth Fairy letter say?",
    answer:
      "A good Tooth Fairy letter thanks the child for the tooth, mentions something special about them, and keeps the magic alive. This template adds one extra idea: the tooth held a special quality that helped the Tooth Fairy make the world a little better. The blanks let you personalise it with your child's name, their quality, and the small thing the Tooth Fairy did with the magic.",
  },
  {
    question: "Can I personalise this Tooth Fairy letter?",
    answer:
      "Yes. The template has blanks for your child's name, their special quality (like courage or kindness), how that quality has been growing, and what the Tooth Fairy did with the magic from the tooth. The parent guide section on this page has prompts to help you choose each one.",
  },
  {
    question: "Should the Tooth Fairy leave money with the letter?",
    answer:
      "Many families do. In this version, the money is a thank-you, not a payment. The letter frames it that way: the money is left because the tooth mattered, because of the qualities it held — not simply as a transaction.",
  },
  {
    question: "What age is this Tooth Fairy letter best for?",
    answer:
      "This works especially well for children around ages 5–8, when losing teeth still feels magical and the ideas of courage, kindness, and curiosity are just starting to become meaningful. Older children who still enjoy the tradition may appreciate a more detailed version.",
  },
  {
    question: "What should my child's first Tooth Fairy letter say?",
    answer:
      "A first Tooth Fairy letter is a keepsake, so it helps to slow down and make it personal. Thank your child for their very first lost tooth, tell them it's a moment worth remembering, and name one real quality you've watched growing in them - the courage it took, the kindness they showed, the patience they're learning. You can use the printable template above and simply fill the blanks with that first-tooth moment in mind.",
  },
  {
    question: "Can teachers use this Tooth Fairy letter?",
    answer:
      "Yes. Teachers can use the letter idea alongside the free Tooth Fairy worksheet and teacher guide to create a small classroom tradition around lost teeth. Each time a student loses a tooth, the letter and worksheet together make the moment feel significant. See the free printables page for the full classroom resource.",
  },
  {
    question: "Is this a letter from the Tooth Fairy?",
    answer:
      "Yes. It's written in the Tooth Fairy's own voice and meant to be left behind for your child to find in the morning - a message from her about the tooth they lost and the special quality she found inside it. You fill in the blanks so the note speaks directly to your child.",
  },
  {
    question: "Can I use this as a Tooth Fairy goodbye letter?",
    answer:
      "Yes. Some families write a Tooth Fairy goodbye letter when a child is ready to move on from the tradition - a warm final note that thanks them for every tooth and celebrates how much they've grown. Fill the blanks with the qualities you've watched grow over the years, and let the last line be a gentle send-off. There is also a free printable Tooth Fairy goodbye letter for the last tooth on this page, plus short goodbye notes.",
  },
  {
    question: "Can you fill in the Tooth Fairy letter for me?",
    answer:
      "Yes. Our free letter maker writes a personalized letter from the Tooth Fairy for you: choose the quality inside your child's tooth and what the Tooth Fairy did with its magic, add their first name, and download the finished letter as a PDF or JPG to print. There's no login and no email required.",
  },
  {
    question: "What should a short Tooth Fairy note say?",
    answer:
      "Two or three lines is plenty: thank your child for the tooth, name one real quality you found inside it, and hint at where that quality is going next. Written small, in tiny handwriting, it looks like it came from someone very small. There are ready-to-copy short notes on this page for first teeth, everyday teeth, late visits, and the last tooth.",
  },
  {
    question: "What should the Tooth Fairy write if she forgot to come?",
    answer:
      "Keep it calm and give the tooth the importance. A line like \"Your tooth was worth waiting for - I took extra care with it, which is why I came a night late\" turns a missed night into part of the story. Leave the note with the gift the next night, and never make the child feel it was their fault.",
  },
];

// Short notes in the Tooth Fairy's voice, grouped by the moment they're for.
// Each group's heading uses the words parents search with.
const noteGroups = [
  {
    id: "first-tooth-notes",
    printable: "first-tooth",
    heading: "Notes for a first lost tooth",
    notes: [
      "Your very first tooth. I keep a special drawer for first ones, and yours is in it now.",
      "A first tooth is a big day. Inside yours I found bravery - the quiet kind. Thank you for letting me have it.",
      "First teeth hold the most. Yours held curiosity, and I already know where it's going.",
      "Your first tooth now has a tiny label in my workshop. It says: kind.",
    ],
  },
  {
    id: "everyday-notes",
    heading: "Short notes for any tooth",
    notes: [
      "Thank you for this tooth. It was full of patience, and someone out there needs some tonight.",
      "Another tooth, another little piece of you out helping the world. This one carried kindness.",
      "I noticed how brave you were this week. I found it in your tooth, too.",
      "This tooth is going somewhere important. I can't tell you where yet.",
      "Keep brushing. The best qualities shine through the cleanest teeth.",
    ],
  },
  {
    id: "late-notes",
    printable: "late",
    heading: "When the Tooth Fairy is late (or the tooth goes missing)",
    notes: [
      "I'm sorry I'm late. There were more teeth than stars last night, and I wanted to give yours the time it deserved.",
      "Your tooth was worth waiting for. I took extra care with it, which is why I came a night late.",
      "You were sleeping so lightly last night that I didn't want to wake you. Thank you for waiting one more night.",
      "Don't worry about the tooth that went missing. I always know where teeth end up, and I found what was inside it.",
    ],
  },
  {
    id: "goodbye-notes",
    printable: "goodbye",
    heading: "Goodbye notes for the last tooth",
    notes: [
      "This was your last baby tooth, and my last visit. I kept a little of every quality you gave me. You grew all of it yourself.",
      "Every tooth you gave me held something good. From now on, I'm leaving the rest with you.",
      "My work with you is done. The kindness, the courage, the curiosity - those were always yours.",
      "You figured out my secret. That means you're part of it now.",
    ],
  },
];

// Older copy path for browsers or embeds that block the async clipboard API.
const legacyCopy = (text: string): boolean => {
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.setAttribute("readonly", "");
  ta.style.position = "fixed";
  ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.select();
  let ok = false;
  try {
    ok = document.execCommand("copy");
  } catch {
    ok = false;
  }
  document.body.removeChild(ta);
  return ok;
};

// Printable letter variants, rendered from scripts/printables/build-letter-variants.py.
const letterVariants = [
  {
    id: "first-tooth",
    heading: "First Tooth Letter from the Tooth Fairy",
    blurb: "For the very first one: a note about the shelf where she keeps first teeth, with blanks for the quality she found.",
    file: "tooth-fairy-first-tooth-letter",
    alt: "Free printable first tooth letter from the Tooth Fairy with blanks for the child's name and the special quality inside their first lost tooth",
  },
  {
    id: "goodbye",
    heading: "Tooth Fairy Goodbye Letter",
    blurb: "For the last baby tooth: a warm send-off that tells your child the good things they grew are theirs to keep.",
    file: "tooth-fairy-goodbye-letter",
    alt: "Free printable Tooth Fairy goodbye letter for a child's last baby tooth, with blanks for the quality she will remember most",
  },
  {
    id: "late",
    heading: "Tooth Fairy Late Letter (Sorry I'm Late)",
    blurb: "For the night she didn't make it: an apology that never blames your child and makes the wait part of the story.",
    file: "tooth-fairy-late-letter",
    alt: "Free printable Tooth Fairy late letter apologizing for a missed night, with a blank for the special quality found inside the tooth",
  },
  {
    id: "to-the-tooth-fairy",
    heading: "Letter to the Tooth Fairy (for Kids to Fill In)",
    blurb: "For your child to write: their name, the quality they think is inside, and how she should use it. Big lines and tick circles for little hands.",
    file: "letter-to-the-tooth-fairy-from-child",
    alt: "Free printable letter to the Tooth Fairy for kids to fill in, with lines for their name, the day they lost their tooth, and circles to choose the quality inside",
  },
];

const CopyableNote = ({ text, group }: { text: string; group: string }) => {
  const [copied, setCopied] = useState(false);
  const textRef = useRef<HTMLSpanElement>(null);
  const copy = async () => {
    let ok = false;
    try {
      await navigator.clipboard.writeText(text);
      ok = true;
    } catch {
      ok = legacyCopy(text);
    }
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      trackEvent("tooth_fairy_note_copy", { group });
    } else if (textRef.current) {
      // Last resort: select the note so the visitor can copy it themselves.
      const range = document.createRange();
      range.selectNodeContents(textRef.current);
      const sel = window.getSelection();
      sel?.removeAllRanges();
      sel?.addRange(range);
    }
  };
  return (
    <li className="flex items-start justify-between gap-3 rounded-xl border border-border bg-card p-4">
      <p className="font-display text-foreground leading-relaxed">
        &ldquo;<span ref={textRef}>{text}</span>&rdquo;
      </p>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Copied" : "Copy this note"}
        className="shrink-0 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline underline-offset-4 mt-1"
      >
        {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
        {copied ? "Copied" : "Copy"}
      </button>
    </li>
  );
};

// Inline signup — same pattern as TeacherPrintables, different source
const LetterSignup = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (honeypot) { setIsSubmitted(true); return; }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setIsLoading(true);
    try {
      await joinWorkshop({ email, firstName, source: "tooth_fairy_letter", honeypot });
      setIsSubmitted(true);
    } catch {
      setError(`Something went wrong. Please try again or email ${CONTACT_EMAIL}.`);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-4">
        <div className="w-10 h-10 mx-auto rounded-full bg-primary flex items-center justify-center mb-3">
          <Check className="w-5 h-5 text-primary-foreground" />
        </div>
        <p className="font-display font-semibold text-foreground">You're on the list.</p>
        <p className="text-sm text-muted-foreground mt-1">
          We'll send future printables and Workshop updates when they're ready.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <Input
        type="email"
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        aria-label="Email address"
        className="h-12 flex-1"
      />
      <Input
        type="text"
        placeholder="First name (optional)"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        aria-label="First name (optional)"
        className="h-12 sm:w-40"
      />
      <input
        type="text"
        name="website"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0 }}
      />
      <Button type="submit" variant="magical" className="h-12" disabled={isLoading}>
        {isLoading ? (
          <span className="animate-pulse">Sending…</span>
        ) : (
          <>
            <Mail className="w-4 h-4" /> Join the Workshop
          </>
        )}
      </Button>
      {error && (
        <div className="flex items-center gap-2 text-destructive text-sm col-span-full">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </form>
  );
};

// Structured data for SEO / Google Images
const PAGE_URL = "https://wigglytoothworkshop.com/tooth-fairy-letter";
const LETTER_IMAGE_URL =
  "https://wigglytoothworkshop.com/downloads/tooth-fairy-letter-template.jpg";
const PUBLISHER_URL = "https://wigglytoothworkshop.com/";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: PUBLISHER_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Tooth Fairy Letter Template",
          item: PAGE_URL,
        },
      ],
    },
    {
      "@type": "Article",
      datePublished: "2026-06-01",
      dateModified: "2026-11-23",
      headline: "Free Printable Tooth Fairy Letter Template",
      description:
        "A free printable Tooth Fairy letter template with fill-in blanks for a child's name and the special quality found inside their lost tooth. Available as a PDF for printing or an image to save and share.",
      image: LETTER_IMAGE_URL,
      url: PAGE_URL,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": PAGE_URL,
      },
      publisher: {
        "@type": "Organization",
        name: "Wiggly Tooth Workshop",
        url: PUBLISHER_URL,
      },
      author: {
        "@type": "Organization",
        name: "Wiggly Tooth Workshop",
        url: PUBLISHER_URL,
      },
    },
    ...letterVariants.map((v) => ({
      "@type": "ImageObject",
      contentUrl: `https://wigglytoothworkshop.com/downloads/${v.file}.jpg`,
      url: `https://wigglytoothworkshop.com/downloads/${v.file}.jpg`,
      name: v.heading,
      description: v.alt,
      creditText: "Wiggly Tooth Workshop",
      creator: { "@type": "Organization", name: "Wiggly Tooth Workshop", url: PUBLISHER_URL },
      copyrightNotice: "© 2026 Wiggly Tooth Workshop",
      license: PAGE_URL,
      acquireLicensePage: "https://wigglytoothworkshop.com/terms",
    })),
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ],
};

const ToothFairyLetter = () => {
  return (
    <>
      <PageSeo
        title="Free Printable Tooth Fairy Letter Template | Wiggly Tooth Workshop"
        description="Free printable Tooth Fairy letter your child will treasure. Download the PDF template, fill in the blanks in seconds, and print at home. No email, no cost."
        canonical="https://wigglytoothworkshop.com/tooth-fairy-letter"
        image="https://wigglytoothworkshop.com/downloads/tooth-fairy-letter-template.jpg"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="min-h-screen bg-background">
        <NavBar />
        <main>

        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="night-sky-section py-20 md:py-28 relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
            {stars.map((star) => (
              <div
                key={star.id}
                className="absolute w-1 h-1 bg-starlight rounded-full sparkle"
                style={{ left: star.left, top: star.top, animationDelay: star.delay }}
              />
            ))}
          </div>
          <div className="container px-6 relative z-10 max-w-2xl mx-auto text-center">
            <div className="flex flex-col items-center gap-4 mb-8">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-starlight/80 hover:text-starlight transition-colors text-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Wiggly Tooth Workshop
              </Link>
              <span className="inline-block text-xs font-semibold uppercase tracking-wide text-primary bg-primary/10 px-3 py-1 rounded-full">
                Free Download · No Email Required
              </span>
            </div>

            <h1 className="font-display text-4xl md:text-5xl font-bold text-starlight mb-8 leading-tight">
              Free Printable Tooth Fairy<br />
              <span className="text-primary">Letter Template</span>
            </h1>

            <div className="text-left space-y-4 text-starlight/75 leading-relaxed mb-10 max-w-xl mx-auto">
              <p>Losing a tooth is a big moment.</p>
              <p>
                Most people know the tradition: place the tooth under your pillow, fall asleep,
                and wake up to find money in its place.
              </p>
              <p>
                But very few people know what really happens next.
              </p>
              <p>
                The Tooth Fairy collects teeth because every child's tooth holds something
                special that has been growing over time — courage, kindness, creativity,
                patience, curiosity, wonder, and more. Those qualities help make the world
                a little brighter in quiet ways most people never notice.
              </p>
              <p>
                This free printable Tooth Fairy letter helps continue the magic of that moment.
                Each letter can celebrate the special qualities growing inside your child and
                remind them that even small acts of bravery, kindness, and curiosity matter
                more than they realise.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="hero" size="xl" asChild>
                <a
                  href="/downloads/tooth-fairy-letter-template.pdf"
                  download="tooth-fairy-letter-template.pdf"
                  onClick={trackToothFairyLetterPdfDownload}
                >
                  <Download className="w-5 h-5" />
                  Download the Letter (PDF)
                </a>
              </Button>
              <Button
                variant="outline"
                size="xl"
                className="border-starlight/60 bg-transparent text-starlight hover:bg-starlight/10"
                asChild
              >
                <a
                  href="/downloads/tooth-fairy-letter-template.jpg"
                  download="tooth-fairy-letter-template.jpg"
                  onClick={trackToothFairyLetterImageDownload}
                >
                  <ImageIcon className="w-5 h-5" />
                  Download Image Version
                </a>
              </Button>
            </div>
            <p className="mt-4 text-xs text-starlight/60">
              Free printable · No email required · Print at home
            </p>
            <p className="mt-5 text-starlight/90">
              Rather not fill it in by hand?{" "}
              <a href="#personalized-letter" className="font-semibold text-primary underline underline-offset-4 hover:text-starlight">
                We'll make a personalized letter for you, free
              </a>
            </p>
            <p className="mt-2 text-sm text-starlight/80">
              Just need a few lines?{" "}
              <a href="#short-notes" className="underline underline-offset-4 hover:text-starlight">
                Short Tooth Fairy notes and messages
              </a>
            </p>
          </div>
        </section>

        {/* ── We'll fill it in for you (letter maker) ──────────── */}
        <section id="personalized-letter" className="py-12 md:py-14 bg-primary/10 border-b border-border scroll-mt-20">
          <div className="container px-6 max-w-3xl mx-auto">
            <div className="text-center">
              <span className="inline-block text-xs font-semibold uppercase tracking-wide text-primary bg-background/70 px-3 py-1 rounded-full mb-4">
                Free · No login · Ready in a minute
              </span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
                We can fill in the letter for you
              </h2>
              <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                Tell us your child's name, the quality you've seen growing in them, and what
                the Tooth Fairy did with its magic. We'll turn it into a personalized letter
                from the Tooth Fairy, ready to download as a PDF or JPG and print. No account,
                and no email needed.
              </p>
            </div>
            <ol className="grid sm:grid-cols-3 gap-3 mt-8 list-none">
              {[
                "Choose the quality in their tooth",
                "Pick what the magic helped",
                "Download, print, and leave it under the pillow",
              ].map((step, i) => (
                <li
                  key={step}
                  className="flex items-start gap-3 rounded-xl bg-background/80 border border-border p-4 text-sm text-foreground"
                >
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <span className="leading-snug pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
              <Button variant="hero" size="lg" asChild>
                <Link
                  to="/letters-to-the-tooth-fairy?type=from"
                  onClick={() => trackEvent("explore_click", { page: "/letters-to-the-tooth-fairy", source: "tooth_fairy_letter_fill_for_me" })}
                >
                  <Sparkles className="w-4 h-4" />
                  Make my child's letter
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="#template">I'll fill in the blank one</a>
              </Button>
            </div>
            <p className="text-center text-sm text-muted-foreground mt-5">
              Want your child to write to her instead?{" "}
              <Link
                to="/letters-to-the-tooth-fairy?type=to"
                onClick={() => trackEvent("explore_click", { page: "/letters-to-the-tooth-fairy", source: "tooth_fairy_letter_write_to" })}
                className="text-primary font-medium hover:underline"
              >
                Write a letter to the Tooth Fairy
              </Link>
              {" · "}
              <Link
                to="/letters-to-the-tooth-fairy#wall"
                onClick={() => trackEvent("explore_click", { page: "/letters-to-the-tooth-fairy", source: "tooth_fairy_letter_wall" })}
                className="text-primary font-medium hover:underline"
              >
                Read the Wall of Stories
              </Link>
            </p>
          </div>
        </section>

        {/* ── On this page ─────────────────────────────────────── */}
        <nav aria-label="On this page" className="border-b border-border bg-background">
          <div className="container px-6 max-w-3xl mx-auto py-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm">
            <span className="text-muted-foreground">On this page:</span>
            {[
              ["#template", "Blank template"],
              ["#example", "Filled-in example"],
              ["#more-letters", "First tooth, goodbye & late letters"],
              ["#how-to-fill-in", "How to fill it in"],
              ["#short-notes", "Short notes"],
              ["#faq", "FAQ"],
            ].map(([href, label]) => (
              <a key={href} href={href} className="font-medium text-primary hover:underline underline-offset-4">
                {label}
              </a>
            ))}
          </div>
        </nav>

        {/* ── Download area ────────────────────────────────────── */}
        <section className="py-14 md:py-16 bg-background border-b border-border">
          <div className="container px-6 max-w-2xl mx-auto text-center space-y-4">
            {/* Visual preview of the printable letter template */}
            <figure className="max-w-sm mx-auto mb-2">
              <a
                href="/downloads/tooth-fairy-letter-template.jpg"
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-2xl overflow-hidden shadow-magical border border-primary/20 transition-transform duration-300 hover:-translate-y-0.5"
              >
                <img
                  src="/downloads/tooth-fairy-letter-template.jpg"
                  width={1530}
                  height={1980}
                  loading="lazy"
                  alt="Free printable Tooth Fairy letter template — a 'From the Tooth Fairy' note with fill-in blanks for a child's name and the special quality found inside their lost tooth"
                  className="w-full h-auto"
                />
              </a>
              <figcaption className="text-xs text-muted-foreground mt-3">
                Preview of the printable Tooth Fairy letter template
              </figcaption>
            </figure>
            <p className="text-muted-foreground leading-relaxed">
              Download the free Tooth Fairy letter template, print it at home, and personalise
              it before placing it under your child's pillow. Available as a PDF (best for
              printing) or as an image file (easy to save and share).
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <Button variant="magical" asChild>
                <a
                  href="/downloads/tooth-fairy-letter-template.pdf"
                  download="tooth-fairy-letter-template.pdf"
                  onClick={trackToothFairyLetterPdfDownload}
                >
                  <Download className="w-4 h-4" />
                  Download PDF
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a
                  href="/downloads/tooth-fairy-letter-template.jpg"
                  download="tooth-fairy-letter-template.jpg"
                  onClick={trackToothFairyLetterImageDownload}
                >
                  <ImageIcon className="w-4 h-4" />
                  Download Image
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* ── Letter template display ───────────────────────────── */}
        <section id="template" className="py-16 md:py-20 bg-primary/5 border-b border-border scroll-mt-20">
          <div className="container px-6 max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <span className="inline-block text-xs font-semibold uppercase tracking-wide text-primary bg-primary/10 px-3 py-1 rounded-full mb-4">
                The Template
              </span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
                Tooth Fairy Letter Template
              </h2>
              <p className="text-muted-foreground text-sm">
                Fill in the four blanks by hand with{" "}
                <a href="#how-to-fill-in" className="text-primary font-medium hover:underline">
                  our step-by-step help
                </a>
                , or{" "}
                <Link
                  to="/letters-to-the-tooth-fairy?type=from"
                  onClick={() => trackEvent("explore_click", { page: "/letters-to-the-tooth-fairy", source: "tooth_fairy_letter_template_intro" })}
                  className="text-primary font-medium hover:underline"
                >
                  let us fill it in for you
                </Link>
                .
              </p>
            </div>

            {/* Letter: same design as the downloadable PDF/JPG */}
            <div className="max-w-2xl mx-auto rounded-2xl overflow-hidden shadow-sm border border-primary/10">
              <ToothFairyLetterSheet label="Blank Tooth Fairy letter template" />
            </div>
          </div>
        </section>

        {/* ── Template download bar ────────────────────────────── */}
        <div className="bg-primary/5 border-b border-border py-6">
          <div className="container px-6 max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-display font-semibold text-foreground text-sm">
                Download the blank template
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                PDF for printing · JPG to save or share
              </p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <Button variant="magical" size="sm" asChild>
                <a
                  href="/downloads/tooth-fairy-letter-template.pdf"
                  download="tooth-fairy-letter-template.pdf"
                  onClick={trackToothFairyLetterPdfDownload}
                >
                  <Download className="w-3.5 h-3.5" /> PDF
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a
                  href="/downloads/tooth-fairy-letter-template.jpg"
                  download="tooth-fairy-letter-template.jpg"
                  onClick={trackToothFairyLetterImageDownload}
                >
                  <ImageIcon className="w-3.5 h-3.5" /> JPG
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* ── Example filled-in letter ─────────────────────────── */}
        <section id="example" className="py-16 md:py-20 bg-background border-b border-border scroll-mt-20">
          <div className="container px-6 max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <span className="inline-block text-xs font-semibold uppercase tracking-wide text-primary bg-primary/10 px-3 py-1 rounded-full mb-4">
                Example
              </span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
                Example Tooth Fairy Letter
              </h2>
              <p className="text-muted-foreground text-sm">
                Here is one example you can use as inspiration.
              </p>
            </div>

            {/* Filled letter */}
            <div className="max-w-2xl mx-auto rounded-2xl overflow-hidden shadow-sm border border-primary/10">
              <ToothFairyLetterSheet
                label="Example Tooth Fairy letter filled in for Emma"
                answers={{
                  name: "Emma",
                  quality: "kindness",
                  grows: "help others feel included and cared for",
                  magic: "a frightened baby owl safely find its way back to its nest",
                }}
              />
            </div>
          </div>
        </section>

        {/* ── Example download bar ─────────────────────────────── */}
        <div className="bg-secondary/20 border-b border-border py-6">
          <div className="container px-6 max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-display font-semibold text-foreground text-sm">
                Download the example letter (Emma / kindness)
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Useful to show a child what a filled letter looks like
              </p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <Button variant="magical" size="sm" asChild>
                <a
                  href="/downloads/tooth-fairy-letter-example.pdf"
                  download="tooth-fairy-letter-example.pdf"
                  onClick={trackToothFairyLetterExamplePdfDownload}
                >
                  <Download className="w-3.5 h-3.5" /> PDF
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a
                  href="/downloads/tooth-fairy-letter-example.jpg"
                  download="tooth-fairy-letter-example.jpg"
                  onClick={trackToothFairyLetterExampleImageDownload}
                >
                  <ImageIcon className="w-3.5 h-3.5" /> JPG
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* ── More printable letters ─────────────────────────── */}
        <section id="more-letters" className="py-16 md:py-20 bg-primary/5 border-b border-border scroll-mt-20">
          <div className="container px-6 max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <span className="inline-block text-xs font-semibold uppercase tracking-wide text-primary bg-primary/10 px-3 py-1 rounded-full mb-4">
                Free · No email required
              </span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
                More Printable Tooth Fairy Letters
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Letters for the moments families ask about most: the very first tooth, the
                last one, the night she ran late, and a letter for your child to write to her.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {letterVariants.map((v) => (
                <article
                  key={v.id}
                  id={`letter-${v.id}`}
                  className="magical-card flex flex-col scroll-mt-24"
                >
                  <a href={`/downloads/${v.file}.jpg`} target="_blank" rel="noopener noreferrer" className="block mb-5">
                    <img
                      src={`/downloads/${v.file}.jpg`}
                      alt={v.alt}
                      width={1530}
                      height={1980}
                      loading="lazy"
                      className="w-full max-w-[15rem] mx-auto rounded-lg bg-white border border-border shadow-sm hover:-translate-y-0.5 transition-transform"
                    />
                  </a>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">{v.heading}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">{v.blurb}</p>
                  <div className="flex flex-col gap-2.5">
                    <Button variant="magical" asChild className="w-full">
                      <a
                        href={`/downloads/${v.file}.pdf`}
                        download={`${v.file}.pdf`}
                        onClick={() => trackEvent("printable_letter_download", { variant: v.id, format: "pdf" })}
                      >
                        <Download className="w-4 h-4" /> Download PDF
                      </a>
                    </Button>
                    <Button variant="outline" asChild className="w-full">
                      <a
                        href={`/downloads/${v.file}.jpg`}
                        download={`${v.file}.jpg`}
                        onClick={() => trackEvent("printable_letter_download", { variant: v.id, format: "jpg" })}
                      >
                        <ImageIcon className="w-4 h-4" /> Download JPG
                      </a>
                    </Button>
                  </div>
                  {v.id === "to-the-tooth-fairy" && (
                    <p className="mt-3 text-sm text-center">
                      <Link
                        to="/letters-to-the-tooth-fairy?type=to"
                        onClick={() => trackEvent("explore_click", { page: "/letters-to-the-tooth-fairy", source: "printable_letter_to_tf" })}
                        className="text-primary font-medium hover:underline"
                      >
                        Or type it and we'll design it for you
                      </Link>
                    </p>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── How to personalise ───────────────────────────────── */}
        <section id="how-to-fill-in" className="py-16 md:py-20 bg-secondary/20 border-b border-border scroll-mt-20">
          <div className="container px-6 max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block text-xs font-semibold uppercase tracking-wide text-primary bg-primary/10 px-3 py-1 rounded-full mb-4">
                Parent Guide
              </span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                How to Personalise Your Tooth Fairy Letter
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                The best Tooth Fairy letters feel personal. Instead of choosing a random
                compliment, think about a moment when your child showed a real quality
                beginning to grow. The Tooth Fairy notices small moments adults sometimes
                overlook.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {qualities.map((q) => (
                <div key={q.name} className="magical-card flex gap-3">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-display font-semibold text-foreground text-sm mb-0.5">
                      {q.name}
                    </p>
                    <p className="text-muted-foreground text-xs leading-relaxed">
                      {q.examples}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── How to choose the magic ──────────────────────────── */}
        <section className="py-16 md:py-20 bg-background border-b border-border">
          <div className="container px-6 max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block text-xs font-semibold uppercase tracking-wide text-primary bg-primary/10 px-3 py-1 rounded-full mb-4">
                Parent Guide
              </span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                How to Choose What the Tooth Fairy Did With the Magic
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                This is the part that can feel harder, but it does not need to be complicated.
                The Tooth Fairy works in quiet, subtle ways. She does not need to make giant
                miracles happen. A little bit of tooth magic might help an animal, brighten a
                dark path, calm a worried heart, or nudge a small moment in the right
                direction.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-10">
              {/* Animals */}
              <div className="magical-card">
                <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  Think about animals your child loves
                </h3>
                <ul className="space-y-2">
                  {[
                    ["owls", "a baby owl safely find its nest"],
                    ["dogs", "a lost puppy hear its owner calling"],
                    ["turtles", "a tiny turtle reach the water"],
                    ["butterflies", "one find flowers after a storm"],
                    ["whales or dolphins", "guide them through dark water"],
                    ["rabbits", "one find a safe hiding place"],
                  ].map(([animal, magic]) => (
                    <li key={animal} className="text-sm text-muted-foreground leading-relaxed flex gap-2">
                      <span className="text-primary/50 flex-shrink-0 mt-0.5">→</span>
                      <span>
                        If your child loves <span className="font-medium text-foreground">{animal}</span>,
                        the magic could help {magic}.
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Places */}
              <div className="magical-card">
                <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  Think about places your child knows
                </h3>
                <ul className="space-y-2">
                  {[
                    "A playground light flickering back on",
                    "A garden getting just enough rain",
                    "A squirrel finding its way across the yard",
                    "A bird finding a safe branch in the wind",
                    "A neighbour's flower blooming at just the right time",
                    "A lost mitten being noticed before it disappeared forever",
                  ].map((place) => (
                    <li key={place} className="text-sm text-muted-foreground flex gap-2">
                      <span className="text-primary/50 flex-shrink-0 mt-0.5">→</span>
                      <span>{place}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Quality-matched examples */}
            <div className="magical-card">
              <h3 className="font-display font-semibold text-foreground mb-6 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                Match the quality in the tooth to what the Tooth Fairy did
              </h3>
              <div className="space-y-4">
                {magicByQuality.map((item) => (
                  <div key={item.quality} className="border-l-2 border-primary/20 pl-4">
                    <p className="text-xs uppercase tracking-wide font-semibold text-primary mb-1">
                      {item.quality}
                    </p>
                    <p className="text-sm text-muted-foreground italic leading-relaxed">
                      "{item.example}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Guide download bar ───────────────────────────────── */}
        <div className="bg-primary/5 border-b border-border py-6">
          <div className="container px-6 max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-display font-semibold text-foreground text-sm">
                Download the parent guide
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                All 12 qualities + magic prompts on one printable page
              </p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <Button variant="magical" size="sm" asChild>
                <a
                  href="/downloads/tooth-fairy-parent-guide.pdf"
                  download="tooth-fairy-parent-guide.pdf"
                  onClick={trackToothFairyGuideDownload}
                >
                  <Download className="w-3.5 h-3.5" /> PDF
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a
                  href="/downloads/tooth-fairy-parent-guide.jpg"
                  download="tooth-fairy-parent-guide.jpg"
                  onClick={trackToothFairyGuideDownload}
                >
                  <ImageIcon className="w-3.5 h-3.5" /> JPG
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* ── First letter / how to answer ─────────────────────── */}
        <section className="py-16 md:py-20 bg-background border-b border-border">
          <div className="container px-6 max-w-2xl mx-auto">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6 leading-tight">
              Writing your child's first Tooth Fairy letter
            </h2>
            <div className="space-y-5 text-muted-foreground leading-relaxed">
              <p>
                A first tooth is a once-in-a-lifetime moment, so the first Tooth Fairy letter
                is worth a little extra care. It's the one most likely to be kept, tucked into
                a memory box, and read again years later. You don't need fancy words - you need
                the moment to feel true.
              </p>
              <p>
                Start by thanking your child for their very first tooth and telling them it's a
                day worth remembering. Then say what you've quietly noticed: a real quality
                that's been growing in them. Maybe it was the bravery of wiggling the tooth
                themselves, the patience of waiting for it to come loose, or the kindness they
                showed someone that week. Naming one true quality is what turns a sweet note
                into something they'll feel.
              </p>
              <p>
                The{" "}
                <Link
                  to="/tooth-fairy-letter"
                  className="text-primary font-medium hover:underline"
                >
                  printable template above
                </Link>{" "}
                is made for exactly this. The blanks let you write their name, the quality you
                saw growing, and the small thing the Tooth Fairy did with its magic - so a first
                letter feels personal without you having to start from a blank page.
              </p>
            </div>

            <h3 className="font-display text-xl font-semibold text-foreground mt-10 mb-3">
              What to say when your child asks if the Tooth Fairy is real
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              A letter like this also gives you a gentle way into the bigger question when it
              comes. The qualities the Tooth Fairy notices - courage, kindness, patience,
              creativity - are real whether or not your child still pictures a winged fairy, and
              that's a comforting truth to lean on. For the actual words to use in that moment,
              see{" "}
              <Link
                to="/what-to-say-when-child-asks-if-tooth-fairy-is-real"
                className="text-primary font-medium hover:underline"
              >
                what to say when your child asks if the Tooth Fairy is real
              </Link>{" "}
              and our honest answer to{" "}
              <Link
                to="/is-the-tooth-fairy-real"
                className="text-primary font-medium hover:underline"
              >
                is the Tooth Fairy real?
              </Link>
            </p>
          </div>
        </section>

        {/* ── Short notes & messages ───────────────────────────── */}
        <section
          id="short-notes"
          className="py-16 md:py-20 bg-primary/5 border-b border-border scroll-mt-20"
        >
          <div className="container px-6 max-w-2xl mx-auto">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4 leading-tight">
              Short Tooth Fairy Notes and Messages
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Not every visit needs a full letter. Sometimes a few lines on a small scrap of
              paper is exactly right. Copy any of these, swap in a quality you have actually
              seen growing in your child, and leave it under the pillow.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-10">
              One tip: write small. A note in tiny handwriting looks like it came from someone
              very small.
            </p>

            <div className="space-y-10">
              {noteGroups.map((group) => (
                <div key={group.id}>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-4">
                    {group.heading}
                  </h3>
                  <ul className="space-y-3">
                    {group.notes.map((note) => (
                      <CopyableNote key={note} text={note} group={group.id} />
                    ))}
                  </ul>
                  {"printable" in group && group.printable && (
                    <p className="mt-3 text-sm">
                      <a href={`#letter-${group.printable}`} className="text-primary font-medium hover:underline">
                        Want a full letter instead? See the printable version
                      </a>
                    </p>
                  )}
                </div>
              ))}
            </div>

            <p className="text-muted-foreground leading-relaxed mt-10">
              For a first tooth, the note pairs well with a{" "}
              <Link to="/first-tooth-tradition" className="text-primary font-medium hover:underline">
                free Tooth Fairy certificate
              </Link>
              . Want something longer? Use the printable letter template above, or{" "}
              <Link
                to="/letters-to-the-tooth-fairy"
                className="text-primary font-medium hover:underline"
              >
                type your own letter and print it
              </Link>
              .
            </p>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────── */}
        <section id="faq" className="py-16 md:py-20 bg-secondary/20 border-b border-border scroll-mt-20">
          <div className="container px-6 max-w-2xl mx-auto">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
              Tooth Fairy Letter FAQs
            </h2>
            <Accordion
              type="single"
              collapsible
              className="space-y-3"
              onValueChange={(value) => {
                if (value) {
                  const index = parseInt(value.replace("item-", ""));
                  if (!isNaN(index)) trackFAQOpen(faqs[index].question);
                }
              }}
            >
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

        {/* ── Signup ───────────────────────────────────────────── */}
        <section className="py-16 md:py-20 bg-primary/5">
          <div className="container px-6 max-w-xl mx-auto text-center">
            <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-5">
              <Mail className="w-6 h-6 text-primary" />
            </div>
            <h2 className="font-display text-2xl font-bold text-foreground mb-2">
              Want more Tooth Fairy printables?
            </h2>
            <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
              Get future printables, stories, and early access to new Workshop ideas.
              Completely optional. We only send something when there's a good reason to.
            </p>
            <LetterSignup />
            <p className="mt-4 text-xs text-muted-foreground">
              We respect your inbox. Unsubscribe anytime.
            </p>
          </div>
        </section>

        {/* ── Closing CTA ──────────────────────────────────────── */}
        <section className="py-16 md:py-20 night-sky-section relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
            {stars.slice(0, 8).map((star) => (
              <div
                key={star.id}
                className="absolute w-1 h-1 bg-starlight rounded-full sparkle"
                style={{ left: star.left, top: star.top, animationDelay: star.delay }}
              />
            ))}
          </div>
          <div className="container px-6 max-w-xl mx-auto text-center relative z-10">
            <Sparkles className="w-8 h-8 text-primary mx-auto mb-4" />
            <h2 className="font-display text-2xl md:text-3xl font-bold text-starlight mb-3">
              The magic is already there
            </h2>
            <p className="text-starlight/70 mb-8 leading-relaxed text-sm">
              Every tooth your child loses holds something real. The letter is just a way
              of helping them notice it. Wishing you a quiet, magical night.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="hero" size="lg" asChild>
                <a
                  href="/downloads/tooth-fairy-letter-template.pdf"
                  download="tooth-fairy-letter-template.pdf"
                  onClick={trackToothFairyLetterPdfDownload}
                >
                  <Download className="w-4 h-4" />
                  Download the letter
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-starlight/60 bg-transparent text-starlight hover:bg-starlight/10"
                asChild
              >
                <Link to="/tooth-fairy-printables">
                  <FileText className="w-4 h-4" />
                  See all printables
                </Link>
              </Button>
            </div>
            <p className="mt-6 text-xs text-starlight/60">
              Part of the world being built at Wiggly Tooth Workshop — animated short film,
              children's book, and ToothSafe. The film is out now; the book and ToothSafe are coming soon.
            </p>
          </div>
        </section>

        <RelatedPages
          from="/tooth-fairy-letter"
          links={["/first-tooth-tradition", "/how-much-does-the-tooth-fairy-leave", "/what-to-say-when-child-asks-if-tooth-fairy-is-real", "/letters-to-the-tooth-fairy", "/tooth-fairy-printables", "/coloring-page"]}
        />
        <Footer />
        </main>
      </div>
    </>
  );
};

export default ToothFairyLetter;
