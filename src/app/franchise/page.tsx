import type { Metadata } from "next";
import FranchiseContent from "./FranchiseContent";

export const metadata: Metadata = {
  title: "Франшиза Diverse — 0₽ паушальный взнос, 0% роялти",
  description:
    "Откройте магазин культового польского бренда. 0₽ взнос, 0% роялти, от 800 000 ₽ инвестиций. Полное сопровождение 24/7. 11 магазинов уже работают в РФ и Казахстане.",
  openGraph: {
    title: "Франшиза Diverse — условия и преимущества",
    description:
      "Три варианта: торговый остров, реновация или полный стандарт. Европейский бренд с 30-летней историей.",
    images: [{ url: "/images/hero.jpg", width: 1920, height: 1080 }],
  },
};

export default function Page() {
  return <FranchiseContent />;
}
