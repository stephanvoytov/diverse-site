import type { Metadata } from "next";
import CollectionContent from "./CollectionContent";
import JsonLd from "@/components/shared/JsonLd";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://diversebrand.ru";

export const metadata: Metadata = {
  title: "Коллекции одежды Diverse — от DENIM до DEXT TECH",
  description:
    "9 коллекций: Diverse, Dakar, DENIM, 24H Le Mans, DEXT, Coalition, EVO Series, OPEN, Athletics. От городской классики до технологичной экипировки для экстрима.",
  openGraph: {
    title: "Коллекции Diverse — каждая со своим характером",
    description:
      "От флагманской линии до официальной коллекции 24H Le Mans и технологичной DEXT TECH II.",
    url: `${siteUrl}${basePath}/collection/`,
    siteName: "Diverse Россия",
    locale: "ru_RU",
    type: "website",
    images: [{ url: `${basePath}/images/diverse.avif`, width: 1200, height: 800 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Коллекции Diverse",
    description:
      "9 коллекций: от Diverse и Dakar до DENIM и DEXT TECH — каждая со своим характером.",
    images: [`${basePath}/images/diverse.avif`],
  },
  keywords: [
    "коллекции Diverse", "Dakar одежда", "DENIM коллекция",
    "24H Le Mans одежда", "DEXT TECH",
    "бренд Diverse коллекции", "мужская одежда бренд",
    "польская одежда бренд",
  ],
  alternates: {
    canonical: `${siteUrl}${basePath}/collection/`,
  },
};

export default function CollectionPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    name: "Навигационная цепочка",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: siteUrl + basePath },
      { "@type": "ListItem", position: 2, name: "Коллекции", item: `${siteUrl}${basePath}/collection/` },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <CollectionContent />
    </>
  );
}
