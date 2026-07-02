"use client";

import { m } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Signature entrance: spring rise + blur-clear on scroll into view.
 * Same API as v1 (children, delay ms, className) so every usage upgrades.
 * Reduced motion handled globally by MotionConfig.
 */
export function Reveal({
  children,
  delay = 0,
  y = 26,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "0px 0px -70px 0px" }}
      transition={{
        type: "spring",
        stiffness: 90,
        damping: 18,
        mass: 0.9,
        delay: delay / 1000,
      }}
    >
      {children}
    </m.div>
  );
}
