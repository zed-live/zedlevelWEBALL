import type { Metadata } from "next";
import Link from "next/link";
import {
  CheckCircle2,
  XCircle,
  Award,
  BookOpen,
  FileText,
  Layers,
  Mic2,
  MessageCircle,
  Video,
  FileDown,
  Users,
} from "lucide-react";
import { Mascot } from "@/components/Mascot";
import { SectionHeading } from "@/components/SectionHeading";
import { ArrowMotif } from "@/components/ArrowMotif";
import { SallaButton } from "@/components/SallaButton";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { StatStrip } from "@/components/StatStrip";
import { StageCard } from "@/components/StageCard";
import { RuleCard } from "@/components/RuleCard";
import { WeeklyRhythm } from "@/components/WeeklyRhythm";
import { FAQAccordion } from "@/components/FAQAccordion";
import { StickyBuyBar } from "@/components/StickyBuyBar";
import { Reveal } from "@/components/Reveal";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "دورة التأسيس الصحيح A0 — الإنجليزية من الصفر",
  description:
    "3 مراحل · 26 درسًا · +460 كلمة · 15 قاعدة — أسّس إنجليزيتك بالطريقة الصحيحة مع شهادة واختبار نهائي، بـ 15–30 دقيقة يوميًا فقط.",
};

/* ─── CONTENT.md §7 — exact curriculum data ─── */

const numbers = [
  { value: "3", label: "مراحل متدرجة" },
  { value: "26", label: "درسًا مسجلًا" },
  { value: "+460", label: "كلمة أساسية" },
  { value: "15", label: "قاعدة قواعد" },
  { value: "14", label: "قاعدة نطق" },
];

const outcomes = [
  "تقرأ أي كلمة إنجليزية بشكل صحيح",
  "تحيي وتودّع وتقدّم نفسك بثقة",
  "تبني جملك الأولى الصحيحة",
  "تسأل وتجاوب — نعم/لا وأسئلة Wh",
  "تتكلم عن عائلتك ومشاعرك ويومك",
  "تصف بيتك وأكلك وملابسك وتنقلاتك",
];

const stages = [
  {
    emoji: "🌱",
    stage: "المرحلة الأولى",
    lessons: "الدروس 1–10",
    title: "الأساسيات",
    promise: "تقرأ الإنجليزية. تحيي أي شخص. تبني أول جملة لك.",
    covers: [
      "الحروف ونطقها",
      "قواعد النطق (oo، ee، ch، th…)",
      "التحيات والوداع",
      "بناء الجملة الإنجليزية",
      "أدوات التعريف a / an / the",
      "فعل الكينونة to be",
      "هذا وذاك",
      "الأرقام والأعداد الترتيبية",
      "الضمائر",
      "الحياة والمشاعر",
    ],
  },
  {
    emoji: "🏗️",
    stage: "المرحلة الثانية",
    lessons: "الدروس 11–18",
    title: "نفسك وعالمك",
    promise: "قدّم نفسك، اسأل أسئلة حقيقية، وتكلم عن عائلتك ومدرستك.",
    covers: [
      "ضمائر وصفات الملكية",
      "المدرسة",
      "صيغ الأسئلة (نعم/لا، Wh، كم، هل تستطيع)",
      "أفراد العائلة",
      "ترتيب الصفات والألوان",
      "الطقس والفصول",
      "أهم 100 كلمة",
      "حروف الجر",
      "المفرد والجمع",
    ],
  },
  {
    emoji: "🎯",
    stage: "المرحلة الثالثة",
    lessons: "الدروس 19–26",
    title: "صِف وطبّق",
    promise: "صِف الوقت والأماكن والبيت — ثم استلم شهادتك.",
    covers: [
      "الأيام والشهور والوقت",
      "الأماكن",
      "البيت — الغرف والأثاث",
      "الفعل to do",
      "الفعل to have والأفعال الناقصة",
      "الأكل والشرب",
      "الملابس وأجزاء الجسم",
      "المواصلات",
      "الدول والجنسيات",
      "الاختبار النهائي والشهادة 🎓",
    ],
  },
];

const rules = [
  {
    num: "١",
    title: "بتخلّص",
    desc: "أقصى مدة للدورة 40 يومًا — مستحيل تطول وتتعلق بالنص.",
  },
  {
    num: "٢",
    title: "ما بتتخطى",
    desc: "الدروس تنفتح بالتسلسل، درس ورا درس — ما فيه قفز ولا فوضى.",
  },
  {
    num: "٣",
    title: "بترتاح",
    desc: "الجمعة إجازة دائمًا 🕌 — راحة مضمونة كل أسبوع.",
  },
  {
    num: "٤",
    title: "أقصى سرعة ×3",
    desc: "متحمس؟ أنجزها بثلاثة دروس يوميًا وخلّصها في 9 أيام.",
  },
];

const included = [
  {
    icon: BookOpen,
    title: "كراسة تمارين",
    desc: "تدريب عملي أكثر على كل درس",
  },
  {
    icon: FileText,
    title: "ملخص نهائي",
    desc: "ورقة مراجعة سريعة ترجع لها في أي وقت",
  },
  {
    icon: Layers,
    title: "بطاقات مراجعة",
    desc: "فلاش كاردز جاهزة على Quizlet",
  },
  {
    icon: Mic2,
    title: "أسبوع مكثف مباشر",
    desc: "مجموعة صغيرة 1–7 · تركيز على الكتابة · اختبار مباشر",
  },
];

const delivery = [
  { icon: MessageCircle, text: "كل شي يوصلك عبر الواتساب" },
  { icon: FileDown, text: "PDF يومي فيه رابط الدرس" },
  { icon: Video, text: "فيديو الدرس على Notion" },
  { icon: Users, text: "قروب للأسئلة والدعم" },
];

const notIncluded = [
  "طلاقة في المحادثة",
  "استماع بسرعة الناطقين",
  "كتابة المقالات",
  "إتقان التعابير الاصطلاحية",
  "سرد القصص بصيغة الماضي",
];

const faq = [
  {
    q: "كم أحتاج وقت كل يوم؟",
    a: "من 15 إلى 30 دقيقة فقط — نفس الوقت اللي تقضيه على الواتساب. والدروس مسجلة، تقدر ترجع لها وتعيدها في أي وقت.",
  },
  {
    q: "كم مدة الدورة؟",
    a: "المتوسط 26 يومًا: 4 أسابيع دروس + أسبوع مراجعة ومكثف. أقصى مدة 40 يومًا، وأسرع إنجاز ممكن 9 أيام بسرعة ×3.",
  },
  {
    q: "وين وكيف توصلني الدروس؟",
    a: "كل شي عبر الواتساب: يوصلك PDF يومي فيه رابط درس الفيديو على Notion، ومعك قروب للأسئلة والدعم طول الدورة.",
  },
  {
    q: "هل فيه شهادة؟",
    a: "نعم — تختم الدورة باختبار نهائي، وبعد اجتيازه تستلم شهادتك 🎓.",
  },
  {
    q: "هل الدورة مناسبة لي؟",
    a: "إذا كنت تبدأ من الصفر، أو رجعت للإنجليزية بعد أساس ضعيف — فهي مصممة لك بالضبط. لعمر 14 سنة وما فوق، والشرح كله بالعربي.",
  },
  {
    q: "وش أسبوع المكثف المباشر؟",
    a: "أسبوع في نهاية الدورة مع مجموعة صغيرة (1 إلى 7 متعلمين): تركيز على الكتابة، تطبيق مباشر مع المعلم، ثم الاختبار النهائي.",
  },
  {
    q: "متى أقدر أبدأ؟",
    a: "التسجيل بدفعات صغيرة محدودة العدد على مدار السنة. بعد الدفع عبر سلة، راسلنا على الواتساب لاستلام رابط الدورة والجدول.",
  },
];

/* JSON-LD: Course + FAQPage (SEO) */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Course",
      name: "التأسيس الصحيح بالإنجليزية — A0",
      description:
        "دورة تأسيس اللغة الإنجليزية من الصفر: 3 مراحل، 26 درسًا، أكثر من 460 كلمة، 15 قاعدة قواعد و14 قاعدة نطق، مع اختبار نهائي وشهادة.",
      provider: {
        "@type": "Organization",
        name: "ZEDLEVEL — أكاديمية زد لفل لتعليم الإنجليزية",
      },
      inLanguage: "ar",
      teaches: "أساسيات اللغة الإنجليزية للمبتدئين (CEFR A0)",
    },
    {
      "@type": "FAQPage",
      mainEntity: faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function A0Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ═══ Hero ═══ */}
      <section className="relative overflow-hidden bg-hero-glow">
        <ArrowMotif
          aria-hidden
          className="absolute -top-8 start-[-3rem] h-56 w-80 -rotate-12 text-primary/[0.035]"
        />
        <div className="container-site grid items-center gap-12 py-14 md:grid-cols-2 md:py-20">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-white px-4 py-1.5 text-sm font-black text-primary shadow-soft">
              <ArrowMotif className="h-2.5 w-3.5 text-accent" />
              دورة التأسيس · A0
            </span>

            <h1 className="mt-5 text-[2.1rem] font-black leading-[1.35] sm:text-5xl">
              التأسيس{" "}
              <span className="relative inline-block text-primary">
                الصحيح
                <svg
                  aria-hidden
                  className="absolute -bottom-2 start-0 h-3 w-full text-accent"
                  viewBox="0 0 200 12"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M3 9 C 60 2.5, 140 2.5, 197 7.5"
                    stroke="currentColor"
                    strokeWidth="6"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </span>{" "}
              بالإنجليزية
            </h1>

            <p className="mt-6 text-lg font-semibold leading-9 text-ink/70">
              ابدأ من الصفر بالطريقة الصحيحة — أساس يخدمك طول رحلتك مع
              الإنجليزية، بالعربي وخطوة بخطوة.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {["15–30 دقيقة يوميًا", "جمعة راحة 🕌", "اختبار + شهادة 🎓"].map(
                (chip) => (
                  <span
                    key={chip}
                    className="rounded-full bg-primary-light px-3.5 py-1.5 text-sm font-bold text-primary"
                  >
                    {chip}
                  </span>
                ),
              )}
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-start">
              <SallaButton course="a0" source="a0-hero" hero />
              <WhatsAppButton
                message={site.whatsapp.msgCourseInquiry("التأسيس الصحيح A0")}
                source="a0-hero"
              >
                عندي استفسار
              </WhatsAppButton>
            </div>

            <p className="mt-4 text-sm font-bold text-ink/55">
              دفعات صغيرة محدودة العدد على مدار السنة — لمن يبدأ من الصفر أو
              يعيد التأسيس، من عمر 14+
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-md md:max-w-none">
            <div
              aria-hidden
              className="absolute left-1/2 top-1/2 -z-10 aspect-square w-[88%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-soft/60 blur-2xl"
            />
            <div className="flex justify-center">
              <Mascot
                name="shab-front2"
                size="hero"
                priority
                className="h-72 w-auto drop-shadow-2xl sm:h-96 lg:h-[26rem]"
              />
            </div>
            <div
              aria-hidden
              className="mx-auto -mt-3 h-5 w-3/5 rounded-[100%] bg-navy/10 blur-md"
            />
          </div>
        </div>
      </section>

      {/* ═══ By the numbers ═══ */}
      <StatStrip items={numbers} />

      {/* ═══ Outcomes ═══ */}
      <section className="bg-section py-20 lg:py-28">
        <div className="container-site">
          <Reveal>
            <SectionHeading
              eyebrow="وش بتحقق؟"
              title="تخيل نفسك بعد 26 درسًا"
              sub="هذا اللي بتقدر تسويه فعليًا بعد إتمام التأسيس"
            />
          </Reveal>
          <ul className="mx-auto mt-12 grid max-w-4xl gap-3.5 sm:grid-cols-2">
            {outcomes.map((o, i) => (
              <Reveal key={o} delay={i * 70}>
                <li className="card flex items-center gap-3.5 px-5 py-4 font-bold">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary-light">
                    <CheckCircle2 className="h-5 w-5 text-primary" aria-hidden />
                  </span>
                  {o}
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ═══ The 3 stages ═══ */}
      <section className="py-20 lg:py-28">
        <div className="container-site">
          <Reveal>
            <SectionHeading
              eyebrow="رحلة الدورة"
              title="ثلاث مراحل — من الحروف إلى شهادتك"
              sub="كل مرحلة تبني على اللي قبلها، بدون قفز وبدون حشو"
            />
          </Reveal>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {stages.map((s, i) => (
              <Reveal key={s.title} delay={i * 100} className="h-full">
                <StageCard {...s} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ The 4 rules — dark ═══ */}
      <section className="relative overflow-hidden bg-brand-gradient py-20 lg:py-28">
        <ArrowMotif
          aria-hidden
          className="absolute -bottom-10 start-[-3rem] h-56 w-80 rotate-12 text-white/[0.04]"
        />
        <div className="container-site">
          <Reveal>
            <SectionHeading
              tone="dark"
              eyebrow="نظام يحميك من الانسحاب"
              title="القواعد الأربع"
              sub="مو مجرد دورة — نظام مصمم عشان توصل للنهاية"
            />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {rules.map((r, i) => (
              <Reveal key={r.num} delay={i * 90} className="h-full">
                <RuleCard {...r} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Mid-page CTA ═══ */}
      <section className="container-site py-14">
        <Reveal>
          <div className="card flex flex-col items-center gap-6 p-8 text-center sm:p-9 lg:flex-row lg:justify-between lg:text-start">
            <div>
              <h2 className="text-xl font-black sm:text-2xl">
                مقاعد الدفعة محدودة — احجز مكانك من الآن
              </h2>
              <p className="mt-1.5 text-ink/60">
                26 درسًا · شهادة معتمدة · أسبوع مكثف بمجموعة من 1–7 فقط
              </p>
            </div>
            <SallaButton course="a0" source="a0-mid" />
          </div>
        </Reveal>
      </section>

      {/* ═══ Weekly rhythm ═══ */}
      <section className="py-20 lg:py-28">
        <div className="container-site">
          <Reveal>
            <SectionHeading
              eyebrow="إيقاعك الأسبوعي"
              title="أسبوعك مع زد لفل"
              sub="واضح من أول يوم — بدون مفاجآت وبدون تكديس دروس"
            />
          </Reveal>
          <div className="mt-12">
            <Reveal>
              <WeeklyRhythm />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ What's included + delivery ═══ */}
      <section className="bg-section py-20 lg:py-28">
        <div className="container-site">
          <Reveal>
            <SectionHeading
              eyebrow="وش يشمل اشتراكك؟"
              title="كل اللي تحتاجه — جاهز لك"
            />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {included.map((item, i) => (
              <Reveal key={item.title} delay={i * 80} className="h-full">
                <div className="card card-hover h-full p-7">
                  <span className="inline-flex h-13 w-13 items-center justify-center rounded-2xl bg-primary p-3 text-white shadow-glow-blue">
                    <item.icon className="h-6 w-6" aria-hidden />
                  </span>
                  <h3 className="mt-4 font-black">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-7 text-ink/65">
                    {item.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <div className="mt-8 grid gap-3 rounded-3xl border border-primary/10 bg-white p-6 sm:grid-cols-2 lg:grid-cols-4">
              {delivery.map((d) => (
                <p
                  key={d.text}
                  className="flex items-center gap-2.5 text-sm font-bold text-ink/70"
                >
                  <d.icon className="h-5 w-5 shrink-0 text-primary" aria-hidden />
                  {d.text}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ Honest: what this is NOT ═══ */}
      <section className="py-20 lg:py-28">
        <div className="container-site grid items-center gap-12 lg:grid-cols-[1fr_auto]">
          <Reveal>
            <div className="rounded-[2rem] border-2 border-primary/10 bg-primary-light/40 p-8 sm:p-10">
              <SectionHeading
                align="start"
                eyebrow="بكل صراحة"
                title="هذي دورة تأسيس — مو كل شي"
                sub="نقولها لك قبل ما تدفع: التأسيس هو الخطوة الأولى الأساسية، مو الرحلة كلها. هذي الدورة لا تعدك بـ:"
              />
              <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                {notIncluded.map((n) => (
                  <li
                    key={n}
                    className="flex items-center gap-2.5 font-bold text-ink/60"
                  >
                    <XCircle className="h-5 w-5 shrink-0 text-ink/30" aria-hidden />
                    {n}
                  </li>
                ))}
              </ul>
              <p className="mt-7 flex items-center gap-2 font-black text-primary">
                <ArrowMotif className="h-3 w-4 text-accent" />
                لكن بعد A0 بتكون جاهز تمامًا لمستوى A1 وA2 وما بعدها
              </p>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div className="hidden justify-center lg:flex">
              <Mascot name="father-front" size="section" className="h-72 w-auto drop-shadow-xl" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ Exam + certificate ═══ */}
      <section className="bg-section py-20 lg:py-28">
        <div className="container-site">
          <Reveal>
            <div className="card relative overflow-hidden p-8 text-center sm:p-12">
              <ArrowMotif
                aria-hidden
                className="absolute -bottom-6 -end-8 h-32 w-44 rotate-12 text-primary/[0.04]"
              />
              <div className="flex justify-center">
                <Mascot
                  name="shab-front"
                  size="section"
                  className="h-48 w-auto drop-shadow-xl"
                />
              </div>
              <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-sm font-black text-ink">
                <Award className="h-4 w-4" aria-hidden />
                الأسبوع الخامس — أسبوع الختام
              </span>
              <h2 className="mt-4 text-2xl font-black sm:text-3xl">
                اختبار نهائي… وشهادة توثّق إنجازك 🎓
              </h2>
              <p className="mx-auto mt-3 max-w-[52ch] leading-9 text-ink/65">
                بعد الدروس الـ 26: أسبوع مراجعة ولحاق، ثم الأسبوع المكثف المباشر
                مع مجموعتك الصغيرة، ثم الاختبار النهائي 🏆 — وتستلم شهادة
                إتمام التأسيس.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="py-20 lg:py-28">
        <div className="container-site">
          <Reveal>
            <SectionHeading
              eyebrow="أسئلة تدور ببالك؟"
              title="الأسئلة الشائعة"
            />
          </Reveal>
          <div className="mt-12">
            <FAQAccordion items={faq} />
          </div>
        </div>
      </section>

      {/* ═══ Final CTA ═══ */}
      <section className="container-site pb-4">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-brand-gradient px-6 py-14 text-center sm:px-12 lg:py-18">
            <ArrowMotif
              aria-hidden
              className="absolute -start-8 top-6 h-24 w-36 -rotate-12 text-white/[0.07]"
            />
            <ArrowMotif
              aria-hidden
              className="absolute -bottom-8 end-10 h-28 w-40 rotate-6 text-accent/10"
            />
            <h2 className="text-3xl font-black text-white sm:text-4xl">
              جاهز تأسس إنجليزيتك بالطريقة الصحيحة؟
            </h2>
            <p className="mx-auto mt-4 max-w-[44ch] text-white/75 sm:text-lg">
              26 درسًا · 15–30 دقيقة يوميًا · نظام يوصلك للنهاية — ومقاعد الدفعة
              محدودة
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <SallaButton course="a0" source="a0-final" hero showTrust={false} />
              <WhatsAppButton
                message={site.whatsapp.msgCourseInquiry("التأسيس الصحيح A0")}
                source="a0-final"
                variant="inverse"
              >
                اسألنا قبل تشترك
              </WhatsAppButton>
            </div>
            <p className="mt-6 text-sm font-bold text-white/75">
              دفع آمن عبر منصة سلة 🔒 · بعد الدفع راسلنا على الواتساب لاستلام
              رابط الدورة والجدول
            </p>
            <p className="mt-3 text-sm text-white/80">
              لسا مو متأكد من مستواك؟{" "}
              <Link href="/test" className="font-bold text-accent hover:underline">
                اختبر مستواك مجانًا
              </Link>
            </p>
          </div>
        </Reveal>
      </section>

      <StickyBuyBar course="a0" courseLabel="التأسيس الصحيح A0" />
    </>
  );
}
