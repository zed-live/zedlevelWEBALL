import type { Metadata } from "next";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { site } from "@/config/site";
import { SpeakingSnapshot } from "./SpeakingSnapshot";

/**
 * /speaking-test — the standalone speaking experience, integrated as a real
 * page of the site. It now lives in the (site) route group, so it renders WITH
 * the shared site chrome (navbar / footer / floating WhatsApp).
 *
 * The experience itself is the production speaking.zedlevel.app page, ported
 * byte-faithfully from ./_snapshot/. This page:
 *   - injects the snapshot CSS (scoped from `:root`/`body` to `.speaking-root`,
 *     and sized to fill the viewport BELOW the sticky navbar — see
 *     styles.scoped.css), and
 *   - wraps the markup in `.speaking-root` carrying `data-wa`, the one thing
 *     wired to the rest of the site: the WhatsApp number comes from the central
 *     config (site.whatsapp.number), never the stale number the snapshot
 *     originally hardcoded.
 * The interactive script is run client-side by <SpeakingSnapshot/>.
 */

const SNAPSHOT_DIR = join(process.cwd(), "app", "(site)", "speaking-test", "_snapshot");
const SCOPED_CSS = readFileSync(join(SNAPSHOT_DIR, "styles.scoped.css"), "utf8");
const BODY = readFileSync(join(SNAPSHOT_DIR, "body.html"), "utf8");
const SCRIPT = readFileSync(join(SNAPSHOT_DIR, "script.js"), "utf8");

export const metadata: Metadata = {
  title: "اختبار المحادثة — سجّل صوتك واستلم تقييمك",
  description:
    "اختبار المحادثة من أكاديمية زد لفل لتعليم الإنجليزية — اقرأ النص بصوتك وأرسل تسجيلك عبر الواتساب ليستمع له مقيّمنا.",
};

export default function SpeakingTestPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: SCOPED_CSS }} />
      <div className="speaking-root" data-wa={site.whatsapp.number}>
        <SpeakingSnapshot markup={BODY} script={SCRIPT} />
      </div>
    </>
  );
}
