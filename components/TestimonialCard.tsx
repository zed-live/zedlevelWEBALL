import { Star } from "lucide-react";

/**
 * Testimonial card — ONLY the 3 real testimonials from CONTENT.md §13.
 * Never invent testimonials.
 */
export function TestimonialCard({
  name,
  role,
  quote,
}: {
  name: string;
  role?: string;
  quote: string;
}) {
  return (
    <figure className="flex h-full flex-col rounded-2xl border border-ink/5 bg-white p-6 shadow-sm">
      <div className="flex gap-0.5" aria-label="تقييم 5 من 5 نجوم" role="img">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className="h-4 w-4 fill-accent text-accent"
            aria-hidden
          />
        ))}
      </div>
      <blockquote className="mt-3 flex-1 text-sm leading-8 text-ink/80">
        “{quote}”
      </blockquote>
      <figcaption className="mt-4">
        <span className="block font-bold">{name}</span>
        {role && <span className="text-xs text-ink/60">{role}</span>}
      </figcaption>
    </figure>
  );
}
