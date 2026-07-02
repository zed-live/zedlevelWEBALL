import Image from "next/image";
import manifest from "@/public/characters/manifest.json";
import meta from "@/config/characters.json";

export type CharacterName = keyof typeof meta;
export type MascotSize = "hero" | "section" | "card";

type ManifestEntry = {
  sizes: Record<string, { src: string; width: number; height: number }>;
};

const SIZES_ATTR: Record<MascotSize, string> = {
  hero: "(min-width: 1024px) 24rem, (min-width: 640px) 45vw, 65vw",
  section: "(min-width: 1024px) 18rem, 40vw",
  card: "(min-width: 640px) 10rem, 35vw",
};

/**
 * Renders a ZEDLEVEL family character (optimized WebP via scripts/optimize-images.mjs).
 * Arabic alt text comes from config/characters.json.
 * Rules: max ONE mascot per viewport; never behind text (CONTENT.md / build spec §4).
 */
export function Mascot({
  name,
  size = "section",
  className = "",
  priority = false,
}: {
  name: CharacterName;
  size?: MascotSize;
  className?: string;
  priority?: boolean;
}) {
  const entry = (manifest.characters as Record<string, ManifestEntry>)[name]
    ?.sizes[size];
  if (!entry) return null;
  return (
    <Image
      src={entry.src}
      width={entry.width}
      height={entry.height}
      alt={meta[name].alt}
      sizes={SIZES_ATTR[size]}
      priority={priority}
      className={className}
    />
  );
}
