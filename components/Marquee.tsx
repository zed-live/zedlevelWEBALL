import { ArrowMotif } from "./ArrowMotif";

/**
 * Infinite brand-facts strip (CSS-only animation; frozen by the global
 * reduced-motion rule). Content duplicated for a seamless loop.
 */
export function Marquee({ items }: { items: string[] }) {
  const row = (dup: boolean) => (
    <div
      aria-hidden={dup || undefined}
      className="flex shrink-0 items-center gap-9 pe-9"
    >
      {items.map((it) => (
        <span
          key={it}
          className="flex items-center gap-3 whitespace-nowrap text-lg font-black text-ink/55"
        >
          <ArrowMotif className="h-2.5 w-3.5 shrink-0 text-accent" />
          {it}
        </span>
      ))}
    </div>
  );

  return (
    <div className="overflow-hidden border-y border-ink/5 bg-white py-5 [mask-image:linear-gradient(to_left,transparent,black_10%,black_90%,transparent)]">
      <div className="marquee-track flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
