/**
 * Honest-urgency note placed directly above the CTA — the real enrollment
 * mechanic (limited cohorts), NOT a fake countdown. Rendered as a quiet inline
 * line + a RED, glowing/pulsing dot that reads as a genuine "act now" warning.
 */
export function ScarcityStrip({ text }: { text: string }) {
  return (
    <p className="flex items-center justify-center gap-2 text-center text-[12px] font-bold text-ink/55">
      <span
        aria-hidden
        className="h-[7px] w-[7px] shrink-0 rounded-full bg-[#e0342b]"
        style={{ animation: "scarcity-pulse 1.6s infinite" }}
      />
      {text}
    </p>
  );
}
