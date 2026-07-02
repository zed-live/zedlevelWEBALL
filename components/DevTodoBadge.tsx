/**
 * Dev-only warning badge rendered next to any action whose config value
 * is still a TODO_ placeholder (config/site.ts). Never renders in production.
 */
export function DevTodoBadge({
  label,
  side = "end",
}: {
  label: string;
  /** anchor side — use "start" for elements at the screen's start edge (e.g. the float) */
  side?: "start" | "end";
}) {
  if (process.env.NODE_ENV === "production") return null;
  return (
    <span
      className={`pointer-events-none absolute -top-2 z-10 rounded-full bg-red-600 px-2 py-0.5 text-[10px] font-bold text-white shadow ${
        side === "end" ? "-end-2" : "-start-2"
      }`}
      title={`قيمة ناقصة في config/site.ts: ${label}`}
    >
      ⚠ {label}
    </span>
  );
}
