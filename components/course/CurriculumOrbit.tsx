"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A0 curriculum "orbit" — a center core (the course) with four category
 * corners whose topic text cycles through real curriculum items, then flips to
 * "…وغيرها الكثير" before reshuffling. Native rebuild of the standalone HTML
 * mock, in the site's design system. Client component (timers + animation).
 */

type Cat = {
  key: "vocab" | "grammar" | "sound" | "convo";
  name: string;
  count?: string;
  topics: string[];
  /** tailwind classes: box bg/border + name color + "more" color */
  box: string;
  name_cls: string;
  more_cls: string;
  /** grid position (RTL): tr, tl, br, bl */
  pos: string;
};

const CATS: Cat[] = [
  {
    key: "vocab",
    name: "المفردات",
    count: "+460 كلمة",
    topics: [
      "العائلة", "المشاعر", "الألوان", "الوقت", "الطقس", "البيت", "الأكل",
      "اللبس", "المواصلات", "الأماكن", "التحية", "أهم 100 كلمة", "الجسم",
      "الدراسة", "الدول",
    ],
    box: "border-purple-200 bg-purple-50",
    name_cls: "text-purple-600",
    more_cls: "text-purple-600",
    pos: "left-[31%] top-[27%]",
  },
  {
    key: "grammar",
    name: "القواعد الأساسية",
    topics: [
      "a / an / the", "المفرد والجمع", "ضمائر الفاعل", "ضمائر المفعول",
      "أنواع الأسئلة", "الصفات الملكية", "الأفعال المساعدة", "أسماء الإشارة",
      "أقسام الكلام", "الاختصارات",
    ],
    box: "border-primary-soft bg-primary-light",
    name_cls: "text-primary",
    more_cls: "text-primary",
    pos: "left-[69%] top-[27%]",
  },
  {
    key: "sound",
    name: "صوتيات ونطق",
    topics: ["ch", "sh", "th", "ph", "wh", "ck", "tion", "ough", "qu", "نطق A–Z"],
    box: "border-emerald-200 bg-emerald-50",
    name_cls: "text-emerald-600",
    more_cls: "text-emerald-600",
    pos: "left-[69%] top-[73%]",
  },
  {
    key: "convo",
    name: "المحادثة",
    count: "مواقف يومية",
    topics: [
      "التعريف بالنفس", "السؤال عن الحال", "تكوين جملة", "تكوين سؤال",
      "قراءة الوقت", "العدّ للمليون",
    ],
    box: "border-orange-200 bg-orange-50",
    name_cls: "text-orange-600",
    more_cls: "text-orange-600",
    pos: "left-[31%] top-[73%]",
  },
];

const PER_LOOP = 7;

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    // deterministic-free shuffle is fine on the client
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function Corner({ cat, delayMs }: { cat: Cat; delayMs: number }) {
  const [text, setText] = useState(cat.topics[0]);
  const [isMore, setIsMore] = useState(false);
  const [swap, setSwap] = useState(false);
  const queue = useRef<string[]>(shuffle(cat.topics).slice(0, PER_LOOP));
  const step = useRef(0);

  useEffect(() => {
    const id = setInterval(() => {
      setSwap(true);
      setTimeout(() => {
        if (step.current < queue.current.length) {
          setText(queue.current[step.current]);
          setIsMore(false);
          step.current += 1;
        } else {
          setText("…وغيرها الكثير");
          setIsMore(true);
          queue.current = shuffle(cat.topics).slice(0, PER_LOOP);
          step.current = 0;
        }
        setSwap(false);
      }, 320);
    }, 1800 + delayMs);
    return () => clearInterval(id);
  }, [cat.topics, delayMs]);

  return (
    <div
      className={`absolute z-10 flex h-24 w-[38%] max-w-[15rem] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-0.5 rounded-2xl border-2 p-3 text-center shadow-lifted sm:h-28 sm:w-[34%] ${cat.box} ${cat.pos}`}
    >
      <div className={`text-sm font-black leading-tight sm:text-lg ${cat.name_cls}`}>
        {cat.name}
      </div>
      <div
        className={`min-h-[1.4em] text-base font-extrabold text-slate-700 transition-all duration-300 sm:text-xl ${
          swap ? "translate-y-1.5 opacity-0" : "opacity-100"
        } ${isMore ? `italic ${cat.more_cls}` : ""}`}
      >
        <bdi>{text}</bdi>
      </div>
      {cat.count && (
        <div className="hidden text-[11px] font-extrabold text-slate-400 sm:block">
          {cat.count}
        </div>
      )}
    </div>
  );
}

export function CurriculumOrbit() {
  return (
    <div className="mx-auto flex max-w-[860px] justify-center">
      <div className="relative aspect-square w-[min(760px,96vw)]">
        {/* dashed diagonals to the center */}
        <svg
          className="absolute inset-0 z-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden
        >
          {[
            [31, 27], [69, 27], [31, 73], [69, 73],
          ].map(([x, y], i) => (
            <line
              key={i}
              x1={x}
              y1={y}
              x2="50"
              y2="50"
              stroke="#dfe4f2"
              strokeWidth="0.5"
              strokeDasharray="2 2"
            />
          ))}
        </svg>

        {CATS.map((c, i) => (
          <Corner key={c.key} cat={c} delayMs={i * 250} />
        ))}

        {/* center core */}
        <div className="absolute left-1/2 top-1/2 z-[5] flex aspect-square w-[min(210px,32%)] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-line bg-white p-[6%] text-center shadow-[0_20px_50px_-18px_rgba(0,71,255,.5),0_0_0_12px_rgba(255,255,255,.95)]">
          <div className="text-xs font-extrabold leading-none text-ink/50 sm:text-base">
            دورة
          </div>
          <div className="mt-1 bg-gradient-to-l from-primary to-purple-600 bg-clip-text text-lg font-black leading-tight text-transparent sm:text-2xl">
            التأسيس الصحيح
          </div>
          <div className="mt-2 text-[10px] font-extrabold leading-relaxed text-ink/50 sm:text-xs">
            +460 كلمة · 26 درس
          </div>
        </div>
      </div>
    </div>
  );
}
