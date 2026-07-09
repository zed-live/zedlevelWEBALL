import { ShoppingBag, Lock } from "lucide-react";

/**
 * The primary "buy via Salla" CTA look — a light rounded button with a bold
 * main line + a small "دفع آمن ومضمون" reassurance line, and a dark teal icon
 * panel on the END (left, RTL) edge holding a white store glyph.
 *
 * Rendered as an <a> (direct Salla link) or a <button> (opens the plan picker),
 * chosen via the `as` prop. Shared so every buy CTA looks identical.
 */

const PANEL =
  "relative flex w-full items-stretch overflow-hidden rounded-2xl bg-white ring-1 ring-navy/15 shadow-[0_10px_24px_-12px_rgba(2,17,80,0.45)] transition-transform hover:-translate-y-0.5";

function Inner({ title, note }: { title: string; note: string }) {
  return (
    <>
      <span className="flex flex-1 flex-col items-center justify-center py-3 pe-4 ps-2 text-center">
        <span className="text-[16px] font-black text-navy">{title}</span>
        <span className="mt-0.5 inline-flex items-center gap-1 text-[11.5px] font-bold text-navy/55">
          <Lock className="h-3 w-3" aria-hidden />
          {note}
        </span>
      </span>
      <span
        aria-hidden
        className="flex shrink-0 items-center gap-1.5 bg-gradient-to-b from-navy to-primary-deep px-4 font-black text-white"
      >
        <ShoppingBag className="h-[18px] w-[18px]" />
        <span className="text-[15px]">سلة</span>
      </span>
    </>
  );
}

export function StoreButtonLink({
  href,
  title = "اشترك مباشرة عبر سلة",
  note = "دفع آمن ومضمون",
  onClick,
}: {
  href: string;
  title?: string;
  note?: string;
  onClick?: () => void;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className={PANEL}
    >
      <Inner title={title} note={note} />
    </a>
  );
}

export function StoreButtonTrigger({
  onClick,
  title = "اختر باقتك واشترك مباشرة",
  note = "دفع آمن ومضمون",
}: {
  onClick: () => void;
  title?: string;
  note?: string;
}) {
  return (
    <button type="button" onClick={onClick} className={PANEL}>
      <Inner title={title} note={note} />
    </button>
  );
}
