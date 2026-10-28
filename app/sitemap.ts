import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Add new pages and case studies here.
const ROUTES: { path: string; priority: number }[] = [
  { path: "", priority: 1 },
  { path: "/services", priority: 0.9 },
  { path: "/work", priority: 0.8 },
  { path: "/work/pos-sible", priority: 0.7 },
  { path: "/about", priority: 0.7 },
  { path: "/contact", priority: 0.8 },
  { path: "/standards", priority: 0.5 },
  { path: "/terms", priority: 0.3 },
  { path: "/privacy", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map(({ path, priority }) => ({ url: `${SITE_URL}${path}`, changeFrequency: "monthly", priority }));
}
