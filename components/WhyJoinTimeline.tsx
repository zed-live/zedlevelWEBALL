"use client";

import { CalendarClock, SlidersHorizontal, Mic, BadgeCheck } from "lucide-react";
import { m } from "framer-motion";
import type { LucideIcon } from "lucide-react";

/**
 * "ليش تنضم لدوراتنا؟" — a mobile-first vertical timeline (RTL):
 * a centered vertical gradient line with 4 numbered rounded-square colored
 * nodes on it. Beside each node a title-only chip alternates right/left of the
 * line. Nodes + chips fade/slide in on scroll (staggered). Ends with a CTA.
 */

type Step = {
  icon: LucideIcon;
  title: string;
  /** node gradient (rounded-square icon) — brand colors only */
  node: string;
  /** icon color on the node (dark on the gold node, white otherwise) */
  iconColor: string;
};

const STEPS: Step[] = [
  {
    icon: CalendarClock,
    title: "روتين يناسب وقتك",
    node: "from-primary to-primary-dark",
    iconColor: "text-white",
  },
  {
    icon: SlidersHorizontal,
    title: "دورات مبنية على احتياجك",
    node: "from-accent to-accent-dark",
    iconColor: "text-ink",
  },
  {
    icon: Mic,
    title: "دروس مباشرة تمارس فيها",
    node: "from-navy to-primary-deep",
    iconColor: "text-white",
  },
  {
    icon: BadgeCheck,
    title: "اختبار وشهادة تثبّت نجاحك",
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
    <div className="relative mx-auto w-full max-w-2xl">
      {/* the vertical gradient line, centered */}
      <span
        aria-hidden
        className="absolute inset-y-2 left-1/2 w-1 -translate-x-1/2 rounded-full bg-gradient-to-b from-primary via-accent to-navy opacity-90"
      />

      <ol className="relative flex flex-col gap-10 sm:gap-12">
        {STEPS.map((step, i) => {
          const isRight = i % 2 === 0; // alternate: even → chip on the right
          return (
            <li
              key={step.title}
              className="relative grid grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-6"
            >
              {/* right cell (RTL start) */}
              <div className={`flex justify-end ${isRight ? "" : "invisible"}`}>
                {isRight && (
                  <Chip title={step.title} delay={i * 0.12} from="right" />
                )}
              </div>

              {/* the node on the line */}
              <m.span
                initial={{ scale: 0.4, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.4,
                  delay: i * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${step.node} ${step.iconColor} shadow-lg ring-4 ring-section sm:h-16 sm:w-16`}
              >
                <step.icon className="h-6 w-6 sm:h-7 sm:w-7" aria-hidden />
                {/* number badge */}
                <span className="absolute -top-2 -right-2 grid h-6 w-6 place-items-center rounded-full bg-white text-xs font-black text-ink shadow-md">
                  {i + 1}
                </span>
              </m.span>

              {/* left cell (RTL end) */}
              <div className={`flex justify-start ${isRight ? "invisible" : ""}`}>
                {!isRight && (
                  <Chip title={step.title} delay={i * 0.12} from="left" />
                )}
              </div>
            </li>
          );
        })}
      </ol>

      {cta && <div className="mt-12 flex justify-center">{cta}</div>}
    </div>
  );
}

function Chip({
  title,
  delay,
  from,
}: {
  title: string;
  delay: number;
  from: "right" | "left";
}) {
  return (
    <m.span
      initial={{ opacity: 0, x: from === "right" ? 24 : -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: delay + 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="inline-block rounded-2xl border border-ink/10 bg-white px-4 py-3 text-start text-[15px] font-black leading-tight text-ink shadow-soft sm:text-lg"
    >
      {title}
    </m.span>
  );
}
