import { TestimonialCard } from "./TestimonialCard";

/**
 * Testimonials — mobile-first behavior:
 * · Mobile: native swipeable carousel (scroll-snap, momentum).
 * · Desktop (md+): slow auto-drifting marquee, pauses on hover.
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
      className={`${dup ? "hidden md:flex" : "flex"} shrink-0 items-stretch gap-5 pe-5`}
    >
      {items.map((t) => (
        <div
          key={t.quote}
          className="w-[85vw] max-w-[340px] shrink-0 snap-start sm:w-[360px] sm:max-w-none"
        >
          <TestimonialCard {...t} />
        </div>
      ))}
    </div>
  );

  return (
    <div className="snap-x snap-mandatory overflow-x-auto px-5 pb-4 pt-2 md:snap-none md:overflow-hidden md:px-0 md:pb-2 md:[mask-image:linear-gradient(to_left,transparent,black_6%,black_94%,transparent)]">
      <div className="marquee-md flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
