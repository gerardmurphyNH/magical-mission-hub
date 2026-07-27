import { useRef, useState } from "react";
import { Download, Share2, Copy, Check } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

interface ShareableLetterCardProps {
  quality: string;
  letterBody: string;
  childFirstName?: string;
}

const SITE = "wigglytoothworkshop.com";
const HANDLE = "@wigglytoothworkshop";
const CAPTION = `Our letter to the Tooth Fairy 💫 What's the quality in your child's tooth? Share yours at ${SITE} ${HANDLE} #ToothFairy #WigglyToothWorkshop #ToothFairyLetter`;

/**
 * Renders a square, social-ready "letter to the Tooth Fairy" card and lets the
 * user download / share it. The site URL + handle are baked into the image
 * itself (the durable "tag", since Instagram strips links/captions from web
 * shares). Colors and fonts are self-contained so the exported PNG is faithful
 * regardless of the visitor's device or whether web fonts embed.
 */
const ShareableLetterCard = ({ quality, letterBody, childFirstName }: ShareableLetterCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const name = (childFirstName || "").trim() || "Anonymous";
  // Keep the card readable — long letters get gently trimmed for the image only.
  const shown = letterBody.trim().length > 320 ? letterBody.trim().slice(0, 317).trimEnd() + "…" : letterBody.trim();

  const render = async (): Promise<string | null> => {
    const node = cardRef.current;
    if (!node) return null;
    // Dynamic import keeps html-to-image out of the initial bundle.
    const { toPng } = await import("html-to-image");
    // Normalise the export to ~1080px wide regardless of on-screen size.
    const pixelRatio = Math.max(1, 1080 / node.offsetWidth);
    return toPng(node, { pixelRatio, cacheBust: true, backgroundColor: "#191633" });
  };

  const handleDownload = async () => {
    setError(null);
    setBusy(true);
    try {
      const dataUrl = await render();
      if (!dataUrl) return;
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = "letter-to-the-tooth-fairy.png";
      a.click();
      trackEvent("letter_card_download", { quality });
    } catch {
      setError("Couldn't make the image. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  const handleShare = async () => {
    setError(null);
    setBusy(true);
    try {
      const dataUrl = await render();
      if (!dataUrl) return;
      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], "letter-to-the-tooth-fairy.png", { type: "image/png" });
      const nav = navigator as Navigator & { canShare?: (d: ShareData) => boolean };
      if (nav.canShare && nav.canShare({ files: [file] })) {
        await nav.share({ files: [file], text: CAPTION });
        trackEvent("letter_card_share", { quality });
      } else {
        // Fallback: no native share — download instead.
        await handleDownload();
      }
    } catch {
      /* user cancelled share — ignore */
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
        {/* subtle stars */}
        {[
          [12, 18], [82, 12], [68, 30], [26, 72], [90, 66], [46, 88], [8, 54],
        ].map(([l, t], i) => (
          <span
            key={i}
            style={{
              position: "absolute",
              left: `${l}%`,
              top: `${t}%`,
              width: 3,
              height: 3,
              borderRadius: "9999px",
              background: "#FBBF24",
              opacity: 0.7,
            }}
          />
        ))}

        <div style={{ position: "relative", zIndex: 1 }}>
          <p style={{ fontSize: 13, letterSpacing: 2, textTransform: "uppercase", color: "#C9C2F0", margin: 0 }}>
            A Letter to the Tooth Fairy
          </p>
        </div>

        <div style={{ position: "relative", zIndex: 1 }}>
          <p style={{ fontSize: 19, lineHeight: 1.5, margin: "0 0 18px", color: "#F5F3FF" }}>
            &ldquo;{shown}&rdquo;
          </p>
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
          onClick={handleShare}
          disabled={busy}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          <Share2 className="w-4 h-4" />
          {busy ? "Preparing…" : "Share"}
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
      <p className="text-xs text-muted-foreground text-center max-w-xs">
        Tip: on Instagram, post the image and paste the caption. Tag {HANDLE} and
        we may reshare your letter on our page.
      </p>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
};

export default ShareableLetterCard;
