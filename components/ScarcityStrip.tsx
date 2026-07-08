/**
 * Honest-urgency note placed directly above the CTA — the real enrollment
 * mechanic (limited cohorts), NOT a fake countdown. Rendered as a quiet inline
 * line (a softly pulsing PRIMARY dot + muted text), not another boxed panel —
 * to avoid the "box soup" and to keep gold scarce.
 */
export function ScarcityStrip({ text }: { text: string }) {
  return (
    <p className="flex items-center justify-center gap-2 text-center text-[12px] font-bold text-ink/55">
      <span
        aria-hidden
        className="h-[7px] w-[7px] shrink-0 rounded-full bg-primary"
        style={{ animation: "scarcity-pulse 2s infinite" }}
      />
      {text}
    </p>
  );
}
