import type { Metadata } from "next";
import StoresContent from "./StoresContent";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const metadata: Metadata = {
  title: "Магазины Diverse в России и Казахстане — адреса и контакты",
  description:
    "11 магазинов Diverse в 10 городах. Россия: Калининград, Уфа, Сургут, Красноярск, Симферополь, Якутск, Саратов. Казахстан: Алматы, Щучинск.",
  openGraph: {
    title: "Магазины Diverse — адреса партнёров",
    description: "11 магазинов в России и Казахстане. Найдите магазин в вашем городе.",
    images: [{ url: `${basePath}/images/stores/kaliningrad.jpg`, width: 1200, height: 800 }],
  },
};

export default function Page() {
  return <StoresContent />;
}
