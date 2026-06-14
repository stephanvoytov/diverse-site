import type { Metadata } from "next";
import CollectionContent from "./CollectionContent";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const metadata: Metadata = {
  title: "Коллекции | Diverse",
  description:
    "Коллекции Diverse: DENIM, DEXT, 24H Le Mans, DEXT TECH II, Coalition, EVO Series, OPEN, Athletics. От флагманской линии до технологичной экипировки.",
  openGraph: {
    title: "Коллекции Diverse",
    description:
      "DENIM, DEXT, 24H Le Mans, Coalition, EVO Series, OPEN, Athletics — каждая коллекция рассказывает свою историю.",
    images: [{ url: `${basePath}/images/diverse.avif`, width: 1200, height: 800 }],
  },
};

export default function CollectionPage() {
  return <CollectionContent />;
}
