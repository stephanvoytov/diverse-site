import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL
  || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://diversebrand.ru");
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const routes = [
  { path: "", priority: 1.0 },
  { path: "/about", priority: 0.7 },
  { path: "/franchise", priority: 0.9 },
  { path: "/collection", priority: 0.6 },
  { path: "/stores", priority: 0.7 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ path, priority }) => ({
    url: `${baseUrl}${basePath}${path}/`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority,
  }));
}
