"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { m, AnimatePresence } from "framer-motion";
import { RotateCcw, Timer, UserX, ListChecks } from "lucide-react";
import { Mascot } from "@/components/Mascot";
import { ArrowMotif } from "@/components/ArrowMotif";
import { SallaButton } from "@/components/SallaButton";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { site } from "@/config/site";
import { track } from "@/lib/track";
import { celebrate } from "@/lib/confetti";
import {
  questions,
  scoreToLevel,
  LEVEL_INFO,
  type LevelCode,
} from "@/content/test-questions";

type Phase = "intro" | "quiz" | "result";

const STORAGE_KEY = "zedlevel_level";

/**
 * The Free Level Test — the funnel engine (build spec §8).
 * Client-only: intro → 20 MCQs (auto-advance) → level result →
 * recommended course (Salla) + WhatsApp lead capture with the result
 * baked into the pre-filled message.
 */
export function LevelTest() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [idx, setIdx] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [level, setLevel] = useState<LevelCode | null>(null);
  const [saved, setSaved] = useState<LevelCode | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    try {
      const s = localStorage.getItem(STORAGE_KEY) as LevelCode | null;
      if (s && LEVEL_INFO[s]) setSaved(s);
    } catch {
      /* private mode */
    }
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const start = () => {
    track("test_start");
    setIdx(0);
    setCorrect(0);
    setSelected(null);
    setLevel(null);
    setPhase("quiz");
    window.scrollTo({ top: 0 });
  };

  const finish = (finalCorrect: number) => {
    const lvl = scoreToLevel(finalCorrect);
    setLevel(lvl);
    setSaved(lvl);
    try {
      localStorage.setItem(STORAGE_KEY, lvl);
    } catch {
      /* private mode */
    }
    track("test_complete", { level: lvl });
    setPhase("result");
    window.scrollTo({ top: 0 });
    setTimeout(celebrate, 300);
  };

  const choose = (i: number) => {
    if (selected !== null) return;
    setSelected(i);
    const nextCorrect = correct + (i === questions[idx].answer ? 1 : 0);
    setCorrect(nextCorrect);
    timer.current = setTimeout(() => {
      setSelected(null);
      if (idx + 1 >= questions.length) finish(nextCorrect);
      else setIdx(idx + 1);
    }, 350);
  };

  const showSavedResult = () => {
    if (!saved) return;
    setLevel(saved);
    setPhase("result");
    window.scrollTo({ top: 0 });
  };

  /* ═══ Intro ═══ */
  if (phase === "intro") {
    return (
      <section className="relative overflow-hidden bg-hero-glow">
        <div
          aria-hidden
          className="absolute inset-0 bg-dots [mask-image:radial-gradient(60%_55%_at_50%_0%,black,transparent)]"
        />
        <div
          aria-hidden
          className="orb orb-blue absolute -top-24 start-[-8rem] h-96 w-96"
        />
        <Stagger className="container-site relative flex flex-col items-center gap-7 py-16 text-center lg:py-20">
          <StaggerItem>
            <Mascot
              name="girl-front"
              size="section"
              priority
              className="h-52 w-auto animate-breathe drop-shadow-xl sm:h-64"
            />
          </StaggerItem>

          <StaggerItem>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-white px-4 py-1.5 text-sm font-black text-primary shadow-soft">
              <ArrowMotif className="h-2.5 w-3.5 text-accent" />
              اختبار تحديد المستوى
            </span>
            <h1 className="mt-4 text-3xl font-black sm:text-5xl">
              حدد مستواك في دقائق
            </h1>
            <p className="mx-auto mt-4 max-w-[48ch] text-lg leading-9 text-ink/65">
              أسئلة متدرجة — وفي النهاية مستواك بدقة وتوصيتك المباشرة.
            </p>
          </StaggerItem>

          <StaggerItem>
            <div className="flex flex-wrap items-center justify-center gap-2.5">
            {[
              { icon: ListChecks, text: `${questions.length} سؤالًا` },
              { icon: Timer, text: "5 دقائق تقريبًا" },
              { icon: UserX, text: "بدون تسجيل" },
            ].map((c) => (
              <span
                key={c.text}
                className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-ink/70 shadow-soft"
              >
                <c.icon className="h-4 w-4 text-primary" aria-hidden />
                {c.text}
              </span>
            ))}
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="flex flex-col items-center gap-3">
              <button type="button" onClick={start} className="btn btn-primary text-lg">
                ابدأ الاختبار الآن
              </button>
              <p className="text-sm font-bold text-ink/55">
                مجاني — وما نطلب منك أي بيانات
              </p>
            </div>
          </StaggerItem>

          {saved && (
            <StaggerItem className="w-full max-w-md">
            <div className="card mt-2 flex w-full flex-col items-center gap-3 p-6">
              <p className="font-bold text-ink/70">
                عندك نتيجة محفوظة من زيارة سابقة:{" "}
                <span className="text-xl font-black text-primary">{saved}</span>
              </p>
              <div className="flex flex-wrap justify-center gap-2.5">
                <button
                  type="button"
                  onClick={showSavedResult}
                  className="btn btn-outline !min-h-11 !px-5 !py-2 text-sm"
                >
                  تابع لمستواك
                </button>
                <button
                  type="button"
                  onClick={start}
                  className="btn !min-h-11 !px-5 !py-2 text-sm text-ink/60 hover:text-primary"
                >
                  <RotateCcw className="h-4 w-4" aria-hidden />
                  أعد الاختبار
                </button>
              </div>
            </div>
            </StaggerItem>
          )}
        </Stagger>
      </section>
    );
  }

  /* ═══ Quiz ═══ */
  if (phase === "quiz") {
    const q = questions[idx];
    const pct = (idx / questions.length) * 100;
    return (
      <section className="bg-hero-glow min-h-[70vh]">
        <div className="container-site max-w-2xl py-12 lg:py-16">
          {/* progress */}
          <div className="mb-8">
            <div className="mb-2 flex items-center justify-between text-sm font-black">
              <span className="text-primary">
                سؤال {idx + 1} من {questions.length}
              </span>
              <span className="text-ink/40">{Math.round(pct)}%</span>
            </div>
            <div className="relative h-2.5 rounded-full bg-primary-soft/60">
              <div
                className="absolute inset-y-0 start-0 rounded-full bg-primary transition-all duration-300"
                style={{ width: `${pct}%` }}
              />
              <ArrowMotif
                aria-hidden
                className="absolute -top-2 h-3.5 w-5 -translate-x-1/2 text-accent drop-shadow transition-all duration-300 ltr:translate-x-1/2"
                style={{ insetInlineStart: `${pct}%` } as React.CSSProperties}
              />
            </div>
          </div>

          {/* question — springs in from the reading direction */}
          <AnimatePresence mode="wait">
            <m.div
              key={idx}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
              className="card p-7 sm:p-9"
            >
              <p dir="auto" className="text-xl font-black leading-relaxed sm:text-2xl">
                {q.prompt}
              </p>
              <div
                className={`mt-7 grid gap-3 ${selected !== null ? "pointer-events-none" : ""}`}
              >
                {q.options.map((opt, i) => (
                  <m.button
                    key={opt}
                    type="button"
                    data-option
                    onClick={() => choose(i)}
                    whileTap={{ scale: 0.98 }}
                    animate={
                      selected === i ? { scale: [1, 1.045, 1] } : { scale: 1 }
                    }
                    transition={{ duration: 0.3 }}
                    className={`min-h-14 rounded-2xl border-2 px-5 py-3.5 text-start text-lg font-bold transition-colors ${
                      selected === i
                        ? "border-primary bg-primary text-white shadow-glow-blue"
                        : "border-ink/10 bg-white hover:border-primary hover:bg-primary-light"
                    }`}
                  >
                    <bdi>{opt}</bdi>
                  </m.button>
                ))}
              </div>
            </m.div>
          </AnimatePresence>

          <p className="mt-5 text-center text-sm font-bold text-ink/55">
            لا تشيل هم الغلط — الاختبار يتدرج معك
          </p>
        </div>
      </section>
    );
  }

  /* ═══ Result ═══ */
  const lvl = level ?? "A0";
  const info = LEVEL_INFO[lvl];
  return (
    <section className="bg-hero-glow">
      <div className="container-site flex flex-col items-center py-14 text-center lg:py-20">
        <Mascot
          name="shab-front"
          size="section"
          priority
          className="h-44 w-auto animate-breathe drop-shadow-xl sm:h-56"
        />

        <p className="mt-6 text-lg font-bold text-ink/60">نتيجتك جاهزة 🎉</p>
        <m.div
          className="mt-3"
          initial={{ scale: 0.35, rotate: -8, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 170, damping: 12, delay: 0.12 }}
        >
          <span className="inline-block rounded-3xl bg-primary px-8 py-3 text-5xl font-black text-white shadow-glow-blue sm:text-6xl">
            {lvl}
          </span>
        </m.div>
        <h1 className="mt-5 text-2xl font-black sm:text-3xl">
          مستواك: {lvl}
        </h1>
        <p className="mx-auto mt-3 max-w-[50ch] text-lg leading-9 text-ink/65">
          {info.meaning}
        </p>
        <p className="mx-auto mt-2 max-w-[46ch] text-sm font-semibold text-ink/55">
          النتيجة تقديرية بناءً على إجاباتك — وتتأكد معنا في أول أسبوع دروس
        </p>

        {/* recommended course */}
        <m.div
          className="card mt-10 w-full max-w-xl p-7 text-start sm:p-9"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 18, delay: 0.35 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-primary-light px-3.5 py-1 text-sm font-black text-primary">
            <ArrowMotif className="h-2.5 w-3.5 text-accent" />
            الدورة المناسبة لمستواك
          </span>
          <h2 className="mt-3 text-2xl font-black">{info.course.title}</h2>
          <p className="mt-1.5 leading-8 text-ink/65">{info.course.note}</p>
          <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-section px-3.5 py-1.5 text-sm font-bold text-ink/60">
            {info.course.stats}
          </p>

          <div className="mt-6 flex flex-col gap-3.5">
            {info.course.salla ? (
              <>
                <SallaButton
                  course={info.course.salla}
                  source="test-result"
                  hero
                  className="sm:!w-full [&>*]:sm:!w-full"
                />
                <WhatsAppButton
                  message={site.whatsapp.msgAfterTest(lvl)}
                  source="test-result"
                  className="!w-full"
                >
                  استشارة سريعة بالواتساب
                </WhatsAppButton>
              </>
            ) : (
              <>
                <WhatsAppButton
                  message={site.whatsapp.msgAfterTest(lvl)}
                  source="test-result"
                  variant="solid"
                  className="!w-full"
                >
                  كلمنا على الواتساب — نرشدك للأنسب
                </WhatsAppButton>
                <Link href={info.course.href} className="btn btn-outline w-full">
                  تصفح الدورات
                </Link>
              </>
            )}
            {info.course.salla && (
              <Link
                href={info.course.href}
                className="text-center text-sm font-bold text-primary hover:underline"
              >
                شوف تفاصيل الدورة كاملة
              </Link>
            )}
          </div>
        </m.div>

        <button
          type="button"
          onClick={start}
          className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-ink/50 transition-colors hover:text-primary"
        >
          <RotateCcw className="h-4 w-4" aria-hidden />
          أعد الاختبار من جديد
        </button>
      </div>
    </section>
  );
}
