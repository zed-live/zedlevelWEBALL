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
    <section className="container-site flex flex-col items-center gap-6 py-20 text-center">
      <Mascot name={mascot} size="section" className="h-52 w-auto" />
      <h1 className="text-3xl font-black sm:text-4xl">{title}</h1>
      {sub && <p className="max-w-[55ch] text-lg text-ink/70">{sub}</p>}
      <div className="flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
        <WhatsAppButton
          message={
            notifyCourse
              ? site.whatsapp.msgNotify(notifyCourse)
              : site.whatsapp.msgGeneral
          }
          source="coming-soon-stub"
        >
          {notifyCourse ? "نبّهني على الواتساب 🔔" : "راسلنا على واتساب"}
        </WhatsAppButton>
        <Link
          href="/"
          className="inline-flex min-h-11 w-full items-center justify-center rounded-xl border-2 border-primary px-5 py-3 font-bold text-primary transition-colors hover:bg-primary-light sm:w-auto"
        >
          العودة للرئيسية
        </Link>
      </div>
    </section>
  );
}
