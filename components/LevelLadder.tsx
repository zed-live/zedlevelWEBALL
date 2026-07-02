"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowMotif } from "./ArrowMotif";

/**
 * THE signature ZEDLEVEL visual — the A0→B2 staircase climbing
 * up-and-to-the-start (RTL: rises right → left), with the brand's orange
 * arrow ascending the steps as the user scrolls. Reduced-motion safe.
 * If a stored test result exists (M4 sets `zedlevel_level`), that step pulses.
 */
const STEPS = [
  { code: "A0", label: "التأسيس" },
  { code: "A1", label: "مبتدئ" },
  { code: "A2", label: "أساسي" },
  { code: "B1", label: "متوسط" },
  { code: "B2", label: "متقدم" },
] as const;

// step heights (% of container) — ascending staircase
const HEIGHTS = [26, 40, 54, 68, 82];

export function LevelLadder() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [storedLevel, setStoredLevel] = useState<string | null>(null);

  useEffect(() => {
    try {
      setStoredLevel(localStorage.getItem("zedlevel_level"));
    } catch {
      /* private mode */
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "center 0.45"],
  });

  // arrow travels along the stair diagonal (inline-end grows = moves left in RTL)
  const arrowEnd = useTransform(scrollYProgress, [0, 1], ["3%", "83%"]);
  const arrowBottom = useTransform(scrollYProgress, [0, 1], ["30%", "88%"]);

  return (
    <div ref={ref} className="relative h-64 w-full sm:h-80" dir="rtl">
      {/* the climbing arrow */}
      <motion.div
        aria-hidden
        className="absolute z-10 w-[10%] min-w-10 text-accent drop-shadow-sm"
        style={
          reduceMotion
            ? { insetInlineEnd: "83%", bottom: "88%" }
            : { insetInlineEnd: arrowEnd, bottom: arrowBottom }
        }
      >
        <ArrowMotif className="w-full" />
      </motion.div>

      {/* the staircase */}
      <div className="absolute inset-0 flex items-end gap-1.5 sm:gap-2">
        {STEPS.map((step, i) => {
          const isCurrent = storedLevel === step.code;
          return (
            <Link
              key={step.code}
              href="/test"
              style={{ height: `${HEIGHTS[i]}%` }}
              className={`group relative flex-1 rounded-t-xl border transition-colors ${
                isCurrent
                  ? "border-primary bg-primary text-white motion-safe:animate-pulse"
                  : "border-primary/10 bg-primary-light hover:border-primary hover:bg-primary"
              }`}
              aria-label={`مستوى ${step.code} — ${step.label}. اختبر مستواك`}
            >
              <span
                className={`absolute inset-x-0 top-2.5 flex flex-col items-center gap-0.5 sm:top-4 ${
                  isCurrent ? "text-white" : "text-primary group-hover:text-white"
                }`}
              >
                <span className="text-sm font-black sm:text-xl">
                  {step.code}
                </span>
                <span
                  className={`hidden text-[10px] font-semibold sm:block sm:text-xs ${
                    isCurrent ? "text-white/85" : "text-ink/50 group-hover:text-white/85"
                  }`}
                >
                  {step.label}
                </span>
                {isCurrent && (
                  <span className="rounded-full bg-accent px-1.5 text-[9px] font-bold text-ink">
                    مستواك
                  </span>
                )}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
