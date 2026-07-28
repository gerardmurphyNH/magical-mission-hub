import { useRef, useState } from "react";
import { Download, FileText, Image as ImageIcon } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import type { LetterType } from "@/lib/letters";

interface LetterheadGeneratorProps {
  letterType: LetterType;
  letterBody: string;
  childFirstName?: string;
}

const MASTHEAD: Record<LetterType, string> = {
  to: "To the Tooth Fairy",
  from: "From the Tooth Fairy",
};

/**
 * Renders a portrait, print-ready letterhead (8.5x11 aspect) and lets the
 * parent download it as a PDF or JPG. Built the same way as ShareableLetterCard
 * — an HTML template captured with html-to-image — but the PDF is produced by
 * embedding that same high-resolution capture into a single jsPDF page sized
 * to a US Letter sheet, so what prints matches what's on screen exactly.
 */
const LetterheadGenerator = ({ letterType, letterBody, childFirstName }: LetterheadGeneratorProps) => {
  const pageRef = useRef<HTMLDivElement>(null);
  const [busy, setBusy] = useState<"pdf" | "jpg" | null>(null);
  const [error, setError] = useState<string | null>(null);

  const paragraphs = letterBody.split(/\n\n+/).map((p) => p.trim()).filter(Boolean);
  const today = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  const renderPng = async (): Promise<string | null> => {
    const node = pageRef.current;
    if (!node) return null;
    const { toPng } = await import("html-to-image");
    // 2x the on-screen width gets us a crisp ~1700px-wide print-resolution capture.
    const pixelRatio = Math.max(2, 1700 / node.offsetWidth);
    return toPng(node, { pixelRatio, cacheBust: true, backgroundColor: "#FBF9FF" });
  };

  const handleDownloadJpg = async () => {
    setError(null);
    setBusy("jpg");
    try {
      const dataUrl = await renderPng();
      if (!dataUrl) return;
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `letter-${letterType}-the-tooth-fairy.png`;
      a.click();
      trackEvent("letterhead_download", { letter_type: letterType, file_type: "image" });
    } catch {
      setError("Couldn't create the image. Please try again.");
    } finally {
      setBusy(null);
    }
  };

  const handleDownloadPdf = async () => {
    setError(null);
    setBusy("pdf");
    try {
      const dataUrl = await renderPng();
      if (!dataUrl) return;
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF({ orientation: "portrait", unit: "in", format: "letter" });
      const img = new Image();
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("image load failed"));
        img.src = dataUrl;
      });
      // Fit the capture to a full 8.5x11 page, preserving aspect ratio.
      const pageW = 8.5, pageH = 11;
      const imgRatio = img.width / img.height;
      let w = pageW, h = pageW / imgRatio;
      if (h > pageH) { h = pageH; w = pageH * imgRatio; }
      const x = (pageW - w) / 2, y = (pageH - h) / 2;
      doc.addImage(dataUrl, "PNG", x, y, w, h);
      doc.save(`letter-${letterType}-the-tooth-fairy.pdf`);
      trackEvent("letterhead_download", { letter_type: letterType, file_type: "pdf" });
    } catch {
      setError("Couldn't create the PDF. Please try again.");
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="flex flex-col items-center gap-5">
      {/* The letterhead (captured to PNG/PDF) */}
      <div
        ref={pageRef}
        className="relative w-full max-w-[480px] overflow-hidden"
        style={{ aspectRatio: "8.5 / 11", background: "#FBF9FF", fontFamily: "Georgia, 'Times New Roman', serif" }}
      >
        {/* Decorative double border */}
        <div style={{ position: "absolute", inset: 18, border: "2px solid #C9A227", pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 24, border: "1px solid #D9C68A", pointerEvents: "none" }} />

        {/* subtle stars in the margin */}
        {[[6, 8], [94, 10], [6, 92], [94, 90], [50, 5]].map(([l, t], i) => (
          <span key={i} style={{ position: "absolute", left: `${l}%`, top: `${t}%`, fontSize: 14, color: "#C9A227" }}>✦</span>
        ))}

        <div className="relative h-full flex flex-col" style={{ padding: "56px 46px 40px" }}>
          <p style={{ textAlign: "center", fontSize: 12, letterSpacing: 3, textTransform: "uppercase", color: "#8B6F1A", marginBottom: 6 }}>
            ✨ {MASTHEAD[letterType]} ✨
          </p>
          <div style={{ borderBottom: "1px solid #D9C68A", margin: "0 auto 28px", width: "60%" }} />

          <div className="flex-1" style={{ color: "#2A2540", fontSize: 15, lineHeight: 1.85 }}>
            {paragraphs.map((p, i) => (
              <p key={i} style={{ margin: "0 0 16px" }}>{p}</p>
            ))}
          </div>

          <div style={{ borderTop: "1px solid #D9C68A", paddingTop: 12, display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <span style={{ fontSize: 10, color: "#8B6F1A", fontFamily: "system-ui, sans-serif" }}>wigglytoothworkshop.com</span>
            <span style={{ fontSize: 10, color: "#8B6F1A", fontFamily: "system-ui, sans-serif" }}>{today}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={handleDownloadPdf}
          disabled={busy !== null}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          <FileText className="w-4 h-4" />
          {busy === "pdf" ? "Preparing…" : "Download PDF"}
        </button>
        <button
          type="button"
          onClick={handleDownloadJpg}
          disabled={busy !== null}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          <ImageIcon className="w-4 h-4" />
          {busy === "jpg" ? "Preparing…" : "Download Image"}
        </button>
      </div>
      <p className="text-xs text-muted-foreground text-center max-w-xs">
        Print at home on standard letter paper{childFirstName ? ` for ${childFirstName}` : ""}, or keep the digital copy as a keepsake.
      </p>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
};

export default LetterheadGenerator;
