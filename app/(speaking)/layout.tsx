import type { Metadata } from "next";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { site } from "@/config/site";

/**
 * Speaking-test route group.
 *
 * This is a full-screen, chrome-free experience: unlike the (site) group it has
 * NO navbar / footer / floating-WhatsApp button. It's the production
 * speaking.zedlevel.app page, ported byte-faithfully into the site — see
 * ./speaking-test/_snapshot/ for the original markup, styles and script.
 *
 * It composes under the shared root <html>/<body> (app/layout.tsx), so this
 * layout must NOT emit its own <html>/<body>. Instead it:
 *   - injects the snapshot's CSS, scoped from `:root`/`body` to `.speaking-root`
 *     (see styles.scoped.css) so it can live inside the site's <body>, and
 *   - wraps the page in `.speaking-root` carrying `data-wa` — the ONE thing
 *     wired to the rest of the site: the WhatsApp number comes from the central
 *     config (site.whatsapp.number), never the stale number the snapshot
 *     originally hardcoded.
 */

const SNAPSHOT_DIR = join(process.cwd(), "app", "(speaking)", "speaking-test", "_snapshot");
const SCOPED_CSS = readFileSync(join(SNAPSHOT_DIR, "styles.scoped.css"), "utf8");

export const metadata: Metadata = {
  title: "اختبار المحادثة — سجّل صوتك واستلم تقييمك",
  description:
    "اختبار المحادثة من أكاديمية زد لفل لتعليم الإنجليزية — اقرأ النص بصوتك وأرسل تسجيلك عبر الواتساب ليستمع له مقيّمنا.",
};

export default function SpeakingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: SCOPED_CSS }} />
      <div className="speaking-root" data-wa={site.whatsapp.number}>
        {children}
      </div>
    </>
  );
}
