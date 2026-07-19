import type { FaqItem } from "@/components/FaqAccordion";

/**
 * Build a schema.org FAQPage object from the same items the FaqAccordion
 * renders. Server-safe (plain module — the accordion itself is a client
 * component, so this can't live there).
 */
export function faqJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: typeof item.a === "string" ? item.a : (item.plain ?? item.q),
      },
    })),
  };
}
