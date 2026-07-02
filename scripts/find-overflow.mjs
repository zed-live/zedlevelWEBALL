/**
 * QA: find elements causing horizontal overflow at a given viewport width.
 * Usage: node scripts/find-overflow.mjs [url] [width]
 */
import { chromium } from "playwright-core";

const url = process.argv[2] ?? "http://localhost:3000";
const width = Number(process.argv[3] ?? 390);

const browser = await chromium.launch({ channel: "chrome", headless: true });
const page = await browser.newPage({ viewport: { width, height: 900 } });
await page.goto(url, { waitUntil: "networkidle" });

const report = await page.evaluate(() => {
  const vw = document.documentElement.clientWidth;
  const sw = document.scrollingElement.scrollWidth;
  const out = [];
  document.querySelectorAll("body *").forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.width === 0) return;
    const s = getComputedStyle(el);
    if (s.position === "fixed") return;
    if (r.right > vw + 1 || r.left < -1) {
      out.push({
        tag: el.tagName.toLowerCase(),
        cls: String(el.className).slice(0, 90),
        left: Math.round(r.left),
        right: Math.round(r.right),
        w: Math.round(r.width),
      });
    }
  });
  return { vw, sw, overflowPx: sw - vw, offenders: out.slice(0, 25) };
});

console.log(`viewport=${report.vw} scrollWidth=${report.sw} overflow=${report.overflowPx}px`);
for (const o of report.offenders) {
  console.log(`  <${o.tag}> L${o.left} R${o.right} w${o.w} :: ${o.cls}`);
}
if (!report.offenders.length) console.log("  (no offending elements — clean ✓)");

await browser.close();
