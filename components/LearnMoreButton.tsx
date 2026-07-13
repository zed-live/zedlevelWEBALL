import Link from "next/link";
import { ShoppingBag } from "lucide-react";

/**
 * "اعرف اكثر عن الدورة" CTA on a course card — a dark navy button with a gold
 * border + gold text and a store-bag icon (matches the shared brand look).
 * Links to the course's detail page.
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
      className="flex w-full items-center justify-center gap-2 rounded-2xl border-[1.5px] border-accent bg-navy px-4 py-3.5 text-[15px] font-black text-accent transition-colors hover:bg-primary-deep"
    >
      <ShoppingBag className="h-[18px] w-[18px]" aria-hidden />
      {label}
    </Link>
  );
}
