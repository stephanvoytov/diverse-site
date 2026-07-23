import type { Metadata } from "next";
import { client } from "../../../tina/__generated__/client";
import FranchiseContent from "./FranchiseContent";
import JsonLd from "@/components/shared/JsonLd";
import { formatCards } from "@/data/formats";
import { SITE_URL } from "@/config/site";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const metadata: Metadata = {
  title: "Франшиза одежды Diverse — условия, стоимость и форматы открытия",
  description:
    "Откройте магазин европейского бренда Diverse по франшизе. 3 формата, старт от 800 тыс ₽, без взноса и роялти. Более 400 магазинов и собственное производство.",
  openGraph: {
    title: "Франшиза одежды Diverse — условия, стоимость и форматы открытия",
    description:
      "Откройте магазин европейского бренда Diverse по франшизе. 3 формата, старт от 800 тыс ₽, без взноса и роялти.",
    url: `${SITE_URL}${basePath}/franchise/`,
    siteName: "Diverse Россия",
    locale: "ru_RU",
    type: "website",
    images: [{ url: `${basePath}/images/hero/main.jpg`, width: 1920, height: 1080 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Франшиза одежды Diverse — условия, стоимость и форматы открытия",
    description:
      "Откройте магазин европейского бренда Diverse по франшизе. 3 формата, старт от 800 тыс ₽, без взноса и роялти. Полное сопровождение 24/7.",
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

export default async function Page() {
  const [hero, plans, comparison, financial, benefits, gallery, contact] =
    await Promise.allSettled([
      client.queries.franchise({ relativePath: "hero.json" }).catch(() => null),
      client.queries.franchise({ relativePath: "plans.json" }).catch(() => null),
      client.queries.franchise({ relativePath: "comparison.json" }).catch(() => null),
      client.queries.franchise({ relativePath: "financial.json" }).catch(() => null),
      client.queries.franchise({ relativePath: "benefits.json" }).catch(() => null),
      client.queries.franchise({ relativePath: "gallery.json" }).catch(() => null),
      client.queries.franchise({ relativePath: "contact.json" }).catch(() => null),
    ]);

  function getResult<T>(result: PromiseSettledResult<T | null>): T | null {
    return result.status === "fulfilled" ? result.value : null;
  }

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
        hero={getResult(hero)}
        plans={getResult(plans)}
        comparison={getResult(comparison)}
        financial={getResult(financial)}
        benefits={getResult(benefits)}
        gallery={getResult(gallery)}
        contact={getResult(contact)}
      />
    </>
  );
}