import type { Metadata } from "next";
import StoresContent from "./StoresContent";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://diversebrand.ru";

export const metadata: Metadata = {
  title: "Магазины Diverse в России и Казахстане — адреса и контакты",
  description:
    "11 магазинов Diverse в 10 городах. Россия: Калининград, Уфа, Сургут, Красноярск, Симферополь, Якутск, Саратов. Казахстан: Алматы, Щучинск.",
  openGraph: {
    title: "Магазины Diverse — адреса в РФ и Казахстане",
    description: "11 магазинов в 10 городах. От Калининграда до Якутска и Алматы. Работаем по всей стране.",
    images: [{ url: `${basePath}/images/stores/kaliningrad.jpg`, width: 1200, height: 800 }],
  },
    twitter: {
    card: "summary_large_image",
    title: "Адреса магазинов Diverse",
    description: "11 магазинов в России и Казахстане: Калининград, Уфа, Красноярск, Сургут, Алматы и другие города.",
    images: [`${basePath}/images/stores/kaliningrad.jpg`],
  },
  alternates: {
    canonical: `${siteUrl}${basePath}/stores/`,
  },
};

export default function Page() {
  return <StoresContent />;
}
