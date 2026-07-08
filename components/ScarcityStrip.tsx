/**
 * Honest-urgency bar placed directly above the CTA buttons — uses the real
 * enrollment mechanic (limited cohorts / batches), NOT a fake countdown.
 * Amber/gold palette with a softly pulsing dot.
 */
export function ScarcityStrip({ text }: { text: string }) {
  return (
    <div className="flex items-center justify-center gap-[7px] rounded-[11px] border border-[#f6e2bd] bg-[#fff7e9] px-3 py-[9px] text-center text-[12.5px] font-bold text-[#8a5a10]">
      <span
        aria-hidden
        className="h-[7px] w-[7px] shrink-0 rounded-full bg-[#f0a020]"
        style={{ animation: "scarcity-pulse 2s infinite" }}
      />
      {text}
    </div>
  );
}
