import type { Metadata } from "next";
import { SpeakingTest } from "@/components/speaking/SpeakingTest";

/**
 * /speaking-test-new — the speaking test, rebuilt natively in the site's
 * design system and laid out directly in the page (inside the shared header +
 * footer template). No standalone snapshot, no floating card.
 */

export const metadata: Metadata = {
  title: "اختبار المحادثة — سجّل صوتك واستلم تقييمك",
  description:
    "اختبار المحادثة من أكاديمية زد لفل لتعليم الإنجليزية — اختر مستواك، اقرأ النص بصوتك، وأرسل تسجيلك عبر الواتساب ليستمع له مقيّمنا ويرد عليك بمستواك.",
};

export default function SpeakingTestNewPage() {
  return (
    <section className="container-site py-12 sm:py-16">
      <SpeakingTest />
    </section>
  );
}
