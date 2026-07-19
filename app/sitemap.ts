import type { MetadataRoute } from "next";

export const dynamic = "force-static";

/**
 * Build-time sitemap for the static export (served at /sitemap.xml).
 * Every indexable route, with trailing slashes to match `trailingSlash: true`.
 * /speaking-test-new is intentionally excluded (internal draft route).
 */
const BASE = "https://zedlevel.com";

const ROUTES: { path: string; priority: number }[] = [
  { path: "", priority: 1 },
  { path: "/courses", priority: 0.9 },
  { path: "/courses/foundation", priority: 0.9 },
  { path: "/courses/levels", priority: 0.9 },
  { path: "/courses/conversation", priority: 0.9 },
  { path: "/courses/accent", priority: 0.6 },
  { path: "/courses/kids", priority: 0.6 },
  { path: "/test", priority: 0.8 },
  { path: "/speaking-test", priority: 0.7 },
  { path: "/teachers", priority: 0.5 },
  { path: "/about", priority: 0.5 },
  { path: "/contact", priority: 0.5 },
  { path: "/blog", priority: 0.4 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.map(({ path, priority }) => ({
    url: `${BASE}${path}/`,
    lastModified,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority,
  }));
}
