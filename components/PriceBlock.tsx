import { RiyalIcon } from "./RiyalIcon";

/**
 * The price zone on a course card — the NUMBER is the largest text here:
 * a big bold amount + the Saudi Riyal symbol, an optional billing period, and
 * an optional small detail line beneath. No long wrapping sentence.
 */
export function PriceBlock({
  amount,
  period,
  detail,
  startsFrom = false,
}: {
  /** the headline number, e.g. "199" or "249" */
  amount: string;
  /** billing period after the riyal mark, e.g. "دورة" or "شهر" */
  period?: string;
  /** one short line beneath, e.g. "أو الباقة الكاملة 499" */
  detail?: React.ReactNode;
  /** show a "تبدأ بـ" prefix (for tiered pricing) */
  startsFrom?: boolean;
}) {
  return (
    <div className="text-center">
      <p className="flex items-center justify-center gap-1.5">
        {startsFrom && (
          <span className="text-[13px] font-bold text-ink/55">تبدأ بـ</span>
        )}
        <span
          dir="rtl"
          className="text-[34px] font-black leading-none tracking-tight text-ink"
        >
          {amount}
        </span>
        <RiyalIcon className="h-[26px] w-[26px] text-ink" />
        {period && (
          <span className="text-[13px] font-bold text-ink/55">/ {period}</span>
        )}
      </p>
      {detail && (
        <p className="mt-1.5 text-[12.5px] font-bold text-ink/50">{detail}</p>
      )}
    </div>
  );
}
