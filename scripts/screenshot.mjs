/**
 * QA screenshot rig (build spec §13: 375 / 768 / 1440 checks each milestone).
 * Handles RTL correctly (unlike `chrome --headless --screenshot`).
 *
 * Usage:
 *   node scripts/screenshot.mjs <url> <out.png> [width] [--full]
 *   node scripts/screenshot.mjs qa <outDir> [path]   ← 375/768/1440 full-page set
 */
import { chromium } from "playwright-core";

const [, , a, b, c, d] = process.argv;

const browser = await chromium.launch({ channel: "chrome", headless: true });

async function shoot(url, out, width, fullPage, scrollTo = 0) {
  const page = await browser.newPage({
    viewport: { width, height: 900 },
    deviceScaleFactor: width >= 1200 ? 1 : 2,
  });
  await page.goto(url, { waitUntil: "networkidle" });
  // force lazy images to load + reveal-on-scroll to settle
  await page.evaluate(async () => {
    document
      .querySelectorAll(".reveal")
      .forEach((el) => el.classList.add("is-visible"));
    document.querySelectorAll("img").forEach((img) => {
      img.loading = "eager";
      img.decoding = "sync";
    });
    await Promise.all(
      Array.from(document.images)
        .filter((i) => !i.complete)
        .map(
          (i) =>
            new Promise((r) => {
              i.onload = i.onerror = r;
            }),
        ),
    );
  });
  if (scrollTo > 0) {
    await page.evaluate((y) => window.scrollTo(0, y), scrollTo);
  }
  await page.waitForTimeout(500);
  await page.screenshot({ path: out, fullPage });
  console.log(`✓ ${out} (${width}px${fullPage ? ", full" : ""}${scrollTo ? `, y=${scrollTo}` : ""})`);
  await page.close();
}

if (a === "qa") {
  const outDir = b ?? ".";
  const path = c ?? "/";
  const url = `http://localhost:3000${path}`;
  const slug = path === "/" ? "home" : path.replaceAll("/", "-").replace(/^-/, "");
  for (const width of [375, 768, 1440]) {
    await shoot(url, `${outDir}/${slug}-${width}.png`, width, true);
  }
} else {
  const url = a ?? "http://localhost:3000";
  const out = b ?? "screenshot.png";
  const width = Number(c ?? 390);
  const scrollArg = [c, d].find((x) => x?.startsWith?.("--scroll="));
  const scrollTo = scrollArg ? Number(scrollArg.split("=")[1]) : 0;
  await shoot(url, out, width, d === "--full" || c === "--full", scrollTo);
}

await browser.close();
