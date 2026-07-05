import type { Metadata } from "next";
import Link from "next/link";

/**
 * /speaking-test-new was the scratch page used to build the native speaking
 * test. The native flow now lives at the canonical /speaking-test.
 *
 * Static export (GitHub Pages) can't do a runtime redirect(), so this is a
 * client-side meta-refresh to /speaking-test with a manual link fallback.
 */

export const metadata: Metadata = {
  title: "اختبار المحادثة",
  // tell crawlers the canonical location and not to index this stub
  alternates: { canonical: "/speaking-test/" },
  robots: { index: false, follow: true },
};

export default function SpeakingTestNewPage() {
  return (
    <>
      <meta httpEquiv="refresh" content="0; url=/speaking-test/" />
      <section className="container-site flex min-h-[50vh] flex-col items-center justify-center gap-4 py-24 text-center">
        <p className="text-base font-bold text-ink/60">
          تم نقل اختبار المحادثة…
        </p>
        <Link
          href="/speaking-test"
          className="btn btn-primary rounded-full"
        >
          الانتقال إلى اختبار المحادثة
        </Link>
      </section>
    </>
  );
}
