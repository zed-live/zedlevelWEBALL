import Link from "next/link";
import {
  BookOpen,
  Target,
  Mic,
  Mic2,
  Briefcase,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  Bot,
  ShoppingBag,
} from "lucide-react";
import { Mascot } from "@/components/Mascot";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { ArrowMotif } from "@/components/ArrowMotif";
import { SectionHeading } from "@/components/SectionHeading";
import { LevelLadder } from "@/components/LevelLadder";
import { CoursesTabs } from "@/components/CoursesTabs";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import { Reveal } from "@/components/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Underline } from "@/components/motion/Underline";
import { CountUp } from "@/components/motion/CountUp";
import { site } from "@/config/site";

/* ─── Homepage v5 — the user's 10-section prompt (2026-07-04) ─── */

/* §3 كيف بتتحسّن لغتك؟ — 3 horizontal columns */
const improve = [
  {
    icon: BookOpen,
    color: "bg-primary text-white shadow-glow-blue",
    title: "منهج عملي يختصر وقتك",
    desc: "تركّز على المهم عشان توصل بأقصر طريق",
  },
  {
    icon: Target,
    color: "bg-accent text-ink shadow-glow-accent",
    title: "متابعة تشجعك تستمر",
    desc: "مرشد يتابع تقدمك حتى توصل لهدفك",
  },
  {
    icon: Mic,
    color: "bg-navy text-white",
    title: "حصص مباشرة ومكثفة",
    desc: "تطبّق وتمارس اللي تعلمته، وتتكلم بثقة",
  },
];

/* §6 ليش تنضم لدوراتنا؟ — vertical checklist */
const whyJoin = [
  "روتين لغوي يناسب وقتك",
  "دورات مبنية على احتياجك",
  "دروس مباشرة تمارس فيها اللي تعلمته",
  "اختبارات وشهادات تثبت نجاحك",
];

/* §7 لا تفوّت الفرص */
const opportunities = [
  { icon: Briefcase, text: "فرص وظيفية وترقيات توصلك أسرع" },
  { icon: GraduationCap, text: "قبول جامعي ونجاح في الاختبارات" },
  { icon: Sparkles, text: "حضور وثقة وعلاقات أوسع" },
];

/* §9 آراء العملاء — the 3 real testimonials (CONTENT.md §13) */
const testimonials = [
  {
    name: "منيرة الشبيبي",
    role: "موظفة",
    quote:
      "كان عندي meeting… للأمانة ملاحظة التطور فيني بصراحة. شكرًا لكم على اهتمامكم فينا وحرصكم. الحمدلله صرت أحسن. مره مبسوطة.",
  },
  {
    name: "أماني محمد",
    role: "طالبة",
    quote: "يعطيكم العافية ما قصرتم، ساعدتوني كثير.",
  },
  {
    name: "من دورة المحادثة",
    quote:
      "دروس المحادثة مره مفيدة.. من حياتنا اليومية وحلوة عجبتني مره. ما قصرتوا كفيتوا ووفيتوا.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ═══ §1 الهيرو ═══ */}
      <section className="relative overflow-hidden bg-hero-glow">
        <div
          aria-hidden
          className="absolute inset-0 bg-dots [mask-image:radial-gradient(65%_60%_at_75%_15%,black,transparent)]"
        />
        <div
          aria-hidden
          className="orb orb-blue absolute -top-28 end-[-9rem] h-[26rem] w-[26rem]"
        />
        <div
          aria-hidden
          className="orb orb-accent absolute bottom-[-7rem] start-[-7rem] h-80 w-80"
        />
        <div className="container-site relative grid items-center gap-12 py-14 md:grid-cols-2 md:py-20 lg:py-24">
          <Stagger>
            <StaggerItem>
              <h1 className="text-[clamp(2.2rem,5.8vw,3.7rem)] font-black leading-[1.3]">
                فرصتك الذهبية لإتقان الإنجليزية —{" "}
                <Underline className="text-primary">مهما كان مستواك</Underline>
              </h1>
            </StaggerItem>

            <StaggerItem>
              <p className="mt-6 max-w-[46ch] text-lg font-semibold leading-9 text-ink/70">
                انضم لأكثر من{" "}
                <CountUp
                  value="+5,000"
                  className="text-xl font-black text-primary"
                />{" "}
                مستفيد من أكاديمية زد لفل.
                <br />
                محتوى يختصر وقتك، ومتابعة تشجعك تستمر.
              </p>
            </StaggerItem>

            {/* mobile mascot — above the fold */}
            <StaggerItem className="md:hidden">
              <div className="mt-6 flex justify-center">
                <Mascot
                  name="grandpa-front"
                  size="section"
                  priority
                  className="h-48 w-auto animate-breathe drop-shadow-xl"
                />
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="mt-7 flex flex-col gap-3.5 sm:flex-row sm:items-center md:mt-8">
                <WhatsAppButton
                  message={site.whatsapp.msgLevel}
                  source="hero"
                  variant="solid"
                  className="text-lg"
                >
                  حدّد مستواك عبر الواتساب
                </WhatsAppButton>
                <Link href="/courses" className="btn btn-primary text-lg">
                  <ShoppingBag className="h-5 w-5" aria-hidden />
                  تصفّح الدورات
                </Link>
              </div>
            </StaggerItem>

            <StaggerItem>
              <p className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-ink/60">
                <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-accent" />
                مجاني لفترة محدودة — احجز موعدك الآن
              </p>
            </StaggerItem>
          </Stagger>

          {/* Mascot (desktop) */}
          <div className="relative mx-auto hidden w-full max-w-md md:block md:max-w-none">
            <div
              aria-hidden
              className="absolute left-1/2 top-1/2 -z-10 aspect-square w-[92%] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-soft/60 blur-2xl"
            />
            <div className="flex justify-center">
              <Mascot
                name="grandpa-front"
                size="hero"
                priority
                className="h-80 w-auto animate-breathe drop-shadow-2xl sm:h-[26rem] lg:h-[30rem]"
              />
            </div>
            <div
              aria-hidden
              className="mx-auto -mt-3 h-5 w-3/5 rounded-[100%] bg-navy/10 blur-md"
            />
          </div>
        </div>
      </section>

      {/* ═══ §2 سُلّم المستويات (تفاعلي) ═══ */}
      <section className="py-20 lg:py-28">
        <div className="container-site">
          <Reveal>
            <SectionHeading
              eyebrow="سُلّم المستويات"
              title="ابدأ من مستواك… ونوصلك للي بعده"
            />
          </Reveal>
          <div className="mx-auto mt-12 max-w-3xl">
            <LevelLadder variant="light" cta />
          </div>
        </div>
      </section>

      {/* ═══ §3 كيف بتتحسّن لغتك؟ ═══ */}
      <section className="bg-section py-20 lg:py-28">
        <div className="container-site">
          <Reveal>
            <SectionHeading title="كيف بتتحسّن لغتك؟" />
          </Reveal>
          <div className="mx-auto mt-12 grid max-w-4xl gap-8 sm:grid-cols-3">
            {improve.map((p, i) => (
              <Reveal key={p.title} delay={i * 100}>
                <div className="text-center">
                  <span
                    className={`mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full ${p.color}`}
                  >
                    <p.icon className="h-8 w-8" aria-hidden />
                  </span>
                  <h3 className="mt-4 text-lg font-black">{p.title}</h3>
                  <p className="mt-1.5 leading-8 text-ink/60">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ §4 زد لفل… عشان تزيد لِفِل ═══ */}
      <section className="relative overflow-hidden bg-primary py-20 lg:py-24">
        <ArrowMotif
          aria-hidden
          className="absolute -bottom-8 end-[-3rem] h-48 w-72 rotate-12 text-white/[0.08]"
        />
        <ArrowMotif
          aria-hidden
          className="absolute -top-6 start-[-2rem] h-32 w-48 -rotate-12 text-white/[0.06]"
        />
        <div className="container-site relative text-center">
          <Reveal>
            <h2 className="text-[clamp(2rem,5vw,3.2rem)] font-black text-white">
              زد لفل… عشان{" "}
              <span className="relative inline-block text-accent">
                تزيد لِفِل
              </span>
            </h2>
            <p className="mx-auto mt-6 max-w-[44ch] text-lg font-semibold leading-9 text-white/85 sm:text-xl">
              مو مجرد دورة تخلّصها وتنساها.
              <br />
              هنا تطلع مستوى بعد مستوى — من «ما أفهم شي» إلى إنك تقرأ وتسأل
              وترد بثقة.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══ §5 الدورات ⭐ ═══ */}
      <section className="py-20 lg:py-28">
        <div className="container-site">
          <Reveal>
            <SectionHeading eyebrow="الأهم" title="دوراتنا" />
          </Reveal>
          <div className="mt-10">
            <CoursesTabs />
          </div>
        </div>
      </section>

      {/* ═══ §6 ليش تنضم لدوراتنا؟ ═══ */}
      <section className="bg-section py-20 lg:py-28">
        <div className="container-site grid items-center gap-12 lg:grid-cols-2">
          <div>
            <Reveal>
              <SectionHeading align="start" title="ليش تنضم لدوراتنا؟" />
            </Reveal>
            <ul className="mt-8 space-y-3.5">
              {whyJoin.map((item, i) => (
                <Reveal key={item} delay={i * 80}>
                  <li className="card flex items-center gap-3.5 px-5 py-4 font-bold">
                    <CheckCircle2
                      className="h-6 w-6 shrink-0 text-primary"
                      aria-hidden
                    />
                    {item}
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
          <Reveal delay={150}>
            <div className="flex justify-center">
              <Mascot
                name="girl-front"
                size="section"
                className="h-72 w-auto animate-breathe drop-shadow-xl sm:h-80"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ §7 لا تفوّت الفرص ═══ */}
      <section className="relative overflow-hidden bg-brand-gradient py-20 lg:py-28">
        <div
          aria-hidden
          className="absolute inset-0 bg-dots-light [mask-image:radial-gradient(60%_50%_at_50%_0%,black,transparent)]"
        />
        <div className="container-site relative text-center">
          <Reveal>
            <SectionHeading tone="dark" title="لا تفوّت الفرص بسبب لغتك" />
          </Reveal>
          <div className="mx-auto mt-12 grid max-w-4xl gap-8 sm:grid-cols-3">
            {opportunities.map((o, i) => (
              <Reveal key={o.text} delay={i * 100}>
                <div className="flex flex-col items-center gap-4">
                  <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-accent text-ink shadow-glow-accent">
                    <o.icon className="h-8 w-8" aria-hidden />
                  </span>
                  <p className="max-w-[24ch] text-lg font-black text-white">
                    {o.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={300}>
            <div className="mt-12 flex flex-col items-center gap-4">
              <Mascot
                name="shab-front"
                size="card"
                className="h-32 w-auto drop-shadow-xl"
              />
              <p className="text-lg font-bold text-white/85">
                اللغة تفتح لك الأبواب — ابدأ خطتك الآن
              </p>
              <WhatsAppButton
                message={site.whatsapp.msgLevel}
                source="opportunities"
                variant="solid"
              >
                حدّد مستواك عبر الواتساب
              </WhatsAppButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ §8 اختبار المحادثة ═══ */}
      <section className="py-20 lg:py-28">
        <div className="container-site">
          <Reveal>
            <SectionHeading
              eyebrow="اختبار المحادثة"
              title="اختبر نطقك ومحادثتك"
              sub="عندك مستوى بالإنجليزي وتبي تتأكد من نطقك ومحادثتك؟ سوِّ اختبار المحادثة واعرف مستواك الحقيقي في الكلام."
            />
          </Reveal>
          <div className="mx-auto mt-12 grid max-w-3xl gap-5 sm:grid-cols-2">
            <Reveal className="h-full">
              <div className="card h-full p-7 text-center">
                <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white shadow-glow-blue">
                  <Bot className="h-7 w-7" aria-hidden />
                </span>
                <h3 className="mt-4 text-lg font-black">
                  اختبار فوري بالذكاء الاصطناعي
                </h3>
                <p className="mt-1.5 text-[15px] leading-8 text-ink/65">
                  تقييم مباشر لنطقك، في أي وقت
                </p>
              </div>
            </Reveal>
            <Reveal delay={120} className="h-full">
              <div className="card h-full p-7 text-center">
                <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-ink shadow-glow-accent">
                  <Mic2 className="h-7 w-7" aria-hidden />
                </span>
                <h3 className="mt-4 text-lg font-black">جلسة مباشرة مع معلم</h3>
                <p className="mt-1.5 text-[15px] leading-8 text-ink/65">
                  للمتقدمين اللي يبون تقييمًا بشريًا دقيقًا
                </p>
              </div>
            </Reveal>
          </div>
          <Reveal delay={220}>
            <div className="mt-9 text-center">
              <Link href="/speaking-test" className="btn btn-accent text-lg">
                ابدأ اختبار المحادثة
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ §9 آراء العملاء (كاروسيل) ═══ */}
      <section className="bg-section py-20 lg:py-28">
        <div className="container-site">
          <Reveal>
            <SectionHeading eyebrow="آراء العملاء" title="وش يقولون طلابنا؟" />
          </Reveal>
        </div>
        <Reveal delay={120}>
          <div className="mt-10">
            <TestimonialCarousel items={testimonials} />
          </div>
        </Reveal>
      </section>

      {/* ═══ §10 الدعوة الأخيرة ═══ */}
      <section className="container-site pb-4 pt-16 lg:pt-20">
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
              ابدأ رحلتك الآن
            </h2>
            <p className="mx-auto mt-4 max-w-[42ch] text-white/80 sm:text-lg">
              خطوتك الأولى نحو إنجليزي تستخدمه فعلًا — تبدأ اليوم.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
              <WhatsAppButton
                message={site.whatsapp.msgLevel}
                source="final-cta"
                variant="solid"
                className="text-lg"
              >
                حدّد مستواك عبر الواتساب
              </WhatsAppButton>
              <Link
                href="/courses"
                className="btn btn-accent w-full text-lg sm:w-auto"
              >
                <ShoppingBag className="h-5 w-5" aria-hidden />
                تصفّح الدورات
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
