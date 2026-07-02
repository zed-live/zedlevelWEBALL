"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { m, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowMotif } from "./ArrowMotif";

/**
 * THE signature ZEDLEVEL visual — the A0→B2 staircase climbing
 * up-and-to-the-start (RTL: rises right → left). Steps grow in with a
 * stagger; the orange arrow ascends on scroll with a living glow.
 * If a stored test result exists (`zedlevel_level`), that step pulses.
 */
const STEPS = [
  { code: "A0", label: "التأسيس" },
  { code: "A1", label: "مبتدئ" },
  { code: "A2", label: "أساسي" },
  { code: "B1", label: "متوسط" },
  { code: "B2", label: "متقدم" },
] as const;

const HEIGHTS = [26, 40, 54, 68, 82];

export function LevelLadder({
  variant = "dark",
}: {
  /** dark = on navy/blue gradient section (homepage) · light = on white */
  variant?: "dark" | "light";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [storedLevel, setStoredLevel] = useState<string | null>(null);
  const dark = variant === "dark";

  useEffect(() => {
    try {
      setStoredLevel(localStorage.getItem("zedlevel_level"));
    } catch {
      /* private mode */
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "center 0.42"],
  });

  const arrowEnd = useTransform(scrollYProgress, [0, 1], ["3%", "83%"]);
  const arrowBottom = useTransform(scrollYProgress, [0, 1], ["30%", "90%"]);

  const stepBase = dark
    ? "border-white/15 bg-white/10 lg:backdrop-blur-sm hover:bg-accent hover:border-accent"
    : "border-primary/10 bg-primary-light hover:bg-primary hover:border-primary";
  const stepCurrent = dark
    ? "border-accent bg-accent motion-safe:animate-pulse"
    : "border-primary bg-primary motion-safe:animate-pulse";

  return (
    <div>
      <div ref={ref} className="relative h-72 w-full sm:h-96" dir="rtl">
        {/* dotted ascent path */}
        <svg
          aria-hidden
          className={`absolute inset-0 h-full w-full ${dark ? "text-white/20" : "text-primary/15"}`}
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path
            d="M 92 70 L 10 12"
            stroke="currentColor"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            style={{ strokeWidth: 3, strokeDasharray: "1 10" }}
          />
        </svg>

        {/* the climbing arrow */}
        <m.div
          aria-hidden
          className="animate-glow absolute z-10 w-[11%] min-w-11 text-accent"
          style={
            reduceMotion
              ? { insetInlineEnd: "83%", bottom: "90%" }
              : { insetInlineEnd: arrowEnd, bottom: arrowBottom }
          }
        >
          <ArrowMotif className="w-full" />
        </m.div>

        {/* the staircase — steps grow in with a stagger */}
        <m.div
          className="absolute inset-0 flex items-end gap-2 sm:gap-2.5"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -80px 0px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {STEPS.map((step, i) => {
            const isCurrent = storedLevel === step.code;
            return (
              <m.div
                key={step.code}
                className="relative flex-1 origin-bottom"
                style={{ height: `${HEIGHTS[i]}%` }}
                variants={{
                  hidden: { scaleY: 0, opacity: 0 },
                  show: {
                    scaleY: 1,
                    opacity: 1,
                    transition: { type: "spring", stiffness: 120, damping: 16 },
                  },
                }}
              >
                <Link
                  href="/test"
                  className={`group absolute inset-0 block rounded-t-2xl border transition-colors duration-200 active:scale-[0.97] ${
                    isCurrent ? stepCurrent : stepBase
                  }`}
                  aria-label={`مستوى ${step.code} — ${step.label}. اختبر مستواك`}
                >
                  <span className="absolute inset-x-0 top-3 flex flex-col items-center gap-1 sm:top-5">
                    <span
                      className={`text-base font-black sm:text-2xl ${
                        isCurrent
                          ? dark
                            ? "text-ink"
                            : "text-white"
                          : dark
                            ? "text-white group-hover:text-ink"
                            : "text-primary group-hover:text-white"
                      }`}
                    >
                      {step.code}
                    </span>
                    <span
                      className={`hidden text-[11px] font-bold sm:block ${
                        isCurrent
                          ? dark
                            ? "text-ink/70"
                            : "text-white/85"
                          : dark
                            ? "text-white/70 group-hover:text-ink/70"
                            : "text-ink/50 group-hover:text-white/85"
                      }`}
                    >
                      {step.label}
                    </span>
                    {isCurrent && (
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-black ${
                          dark ? "bg-navy text-white" : "bg-accent text-ink"
                        }`}
                      >
                        مستواك
                      </span>
                    )}
                  </span>
                </Link>
              </m.div>
            );
          })}
        </m.div>
      </div>
      <p
        className={`mt-4 text-center text-sm font-bold ${
          dark ? "text-white/70" : "text-ink/55"
        }`}
      >
        👆 اضغط على مستواك المتوقع — أو اختبر نفسك بدقة في 5 دقائق
      </p>
    </div>
  );
}
