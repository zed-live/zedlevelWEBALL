import type { MetadataRoute } from "next";

export const dynamic = "force-static";

/** Build-time robots.txt for the static export. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // internal draft route — keep it out of the index
        disallow: ["/speaking-test-new/"],
      },
    ],
    sitemap: "https://zedlevel.com/sitemap.xml",
  };
}
