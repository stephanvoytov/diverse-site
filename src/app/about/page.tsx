import type { Metadata } from "next";
import AboutContent from "./AboutContent";
import JsonLd from "@/components/shared/JsonLd";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://diversebrand.ru";

export const metadata: Metadata = {
  title: "О бренде Diverse — история, философия, три линии",
  description:
    "Польский бренд Diverse основан в 1993 году. 30+ лет, 400+ магазинов, партнёр Dakar Rally и 24h Le Mans. Три линии: Diverse, DEXT, Coalition.",
  openGraph: {
    title: "Diverse — история бренда",
    description: "30 лет. От Гданьска до мировых столиц моды. Философия Generation to Generation.",
    url: `${siteUrl}${basePath}/about/`,
    siteName: "Diverse Россия",
    locale: "ru_RU",
    type: "website",
    images: [{ url: `${basePath}/images/about/diverse.jpg`, width: 1200, height: 800 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "О бренде Diverse",
    description: "Создан в 1993 году в Гданьске. Сегодня — 400+ магазинов в 9+ странах и партнёр Dakar Rally.",
    images: [`${basePath}/images/about/diverse.jpg`],
  },
  alternates: {
    canonical: `${siteUrl}${basePath}/about/`,
  },
};

export default function Page() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    name: "Навигационная цепочка",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: siteUrl + basePath },
      { "@type": "ListItem", position: 2, name: "О бренде", item: `${siteUrl}${basePath}/about/` },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <AboutContent />
    </>
  );
}
