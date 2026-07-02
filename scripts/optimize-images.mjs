/**
 * ZEDLEVEL image pipeline — build spec §4 (CRITICAL FIRST TASK).
 * Source character renders are 10547×18750 (~50–100MB each) and must NEVER ship.
 *
 * - Trims transparent borders, resizes to 3 named sizes, encodes WebP q82.
 *   (AVIF is produced at runtime by the Next.js image optimizer — next.config.ts)
 * - Emits /public/characters/manifest.json with real dimensions per output,
 *   consumed by <Mascot/> and the Navbar logo.
 * - Processes brand logo renders (assets-source/logo) → /public/brand + favicons.
 * - Skips existing outputs unless --force. Warns on any output > 150KB (QA budget).
 *
 * Usage: npm run optimize-images [-- --force]
 */
import sharp from "sharp";
import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile, copyFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const SRC_CHARACTERS = path.join(ROOT, "صور الشخصيات المعتمدة");
const SRC_LOGO = path.join(ROOT, "assets-source", "logo");
const OUT_CHARACTERS = path.join(ROOT, "public", "characters");
const OUT_BRAND = path.join(ROOT, "public", "brand");
const FORCE = process.argv.includes("--force");

const SIZES = { hero: 1200, section: 800, card: 400 };
const WEBP_QUALITY = 82;
const BUDGET_BYTES = 150 * 1024;
const CONCURRENCY = 2; // source decode ≈ 800MB RAM each

const characters = JSON.parse(
  await readFile(path.join(ROOT, "config", "characters.json"), "utf8"),
);

await mkdir(OUT_CHARACTERS, { recursive: true });
await mkdir(OUT_BRAND, { recursive: true });

const manifest = { characters: {}, brand: {} };
const warnings = [];
let processed = 0;
let skipped = 0;

async function fileSize(p) {
  return (await stat(p)).size;
}

function checkBudget(p, bytes) {
  if (bytes > BUDGET_BYTES) {
    warnings.push(
      `⚠ over 150KB budget: ${path.basename(p)} (${Math.round(bytes / 1024)}KB)`,
    );
  }
}

/** One character: decode+trim once at full res, then derive all sizes. */
async function processCharacter([slug, { file }]) {
  const srcPath = path.join(SRC_CHARACTERS, file);
  if (!existsSync(srcPath)) {
    warnings.push(`⚠ missing source: ${file} (${slug})`);
    return;
  }

  const sizes = {};
  const allExist = Object.keys(SIZES).every((s) =>
    existsSync(path.join(OUT_CHARACTERS, `${slug}-${s}.webp`)),
  );

  if (allExist && !FORCE) {
    for (const sizeName of Object.keys(SIZES)) {
      const outPath = path.join(OUT_CHARACTERS, `${slug}-${sizeName}.webp`);
      const m = await sharp(outPath).metadata();
      sizes[sizeName] = {
        src: `/characters/${slug}-${sizeName}.webp`,
        width: m.width,
        height: m.height,
      };
    }
    manifest.characters[slug] = { sizes };
    skipped++;
    return;
  }

  // Decode the giant source once: trim transparent borders, cap at hero height.
  const base = await sharp(srcPath, { limitInputPixels: false })
    .trim()
    .resize({ height: SIZES.hero, withoutEnlargement: true })
    .png()
    .toBuffer();

  for (const [sizeName, maxH] of Object.entries(SIZES)) {
    const outName = `${slug}-${sizeName}.webp`;
    const outPath = path.join(OUT_CHARACTERS, outName);
    const info = await sharp(base)
      .resize({ height: maxH, withoutEnlargement: true })
      .webp({ quality: WEBP_QUALITY })
      .toFile(outPath);
    checkBudget(outPath, info.size);
    sizes[sizeName] = {
      src: `/characters/${outName}`,
      width: info.width,
      height: info.height,
    };
  }

  manifest.characters[slug] = { sizes };
  processed++;
  console.log(`✓ ${slug} (${file})`);
}

// simple concurrency pool
const queue = Object.entries(characters);
async function worker() {
  while (queue.length) await processCharacter(queue.shift());
}
await Promise.all(Array.from({ length: CONCURRENCY }, worker));

/**
 * The PDF renders bake a white background. For the standalone icon we remove
 * ONLY the outer white (flood fill from the borders) — the white "Z" inside
 * the blue circle must stay opaque. Anti-aliased fringe is invisible at favicon sizes.
 */
async function removeOuterWhite(pngBuffer, threshold = 242) {
  const { data, info } = await sharp(pngBuffer)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width: w, height: h } = info;
  const visited = new Uint8Array(w * h);
  const stack = [];
  for (let x = 0; x < w; x++) stack.push(x, (h - 1) * w + x);
  for (let y = 0; y < h; y++) stack.push(y * w, y * w + w - 1);
  while (stack.length) {
    const p = stack.pop();
    if (visited[p]) continue;
    visited[p] = 1;
    const i = p * 4;
    const isWhite =
      data[i] >= threshold && data[i + 1] >= threshold && data[i + 2] >= threshold;
    if (!isWhite) continue;
    data[i + 3] = 0;
    const x = p % w;
    const y = (p / w) | 0;
    if (x > 0) stack.push(p - 1);
    if (x < w - 1) stack.push(p + 1);
    if (y > 0) stack.push(p - w);
    if (y < h - 1) stack.push(p + w);
  }
  return sharp(data, { raw: { width: w, height: h, channels: 4 } })
    .png()
    .toBuffer();
}

/** Brand logos: page1 = full lockup, page3 = icon alone. */
async function processBrand() {
  const lockupSrc = path.join(SRC_LOGO, "logo-page1.png");
  const iconSrc = path.join(SRC_LOGO, "logo-page3.png");

  if (existsSync(lockupSrc)) {
    const alpha = (await sharp(lockupSrc).stats()).channels[3];
    console.log(
      `logo lockup alpha: min=${alpha.min} (${alpha.min < 255 ? "transparent ✓" : "OPAQUE — needs attention"})`,
    );

    // Full lockup for navbar/footer — trimmed, 2x display height (~72px shown at h-9)
    const outLockup = path.join(OUT_BRAND, "logo-full.png");
    const info = await sharp(lockupSrc)
      .trim()
      .resize({ height: 144, withoutEnlargement: true })
      .png()
      .toFile(outLockup);
    checkBudget(outLockup, info.size);
    manifest.brand["logo-full"] = {
      src: "/brand/logo-full.png",
      width: info.width,
      height: info.height,
    };

    // Large version for OG images later (M7)
    await sharp(lockupSrc)
      .trim()
      .resize({ height: 400, withoutEnlargement: true })
      .png()
      .toFile(path.join(OUT_BRAND, "logo-full-lg.png"));
  } else {
    warnings.push("⚠ missing assets-source/logo/logo-page1.png");
  }

  if (existsSync(iconSrc)) {
    const trimmed = await removeOuterWhite(
      await sharp(iconSrc).trim().png().toBuffer(),
    );
    const m = await sharp(trimmed).metadata();
    const square = Math.max(m.width, m.height);

    const padded = await sharp(trimmed)
      .extend({
        top: Math.floor((square - m.height) / 2),
        bottom: Math.ceil((square - m.height) / 2),
        left: Math.floor((square - m.width) / 2),
        right: Math.ceil((square - m.width) / 2),
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .png()
      .toBuffer();

    const outIcon = path.join(OUT_BRAND, "logo-icon.png");
    await sharp(padded).resize(512, 512).png().toFile(outIcon);
    manifest.brand["logo-icon"] = {
      src: "/brand/logo-icon.png",
      width: 512,
      height: 512,
    };

    // App Router favicons
    await sharp(padded).resize(192, 192).png().toFile(path.join(ROOT, "app", "icon.png"));
    await sharp(padded).resize(180, 180).png().toFile(path.join(ROOT, "app", "apple-icon.png"));
    console.log("✓ brand logos + favicons");
  } else {
    warnings.push("⚠ missing assets-source/logo/logo-page3.png");
  }
}
await processBrand();

await writeFile(
  path.join(OUT_CHARACTERS, "manifest.json"),
  JSON.stringify(manifest, null, 2),
);

console.log(
  `\nDone. characters: ${processed} processed, ${skipped} up-to-date. manifest.json written.`,
);
if (warnings.length) {
  console.log("\n" + warnings.join("\n"));
} else {
  console.log("All outputs within the 150KB budget ✓");
}
