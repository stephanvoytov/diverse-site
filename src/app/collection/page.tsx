import type { Metadata } from "next";
import CollectionContent from "./CollectionContent";

export const metadata: Metadata = {
  title: "Коллекции | Diverse",
  description:
    "Коллекции Diverse: DENIM, DEXT, 24H Le Mans, DEXT TECH II, Coalition, EVO Series, OPEN, Athletics. От флагманской линии до технологичной экипировки.",
  openGraph: {
    title: "Коллекции Diverse",
    description:
      "DENIM, DEXT, 24H Le Mans, Coalition, EVO Series, OPEN, Athletics — каждая коллекция рассказывает свою историю.",
  },
};

export default function CollectionPage() {
  return <CollectionContent />;
}
