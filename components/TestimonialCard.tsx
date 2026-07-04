import { Star, CheckCheck } from "lucide-react";

/**
 * Testimonial as a WhatsApp-style chat bubble — the brand's real delivery
 * channel, so social proof looks the way students actually sent it.
 * ONLY the 3 real testimonials from CONTENT.md §13. Never invent testimonials.
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
    <figure className="relative flex h-full flex-col rounded-3xl rounded-se-md bg-white p-6 shadow-soft">
      {/* bubble tail (RTL: top-end) */}
      <span
        aria-hidden
        className="absolute -top-2 end-4 h-4 w-4 rotate-45 rounded-sm bg-white"
      />

      <figcaption className="flex items-center gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-light text-lg font-black text-primary">
          {name.trim().charAt(0)}
        </span>
        <div className="min-w-0">
          <span className="block truncate font-black text-primary">
            {name}
          </span>
          {role && <span className="text-xs text-ink/55">{role}</span>}
        </div>
        <span
          className="ms-auto flex shrink-0 gap-0.5"
          role="img"
          aria-label="تقييم 5 من 5 نجوم"
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className="h-3.5 w-3.5 fill-accent text-accent"
              aria-hidden
            />
          ))}
        </span>
      </figcaption>

      {/* consistent card shape: quotes capped at 5 lines */}
      <blockquote className="mt-4 line-clamp-5 flex-1 leading-8 text-ink/85">
        {quote}
      </blockquote>

      <div className="mt-3 flex justify-end" aria-hidden>
        <CheckCheck className="h-4 w-4 text-primary" />
      </div>
    </figure>
  );
}
