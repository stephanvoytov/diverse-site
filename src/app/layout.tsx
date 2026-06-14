import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["cyrillic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://diversebrand.ru"),
  title: "Франшиза Diverse — официальный представитель в России",
  description:
    "Франшиза культового польского бренда Diverse. 0₽ паушальный взнос, 0% роялти. 11 магазинов уже открыты. Станьте партнёром в своём городе.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  appleWebApp: {
    title: "Diverse Russia",
    statusBarStyle: "black-translucent",
  },
  openGraph: {
    title: "Франшиза Diverse в России",
    description:
      "Официальный представитель бренда Diverse в РФ и СНГ. 30+ лет, 400+ магазинов, партнёр Dakar Rally.",
    locale: "ru_RU",
    type: "website",
    images: [
      {
        url: "/images/hero.jpg",
        width: 1920,
        height: 1080,
        alt: "Франшиза Diverse — официальный представитель в России",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
