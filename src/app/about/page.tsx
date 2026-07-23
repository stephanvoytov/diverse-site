import type { Metadata } from "next";
import { client } from "../../../tina/__generated__/client";
import AboutContent from "./AboutContent";
import JsonLd from "@/components/shared/JsonLd";
import { SITE_URL } from "@/config/site";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const metadata: Metadata = {
  title: "О бренде Diverse — история, коллекции и философия",
  description:
    "Diverse — польский бренд одежды с 30-летней историей. Более 400 магазинов в 9 странах, партнёр Dakar Rally. Коллекции, направления и факты о бренде.",
  openGraph: {
    title: "О бренде Diverse — история, коллекции и философия",
    description: "Diverse — польский бренд одежды с 30-летней историей. Более 400 магазинов в 9 странах, партнёр Dakar Rally.",
    url: `${SITE_URL}${basePath}/about/`,
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
    canonical: `${SITE_URL}${basePath}/about/`,
  },
};

export default async function Page() {
  let aboutResult = null;
  try {
    aboutResult = await client.queries.pageAbout({ relativePath: "about.json" });
  } catch (e) {
    console.warn("TinaCMS query failed for /about, using fallback", e);
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    name: "Навигационная цепочка",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: SITE_URL + basePath },
      { "@type": "ListItem", position: 2, name: "О бренде", item: `${SITE_URL}${basePath}/about/` },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <AboutContent data={aboutResult} />
    </>
  );
}