import type { Metadata } from "next";
import { Mascot } from "@/components/Mascot";
import { SectionHeading } from "@/components/SectionHeading";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { site, isTodo } from "@/config/site";

export const metadata: Metadata = {
  title: "تواصل معنا",
  description:
    "تواصل مع فريق زد لفل عبر الواتساب — نرد عليك بأسرع وقت ونساعدك تختار الدورة المناسبة.",
};

export default function ContactPage() {
  return (
    <section className="container-site flex flex-col items-center gap-6 py-20 text-center">
      <Mascot name="mother-front" size="section" className="h-52 w-auto" />
      <SectionHeading
        eyebrow="تواصل معنا"
        title="نحن هنا لمساعدتك 🙌"
        sub="أسرع طريقة للتواصل هي الواتساب — نرد عليك بأسرع وقت ونساعدك تختار الخطوة الصح."
      />
      <WhatsAppButton
        message={site.whatsapp.msgGeneral}
        source="contact"
        variant="solid"
      >
        راسلنا على واتساب
      </WhatsAppButton>
      {!isTodo(site.social.email) && (
        <a
          href={`mailto:${site.social.email}`}
          className="text-sm text-ink/70 hover:text-primary"
        >
          {site.social.email}
        </a>
      )}
    </section>
  );
}
