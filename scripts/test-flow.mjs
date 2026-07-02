/**
 * QA: drive the Free Level Test end-to-end and capture intro/quiz/result.
 * Usage: node scripts/test-flow.mjs <outDir>
 */
import { chromium } from "playwright-core";

const outDir = process.argv[2] ?? ".";
const browser = await chromium.launch({ channel: "chrome", headless: true });
const page = await browser.newPage({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
});

await page.goto("http://localhost:3000/test", { waitUntil: "networkidle" });
await page.screenshot({ path: `${outDir}/flow-1-intro.png`, fullPage: true });

await page.getByRole("button", { name: /ابدأ الاختبار/ }).first().click();
await page.waitForTimeout(300);
await page.screenshot({ path: `${outDir}/flow-2-quiz.png` });

// answer all questions (always the 2nd option → mixed correctness)
for (let i = 0; i < 25; i++) {
  const options = page.locator("[data-option]");
  if ((await options.count()) === 0) break;
  await options.nth(1).click();
  await page.waitForTimeout(480);
}

await page.waitForTimeout(600);
await page.screenshot({ path: `${outDir}/flow-3-result.png`, fullPage: true });

// verify persistence
const savedLevel = await page.evaluate(() =>
  localStorage.getItem("zedlevel_level"),
);
console.log(`saved level: ${savedLevel}`);

// returning-user state
await page.reload({ waitUntil: "networkidle" });
await page.screenshot({ path: `${outDir}/flow-4-returning.png`, fullPage: true });
console.log("✓ flow captured (intro / quiz / result / returning)");

await browser.close();
