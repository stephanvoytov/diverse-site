import type { Metadata } from "next";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "О бренде Diverse — история, философия, три линии",
  description:
    "Польский бренд Diverse основан в 1993 году. 30+ лет, 400+ магазинов, партнёр Dakar Rally и 24h Le Mans. Три линии: Diverse, DEXT, Coalition.",
  openGraph: {
    title: "О бренде Diverse",
    description: "30+ лет истории. От Гданьска до Нью-Йорка. Философия Generation to Generation.",
    images: [{ url: "/images/diverse.avif", width: 1200, height: 800 }],
  },
};

export default function Page() {
  return <AboutContent />;
}
