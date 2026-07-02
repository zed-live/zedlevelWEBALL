import Link from "next/link";

export type Level = "A0" | "A1" | "A2" | "B1" | "B2" | "C1";

/**
 * CEFR level chip. `soon` renders the قريبًا state (C1 — user decision 2026-07-02).
 * CEFR codes render inline LTR naturally inside the RTL layout.
 */
export function LevelChip({
  level,
  soon = false,
  href = "/test",
  className = "",
}: {
  level: Level;
  soon?: boolean;
  href?: string;
  className?: string;
}) {
  const base =
    "relative inline-flex min-h-11 min-w-16 items-center justify-center rounded-2xl px-4 py-2 font-black shadow-soft transition-all";

  if (soon) {
    return (
      <span
        className={`${base} border border-dashed border-ink/15 bg-white/70 text-ink/35 ${className}`}
        title="قريبًا"
      >
        {level}
        <span className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full bg-accent px-2 py-px text-[10px] font-black text-ink shadow-sm">
          قريبًا
        </span>
      </span>
    );
  }

  return (
    <Link
      href={href}
      className={`${base} border border-primary/10 bg-white text-primary hover:-translate-y-1 hover:border-primary hover:bg-primary hover:text-white ${className}`}
    >
      {level}
    </Link>
  );
}
