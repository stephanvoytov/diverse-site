import type { Metadata } from "next";
import CollectionContent from "./CollectionContent";
import JsonLd from "@/components/shared/JsonLd";
import { SITE_URL } from "@/config/site";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const metadata: Metadata = {
  title: "Коллекции Diverse — одежда для города, спорта и путешествий",
  description:
    "Изучите коллекции Diverse: городской стиль, технологичные линии и одежда для активного образа жизни. Полная презентация бренда и его направлений.",
  openGraph: {
    title: "Коллекции Diverse — одежда для города, спорта и путешествий",
    description:
      "Изучите коллекции Diverse: городской стиль, технологичные линии и одежда для активного образа жизни.",
    url: `${SITE_URL}${basePath}/collection/`,
    siteName: "Diverse Россия",
    locale: "ru_RU",
    type: "website",
    images: [{ url: `${basePath}/images/diverse.avif`, width: 1200, height: 800 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Коллекции Diverse — одежда для города, спорта и путешествий",
    description:
      "Изучите коллекции Diverse: городской стиль, технологичные линии и одежда для активного образа жизни.",
    images: [`${basePath}/images/diverse.avif`],
  },
  keywords: [
    "коллекции Diverse", "Dakar одежда",
    "DEXT TECH", "бренд Diverse коллекции",
  ],
  alternates: {
    canonical: `${SITE_URL}${basePath}/collection/`,
  },
};

export default function CollectionPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    name: "Навигационная цепочка",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: SITE_URL + basePath },
      { "@type": "ListItem", position: 2, name: "Коллекции", item: `${SITE_URL}${basePath}/collection/` },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <CollectionContent />
    </>
  );
}
