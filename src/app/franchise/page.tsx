import type { Metadata } from "next";
import FranchiseContent from "./FranchiseContent";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://diversebrand.ru";

export const metadata: Metadata = {
  title: "Франшиза Diverse — откройте магазин в своём городе",
  description:
    "Три формата: остров от 800 000 ₽, реновация или полный стандарт. Дизайн-проект, товарный запас и обучение — всё включено.",
  openGraph: {
    title: "Франшиза Diverse — бизнес с европейским брендом",
    description:
      "Польский fashion-бренд с 30-летней историей ищет партнёров в РФ и СНГ. 11 магазинов уже работают.",
    images: [{ url: `${basePath}/images/hero/og.webp`, width: 1920, height: 1080 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Франшиза Diverse — старт бизнеса",
    description:
      "Полное сопровождение 24/7. Без паушального взноса и роялти. От 800 000 ₽.",
    images: [`${basePath}/images/hero/og.webp`],
  },
  alternates: {
    canonical: `${siteUrl}${basePath}/franchise/`,
  },
};

export default function Page() {
  return <FranchiseContent />;
}
