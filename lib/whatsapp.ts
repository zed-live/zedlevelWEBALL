import { site, isTodo } from "@/config/site";

/**
 * Build a wa.me deep link with a pre-filled message.
 * Returns null while the WhatsApp number is still a TODO_ placeholder —
 * callers must hide the action in production and show a dev warning badge.
 */
export function waLink(message: string): string | null {
  if (isTodo(site.whatsapp.number)) return null;
  return `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(message)}`;
}
