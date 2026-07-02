import Link from "next/link";

export type Level = "A0" | "A1" | "A2" | "B1" | "B2" | "C1";

/**
 * CEFR level chip. `soon` renders the قريبًا state (used for C1 — user decision 2026-07-02).
 * CEFR codes render inline LTR naturally inside the RTL layout.
 */
export function LevelChip({
  level,
  soon = false,
  href = "/test",
}: {
  level: Level;
  soon?: boolean;
  href?: string;
}) {
  const base =
    "relative inline-flex min-h-11 min-w-14 items-center justify-center rounded-full border-2 px-4 py-1.5 font-black transition-colors";

  if (soon) {
    return (
      <span
        className={`${base} border-dashed border-ink/20 text-ink/40`}
        title="قريبًا"
      >
        {level}
        <span className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full bg-accent px-1.5 text-[10px] font-bold text-ink">
          قريبًا
        </span>
      </span>
    );
  }

  return (
    <Link
      href={href}
      className={`${base} border-primary/25 bg-white text-primary hover:border-primary hover:bg-primary-light`}
    >
      {level}
    </Link>
  );
}
