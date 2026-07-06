"use client";

import { CalendarClock, SlidersHorizontal, Mic, BadgeCheck } from "lucide-react";
import { m } from "framer-motion";
import type { LucideIcon } from "lucide-react";

/**
 * "ليش تنضم لدوراتنا؟" — a polished vertical stepper (RTL).
 * A soft gradient rail runs down the start edge; each step is a full-width card
 * with its icon node sitting on the rail, a large ghost number, title, and a
 * short supporting line. Cards fade/slide in on scroll (staggered). Ends with
 * a centered CTA.
 */

type Step = {
  icon: LucideIcon;
  title: string;
  desc: string;
  /** node gradient (brand colors only) */
  node: string;
  /** icon color on the node (dark on the gold node, white otherwise) */
  iconColor: string;
};

const STEPS: Step[] = [
  {
    icon: CalendarClock,
    title: "روتين يناسب وقتك",
    desc: "دروس قصيرة تكمّلها في ١٥–٢٠ دقيقة باليوم",
    node: "from-primary to-primary-dark",
    iconColor: "text-white",
  },
  {
    icon: SlidersHorizontal,
    title: "دورات مبنية على احتياجك",
    desc: "محتوى مركّز على الأكثر استخدامًا، مو كل شي",
    node: "from-accent to-accent-dark",
    iconColor: "text-ink",
  },
  {
    icon: Mic,
    title: "دروس مباشرة تمارس فيها",
    desc: "تطبّق اللي تعلمته مع معلمك في مجموعة صغيرة",
    node: "from-navy to-primary-deep",
    iconColor: "text-white",
  },
  {
    icon: BadgeCheck,
    title: "اختبار وشهادة تثبّت نجاحك",
    desc: "اختبار لكل دورة، وشهادة عند إتمام المستوى",
    node: "from-primary to-navy",
    iconColor: "text-white",
  },
];

export function WhyJoinTimeline({
  cta,
}: {
  /** the CTA button rendered at the end (e.g. a SallaButton) */
  cta?: React.ReactNode;
}) {
  return (
    <div className="relative mx-auto w-full max-w-xl">
      <ol className="relative flex flex-col gap-4 sm:gap-5">
        {/* the rail — runs along the start (RTL: right) edge, behind the nodes */}
        <span
          aria-hidden
          className="absolute inset-y-6 end-7 w-1 rounded-full bg-gradient-to-b from-primary via-accent to-navy sm:end-8"
        />

        {STEPS.map((step, i) => (
          <m.li
            key={step.title}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex items-stretch gap-4 ps-1"
          >
            {/* node on the rail */}
            <div className="relative z-10 flex shrink-0 flex-col items-center">
              <span
                className={`grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${step.node} ${step.iconColor} shadow-[0_10px_24px_-8px_rgba(0,71,255,.5)] ring-4 ring-section`}
              >
                <step.icon className="h-6 w-6" aria-hidden />
              </span>
            </div>

            {/* card */}
            <div className="group relative flex-1 overflow-hidden rounded-2xl border border-ink/[0.07] bg-white p-4 shadow-[0_8px_24px_-14px_rgba(15,23,41,.25)] transition-shadow hover:shadow-[0_14px_30px_-14px_rgba(15,23,41,.3)] sm:p-5">
              {/* ghost step number — kept on the end (RTL: left) so it never
                  sits behind the right-aligned Arabic text */}
              <span
                aria-hidden
                className="pointer-events-none absolute -bottom-3 end-3 select-none text-[4.5rem] font-black leading-none text-primary/[0.06]"
              >
                {i + 1}
              </span>
              <h3 className="relative text-lg font-black text-ink sm:text-xl">
                {step.title}
              </h3>
              <p className="relative mt-1 text-sm font-semibold leading-6 text-ink/55 sm:text-[15px]">
                {step.desc}
              </p>
            </div>
          </m.li>
        ))}
      </ol>

      {cta && (
        <m.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-10 flex justify-center"
        >
          {cta}
        </m.div>
      )}
    </div>
  );
}
