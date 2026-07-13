"use client";

import { useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";

/**
 * "Read more" collapse for a card's feature list — shows the first `visible`
 * items fully, then fades the rest into transparency behind a white gradient
 * veil with a large gradient button ("عرض جميع المميزات") centered over the
 * fade. Clicking removes the veil and expands everything smoothly; a small
 * "عرض أقل" button collapses it again.
 *
 * Pass the full list of already-rendered items as `children`. When there are
 * more than `visible`, the extras collapse; otherwise it renders them plainly.
 */
export function CollapsibleFeatures({
  children,
  visible = 3,
}: {
  children: ReactNode[];
  visible?: number;
}) {
  const [open, setOpen] = useState(false);
  const items = Array.isArray(children) ? children : [children];

  // no collapse needed
  if (items.length <= visible) {
    return <div>{items}</div>;
  }

  const head = items.slice(0, visible);
  const rest = items.slice(visible);

  return (
    <div>
      {/* always-visible items */}
      <div>{head}</div>

      {/* collapsible remainder */}
      <div className="relative">
        <div
          className="overflow-hidden transition-[max-height] duration-[550ms] ease-[cubic-bezier(.22,1,.36,1)]"
          style={{ maxHeight: open ? 800 : 64 }}
        >
          {rest}
        </div>

        {/* fade veil + read-more button (hidden when open) */}
        <div
          aria-hidden={open}
          className={`pointer-events-none absolute inset-x-0 bottom-0 flex h-[150px] items-end justify-center pb-1.5 transition-opacity duration-300 ${
            open ? "invisible opacity-0" : "opacity-100"
          }`}
          style={{
            background:
              "linear-gradient(to top,#fff 34%,rgba(255,255,255,.92) 55%,rgba(255,255,255,.55) 78%,rgba(255,255,255,0) 100%)",
          }}
        >
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            className="pointer-events-auto inline-flex items-center gap-2 rounded-[14px] bg-gradient-to-br from-primary to-purple-600 px-6 py-3 text-[14px] font-black text-white shadow-[0_12px_26px_-10px_rgba(0,71,255,.6)] motion-safe:animate-[zl-nudge_2.4s_ease-in-out_infinite]"
          >
            عرض جميع المميزات
            <ChevronDown className="h-4 w-4" aria-hidden />
          </button>
        </div>
      </div>

      {/* show less */}
      {open && (
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="mx-auto mt-2 flex items-center gap-1 text-[13px] font-black text-primary hover:text-primary-dark"
        >
          عرض أقل
          <ChevronDown className="h-4 w-4 rotate-180" aria-hidden />
        </button>
      )}
    </div>
  );
}
