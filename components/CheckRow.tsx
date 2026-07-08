import { Check } from "lucide-react";

const FULL_PACKAGE_TAG = "(بالباقة الكاملة)";

/**
 * A single checklist row — shared by the course product cards.
 *
 * Discipline (design system: one blue family, gold scarce):
 *  - text on the right (RTL); a single PRIMARY line-check on the left, no badge,
 *    no green (green isn't in the palette).
 *  - the «(بالباقة الكاملة)» tag is pulled onto its own quiet second line in a
 *    muted primary tone — never a cramped inline pill.
 */
export function CheckRow({
  text,
  isNew = false,
}: {
  text: string;
  isNew?: boolean;
}) {
  const hasTag = text.includes(FULL_PACKAGE_TAG);
  const body = hasTag ? text.replace(FULL_PACKAGE_TAG, "").trim() : text;

  return (
    <div
      className={`flex items-start gap-3 py-2.5 ${
        isNew ? "animate-[fadeInRow_0.3s_ease]" : ""
      }`}
    >
      <span
        aria-hidden
        className="mt-1 grid h-[19px] w-[19px] shrink-0 place-items-center rounded-full bg-primary/10 text-primary"
      >
        <Check className="h-[13px] w-[13px]" strokeWidth={3} />
      </span>
      <span className="text-[14px] font-semibold leading-7 text-ink">
        {body}
        {hasTag && (
          <span className="mt-0.5 block text-[11.5px] font-bold text-primary/60">
            ضمن الباقة الكاملة
          </span>
        )}
      </span>
    </div>
  );
}

/**
 * A quiet lead-statement block — a soft panel with a GOLD (brand) hairline on
 * the START (right, RTL) edge. One calm box, not a stack of them.
 */
export function QuoteBox({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-xl border-s-[3px] border-accent bg-primary-light/70 px-4 py-3.5 ${className}`}
    >
      {children}
    </div>
  );
}

/**
 * The course-outcome callout above the checklist — a titled "مخرجات الدورة"
 * block, start-aligned, with an optional muted `note`.
 */
export function ResultLine({
  children,
  note,
}: {
  children: React.ReactNode;
  note?: React.ReactNode;
}) {
  return (
    <QuoteBox className="mt-5">
      <p className="mb-1.5 text-[12px] font-black text-accent-dark">
        مخرجات الدورة
      </p>
      <p className="text-[13.5px] font-bold leading-7 text-ink">{children}</p>
      {note && (
        <p className="mt-1.5 text-[12.5px] font-bold leading-6 text-ink/70">
          {note}
        </p>
      )}
    </QuoteBox>
  );
}
