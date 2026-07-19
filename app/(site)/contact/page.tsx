import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MessageCircleQuestion, Clock } from "lucide-react";
import { Mascot } from "@/components/Mascot";
import { ArrowMotif } from "@/components/ArrowMotif";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Reveal } from "@/components/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Underline } from "@/components/motion/Underline";
import { site, isTodo } from "@/config/site";

export const metadata: Metadata = {
  title: "تواصل معنا — نرد عليك بأسرع وقت",
  description:
    "تواصل مع فريق زد لفل عبر الواتساب — استفسارات الدورات، تحديد المستوى، وكل شي. نرد عليك بأسرع وقت.",
};

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-hero-glow">
        <div
          aria-hidden
          className="absolute inset-0 bg-dots [mask-image:radial-gradient(60%_55%_at_50%_0%,black,transparent)]"
        />
        <div
          aria-hidden
          className="orb orb-blue absolute -top-24 end-[-8rem] h-96 w-96"
        />
        <Stagger className="container-site relative flex flex-col items-center gap-6 py-16 text-center lg:py-20">
          <StaggerItem>
            {/* the team — the guy (shab) centered & larger, flanked by others */}
            <div className="flex items-end justify-center gap-1 sm:gap-3">
              <Mascot
                name="grandma-front"
                size="section"
                className="h-28 w-auto animate-breathe drop-shadow-xl sm:h-36"
              />
              <Mascot
                name="shab-front"
                size="section"
                priority
                className="z-10 h-44 w-auto animate-breathe drop-shadow-2xl sm:h-56"
              />
              <Mascot
                name="grandpa-front"
                size="section"
                className="h-28 w-auto animate-breathe drop-shadow-xl sm:h-36"
              />
            </div>
          </StaggerItem>
          <StaggerItem>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-white px-4 py-1.5 text-sm font-black text-primary shadow-soft">
              <ArrowMotif className="h-2.5 w-3.5 text-accent" />
              تواصل معنا
            </span>
          </StaggerItem>
          <StaggerItem>
            <h1 className="text-[clamp(2.1rem,5.5vw,3.4rem)] font-black leading-[1.3]">
              نحن هنا بانتظارك{" "}
              <Underline className="text-primary">وبنرد عليك</Underline>
            </h1>
            <p className="mx-auto mt-4 max-w-[40ch] text-lg leading-9 text-ink/65">
              فريقنا ينتظر سؤالك، لا تردد بأي سؤال.
            </p>
          </StaggerItem>
          <StaggerItem>
            <WhatsAppButton
              message={site.whatsapp.msgGeneral}
              source="contact"
              variant="solid"
              className="text-lg"
            >
              راسلنا على واتساب
            </WhatsAppButton>
          </StaggerItem>
          {!isTodo(site.social.email) && (
            <StaggerItem>
              <a
                href={`mailto:${site.social.email}`}
                className="inline-flex items-center gap-2 font-bold text-ink/60 hover:text-primary"
              >
                <Mail className="h-4 w-4" aria-hidden />
                {site.social.email}
              </a>
            </StaggerItem>
          )}
        </Stagger>
      </section>

      <section className="bg-section py-16 lg:py-20">
        <div className="container-site">
          <div className="mx-auto grid max-w-3xl gap-5 sm:grid-cols-2">
            <Reveal className="h-full">
              <Link
                href="/test"
                className="card card-hover flex h-full flex-col items-center gap-3 p-7 text-center"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white shadow-glow-blue">
                  <MessageCircleQuestion className="h-6 w-6" aria-hidden />
                </span>
                <p className="font-black">مو متأكد من مستواك؟</p>
                <p className="text-sm text-ink/60">
                  الاختبار المجاني يجاوبك خلال 5 دقائق
                </p>
              </Link>
            </Reveal>
            <Reveal delay={100} className="h-full">
              <div className="card flex h-full flex-col items-center gap-3 p-7 text-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-ink shadow-glow-accent">
                  <Clock className="h-6 w-6" aria-hidden />
                </span>
                <p className="font-black">نرد بأسرع وقت 🙌</p>
                <p className="text-sm text-ink/60">
                  رسالتك تهمنا — فريقنا يتابع الواتساب باستمرار
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
