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
} from "lucide-react";
import { Mascot } from "@/components/Mascot";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { LevelChip, type Level } from "@/components/LevelChip";
import { ArrowMotif } from "@/components/ArrowMotif";
import { SectionHeading } from "@/components/SectionHeading";
import { LevelLadder } from "@/components/LevelLadder";
import { CourseCard } from "@/components/CourseCard";
import { TestimonialCard } from "@/components/TestimonialCard";
import { courses } from "@/config/courses";
import { site } from "@/config/site";

const LEVELS: Level[] = ["A0", "A1", "A2", "B1", "B2"];

/* CONTENT.md §12 — كيف بتتحسّن؟ (4 pillars) */
const pillars = [
  {
    icon: BookOpenCheck,
    title: "الأساس",
    desc: "منهج يختصر وقتك · دورات مدرجة تركز على اللي يهمك بدون محتوى زيادة",
  },
  {
    icon: Route,
    title: "تعلم بالطريقة الصح",
    desc: "محتوى تفاعلي مصمم لمستواك · تقدم بخطوات واضحة",
  },
  {
    icon: UserCheck,
    title: "متابعة حقيقية",
    desc: "مرشد يخطط مسارك ويتابع تقدمك حتى توصل لهدفك",
  },
  {
    icon: MessagesSquare,
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

export default function HomePage() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="container-site grid items-center gap-10 py-12 md:grid-cols-2 md:py-16 lg:py-20">
        <div>
          <span className="inline-flex items-center gap-1.5 text-sm font-bold text-primary">
            <ArrowMotif className="h-3 w-4 text-accent" />
            {site.nameAr}
          </span>

          <h1 className="mt-3 text-3xl font-black leading-snug sm:text-4xl lg:text-5xl">
            فرصتك الذهبية لإتقان الإنجليزية{" "}
            <span className="text-primary">مهما كان مستواك</span>
          </h1>

          <p className="mt-4 text-lg font-semibold text-ink/80">
            +5,000 مستفيد من أكاديمية زد لفل{" "}
            <span className="font-black text-primary">ZEDLEVEL</span>
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/test"
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-primary px-6 py-3.5 text-lg font-black text-white transition-colors hover:bg-primary-dark"
            >
              حدد مستواك — ابدأ الاختبار المجاني
            </Link>
            <WhatsAppButton message={site.whatsapp.msgGeneral} source="hero">
              تقييم سريع بالواتساب
            </WhatsAppButton>
          </div>

          <p className="mt-3 text-sm text-ink/60">
            مجاني لفترة محدودة — احجز موعدك الآن
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-2.5">
            {LEVELS.map((l) => (
              <LevelChip key={l} level={l} />
            ))}
            <LevelChip level="C1" soon />
          </div>
        </div>

        <div className="relative flex justify-center md:justify-start">
          <div
            aria-hidden
            className="absolute bottom-0 left-1/2 -z-10 aspect-square w-[85%] max-w-md -translate-x-1/2 rounded-full bg-primary-light"
          />
          <Mascot
            name="shab-front"
            size="hero"
            priority
            className="h-72 w-auto sm:h-96 lg:h-[28rem]"
          />
        </div>
      </section>

      {/* ─── كيف بتتحسّن؟ (4 pillars) ─── */}
      <section className="bg-section py-16 lg:py-20">
        <div className="container-site">
          <SectionHeading
            eyebrow="منهجية زد لفل"
            title="كيف بتتحسّن؟"
            sub="أربع ركائز نشتغل عليها معك من أول يوم"
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p) => (
              <div
                key={p.title}
                className="rounded-2xl border border-ink/5 bg-white p-6 shadow-sm"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary-light text-primary">
                  <p.icon className="h-6 w-6" aria-hidden />
                </span>
                <h3 className="mt-4 font-black">{p.title}</h3>
                <p className="mt-1.5 text-sm leading-7 text-ink/70">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Real needs ─── */}
      <section className="py-16 lg:py-20">
        <div className="container-site grid items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              align="start"
              eyebrow="ليه تكمّل معنا؟"
              title="مبني حول احتياجاتك الحقيقية"
              sub="أغلب الدورات صُنعت عشان تنباع. دوراتنا صُنعت حول اللي تحتاجه فعلًا — عشان هالمرة تكمّل للنهاية."
            />
            <Link
              href="/how-it-works"
              className="mt-6 inline-flex items-center gap-1.5 font-bold text-primary hover:underline"
            >
              شوف كيف نعمل
              <ArrowMotif className="h-2.5 w-3.5 -rotate-90 text-accent" />
            </Link>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {realNeeds.map((need) => (
              <li
                key={need}
                className="flex items-center gap-3 rounded-xl border border-ink/5 bg-white p-4 font-semibold shadow-sm"
              >
                <CheckCircle2
                  className="h-5 w-5 shrink-0 text-primary"
                  aria-hidden
                />
                {need}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ─── لا تفوّت الفرص ─── */}
      <section className="bg-section py-16 lg:py-20">
        <div className="container-site">
          <SectionHeading
            eyebrow="وش ينتظرك؟"
            title="لا تفوّت الفرص"
            sub="اللغة تفتح لك الأبواب — ابدأ خطتك الآن"
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {opportunities.map((o) => (
              <div
                key={o.text}
                className="flex flex-col items-center gap-3 rounded-2xl border border-ink/5 bg-white p-6 text-center shadow-sm"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent/20 text-ink">
                  <o.icon className="h-6 w-6" aria-hidden />
                </span>
                <p className="font-bold">{o.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Level ladder — SIGNATURE ─── */}
      <section className="overflow-hidden py-16 lg:py-24">
        <div className="container-site grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              align="start"
              eyebrow="LEVEL UP"
              title="نسرّع انتقالك للمستوى التالي"
            />
            <ul className="mt-6 space-y-3">
              {[
                "تطوير المفردات حسب المستوى",
                "تدريبات على محادثات عملية",
                "إتقان أهم القواعد المهمة",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2.5 font-semibold">
                  <ArrowMotif className="h-2.5 w-3.5 shrink-0 text-accent" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/courses"
                className="inline-flex min-h-12 items-center justify-center rounded-xl bg-accent px-6 py-3 text-lg font-black text-ink transition-colors hover:bg-accent-dark"
              >
                سجل الآن
              </Link>
              <div className="hidden sm:block">
                <Mascot name="shab-side" size="card" className="h-24 w-auto" />
              </div>
            </div>
          </div>
          <LevelLadder />
        </div>
      </section>

      {/* ─── Speaking test teaser ─── */}
      <section className="bg-primary py-10">
        <div className="container-site flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-start">
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/10 text-white">
              <Mic className="h-7 w-7" aria-hidden />
            </span>
            <div>
              <h2 className="text-xl font-black text-white sm:text-2xl">
                اختبر نطقك ومحادثتك 🎤
              </h2>
              <p className="mt-1 text-white/80">
                تقييم فوري بالذكاء الاصطناعي — أو جلسة مباشرة مع معلم
              </p>
            </div>
          </div>
          <Link
            href="/speaking-test"
            className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-xl bg-white px-6 py-3 font-black text-primary transition-colors hover:bg-primary-light"
          >
            جرّب اختبار المحادثة
          </Link>
        </div>
      </section>

      {/* ─── Courses grid ─── */}
      <section className="py-16 lg:py-20">
        <div className="container-site">
          <SectionHeading
            eyebrow="دوراتنا"
            title="اختر الدورة المناسبة لمستواك"
            sub="دورتان جاهزتان الآن — وثلاث دورات قادمة قريبًا"
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((c) => (
              <CourseCard key={c.slug} course={c} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── Testimonials ─── */}
      <section className="bg-section py-16 lg:py-20">
        <div className="container-site">
          <div className="flex flex-col items-center">
            <Mascot name="grandma-front" size="card" className="h-32 w-auto" />
            <div className="mt-4">
              <SectionHeading
                eyebrow="آراء العملاء"
                title="قصص حقيقية من مستفيدينا"
                sub="+5,000 مستفيد من أكاديمية زد لفل"
              />
            </div>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t) => (
              <TestimonialCard key={t.quote} {...t} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── Final CTA ─── */}
      <section className="container-site py-16 lg:py-20">
        <div className="rounded-3xl bg-primary px-6 py-12 text-center sm:px-12 lg:py-16">
          <h2 className="text-2xl font-black text-white sm:text-3xl lg:text-4xl">
            ابدأ رحلتك الآن
          </h2>
          <p className="mx-auto mt-3 max-w-[45ch] text-white/85 sm:text-lg">
            خطوتك الأولى مجانية — حدد مستواك خلال دقائق وخذ توصية بالدورة
            المناسبة لك
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/test"
              className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-accent px-8 py-3.5 text-lg font-black text-ink transition-colors hover:bg-accent-dark sm:w-auto"
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
        </div>
      </section>
    </>
  );
}
