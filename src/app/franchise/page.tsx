import type { Metadata } from "next";
import FranchiseContent from "./FranchiseContent";
import JsonLd from "@/components/shared/JsonLd";
import { formatCards } from "@/data/formats";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://diversebrand.ru";

export const metadata: Metadata = {
  title: "Франшиза одежды Diverse — условия открытия, стоимость, 3 формата",
  description:
    "Франшиза брендов одежды Diverse: 3 формата — POP-UP STORE от 800 тыс ₽, реновация и полный стандарт от 3 млн ₽. Паушальный взнос 0₽, роялти 0%. Дизайн-проект, товарный запас и обучение. Открыть магазин одежды по франшизе.",
  openGraph: {
    title: "Франшиза одежды Diverse — условия и стоимость",
    description:
      "Франшиза магазина одежды Diverse: 3 формата, 0₽ взнос, 0% роялти. 11 магазинов уже работают в РФ и Казахстане.",
    url: `${siteUrl}${basePath}/franchise/`,
    siteName: "Diverse Россия",
    locale: "ru_RU",
    type: "website",
    images: [{ url: `${basePath}/images/hero/main.jpg`, width: 1920, height: 1080 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Франшиза одежды Diverse — условия открытия",
    description:
      "3 формата: POP-UP STORE от 800 тыс ₽, реновация и полный стандарт. Без паушального взноса и роялти. Полное сопровождение 24/7.",
    images: [`${basePath}/images/hero/main.jpg`],
  },
  keywords: [
    "франшиза магазина одежды", "франшизы одежды",
    "открыть магазин одежды по франшизе",
    "франшиза брендов одежды", "франшиза женской одежды",
    "франшиза Diverse", "бизнес по франшизе",
    "франшизы для малого бизнеса", "топ франшиз",
    "рейтинг франшиз", "сколько стоит франшиза",
    "паушальный взнос 0", "роялти 0%",
    "франшиза в россии", "открыть франшизу",
  ],
  alternates: {
    canonical: `${siteUrl}${basePath}/franchise/`,
  },
};

export default function Page() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    name: "Навигационная цепочка",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: siteUrl + basePath },
      { "@type": "ListItem", position: 2, name: "Франшиза", item: `${siteUrl}${basePath}/franchise/` },
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
      <FranchiseContent />
    </>
  );
}
