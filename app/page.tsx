import Link from "next/link";
import { Mascot } from "@/components/Mascot";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { LevelChip, type Level } from "@/components/LevelChip";
import { ArrowMotif } from "@/components/ArrowMotif";
import { site } from "@/config/site";

/**
 * M1 placeholder homepage — hero + level chips only.
 * The full homepage (pillars, level ladder, courses grid, testimonials)
 * is milestone M2 per CONTENT.md §12.
 */
export default function HomePage() {
  const levels: Level[] = ["A0", "A1", "A2", "B1", "B2"];

  return (
    <section className="container-site grid items-center gap-10 py-12 md:grid-cols-2 md:py-20">
      <div>
        <span className="inline-flex items-center gap-1.5 text-sm font-bold text-primary">
          <ArrowMotif className="h-3 w-4 text-accent" />
          {site.nameAr}
        </span>

        <h1 className="mt-3 text-3xl font-black leading-snug sm:text-4xl lg:text-5xl">
          فرصتك الذهبية لإتقان الإنجليزية مهما كان مستواك
        </h1>

        <p className="mt-4 text-lg font-semibold text-ink/80">
          +{site.stats.beneficiaries.replace("+", "")} مستفيد من أكاديمية زد لفل{" "}
          <span className="font-black text-primary">ZEDLEVEL</span>
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link
            href="/test"
            className="inline-flex min-h-12 items-center justify-center rounded-xl bg-primary px-6 py-3.5 text-lg font-black text-white transition-colors hover:bg-primary-dark"
          >
            حدد مستواك — ابدأ الاختبار المجاني
          </Link>
          <WhatsAppButton message={site.whatsapp.msgGeneral} source="hero">
            تقييم سريع بالواتساب
          </WhatsAppButton>
        </div>

        <p className="mt-3 text-sm text-ink/60">
          مجاني لفترة محدودة — احجز موعدك الآن
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-2.5">
          {levels.map((l) => (
            <LevelChip key={l} level={l} />
          ))}
          <LevelChip level="C1" soon />
        </div>
      </div>

      <div className="flex justify-center md:justify-start">
        <Mascot
          name="shab-front"
          size="hero"
          priority
          className="h-72 w-auto sm:h-96 lg:h-[28rem]"
        />
      </div>
    </section>
  );
}
