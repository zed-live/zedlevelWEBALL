import type { Metadata } from "next";
import { Mascot } from "@/components/Mascot";
import { SectionHeading } from "@/components/SectionHeading";
import { ArrowMotif } from "@/components/ArrowMotif";
import { SallaButton } from "@/components/SallaButton";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { PriceTag } from "@/components/PriceTag";
import { StickyBuyBar } from "@/components/StickyBuyBar";
import { Reveal } from "@/components/Reveal";
import { CurriculumOrbit } from "@/components/course/CurriculumOrbit";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Underline } from "@/components/motion/Underline";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "دورة التأسيس الصحيح A0 — الإنجليزية من الصفر",
  description:
    "3 مراحل · 26 درس · +460 كلمة · +36 موضوع — ابدأ من الصفر وابنِ أساسًا يثبت معك، مع تطبيق مباشر واختبار نهائي وشهادة.",
};

/* ─── A0 page — the user's authoritative 10-section prompt (2026-07-04) ─── */

/* §2 لمن هذه الدورة؟ */
const audience = [
  {
    title: "بادئ من الصفر",
    desc: "ما عندك خلفية بالإنجليزي، وتبي بداية صحيحة وقوية من الأساس",
  },
  {
    title: "بدأت وتعثّرت",
    desc: "جرّبت تطبيقات ودورات، وكل مرة توقف ولا تستمر",
  },
  {
    title: "أساسك ضعيف",
    desc: "تعرف شوي هنا وشوي هناك، بس ما عندك أساس تبني عليه وتثق فيه",
  },
];

/* §3 تخيّل بعد الدورة */
const imagine = [
  "بتكون تعلّمت أهم الصوتيات، فتحل مشكلة القراءة والنطق الصحيح للأصوات.",
  "بتصير قادر تقدّم نفسك وتتكلم عن عائلتك، منطقتك، لبسك، وحياتك — وتسأل بشكل صحيح، وتجاوب، وتنفي صح.",
  "بتعدّ إلى المليون، وتوصف الوقت والطقس والأكل والأماكن… وغيرها الكثير.",
  "وبتكون بنيت لك أساسًا متينًا يبنيك صح ويسرّع تعلّمك.",
];

/* §4 رحلتك في ٣ مراحل */
const stages = [
  {
    emoji: "🌱",
    title: "الانطلاق",
    desc: "تقرأ وتنطق صح — من الحروف والأصوات إلى أول جملة تكوّنها بنفسك.",
  },
  {
    emoji: "🏗️",
    title: "التعبير",
    desc: "تعرّف عن نفسك وتسأل — وتتكلم عن عائلتك ودراستك.",
  },
  {
    emoji: "🎯",
    title: "الإتقان",
    desc: "توصف وتطبّق كل شي — الوقت والأماكن والبيت، وتختم بشهادتك.",
  },
];

/* §5 اللي يفرّقنا */
const differentiators = [
  {
    emoji: "🔔",
    title: "متابعة وتذكير مستمر",
    desc: "نذكّرك على الواتساب باستمرار، فما تتراكم عليك الدروس وما تنسى. في كل مرة تحتاج دفعة، تلقانا معك.",
  },
  {
    emoji: "✅",
    title: "منهجية سهلة التنفيذ",
    desc: "دروس قصيرة، مرتّبة خطوة خطوة، ١٥–٣٠ دقيقة باليوم. ما فيه تعقيد ولا «من وين أبدأ؟» — بس تفتح وتنفّذ.",
  },
  {
    emoji: "🔥",
    title: "تحفيز يخليك تبي تكمّل",
    desc: "نظام يشجّعك ويخليك متحمّس تنجز درسك اليومي، وتوصل لخط النهاية وأنت فخور بنفسك.",
  },
  {
    emoji: "🎤",
    title: "تطبيق عملي مباشر وتفاعلي",
    desc: "في نهاية الدورة تتمرّن مع معلمك في مجموعة صغيرة — تطبّق اللي تعلمته بشكل مباشر، مع فيدباك فوري.",
  },
];

/* §6 الإيقاع الأسبوعي */
const rhythm = [
  { emoji: "📤", text: "سبت · اثنين · أربعاء — يوصلك درسين جديدين" },
  { emoji: "✏️", text: "بينهم — تدرّس وتطبّق على راحتك، كل يوم بيومه" },
  { emoji: "🕌", text: "الجمعة يوم الراحة" },
];

/* §7 وش يشمل اشتراكك؟ */
const included = [
  {
    emoji: "📹",
    title: "دروس فيديو مسجّلة",
    desc: "٢٦ درسًا مرتّبة خطوة خطوة، توصلك أثناء الدورة، وترجع لها وتعيدها متى ما احتجت.",
  },
  {
    emoji: "📘",
    title: "كتيّب تمارين",
    desc: "تدريبات تساعدك تثبّت بعض اللي تعلمته وتطبّقه بيدك.",
  },
  {
    emoji: "📄",
    title: "ملخص شامل",
    desc: "ورقة مراجعة سريعة، ترجع لها في أي وقت.",
  },
  {
    emoji: "🃏",
    title: "بطاقات مراجعة (فلاش كاردز)",
    desc: "تراجع المفردات وتحفظها بسهولة عبر Quizlet.",
  },
  {
    emoji: "🎤",
    title: "تطبيق عملي مباشر وتفاعلي",
    desc: "تطبّق مع معلمك في مجموعة صغيرة (١–٧)، مع اختبارك المباشر وفيدباك فوري.",
  },
  {
    emoji: "🏆",
    title: "اختبار نهائي + شهادة",
    desc: "إثبات حقيقي لتعلّم حقيقي.",
  },
  {
    emoji: "💬",
    title: "متابعة على الواتساب",
    desc: "مجموعة للأسئلة والدعم، ما تمشي وحدك.",
  },
];


const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "التأسيس الصحيح بالإنجليزية — A0",
  description:
    "دورة تأسيس اللغة الإنجليزية من الصفر: 3 مراحل، 26 درسًا، أكثر من 460 كلمة و36 موضوعًا، مع تطبيق مباشر واختبار نهائي وشهادة.",
  provider: {
    "@type": "Organization",
    name: "ZEDLEVEL — أكاديمية زد لفل لتعليم الإنجليزية",
  },
  inLanguage: "ar",
  teaches: "أساسيات اللغة الإنجليزية للمبتدئين (CEFR A0)",
};

export default function A0Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ═══ §1 الهيرو ═══ */}
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
                دورة التأسيس · A0
              </span>
            </StaggerItem>

            <StaggerItem>
              <h1 className="mt-5 text-[clamp(2.2rem,5.5vw,3.6rem)] font-black leading-[1.3]">
                التأسيس <Underline className="text-primary">الصحيح</Underline>{" "}
                بالإنجليزية
              </h1>
            </StaggerItem>

            <StaggerItem>
              <p className="mt-6 max-w-[46ch] text-lg font-semibold leading-9 text-ink/70">
                ابدأ من الصفر، وابنِ أساسًا يثبت معك طوال رحلتك مع الإنجليزي.
                <br />
                من الحروف الأولى… إلى حوار وجمل تكوّنها بثقة.
              </p>
            </StaggerItem>

            <StaggerItem>
              <p className="mt-5 inline-flex flex-wrap items-center gap-x-2 rounded-2xl bg-primary-light px-4 py-2.5 font-black text-primary">
                <span aria-hidden>🎯</span> 3 مراحل · 26 درس · +460 كلمة · +36
                موضوع
              </p>
            </StaggerItem>

            <StaggerItem>
              <div className="mt-7 flex flex-col gap-3.5 sm:flex-row sm:items-start">
                <SallaButton course="a0" source="a0-hero" hero />
                <WhatsAppButton
                  message={site.whatsapp.msgCourseInquiry("التأسيس الصحيح A0")}
                  source="a0-hero"
                  variant="solid"
                >
                  استفسر بالواتساب
                </WhatsAppButton>
              </div>
            </StaggerItem>
          </Stagger>

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
                className="h-72 w-auto animate-breathe drop-shadow-2xl sm:h-96 lg:h-[26rem]"
              />
            </div>
            <div
              aria-hidden
              className="mx-auto -mt-3 h-5 w-3/5 rounded-[100%] bg-navy/10 blur-md"
            />
          </div>
        </div>
      </section>

      {/* ═══ §2 لمن هذه الدورة؟ ═══ */}
      <section className="py-20 lg:py-28">
        <div className="container-site">
          <Reveal>
            <SectionHeading title="هذه الدورة لك… إذا كنت" />
          </Reveal>
          <div className="mx-auto mt-12 grid max-w-4xl gap-5 sm:grid-cols-3">
            {audience.map((a, i) => (
              <Reveal key={a.title} delay={i * 100} className="h-full">
                <div className="card card-hover h-full p-7">
                  <span className="text-2xl" aria-hidden>
                    🔹
                  </span>
                  <h3 className="mt-3 text-lg font-black">{a.title}</h3>
                  <p className="mt-2 text-[15px] leading-8 text-ink/65">
                    {a.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={300}>
            <p className="mt-10 text-center text-lg font-black text-primary">
              هذه الدورة تبني لك أساسًا قويًا يسرّع اكتسابك للغة.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══ §3 تخيّل بعد الدورة ═══ */}
      <section className="relative overflow-hidden bg-section py-20 lg:py-28">
        <div
          aria-hidden
          className="absolute inset-0 bg-dots [mask-image:radial-gradient(50%_50%_at_50%_20%,black,transparent)]"
        />
        <div className="container-site relative grid items-center gap-12 lg:grid-cols-[1fr_auto]">
          <div>
            <Reveal>
              <SectionHeading align="start" title="تخيّل بعد الدورة…" />
            </Reveal>
            <div className="mt-8 space-y-4">
              {imagine.map((line, i) => (
                <Reveal key={line} delay={i * 90}>
                  <p className="card flex items-start gap-3.5 px-5 py-4 font-semibold leading-8 text-ink/80">
                    <ArrowMotif className="mt-2.5 h-2.5 w-3.5 shrink-0 text-accent" />
                    {line}
                  </p>
                </Reveal>
              ))}
            </div>
            <Reveal delay={400}>
              <p className="mt-8 text-2xl font-black text-primary">
                هنا نقطة بدايتك.
              </p>
            </Reveal>
          </div>
          <Reveal delay={200}>
            <div className="hidden justify-center lg:flex">
              <Mascot
                name="shab-front"
                size="section"
                className="h-80 w-auto animate-breathe drop-shadow-xl"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ §4 رحلتك في ٣ مراحل ═══ */}
      <section className="py-20 lg:py-28">
        <div className="container-site">
          <Reveal>
            <SectionHeading title="رحلتك في ٣ مراحل" />
          </Reveal>
          <div className="mx-auto mt-12 grid max-w-4xl gap-5 sm:grid-cols-3">
            {stages.map((s, i) => (
              <Reveal key={s.title} delay={i * 110} className="h-full">
                <div className="card card-hover relative h-full p-7 text-center">
                  <span
                    aria-hidden
                    className="absolute -top-4 end-4 text-[3.5rem] font-black leading-none text-primary/[0.06]"
                  >
                    {i + 1}
                  </span>
                  <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-primary-light text-3xl">
                    {s.emoji}
                  </span>
                  <h3 className="mt-4 text-xl font-black">{s.title}</h3>
                  <p className="mt-2 text-[15px] leading-8 text-ink/65">
                    {s.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* ↓ زر الشراء الثاني */}
          <Reveal delay={300}>
            <div className="mt-12 flex flex-col items-center gap-3">
              <SallaButton course="a0" source="a0-mid" showTrust={false} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ §5 اللي يفرّقنا عن أي دورة ثانية؟ ═══ */}
      <section className="bg-section py-20 lg:py-28">
        <div className="container-site">
          <Reveal>
            <SectionHeading title="اللي يفرّقنا عن أي دورة ثانية؟" />
          </Reveal>
          <div className="mx-auto mt-12 grid max-w-4xl gap-5 sm:grid-cols-2">
            {differentiators.map((d, i) => (
              <Reveal key={d.title} delay={i * 90} className="h-full">
                <div className="card card-hover h-full p-7">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-primary-light text-2xl">
                    {d.emoji}
                  </span>
                  <h3 className="mt-4 text-lg font-black">{d.title}</h3>
                  <p className="mt-2 text-[15px] leading-8 text-ink/65">
                    {d.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ §6 إيقاعك الأسبوعي ═══ */}
      <section className="py-20 lg:py-28">
        <div className="container-site">
          <Reveal>
            <SectionHeading
              title="إيقاع مرن… تدرس بجدية مع أريحية"
              sub="كل يومين نرسل لك درسين جديدين، ونذكّرك باستمرار عشان ما تتراكم. وأنت حر — تحلّهم بيوم واحد، أو توزّعهم على يومين. تدرس بجدية، مع مرونة وأريحية."
            />
          </Reveal>
          <div className="mx-auto mt-12 grid max-w-3xl gap-4">
            {rhythm.map((r, i) => (
              <Reveal key={r.text} delay={i * 100}>
                <div
                  className={`flex items-center gap-4 rounded-2xl p-5 font-bold ${
                    i === 2
                      ? "bg-accent/15 text-ink"
                      : "card"
                  }`}
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary-light text-2xl">
                    {r.emoji}
                  </span>
                  {r.text}
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={350}>
            <p className="mt-8 text-center font-black text-ink/70">
              ٦ دروس بالأسبوع · ١٥–٣٠ دقيقة باليوم · إيقاع يمشي مع حياتك، مو
              ضدها.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══ §7 وش يشمل اشتراكك؟ ═══ */}
      <section className="bg-section py-20 lg:py-28">
        <div className="container-site">
          <Reveal>
            <SectionHeading title="وش يشمل اشتراكك؟" />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {included.map((item, i) => (
              <Reveal
                key={item.title}
                delay={(i % 3) * 80}
                className="h-full lg:last:col-start-2"
              >
                <div className="card card-hover h-full p-6">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary-light text-2xl">
                    {item.emoji}
                  </span>
                  <h3 className="mt-3.5 font-black">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-7 text-ink/65">
                    {item.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ المنهج كامل — دائرة الأركان الأربعة ═══ */}
      <section className="relative overflow-hidden bg-section py-20 lg:py-28">
        <div className="container-site">
          <Reveal>
            <SectionHeading
              title="تبي تشوف المنهج كامل؟"
              sub="أربع دوائر معرفة حول أساس واحد ثابت — كل ركن يعرض شيئاً مما بداخله."
            />
          </Reveal>
          <Reveal delay={150}>
            <div className="mt-12">
              <CurriculumOrbit />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ CTA at curriculum-intent peak (accordion removed) ═══ */}
      <section className="py-20 lg:py-28">
        <div className="container-site">
          <Reveal delay={200}>
            <div className="flex flex-col items-center gap-2.5">
              <p className="font-bold text-ink/60">
                شفت المنهج كامل؟ خذ خطوتك.
              </p>
              <SallaButton course="a0" source="a0-curriculum" showTrust={false} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ سعر وتفاصيل الاشتراك ═══ */}
      <section className="py-20 lg:py-28">
        <div className="container-site">
          <Reveal>
            <div className="card mx-auto max-w-xl overflow-hidden">
              <div className="bg-brand-gradient p-7 text-center">
                <p className="text-sm font-black uppercase tracking-wide text-white/70">
                  الاشتراك في دورة A0
                </p>
                <div className="mt-3 flex justify-center [&_.bg-section]:bg-white/10 [&_.text-ink\/55]:text-white/80">
                  <PriceTag course="a0" size="lg" />
                </div>
                <p className="mt-2 text-sm font-bold text-white/70">
                  دفعة واحدة — تشمل كل اللي فوق
                </p>
              </div>
              <div className="p-7">
                <ul className="space-y-3">
                  {[
                    ["المدة", "4 أسابيع دروس + أسبوع تطبيق مباشر"],
                    ["الدروس", "26 درس فيديو مسجّل"],
                    ["وقتك اليومي", "١٥–٣٠ دقيقة"],
                    ["المجموعة المباشرة", "من 1 إلى 7 متعلمين"],
                    ["الشهادة", "بعد اجتياز الاختبار النهائي 🏆"],
                  ].map(([k, v]) => (
                    <li
                      key={k}
                      className="flex items-start justify-between gap-4 border-b border-ink/5 pb-3 last:border-0 last:pb-0"
                    >
                      <span className="shrink-0 font-black text-ink/50">
                        {k}
                      </span>
                      <span className="text-end font-bold">{v}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-col gap-3">
                  <SallaButton
                    course="a0"
                    source="a0-pricing"
                    hero
                    className="[&_a]:w-full [&_span]:w-full"
                  />
                  <WhatsAppButton
                    message={site.whatsapp.msgCourseInquiry("التأسيس الصحيح A0")}
                    source="a0-pricing"
                    variant="link"
                    className="justify-center"
                  >
                    عندك سؤال عن السعر أو الدفعات؟ كلمنا
                  </WhatsAppButton>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ §9 وعشان نضبط التوقعات ═══ */}
      <section className="bg-section py-20 lg:py-28">
        <div className="container-site grid items-center gap-12 lg:grid-cols-[1fr_auto]">
          <Reveal>
            <div className="rounded-[2rem] border-2 border-primary/10 bg-white p-8 sm:p-10">
              <SectionHeading align="start" title="وعشان نضبط التوقعات" />
              <p className="mt-6 text-lg font-black leading-9">
                هذي الدورة تأسيس — هي أول خطوة صحيحة في رحلة التعلّم، مو نهاية
                الطريق.
              </p>
              <p className="mt-4 leading-9 text-ink/70">
                ما بنوعدك إنك بتتكلم بطلاقة أو تكتب مقالات بعدها مباشرة — هذي
                المهارات تجي عبر التراكم والتقدّم بالمستويات الأعلى.{" "}
                <span className="font-black text-primary">
                  اللي بنعطيك إياه هنا أهم: أساس متين يسرّع اكتسابك للغة.
                </span>
              </p>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div className="hidden justify-center lg:flex">
              <Mascot
                name="father-front"
                size="section"
                className="h-72 w-auto animate-breathe drop-shadow-xl"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ §10 الدعوة الأخيرة ═══ */}
      <section className="container-site pb-4 pt-16">
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
              جاهز تبني أساسك الصحيح؟
            </h2>
            <p className="mx-auto mt-4 max-w-[42ch] text-white/80 sm:text-lg">
              ابدأ اليوم، وخلّ إنجليزيتك تنطلق من أساس يثبت معك.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <SallaButton course="a0" source="a0-final" hero showTrust={false} />
              <WhatsAppButton
                message={site.whatsapp.msgCourseInquiry("التأسيس الصحيح A0")}
                source="a0-final"
                variant="solid"
              >
                استفسر بالواتساب
              </WhatsAppButton>
            </div>
            <p className="mt-6 text-sm font-bold text-white/75">
              متاحة الآن — بادر بالتسجيل.
              <br />
              الأماكن محدودة، والدورة تُفتح بدفعات خلال السنة.
            </p>
          </div>
        </Reveal>
      </section>

      <StickyBuyBar course="a0" courseLabel="التأسيس الصحيح A0" />
    </>
  );
}
