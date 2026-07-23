import type { Metadata } from "next";
import { client } from "../../../tina/__generated__/client";
import StoresContent from "./StoresContent";
import JsonLd from "@/components/shared/JsonLd";
import { stores } from "@/data/stores";
import { SITE_URL } from "@/config/site";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const metadata: Metadata = {
  title: "Магазины Diverse — адреса, города и контакты",
  description:
    "Найдите магазин Diverse в вашем городе: 11 точек в России и Казахстане. Адреса, контакты и часы работы.",
  openGraph: {
    title: "Магазины Diverse — адреса, города и контакты",
    description: "Найдите магазин Diverse в вашем городе: 11 точек в России и Казахстане. Адреса и контакты.",
    url: `${SITE_URL}${basePath}/stores/`,
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
    canonical: `${SITE_URL}${basePath}/stores/`,
  },
};

export default async function Page() {
  let storesResult = null;
  try {
    storesResult = await client.queries.pageStores({ relativePath: "stores.json" });
  } catch (e) {
    console.warn("TinaCMS query failed for /stores, using fallback", e);
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    name: "Навигационная цепочка",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: SITE_URL + basePath },
      { "@type": "ListItem", position: 2, name: "Магазины", item: `${SITE_URL}${basePath}/stores/` },
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
        url: SITE_URL,
      },
    })),
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={storesSchema} />
      <StoresContent data={storesResult} />
    </>
  );
}