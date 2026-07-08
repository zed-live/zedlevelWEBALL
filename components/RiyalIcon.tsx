import { SaudiRiyal } from "lucide-react";

/**
 * The new Saudi Riyal currency symbol — via lucide's official `SaudiRiyal`
 * glyph (same icon family as the rest of the site). Inherits `currentColor`
 * and sits inline with text; size via className.
 */
export function RiyalIcon({
  className = "h-[0.95em] w-[0.95em]",
}: {
  className?: string;
}) {
  return (
    <SaudiRiyal
      className={`inline-block shrink-0 align-[-0.1em] ${className}`}
      strokeWidth={2.5}
      aria-label="ريال سعودي"
    />
  );
}
