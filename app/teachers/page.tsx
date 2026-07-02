import type { Metadata } from "next";
import { GraduationCap, Star } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { ArrowMotif } from "@/components/ArrowMotif";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Reveal } from "@/components/Reveal";
import { DevTodoBadge } from "@/components/DevTodoBadge";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "المعلمون — فريق زد لفل",
  description:
    "تعرف على فريق زد لفل التعليمي — ومنهم معلم اللهجة الأمريكية الذي لغته الأم الإنجليزية.",
};

/**
 * Teachers page — real bios/photos pending from the academy (build spec §14.7).
 * NEVER invent teacher names or credentials; placeholders are clearly marked.
 * TODO_TEACHER_BIOS
 */
export default function TeachersPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-hero-glow">
        <div
          aria-hidden
          className="absolute inset-0 bg-dots [mask-image:radial-gradient(60%_55%_at_50%_0%,black,transparent)]"
        />
        <div className="container-site relative py-16 text-center lg:py-20">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-white px-4 py-1.5 text-sm font-black text-primary shadow-soft">
              <ArrowMotif className="h-2.5 w-3.5 text-accent" />
              فريقنا
            </span>
            <h1 className="mt-4 text-[clamp(2.1rem,5.5vw,3.4rem)] font-black leading-[1.3]">
              المعلمون 👨‍🏫
            </h1>
            <p className="mx-auto mt-4 max-w-[44ch] text-lg leading-9 text-ink/65">
              يشرحون بالعربي ويعرفون وش يصعّب علينا — تعرّف عليهم قريبًا.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-section py-16 lg:py-24">
        <div className="container-site">
          <div className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-2">
            <Reveal className="h-full">
              <article className="card relative h-full p-8 text-center">
                <DevTodoBadge label="TEACHER_BIOS" />
                <span className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-primary-light">
                  <GraduationCap className="h-11 w-11 text-primary" aria-hidden />
                </span>
                <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-accent px-3.5 py-1 text-xs font-black text-ink">
                  <Star className="h-3.5 w-3.5" aria-hidden />
                  Native Speaker
                </span>
                <h2 className="mt-3 text-xl font-black">
                  معلم اللهجة الأمريكية
                </h2>
                <p className="mt-2 text-sm leading-7 text-ink/65">
                  لغته الأم الإنجليزية — يقود دورة اللهجة الأمريكية القادمة.
                  التعريف الكامل قريبًا.
                </p>
              </article>
            </Reveal>
            <Reveal delay={120} className="h-full">
              <article className="card relative h-full p-8 text-center">
                <DevTodoBadge label="TEACHER_BIOS" />
                <span className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-primary-light">
                  <GraduationCap className="h-11 w-11 text-primary" aria-hidden />
                </span>
                <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-primary-light px-3.5 py-1 text-xs font-black text-primary">
                  بالعربي
                </span>
                <h2 className="mt-3 text-xl font-black">فريق زد لفل التعليمي</h2>
                <p className="mt-2 text-sm leading-7 text-ink/65">
                  اللي بنوا منهجية التأسيس والمستويات ويتابعونك يوم بيوم —
                  تعريفهم وصورهم قريبًا.
                </p>
              </article>
            </Reveal>
          </div>

          <Reveal delay={220}>
            <div className="mx-auto mt-10 max-w-xl text-center">
              <p className="font-bold text-ink/60">
                عندك سؤال لأحد المعلمين قبل ما تشترك؟
              </p>
              <div className="mt-4 flex justify-center">
                <WhatsAppButton
                  message={site.whatsapp.msgGeneral}
                  source="teachers"
                >
                  اسألنا على الواتساب
                </WhatsAppButton>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
