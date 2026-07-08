import { site, isTodo } from "@/config/site";
import { WhatsAppIcon } from "./WhatsAppButton";

/**
 * Social + WhatsApp icon row for the footer. WhatsApp always renders (real
 * number in config); each social platform renders only once its URL is set in
 * config/site.ts (TODO_ placeholders stay hidden in production).
 */

function IconLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-accent hover:text-ink"
    >
      {children}
    </a>
  );
}

export function SocialLinks() {
  const waNumber = site.whatsapp.number;
  const wa = isTodo(waNumber)
    ? null
    : `https://wa.me/${waNumber}?text=${encodeURIComponent(site.whatsapp.msgGeneral)}`;

  return (
    <div className="flex items-center justify-center gap-3">
      {wa && (
        <IconLink href={wa} label="واتساب">
          <WhatsAppIcon className="h-5 w-5" />
        </IconLink>
      )}

      {!isTodo(site.social.tiktok) && (
        <IconLink href={site.social.tiktok} label="تيك توك">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
            <path d="M16.5 3c.3 2 1.5 3.6 3.5 3.9v2.7c-1.3.1-2.5-.3-3.6-1v6.2c0 3.4-2.6 5.7-5.7 5.7A5.5 5.5 0 0 1 5.2 15c0-3 2.4-5.4 5.4-5.4.3 0 .6 0 .9.1v2.9c-.3-.1-.6-.2-.9-.2-1.4 0-2.5 1.1-2.5 2.5s1.1 2.5 2.6 2.5c1.5 0 2.7-1.1 2.7-2.9V3h3.1z" />
          </svg>
        </IconLink>
      )}

      {!isTodo(site.social.instagram) && (
        <IconLink href={site.social.instagram} label="إنستقرام">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
          </svg>
        </IconLink>
      )}

      {!isTodo(site.social.snapchat) && (
        <IconLink href={site.social.snapchat} label="سناب شات">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
            <path d="M12 2c2.6 0 4.3 1.9 4.4 4.4v1.4c.3.2.7.3 1 .2.5-.2 1 .1 1 .6 0 .6-.7.8-1.2 1-.3.1-.5.2-.5.5.2 1 1.4 2.4 2.7 2.8.4.1.6.5.4.9-.3.6-1.4.9-2 1-.1.3 0 .8-.4 1-.4.1-1-.2-1.6-.2-.6 0-1 .2-1.5.6-.7.5-1.4 1.1-2.7 1.1s-2-.6-2.7-1.1c-.5-.4-.9-.6-1.5-.6-.6 0-1.2.3-1.6.2-.4-.2-.3-.7-.4-1-.6-.1-1.7-.4-2-1-.2-.4 0-.8.4-.9 1.3-.4 2.5-1.8 2.7-2.8 0-.3-.2-.4-.5-.5-.5-.2-1.2-.4-1.2-1 0-.5.5-.8 1-.6.3.1.7 0 1-.2V6.4C7.7 3.9 9.4 2 12 2z" />
          </svg>
        </IconLink>
      )}

      {!isTodo(site.social.x) && (
        <IconLink href={site.social.x} label="X">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
            <path d="M18.9 2H22l-7.5 8.6L23 22h-6.9l-5.4-7-6.2 7H1.4l8-9.2L1 2h7.1l4.9 6.4L18.9 2zm-2.4 18h1.9L7.6 4H5.6l10.9 16z" />
          </svg>
        </IconLink>
      )}
    </div>
  );
}
