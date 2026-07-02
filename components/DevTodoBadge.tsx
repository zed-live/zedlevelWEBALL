/**
 * Dev-only warning badge rendered next to any action whose config value
 * is still a TODO_ placeholder (config/site.ts). Never renders in production.
 */
export function DevTodoBadge({ label }: { label: string }) {
  if (process.env.NODE_ENV === "production") return null;
  return (
    <span
      className="pointer-events-none absolute -top-2 -end-2 z-10 rounded-full bg-red-600 px-2 py-0.5 text-[10px] font-bold text-white shadow"
      title={`قيمة ناقصة في config/site.ts: ${label}`}
    >
      ⚠ {label}
    </span>
  );
}
