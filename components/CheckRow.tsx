import { Check } from "lucide-react";

/**
 * A single checklist row — shared by the course product cards
 * (A0Card / LevelsCard / ConversationCard).
 *
 * Style (per approved design):
 *  - text on the right (RTL), a green ✓ badge on the LEFT (end side)
 *  - rows tagged «(بالباقة الكاملة)» render DIMMED (muted text + grey check),
 *    since that content is gated behind the full package.
 */
export function CheckRow({
  text,
  isNew = false,
}: {
  text: string;
  isNew?: boolean;
}) {
  const gated = text.includes("(بالباقة الكاملة)");

  return (
    <div
      className={`flex items-start justify-between gap-3 py-3 ${
        isNew ? "animate-[fadeInRow_0.3s_ease]" : ""
      }`}
    >
      <span
        className={`text-[14px] font-bold leading-7 ${
          gated ? "text-ink/40" : "text-ink"
        }`}
      >
        {text}
      </span>
      <span
        aria-hidden
        className={`mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full ${
          gated ? "bg-ink/[0.06] text-ink/35" : "bg-emerald-100 text-emerald-600"
        }`}
      >
        <Check className="h-3.5 w-3.5" strokeWidth={3} />
      </span>
    </div>
  );
}

/**
 * A quote-style callout — a clean white rounded card sitting on a rounded GOLD
 * backing that peeks out on the START (right, RTL) edge. Reused by the result
 * line and the tracks intro.
 */
export function QuoteBox({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      {/* gold rounded backing peeking out on the right (start) edge */}
      <span
        aria-hidden
        className="absolute inset-0 -start-1.5 rounded-[20px] bg-accent"
      />
      {/* white card on top */}
      <div className="relative rounded-[20px] bg-white px-5 py-4 shadow-[0_8px_24px_-12px_rgba(15,23,41,0.25)]">
        {children}
      </div>
    </div>
  );
}

/**
 * The "result line" callout used above the checklist. Centered body, with an
 * optional `note` rendered below in the primary color.
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
      <p className="text-center text-[14px] font-black leading-7 text-ink">
        {children}
      </p>
      {note && (
        <p className="mt-1.5 text-center text-[13px] font-black leading-6 text-primary">
          {note}
        </p>
      )}
    </QuoteBox>
  );
}
