import type { Metadata } from "next";
import AboutContent from "./AboutContent";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://diversebrand.ru";

export const metadata: Metadata = {
  title: "О бренде Diverse — история, философия, три линии",
  description:
    "Польский бренд Diverse основан в 1993 году. 30+ лет, 400+ магазинов, партнёр Dakar Rally и 24h Le Mans. Три линии: Diverse, DEXT, Coalition.",
  openGraph: {
    title: "Diverse — история бренда",
    description: "30 лет. От Гданьска до мировых столиц моды. Философия Generation to Generation.",
    images: [{ url: `${basePath}/images/diverse.avif`, width: 1200, height: 800 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "О бренде Diverse",
    description: "Создан в 1993 году в Гданьске. Сегодня — 400+ магазинов в 20+ странах и партнёр Dakar Rally.",
    images: [`${basePath}/images/diverse.avif`],
  },
  alternates: {
    canonical: `${siteUrl}${basePath}/about/`,
  },
};

export default function Page() {
  return <AboutContent />;
}
