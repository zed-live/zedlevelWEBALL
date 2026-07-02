// Screenshot each homepage <section> separately at mobile width for design review
import { chromium } from "playwright-core";

const outDir = process.argv[2] ?? ".";
const width = Number(process.argv[3] ?? 390);

const browser = await chromium.launch({ channel: "chrome", headless: true });
const page = await browser.newPage({
  viewport: { width, height: 900 },
  deviceScaleFactor: 2,
});
await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
await page.evaluate(() =>
  document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible")),
);
await page.waitForTimeout(500);

const sections = page.locator("main > section");
const n = await sections.count();
console.log(`sections: ${n}`);
for (let i = 0; i < n; i++) {
  await sections.nth(i).scrollIntoViewIfNeeded();
  await page.waitForTimeout(150);
  await sections.nth(i).screenshot({ path: `${outDir}/sec-${i}-w${width}.png` });
  console.log(`✓ sec-${i}`);
}
// footer too
await page.locator("footer").screenshot({ path: `${outDir}/sec-footer-w${width}.png` });
console.log("✓ footer");
await browser.close();
