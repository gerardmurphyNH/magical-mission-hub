import { useRef, useState } from "react";
import { Download, Copy, Check } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

interface ShareableLetterCardProps {
  quality: string;
  letterBody: string;
  childFirstName?: string;
}

const SITE = "wigglytoothworkshop.com";
const HANDLE = "@wigglytoothworkshop";
const PAGE_URL = "https://wigglytoothworkshop.com/letters-to-the-tooth-fairy";
const CAPTION = `Our letter to the Tooth Fairy 💫 What's the quality in your child's tooth? Share yours at ${SITE} ${HANDLE} #ToothFairy #WigglyToothWorkshop #ToothFairyLetter`;

const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
  </svg>
);
const FacebookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z" />
  </svg>
);

/**
 * Renders a square, social-ready "letter to the Tooth Fairy" card and lets the
 * user post it. The site URL + handle are baked into the image itself (the
 * durable "tag", since Instagram strips links/captions from web shares).
 *
 * Sharing reality: on mobile the Web Share API hands the actual image to the
 * native sheet, where Instagram and Facebook appear as targets — the real way
 * to post from the web. Instagram has no web-post API, so on desktop we save
 * the image and tell the user to post it in the app; Facebook on desktop falls
 * back to a link share of this page.
 */
const ShareableLetterCard = ({ quality, letterBody, childFirstName }: ShareableLetterCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);
  const [note, setNote] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const name = (childFirstName || "").trim() || "Anonymous";
  const shown = letterBody.trim().length > 320 ? letterBody.trim().slice(0, 317).trimEnd() + "…" : letterBody.trim();

  const render = async (): Promise<string | null> => {
    const node = cardRef.current;
    if (!node) return null;
    const { toPng } = await import("html-to-image");
    const pixelRatio = Math.max(1, 1080 / node.offsetWidth);
    return toPng(node, { pixelRatio, cacheBust: true, backgroundColor: "#191633" });
  };

  const toFile = async (dataUrl: string): Promise<File> => {
    const blob = await (await fetch(dataUrl)).blob();
    return new File([blob], "letter-to-the-tooth-fairy.png", { type: "image/png" });
  };

  const download = (dataUrl: string) => {
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = "letter-to-the-tooth-fairy.png";
    a.click();
  };

  const canShareFiles = (file: File) => {
    const nav = navigator as Navigator & { canShare?: (d: ShareData) => boolean };
    return !!nav.canShare && nav.canShare({ files: [file] });
  };

  const handleInstagram = async () => {
    setError(null); setNote(null); setBusy(true);
    try {
      const dataUrl = await render();
      if (!dataUrl) return;
      const file = await toFile(dataUrl);
      if (canShareFiles(file)) {
        await (navigator as Navigator).share({ files: [file], text: CAPTION });
        trackEvent("letter_card_share", { quality, platform: "instagram" });
      } else {
        download(dataUrl);
        await navigator.clipboard?.writeText(CAPTION).catch(() => {});
        setNote("Image saved and caption copied. Open Instagram, add the image, and paste the caption to post.");
        trackEvent("letter_card_download", { quality, platform: "instagram" });
      }
    } catch {
      /* share cancelled */
    } finally {
      setBusy(false);
    }
  };

  const handleFacebook = async () => {
    setError(null); setNote(null); setBusy(true);
    try {
      const dataUrl = await render();
      if (!dataUrl) return;
      const file = await toFile(dataUrl);
      if (canShareFiles(file)) {
        await (navigator as Navigator).share({ files: [file], text: CAPTION });
        trackEvent("letter_card_share", { quality, platform: "facebook" });
      } else {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(PAGE_URL)}`, "_blank", "noopener,noreferrer");
        setNote("We opened Facebook to share this page. To post your card image, download it and attach it to the post.");
        trackEvent("letter_card_share", { quality, platform: "facebook_link" });
      }
    } catch {
      /* cancelled */
    } finally {
      setBusy(false);
    }
  };

  const handleDownload = async () => {
    setError(null); setNote(null); setBusy(true);
    try {
      const dataUrl = await render();
      if (!dataUrl) return;
      download(dataUrl);
      trackEvent("letter_card_download", { quality });
    } catch {
      setError("Couldn't make the image. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  const handleCopyCaption = async () => {
    try {
      await navigator.clipboard.writeText(CAPTION);
      setCopied(true);
      trackEvent("letter_caption_copy", { quality });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError("Couldn't copy. You can select the caption manually.");
    }
  };

  return (
    <div className="flex flex-col items-center gap-5">
      {/* The card (captured to PNG) */}
      <div
        ref={cardRef}
        className="relative w-full max-w-[400px] aspect-square overflow-hidden flex flex-col justify-between"
        style={{
          background: "linear-gradient(160deg, #221d45 0%, #191633 55%, #12102a 100%)",
          padding: "40px 36px",
          fontFamily: "Georgia, 'Times New Roman', serif",
          color: "#F5F3FF",
        }}
      >
        {[[12, 18], [82, 12], [68, 30], [26, 72], [90, 66], [46, 88], [8, 54]].map(([l, t], i) => (
          <span key={i} style={{ position: "absolute", left: `${l}%`, top: `${t}%`, width: 3, height: 3, borderRadius: "9999px", background: "#FBBF24", opacity: 0.7 }} />
        ))}

        <div style={{ position: "relative", zIndex: 1 }}>
          <p style={{ fontSize: 13, letterSpacing: 2, textTransform: "uppercase", color: "#C9C2F0", margin: 0 }}>
            A Letter to the Tooth Fairy
          </p>
        </div>

        <div style={{ position: "relative", zIndex: 1 }}>
          <p style={{ fontSize: 19, lineHeight: 1.5, margin: "0 0 18px", color: "#F5F3FF" }}>&ldquo;{shown}&rdquo;</p>
          <div style={{ display: "inline-block", background: "rgba(251,191,36,0.16)", border: "1px solid rgba(251,191,36,0.5)", borderRadius: 9999, padding: "5px 14px" }}>
            <span style={{ fontSize: 13, color: "#FBBF24", fontFamily: "system-ui, sans-serif", fontWeight: 600 }}>
              The quality in my tooth: {quality}
            </span>
          </div>
          <p style={{ fontSize: 16, margin: "16px 0 0", color: "#C9C2F0", fontStyle: "italic" }}>— {name}</p>
        </div>

        <div style={{ position: "relative", zIndex: 1, display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: "system-ui, sans-serif" }}>
          <span style={{ fontSize: 13, color: "#F5F3FF", fontWeight: 600 }}>{SITE}</span>
          <span style={{ fontSize: 12, color: "#C9C2F0" }}>{HANDLE}</span>
        </div>
      </div>

      {/* Actions (not part of the image) */}
      <div className="flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={handleInstagram}
          disabled={busy}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          <InstagramIcon />
          {busy ? "Preparing…" : "Instagram"}
        </button>
        <button
          type="button"
          onClick={handleFacebook}
          disabled={busy}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1877F2] text-white text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          <FacebookIcon />
          Facebook
        </button>
        <button
          type="button"
          onClick={handleDownload}
          disabled={busy}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          <Download className="w-4 h-4" />
          Download
        </button>
        <button
          type="button"
          onClick={handleCopyCaption}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border text-foreground text-sm font-medium hover:bg-secondary/50 transition-colors"
        >
          {copied ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
          {copied ? "Copied!" : "Copy caption"}
        </button>
      </div>
      <p className="text-xs text-muted-foreground text-center max-w-sm">
        On a phone, tap Instagram or Facebook to post straight from the share
        menu. On a computer, download the image and post it in the app. Tag {HANDLE} and we may reshare your letter.
      </p>
      {note && <p className="text-sm text-foreground">{note}</p>}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
};

export default ShareableLetterCard;
