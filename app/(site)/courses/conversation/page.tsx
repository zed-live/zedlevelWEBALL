import type { Metadata } from "next";
import Link from "next/link";
import { ArrowMotif } from "@/components/ArrowMotif";
import { ConversationCard } from "@/components/ConversationCard";
import { Reveal } from "@/components/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Underline } from "@/components/motion/Underline";

export const metadata: Metadata = {
  title: "دورة المحادثة — ممارسة مباشرة مع مدرسين أجانب",
  description:
    "جلسات محادثة مباشرة مع معلم ومجموعة صغيرة — حصتان أسبوعيًا، سيناريوهات من حياتك، وتركيز على النطق والطلاقة. متاحة الآن باشتراك شهري.",
};

export default function ConversationPage() {
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
          className="orb orb-blue absolute -top-24 end-[-8rem] h-96 w-96"
        />
        <Stagger className="container-site relative flex flex-col items-center gap-5 py-14 text-center lg:py-20">
          <StaggerItem>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-white px-4 py-1.5 text-sm font-black text-primary shadow-soft">
              <ArrowMotif className="h-2.5 w-3.5 text-accent" />
              دورة المحادثة · متاحة الآن
            </span>
          </StaggerItem>
          <StaggerItem>
            <h1 className="text-[clamp(2.1rem,5.5vw,3.4rem)] font-black leading-[1.3]">
              تمارس اللغة بصوتك{" "}
              <Underline className="text-primary">وتتكلم بثقة</Underline>
            </h1>
          </StaggerItem>
          <StaggerItem>
            <p className="mx-auto max-w-[44ch] text-lg font-semibold leading-9 text-ink/70">
              جلسات مباشرة مع معلم ومجموعة صغيرة، تتدرّب على مواقف من حياتك
              اليومية وتطوّر محادثتك درجة درجة.
            </p>
          </StaggerItem>
        </Stagger>
      </section>

      {/* ═══ the details card ═══ */}
      <section className="py-16 lg:py-24">
        <div className="container-site">
          <Reveal>
            <ConversationCard />
          </Reveal>
        </div>
      </section>

      {/* ═══ level-check nudge ═══ */}
      <section className="container-site pb-20">
        <Reveal>
          <div className="flex flex-col items-center gap-3 text-center">
            <p className="font-bold text-ink/60">
              مو متأكد من مستواك؟ حدّده الآن ونضمّك لمجموعة تناسبك
            </p>
            <Link href="/test" className="btn btn-primary">
              اختبر مستواك مجانًا
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
