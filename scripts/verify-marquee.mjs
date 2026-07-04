/** QA: prove the marquee moves — normal AND with reduced-motion emulated. */
import { chromium } from "playwright-core";

const browser = await chromium.launch({ channel: "chrome", headless: true });

async function sample(reduced) {
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  if (reduced) await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  const track = page.locator(".marquee-track").first();
  const t1 = await track.evaluate((el) => getComputedStyle(el).transform);
  await page.waitForTimeout(1500);
  const t2 = await track.evaluate((el) => getComputedStyle(el).transform);
  const moving = t1 !== t2;
  console.log(
    `${reduced ? "reduced-motion" : "normal       "} → t1=${t1.slice(0, 40)}… t2=${t2.slice(0, 40)}… ${moving ? "MOVING ✓" : "STATIC ✗"}`,
  );
  await page.close();
  return moving;
}

const a = await sample(false);
const b = await sample(true);
await browser.close();
process.exit(a && b ? 0 : 1);
