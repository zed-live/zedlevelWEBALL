"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { m, AnimatePresence, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { ArrowMotif } from "./ArrowMotif";
import { Mascot } from "./Mascot";
import { WhatsAppButton } from "./WhatsAppButton";
import { site } from "@/config/site";

/**
 * THE signature ZEDLEVEL visual — clean v4:
 * ascending steps A0 → C1 (RTL: rises right → left), one precise dotted
 * ascent path with a single arrow at its summit, the character climbing
 * on scroll, tappable steps opening a "what you learn + course" tooltip,
 * and the foundation course's striped coverage over A0 + parts of A1/A2.
 */
const STEPS = [
  {
    code: "A0",
    label: "التأسيسي",
    learn: "تقرأ وتنطق صح وتبني جملك الأولى — ويغطي أجزاء من A1 وA2",
    course: { title: "دورة التأسيس الصحيح", href: "/courses/a0" },
  },
  {
    code: "A1",
    label: "مبتدئ",
    learn: "تفهم وتستخدم العبارات اليومية الأساسية",
    course: { title: "دورة المستويات", href: "/courses/levels" },
  },
  {
    code: "A2",
    label: "أساسي",
    learn: "تتواصل في المواقف المألوفة بجمل بسيطة",
    course: { title: "دورة المستويات", href: "/courses/levels" },
  },
  {
    code: "B1",
    label: "متوسط",
    learn: "تتكلم عن خططك وتجاربك بجمل مترابطة",
    course: { title: "دورة المستويات", href: "/courses/levels" },
  },
  {
    code: "B2",
    label: "متقدم",
    learn: "تناقش وتشتغل وتتابع المحتوى بثقة",
    course: { title: "دورة المستويات", href: "/courses/levels" },
  },
  {
    code: "C1",
    label: "قريبًا",
    learn: "مستوى الطلاقة المتقدمة — قريبًا في زد لفل",
    course: null,
  },
] as const;

const HEIGHTS = [22, 34, 46, 58, 70, 82];

/* التأسيس (A0) covers all of A0 + parts of A1 and A2 (CONTENT.md §7) */
/* solid logo-yellow fill (was a diagonal hatch) */
const FOUNDATION_FILL = "rgba(248,190,76,0.85)";
const FOUNDATION_COVERAGE: Record<string, number> = { A1: 42, A2: 22 };

export function LevelLadder({
  variant = "light",
  cta = false,
}: {
  variant?: "dark" | "light";
  /** show the unified WhatsApp level-check CTA under the ladder */
  cta?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState<number | null>(null);
  const dark = variant === "dark";

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "center 0.42"],
  });
  // the character walks the whole ascent: from the A0 edge (bottom-right,
  // short) up to the C1 edge (top-left, tall). `insetInlineEnd` runs from the
  // start (right) edge, so it grows as the mascot moves left toward C1;
  // `bottom` rises with the step heights. Values keep it perched just above
  // each step's top rather than overlapping the labels.
  const climbEnd = useTransform(scrollYProgress, [0, 1], ["4%", "80%"]);
  const climbBottom = useTransform(scrollYProgress, [0, 1], ["20%", "76%"]);

  /* ascending blue ramp — the higher the level, the deeper the blue */
  const stepClasses = (code: string) => {
    if (code === "A0") {
      // solid logo-yellow fill (brand accent), not the pale hatch
      return "border-2 border-accent-dark/70 bg-accent hover:brightness-105";
    }
    if (code === "C1") {
      return dark
        ? "border-dashed border-white/25 bg-white/[0.05]"
        : "border-dashed border-primary/20 bg-primary/[0.04] hover:border-primary/40";
    }
    if (dark) {
      return "border-white/15 bg-white/10 hover:border-accent hover:bg-accent/90";
    }
    const ramp: Record<string, string> = {
      A1: "bg-gradient-to-t from-primary/30 to-primary/10 border-primary/20",
      A2: "bg-gradient-to-t from-primary/50 to-primary/25 border-primary/30",
      B1: "bg-gradient-to-t from-primary/75 to-primary/50 border-primary/40",
      B2: "bg-gradient-to-t from-primary to-primary/70 border-primary/60",
    };
    return `${ramp[code]} hover:brightness-110 hover:ring-2 hover:ring-primary/30`;
  };

  const codeClasses = (code: string) => {
    if (code === "A0") return "text-ink";
    if (code === "C1") return dark ? "text-white/55" : "text-primary/60";
    if (dark) return "text-white group-hover:text-ink";
    return code === "A1" || code === "A2"
      ? "text-primary-deep"
      : "text-white drop-shadow-sm";
  };

  const labelClasses = (code: string) => {
    if (code === "A0") return "text-ink/70";
    if (code === "C1") return dark ? "text-white/45" : "text-primary/45";
    if (dark) return "text-white/60 group-hover:text-ink/70";
    return code === "A1" || code === "A2"
      ? "text-primary-deep/70"
      : "text-white/80";
  };

  const openStep = open !== null ? STEPS[open] : null;

  return (
    <div>
      <div ref={ref} className="relative h-72 w-full sm:h-96" dir="rtl">
        {/* tooltip */}
        <AnimatePresence>
          {openStep && (
            <m.div
              key={openStep.code}
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 320, damping: 24 }}
              className="absolute inset-x-0 top-0 z-30 mx-auto w-fit max-w-[92%]"
            >
              <div className="card flex items-start gap-3 p-4 pe-3 text-start shadow-lifted">
                <span className="grid h-11 w-14 shrink-0 place-items-center rounded-xl bg-primary text-sm font-black text-white">
                  {openStep.code}
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-black">{openStep.learn}</p>
                  {openStep.course ? (
                    <Link
                      href={openStep.course.href}
                      className="mt-1 inline-flex items-center gap-1.5 text-sm font-black text-primary hover:underline"
                    >
                      انقر هنا لمزيد عن {openStep.course.title}
                      <ArrowMotif className="h-2 w-3 -rotate-90 text-accent" />
                    </Link>
                  ) : (
                    <p className="mt-1 text-sm font-bold text-ink/50">
                      نبّهك عند الافتتاح من صفحة الدورات
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(null)}
                  aria-label="إغلاق"
                  className="ms-1 grid h-8 w-8 shrink-0 place-items-center rounded-lg text-ink/40 hover:bg-section hover:text-ink"
                >
                  <X className="h-4 w-4" aria-hidden />
                </button>
              </div>
            </m.div>
          )}
        </AnimatePresence>

        {/* one precise ascent path connecting the step tops */}
        <svg
          aria-hidden
          className={`absolute inset-0 h-full w-full ${dark ? "text-white/25" : "text-primary/20"}`}
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path
            d="M 91.7 74 L 8.3 15"
            stroke="currentColor"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            style={{ strokeWidth: 3, strokeDasharray: "1 9" }}
          />
        </svg>
        {/* single summit arrow at the path's end */}
        <ArrowMotif
          aria-hidden
          className="absolute z-[5] h-4 w-6 -rotate-45 text-accent drop-shadow-sm"
          style={{ insetInlineEnd: "88%", top: "7%" }}
        />

        {/* the climbing character */}
        <m.div
          aria-hidden
          className="absolute z-10 w-[11%] min-w-12 max-w-24 drop-shadow-lg"
          style={
            reduceMotion
              ? { insetInlineEnd: "80%", bottom: "76%" }
              : { insetInlineEnd: climbEnd, bottom: climbBottom }
          }
        >
          <Mascot name="shab-side" size="card" className="h-auto w-full" />
        </m.div>

        {/* the staircase */}
        <m.div
          className="absolute inset-0 flex items-end gap-1.5 sm:gap-2.5"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -80px 0px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09 } } }}
        >
          {STEPS.map((step, i) => (
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
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                aria-label={`مستوى ${step.code} — ${step.learn}`}
                className={`group absolute inset-0 block w-full overflow-hidden rounded-xl border transition-all duration-200 active:scale-[0.97] sm:rounded-2xl ${stepClasses(step.code)}`}
              >
                <span className="absolute inset-x-0 top-2.5 flex flex-col items-center gap-0.5 sm:top-4">
                  <span
                    className={`text-sm font-black sm:text-xl ${codeClasses(step.code)}`}
                  >
                    {step.code}
                  </span>
                  <span
                    className={`hidden text-xs font-bold sm:block ${labelClasses(step.code)}`}
                  >
                    {step.label}
                  </span>
                </span>

                {/* the foundation course's reach into A1/A2 */}
                {FOUNDATION_COVERAGE[step.code] && (
                  <span
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 border-t-2 border-accent-dark/60"
                    style={{
                      height: `${FOUNDATION_COVERAGE[step.code]}%`,
                      background: FOUNDATION_FILL,
                    }}
                  >
                    <span className="absolute inset-0 grid place-items-center p-0.5 sm:p-1">
                      <span className="max-w-full rounded-md bg-white/95 px-1.5 py-0.5 text-center text-[8px] font-black leading-[1.3] text-ink shadow-sm sm:rounded-lg sm:px-2.5 sm:text-[11px] sm:leading-[1.35]">
                        التأسيس
                      </span>
                    </span>
                  </span>
                )}
              </button>
            </m.div>
          ))}
        </m.div>
      </div>

      <div className="mt-4 flex flex-col items-center gap-2">
        <p
          className={`text-center text-sm font-bold ${dark ? "text-white/70" : "text-ink/60"}`}
        >
          اضغط أي درجة وشوف وش تتعلم فيها
        </p>
        <p
          className={`inline-flex items-center gap-2 text-xs font-bold ${dark ? "text-white/60" : "text-ink/55"}`}
        >
          <span
            aria-hidden
            className="inline-block h-3.5 w-6 rounded border border-accent-dark/60"
            style={{ background: FOUNDATION_FILL }}
          />
          المناطق الصفراء تغطيها دورة التأسيس A0
        </p>
      </div>

      {cta && (
        <div className="mt-6 flex flex-col items-center gap-3 text-center">
          <p className={`font-bold ${dark ? "text-white/80" : "text-ink/70"}`}>
            مو متأكد من مستواك؟ حدّده الآن وبنقترح عليك الدورة اللي تناسبك
          </p>
          <WhatsAppButton
            message={site.whatsapp.msgLevel}
            source="ladder"
            variant="solid"
          >
            حدّد مستواك عبر الواتساب
          </WhatsAppButton>
        </div>
      )}
    </div>
  );
}
