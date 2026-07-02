"use client";

import { site } from "@/config/site";
import { waLink } from "@/lib/whatsapp";
import { track } from "@/lib/track";
import { DevTodoBadge } from "./DevTodoBadge";
import { WhatsAppIcon } from "./WhatsAppButton";

/**
 * Floating WhatsApp button — ALL pages, bottom-start in RTL (build spec §7).
 * Official WhatsApp green kept as the functional channel color for recognition.
 * Hidden in production while the number is TODO_.
 */
export function WhatsAppFloat() {
  const href = waLink(site.whatsapp.msgGeneral);
  if (!href && process.env.NODE_ENV === "production") return null;

  return (
    <a
      href={href ?? "#"}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="تواصل معنا على واتساب"
      onClick={(e) => {
        if (!href) {
          e.preventDefault();
          return;
        }
        track("whatsapp_click", { source: "float" });
      }}
      className="fixed bottom-4 start-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
      style={{ marginBottom: "var(--sticky-bar-offset, 0px)" }}
    >
      <WhatsAppIcon className="h-7 w-7" />
      {!href && <DevTodoBadge label="WHATSAPP_NUMBER" side="start" />}
    </a>
  );
}
