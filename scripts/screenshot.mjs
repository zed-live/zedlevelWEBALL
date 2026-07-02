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
  // force lazy images to load
  await page.evaluate(async () => {
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
  // sweep-scroll so whileInView animations fire everywhere, then settle
  if (fullPage) {
    await page.evaluate(async () => {
      const h = document.body.scrollHeight;
      for (let y = 0; y <= h; y += 650) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 120));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(1100);
    // capture determinism: snap any still-animating motion element to final state
    // (headless Chrome doesn't run rAF while idle — real browsers are unaffected)
    await page.evaluate(() => {
      document.querySelectorAll("[style]").forEach((el) => {
        const s = el.getAttribute("style") ?? "";
        if (/opacity:\s*0(?!\.?[1-9])/.test(s) || /blur\(/.test(s) || /scale(Y|X)?\(0/.test(s)) {
          el.style.opacity = "1";
          el.style.transform = "none";
          el.style.filter = "none";
        }
      });
      document.querySelectorAll("[data-countup]").forEach((el) => {
        el.textContent = el.getAttribute("data-final") ?? el.textContent;
      });
    });
    await page.waitForTimeout(150);
  }
  if (scrollTo > 0) {
    await page.evaluate((y) => window.scrollTo(0, y), scrollTo);
  }
  await page.waitForTimeout(950); // let springs settle
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
