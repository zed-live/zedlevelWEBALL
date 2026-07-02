import type { Metadata } from "next";
import Link from "next/link";
import { SpeakingFlow } from "@/components/speaking/SpeakingFlow";
import { ArrowMotif } from "@/components/ArrowMotif";

export const metadata: Metadata = {
  title: "اختبار المحادثة — سجّل صوتك واستلم تقييمك",
  description:
    "اختر مستواك، اقرأ النص بصوتك، وأرسل تسجيلك عبر الواتساب — يستمع له مقيّمنا ويرد عليك بمستواك والتوصية المناسبة.",
};

/**
 * Speaking test — immersive dark experience (from the academy's own design,
 * rebuilt in brand). The flow funnels the voice note to WhatsApp = the lead.
 */
export default function SpeakingTestPage() {
  return (
    <section className="relative overflow-hidden bg-brand-gradient">
      <div
        aria-hidden
        className="absolute inset-0 bg-dots-light [mask-image:radial-gradient(70%_60%_at_50%_30%,black,transparent)]"
      />
      <div
        aria-hidden
        className="orb orb-accent absolute -top-24 end-[-8rem] h-96 w-96 opacity-60"
      />
      <ArrowMotif
        aria-hidden
        className="absolute -bottom-10 start-[-3rem] h-56 w-80 rotate-12 text-white/[0.04]"
      />
      <div className="container-site relative flex min-h-[calc(100dvh-4.25rem)] flex-col items-center justify-center gap-6 py-12">
        <SpeakingFlow />
        <p className="relative z-10 text-center text-sm font-bold text-white/55">
          تبغى تقيس قواعدك ومفرداتك؟{" "}
          <Link href="/test" className="font-black text-accent hover:underline">
            اختبار المستوى المجاني ←
          </Link>
        </p>
      </div>
    </section>
  );
}
