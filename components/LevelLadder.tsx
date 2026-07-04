"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { m, AnimatePresence, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { ArrowMotif } from "./ArrowMotif";
import { Mascot } from "./Mascot";
import { WhatsAppButton } from "./WhatsAppButton";
import { site } from "@/config/site";

/**
 * THE signature ZEDLEVEL visual — v3 per the homepage prompt:
 * ascending steps A0 → C1 (RTL: rises right → left) with orange arrows
 * between them, the character climbing on scroll, tappable steps that
 * open a "what you learn + linked course" tooltip, and the visitor's
 * stored level highlighted blue (others grey).
 */
const STEPS = [
  {
    code: "A0",
    label: "التأسيس",
    learn: "تقرأ وتنطق صح وتبني جملك الأولى",
    course: { title: "دورة التأسيس A0", href: "/courses/a0" },
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
  const [storedLevel, setStoredLevel] = useState<string | null>(null);
  const [open, setOpen] = useState<number | null>(null);
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
  const climbEnd = useTransform(scrollYProgress, [0, 1], ["1%", "84%"]);
  const climbBottom = useTransform(scrollYProgress, [0, 1], ["24%", "86%"]);

  const stepClasses = (code: string) => {
    if (storedLevel) {
      return storedLevel === code
        ? "border-primary bg-primary shadow-glow-blue"
        : dark
          ? "border-white/10 bg-white/[0.05]"
          : "border-ink/10 bg-ink/[0.05]";
    }
    // C1 is قريبًا — visibly not-yet-open
    if (code === "C1") {
      return dark
        ? "border-dashed border-white/20 bg-white/[0.04]"
        : "border-dashed border-ink/15 bg-ink/[0.03] hover:border-primary/40";
    }
    return dark
      ? "border-white/15 bg-white/10 hover:border-accent hover:bg-accent/90"
      : "border-primary/10 bg-primary-light hover:border-primary hover:bg-primary";
  };

  const codeClasses = (code: string) => {
    if (storedLevel) {
      return storedLevel === code
        ? "text-white"
        : dark
          ? "text-white/45"
          : "text-ink/40";
    }
    if (code === "C1") {
      return dark ? "text-white/50" : "text-ink/35";
    }
    return dark
      ? "text-white group-hover:text-ink"
      : "text-primary group-hover:text-white";
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
                      {openStep.course.title}
                      <ArrowMotif className="h-2 w-3 -rotate-90 text-accent" />
                    </Link>
                  ) : (
                    <p className="mt-1 text-sm font-bold text-ink/45">
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

        {/* dotted ascent path */}
        <svg
          aria-hidden
          className={`absolute inset-0 h-full w-full ${dark ? "text-white/20" : "text-primary/15"}`}
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path
            d="M 94 74 L 8 12"
            stroke="currentColor"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            style={{ strokeWidth: 3, strokeDasharray: "1 10" }}
          />
        </svg>

        {/* the climbing character */}
        <m.div
          aria-hidden
          className="absolute z-10 w-[13%] min-w-14 drop-shadow-lg"
          style={
            reduceMotion
              ? { insetInlineEnd: "84%", bottom: "86%" }
              : { insetInlineEnd: climbEnd, bottom: climbBottom }
          }
        >
          <Mascot name="shab-side" size="card" className="h-auto w-full" />
        </m.div>

        {/* orange arrows between steps */}
        {HEIGHTS.slice(0, -1).map((h, i) => (
          <ArrowMotif
            key={i}
            aria-hidden
            className="absolute z-[5] hidden h-3 w-4 -rotate-45 text-accent sm:block"
            style={{
              insetInlineEnd: `calc(${((i + 1) / 6) * 100}% - 0.5rem)`,
              bottom: `${(h + HEIGHTS[i + 1]) / 2 + 2}%`,
            }}
          />
        ))}

        {/* the staircase */}
        <m.div
          className="absolute inset-0 flex items-end gap-2 sm:gap-2.5"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -80px 0px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09 } } }}
        >
          {STEPS.map((step, i) => {
            const isStored = storedLevel === step.code;
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
                <button
                  type="button"
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                  aria-label={`مستوى ${step.code} — ${step.learn}`}
                  className={`group absolute inset-0 block w-full rounded-t-2xl border transition-[colors,transform] duration-200 active:scale-[0.97] ${stepClasses(step.code)}`}
                >
                  <span className="absolute inset-x-0 top-2.5 flex flex-col items-center gap-0.5 sm:top-4">
                    <span
                      className={`text-sm font-black sm:text-xl ${codeClasses(step.code)}`}
                    >
                      {step.code}
                    </span>
                    <span
                      className={`hidden text-[10px] font-bold sm:block ${
                        isStored
                          ? "text-white/85"
                          : dark
                            ? "text-white/60 group-hover:text-ink/70"
                            : "text-ink/45 group-hover:text-white/85"
                      }`}
                    >
                      {step.label}
                    </span>
                    {isStored && (
                      <span className="rounded-full bg-accent px-1.5 py-px text-[9px] font-black text-ink">
                        مستواك
                      </span>
                    )}
                  </span>
                </button>
              </m.div>
            );
          })}
        </m.div>
      </div>

      <p
        className={`mt-4 text-center text-sm font-bold ${dark ? "text-white/70" : "text-ink/55"}`}
      >
        اضغط أي درجة وشوف وش تتعلم فيها
      </p>

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
