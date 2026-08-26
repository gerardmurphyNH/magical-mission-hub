import { useState } from "react";
import { Sparkles, Gift, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CURRENCIES,
  type Currency,
  getRecommendedRange,
  deltaDentalReferenceRate,
  formatAmount,
  fetchToothFairyStats,
  submitToothFairyAmount,
  type SurveyStats,
} from "@/lib/toothFairySurvey";
import {
  trackCalculatorCalculate,
  trackCalculatorSurveySubmit,
  trackCalculatorSurveyError,
} from "@/lib/analytics";

type Phase = "form" | "result";
type SharePhase = "idle" | "submitting" | "done" | "skipped" | "error";

const ToothFairyCalculator = () => {
  const [phase, setPhase] = useState<Phase>("form");
  const [currency, setCurrency] = useState<Currency>("USD");
  const [isFirstTooth, setIsFirstTooth] = useState<boolean | null>(null);
  const [childAge, setChildAge] = useState("");

  const [sharePhase, setSharePhase] = useState<SharePhase>("idle");
  const [sharedAmount, setSharedAmount] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [stats, setStats] = useState<SurveyStats | null>(null);

  const parsedAge = childAge.trim() ? parseInt(childAge, 10) : undefined;
  const range =
    isFirstTooth === null
      ? null
      : getRecommendedRange(currency, Number.isFinite(parsedAge) ? parsedAge : undefined, isFirstTooth);
  const referenceRate = isFirstTooth === null ? null : deltaDentalReferenceRate(currency, isFirstTooth);

  const handleCalculate = () => {
    if (isFirstTooth === null) return;
    trackCalculatorCalculate(currency, isFirstTooth);
    setPhase("result");
  };

  const handleReset = () => {
    setPhase("form");
    setSharePhase("idle");
    setSharedAmount("");
    setStats(null);
  };

  const loadStats = async () => {
    if (isFirstTooth === null) return;
    try {
      const result = await fetchToothFairyStats(currency, isFirstTooth);
      setStats(result);
    } catch {
      // Non-critical - the share confirmation still stands without the aggregate.
    }
  };

  const handleShare = async () => {
    if (isFirstTooth === null) return;
    const amount = parseFloat(sharedAmount);
    if (!Number.isFinite(amount) || amount <= 0) {
      trackCalculatorSurveyError("invalid_amount");
      setSharePhase("error");
      return;
    }
    setSharePhase("submitting");
    try {
      const age = childAge.trim() ? parseInt(childAge, 10) : undefined;
      await submitToothFairyAmount({
        amount,
        currency,
        isFirstTooth,
        childAge: age !== undefined && Number.isFinite(age) ? age : undefined,
        honeypot,
      });
      trackCalculatorSurveySubmit(currency, isFirstTooth);
      await loadStats();
      setSharePhase("done");
    } catch {
      trackCalculatorSurveyError("submit_failed");
      setSharePhase("error");
    }
  };

  const handleSkip = async () => {
    setSharePhase("skipped");
    await loadStats();
  };

  return (
    <div className="magical-card p-6 md:p-8">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-primary" />
        <h2 className="font-display text-xl md:text-2xl font-bold text-foreground">
          Tooth Fairy Payout Calculator
        </h2>
      </div>

      {phase === "form" && (
        <div className="space-y-5">
          <p className="text-muted-foreground text-sm leading-relaxed">
            Answer a couple of quick questions and we'll tell you the current going rate —
            based on Delta Dental's 2026 Original Tooth Fairy Poll.
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="tf-currency" className="text-sm font-medium text-foreground mb-1.5 block">
                Currency
              </Label>
              <Select value={currency} onValueChange={(v) => setCurrency(v as Currency)}>
                <SelectTrigger id="tf-currency">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(Object.keys(CURRENCIES) as Currency[]).map((c) => (
                    <SelectItem key={c} value={c}>
                      {CURRENCIES[c].symbol} {CURRENCIES[c].label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="tf-age" className="text-sm font-medium text-foreground mb-1.5 block">
                Child's age <span className="text-muted-foreground font-normal">(optional)</span>
              </Label>
              <Input
                id="tf-age"
                type="number"
                min={0}
                max={18}
                inputMode="numeric"
                placeholder="e.g. 6"
                value={childAge}
                onChange={(e) => setChildAge(e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium text-foreground mb-1.5 block">
              Is this their first lost tooth?
            </Label>
            <div className="flex gap-3">
              <Button
                type="button"
                variant={isFirstTooth === true ? "magical" : "outline"}
                size="sm"
                onClick={() => setIsFirstTooth(true)}
              >
                Yes, the first one
              </Button>
              <Button
                type="button"
                variant={isFirstTooth === false ? "magical" : "outline"}
                size="sm"
                onClick={() => setIsFirstTooth(false)}
              >
                No, a later one
              </Button>
            </div>
          </div>

          <Button variant="hero" onClick={handleCalculate} disabled={isFirstTooth === null}>
            <Gift className="w-4 h-4" />
            See the Going Rate
          </Button>
        </div>
      )}

      {phase === "result" && range !== null && referenceRate !== null && isFirstTooth !== null && (
        <div className="space-y-6">
          <div className="text-center p-6 rounded-2xl bg-primary/10 border border-primary/20">
            <p className="text-sm text-muted-foreground mb-1">
              Our take{isFirstTooth ? " for a first tooth" : ""}
              {childAge.trim() ? ` at age ${childAge.trim()}` : ""}: a reasonable amount is
            </p>
            <p className="font-display text-4xl md:text-5xl font-bold text-primary my-2">
              {range.low === range.high
                ? formatAmount(currency, range.low)
                : `${formatAmount(currency, range.low)}–${formatAmount(currency, range.high)}`}
            </p>
            <p className="text-xs text-muted-foreground mt-2 max-w-sm mx-auto">
              We factor in a round number families actually hand over, whether it's a first
              tooth, and that older kids get more (a dollar means less at 12 than at 5) — not
              just a raw survey average.
            </p>
          </div>

          <p className="text-center text-xs text-muted-foreground -mt-2">
            For reference, Delta Dental's 2026 national poll put the precise average at{" "}
            <span className="font-medium text-foreground">{formatAmount(currency, referenceRate)}</span>
            {isFirstTooth ? " for a first tooth" : ""}.
          </p>

          {sharePhase === "idle" && (
            <div className="border-t border-border pt-6">
              <h3 className="font-display font-semibold text-foreground mb-1.5">
                What did you actually leave?
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                Share yours and see how it compares to what other families reported.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                    {CURRENCIES[currency].symbol}
                  </span>
                  <Input
                    type="number"
                    min={0}
                    step="0.01"
                    inputMode="decimal"
                    placeholder="Amount you left"
                    value={sharedAmount}
                    onChange={(e) => setSharedAmount(e.target.value)}
                    className="pl-8"
                  />
                </div>
                <Button variant="magical" onClick={handleShare}>
                  Share &amp; See the Average
                </Button>
              </div>
              {/* Honeypot - hidden from real visitors, bots tend to fill every field */}
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
              <button
                type="button"
                onClick={handleSkip}
                className="text-xs text-muted-foreground hover:text-primary mt-3 underline underline-offset-4"
              >
                Skip — just show me the average
              </button>
            </div>
          )}

          {sharePhase === "submitting" && (
            <div className="border-t border-border pt-6 text-center text-sm text-muted-foreground">
              Saving your answer…
            </div>
          )}

          {sharePhase === "error" && (
            <div className="border-t border-border pt-6">
              <p className="text-sm text-destructive mb-3">
                That didn't go through — mind trying again with a valid amount?
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="number"
                  min={0}
                  step="0.01"
                  inputMode="decimal"
                  placeholder="Amount you left"
                  value={sharedAmount}
                  onChange={(e) => setSharedAmount(e.target.value)}
                />
                <Button variant="magical" onClick={handleShare}>
                  Try Again
                </Button>
              </div>
            </div>
          )}

          {(sharePhase === "done" || sharePhase === "skipped") && (
            <div className="border-t border-border pt-6">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-primary" />
                <h3 className="font-display font-semibold text-foreground">
                  What other families reported
                </h3>
              </div>
              {sharePhase === "done" && (
                <p className="text-sm text-muted-foreground mb-3">
                  Thanks for sharing! Here's how it compares:
                </p>
              )}
              {stats && stats.response_count >= 3 ? (
                <p className="text-foreground">
                  <strong className="text-primary">{stats.response_count}</strong> families have
                  shared for this combination, averaging{" "}
                  <strong className="text-primary">
                    {formatAmount(currency, stats.average_amount)}
                  </strong>
                  .
                </p>
              ) : (
                <p className="text-muted-foreground text-sm">
                  Not enough answers for this exact combination yet — check back soon, or be one
                  of the first to help build the average!
                </p>
              )}
            </div>
          )}

          <button
            type="button"
            onClick={handleReset}
            className="text-xs text-muted-foreground hover:text-primary underline underline-offset-4"
          >
            Start over
          </button>
        </div>
      )}
    </div>
  );
};

export default ToothFairyCalculator;
