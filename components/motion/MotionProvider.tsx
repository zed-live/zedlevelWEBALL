"use client";

import { LazyMotion, domMax, MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * App-wide motion setup: lazy-loaded features (small bundle) +
 * automatic reduced-motion handling for every m.* component.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domMax} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
