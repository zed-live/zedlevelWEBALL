"use client";

import { useEffect, useState } from "react";
import { ShoppingBag } from "lucide-react";
import { site, isTodo, type SallaCourse } from "@/config/site";
import { waLink } from "@/lib/whatsapp";
import { track } from "@/lib/track";
import { DevTodoBadge } from "./DevTodoBadge";
import { WhatsAppIcon } from "./WhatsAppButton";

/**
 * Mobile sticky buy bar (build spec §7): [اشترك الآن — Salla] + [واتساب].
 * Appears after scrolling past the hero; hidden on desktop.
 * Sets body[data-sticky-bar] so the WhatsApp float lifts above it.
 */
export function StickyBuyBar({
  course,
  courseLabel,
}: {
  course: SallaCourse;
  courseLabel: string;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.dataset.stickyBar = "1";
    return () => {
      delete document.body.dataset.stickyBar;
    };
  }, []);

  const url = site.salla[course];
  const todo = isTodo(url);
  const wa = waLink(site.whatsapp.msgCourseInquiry(courseLabel));

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-white/95 shadow-[0_-8px_30px_-12px_rgb(2_6_23/0.2)] backdrop-blur transition-transform duration-300 lg:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div
        className="container-site flex items-center gap-3 py-3"
        style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      >
        {todo ? (
          <span
            aria-disabled="true"
            className="btn relative flex-1 cursor-not-allowed bg-ink/10 !py-3 text-ink/45"
          >
            <ShoppingBag className="h-5 w-5" aria-hidden />
            قريبًا
            <DevTodoBadge label={`SALLA_${course.toUpperCase()}`} />
          </span>
        ) : (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("salla_click", { course, source: "sticky-bar" })}
            className="btn btn-accent flex-1 !py-3"
          >
            <ShoppingBag className="h-5 w-5" aria-hidden />
            اشترك الآن
          </a>
        )}
        {(wa || process.env.NODE_ENV !== "production") && (
          <a
            href={wa ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`استفسار عن ${courseLabel} عبر الواتساب`}
            onClick={(e) => {
              if (!wa) {
                e.preventDefault();
                return;
              }
              track("whatsapp_click", { source: "sticky-bar" });
            }}
            className="btn btn-outline relative !min-h-12 !px-4 !py-3"
          >
            <WhatsAppIcon className="h-6 w-6" />
            {!wa && <DevTodoBadge label="WHATSAPP" />}
          </a>
        )}
      </div>
    </div>
  );
}
