import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Static export for GitHub Pages hosting (zedlevel.com).
   * Produces a fully static ./out/ that GitHub Pages can serve.
   */
  output: "export",
  images: {
    // GitHub Pages has no image-optimization server, so serve images as-is.
    unoptimized: true,
  },
  // emit /speaking-test/index.html etc. so folders resolve on static hosting
  trailingSlash: true,
};

export default nextConfig;
