import type { Metadata } from "next";
import Link from "next/link";
import { ArrowMotif } from "@/components/ArrowMotif";
import { ConversationCard } from "@/components/ConversationCard";
import { SectionHeading } from "@/components/SectionHeading";
import { FaqAccordion, type FaqItem } from "@/components/FaqAccordion";
import { faqJsonLd } from "@/lib/faqSchema";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Reveal } from "@/components/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Underline } from "@/components/motion/Underline";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "دورة المحادثة — ممارسة مباشرة مع مدرسين أجانب",
  description:
    "جلسات محادثة مباشرة مع معلم ومجموعة صغيرة — حصتان أسبوعيًا، سيناريوهات من حياتك، وتركيز على النطق والطلاقة. متاحة الآن باشتراك شهري.",
};

/* عندك سؤال؟ عندنا جواب */
const faq: FaqItem[] = [
  {
    q: "أخاف أغلط وأستحي أتكلم قدام ناس، كيف أتجاوزها؟",
    a: "طبيعي، وأغلب المنضمين جو بنفس الشعور. الكل بمجموعتك قريبين من مستواك وجايين لنفس السبب، والمعلم متعوّد يتعامل مع التوتر ويعطيك مساحتك. بعد أول حصتين يبدأ الحاجز يروح.",
  },
  {
    q: "كيف تحددون أي مجموعة أنضم لها؟",
    a: "تسوّي اختبار المستوى المجاني، وعلى أساسه نضمّك لمجموعة على قد مستواك بالضبط، فما تحس إنك أقل ولا أعلى من الباقين.",
  },
  {
    q: "متى تكون الحصص؟",
    a: "المواعيد تُحدّد لكل مجموعة عند فتحها، وبتحصل مواعيد تناسبك بإذن الله. تواصل معنا على الواتساب ونعطيك مواعيد المجموعات المتاحة الآن.",
  },
  {
    q: "هل أقدر أزيد عدد الحصص؟",
    a: "إي، تقدر تضيف حصص حسب حاجتك: الحصة الجماعية الإضافية بـ٣٣ ريال، والفردية مع معلم لك وحدك بـ١٠٠ ريال، مفيدة لو حاب تكثّف ممارستك أو تجهّز لموقف معين زي مقابلة أو سفر. كلّمنا على الواتساب ونرتّبها لك.",
  },
  {
    q: "كم أحتاج شهر عشان أشوف فرق؟",
    a: "يعتمد على مستواك والتزامك بالممارسة بين الحصص، بس الأغلب بيحسون بفرق واضح بالثقة من الشهر الأول، والطلاقة تتراكم شهر بعد شهر.",
  },
  {
    q: "كم السعر وكيف الاشتراك؟",
    a: "٢٤٩ ريال بالشهر، اشتراك شهري متجدد عبر سلة بدفع آمن (مدى وSTC Pay)، أو تواصل واتساب ويخلّصونك.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "دورة المحادثة — ممارسة مباشرة مع مدرسين أجانب — زد لفل",
  description:
    "جلسات محادثة مباشرة مع معلم ومجموعة صغيرة — حصتان أسبوعيًا، سيناريوهات من حياتك، وتركيز على النطق والطلاقة. متاحة الآن باشتراك شهري.",
  provider: {
    "@type": "Organization",
    name: "ZEDLEVEL — أكاديمية زد لفل لتعليم الإنجليزية",
  },
  inLanguage: "ar",
  teaches: "المحادثة باللغة الإنجليزية",
};

export default function ConversationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faq)) }}
      />

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
            <ConversationCard hideLearnMore />
          </Reveal>
        </div>
      </section>

      {/* ═══ عندك سؤال؟ عندنا جواب (FAQ) ═══ */}
      <section className="bg-section py-20 lg:py-28">
        <div className="container-site">
          <Reveal>
            <SectionHeading
              eyebrow="الأسئلة الشائعة"
              title="عندك سؤال؟ عندنا جواب"
            />
          </Reveal>
          <Reveal delay={120}>
            <div className="mt-12">
              <FaqAccordion items={faq} />
            </div>
          </Reveal>
          <Reveal delay={220}>
            <div className="mt-10 flex flex-col items-center gap-3 text-center">
              <p className="font-black text-ink/70">باقي عندك سؤال؟ تواصل معنا</p>
              <WhatsAppButton
                message={site.whatsapp.msgCourseInquiry("المحادثة")}
                source="conversation-faq"
                variant="solid"
              >
                راسلنا على الواتساب
              </WhatsAppButton>
            </div>
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
