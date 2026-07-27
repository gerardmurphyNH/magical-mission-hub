import { useEffect, useRef, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Sparkles, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import PageSeo from "@/components/PageSeo";
import ShareableLetterCard from "@/components/ShareableLetterCard";
import { submitLetter, fetchApprovedLetters, type PublicLetter } from "@/lib/letters";
import { trackEvent, trackCTAClick } from "@/lib/analytics";

const PAGE_URL = "https://wigglytoothworkshop.com/letters-to-the-tooth-fairy";
const SITE_URL = "https://wigglytoothworkshop.com/";

const QUALITIES = [
  "Bravery",
  "Kindness",
  "Creativity",
  "Patience",
  "Curiosity",
  "Generosity",
  "Honesty",
  "Perseverance",
  "Joy",
];

// Sample letters shown for inspiration until real, moderated submissions arrive.
// Clearly labelled as examples so they're never mistaken for real families' letters.
const EXAMPLE_LETTERS = [
  {
    quality: "Bravery",
    body: "Dear Tooth Fairy, I lost my tooth at school today and I wasn't even scared. The quality in my tooth is bravery. Please use it to help someone who feels nervous.",
    name: "Leo",
  },
  {
    quality: "Kindness",
    body: "Dear Tooth Fairy, my tooth has kindness in it because I helped my little sister when she was sad. Please share it with someone who needs a friend today.",
    name: "Mia",
  },
  {
    quality: "Perseverance",
    body: "Dear Tooth Fairy, this tooth was so wiggly and took forever to come out, but I kept trying! The quality inside is perseverance. Please use it well.",
    name: "Ada",
  },
  {
    quality: "Curiosity",
    body: "Dear Tooth Fairy, I always ask a hundred questions. The quality in my tooth is curiosity - maybe you can give it to someone who wants to learn something new.",
    name: "Ren",
  },
];

const faqs = [
  {
    question: "How do I write a letter to the Tooth Fairy?",
    answer:
      "Start with what your child wants to say, then name the quality their tooth carried - the bravery, kindness, patience, or creativity they grew while it was theirs - and how they hope the Tooth Fairy will use it. You can share it here for our moderated gallery, and turn it into a card to post. For a letter that goes back under the pillow, use our free printable Tooth Fairy letter.",
  },
  {
    question: "Can my child get a reply from the Tooth Fairy?",
    answer:
      "Yes - the reply is the part that goes back under the pillow. Download our free printable Tooth Fairy letter template, fill in the quality your child grew, and leave it where the tooth used to be. Writing to the Tooth Fairy and hearing back is the whole tradition.",
  },
  {
    question: "Will our letter be shared publicly?",
    answer:
      "Only if a parent or guardian submits it and checks the consent box, and only after a person reviews it. We show a first name (or 'Anonymous') and never a last name, photo, age, contact detail, or location. You can ask us to remove a letter at any time.",
  },
  {
    question: "Can I email or text the Tooth Fairy?",
    answer:
      "The Tooth Fairy doesn't have an inbox or a phone number - she works quietly at night. The real way to reach her is a letter left with the tooth. You can write one here and make a card to share, or print a letter for her to answer under the pillow.",
  },
  {
    question: "What is the Tooth Fairy's email address or phone number?",
    answer:
      "The Tooth Fairy doesn't have an email address or a phone number - there's no inbox to write to and no number to call. That's by design: she works quietly, at night. The way to reach her is a letter left with your tooth, the way children always have.",
  },
  {
    question: "How do you contact the Tooth Fairy?",
    answer:
      "You write her a letter and leave it where your tooth was. It's the preferred - and really the only - way to contact the Tooth Fairy. Write one here to share and turn into a card, or print our free Tooth Fairy letter for her to answer under the pillow.",
  },
  {
    question: "What should the letter say?",
    answer:
      "Anything honest and kind. The prompt we love: what is the quality in your tooth, and how do you hope the Tooth Fairy will use it to make the world a little better? That single question turns a lost tooth into a small, meaningful moment.",
  },
];

const LettersToTheToothFairy = () => {
  // ── submission form state ──
  const [firstName, setFirstName] = useState("");
  const [quality, setQuality] = useState("");
  const [customQuality, setCustomQuality] = useState("");
  const [useCustom, setUseCustom] = useState(false);
  const [body, setBody] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<{ quality: string; body: string; firstName: string } | null>(null);
  const mountedAt = useRef(Date.now());

  // ── gallery state ──
  const [letters, setLetters] = useState<PublicLetter[]>([]);
  const [galleryLoading, setGalleryLoading] = useState(true);

  useEffect(() => {
    fetchApprovedLetters()
      .then(setLetters)
      .catch(() => setLetters([]))
      .finally(() => setGalleryLoading(false));
  }, []);

  const resolvedQuality = (useCustom ? customQuality : quality).trim();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!resolvedQuality) return setError("Please choose or type the quality in your tooth.");
    if (body.trim().length < 4) return setError("Please write a few words for your letter.");
    if (body.trim().length > 1200) return setError("That letter is a little long - please trim it under 1200 characters.");
    if (!consent) return setError("Please confirm you're a parent or guardian sharing on your child's behalf.");
    // Timing trap: real people take more than a couple of seconds to write a letter.
    if (Date.now() - mountedAt.current < 2500) return setError("Please take a moment to write your letter.");

    setStatus("sending");
    try {
      await submitLetter({
        childFirstName: firstName,
        quality: resolvedQuality,
        letterBody: body,
        parentEmail: email,
        parentConsent: consent,
        honeypot,
      });
      trackEvent("letter_submit", { quality: resolvedQuality });
      setSubmitted({ quality: resolvedQuality, body: body.trim(), firstName: firstName.trim() });
      setStatus("done");
      // reset the form fields (keep `submitted` for the card)
      setFirstName(""); setQuality(""); setCustomQuality(""); setUseCustom(false);
      setBody(""); setEmail(""); setConsent(false);
    } catch {
      setStatus("idle");
      setError("Something went wrong sending your letter. Please try again in a moment.");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <PageSeo
        title="Letters to the Tooth Fairy: Write & Contact Her | Wiggly Tooth Workshop"
        description="The best way to contact the Tooth Fairy is a letter. Read letters from kids and families, write your own, and turn it into a card to share."
        canonical={PAGE_URL}
        jsonLd={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Wiggly Tooth Workshop", item: SITE_URL },
                { "@type": "ListItem", position: 2, name: "Letters to the Tooth Fairy", item: PAGE_URL },
              ],
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
        {/* ── Hero ── */}
        <section className="night-sky-section py-20 md:py-28 relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 18 }, (_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-starlight rounded-full sparkle"
                style={{ left: `${(i * 17 + 7) % 100}%`, top: `${(i * 23 + 11) % 85}%`, animationDelay: `${(i * 0.15) % 2}s` }}
              />
            ))}
          </div>
          <div className="container px-6 relative z-10 max-w-2xl mx-auto text-center">
            <Link to="/" className="inline-flex items-center gap-2 text-starlight/70 hover:text-starlight transition-colors text-sm mb-10">
              <ArrowLeft className="w-4 h-4" />
              Wiggly Tooth Workshop
            </Link>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-starlight mb-5 leading-tight">
              Letters to the <span className="text-primary">Tooth Fairy</span>
            </h1>
            <p className="text-starlight/80 text-lg leading-relaxed max-w-xl mx-auto">
              What is the quality in your tooth - and how do you hope the Tooth
              Fairy will use it to make the world a little better? Write your
              letter, read others, and share your own.
            </p>
            <div className="mt-8">
              <Button variant="hero" size="lg" asChild>
                <a href="#write" onClick={() => trackCTAClick("letters_hero")}>
                  <Sparkles className="w-5 h-5" />
                  Write your letter
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* ── How to contact / reach the Tooth Fairy (SEO: email/phone/contact intent) ── */}
        <section className="py-14 md:py-16 bg-secondary/30">
          <div className="container px-6 max-w-2xl mx-auto">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-5 leading-tight">
              How do you contact the Tooth Fairy?
            </h2>
            <div className="space-y-4 text-foreground/80 text-lg leading-relaxed">
              <p>
                The Tooth Fairy doesn't have an email address or a phone number.
                She works quietly at night, not from an inbox - so there's nothing
                to email and no number to call.
              </p>
              <p>
                The real way to reach her is the oldest one: <strong className="text-foreground">write
                her a letter</strong> and leave it with your tooth. It's how children
                have contacted the Tooth Fairy for generations, and it's still the
                way that works. Write yours below to share and turn into a card, or{" "}
                <Link to="/tooth-fairy-letter" className="text-primary hover:underline">
                  print a letter for her to answer
                </Link>{" "}
                under the pillow.
              </p>
            </div>
          </div>
        </section>

        {/* ── Write / submission ── */}
        <section id="write" className="py-16 md:py-24 bg-background scroll-mt-20">
          <div className="container px-6 max-w-2xl mx-auto">
            {status === "done" && submitted ? (
              <div className="text-center">
                <Sparkles className="w-8 h-8 text-primary mx-auto mb-4" />
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
                  Your letter is on its way
                </h2>
                <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto mb-10">
                  Thank you. A person at the Workshop reads every letter before it
                  appears in the gallery below. In the meantime, here's your
                  letter as a card you can share - tag us and we may repost it.
                </p>
                <ShareableLetterCard
                  quality={submitted.quality}
                  letterBody={submitted.body}
                  childFirstName={submitted.firstName}
                />
                <button
                  type="button"
                  onClick={() => { setSubmitted(null); setStatus("idle"); mountedAt.current = Date.now(); }}
                  className="mt-8 text-sm text-primary hover:underline"
                >
                  Write another letter
                </button>
              </div>
            ) : (
              <>
                <div className="text-center mb-10">
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
                    Write a letter to the Tooth Fairy
                  </h2>
                  <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto">
                    A parent or guardian shares it on their child's behalf. We
                    review every letter before it appears, and only ever show a
                    first name.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* honeypot (hidden from humans) */}
                  <input
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
                  />

                  {/* quality picker */}
                  <div>
                    <label className="block font-display font-semibold text-foreground mb-3">
                      What quality is in your tooth?
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {QUALITIES.map((q) => (
                        <button
                          type="button"
                          key={q}
                          onClick={() => { setQuality(q); setUseCustom(false); }}
                          className={`px-3.5 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                            !useCustom && quality === q
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-background text-foreground border-border hover:border-primary/50"
                          }`}
                        >
                          {q}
                        </button>
                      ))}
                      <button
                        type="button"
                        onClick={() => setUseCustom(true)}
                        className={`px-3.5 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                          useCustom ? "bg-primary text-primary-foreground border-primary" : "bg-background text-foreground border-border hover:border-primary/50"
                        }`}
                      >
                        Something else
                      </button>
                    </div>
                    {useCustom && (
                      <input
                        type="text"
                        value={customQuality}
                        onChange={(e) => setCustomQuality(e.target.value)}
                        maxLength={60}
                        placeholder="e.g. Wonder, Gratitude, Courage…"
                        className="mt-3 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    )}
                  </div>

                  {/* letter body */}
                  <div>
                    <label htmlFor="letter" className="block font-display font-semibold text-foreground mb-2">
                      Your letter
                    </label>
                    <textarea
                      id="letter"
                      value={body}
                      onChange={(e) => setBody(e.target.value)}
                      rows={5}
                      maxLength={1200}
                      placeholder="Dear Tooth Fairy, I lost my tooth today. The quality inside it was…"
                      className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary leading-relaxed"
                    />
                    <p className="text-xs text-muted-foreground mt-1 text-right">{body.length}/1200</p>
                  </div>

                  {/* child first name (optional) */}
                  <div>
                    <label htmlFor="firstName" className="block font-display font-semibold text-foreground mb-2">
                      Child's first name <span className="font-normal text-muted-foreground text-sm">(optional)</span>
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      maxLength={40}
                      placeholder="First name only, or leave blank for Anonymous"
                      className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  {/* parent email (optional) */}
                  <div>
                    <label htmlFor="email" className="block font-display font-semibold text-foreground mb-2">
                      Your email <span className="font-normal text-muted-foreground text-sm">(optional)</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="So we can let you know when your letter is published"
                      className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Never shown publicly. We won't add you to anything without asking.</p>
                  </div>

                  {/* consent */}
                  <label className="flex items-start gap-3 text-sm text-foreground/80 leading-relaxed cursor-pointer">
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary"
                    />
                    <span>
                      I'm the parent or legal guardian, and I'm sharing this on my
                      child's behalf. I agree it may be displayed publicly and on
                      social media showing a first name only (or "Anonymous"), per
                      the{" "}
                      <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>{" "}
                      and{" "}
                      <Link to="/terms" className="text-primary hover:underline">Terms</Link>.
                    </span>
                  </label>

                  {error && <p className="text-sm text-destructive">{error}</p>}

                  <Button type="submit" variant="hero" size="lg" disabled={status === "sending"} className="w-full sm:w-auto">
                    <Send className="w-4 h-4" />
                    {status === "sending" ? "Sending…" : "Share our letter"}
                  </Button>
                </form>
              </>
            )}
          </div>
        </section>

        {/* ── Gallery ── */}
        <section className="py-16 md:py-24 bg-secondary/30">
          <div className="container px-6 max-w-4xl mx-auto">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3 text-center">
              Letters from the Workshop
            </h2>
            <p className="text-muted-foreground text-center max-w-lg mx-auto mb-10">
              Real letters to the Tooth Fairy, shared by families and reviewed by us.
            </p>

            {galleryLoading ? (
              <p className="text-center text-muted-foreground">Gathering letters…</p>
            ) : letters.length === 0 ? (
              <div>
                <p className="text-center text-muted-foreground max-w-md mx-auto mb-8">
                  Real letters from families will appear here once shared. Here are
                  a few examples to spark ideas - yours could be next.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {EXAMPLE_LETTERS.map((l, i) => (
                    <figure key={i} className="magical-card flex flex-col">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="inline-block text-xs font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                          {l.quality}
                        </span>
                        <span className="inline-block text-[10px] font-semibold uppercase tracking-wide text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                          Example
                        </span>
                      </div>
                      <blockquote className="text-foreground/80 leading-relaxed flex-1">
                        &ldquo;{l.body}&rdquo;
                      </blockquote>
                      <figcaption className="text-sm text-muted-foreground italic mt-3">— {l.name}</figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-4">
                {letters.map((l) => (
                  <figure key={l.id} className="magical-card flex flex-col">
                    <span className="inline-block self-start text-xs font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-full mb-3">
                      {l.quality}
                    </span>
                    <blockquote className="text-foreground/80 leading-relaxed flex-1">
                      &ldquo;{l.letter_body}&rdquo;
                    </blockquote>
                    <figcaption className="text-sm text-muted-foreground italic mt-3">
                      — {l.child_first_name || "Anonymous"}
                    </figcaption>
                  </figure>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ── Cross-links ── */}
        <section className="py-16 md:py-20 bg-background">
          <div className="container px-6 max-w-3xl mx-auto">
            <h2 className="font-display text-xl font-bold text-foreground mb-6 text-center">
              More from the Workshop
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { to: "/tooth-fairy-letter", label: "Free Printable Tooth Fairy Letter", desc: "A letter from the Tooth Fairy to leave under the pillow." },
                { to: "/is-the-tooth-fairy-real", label: "Is the Tooth Fairy Real?", desc: "The honest, magical answer." },
                { to: "/what-does-the-tooth-fairy-do-with-teeth", label: "What Does She Do With Teeth?", desc: "Inside the Tooth Fairy's workshop." },
                { to: "/watch", label: "Watch the Short Film", desc: "See the Tooth Fairy's world come to life." },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => trackEvent("explore_click", { page: link.to, source: "letters" })}
                  className="magical-card group hover:shadow-magical transition-all duration-300 hover:-translate-y-0.5"
                >
                  <p className="font-display font-semibold text-foreground group-hover:text-primary transition-colors mb-1">{link.label}</p>
                  <p className="text-sm text-muted-foreground">{link.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-16 md:py-20 bg-secondary/30">
          <div className="container px-6 max-w-2xl mx-auto">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
              Questions about writing to the Tooth Fairy
            </h2>
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="magical-card border-0 data-[state=open]:shadow-magical transition-shadow">
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
      </main>

      <Footer />
    </div>
  );
};

export default LettersToTheToothFairy;
