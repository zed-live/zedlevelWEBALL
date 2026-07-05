import Link from "next/link";
import {
  BookOpen,
  Target,
  Mic,
  Briefcase,
  GraduationCap,
  Sparkles,
  ShoppingBag,
} from "lucide-react";
import { Mascot } from "@/components/Mascot";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { ArrowMotif } from "@/components/ArrowMotif";
import { SectionHeading } from "@/components/SectionHeading";
import { LevelLadder } from "@/components/LevelLadder";
import { CoursesTabs } from "@/components/CoursesTabs";
import { WhyJoinTimeline } from "@/components/WhyJoinTimeline";
import { SallaButton } from "@/components/SallaButton";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import { Marquee } from "@/components/Marquee";
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
                  name="shab-front"
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

          {/* Mascot (desktop) + floating proof */}
          <div className="relative mx-auto hidden w-full max-w-md md:block md:max-w-none">
            <div
              aria-hidden
              className="absolute left-1/2 top-1/2 -z-10 aspect-square w-[92%] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-soft/60 blur-2xl"
            />
            <div className="flex justify-center">
              <Mascot
                name="shab-front"
                size="hero"
                priority
                className="h-80 w-auto animate-breathe drop-shadow-2xl sm:h-[26rem] lg:h-[30rem]"
              />
            </div>
            <div
              aria-hidden
              className="mx-auto -mt-3 h-5 w-3/5 rounded-[100%] bg-navy/10 blur-md"
            />
            <span
              className="absolute top-[16%] hidden animate-float items-center gap-2 rounded-2xl border border-primary/10 bg-white/95 px-4 py-2.5 text-sm font-black shadow-lifted md:inline-flex"
              style={{ insetInlineEnd: "70%" }}
            >
              ⏱️ 15–30 دقيقة يوميًا
            </span>
            <span
              className="absolute bottom-[18%] hidden animate-float-slow items-center gap-2 rounded-2xl border border-primary/10 bg-white/95 px-4 py-2.5 text-sm font-black shadow-lifted md:inline-flex"
              style={{ insetInlineEnd: "-2%" }}
            >
              🎓 شهادة لكل مستوى
            </span>
          </div>
        </div>
      </section>

      {/* ═══ الشريط — differentiators that actually matter ═══ */}
      <Marquee
        items={[
          "مشرف يتابع معك خطوة بخطوة",
          "ممارسة مباشرة مع معلمك",
          "روتين دراسي يناسب ظروفك",
          "أكثر من 5,000 مستفيد",
          "تمارين واختبارات تقيس تقدمك",
          "دورات مختلفة تناسب احتياجاتك (تأسيس · محادثات مع أجانب · قواعد · حصيلة مفردات وغيرها الكثير)",
        ]}
      />

      {/* ═══ §2 سُلّم المستويات (تفاعلي) ═══ */}
      <section className="py-20 lg:py-28">
        <div className="container-site">
          <Reveal>
            <SectionHeading
              eyebrow="سُلّم المستويات"
              title={
                <>
                  ابدأ من مستواك… ونوصلك للي بعده{" "}
                  <ArrowMotif className="inline-block h-5 w-7 align-middle text-accent" />
                </>
              }
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
        <div className="container-site relative flex flex-col items-center gap-8 lg:flex-row lg:justify-center lg:gap-14">
          <Reveal>
            <div className="text-center lg:text-start">
              <h2 className="text-[clamp(2rem,5vw,3.2rem)] font-black text-white">
                زد لفل… عشان{" "}
                <span className="relative inline-block text-accent">
                  تزيد لِفِل
                </span>
              </h2>
              <p className="mt-6 max-w-[44ch] text-lg font-semibold leading-9 text-white/85 sm:text-xl">
                مو مجرد دورة تخلّصها وتنساها.
                <br />
                هنا تطلع مستوى بعد مستوى — من «ما أفهم شي» إلى إنك تقرأ وتسأل
                وترد بثقة.
              </p>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <Mascot
              name="father-front"
              size="section"
              className="h-56 w-auto animate-breathe drop-shadow-2xl sm:h-64"
            />
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

      {/* ═══ §6 ليش تنضم لدوراتنا؟ — vertical timeline ═══ */}
      <section className="relative overflow-hidden bg-section py-20 lg:py-28">
        <div
          aria-hidden
          className="absolute inset-0 bg-dots [mask-image:radial-gradient(55%_50%_at_50%_0%,black,transparent)]"
        />
        <div className="container-site relative">
          <Reveal>
            <SectionHeading title="ليش تنضم لدوراتنا؟" />
          </Reveal>
          <div className="mt-14">
            <WhyJoinTimeline
              cta={
                <SallaButton course="a0" source="why-join" label="اشترك الآن" />
              }
            />
          </div>
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
          {/* mobile: swipeable slider · sm+: 3-column grid */}
          <div
            className="mx-auto mt-12 flex max-w-4xl snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:grid sm:grid-cols-3 sm:gap-8 sm:overflow-visible sm:pb-0"
            role="list"
          >
            {opportunities.map((o, i) => (
              <Reveal
                key={o.text}
                delay={i * 100}
                className="w-full shrink-0 basis-full snap-center sm:w-auto sm:basis-auto"
              >
                <div
                  role="listitem"
                  className="flex flex-col items-center gap-4 px-2"
                >
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

          {/* dot indicators — mobile only (decorative cue that it's swipeable) */}
          <div
            aria-hidden
            className="mt-1 flex justify-center gap-2 sm:hidden"
          >
            {opportunities.map((o) => (
              <span key={o.text} className="h-2 w-2 rounded-full bg-white/35" />
            ))}
          </div>
          <Reveal delay={300}>
            <div className="mt-12 flex flex-col items-center gap-4">
              <Mascot
                name="grandpa-front"
                size="card"
                className="h-32 w-auto animate-breathe drop-shadow-xl"
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
      <section className="py-20 lg:py-24">
        <div className="container-site text-center">
          <Reveal>
            <SectionHeading
              eyebrow="اختبار المحادثة"
              title="اختبر نطقك ومحادثتك"
              sub="عندك مستوى بالإنجليزي وتبي تتأكد من نطقك ومحادثتك؟ سوِّ اختبار المحادثة واعرف مستواك الحقيقي في الكلام."
            />
          </Reveal>
          <Reveal delay={150}>
            <div className="mt-8">
              <Link href="/speaking-test" className="btn btn-accent text-lg">
                <Target className="h-5 w-5" aria-hidden />
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
            <div className="flex justify-center">
              <Mascot
                name="grandma-front"
                size="card"
                className="h-32 w-auto animate-breathe drop-shadow-xl"
              />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-4">
              <SectionHeading eyebrow="آراء العملاء" title="وش يقولون طلابنا؟" />
            </div>
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
            {/* the whole family is on board — even the baby 🍼 */}
            <div className="absolute -bottom-1 start-8 hidden md:block">
              <Mascot name="baby-back" size="card" className="h-20 w-auto" />
            </div>
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
