"use client";

import { useEffect, useRef, useState } from "react";
import { Briefcase, GraduationCap, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * "لا تفوّت الفرص" — on mobile a swipeable slider that ALSO auto-advances
 * quickly to the next slide; on sm+ it's the static 3-column grid.
 */

const ITEMS: { icon: LucideIcon; text: string }[] = [
  { icon: Briefcase, text: "فرص وظيفية وترقيات توصلك أسرع" },
  { icon: GraduationCap, text: "قبول جامعي ونجاح في الاختبارات" },
  { icon: Sparkles, text: "حضور وثقة وعلاقات أوسع" },
];

/** how quickly it auto-advances (ms) */
const AUTO_MS = 2600;

export function OpportunitiesSlider() {
  const strip = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const paused = useRef(false);

  // auto-advance on mobile only (the strip scrolls; on sm+ it's a grid so
  // scrollWidth ≈ clientWidth and the scroll is a no-op)
  useEffect(() => {
    const id = setInterval(() => {
      const el = strip.current;
      if (!el || paused.current) return;
      if (el.scrollWidth <= el.clientWidth + 4) return; // desktop grid: skip
      const next = (active + 1) % ITEMS.length;
      // RTL: slides advance in the negative scrollLeft direction
      el.scrollTo({ left: -next * el.clientWidth, behavior: "smooth" });
      setActive(next);
    }, AUTO_MS);
    return () => clearInterval(id);
  }, [active]);

  // keep the dots in sync when the user swipes manually
  const onScroll = () => {
    const el = strip.current;
    if (!el) return;
    const idx = Math.round(Math.abs(el.scrollLeft) / el.clientWidth);
    if (idx !== active) setActive(idx);
  };

  return (
    <>
      <div
        ref={strip}
        onScroll={onScroll}
        onPointerDown={() => (paused.current = true)}
        onPointerUp={() => (paused.current = false)}
        role="list"
        className="mx-auto mt-12 flex max-w-4xl snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:grid sm:grid-cols-3 sm:gap-8 sm:overflow-visible sm:pb-0"
      >
        {ITEMS.map((o) => (
          <div
            key={o.text}
            role="listitem"
            className="flex w-full shrink-0 basis-full snap-center flex-col items-center gap-4 px-2 sm:w-auto sm:basis-auto"
          >
            <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-accent text-ink shadow-glow-accent">
              <o.icon className="h-8 w-8" aria-hidden />
            </span>
            <p className="max-w-[24ch] text-lg font-black text-white">{o.text}</p>
          </div>
        ))}
      </div>

      {/* dot indicators — mobile only; active dot reflects the current slide */}
      <div aria-hidden className="mt-1 flex justify-center gap-2 sm:hidden">
        {ITEMS.map((o, i) => (
          <span
            key={o.text}
            className={`h-2 rounded-full transition-all ${
              i === active ? "w-5 bg-white" : "w-2 bg-white/35"
            }`}
          />
        ))}
      </div>
    </>
  );
}
