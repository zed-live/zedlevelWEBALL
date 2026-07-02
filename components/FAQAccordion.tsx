import { ChevronDown } from "lucide-react";

/**
 * FAQ accordion — native <details>/<summary> (zero JS, fully accessible).
 * Pair with FAQPage JSON-LD on the page that renders it.
 */
export function FAQAccordion({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="mx-auto max-w-3xl space-y-3">
      {items.map((item) => (
        <details key={item.q} className="card group px-6">
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 text-start font-black [&::-webkit-details-marker]:hidden">
            {item.q}
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-light text-primary transition-transform duration-200 group-open:rotate-180">
              <ChevronDown className="h-5 w-5" aria-hidden />
            </span>
          </summary>
          <p className="pb-6 leading-8 text-ink/70">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
