import { TestimonialCard } from "./TestimonialCard";

/**
 * Horizontal auto-scrolling testimonials (homepage prompt §9).
 * CSS-only marquee (duplicated set, pause on hover, frozen by reduced-motion).
 * Adding a new quote = adding one item to the array on the page.
 */
export function TestimonialCarousel({
  items,
}: {
  items: { name: string; role?: string; quote: string }[];
}) {
  const row = (dup: boolean) => (
    <div
      aria-hidden={dup || undefined}
      className="flex shrink-0 items-stretch gap-5 pe-5"
    >
      {items.map((t) => (
        <div key={t.quote} className="w-[320px] shrink-0 sm:w-[360px]">
          <TestimonialCard {...t} />
        </div>
      ))}
    </div>
  );

  return (
    <div className="overflow-hidden py-2 [mask-image:linear-gradient(to_left,transparent,black_6%,black_94%,transparent)]">
      <div className="marquee-track flex w-max pt-2 [animation-duration:70s] hover:[animation-play-state:paused]">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
