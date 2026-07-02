"use client";

import { m } from "framer-motion";
import type { ReactNode } from "react";

/** The brand marker-swoosh that draws itself under a key phrase. */
export function Underline({
  children,
  className = "",
  delay = 0.45,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <span className={`relative inline-block ${className}`}>
      {children}
      <svg
        aria-hidden
        className="absolute -bottom-2 start-0 h-3 w-full text-accent"
        viewBox="0 0 200 12"
        preserveAspectRatio="none"
      >
        <m.path
          d="M3 9 C 60 2.5, 140 2.5, 197 7.5"
          stroke="currentColor"
          strokeWidth="5.5"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, ease: "easeOut", delay }}
        />
      </svg>
    </span>
  );
}
