import { Lock } from "lucide-react";
import { SallaIcon } from "./SallaIcon";

/**
 * The primary "buy via Salla" CTA look — a light rounded button with a bold
 * main line + a small "دفع آمن ومضمون" reassurance line, and a dark teal icon
 * panel on the END (left, RTL) edge holding a white store glyph.
 *
 * Rendered as an <a> (direct Salla link) or a <button> (opens the plan picker),
 * chosen via the `as` prop. Shared so every buy CTA looks identical.
 */

const PANEL =
  "relative flex w-full items-stretch overflow-hidden rounded-2xl bg-white ring-1 ring-ink/10 shadow-[0_10px_24px_-12px_rgba(2,17,80,0.45)] transition-transform hover:-translate-y-0.5";

function Inner({ title, note }: { title: string; note: string }) {
  return (
    <>
      <span className="flex flex-1 flex-col items-center justify-center py-3.5 pe-4 ps-2 text-center">
        <span className="bg-gradient-to-l from-primary to-purple-600 bg-clip-text text-[16px] font-black text-transparent">
          {title}
        </span>
        <span className="mt-1 inline-flex items-center gap-1 text-[11.5px] font-bold text-ink/45">
          <Lock className="h-3 w-3 text-emerald-500" aria-hidden />
          {note}
        </span>
      </span>
      <span
        aria-hidden
        className="my-2 me-2 flex shrink-0 items-center gap-1 rounded-xl bg-gradient-to-br from-[#0f3d47] to-[#1c5e63] px-2 py-1 font-black text-white"
      >
        <SallaIcon className="h-[18px] w-[18px]" />
        <span className="text-[15px]">سلة</span>
      </span>
    </>
  );
}

export function StoreButtonLink({
  href,
  title = "اختر باقتك واشترك مباشرة",
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
