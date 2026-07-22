import type { MetadataRoute } from "next";
import { SITE_URL } from "@/config/site";

export const dynamic = "force-static";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

// /privacy не включён намеренно: страница политики конфиденциальности —
// юридический документ, не релевантный для поискового индексирования.
// Google не ранжирует privacy-страницы, а их включение в sitemap
// может размыть сигнал релевантности других страниц.
const routes = [
  { path: "", priority: 1.0 },
  { path: "/about", priority: 0.7 },
  { path: "/franchise", priority: 0.9 },
  { path: "/collection", priority: 0.6 },
  { path: "/stores", priority: 0.7 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ path, priority }) => ({
    url: `${SITE_URL}${basePath}${path}/`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority,
  }));
}
