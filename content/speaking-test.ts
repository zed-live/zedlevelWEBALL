/**
 * Speaking-test content — the reading passages, questions and the WhatsApp
 * lead message. Kept separate from the UI (mirrors content/test-questions.ts),
 * ported verbatim from the approved speaking.zedlevel.app flow.
 */

export type SpeakingLevel = "A1-A2" | "B1-B2" | "C1-C2";

export const SPEAKING_LEVELS: {
  code: SpeakingLevel;
  label: string;
  title: string;
  blurb: string;
  /** tailwind gradient classes for the level tag chip */
  tag: string;
}[] = [
  {
    code: "A1-A2",
    label: "A1·A2",
    title: "مبتدئ",
    blurb: "جُمل قصيرة وبسيطة",
    tag: "from-emerald-400 to-emerald-500",
  },
  {
    code: "B1-B2",
    label: "B1·B2",
    title: "متوسط",
    blurb: "فقرة بمفردات أوسع",
    tag: "from-primary to-primary-dark",
  },
  {
    code: "C1-C2",
    label: "C1·C2",
    title: "متقدم",
    blurb: "نص بلغة معقّدة",
    tag: "from-fuchsia-400 to-purple-500",
  },
];

/** reading passage per level */
export const READING: Record<SpeakingLevel, string> = {
  "A1-A2":
    "My name is Sara. I live in Riyadh with my family. Every morning I drink tea and go to school. I like reading books and playing with my friends. On Friday, we visit my grandmother. She makes very good food. I am happy with my life.",
  "B1-B2":
    "Learning a new language is not always easy, but it is very rewarding. At first, you may feel nervous when you speak, and that is completely normal. The secret is to practise a little every day and not to be afraid of mistakes. Over time, your confidence grows, and you start to understand more than you expected.",
  "C1-C2":
    "Fluency is often misunderstood as the ability to speak quickly, when in reality it is about communicating ideas clearly and naturally under pressure. A truly proficient speaker can adapt their tone, navigate unfamiliar topics, and convey subtle meaning without hesitation. Achieving this level demands not only vocabulary, but also a deep familiarity with the rhythm and culture of the language.",
};

/** Q1 is a fixed easy warm-up (all levels). */
export const EASY_Q = "Why do you want to improve your English?";

/** Q2 is level-specific. */
export const Q2: Record<SpeakingLevel, string> = {
  "A1-A2": "What do you like to do with your friends?",
  "B1-B2": "What is the best way to improve a language, and why?",
  "C1-C2": "In your own words, what does true fluency really mean?",
};

/** the 3 ordered parts of the test for a given level */
export function partsFor(level: SpeakingLevel) {
  return [
    { kind: "سؤال 1 · سهل", type: "q" as const, text: EASY_Q },
    { kind: "سؤال 2", type: "q" as const, text: Q2[level] },
    { kind: "قراءة النص", type: "read" as const, text: READING[level] },
  ];
}

/**
 * Build the WhatsApp lead message (verbatim from the approved flow):
 * level + optional referral code + the two questions + the reading passage.
 */
export function speakingMessage(level: SpeakingLevel, source: string): string {
  const refLine = source === "مباشر" ? "" : `مرجع: #ZL-${source}\n`;
  return (
    "تقييم مستوى المحادثة — أكاديمية ZedLevel\n" +
    `المستوى: ${level}\n` +
    refLine +
    "\n" +
    "السؤال 1:\n" +
    EASY_Q +
    "\n\n" +
    "السؤال 2:\n" +
    Q2[level] +
    "\n\n" +
    "فقرة القراءة:\n" +
    READING[level] +
    "\n\n" +
    "🎤 سأرسل الآن تسجيلاتي الصوتية (إجابة السؤالين + قراءة النص)."
  );
}

/**
 * Read the promoter referral code from the URL (?1, ?s=1, #1, …).
 * No code -> "مباشر" (direct). Ported from the approved flow.
 */
export function readSource(): string {
  if (typeof window === "undefined") return "مباشر";
  try {
    const raw = (window.location.search || "").replace(/^\?/, "");
    const hash = (window.location.hash || "").replace(/^#/, "");
    const p = new URLSearchParams(window.location.search);
    let s =
      p.get("s") || p.get("source") || p.get("ref") || p.get("utm_source") || "";
    if (!s && hash) {
      const mh = hash.match(/(?:^|&)(?:s|source|ref)=([^&]+)/);
      if (mh) s = decodeURIComponent(mh[1]);
    }
    if (!s) {
      const bare = (raw || hash).split("&")[0].split("=")[0];
      if (bare) s = decodeURIComponent(bare);
    }
    s = (s || "").trim().slice(0, 40);
    return s || "مباشر";
  } catch {
    return "مباشر";
  }
}
