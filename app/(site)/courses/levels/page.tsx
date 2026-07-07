import type { Metadata } from "next";
import Link from "next/link";
import {
  BookText,
  Puzzle,
  MessagesSquare,
  Headphones,
  CalendarDays,
  Mic2,
} from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { ArrowMotif } from "@/components/ArrowMotif";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { StatStrip } from "@/components/StatStrip";
import { LevelLadder } from "@/components/LevelLadder";
import { LevelsCard } from "@/components/LevelsCard";
import { Reveal } from "@/components/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Underline } from "@/components/motion/Underline";
import { site, type SallaCourse } from "@/config/site";

export const metadata: Metadata = {
  title: "برنامج المستويات — من A1 إلى C1",
  description:
    "12 دورة متسلسلة تاخذك من بداية رحلة المستويات إلى أعلى اللفات، بروتين سهل الإنجاز حدود 20 دقيقة، مع اختبار لكل دورة وشهادة لكل مستوى.",
};

/* ─── CONTENT.md §8 — exact program data ─── */

const numbers = [
  { value: "4", label: "مستويات CEFR" },
  { value: "12", label: "دورة متسلسلة" },
  { value: "+3,310", label: "كلمة من Oxford 3000" },
  { value: "5", label: "أسابيع لكل دورة" },
];

/* ما تغطيه الدورات — المسارات داخل كل دورة */
const streams = [
  {
    icon: BookText,
    title: "مسار المفردات",
    points: [
      "تبني حصيلتك من المفردات بمناهج معتمدة عالميًا (Oxford)",
      "رحلة تتعلم فيها +3000 كلمة تطوّر مستواك بسرعة",
      "١٠ كلمات بجمل مختصرة وصوتيات واضحة",
      "تمارين ومحادثات مختلفة",
      "مراجعات دورية وفلاش كارد عملية",
    ],
  },
  {
    icon: Puzzle,
    title: "مسار القواعد",
    points: [
      "دروس لأهم القواعد للاستخدام اليومي",
      "فيديوهات مركّزة + اختبارات قياس للفهم",
      "تقدر تنجز المسار كامل في دورة واحدة فقط",
    ],
  },
  {
    icon: MessagesSquare,
    title: "مسار المحادثة",
    points: [
      "سيناريوهات من حياتك: مشوار، مقهى، مطار…",
      "حوار ثنائي تقرأ نصفه بصوتك",
      "تدريب حر مع تصحيح فوري",
    ],
  },
  {
    icon: Headphones,
    title: "مسار الاستماع",
    points: [
      "مقترح استماع يومي يتجدّد كل يوم",
      "محتوى مختار على قدّ مستواك بالضبط",
    ],
  },
];


const tiers: {
  code: string;
  name: string;
  words: string;
  duration: string;
  salla: SallaCourse;
}[] = [
  { code: "A1", name: "مبتدئ", words: "902", duration: "≈3.5 أشهر", salla: "a1" },
  { code: "A2", name: "أساسي", words: "869", duration: "≈3.4 أشهر", salla: "a2" },
  { code: "B1", name: "متوسط", words: "809", duration: "≈3.2 أشهر", salla: "b1" },
  { code: "B2", name: "متقدم", words: "730", duration: "≈2.8 أشهر", salla: "b2" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "برنامج المستويات — من A1 إلى C1 — زد لفل",
  description:
    "12 دورة إنجليزية متسلسلة تاخذك من بداية رحلة المستويات إلى أعلى اللفات، مع اختبار لكل دورة وشهادة لكل مستوى.",
  provider: {
    "@type": "Organization",
    name: "ZEDLEVEL — أكاديمية زد لفل لتعليم الإنجليزية",
  },
  inLanguage: "ar",
  teaches: "اللغة الإنجليزية من مستوى A1 إلى C1 (CEFR)",
};

export default function LevelsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ═══ Hero ═══ */}
      <section className="relative overflow-hidden bg-hero-glow">
        <div
          aria-hidden
          className="absolute inset-0 bg-dots [mask-image:radial-gradient(65%_60%_at_75%_15%,black,transparent)]"
        />
        <div
          aria-hidden
          className="orb orb-blue absolute -top-24 end-[-8rem] h-96 w-96"
        />
        <ArrowMotif
          aria-hidden
          className="absolute -top-8 start-[-3rem] h-56 w-80 -rotate-12 text-primary/[0.035]"
        />
        <div className="container-site relative grid items-center gap-12 py-14 md:grid-cols-2 md:py-20">
          <Stagger>
            <StaggerItem>
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-white px-4 py-1.5 text-sm font-black text-primary shadow-soft">
                <ArrowMotif className="h-2.5 w-3.5 text-accent" />
                برنامج المستويات · A1–C1
              </span>
            </StaggerItem>

            <StaggerItem>
              <h1 className="mt-5 text-[clamp(2.2rem,5.5vw,3.6rem)] font-black leading-[1.3]">
                من A1 إلى C1،{" "}
                <Underline className="text-primary">درجة درجة</Underline>
              </h1>
            </StaggerItem>

            <StaggerItem>
              <p className="mt-6 max-w-[44ch] text-lg font-semibold leading-9 text-ink/70">
                12 دورة متسلسلة تاخذك من بداية رحلة المستويات إلى أعلى اللفات.
              </p>
            </StaggerItem>

            <StaggerItem>
              <ul className="mt-5 space-y-2.5">
                {[
                  "٥ أسابيع من الإنجاز بروتين سهل الإنجاز، حدود ٢٠ دقيقة",
                  "تختم الدورة بالممارسة الحقيقية في أسبوع مكثف بالحصص",
                  "اختبار لكل دورة، وشهادة لكل مستوى",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 font-bold">
                    <ArrowMotif className="h-2.5 w-3.5 shrink-0 text-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </StaggerItem>

            <StaggerItem>
              <div className="mt-8">
                <Link href="#tiers" className="btn btn-accent text-lg">
                  زد لفلك وابدأ معنا الآن
                </Link>
              </div>
              <Link
                href="/test"
                className="mt-3 inline-flex min-h-11 items-center gap-1.5 py-2 font-bold text-primary hover:underline"
              >
                ما أعرف مستواي — حدّده الآن
                <ArrowMotif className="h-2.5 w-3.5 -rotate-90 text-accent" />
              </Link>
            </StaggerItem>
          </Stagger>

          {/* the ladder IS this page's hero visual */}
          <div className="w-full">
            <LevelLadder variant="light" />
          </div>
        </div>
      </section>

      {/* ═══ By the numbers ═══ */}
      <StatStrip items={numbers} />

      {/* ═══ ايش تغطي الدورات؟ — المسارات ═══ */}
      <section className="relative overflow-hidden bg-brand-gradient py-20 lg:py-28">
        <div
          aria-hidden
          className="absolute inset-0 bg-dots-light [mask-image:radial-gradient(60%_50%_at_50%_0%,black,transparent)]"
        />
        <ArrowMotif
          aria-hidden
          className="absolute -bottom-10 end-[-3rem] h-56 w-80 rotate-12 text-white/[0.04]"
        />
        <div className="container-site relative">
          <Reveal>
            <SectionHeading
              tone="dark"
              eyebrow="ايش تغطي الدورات؟"
              title="الدورات تشمل عدة مسارات في اللغة"
            />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {streams.map((s, i) => (
              <Reveal key={s.title} delay={i * 90} className="h-full">
                <div className="h-full rounded-3xl border border-white/15 bg-white/[0.07] p-7 lg:backdrop-blur-sm">
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-ink shadow-glow-accent">
                    <s.icon className="h-7 w-7" aria-hidden />
                  </span>
                  <h3 className="mt-4 text-xl font-black text-white">
                    {s.title}
                  </h3>
                  <ul className="mt-3 space-y-2.5">
                    {s.points.map((p) => (
                      <li
                        key={p}
                        className="flex items-start gap-2 text-[15px] leading-7 text-white/80"
                      >
                        <ArrowMotif className="mt-2 h-2 w-3 shrink-0 text-accent" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ mid CTA ═══ */}
      <section className="container-site py-12">
        <Reveal>
          <div className="flex flex-col items-center gap-3 text-center">
            <p className="font-bold text-ink/60">
              اشترك مرة واحدة، ونحن نحدّد مستواك ونبدأك من مكانك
            </p>
            <Link href="#tiers" className="btn btn-primary">
              زد لفلك وابدأ معنا الآن
            </Link>
          </div>
        </Reveal>
      </section>

      {/* ═══ 6-week structure ═══ */}
      <section className="py-20 lg:py-28">
        <div className="container-site">
          <Reveal>
            <SectionHeading
              eyebrow="شكل الدورة الواحدة"
              title="٥ أسابيع دروس + أسبوع مكثف"
            />
          </Reveal>
          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            <Reveal>
              <div className="card h-full p-8">
                <span className="inline-flex h-13 w-13 items-center justify-center rounded-2xl bg-primary p-3 text-white shadow-glow-blue">
                  <CalendarDays className="h-6 w-6" aria-hidden />
                </span>
                <h3 className="mt-4 text-xl font-black">الأسابيع 1–5 · الدروس</h3>
                <p className="mt-2 leading-8 text-ink/65">
                  6 دروس أسبوعيًا — السبت والاثنين والأربعاء يوصلك درسان،
                  واليوم التالي لإكمالهما. الجمعة راحة 🕌
                </p>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="card h-full border-accent/30 bg-gradient-to-b from-accent/10 to-white p-8">
                <span className="inline-flex h-13 w-13 items-center justify-center rounded-2xl bg-accent p-3 text-ink shadow-glow-accent">
                  <Mic2 className="h-6 w-6" aria-hidden />
                </span>
                <h3 className="mt-4 text-xl font-black">
                  الأسبوع 6 · المكثف المباشر
                </h3>
                <p className="mt-2 leading-8 text-ink/65">
                  مجموعة صغيرة من 1 إلى 7 متعلمين: تطبيق مباشر لكل شي تعلمته،
                  تركيز على الكتابة، ثم اختبار الدورة 🏆
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ Tiers + Salla per tier ═══ */}
      <section id="tiers" className="scroll-mt-24 bg-section py-20 lg:py-28">
        <div className="container-site">
          <Reveal>
            <SectionHeading
              eyebrow="اشتراك واحد لكل المستويات"
              title="ما تختار مستواك… إحنا نحدّده لك"
              sub="اشترك مرة واحدة، ثم نقيّم مستواك ونضعك على المسار الصحيح ونبدأك من الدورة المناسبة، وتتقدّم درجة درجة."
            />
          </Reveal>

          {/* 3 steps of the guided flow */}
          <div className="mx-auto mt-12 grid max-w-4xl gap-5 sm:grid-cols-3">
            {[
              {
                n: "١",
                t: "اشترك",
                d: "دفعة واحدة تفتح لك البرنامج، بدون ما تحتار أي مستوى تختار.",
              },
              {
                n: "٢",
                t: "نقيّم مستواك",
                d: "بعد الدفع نحدّد مستواك بدقّة ونضعك على المسار الصحيح.",
              },
              {
                n: "٣",
                t: "تبدأ من مكانك",
                d: "نبدأك من الدورة المناسبة، وتتقدّم بالتسلسل حتى تختم كل مستوى.",
              },
            ].map((s, i) => (
              <Reveal key={s.t} delay={i * 90} className="h-full">
                <div className="card flex h-full flex-col gap-3 p-7 text-center">
                  <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-primary text-xl font-black text-white shadow-glow-blue">
                    {s.n}
                  </span>
                  <h3 className="text-lg font-black">{s.t}</h3>
                  <p className="text-[15px] leading-7 text-ink/60">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* the 4 levels — an info ladder (NOT selectable) */}
          <Reveal delay={150}>
            <p className="mt-12 text-center text-sm font-black text-ink/55">
              رحلتك تمرّ بأربعة مستويات، نوصلك لها درجة درجة
            </p>
            <div className="mx-auto mt-4 flex max-w-2xl flex-wrap items-center justify-center gap-2.5">
              {tiers.map((t) => (
                <span
                  key={t.code}
                  className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white px-4 py-2 text-sm font-black text-primary shadow-soft"
                >
                  {t.code}
                  <span className="font-bold text-ink/55">{t.name}</span>
                </span>
              ))}
            </div>
          </Reveal>

          {/* the full details card — tracks + course shape + two-tier pricing */}
          <Reveal delay={200}>
            <div className="mt-12">
              <LevelsCard variant="details" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ Final CTA ═══ */}
      <section className="container-site pb-4 pt-16">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-brand-gradient px-6 py-14 text-center sm:px-12">
            <ArrowMotif
              aria-hidden
              className="absolute -start-8 top-6 h-24 w-36 -rotate-12 text-white/[0.07]"
            />
            <h2 className="text-3xl font-black text-white sm:text-4xl">
              مو متأكد من أي مستوى تبدأ؟
            </h2>
            <p className="mx-auto mt-4 max-w-[42ch] text-white/75 sm:text-lg">
              مستواك وتوصيتك خلال دقائق — بدون تسجيل
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
              <Link href="/test" className="btn btn-accent w-full text-lg sm:w-auto">
                اختبر مستواك مجانًا
              </Link>
              <WhatsAppButton
                message={site.whatsapp.msgCourseInquiry("برنامج المستويات A1–C1")}
                source="levels-final"
                variant="inverse"
              >
                استشرنا بالواتساب
              </WhatsAppButton>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
