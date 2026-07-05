"use client";

import { useEffect, useRef } from "react";

/**
 * Mounts the standalone speaking-test markup and runs its original script.
 *
 * The snapshot was authored as a single self-contained HTML file: its script
 * queries the DOM by id (document.getElementById(...)) and wires up the whole
 * flow. We inject the markup, then execute that script exactly once after mount,
 * scoped so its top-level `const`s don't leak or collide on re-render.
 */
export function SpeakingSnapshot({
  markup,
  script,
}: {
  markup: string;
  script: string;
}) {
  const ran = useRef(false);

  useEffect(() => {
    // Guard against React 19 StrictMode's double-invoke in dev — the script
    // sets up listeners and must run only once.
    if (ran.current) return;
    ran.current = true;

    // Run the snapshot script in its own function scope. It reads the WhatsApp
    // number from document.body.dataset.wa (stamped by the route layout).
    try {
      // eslint-disable-next-line no-new-func
      new Function(script)();
    } catch (err) {
      console.error("[speaking-test] snapshot script failed:", err);
    }
  }, [script]);

  return <div dangerouslySetInnerHTML={{ __html: markup }} />;
}
