import type { Metadata } from "next";
import StoresContent from "./StoresContent";
import JsonLd from "@/components/shared/JsonLd";
import { stores } from "@/data/stores";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://diversebrand.ru";

export const metadata: Metadata = {
  title: "Магазины Diverse — адреса, города и контакты",
  description:
    "Найдите магазин Diverse в вашем городе: 11 точек в России и Казахстане. Адреса, контакты и часы работы.",
  openGraph: {
    title: "Магазины Diverse — адреса, города и контакты",
    description: "Найдите магазин Diverse в вашем городе: 11 точек в России и Казахстане. Адреса и контакты.",
    url: `${siteUrl}${basePath}/stores/`,
    siteName: "Diverse Россия",
    locale: "ru_RU",
    type: "website",
    images: [{ url: `${basePath}/images/stores/kaliningrad.jpg`, width: 1200, height: 800 }],
  },
    twitter: {
    card: "summary_large_image",
    title: "Магазины Diverse — адреса, города и контакты",
    description: "Найдите магазин Diverse в вашем городе: 11 точек в России и Казахстане. Адреса и контакты.",
    images: [`${basePath}/images/stores/kaliningrad.jpg`],
  },
  alternates: {
    canonical: `${siteUrl}${basePath}/stores/`,
  },
};

export default function Page() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    name: "Навигационная цепочка",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: siteUrl + basePath },
      { "@type": "ListItem", position: 2, name: "Магазины", item: `${siteUrl}${basePath}/stores/` },
    ],
  };

  const storesSchema = {
    "@context": "https://schema.org",
    "@graph": stores.map((store) => ({
      "@type": "Store",
      name: `Diverse — ${store.city}`,
      description: `Магазин одежды Diverse в ${store.mall || store.address}, ${store.city}`,
      address: {
        "@type": "PostalAddress",
        addressLocality: store.city,
        streetAddress: store.mall || store.address,
        addressCountry: store.country === "Россия" ? "RU" : "KZ",
      },
      parentOrganization: {
        "@type": "Organization",
        name: "Diverse Россия",
        url: siteUrl,
      },
    })),
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={storesSchema} />
      <StoresContent />
    </>
  );
}
