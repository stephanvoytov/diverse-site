import type { Metadata } from "next";
import AboutContent from "./AboutContent";
import JsonLd from "@/components/shared/JsonLd";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://diversebrand.ru";

export const metadata: Metadata = {
  title: "О бренде Diverse — история, коллекции и философия",
  description:
    "Diverse — польский бренд одежды с 30-летней историей. Более 400 магазинов в 9 странах, партнёр Dakar Rally. Коллекции, направления и факты о бренде.",
  openGraph: {
    title: "О бренде Diverse — история, коллекции и философия",
    description: "Diverse — польский бренд одежды с 30-летней историей. Более 400 магазинов в 9 странах, партнёр Dakar Rally.",
    url: `${siteUrl}${basePath}/about/`,
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
