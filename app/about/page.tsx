import type { Metadata } from "next";
import Link from "next/link";
import { Mascot, type CharacterName } from "@/components/Mascot";
import { SectionHeading } from "@/components/SectionHeading";
import { ArrowMotif } from "@/components/ArrowMotif";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { StatStrip } from "@/components/StatStrip";
import { Reveal } from "@/components/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Underline } from "@/components/motion/Underline";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "ليه زد لفل؟ — مبنية حول احتياجاتك",
  description:
    "أغلب الدورات صُنعت عشان تنباع — زد لفل صُنعت حول اللي تحتاجه فعلًا: محتوى يختصر وقتك، ومتابعة تخليك تكمّل. +5,000 مستفيد.",
};

const family: { name: CharacterName; label: string; line: string }[] = [
  { name: "shab-front", label: "الشاب", line: "طموح وما يوقف" },
  { name: "father-front", label: "الأب", line: "يتعلم لشغله" },
  { name: "mother-front", label: "الأم", line: "تتعلم لنفسها ولبيتها" },
  { name: "girl-front", label: "البنت", line: "تبدأ من بدري" },
  { name: "grandpa-front", label: "الجد", line: "ما فات الوقت أبدًا" },
  { name: "grandma-front", label: "الجدة", line: "وتقدر تبدأ اليوم" },
];

const beliefs = [
  {
    title: "نختصر — ما نحشو",
    desc: "نعلّمك الأكثر استخدامًا فعلًا: أهم الكلمات، أهم القواعد، أهم المواقف. وقتك أغلى من المحتوى الزائد.",
  },
  {
    title: "النظام قبل الحماس",
    desc: "الحماس يخلص بعد أسبوع — النظام يكمّل معك: فتح تسلسلي، جدول واضح، وجمعة راحة 🕌.",
  },
  {
    title: "ما تمشي لحالك",
    desc: "مرشد يتابعك، وقروب تسأل فيه، وأسبوع مكثف مباشر — التعلم مع ناس أثبت وأمتع.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ═══ Hero ═══ */}
      <section className="relative overflow-hidden bg-hero-glow">
        <div
          aria-hidden
          className="absolute inset-0 bg-dots [mask-image:radial-gradient(60%_55%_at_50%_0%,black,transparent)]"
        />
        <div
          aria-hidden
          className="orb orb-blue absolute -top-24 start-[-8rem] h-96 w-96"
        />
        <Stagger className="container-site relative flex flex-col items-center gap-6 py-16 text-center lg:py-20">
          <StaggerItem>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-white px-4 py-1.5 text-sm font-black text-primary shadow-soft">
              <ArrowMotif className="h-2.5 w-3.5 text-accent" />
              ليه زد لفل؟
            </span>
          </StaggerItem>
          <StaggerItem>
            <h1 className="max-w-[18ch] text-[clamp(2.1rem,5.5vw,3.4rem)] font-black leading-[1.35]">
              أغلب الدورات صُنعت عشان تنباع —{" "}
              <Underline className="text-primary">
                زد لفل صُنعت حولك أنت
              </Underline>
            </h1>
            <p className="mx-auto mt-5 max-w-[52ch] text-lg leading-9 text-ink/65">
              بدأنا من سؤال واحد: ليه أغلب الناس ما يكمّلون كورسات الإنجليزية؟
              والجواب صار منهجيتنا: محتوى يختصر وقتك، ونظام يمنعك من الانسحاب،
              ومتابعة تشجعك تستمر.
            </p>
          </StaggerItem>
          <StaggerItem>
            <div className="flex flex-col items-center justify-center gap-3.5 sm:flex-row">
              <Link href="/test" className="btn btn-primary text-lg">
                جرّبنا — اختبر مستواك مجانًا
              </Link>
              <Link href="/courses" className="btn btn-outline">
                شوف الدورات
              </Link>
            </div>
          </StaggerItem>
        </Stagger>
      </section>

      {/* ═══ Stats ═══ */}
      <StatStrip
        items={[
          { value: "+5,000", label: "مستفيد من الأكاديمية" },
          { value: "+3,700", label: "كلمة في مناهجنا" },
          { value: "13", label: "دورة مدرجة A0→B2" },
          { value: "🎓", label: "شهادة لكل مستوى" },
        ]}
      />

      {/* ═══ Beliefs ═══ */}
      <section className="py-20 lg:py-28">
        <div className="container-site">
          <Reveal>
            <SectionHeading
              eyebrow="منهجيتنا"
              title="ثلاث قناعات نشتغل عليها"
            />
          </Reveal>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {beliefs.map((b, i) => (
              <Reveal key={b.title} delay={i * 100} className="h-full">
                <div className="card card-hover h-full p-8">
                  <ArrowMotif className="h-3.5 w-5 text-accent" />
                  <h3 className="mt-4 text-xl font-black">{b.title}</h3>
                  <p className="mt-2.5 leading-8 text-ink/65">{b.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ The family ═══ */}
      <section className="relative overflow-hidden bg-brand-gradient py-20 lg:py-28">
        <div
          aria-hidden
          className="absolute inset-0 bg-dots-light [mask-image:radial-gradient(60%_50%_at_50%_0%,black,transparent)]"
        />
        <div className="container-site relative">
          <Reveal>
            <SectionHeading
              tone="dark"
              eyebrow="عائلة زد لفل"
              title="مهما كان مستواك… وعمرك"
              sub="عائلة كاملة تتعلم معنا — من البنت الصغيرة إلى الجد والجدة"
            />
          </Reveal>
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {family.map((f, i) => (
              <Reveal key={f.name} delay={i * 70} className="h-full">
                <div className="flex h-full flex-col items-center rounded-3xl border border-white/15 bg-white/[0.07] p-5 text-center lg:backdrop-blur-sm">
                  <Mascot
                    name={f.name}
                    size="card"
                    className="h-28 w-auto drop-shadow-lg"
                  />
                  <p className="mt-3 font-black text-white">{f.label}</p>
                  <p className="mt-0.5 text-xs font-bold text-white/60">
                    {f.line}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="container-site pb-4 pt-16">
        <Reveal>
          <div className="card flex flex-col items-center gap-6 p-8 text-center sm:p-10 lg:flex-row lg:justify-between lg:text-start">
            <div>
              <h2 className="text-2xl font-black">صرنا +5,000 — وباقي مكانك</h2>
              <p className="mt-1.5 text-ink/60">
                ابدأ بالاختبار المجاني، أو كلمنا مباشرة ونساعدك تختار
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/test" className="btn btn-primary">
                اختبر مستواك
              </Link>
              <WhatsAppButton
                message={site.whatsapp.msgGeneral}
                source="about"
              >
                كلمنا واتساب
              </WhatsAppButton>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
