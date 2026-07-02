"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

/**
 * Animated number: counts up when scrolled into view.
 * Accepts strings like "+5,000", "26", "+460" — non-numeric values render as-is.
 */
export function CountUp({
  value,
  className = "",
  duration = 1400,
}: {
  value: string;
  className?: string;
  duration?: number;
}) {
  const match = value.match(/^([^\d]*)([\d,]+)(.*)$/);
  const target = match ? parseInt(match[2].replaceAll(",", ""), 10) : 0;
  const prefix = match?.[1] ?? "";
  const suffix = match?.[3] ?? "";

  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!match || !inView) return;
    if (reduce) {
      setN(target);
      return;
    }
    let raf: number;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, target, reduce, duration]);

  if (!match) return <span className={className}>{value}</span>;

  return (
    <span
      ref={ref}
      className={className}
      data-countup
      data-final={`${prefix}${target.toLocaleString("en-US")}${suffix}`}
    >
      {prefix}
      {n.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}
