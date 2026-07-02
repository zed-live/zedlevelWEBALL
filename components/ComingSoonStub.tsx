import Link from "next/link";
import { Mascot, type CharacterName } from "./Mascot";
import { WhatsAppButton } from "./WhatsAppButton";
import { site } from "@/config/site";

/**
 * Temporary branded stub for pages whose milestone hasn't been built yet.
 * Guarantees "no dead ends": every stub offers WhatsApp + a way home.
 * Replaced milestone by milestone (M2–M7).
 */
export function ComingSoonStub({
  title,
  sub,
  mascot = "shab-front2",
  notifyCourse,
}: {
  title: string;
  sub?: string;
  mascot?: CharacterName;
  notifyCourse?: string;
}) {
  return (
    <section className="bg-hero-glow">
      <div className="container-site flex flex-col items-center gap-7 py-24 text-center">
        <Mascot name={mascot} size="section" className="h-56 w-auto drop-shadow-xl" />
        <h1 className="text-3xl font-black sm:text-5xl">{title}</h1>
        {sub && (
          <p className="max-w-[52ch] text-lg leading-9 text-ink/65">{sub}</p>
        )}
        <div className="flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
          <WhatsAppButton
            message={
              notifyCourse
                ? site.whatsapp.msgNotify(notifyCourse)
                : site.whatsapp.msgGeneral
            }
            source="coming-soon-stub"
            event={notifyCourse ? "notify_click" : "whatsapp_click"}
            params={notifyCourse ? { course: notifyCourse } : undefined}
            variant={notifyCourse ? "solid" : "outline"}
          >
            {notifyCourse ? "نبّهني على الواتساب 🔔" : "راسلنا على واتساب"}
          </WhatsAppButton>
          <Link href="/" className="btn btn-outline w-full sm:w-auto">
            العودة للرئيسية
          </Link>
        </div>
      </div>
    </section>
  );
}
