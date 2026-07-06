import type { Metadata } from "next";
import Link from "next/link";
import {
  Award,
  Lock,
  CalendarDays,
  Mic2,
} from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { ArrowMotif } from "@/components/ArrowMotif";
import { SallaButton } from "@/components/SallaButton";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { PriceTag } from "@/components/PriceTag";
import { StatStrip } from "@/components/StatStrip";
import { LevelLadder } from "@/components/LevelLadder";
import { Reveal } from "@/components/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Underline } from "@/components/motion/Underline";
import { CountUp } from "@/components/motion/CountUp";
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

      {/* ═══ The 4 streams — dark signature ═══ */}
      {/* ═══ mid CTA ═══ */}
      <section className="container-site py-12">
        <Reveal>
          <div className="flex flex-col items-center gap-3 text-center">
            <p className="font-bold text-ink/60">
              زد لفلك، درجة درجة — اختر مستواك وابدأ
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
              eyebrow="اختر مستواك"
              title="أربعة مستويات — لكل واحد رحلته"
              sub="كل مستوى: 3 دورات متسلسلة، اختبار لكل دورة، وشهادة عند إتمام المستوى"
            />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {tiers.map((t, i) => (
              <Reveal key={t.code} delay={i * 90} className="h-full">
                <div className="card card-hover flex h-full flex-col p-7 text-center">
                  <span className="mx-auto inline-flex h-16 w-20 items-center justify-center rounded-2xl bg-primary text-2xl font-black text-white shadow-glow-blue">
                    {t.code}
                  </span>
                  <h3 className="mt-3 text-lg font-black">{t.name}</h3>
                  <p className="mt-3 text-3xl font-black text-primary">
                    <CountUp value={t.words} />
                    <span className="text-sm font-bold text-ink/50"> كلمة</span>
                  </p>
                  <div className="mt-3 flex justify-center">
                    <PriceTag course={t.salla} prefix="للدورة" />
                  </div>
                  <div className="mt-3 space-y-1.5 text-sm font-bold text-ink/55">
                    <p>3 دورات متسلسلة</p>
                    <p>{t.duration} للمستوى كاملًا</p>
                    <p className="inline-flex items-center gap-1.5 text-ink/70">
                      <Award className="h-4 w-4 text-accent" aria-hidden />
                      شهادة المستوى
                    </p>
                  </div>
                  <div className="mt-5 flex-1" />
                  <SallaButton
                    course={t.salla}
                    source="levels-tier"
                    showTrust={false}
                    className="[&_a]:w-full [&_span]:w-full"
                  />
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200}>
            <p className="mt-8 flex items-center justify-center gap-2 text-center text-sm font-bold text-ink/55">
              <Lock className="h-4 w-4" aria-hidden />
              دفع آمن عبر منصة سلة · Apple Pay · مدى · Visa — وبعد الدفع راسلنا
              على الواتساب لاستلام رابط الدورة والجدول
            </p>
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
