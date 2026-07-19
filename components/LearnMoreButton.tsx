import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppButton";

/**
 * Card bottom button row (RTL): the gold "اعرف أكثر عن الدورة" button on the
 * LEFT (links to the course page) + a green WhatsApp icon button on the RIGHT.
 * Achieved with flex-row-reverse so the gold button (first child) lands left.
 *
 * When `href` is omitted (the card is rendered ON its own course page, where a
 * self-link would be pointless), the gold button is hidden and the WhatsApp
 * button stretches to full width instead.
 */
export function LearnMoreButton({
  href,
  waHref,
  label = "اعرف أكثر عن الدورة",
  onWaClick,
}: {
  /** course detail page — omit to hide (e.g. on the course's own page) */
  href?: string | null;
  /** WhatsApp deep link */
  waHref?: string | null;
  label?: string;
  onWaClick?: () => void;
}) {
  return (
    <div className="flex flex-row-reverse items-stretch gap-2.5">
      {/* gold "learn more" — takes the remaining width, sits on the LEFT */}
      {href && (
        <Link
          href={href}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-2xl bg-gradient-to-b from-accent to-accent-dark px-4 py-3.5 text-[15px] font-black text-ink shadow-[0_8px_20px_rgba(229,168,63,0.4)] transition-transform hover:-translate-y-0.5"
        >
          {label}
          <ChevronLeft className="h-4 w-4" aria-hidden />
        </Link>
      )}

      {/* WhatsApp button — square beside the gold button, full-width alone */}
      {waHref && (
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onWaClick}
          aria-label="راسلنا على الواتساب"
          className={`grid place-items-center rounded-2xl bg-[#25d366] text-white shadow-[0_8px_20px_-8px_rgba(37,211,102,.7)] transition-transform hover:-translate-y-0.5 ${
            href ? "aspect-square w-[52px] shrink-0" : "min-h-[52px] flex-1"
          }`}
        >
          <WhatsAppIcon className="h-6 w-6" />
        </a>
      )}
    </div>
  );
}
