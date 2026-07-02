import type { Metadata } from "next";
import Link from "next/link";
import { Bot, GraduationCap, Zap, Clock, MessageSquareText, BadgeCheck } from "lucide-react";
import { Mascot } from "@/components/Mascot";
import { SectionHeading } from "@/components/SectionHeading";
import { ArrowMotif } from "@/components/ArrowMotif";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Reveal } from "@/components/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Underline } from "@/components/motion/Underline";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "اختبار المحادثة — AI أو جلسة مباشرة",
  description:
    "قِس نطقك ومحادثتك بالإنجليزية: تقييم فوري بالذكاء الاصطناعي في أي وقت، أو جلسة تقييم مباشرة مع معلم — مع توصية بالمسار المناسب.",
};

/**
 * Speaking Test (build spec §7 + CONTENT.md §10B).
 * Price-toggle-ready: pass `price` to a card to show it — absent = "مجاني".
 * Booking runs on WhatsApp deep links at launch.
 */
const options: {
  icon: typeof Bot;
  title: string;
  desc: string;
  features: { icon: typeof Zap; text: string }[];
  price?: string;
  badge?: string;
  message: string;
  cta: string;
  featured?: boolean;
}[] = [
  {
    icon: Bot,
    title: "تقييم فوري بالذكاء الاصطناعي",
    desc: "تكلم، والنظام يقيّم نطقك ومحادثتك على طول",
    features: [
      { icon: Clock, text: "متاح في أي وقت — 24/7" },
      { icon: Zap, text: "نتيجة فورية" },
      { icon: MessageSquareText, text: "تدرّب وأعد كل ما تبغى" },
    ],
    message: site.whatsapp.msgSpeakingAI,
    cta: "جرّب التقييم الفوري",
    featured: true,
  },
  {
    icon: GraduationCap,
    title: "جلسة مباشرة مع معلم",
    desc: "تقييم شخصي دقيق لنطقك ومحادثتك — للمتقدمين",
    features: [
      { icon: BadgeCheck, text: "تقييم بشري مفصّل" },
      { icon: MessageSquareText, text: "ملاحظات مخصصة لك" },
      { icon: Zap, text: "توصية مباشرة بمسارك" },
    ],
    badge: "للمتقدمين",
    message: site.whatsapp.msgSpeakingHuman,
    cta: "احجز جلستك",
  },
];

export default function SpeakingTestPage() {
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
            <Mascot
              name="girl-side"
              size="section"
              priority
              className="h-48 w-auto animate-breathe drop-shadow-xl sm:h-60"
            />
          </StaggerItem>
          <StaggerItem>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-white px-4 py-1.5 text-sm font-black text-primary shadow-soft">
              <ArrowMotif className="h-2.5 w-3.5 text-accent" />
              اختبار المحادثة 🎤
            </span>
          </StaggerItem>
          <StaggerItem>
            <h1 className="text-[clamp(2.1rem,5.5vw,3.4rem)] font-black leading-[1.3]">
              اختبر <Underline className="text-primary">نطقك ومحادثتك</Underline>
            </h1>
            <p className="mx-auto mt-4 max-w-[48ch] text-lg leading-9 text-ink/65">
              اختبار المستوى يقيس قواعدك ومفرداتك — هذا يقيس لسانك. اختر
              طريقتك: ذكاء اصطناعي فوري، أو معلم يسمعك مباشرة.
            </p>
          </StaggerItem>
        </Stagger>
      </section>

      {/* ═══ The two options ═══ */}
      <section className="bg-section py-16 lg:py-24">
        <div className="container-site">
          <div className="mx-auto grid max-w-4xl gap-6 lg:grid-cols-2">
            {options.map((o, i) => (
              <Reveal key={o.title} delay={i * 120} className="h-full">
                <article
                  className={`card card-hover flex h-full flex-col p-8 ${
                    o.featured ? "ring-2 ring-primary/25" : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <span
                      className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl ${
                        o.featured
                          ? "bg-primary text-white shadow-glow-blue"
                          : "bg-accent text-ink shadow-glow-accent"
                      }`}
                    >
                      <o.icon className="h-7 w-7" aria-hidden />
                    </span>
                    <div className="flex flex-col items-end gap-1.5">
                      <span className="rounded-full bg-primary-light px-3.5 py-1 text-sm font-black text-primary">
                        {o.price ?? "مجاني"}
                      </span>
                      {o.badge && (
                        <span className="rounded-full bg-section px-3 py-0.5 text-xs font-bold text-ink/60">
                          {o.badge}
                        </span>
                      )}
                    </div>
                  </div>

                  <h2 className="mt-5 text-xl font-black">{o.title}</h2>
                  <p className="mt-1.5 leading-8 text-ink/65">{o.desc}</p>

                  <ul className="mt-5 flex-1 space-y-3">
                    {o.features.map((f) => (
                      <li
                        key={f.text}
                        className="flex items-center gap-2.5 text-sm font-bold text-ink/70"
                      >
                        <f.icon className="h-4.5 w-4.5 shrink-0 text-primary" aria-hidden />
                        {f.text}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-7">
                    <WhatsAppButton
                      message={o.message}
                      source={`speaking-${o.featured ? "ai" : "human"}`}
                      variant="solid"
                      className="!w-full"
                    >
                      {o.cta}
                    </WhatsAppButton>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={280}>
            <div className="mx-auto mt-12 max-w-3xl">
              <div className="card grid gap-4 p-7 sm:grid-cols-3">
                {[
                  { n: "1", t: "تتكلم", d: "تسجل صوتك أو تتحدث مع المعلم" },
                  { n: "2", t: "تنقيّم", d: "نطق، طلاقة، ومفردات محادثتك" },
                  { n: "3", t: "تنطلق", d: "توصية مباشرة بمسارك المناسب" },
                ].map((s) => (
                  <div key={s.n} className="text-center">
                    <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-accent font-black text-ink">
                      {s.n}
                    </span>
                    <p className="mt-2 font-black">{s.t}</p>
                    <p className="mt-1 text-sm text-ink/60">{s.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={360}>
            <p className="mt-10 text-center font-bold text-ink/55">
              تبغى تقيس قواعدك ومفرداتك أولًا؟{" "}
              <Link href="/test" className="font-black text-primary hover:underline">
                اختبار المستوى المجاني ←
              </Link>
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
