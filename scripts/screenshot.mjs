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

async function shoot(url, out, width, fullPage) {
  const page = await browser.newPage({
    viewport: { width, height: 900 },
    deviceScaleFactor: width >= 1200 ? 1 : 2,
  });
  await page.goto(url, { waitUntil: "networkidle" });
  // let reveal-on-scroll settle for full-page captures
  if (fullPage) {
    await page.evaluate(() =>
      document
        .querySelectorAll(".reveal")
        .forEach((el) => el.classList.add("is-visible")),
    );
    await page.waitForTimeout(400);
  }
  await page.screenshot({ path: out, fullPage });
  console.log(`✓ ${out} (${width}px${fullPage ? ", full" : ""})`);
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
  await shoot(url, out, width, d === "--full" || c === "--full");
}

await browser.close();
