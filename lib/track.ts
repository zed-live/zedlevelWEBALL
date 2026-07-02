/**
 * Funnel analytics — single util wired to GA4 (gtag).
 * Events (documented in README):
 *   test_start · test_complete{level} · salla_click{course,source} ·
 *   whatsapp_click{source} · notify_click{course} · blog_cta_click{slug}
 * No-ops when GA4 is not configured; logs to console in development.
 */
export type TrackEvent =
  | "test_start"
  | "test_complete"
  | "salla_click"
  | "whatsapp_click"
  | "notify_click"
  | "blog_cta_click";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function track(
  event: TrackEvent,
  params?: Record<string, string | number>,
) {
  if (typeof window === "undefined") return;
  if (window.gtag) {
    window.gtag("event", event, params ?? {});
  } else if (process.env.NODE_ENV === "development") {
    console.info("[track]", event, params ?? {});
  }
}
