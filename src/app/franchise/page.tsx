import type { Metadata } from "next";
import { readFileSync } from "fs";
import { join } from "path";
import FranchiseContent from "./FranchiseContent";
import JsonLd from "@/components/shared/JsonLd";
import { formatCards } from "@/data/formats";
import { SITE_URL } from "@/config/site";
import { getTinaQuery, type TinaResult } from "@/lib/tina-queries";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const metadata: Metadata = {
  title: "Франшиза одежды Diverse — условия и форматы открытия",
  description:
    "Откройте магазин европейского бренда Diverse по франшизе. 5 форматов, без взноса и роялти, проекты бесплатно. Более 350 магазинов в 10 странах и собственное производство.",
  openGraph: {
    title: "Франшиза одежды Diverse — условия и форматы открытия",
    description:
      "Откройте магазин европейского бренда Diverse по франшизе. 5 форматов, без взноса и роялти, проекты бесплатно.",
    url: `${SITE_URL}${basePath}/franchise/`,
    siteName: "Diverse Россия",
    locale: "ru_RU",
    type: "website",
    images: [{ url: `${basePath}/images/hero/main.jpg`, width: 1920, height: 1080 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Франшиза одежды Diverse — условия и форматы открытия",
    description:
      "Откройте магазин европейского бренда Diverse по франшизе. 5 форматов, без взноса и роялти, проекты бесплатно. Полное сопровождение 24/7.",
    images: [`${basePath}/images/hero/main.jpg`],
  },
  keywords: [
    "франшиза одежды",
    "открыть магазин одежды по франшизе",
    "франшиза Diverse",
    "бизнес по франшизе",
    "сколько стоит франшиза",
    "паушальный взнос 0", "роялти 0%",
  ],
  alternates: {
    canonical: `${SITE_URL}${basePath}/franchise/`,
  },
};

function readTinaFile<T>(collection: string, file: string): TinaResult<T> | null {
  try {
    const content = JSON.parse(readFileSync(join(process.cwd(), "content", collection, file), "utf-8"));
    const { query, variables } = getTinaQuery(collection, file);
    return { data: { [collection]: content }, query, variables };
  } catch {
    return null;
  }
}

export default async function Page() {
  const hero = readTinaFile("franchise", "hero.json");
  const plans = readTinaFile("franchise", "plans.json");
  const comparison = readTinaFile("franchise", "comparison.json");
  const financial = readTinaFile("franchise", "financial.json");
  const benefits = readTinaFile("franchise", "benefits.json");
  const gallery = readTinaFile("franchise", "gallery.json");
  const contact = readTinaFile("franchise", "contact.json");
  const faq = readTinaFile("franchise", "faq.json");

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    name: "Навигационная цепочка",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: SITE_URL + basePath },
      { "@type": "ListItem", position: 2, name: "Франшиза", item: `${SITE_URL}${basePath}/franchise/` },
    ],
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@graph": formatCards.map((format) => ({
      "@type": "Product",
      name: `Франшиза Diverse — ${format.name}`,
      description: `${format.tagline}. ${format.revenue}. Площадь: ${format.area}. 0 ₽ паушальный взнос, 0% роялти.`,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "RUB",
        priceSpecification: {
          "@type": "PriceSpecification",
          price: "0",
          priceCurrency: "RUB",
          description: "Паушальный взнос",
        },
      },
    })),
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={productSchema} />
      <FranchiseContent
        hero={hero}
        plans={plans}
        comparison={comparison}
        financial={financial}
        benefits={benefits}
        gallery={gallery}
        contact={contact}
        faq={faq}
      />
    </>
  );
}