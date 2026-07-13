"use client";

import { useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";

export type FaqItem = { q: string; a: ReactNode };

/**
 * A simple RTL FAQ accordion — one item open at a time, smooth reveal.
 * Pass an array of { q, a }. The answer can be a string or JSX (for lists).
 */
export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-3">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={item.q}
            className="overflow-hidden rounded-2xl border border-ink/[0.08] bg-white shadow-[0_8px_24px_-16px_rgba(2,17,80,.25)]"
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-start"
            >
              <span className="text-[15.5px] font-black leading-7 text-ink">
                {item.q}
              </span>
              <ChevronDown
                aria-hidden
                className={`h-5 w-5 shrink-0 text-primary transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className="grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(.22,1,.36,1)]"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <div className="px-5 pb-5 pt-0 text-[14.5px] font-semibold leading-8 text-ink/70">
                  {item.a}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
