import { Reveal } from "./Reveal";
import { CountUp } from "./motion/CountUp";

/** Big-numbers proof strip with count-up animation (homepage, A0, levels). */
export function StatStrip({
  items,
  className = "",
}: {
  items: { value: string; label: string }[];
  className?: string;
}) {
  const cols =
    items.length >= 5
      ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
      : "grid-cols-2 lg:grid-cols-4";
  return (
    <section className={`border-y border-ink/5 bg-white ${className}`}>
      <Reveal>
        <div className={`container-site grid ${cols}`}>
          {items.map((s, i) => (
            <div
              key={s.label}
              className={`px-4 py-8 text-center lg:py-10 ${
                items.length === 5 && i === 4
                  ? "col-span-2 sm:col-span-1"
                  : ""
              }`}
            >
              <p className="text-3xl font-black text-primary lg:text-4xl">
                <CountUp value={s.value} />
              </p>
              <p className="mt-1.5 text-sm font-bold text-ink/55">{s.label}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
