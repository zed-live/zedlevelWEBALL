import Link from "next/link";
import { ShoppingBag } from "lucide-react";

/**
 * "اعرف اكثر عن الدورة" CTA on a course card — the brand's solid GOLD button
 * (gold gradient, dark ink text, store-bag icon). Links to the course's detail
 * page.
 */
export function LearnMoreButton({
  href,
  label = "اعرف اكثر عن الدورة",
}: {
  href: string;
  label?: string;
}) {
  return (
    <Link
      href={href}
      className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-b from-accent to-accent-dark px-4 py-3.5 text-[15px] font-black text-ink shadow-[0_8px_20px_rgba(229,168,63,0.4)] transition-transform hover:-translate-y-0.5"
    >
      <ShoppingBag className="h-[18px] w-[18px]" aria-hidden />
      {label}
    </Link>
  );
}
