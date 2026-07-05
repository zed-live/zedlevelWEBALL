import { readFileSync } from "node:fs";
import { join } from "node:path";
import { SpeakingSnapshot } from "./SpeakingSnapshot";

/**
 * /speaking-test — the standalone speaking experience, now a real route of the
 * site. Markup + interactive script are read from the byte-faithful snapshot
 * (./_snapshot/) at build time and handed to a client component that mounts
 * the markup and runs the original script. Theme/chrome come from the route
 * group's own layout (../layout.tsx), not the main site shell.
 */

const SNAPSHOT_DIR = join(process.cwd(), "app", "(speaking)", "speaking-test", "_snapshot");
const BODY = readFileSync(join(SNAPSHOT_DIR, "body.html"), "utf8");
const SCRIPT = readFileSync(join(SNAPSHOT_DIR, "script.js"), "utf8");

export default function SpeakingTestPage() {
  return <SpeakingSnapshot markup={BODY} script={SCRIPT} />;
}
