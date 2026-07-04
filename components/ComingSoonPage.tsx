import Link from "next/link";
import { Mascot, type CharacterName } from "./Mascot";
import { ArrowMotif } from "./ArrowMotif";
import { WhatsAppButton } from "./WhatsAppButton";
import { SectionHeading } from "./SectionHeading";
import { Stagger, StaggerItem } from "./motion/Stagger";
import { Reveal } from "./Reveal";
import { site } from "@/config/site";

/**
 * Full coming-soon teaser page (build spec §7): hero + what-to-expect +
 * "نبّهني على الواتساب" lead capture. Grows the WhatsApp list pre-launch.
 */
export function ComingSoonPage({
  badge,
  title,
  sub,
  mascot,
  notifyCourse,
  expectations,
}: {
  badge?: string;
  title: string;
  sub: string;
  mascot: CharacterName;
  notifyCourse: string;
  expectations: string[];
}) {
  return (
    <>
      {/* Hero */}
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
            <Mascot
              name={mascot}
              size="section"
              priority
              className="h-52 w-auto animate-breathe drop-shadow-xl sm:h-64"
            />
          </StaggerItem>
          <StaggerItem>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-white px-4 py-1.5 text-sm font-black text-primary shadow-soft">
                <ArrowMotif className="h-2.5 w-3.5 text-accent" />
                قريبًا في زد لفل
              </span>
              {badge && (
                <span className="rounded-full bg-accent px-4 py-1.5 text-sm font-black text-ink shadow-glow-accent">
                  {badge}
                </span>
              )}
            </div>
          </StaggerItem>
          <StaggerItem>
            <h1 className="text-[clamp(2.1rem,5.5vw,3.4rem)] font-black leading-[1.3]">
              {title}
            </h1>
            <p className="mx-auto mt-4 max-w-[50ch] text-lg leading-9 text-ink/65">
              {sub}
            </p>
          </StaggerItem>
          <StaggerItem>
            <div className="flex flex-col items-center gap-2.5">
              <WhatsAppButton
                message={site.whatsapp.msgNotify(notifyCourse)}
                source={`teaser-${notifyCourse}`}
                event="notify_click"
                params={{ course: notifyCourse }}
                variant="solid"
                className="text-lg"
              >
                نبّهني عند الافتتاح
              </WhatsAppButton>
              <p className="text-sm font-bold text-ink/50">
                أول ما يفتح التسجيل — رسالتنا توصلك مباشرة
              </p>
            </div>
          </StaggerItem>
        </Stagger>
      </section>

      {/* What to expect */}
      <section className="bg-section py-16 lg:py-24">
        <div className="container-site">
          <Reveal>
            <SectionHeading eyebrow="وش تتوقع؟" title="اللي نجهزه لك" />
          </Reveal>
          <div className="mx-auto mt-10 grid max-w-3xl gap-3.5">
            {expectations.map((e, i) => (
              <Reveal key={e} delay={i * 80}>
                <div className="card flex items-center gap-3.5 px-5 py-4 font-bold">
                  <ArrowMotif className="h-3 w-4 shrink-0 text-accent" />
                  {e}
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={300}>
            <p className="mt-10 text-center">
              <Link
                href="/courses"
                className="font-black text-primary hover:underline"
              >
                تصفح الدورات المتاحة الآن ←
              </Link>
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
