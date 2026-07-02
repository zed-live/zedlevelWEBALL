import Link from "next/link";
import {
  BookOpenCheck,
  Route,
  UserCheck,
  MessagesSquare,
  CheckCircle2,
  Briefcase,
  GraduationCap,
  Users,
  Mic,
  Timer,
  Award,
  Star,
} from "lucide-react";
import { Mascot } from "@/components/Mascot";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { LevelChip, type Level } from "@/components/LevelChip";
import { ArrowMotif } from "@/components/ArrowMotif";
import { SectionHeading } from "@/components/SectionHeading";
import { LevelLadder } from "@/components/LevelLadder";
import { CourseCard } from "@/components/CourseCard";
import { TestimonialCard } from "@/components/TestimonialCard";
import { Reveal } from "@/components/Reveal";
import { courses } from "@/config/courses";
import { site } from "@/config/site";

const LEVELS: Level[] = ["A0", "A1", "A2", "B1", "B2"];

/* CONTENT.md §12 — كيف بتتحسّن؟ (4 pillars) */
const pillars = [
  {
    icon: BookOpenCheck,
    num: "٠١",
    title: "الأساس",
    desc: "منهج يختصر وقتك · دورات مدرجة تركز على اللي يهمك بدون محتوى زيادة",
  },
  {
    icon: Route,
    num: "٠٢",
    title: "تعلم بالطريقة الصح",
    desc: "محتوى تفاعلي مصمم لمستواك · تقدم بخطوات واضحة",
  },
  {
    icon: UserCheck,
    num: "٠٣",
    title: "متابعة حقيقية",
    desc: "مرشد يخطط مسارك ويتابع تقدمك حتى توصل لهدفك",
  },
  {
    icon: MessagesSquare,
    num: "٠٤",
    title: "ما تمشي لحالك",
    desc: "تناقش · تطرح أسئلتك · تتواصل بسهولة",
  },
];

/* CONTENT.md §12 — Why it works (real needs) */
const realNeeds = [
  "فتح تسلسلي للدروس",
  "15–30 دقيقة يوميًا",
  "جمعة راحة 🕌",
  "مصمم عشان تكمّل مو تنسحب",
];

/* CONTENT.md §12 — لا تفوّت الفرص */
const opportunities = [
  { icon: Briefcase, text: "فرص وظيفية وترقيات أسرع" },
  { icon: GraduationCap, text: "قبول جامعي ونجاح في الاختبارات" },
  { icon: Users, text: "ظهور وحضور وعلاقات" },
];

/* CONTENT.md §13 — the 3 REAL testimonials. Never invent testimonials. */
const testimonials = [
  {
    name: "منيرة الشبيبي",
    role: "موظفة",
    quote:
      "كان عندي meeting… للأمانة ملاحظة التطور فيني بصراحه. شكرًا لكم على اهتمامكم فينا وحرصكم. الحمدلله صرت أحسن. مره مبسوطه",
  },
  {
    name: "أماني محمد",
    role: "طالبة",
    quote: "يعطيكم العافية ماقصرتم، ساعدتوني كثير",
  },
  {
    name: "مستفيد من دروس المحادثة",
    quote:
      "دروس المحادثة مره مفيده.. من حياتنا اليوميه وحلوه عجبتني مره. ماقصرتوا كفيتوا ووفيتوا",
  },
];

const stats = [
  { value: "+5,000", label: "مستفيد من الأكاديمية" },
  { value: "26", label: "درسًا في التأسيس" },
  { value: "+3,300", label: "كلمة من الأكثر استخدامًا" },
  { value: "🎓", label: "شهادة لكل مستوى" },
];

/* floating hero proof pills — all true claims from CONTENT.md */
const heroFloats = [
  {
    icon: Star,
    text: "+5,000 مستفيد",
    pos: { top: "8%", insetInlineEnd: "72%" },
    delay: "0s",
  },
  {
    icon: Timer,
    text: "15–30 دقيقة يوميًا",
    pos: { top: "34%", insetInlineEnd: "-2%" },
    delay: "1.1s",
  },
  {
    icon: Award,
    text: "شهادة لكل مستوى",
    pos: { bottom: "14%", insetInlineEnd: "68%" },
    delay: "2.2s",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ═══ Hero ═══ */}
      <section className="relative overflow-hidden bg-hero-glow">
        <ArrowMotif
          aria-hidden
          className="absolute -top-10 start-[-4rem] h-64 w-96 -rotate-12 text-primary/[0.035]"
        />
        <div className="container-site grid items-center gap-12 py-14 md:grid-cols-2 md:py-20 lg:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-white px-4 py-1.5 text-sm font-bold text-primary shadow-soft">
              <ArrowMotif className="h-2.5 w-3.5 text-accent" />
              {site.nameAr}
            </span>

            <h1 className="mt-5 text-[2.1rem] font-black leading-[1.35] sm:text-5xl lg:text-[3.4rem]">
              فرصتك الذهبية لإتقان الإنجليزية{" "}
              <span className="relative inline-block text-primary">
                مهما كان مستواك
                <svg
                  aria-hidden
                  className="absolute -bottom-2 start-0 h-3 w-full text-accent"
                  viewBox="0 0 200 12"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M3 9 C 60 2.5, 140 2.5, 197 7.5"
                    stroke="currentColor"
                    strokeWidth="5"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            <p className="mt-6 text-lg font-semibold text-ink/70">
              انضم لأكثر من{" "}
              <span className="font-black text-primary">5,000 مستفيد</span> من
              أكاديمية زد لفل{" "}
              <span className="font-black text-primary">ZEDLEVEL</span>
            </p>

            <div className="mt-8 flex flex-col gap-3.5 sm:flex-row sm:items-center">
              <Link href="/test" className="btn btn-primary text-lg">
                حدد مستواك — ابدأ الاختبار المجاني
              </Link>
              <WhatsAppButton message={site.whatsapp.msgGeneral} source="hero">
                تقييم سريع بالواتساب
              </WhatsAppButton>
            </div>

            <p className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-ink/55">
              <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-accent" />
              مجاني لفترة محدودة — احجز موعدك الآن
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-2.5">
              {LEVELS.map((l) => (
                <LevelChip key={l} level={l} />
              ))}
              <LevelChip level="C1" soon />
            </div>
          </div>

          {/* Mascot + floating proof */}
          <div className="relative mx-auto w-full max-w-md md:max-w-none">
            <div
              aria-hidden
              className="absolute left-1/2 top-1/2 -z-10 aspect-square w-[92%] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-soft/60 blur-2xl"
            />
            <div className="flex justify-center">
              <Mascot
                name="shab-front"
                size="hero"
                priority
                className="h-80 w-auto drop-shadow-2xl sm:h-[26rem] lg:h-[30rem]"
              />
            </div>
            <div
              aria-hidden
              className="mx-auto -mt-3 h-5 w-3/5 rounded-[100%] bg-navy/10 blur-md"
            />
            {heroFloats.map((f) => (
              <span
                key={f.text}
                className="absolute hidden animate-float items-center gap-2 rounded-2xl border border-primary/10 bg-white/95 px-4 py-2.5 text-sm font-black shadow-lifted backdrop-blur md:inline-flex"
                style={{ ...f.pos, animationDelay: f.delay }}
              >
                <f.icon className="h-4 w-4 text-accent" aria-hidden />
                {f.text}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Stats strip ═══ */}
      <section className="border-y border-ink/5 bg-white">
        <Reveal>
          <div className="container-site grid grid-cols-2 divide-x divide-x-reverse divide-ink/5 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="px-4 py-8 text-center lg:py-10">
                <p className="text-3xl font-black text-primary lg:text-4xl">
                  {s.value}
                </p>
                <p className="mt-1.5 text-sm font-bold text-ink/55">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ═══ كيف بتتحسّن؟ (4 pillars) ═══ */}
      <section className="bg-section py-20 lg:py-28">
        <div className="container-site">
          <Reveal>
            <SectionHeading
              eyebrow="منهجية زد لفل"
              title="كيف بتتحسّن؟"
              sub="أربع ركائز نشتغل عليها معك من أول يوم"
            />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 90}>
                <div className="card card-hover relative h-full overflow-hidden p-7">
                  <span
                    aria-hidden
                    className="absolute -top-5 end-3 text-[5rem] font-black leading-none text-primary/[0.07]"
                  >
                    {p.num}
                  </span>
                  <span className="relative inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white shadow-glow-blue">
                    <p.icon className="h-7 w-7" aria-hidden />
                  </span>
                  <h3 className="mt-5 text-lg font-black">{p.title}</h3>
                  <p className="mt-2 text-[15px] leading-8 text-ink/65">
                    {p.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Real needs ═══ */}
      <section className="py-20 lg:py-28">
        <div className="container-site grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] bg-brand-gradient p-8 text-white sm:p-10">
              <ArrowMotif
                aria-hidden
                className="absolute -bottom-6 -end-8 h-32 w-44 rotate-12 text-white/[0.06]"
              />
              <span className="text-5xl font-black text-accent" aria-hidden>
                ”
              </span>
              <p className="mt-2 text-2xl font-black leading-relaxed sm:text-[1.7rem]">
                أغلب الدورات صُنعت عشان تنباع.
                <br />
                <span className="text-accent">
                  دوراتنا صُنعت حول اللي تحتاجه فعلًا.
                </span>
              </p>
              <p className="mt-4 max-w-[38ch] leading-8 text-white/70">
                عشان كذا هالمرة راح تكمّل للنهاية — مو مثل كل مرة.
              </p>
            </div>
          </Reveal>
          <div>
            <Reveal>
              <SectionHeading
                align="start"
                eyebrow="ليه تكمّل معنا؟"
                title="مبني حول احتياجاتك الحقيقية"
              />
            </Reveal>
            <ul className="mt-8 grid gap-3.5">
              {realNeeds.map((need, i) => (
                <Reveal key={need} delay={i * 80}>
                  <li className="card flex items-center gap-3.5 p-4.5 px-5 py-4 font-bold">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary-light">
                      <CheckCircle2
                        className="h-5 w-5 text-primary"
                        aria-hidden
                      />
                    </span>
                    {need}
                  </li>
                </Reveal>
              ))}
            </ul>
            <Reveal delay={340}>
              <Link
                href="/how-it-works"
                className="mt-7 inline-flex items-center gap-2 font-black text-primary hover:underline"
              >
                شوف كيف نعمل
                <ArrowMotif className="h-2.5 w-3.5 -rotate-90 text-accent" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ لا تفوّت الفرص ═══ */}
      <section className="bg-section py-20 lg:py-28">
        <div className="container-site">
          <Reveal>
            <SectionHeading
              eyebrow="وش ينتظرك؟"
              title="لا تفوّت الفرص"
              sub="اللغة تفتح لك الأبواب — ابدأ خطتك الآن"
            />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {opportunities.map((o, i) => (
              <Reveal key={o.text} delay={i * 90}>
                <div className="card card-hover flex h-full flex-col items-center gap-4 p-8 text-center">
                  <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/15">
                    <o.icon className="h-8 w-8 text-ink" aria-hidden />
                  </span>
                  <p className="text-lg font-black">{o.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Level ladder — SIGNATURE (dark) ═══ */}
      <section className="relative overflow-hidden bg-brand-gradient py-20 lg:py-28">
        <ArrowMotif
          aria-hidden
          className="absolute -top-8 end-[-3rem] h-56 w-80 rotate-[24deg] text-white/[0.04]"
        />
        <div className="container-site grid items-center gap-14 lg:grid-cols-2">
          <div>
            <Reveal>
              <SectionHeading
                align="start"
                tone="dark"
                eyebrow="LEVEL UP"
                title="نسرّع انتقالك للمستوى التالي"
              />
            </Reveal>
            <ul className="mt-8 space-y-4">
              {[
                "تطوير المفردات حسب المستوى",
                "تدريبات على محادثات عملية",
                "إتقان أهم القواعد المهمة",
              ].map((item, i) => (
                <Reveal key={item} delay={i * 80}>
                  <li className="flex items-center gap-3 text-lg font-bold text-white">
                    <ArrowMotif className="h-3 w-4 shrink-0 text-accent" />
                    {item}
                  </li>
                </Reveal>
              ))}
            </ul>
            <Reveal delay={280}>
              <div className="mt-10 flex items-end gap-5">
                <Link href="/courses" className="btn btn-accent text-lg">
                  سجل الآن
                </Link>
                <Mascot
                  name="shab-side"
                  size="card"
                  className="hidden h-28 w-auto drop-shadow-xl sm:block"
                />
              </div>
            </Reveal>
          </div>
          <LevelLadder variant="dark" />
        </div>
      </section>

      {/* ═══ Speaking test teaser ═══ */}
      <section className="py-20 lg:py-24">
        <div className="container-site">
          <Reveal>
            <div className="flex flex-col items-center justify-between gap-8 rounded-[2rem] border border-primary/10 bg-gradient-to-l from-primary-light via-white to-white p-8 text-center shadow-soft sm:p-10 lg:flex-row lg:text-start">
              <div className="flex flex-col items-center gap-5 lg:flex-row">
                <span className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-primary text-white shadow-glow-blue">
                  <Mic className="h-9 w-9" aria-hidden />
                  <span
                    aria-hidden
                    className="absolute inset-0 -z-10 animate-ping rounded-full bg-primary/20 [animation-duration:2.5s]"
                  />
                </span>
                <div>
                  <h2 className="text-2xl font-black sm:text-[1.75rem]">
                    اختبر نطقك ومحادثتك 🎤
                  </h2>
                  <p className="mt-2 text-ink/60 sm:text-lg">
                    تقييم فوري بالذكاء الاصطناعي — أو جلسة مباشرة مع معلم
                  </p>
                </div>
              </div>
              <Link
                href="/speaking-test"
                className="btn btn-primary shrink-0 text-lg"
              >
                جرّب اختبار المحادثة
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ Courses grid ═══ */}
      <section className="bg-section py-20 lg:py-28">
        <div className="container-site">
          <Reveal>
            <SectionHeading
              eyebrow="دوراتنا"
              title="اختر الدورة المناسبة لمستواك"
              sub="دورتان جاهزتان الآن — وثلاث دورات قادمة قريبًا"
            />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((c, i) => (
              <Reveal key={c.slug} delay={i * 80} className="h-full">
                <CourseCard course={c} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Testimonials — WhatsApp bubbles ═══ */}
      <section className="py-20 lg:py-28">
        <div className="container-site">
          <div className="flex flex-col items-center">
            <Reveal>
              <Mascot
                name="grandma-front"
                size="card"
                className="h-36 w-auto drop-shadow-xl"
              />
            </Reveal>
            <Reveal delay={100}>
              <div className="mt-5">
                <SectionHeading
                  eyebrow="آراء العملاء"
                  title="قصص حقيقية من مستفيدينا"
                  sub="رسائل وصلتنا فعلًا — مثل ما تشوفها"
                />
              </div>
            </Reveal>
          </div>
          <div className="mt-12 grid gap-6 rounded-[2rem] bg-section p-6 sm:grid-cols-2 sm:p-8 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.quote} delay={i * 110} className="h-full">
                <TestimonialCard {...t} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Final CTA ═══ */}
      <section className="container-site pb-4 pt-6 lg:pt-10">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-brand-gradient px-6 py-14 text-center sm:px-12 lg:py-20">
            <ArrowMotif
              aria-hidden
              className="absolute -start-8 top-6 h-24 w-36 -rotate-12 text-white/[0.07]"
            />
            <ArrowMotif
              aria-hidden
              className="absolute -bottom-8 end-10 h-28 w-40 rotate-6 text-accent/10"
            />
            <h2 className="text-3xl font-black text-white sm:text-4xl lg:text-[2.75rem]">
              ابدأ رحلتك الآن
            </h2>
            <p className="mx-auto mt-4 max-w-[42ch] text-white/75 sm:text-lg">
              خطوتك الأولى مجانية — حدد مستواك خلال دقائق وخذ توصية بالدورة
              المناسبة لك
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
              <Link
                href="/test"
                className="btn btn-accent w-full text-lg sm:w-auto"
              >
                ابدأ الاختبار المجاني
              </Link>
              <WhatsAppButton
                message={site.whatsapp.msgGeneral}
                source="final-cta"
                variant="inverse"
              >
                تقييم سريع بالواتساب
              </WhatsAppButton>
            </div>
            <p className="mt-6 text-sm font-bold text-white/55">
              بدون تسجيل · خلال دقائق · توصية فورية بالدورة المناسبة
            </p>
          </div>
        </Reveal>
      </section>
    </>
  );
}
