import { useEffect, useRef, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Sparkles, Send, Mail, HandHeart } from "lucide-react";
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
import LetterheadGenerator from "@/components/LetterheadGenerator";
import ShareableLetterCard from "@/components/ShareableLetterCard";
import { submitLetter, fetchApprovedLetters, type PublicLetter, type LetterType } from "@/lib/letters";
import { GOOGLE_SHEETS_ENDPOINT } from "@/lib/config";
import {
  trackEvent,
  trackCTAClick,
  trackLetterTypeSelect,
  trackLetterFormStart,
  trackLetterSubmitSuccess,
  trackLetterSubmitError,
  trackWorkshopJoinFromLetter,
} from "@/lib/analytics";

const PAGE_URL = "https://wigglytoothworkshop.com/letters-to-the-tooth-fairy";
const SITE_URL = "https://wigglytoothworkshop.com/";

const QUALITIES = [
  "Bravery", "Kindness", "Creativity", "Patience", "Curiosity",
  "Generosity", "Honesty", "Perseverance", "Joy",
];

// Examples for the hardest blanks — shown as clickable chips, not required reading.
const REASON_EXAMPLES = [
  "I was really scared but I did it anyway",
  "I always help my little brother or sister",
  "I love making up new games and stories",
  "I waited so patiently even when it was hard",
  "I was honest even when it wasn't easy",
];
const HELP_CAUSE_EXAMPLES = [
  "someone who's feeling nervous about something new",
  "a kid who needs a friend",
  "someone who wants to try something creative",
  "someone who's having a hard day",
  "someone far away who needs a little hope",
];
const FAIRY_ACTION_EXAMPLES = [
  "a shy kid find the courage to raise their hand",
  "someone reach out and make a new friend",
  "a tired grown-up find a spark of imagination",
  "someone keep trying instead of giving up",
  "someone who needed a little hope find some",
];

// Builds the CORE story only — no name, ever. This is what's stored and shown
// on the public wall, so a child's name can never leak through the prose itself.
const buildAnonymizedBody = (type: LetterType, quality: string, reason: string, helpText: string): string =>
  type === "to"
    ? `I lost a tooth today. I think the quality inside it is ${quality} - because ${reason}. Please use it to help ${helpText}. I hope it does some good in the world.`
    : `Thank you for the tooth - I found it safely. When I looked closely, I saw the quality growing inside it: ${quality}. That's exactly what the world needs more of, so I used a little of it to help ${helpText} - a small spark, passed along. I left a little something behind. Not to buy the tooth, but to say thank you, and to keep the good going.`;

// Builds the full, personal letter with greeting + signature — used ONLY for the
// client-side printable letterhead, never stored or shown on the public wall.
const buildPersonalBody = (
  type: LetterType, name: string, cityState: string, quality: string, reason: string, helpText: string,
): string => {
  const who = name || "a curious kid";
  if (type === "to") {
    const from = cityState ? `, and I'm from ${cityState}` : "";
    return `Dear Tooth Fairy,\n\nI lost a tooth today. My name is ${who}${from}.\n\nI think the quality inside my tooth is ${quality} - because ${reason}.\n\nPlease use my tooth to help ${helpText}.\n\nI hope it does some good in the world.\n\nLove,\n${who}`;
  }
  return `Dear ${who},\n\nThank you for the tooth - I found it safely last night.\n\nWhen I looked closely, I saw the quality growing inside it: ${quality}. That's exactly what the world needs more of, so I used a little of it to help ${helpText} - a small spark, passed along.\n\nI left a little something under your pillow. Not to buy your tooth, but to say thank you, and to help keep the good going.\n\nKeep brushing, keep growing the good inside you, and let's see what good this can do.\n\nWith love,\nThe Tooth Fairy`;
};

// Example wall entries shown until real, moderated submissions arrive.
const EXAMPLE_LETTERS: { letterType: LetterType; quality: string; cityState?: string; body: string }[] = [
  { letterType: "to", quality: "Bravery", cityState: "Nashua, NH", body: buildAnonymizedBody("to", "bravery", "I lost my tooth at school and wasn't even scared", "someone who feels nervous") },
  { letterType: "to", quality: "Kindness", cityState: "Dedham, MA", body: buildAnonymizedBody("to", "kindness", "I helped my little sister when she was sad", "someone who needs a friend today") },
  { letterType: "from", quality: "Perseverance", body: buildAnonymizedBody("from", "perseverance", "", "someone keep trying instead of giving up") },
  { letterType: "to", quality: "Curiosity", cityState: "Portland, ME", body: buildAnonymizedBody("to", "curiosity", "I always ask a hundred questions", "someone who wants to learn something new") },
];

const faqs = [
  {
    question: "What do I get for writing a letter?",
    answer:
      "A beautifully designed keepsake letter you can download as a PDF or image, print at home, or turn into a card for social media - plus, if you'd like, a spot (anonymously) on our public Wall of Stories. It only takes a minute to fill in the blanks.",
  },
  {
    question: "What's the difference between a letter TO and FROM the Tooth Fairy?",
    answer:
      "A letter TO the Tooth Fairy is your child explaining the quality inside their tooth and how they hope she'll use it. A letter FROM the Tooth Fairy is her heartfelt reply - thanking your child and telling them what good their tooth did in the world. Many families do both.",
  },
  {
    question: "How do I write a letter to the Tooth Fairy?",
    answer:
      "Choose 'Write TO the Tooth Fairy' above, then fill in a few blanks: the quality in your child's tooth, why it's there, and how you hope the Tooth Fairy will use it. We'll turn it into a printable letter automatically.",
  },
  {
    question: "Can my child get a reply from the Tooth Fairy?",
    answer:
      "Yes - that's exactly what the 'Write FROM the Tooth Fairy' generator makes: her reply, thanking your child and explaining how their tooth's quality helped the world. Print it and leave it under the pillow.",
  },
  {
    question: "Will our letter be shared publicly?",
    answer:
      "Only if you choose to. You can add your story (always anonymously - we never publish a name) to our Wall of Stories, and separately opt in to let us feature your child's first name and city on our own social media. Both are optional and reviewed by a person before anything goes live.",
  },
  {
    question: "What is the Tooth Fairy's email address or phone number?",
    answer:
      "The Tooth Fairy doesn't have an email address or a phone number - there's no inbox to write to and no number to call. That's by design: she works quietly, at night. The way to reach her is a letter, the way children always have.",
  },
  {
    question: "How do you contact the Tooth Fairy?",
    answer:
      "You write her a letter. It's the preferred - and really the only - way to contact the Tooth Fairy. Use the generator above to write one in a minute, or print our free Tooth Fairy letter template for her to answer under the pillow.",
  },
];

const LettersToTheToothFairy = () => {
  const [letterType, setLetterType] = useState<LetterType | null>(null);
  const [quality, setQuality] = useState("");
  const [customQuality, setCustomQuality] = useState("");
  const [useCustom, setUseCustom] = useState(false);
  const [reason, setReason] = useState("");
  const [helpText, setHelpText] = useState("");
  const [firstName, setFirstName] = useState("");
  const [cityState, setCityState] = useState("");
  const [email, setEmail] = useState("");
  const [joinMailingList, setJoinMailingList] = useState(true);
  const [consent, setConsent] = useState(false);
  const [wallOptIn, setWallOptIn] = useState(true);
  const [socialFeatureConsent, setSocialFeatureConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<{ personalBody: string; quality: string; reason: string; helpText: string; firstName: string; cityState: string } | null>(null);
  const mountedAt = useRef(Date.now());
  const hasStartedForm = useRef(false);

  const [letters, setLetters] = useState<PublicLetter[]>([]);
  const [galleryLoading, setGalleryLoading] = useState(true);

  useEffect(() => {
    fetchApprovedLetters()
      .then(setLetters)
      .catch(() => setLetters([]))
      .finally(() => setGalleryLoading(false));
  }, []);

  const resolvedQuality = (useCustom ? customQuality : quality).trim();

  const chooseType = (type: LetterType) => {
    setLetterType(type);
    trackLetterTypeSelect(type);
    setTimeout(() => document.getElementById("write")?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  };

  const onFieldFocus = () => {
    if (!hasStartedForm.current && letterType) {
      hasStartedForm.current = true;
      trackLetterFormStart(letterType);
    }
  };

  const resetForm = () => {
    setLetterType(null);
    setQuality(""); setCustomQuality(""); setUseCustom(false);
    setReason(""); setHelpText(""); setFirstName(""); setCityState("");
    setEmail(""); setJoinMailingList(true); setConsent(false);
    setWallOptIn(true); setSocialFeatureConsent(false);
    setSubmitted(null); setStatus("idle"); setError(null);
    hasStartedForm.current = false;
    mountedAt.current = Date.now();
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!letterType) return;

    if (!resolvedQuality) return setError("Please choose or type the quality in the tooth.");
    if (helpText.trim().length < 4) {
      return setError(letterType === "to" ? "Please fill in how you'd like the Tooth Fairy to use it." : "Please fill in what the Tooth Fairy used it to help.");
    }
    if (letterType === "to" && reason.trim().length < 2) return setError("Please fill in why this quality is there.");
    if (!consent) return setError("Please confirm you're a parent or guardian sharing on your child's behalf.");
    if (Date.now() - mountedAt.current < 2500) return setError("Please take a moment to fill in your letter.");

    setStatus("sending");
    try {
      const anonymizedBody = buildAnonymizedBody(letterType, resolvedQuality, reason.trim(), helpText.trim());
      await submitLetter({
        letterType,
        letterBody: anonymizedBody,
        quality: resolvedQuality,
        reason: letterType === "to" ? reason.trim() : undefined,
        helpCause: letterType === "to" ? helpText.trim() : undefined,
        fairyAction: letterType === "from" ? helpText.trim() : undefined,
        childFirstName: firstName,
        cityState,
        parentEmail: email,
        parentConsent: consent,
        wallOptIn,
        socialFeatureConsent,
        honeypot,
      });

      // Optional: join the existing Workshop mailing list (separate from the Supabase submission)
      if (email && joinMailingList) {
        try {
          const params = new URLSearchParams({
            email, firstName: firstName || "", virtue: resolvedQuality,
            source: "letters_page", timestamp: new Date().toISOString(),
          });
          await fetch(`${GOOGLE_SHEETS_ENDPOINT}?${params.toString()}`, { method: "GET", mode: "no-cors" });
          trackWorkshopJoinFromLetter();
        } catch {
          /* non-fatal — the letter itself still submitted successfully */
        }
      }

      trackLetterSubmitSuccess(letterType, resolvedQuality);
      setSubmitted({
        personalBody: buildPersonalBody(letterType, firstName.trim(), cityState.trim(), resolvedQuality, reason.trim(), helpText.trim()),
        quality: resolvedQuality, reason: reason.trim(), helpText: helpText.trim(),
        firstName: firstName.trim(), cityState: cityState.trim(),
      });
      setStatus("done");
    } catch {
      trackLetterSubmitError(letterType, "submit_failed");
      setStatus("idle");
      setError("Something went wrong sending your letter. Please try again in a moment.");
    }
  };

  const exampleChips = (options: string[], onPick: (v: string) => void) => (
    <div className="flex flex-wrap gap-2 mt-2">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onPick(opt)}
          className="text-xs px-2.5 py-1 rounded-full border border-border text-muted-foreground hover:border-primary/50 hover:text-foreground transition-colors text-left"
        >
          {opt}
        </button>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <PageSeo
        title="Letters to the Tooth Fairy: Write & Contact Her | Wiggly Tooth Workshop"
        description="Fill in a few blanks and get a beautiful keepsake letter to or from the Tooth Fairy - free to print, save, or share. The real way to contact her."
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
        {/* ── Hero: value prop first ── */}
        <section className="night-sky-section py-20 md:py-28 relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 18 }, (_, i) => (
              <div key={i} className="absolute w-1 h-1 bg-starlight rounded-full sparkle"
                style={{ left: `${(i * 17 + 7) % 100}%`, top: `${(i * 23 + 11) % 85}%`, animationDelay: `${(i * 0.15) % 2}s` }} />
            ))}
          </div>
          <div className="container px-6 relative z-10 max-w-2xl mx-auto text-center">
            <Link to="/" className="inline-flex items-center gap-2 text-starlight/70 hover:text-starlight transition-colors text-sm mb-10">
              <ArrowLeft className="w-4 h-4" /> Wiggly Tooth Workshop
            </Link>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-starlight mb-5 leading-tight">
              Turn a Lost Tooth Into a <span className="text-primary">Story Worth Keeping</span>
            </h1>
            <p className="text-starlight/80 text-lg leading-relaxed max-w-xl mx-auto">
              Fill in a few blanks and we'll turn them into a beautifully designed
              keepsake letter - to print, save, or share - while teaching the
              tradition behind every lost tooth.
            </p>
            <div className="mt-8">
              <Button variant="hero" size="lg" asChild>
                <a href="#write" onClick={() => trackCTAClick("letters_hero")}>
                  <Sparkles className="w-5 h-5" /> Write your letter
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* ── What you get ── */}
        <section className="py-14 md:py-16 bg-background">
          <div className="container px-6 max-w-3xl mx-auto">
            <div className="grid sm:grid-cols-3 gap-6 text-center">
              {[
                { n: "1", t: "Answer a few blanks", d: "The quality in the tooth, and how it should help the world. Takes about a minute." },
                { n: "2", t: "Get a keepsake letter", d: "A beautifully designed letter, ready to print, save as an image, or keep forever." },
                { n: "3", t: "Share the story", d: "Post it to social media, or add it - anonymously - to our Wall of Stories." },
              ].map((s) => (
                <div key={s.n}>
                  <div className="w-9 h-9 rounded-full bg-primary/10 text-primary font-display font-bold flex items-center justify-center mx-auto mb-3">{s.n}</div>
                  <p className="font-display font-semibold text-foreground mb-1">{s.t}</p>
                  <p className="text-sm text-muted-foreground">{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Chooser or form ── */}
        <section id="write" className="py-16 md:py-20 bg-secondary/30 scroll-mt-20">
          <div className="container px-6 max-w-2xl mx-auto">
            {status === "done" && submitted ? (
              <div className="text-center">
                <Sparkles className="w-8 h-8 text-primary mx-auto mb-4" />
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">Your letter is ready</h2>
                <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto mb-10">
                  A person at the Workshop reviews every story before it appears on
                  the Wall. In the meantime, here's your printable letter, and a
                  card you can share.
                </p>

                <p className="font-display font-semibold text-foreground mb-4">Your keepsake letter</p>
                <LetterheadGenerator
                  letterType={letterType!}
                  letterBody={submitted.personalBody}
                  childFirstName={submitted.firstName}
                />

                <p className="font-display font-semibold text-foreground mt-12 mb-4">Share the story</p>
                <ShareableLetterCard
                  letterType={letterType!}
                  quality={submitted.quality}
                  reason={submitted.reason}
                  helpText={submitted.helpText}
                  childFirstName={submitted.firstName}
                  cityState={submitted.cityState}
                />

                <button type="button" onClick={resetForm} className="mt-10 text-sm text-primary hover:underline">
                  Write another letter
                </button>
              </div>
            ) : !letterType ? (
              <>
                <div className="text-center mb-10">
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">Choose your letter</h2>
                  <p className="text-muted-foreground max-w-lg mx-auto">Many families write both.</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <button type="button" onClick={() => chooseType("to")} className="magical-card text-left hover:shadow-magical hover:-translate-y-0.5 transition-all">
                    <Mail className="w-6 h-6 text-primary mb-3" />
                    <p className="font-display font-bold text-lg text-foreground mb-1">Write TO the Tooth Fairy</p>
                    <p className="text-sm text-muted-foreground">Tell her what quality is inside the tooth, and how you hope she'll use it.</p>
                  </button>
                  <button type="button" onClick={() => chooseType("from")} className="magical-card text-left hover:shadow-magical hover:-translate-y-0.5 transition-all">
                    <HandHeart className="w-6 h-6 text-primary mb-3" />
                    <p className="font-display font-bold text-lg text-foreground mb-1">Write FROM the Tooth Fairy</p>
                    <p className="text-sm text-muted-foreground">Generate her reply - thanking your child and telling them how their tooth helped the world.</p>
                  </button>
                </div>
              </>
            ) : (
              <>
                <button type="button" onClick={() => setLetterType(null)} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
                  <ArrowLeft className="w-4 h-4" /> Choose a different letter
                </button>
                <div className="text-center mb-10">
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
                    {letterType === "to" ? "Write TO the Tooth Fairy" : "Write FROM the Tooth Fairy"}
                  </h2>
                  <p className="text-muted-foreground max-w-lg mx-auto">
                    {letterType === "to"
                      ? "A parent or guardian fills this in on their child's behalf."
                      : "Fill this in as the Tooth Fairy's reply to your child."}
                  </p>
                </div>

                <form onSubmit={handleSubmit} onFocus={onFieldFocus} className="space-y-6">
                  <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }} />

                  <div>
                    <label className="block font-display font-semibold text-foreground mb-3">
                      What quality is in the tooth?
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {QUALITIES.map((q) => (
                        <button type="button" key={q} onClick={() => { setQuality(q); setUseCustom(false); }}
                          className={`px-3.5 py-1.5 rounded-full text-sm font-medium border transition-colors ${!useCustom && quality === q ? "bg-primary text-primary-foreground border-primary" : "bg-background text-foreground border-border hover:border-primary/50"}`}>
                          {q}
                        </button>
                      ))}
                      <button type="button" onClick={() => setUseCustom(true)}
                        className={`px-3.5 py-1.5 rounded-full text-sm font-medium border transition-colors ${useCustom ? "bg-primary text-primary-foreground border-primary" : "bg-background text-foreground border-border hover:border-primary/50"}`}>
                        Something else
                      </button>
                    </div>
                    {useCustom && (
                      <input type="text" value={customQuality} onChange={(e) => setCustomQuality(e.target.value)} maxLength={60}
                        placeholder="e.g. Wonder, Gratitude, Courage…"
                        className="mt-3 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary" />
                    )}
                  </div>

                  {letterType === "to" && (
                    <div>
                      <label htmlFor="reason" className="block font-display font-semibold text-foreground mb-2">
                        Because…
                      </label>
                      <textarea id="reason" value={reason} onChange={(e) => setReason(e.target.value)} rows={2} maxLength={300}
                        placeholder="Why is this quality inside the tooth?"
                        className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary leading-relaxed" />
                      <p className="text-xs text-muted-foreground mt-1.5">Need an idea? Try one:</p>
                      {exampleChips(REASON_EXAMPLES, setReason)}
                    </div>
                  )}

                  <div>
                    <label htmlFor="helpText" className="block font-display font-semibold text-foreground mb-2">
                      {letterType === "to" ? "Please use my tooth to help…" : "The Tooth Fairy used it to help…"}
                    </label>
                    <textarea id="helpText" value={helpText} onChange={(e) => setHelpText(e.target.value)} rows={2} maxLength={300}
                      placeholder={letterType === "to" ? "How should the Tooth Fairy use this quality?" : "What good did she do with it?"}
                      className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary leading-relaxed" />
                    <p className="text-xs text-muted-foreground mt-1.5">Need an idea? Try one:</p>
                    {exampleChips(letterType === "to" ? HELP_CAUSE_EXAMPLES : FAIRY_ACTION_EXAMPLES, setHelpText)}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block font-display font-semibold text-foreground mb-2">
                        Child's first name <span className="font-normal text-muted-foreground text-sm">(optional)</span>
                      </label>
                      <input id="firstName" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} maxLength={40}
                        placeholder="For the printed letter"
                        className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary" />
                    </div>
                    <div>
                      <label htmlFor="cityState" className="block font-display font-semibold text-foreground mb-2">
                        City & state/country <span className="font-normal text-muted-foreground text-sm">(optional)</span>
                      </label>
                      <input id="cityState" type="text" value={cityState} onChange={(e) => setCityState(e.target.value)} maxLength={80}
                        placeholder="e.g. Dedham, MA or London, England"
                        className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block font-display font-semibold text-foreground mb-2">
                      Your email <span className="font-normal text-muted-foreground text-sm">(optional)</span>
                    </label>
                    <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                      placeholder="So we can let you know when your story is published"
                      className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary" />
                    <p className="text-xs text-muted-foreground mt-1">Never shown publicly.</p>
                    {email && (
                      <label className="flex items-center gap-2 mt-2 text-sm text-foreground/80 cursor-pointer">
                        <input type="checkbox" checked={joinMailingList} onChange={(e) => setJoinMailingList(e.target.checked)}
                          className="h-4 w-4 rounded border-border text-primary focus:ring-primary" />
                        Also join the Workshop mailing list for new stories and printables
                      </label>
                    )}
                  </div>

                  <div className="space-y-3 pt-2 border-t border-border">
                    <label className="flex items-start gap-3 text-sm text-foreground/80 leading-relaxed cursor-pointer">
                      <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)}
                        className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary" />
                      <span>
                        I'm the parent or legal guardian, and I'm sharing this on my
                        child's behalf, per the{" "}
                        <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link> and{" "}
                        <Link to="/terms" className="text-primary hover:underline">Terms</Link>.
                      </span>
                    </label>
                    <label className="flex items-start gap-3 text-sm text-foreground/80 leading-relaxed cursor-pointer">
                      <input type="checkbox" checked={wallOptIn} onChange={(e) => setWallOptIn(e.target.checked)}
                        className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary" />
                      <span>Add our story to the public Wall of Stories (shown anonymously - never a name)</span>
                    </label>
                    <label className="flex items-start gap-3 text-sm text-foreground/80 leading-relaxed cursor-pointer">
                      <input type="checkbox" checked={socialFeatureConsent} onChange={(e) => setSocialFeatureConsent(e.target.checked)}
                        className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary" />
                      <span>You may feature my child's first name and city on Wiggly Tooth Workshop's own social media</span>
                    </label>
                  </div>

                  {error && <p className="text-sm text-destructive">{error}</p>}

                  <Button type="submit" variant="hero" size="lg" disabled={status === "sending"} className="w-full sm:w-auto">
                    <Send className="w-4 h-4" /> {status === "sending" ? "Sending…" : "Create my letter"}
                  </Button>
                </form>
              </>
            )}
          </div>
        </section>

        {/* ── Wall of Stories ── */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container px-6 max-w-4xl mx-auto">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3 text-center">Wall of Stories</h2>
            <p className="text-muted-foreground text-center max-w-lg mx-auto mb-10">
              The good that teeth are doing in the world, shared anonymously by families.
            </p>

            {galleryLoading ? (
              <p className="text-center text-muted-foreground">Gathering stories…</p>
            ) : letters.length === 0 ? (
              <div>
                <p className="text-center text-muted-foreground max-w-md mx-auto mb-8">
                  Real stories will appear here once shared. Here are a few examples
                  to spark ideas - yours could be next.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {EXAMPLE_LETTERS.map((l, i) => (
                    <figure key={i} className="magical-card flex flex-col">
                      <div className="flex items-center gap-2 mb-3 flex-wrap">
                        <span className="inline-block text-xs font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-full">{l.quality}</span>
                        <span className="inline-block text-[10px] font-semibold uppercase tracking-wide text-muted-foreground bg-muted px-2 py-0.5 rounded-full">Example</span>
                      </div>
                      <blockquote className="text-foreground/80 leading-relaxed flex-1">&ldquo;{l.body}&rdquo;</blockquote>
                      {l.cityState && <figcaption className="text-sm text-muted-foreground italic mt-3">{l.cityState}</figcaption>}
                    </figure>
                  ))}
                </div>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-4">
                {letters.map((l) => (
                  <figure key={l.id} className="magical-card flex flex-col">
                    <span className="inline-block self-start text-xs font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-full mb-3">{l.quality}</span>
                    <blockquote className="text-foreground/80 leading-relaxed flex-1">&ldquo;{l.letter_body}&rdquo;</blockquote>
                    {l.city_state && <figcaption className="text-sm text-muted-foreground italic mt-3">{l.city_state}</figcaption>}
                  </figure>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ── Cross-links ── */}
        <section className="py-16 md:py-20 bg-secondary/30">
          <div className="container px-6 max-w-3xl mx-auto">
            <h2 className="font-display text-xl font-bold text-foreground mb-6 text-center">More from the Workshop</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { to: "/tooth-fairy-letter", label: "Free Printable Tooth Fairy Letter", desc: "A classic letter template to leave under the pillow." },
                { to: "/is-the-tooth-fairy-real", label: "Is the Tooth Fairy Real?", desc: "The honest, magical answer." },
                { to: "/what-does-the-tooth-fairy-do-with-teeth", label: "What Does She Do With Teeth?", desc: "Inside the Tooth Fairy's workshop." },
                { to: "/watch", label: "Watch the Short Film", desc: "See the Tooth Fairy's world come to life." },
              ].map((link) => (
                <Link key={link.to} to={link.to} onClick={() => trackEvent("explore_click", { page: link.to, source: "letters" })}
                  className="magical-card group hover:shadow-magical transition-all duration-300 hover:-translate-y-0.5">
                  <p className="font-display font-semibold text-foreground group-hover:text-primary transition-colors mb-1">{link.label}</p>
                  <p className="text-sm text-muted-foreground">{link.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-16 md:py-20 bg-background">
          <div className="container px-6 max-w-2xl mx-auto">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">Questions about writing to the Tooth Fairy</h2>
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="magical-card border-0 data-[state=open]:shadow-magical transition-shadow">
                  <AccordionTrigger className="text-left font-display font-semibold text-foreground hover:text-primary transition-colors hover:no-underline px-0">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pt-2">{faq.answer}</AccordionContent>
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
