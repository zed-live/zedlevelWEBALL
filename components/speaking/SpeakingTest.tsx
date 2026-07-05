"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import {
  Mic,
  RotateCcw,
  ArrowLeftRight,
  Check,
  X,
  Bot,
  ChevronLeft,
  MessageCircle,
} from "lucide-react";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { WhatsAppIcon } from "@/components/WhatsAppButton";
import { waLink } from "@/lib/whatsapp";
import { track } from "@/lib/track";
import {
  SPEAKING_LEVELS,
  partsFor,
  speakingMessage,
  readSource,
  type SpeakingLevel,
} from "@/content/speaking-test";

type Phase = "pick" | "record" | "done";

/**
 * Speaking test — native rebuild of the approved speaking.zedlevel.app flow,
 * in the ZEDLEVEL design system. Funnels the student to record ONE voice note
 * inside WhatsApp (2 answers + reading) with the level + prompts pre-filled.
 *
 * Flow: pick level → 3 parts (Q1 · Q2 · reading) with a demo recorder →
 * "choose evaluation" modal (AI paused / Human via WhatsApp) → WhatsApp steps
 * modal (opens the pre-filled chat) → success. Redo / change-level / restart
 * throughout; Esc closes any modal.
 */
export function SpeakingTest() {
  const [phase, setPhase] = useState<Phase>("pick");
  const [level, setLevel] = useState<SpeakingLevel>("A1-A2");
  const [partIdx, setPartIdx] = useState(0);
  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [modal, setModal] = useState<null | "choose" | "wa">(null);
  const [aiNote, setAiNote] = useState(false);
  const [source, setSource] = useState("مباشر");

  const tick = useRef<ReturnType<typeof setInterval> | null>(null);
  const autoPopup = useRef<ReturnType<typeof setTimeout> | null>(null);

  const parts = partsFor(level);
  const part = parts[partIdx];
  const waHref = waLink(speakingMessage(level, source));

  useEffect(() => setSource(readSource()), []);

  const clearTick = useCallback(() => {
    if (tick.current) {
      clearInterval(tick.current);
      tick.current = null;
    }
  }, []);

  const cancelAutoPopup = useCallback(() => {
    if (autoPopup.current) {
      clearTimeout(autoPopup.current);
      autoPopup.current = null;
    }
  }, []);

  // even if the student doesn't press record, offer the popup after 3s
  const armAutoPopup = useCallback(() => {
    cancelAutoPopup();
    autoPopup.current = setTimeout(() => setModal("choose"), 3000);
  }, [cancelAutoPopup]);

  const resetRecorder = useCallback(() => {
    setRecording(false);
    setSeconds(0);
    setAiNote(false);
    clearTick();
  }, [clearTick]);

  // when a new part loads on the record screen, reset + re-arm the auto popup
  useEffect(() => {
    if (phase !== "record") return;
    resetRecorder();
    armAutoPopup();
    return cancelAutoPopup;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, partIdx, level]);

  // Esc closes any open modal
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setModal(null);
        setAiNote(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => () => {
    clearTick();
    cancelAutoPopup();
  }, [clearTick, cancelAutoPopup]);

  const pickLevel = (lvl: SpeakingLevel) => {
    setLevel(lvl);
    setPartIdx(0);
    setPhase("record");
  };

  const startRecording = () => {
    cancelAutoPopup();
    setRecording(true);
    setSeconds(0);
    clearTick();
    tick.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    setModal("choose"); // demo: show the choice right away, as in the approved flow
  };

  const redo = () => {
    setModal(null);
    resetRecorder();
    armAutoPopup();
  };

  const changeLevel = () => {
    setModal(null);
    cancelAutoPopup();
    resetRecorder();
    setPhase("pick");
  };

  const chooseHuman = () => {
    setAiNote(false);
    setModal("wa");
  };

  const openWhatsApp = () => {
    cancelAutoPopup();
    track("whatsapp_click", { source: "speaking-test", level });
    setModal(null);
    setPhase("done");
    // the anchor itself opens WhatsApp in a new tab (waHref)
  };

  const restart = () => {
    resetRecorder();
    setPhase("pick");
  };

  const mmss = `0:${String(seconds).padStart(2, "0")}`;

  return (
    <div className="mx-auto w-full max-w-xl">
      <AnimatePresence mode="wait">
        {phase === "pick" && (
          <Screen key="pick">
            <PickLevel onPick={pickLevel} />
          </Screen>
        )}

        {phase === "record" && (
          <Screen key="record">
            <Recorder
              parts={parts}
              partIdx={partIdx}
              level={level}
              recording={recording}
              time={mmss}
              onMic={startRecording}
              onRedo={redo}
              onChangeLevel={changeLevel}
            />
          </Screen>
        )}

        {phase === "done" && (
          <Screen key="done">
            <Success onRestart={restart} />
          </Screen>
        )}
      </AnimatePresence>

      {/* ---- modals ---- */}
      <AnimatePresence>
        {modal === "choose" && (
          <Modal onClose={() => { setModal(null); setAiNote(false); }}>
            <ChooseEvaluation
              aiNote={aiNote}
              onAI={() => setAiNote(true)}
              onHuman={chooseHuman}
            />
          </Modal>
        )}

        {modal === "wa" && (
          <Modal onClose={() => setModal("choose")}>
            <WhatsAppSteps waHref={waHref} onOpen={openWhatsApp} />
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------------------------------------------------------------- screens */

function Screen({ children }: { children: React.ReactNode }) {
  return (
    <m.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </m.div>
  );
}

function LevelBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border-2 border-primary-soft bg-primary-light px-5 py-2 text-sm font-black text-primary">
      <span className="h-2.5 w-2.5 rounded-full bg-accent" />
      {label}
    </span>
  );
}

function PickLevel({ onPick }: { onPick: (l: SpeakingLevel) => void }) {
  return (
    <div className="text-center">
      <div className="mb-6 flex justify-center">
        <LevelBadge label="اللغة الإنجليزية" />
      </div>
      <h1 className="text-3xl font-black text-ink sm:text-4xl">
        تقييم <span className="text-primary">مستوى المحادثة</span>
      </h1>
      <p className="mt-3 text-base font-bold text-ink/55">
        اختر الصعوبة المناسبة للبدء.
      </p>

      <Stagger className="mt-8 flex flex-col gap-4">
        {SPEAKING_LEVELS.map((lvl) => (
          <StaggerItem key={lvl.code}>
            <button
              type="button"
              onClick={() => onPick(lvl.code)}
              className="group flex w-full items-center gap-4 rounded-2xl border border-ink/10 bg-section/60 p-4 text-start transition-all hover:border-primary/40 hover:bg-primary-light/60 hover:shadow-lifted"
            >
              <span
                className={`grid h-16 w-20 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${lvl.tag} text-lg font-black text-white shadow-md`}
              >
                {lvl.label}
              </span>
              <span className="flex-1">
                <span className="block text-lg font-black text-ink">
                  {lvl.title}
                </span>
                <span className="block text-sm font-bold text-ink/50">
                  {lvl.blurb}
                </span>
              </span>
              <ChevronLeft className="h-6 w-6 text-ink/30 transition-transform group-hover:-translate-x-1 group-hover:text-primary" />
            </button>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}

function Recorder({
  parts,
  partIdx,
  level,
  recording,
  time,
  onMic,
  onRedo,
  onChangeLevel,
}: {
  parts: ReturnType<typeof partsFor>;
  partIdx: number;
  level: SpeakingLevel;
  recording: boolean;
  time: string;
  onMic: () => void;
  onRedo: () => void;
  onChangeLevel: () => void;
}) {
  const part = parts[partIdx];
  const levelLabel = SPEAKING_LEVELS.find((l) => l.code === level)?.label ?? level;

  return (
    <div className="text-center">
      {/* step bar */}
      <div className="mx-auto mb-5 flex w-32 items-center gap-1.5">
        {parts.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              i < partIdx
                ? "bg-primary/40"
                : i === partIdx
                  ? "bg-primary"
                  : "bg-ink/10"
            }`}
          />
        ))}
      </div>

      <div className="mb-5 flex justify-center">
        <LevelBadge label={levelLabel} />
      </div>

      {/* prompt box */}
      <div
        className={`relative mx-auto max-w-md rounded-2xl border p-5 text-start shadow-sm ${
          part.type === "read"
            ? "border-primary/20 bg-primary-light/50"
            : "border-accent/40 bg-section/70"
        }`}
      >
        <span
          className={`absolute inset-y-0 end-0 w-1.5 rounded-e-2xl ${
            part.type === "read" ? "bg-primary/60" : "bg-accent"
          }`}
        />
        <p className="text-xs font-black text-accent-dark">{part.kind}</p>
        <p
          className="mt-2 text-lg font-black leading-relaxed text-ink"
          dir="ltr"
          style={{ textAlign: part.type === "read" ? "start" : "center" }}
        >
          {part.text}
        </p>
      </div>

      {/* mic */}
      <div className="relative mx-auto mt-8 grid h-40 w-40 place-items-center">
        {recording && (
          <>
            <span className="absolute h-40 w-40 animate-ping rounded-full bg-primary/20" />
            <span className="absolute h-32 w-32 rounded-full bg-primary/10" />
          </>
        )}
        <button
          type="button"
          onClick={onMic}
          aria-label="ابدأ التسجيل"
          className={`relative grid h-24 w-24 place-items-center rounded-full text-white shadow-xl transition-transform active:scale-95 ${
            recording
              ? "animate-pulse bg-gradient-to-br from-rose-500 to-rose-600"
              : "bg-gradient-to-br from-primary to-primary-dark"
          }`}
        >
          <Mic className="h-9 w-9" />
        </button>
        {recording && (
          <button
            type="button"
            onClick={onRedo}
            aria-label="إعادة هذا الجزء"
            className="absolute bottom-2 start-2 grid h-9 w-9 place-items-center rounded-full bg-white text-ink/70 shadow-md hover:text-primary"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* waveform */}
      <div className="mt-4 flex justify-center gap-1.5">
        {Array.from({ length: 11 }).map((_, i) => (
          <span
            key={i}
            className={`h-1.5 w-1.5 rounded-full ${
              recording ? "bg-rose-400" : "bg-ink/15"
            }`}
          />
        ))}
      </div>

      <p
        className={`mt-4 text-base font-black ${
          recording ? "text-rose-500" : "text-ink/50"
        }`}
      >
        {recording ? "جارٍ التسجيل…" : "انقر للبدء"}
      </p>
      <p
        className={`mt-1 text-3xl font-black tabular-nums ${
          recording ? "text-primary" : "text-ink/25"
        }`}
      >
        {time}
      </p>

      <div className="mt-6 flex justify-center">
        <button
          type="button"
          onClick={onChangeLevel}
          className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white px-5 py-2.5 text-sm font-bold text-ink/70 hover:border-primary/30 hover:text-primary"
        >
          <ArrowLeftRight className="h-4 w-4" />
          تغيير المستوى
        </button>
      </div>
    </div>
  );
}

function Success({ onRestart }: { onRestart: () => void }) {
  return (
    <div className="text-center">
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-emerald-100 text-emerald-600">
        <Check className="h-8 w-8" strokeWidth={3} />
      </div>
      <h1 className="mt-5 text-3xl font-black text-ink">
        تم <span className="text-accent-dark">التحويل لواتساب</span>
      </h1>
      <p className="mx-auto mt-3 max-w-md text-base font-bold text-ink/60">
        إن لم يُفتح واتساب تلقائياً، عد وحاول مرة أخرى.
        <br />
        <span className="text-ink/80">
          أرسل تسجيلاتك الصوتية وسيقيّمها فريق ZedLevel قريباً.
        </span>
      </p>
      <button
        type="button"
        onClick={onRestart}
        className="mt-7 inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white px-6 py-3 text-sm font-bold text-ink/70 hover:border-primary/30 hover:text-primary"
      >
        <RotateCcw className="h-4 w-4" />
        إجراء اختبار آخر
      </button>
    </div>
  );
}

/* ---------------------------------------------------------------- modals */

function Modal({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-navy/40 p-4 backdrop-blur-sm"
    >
      <m.div
        initial={{ scale: 0.94, y: 12 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.96, y: 8 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl sm:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="إغلاق"
          className="absolute start-4 top-4 grid h-9 w-9 place-items-center rounded-xl bg-section text-ink/60 hover:bg-ink/10"
        >
          <X className="h-5 w-5" />
        </button>
        {children}
      </m.div>
    </m.div>
  );
}

function ChooseEvaluation({
  aiNote,
  onAI,
  onHuman,
}: {
  aiNote: boolean;
  onAI: () => void;
  onHuman: () => void;
}) {
  return (
    <div className="pt-6 text-center">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-primary-light text-primary">
        <Bot className="h-7 w-7" />
      </div>
      <h2 className="mt-4 text-2xl font-black text-ink">اختر طريقة التقييم</h2>
      <p className="mt-2 text-sm font-bold text-ink/50">
        اختر طريقة التقييم المناسبة لك قبل البدء.
      </p>

      <div className="mt-6 flex flex-col gap-3 text-start">
        {/* AI — paused */}
        <button
          type="button"
          onClick={onAI}
          className="flex items-center gap-3 rounded-2xl border border-primary/25 bg-white p-4 text-start transition-colors hover:bg-primary-light/50"
        >
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary to-purple-500 text-white">
            <Bot className="h-5 w-5" />
          </span>
          <span className="flex-1 font-black text-ink">
            <span className="align-middle">تقييم بالذكاء الاصطناعي</span>{" "}
            <span className="ms-1 inline-block whitespace-nowrap rounded-full bg-accent/20 px-2 py-0.5 align-middle text-xs font-bold text-accent-dark">
              قريباً
            </span>
          </span>
          <ChevronLeft className="h-5 w-5 text-ink/30" />
        </button>

        {aiNote && (
          <p className="rounded-xl bg-accent/10 px-4 py-3 text-sm font-bold text-accent-dark">
            🔧 التقييم بالذكاء الاصطناعي غير متاح حالياً، لكنه قادم قريباً. من
            فضلك استخدم <b>التقييم البشري عبر واتساب</b> بالأسفل.
          </p>
        )}

        {/* Human — WhatsApp */}
        <button
          type="button"
          onClick={onHuman}
          className="flex items-center gap-3 rounded-2xl border border-emerald-300 bg-emerald-50/60 p-4 text-start transition-colors hover:bg-emerald-50"
        >
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-500 text-white">
            <WhatsAppIcon className="h-5 w-5" />
          </span>
          <span className="flex-1 font-black text-ink">
            <span className="align-middle">تقييم بشري عبر واتساب</span>{" "}
            <span className="ms-1 inline-block whitespace-nowrap rounded-full bg-emerald-500/15 px-2 py-0.5 align-middle text-xs font-bold text-emerald-600">
              متاح الآن
            </span>
          </span>
          <ChevronLeft className="h-5 w-5 text-ink/30" />
        </button>
      </div>
    </div>
  );
}

function WhatsAppSteps({
  waHref,
  onOpen,
}: {
  waHref: string | null;
  onOpen: () => void;
}) {
  return (
    <div className="pt-6 text-center">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-emerald-100 text-emerald-600">
        <MessageCircle className="h-7 w-7" />
      </div>
      <h2 className="mt-4 text-2xl font-black text-ink">
        خطوات بسيطة عبر واتساب
      </h2>

      <div className="mx-auto mt-5 flex max-w-xs flex-col gap-3 text-start">
        {[
          <>أرسل <b>الرسالة الجاهزة</b>.</>,
          <>سجّل <b>إجاباتك والقراءة</b> صوتياً.</>,
          <>انتظر <b>التقييم</b>.</>,
        ].map((txt, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary-light text-sm font-black text-primary">
              {i + 1}
            </span>
            <span className="text-sm font-bold text-ink/80">{txt}</span>
          </div>
        ))}
      </div>

      {waHref && (
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onOpen}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 px-6 py-4 text-base font-black text-white shadow-lg transition-transform active:scale-[0.99]"
        >
          <WhatsAppIcon className="h-5 w-5" />
          ابدأ بالتقييم الآن
        </a>
      )}

      <p className="mt-4 text-sm font-bold text-emerald-700/80">
        تُرسَل رسالتك مباشرة إلى <b>أكاديمية ZedLevel</b>.
      </p>
    </div>
  );
}
