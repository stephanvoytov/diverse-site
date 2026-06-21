import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://diversebrand.ru");

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: ["/privacy/"],
      },
      {
        userAgent: "ClaudeBot",
        allow: "/",
        disallow: ["/privacy/"],
      },
      {
        userAgent: "Claude-Web",
        allow: "/",
        disallow: ["/privacy/"],
      },
      {
        userAgent: "CCBot",
        allow: "/",
        disallow: ["/privacy/"],
      },
      {
        userAgent: "Applebot",
        allow: "/",
        disallow: ["/privacy/"],
      },
      {
        userAgent: "GoogleExtended",
        allow: "/",
        disallow: ["/privacy/"],
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: ["/privacy/"],
      },
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/privacy/"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
