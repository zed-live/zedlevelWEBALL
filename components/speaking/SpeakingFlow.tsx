"use client";

import { useEffect, useRef, useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Mic, Check, ChevronLeft, RotateCcw } from "lucide-react";
import { ArrowMotif } from "@/components/ArrowMotif";
import { WhatsAppIcon } from "@/components/WhatsAppButton";
import { DevTodoBadge } from "@/components/DevTodoBadge";
import { waLink } from "@/lib/whatsapp";
import { track } from "@/lib/track";

/**
 * Speaking test flow — rebuilt from the academy's speaking-test_3.html
 * in ZEDLEVEL branding. The flow is INTENTIONAL lead-gen:
 * pick level → read text → tap record → the recording hands off to
 * WhatsApp, where the voice note (the lead) actually arrives.
 */
const TEXTS: Record<string, { label: string; name: string; hint: string; text: string }> = {
  "A1-A2": {
    label: "A1·A2",
    name: "مبتدئ",
    hint: "جُمل قصيرة وبسيطة",
    text: "My name is Sara. I live in Riyadh with my family. Every morning I drink tea and go to school. I like reading books and playing with my friends. On Friday, we visit my grandmother. She makes very good food. I am happy with my life.",
  },
  "B1-B2": {
    label: "B1·B2",
    name: "متوسط",
    hint: "فقرة بمفردات أوسع",
    text: "Learning a new language is not always easy, but it is very rewarding. At first, you may feel nervous when you speak, and that is completely normal. The secret is to practise a little every day and not to be afraid of mistakes. Over time, your confidence grows, and you start to understand more than you expected.",
  },
  "C1-C2": {
    label: "C1·C2",
    name: "متقدم",
    hint: "نص بلغة معقّدة",
    text: "Fluency is often misunderstood as the ability to speak quickly, when in reality it is about communicating ideas clearly and naturally under pressure. A truly proficient speaker can adapt their tone, navigate unfamiliar topics, and convey subtle meaning without hesitation. Achieving this level demands not only vocabulary, but also a deep familiarity with the rhythm and culture of the language.",
  },
};

const LEVEL_STYLES: Record<string, string> = {
  "A1-A2": "bg-gradient-to-bl from-accent to-accent-dark text-ink",
  "B1-B2": "bg-gradient-to-bl from-primary to-primary-deep text-white",
  "C1-C2": "bg-gradient-to-bl from-primary-deep to-navy text-white border border-white/20",
};

const CIRC = 446; // 2πr, r=71
const REC_MS = 1600;

type Screen = "level" | "read" | "record" | "done";

export function SpeakingFlow() {
  const [screen, setScreen] = useState<Screen>("level");
  const [level, setLevel] = useState<string>("A1-A2");
  const [recording, setRecording] = useState(false);
  const [used, setUsed] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [progress, setProgress] = useState(0);
  const [popup, setPopup] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const rafRef = useRef<number | null>(null);

  const t = TEXTS[level];
  const waMsg = `📝 اختبار المحادثة\nالمستوى: ${level}\n\nالنص:\n${t.text}\n\n🎤 سأرسل تسجيلي الصوتي الآن.`;
  const href = waLink(waMsg);

  useEffect(
    () => () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    },
    [],
  );

  const resetRecorder = () => {
    setRecording(false);
    setUsed(false);
    setSeconds(0);
    setProgress(0);
    if (timerRef.current) clearInterval(timerRef.current);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  };

  const startRecording = () => {
    if (used) {
      setPopup(true);
      return;
    }
    setUsed(true);
    setRecording(true);
    timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    const start = Date.now();
    const step = () => {
      const p = Math.min((Date.now() - start) / REC_MS, 1);
      setProgress(p);
      if (p < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        if (timerRef.current) clearInterval(timerRef.current);
        setPopup(true);
      }
    };
    rafRef.current = requestAnimationFrame(step);
  };

  const onWhatsApp = () => {
    track("whatsapp_click", { source: "speaking-flow", level });
    setPopup(false);
    setScreen("done");
  };

  const screenAnim = {
    initial: { opacity: 0, y: 16, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -12, scale: 0.98 },
    transition: { type: "spring" as const, stiffness: 220, damping: 24 },
  };

  return (
    <>
      <div className="relative z-10 mx-auto w-full max-w-md overflow-hidden rounded-[28px] border border-white/15 bg-navy/75 shadow-[0_44px_110px_-38px_rgba(0,0,0,.9)] backdrop-blur-xl">
        {/* top glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(120%_90%_at_50%_0%,rgb(248_190_76/0.14),transparent_72%)]"
        />
        <div className="relative p-6 text-center sm:p-7">
          {/* badge */}
          <span className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[13px] font-bold text-white">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            اختبار المحادثة
          </span>

          <AnimatePresence mode="wait">
            {/* ── 1: pick level ── */}
            {screen === "level" && (
              <m.div key="level" {...screenAnim}>
                <h2 className="text-[26px] font-black leading-snug text-white">
                  اختر <span className="text-accent">مستواك</span>
                </h2>
                <p className="mb-6 mt-1.5 text-[15px] font-semibold text-white/60">
                  بنعطيك نصًا على قده تقرأه بصوتك
                </p>
                <div className="flex flex-col gap-3">
                  {Object.entries(TEXTS).map(([key, v]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => {
                        setLevel(key);
                        resetRecorder();
                        setScreen("read");
                      }}
                      className="group flex min-h-14 items-center gap-3.5 rounded-2xl border border-white/15 bg-white/5 px-4 py-3.5 text-start transition-all hover:-translate-x-1 hover:border-accent active:scale-[0.98]"
                    >
                      <span
                        className={`grid h-12 w-16 shrink-0 place-items-center rounded-xl text-[15px] font-black ${LEVEL_STYLES[key]}`}
                      >
                        {v.label}
                      </span>
                      <span className="min-w-0">
                        <span className="block font-black text-white">
                          {v.name}
                        </span>
                        <span className="block text-[13px] font-semibold text-white/45">
                          {v.hint}
                        </span>
                      </span>
                      <ChevronLeft
                        className="ms-auto h-5 w-5 shrink-0 text-white/40 transition-transform group-hover:-translate-x-0.5"
                        aria-hidden
                      />
                    </button>
                  ))}
                </div>
              </m.div>
            )}

            {/* ── 2: read text ── */}
            {screen === "read" && (
              <m.div key="read" {...screenAnim}>
                <h2 className="text-[26px] font-black leading-snug text-white">
                  اقرأه <span className="text-accent">بصوت عالٍ</span>
                </h2>
                <p className="mb-5 mt-1.5 text-[15px] font-semibold text-white/60">
                  جهّز نفسك ثم انتقل للتسجيل
                </p>
                <div className="mb-6 rounded-2xl border border-white/15 border-s-4 border-s-accent bg-white/5 p-5 text-start">
                  <span className="mb-2 inline-block text-xs font-black tracking-wider text-accent">
                    {t.label}
                  </span>
                  <p dir="ltr" className="text-start text-[17px] font-semibold leading-8 text-white/90">
                    {t.text}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setScreen("record")}
                  className="btn btn-accent w-full text-[17px]"
                >
                  <Mic className="h-5 w-5" aria-hidden />
                  أنا جاهز للتسجيل
                </button>
                <button
                  type="button"
                  onClick={() => setScreen("level")}
                  className="mt-2 w-full py-3 text-sm font-bold text-white/50 transition-colors hover:text-white"
                >
                  ‹ تغيير المستوى
                </button>
              </m.div>
            )}

            {/* ── 3: record ── */}
            {screen === "record" && (
              <m.div key="record" {...screenAnim}>
                <div className="mb-4 max-h-[26vh] overflow-y-auto rounded-2xl border border-white/15 border-s-4 border-s-accent bg-white/5 p-4 text-start">
                  <span className="mb-1.5 inline-block text-xs font-black tracking-wider text-accent">
                    {t.label}
                  </span>
                  <p dir="ltr" className="text-start text-[15px] font-semibold leading-7 text-white/90">
                    {t.text}
                  </p>
                </div>

                {/* mic stage */}
                <div className="relative mx-auto mb-3 grid h-[148px] w-[148px] place-items-center">
                  <svg className="absolute inset-0 -rotate-90" viewBox="0 0 148 148" aria-hidden>
                    <defs>
                      <linearGradient id="zl-arc" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#f8be4c" />
                        <stop offset="100%" stopColor="#0047ff" />
                      </linearGradient>
                    </defs>
                    <circle cx="74" cy="74" r="71" fill="none" strokeWidth="6" className="stroke-white/10" />
                    <circle
                      cx="74"
                      cy="74"
                      r="71"
                      fill="none"
                      strokeWidth="6"
                      strokeLinecap="round"
                      stroke="url(#zl-arc)"
                      strokeDasharray={CIRC}
                      strokeDashoffset={CIRC * (1 - progress)}
                      style={{ filter: "drop-shadow(0 0 7px rgb(248 190 76 / .55))" }}
                    />
                  </svg>
                  {recording && (
                    <>
                      <span className="absolute h-24 w-24 animate-ping rounded-full border-2 border-[#ff5066] opacity-40" />
                      <span className="absolute h-24 w-24 animate-ping rounded-full border-2 border-[#ff5066] opacity-30 [animation-delay:600ms]" />
                    </>
                  )}
                  <button
                    type="button"
                    onClick={startRecording}
                    aria-label={recording ? "جارٍ التسجيل" : "ابدأ التسجيل"}
                    className={`relative z-10 grid h-24 w-24 place-items-center rounded-full border transition-all active:scale-95 ${
                      recording
                        ? "border-white/25 bg-gradient-to-b from-[#ff6379] to-[#d8324a] shadow-[0_0_0_10px_rgb(255_80_102/0.12),0_0_60px_rgb(255_80_102/0.45)]"
                        : "border-white/20 bg-gradient-to-b from-primary to-navy shadow-glow-blue hover:scale-105"
                    }`}
                  >
                    <Mic className="h-10 w-10 text-white drop-shadow" aria-hidden />
                  </button>
                </div>

                {/* wave */}
                <div className="mb-2 flex h-7 items-center justify-center gap-1.5" aria-hidden>
                  {Array.from({ length: 11 }).map((_, i) => (
                    <span
                      key={i}
                      className={`w-1 rounded-full transition-all ${
                        recording
                          ? "animate-pulse bg-gradient-to-b from-[#ff8a99] to-[#ff5066]"
                          : "bg-white/25"
                      }`}
                      style={{
                        height: recording ? `${8 + ((i * 7) % 18)}px` : "6px",
                        animationDelay: `${(i * 90) % 400}ms`,
                      }}
                    />
                  ))}
                </div>

                <p className={`text-[15px] font-bold ${recording ? "text-[#ff8a99]" : "text-white/60"}`}>
                  {recording ? "جارٍ التسجيل…" : "اضغط للتسجيل واقرأ النص"}
                </p>
                <p
                  className={`min-h-10 text-3xl font-black tabular-nums tracking-wider ${
                    recording ? "text-white" : "text-white/30"
                  }`}
                >
                  0:{String(seconds).padStart(2, "0")}
                </p>
              </m.div>
            )}

            {/* ── 4: done ── */}
            {screen === "done" && (
              <m.div key="done" {...screenAnim}>
                <div className="mx-auto mb-5 mt-2 grid h-20 w-20 place-items-center rounded-full border border-[#25D366]/40 bg-[#25D366]/15">
                  <Check className="h-10 w-10 text-[#25D366]" aria-hidden />
                </div>
                <h2 className="text-[26px] font-black leading-snug text-white">
                  خطوة أخيرة <span className="text-accent">🎙️</span>
                </h2>
                <p className="mx-auto mt-2 max-w-[32ch] text-[15px] font-semibold leading-8 text-white/65">
                  أرسل تسجيلك الصوتي في محادثة الواتساب اللي فتحناها لك —{" "}
                  <b className="text-white">ونرد عليك بالتقييم والتوصية.</b>
                </p>
                <button
                  type="button"
                  onClick={() => {
                    resetRecorder();
                    setScreen("level");
                  }}
                  className="mx-auto mt-6 flex items-center gap-2 py-2 text-sm font-bold text-white/50 transition-colors hover:text-white"
                >
                  <RotateCcw className="h-4 w-4" aria-hidden />
                  إجراء اختبار آخر
                </button>
              </m.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── WhatsApp handoff popup ── */}
      <AnimatePresence>
        {popup && (
          <m.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-navy/80 p-6 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              if (e.target === e.currentTarget) setPopup(false);
            }}
          >
            <m.div
              className="w-full max-w-sm rounded-3xl border border-white/15 bg-gradient-to-b from-primary-deep/90 to-navy p-8 text-center shadow-[0_54px_120px_-30px_rgba(0,0,0,.9)]"
              initial={{ opacity: 0, scale: 0.9, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-2xl border border-[#25D366]/40 bg-[#25D366]/15">
                <WhatsAppIcon className="h-8 w-8 text-[#25D366]" />
              </div>
              <h2 className="text-xl font-black text-white">
                تسجيلك يكتمل في الواتساب 🎤
              </h2>
              <p className="mt-2.5 text-[15px] font-semibold leading-8 text-white/65">
                أرسل قراءتك كرسالة صوتية — يستمع لها مقيّمنا ويرد عليك
                بمستواك وتوصيتك.
              </p>
              <a
                href={href ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  if (!href) {
                    e.preventDefault();
                    return;
                  }
                  onWhatsApp();
                }}
                className="btn btn-whatsapp relative mt-5 w-full text-[17px]"
              >
                <WhatsAppIcon className="h-5 w-5" />
                أرسل عبر واتساب
                {!href && <DevTodoBadge label="WHATSAPP_NUMBER" />}
              </a>
              <p className="mt-3.5 text-[13px] font-semibold text-white/45">
                سجّل صوتك داخل{" "}
                <b className="text-[#25D366]">واتساب</b> — أسهل وأسرع
              </p>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
