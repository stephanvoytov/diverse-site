import type { Metadata } from "next";
import FranchiseContent from "./FranchiseContent";
import JsonLd from "@/components/shared/JsonLd";
import { formatCards } from "@/data/formats";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://diversebrand.ru";

export const metadata: Metadata = {
  title: "Франшиза Diverse — откройте магазин в своём городе",
  description:
    "Три формата: остров от 800 000 ₽, реновация или полный стандарт. Дизайн-проект, товарный запас и обучение — всё включено.",
  openGraph: {
    title: "Франшиза Diverse — бизнес с европейским брендом",
    description:
      "Польский fashion-бренд с 30-летней историей ищет партнёров в РФ и СНГ. 11 магазинов уже работают.",
    url: `${siteUrl}${basePath}/franchise/`,
    siteName: "Diverse Россия",
    locale: "ru_RU",
    type: "website",
    images: [{ url: `${basePath}/images/hero/main.jpg`, width: 1920, height: 1080 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Франшиза Diverse — старт бизнеса",
    description:
      "Полное сопровождение 24/7. Без паушального взноса и роялти. От 800 000 ₽.",
    images: [`${basePath}/images/hero/main.jpg`],
  },
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
