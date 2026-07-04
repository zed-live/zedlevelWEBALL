import { site, isTodo, type SallaCourse } from "@/config/site";
import { DevTodoBadge } from "./DevTodoBadge";

/**
 * Course price display, driven by config/site.ts → pricing.
 * While the price is TODO_: honest "يُعلن مع فتح الدفعة" + dev badge.
 * Once the real number lands in config, every PriceTag lights up.
 */
export function PriceTag({
  course,
  size = "md",
  prefix,
  className = "",
}: {
  course: SallaCourse;
  size?: "md" | "lg";
  /** e.g. "تبدأ من" for multi-tier programs */
  prefix?: string;
  className?: string;
}) {
  const price = site.pricing[course];
  const todo = isTodo(price);

  if (todo) {
    return (
      <span
        className={`relative inline-flex items-center gap-2 rounded-xl bg-section px-4 py-2 text-sm font-black text-ink/55 ${className}`}
      >
        السعر يُعلن مع فتح الدفعة
        <DevTodoBadge label={`PRICE_${course.toUpperCase()}`} />
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-baseline gap-1.5 font-black text-primary ${
        size === "lg" ? "text-5xl" : "text-2xl"
      } ${className}`}
    >
      {prefix && (
        <span className="text-sm font-bold text-ink/55">{prefix}</span>
      )}
      <span dir="ltr" className="inline-block tabular-nums">
        {price}
      </span>
      <span className={size === "lg" ? "text-xl" : "text-sm"}>ر.س</span>
    </span>
  );
}
