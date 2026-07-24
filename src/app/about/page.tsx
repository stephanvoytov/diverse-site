import type { Metadata } from "next";
import { readFileSync } from "fs";
import { join } from "path";
import AboutContent from "./AboutContent";
import JsonLd from "@/components/shared/JsonLd";
import { SITE_URL } from "@/config/site";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const metadata: Metadata = {
  title: "О бренде Diverse — история, коллекции и философия",
  description:
    "Diverse — польский бренд одежды с 30-летней историей. Более 400 магазинов в 9 странах, партнёр Dakar Rally. Коллекции, направления и факты о бренде.",
  openGraph: {
    title: "О бренде Diverse — история, коллекции и философия",
    description: "Diverse — польский бренд одежды с 30-летней историей. Более 400 магазинов в 9 странах, партнёр Dakar Rally.",
    url: `${SITE_URL}${basePath}/about/`,
    siteName: "Diverse Россия",
    locale: "ru_RU",
    type: "website",
    images: [{ url: `${basePath}/images/about/diverse.jpg`, width: 1200, height: 800 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "О бренде Diverse — история, коллекции и философия",
    description: "Diverse — польский бренд одежды с 30-летней историей. Более 400 магазинов в 9 странах, партнёр Dakar Rally.",
    images: [`${basePath}/images/about/diverse.jpg`],
  },
  keywords: [
    "бренд Diverse", "польский бренд одежды",
    "DEXT", "Coalition",
    "Dakar Rally одежда",
  ],
  alternates: {
    canonical: `${SITE_URL}${basePath}/about/`,
  },
};

function readTinaFile<T>(collection: string, file: string): { data: Record<string, T>; query: string; variables: Record<string, unknown> } | null {
  try {
    const content = JSON.parse(readFileSync(join(process.cwd(), "content", collection, file), "utf-8"));
    return { data: { [collection]: content }, query: "", variables: {} };
  } catch {
    return null;
  }
}

export default async function Page() {
  const hero = readTinaFile("about", "hero.json");
  const stats = readTinaFile("about", "stats.json");
  const philosophy = readTinaFile("about", "philosophy.json");
  const advantages = readTinaFile("about", "advantages.json");
  const timeline = readTinaFile("about", "timeline.json");
  const representative = readTinaFile("about", "representative.json");
  const cta = readTinaFile("about", "cta.json");

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    name: "Навигационная цепочка",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: SITE_URL + basePath },
      { "@type": "ListItem", position: 2, name: "О бренде", item: `${SITE_URL}${basePath}/about/` },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <AboutContent
        hero={hero}
        stats={stats}
        philosophy={philosophy}
        advantages={advantages}
        timeline={timeline}
        representative={representative}
        cta={cta}
      />
    </>
  );
}