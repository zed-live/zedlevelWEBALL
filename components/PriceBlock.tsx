/**
 * The price zone on a course card — the NUMBER is the largest text here:
 * a big bold amount + a small muted detail line beneath. No long wrapping
 * sentence.
 */
export function PriceBlock({
  amount,
  unit,
  detail,
}: {
  /** the headline number, e.g. "199" or "249" */
  amount: string;
  /** small unit after the number, e.g. "ريال / دورة" or "ريال / شهر" */
  unit: string;
  /** one short line beneath, e.g. "أو الباقة الكاملة 499" */
  detail?: string;
}) {
  return (
    <div className="text-center">
      <p className="flex items-baseline justify-center gap-1.5">
        <span
          dir="rtl"
          className="text-[34px] font-black leading-none tracking-tight text-ink"
        >
          {amount}
        </span>
        <span className="text-[13px] font-bold text-ink/55">{unit}</span>
      </p>
      {detail && (
        <p className="mt-1.5 text-[12.5px] font-bold text-ink/50">{detail}</p>
      )}
    </div>
  );
}
