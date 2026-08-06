import type { Metadata } from "next";
import "./globals.css";
import { ModalProvider } from "@/lib/modal-context";
import { UserCityProvider } from "@/lib/user-city-context";
import ContactModal from "@/components/shared/ContactModal";
import ContactFloating from "@/components/shared/ContactFloating";
import ExitIntentPopup from "@/components/shared/ExitIntentPopup";
import AnalyticsConsent from "@/components/shared/AnalyticsConsent";
import JsonLd from "@/components/shared/JsonLd";
import { asset } from "@/lib/path";
import { CONTACTS, SITE, SITE_URL } from "@/config/site";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const siteUrl = SITE_URL;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Франшиза одежды Diverse — открыть магазин без взноса и роялти",
  description:
    "Европейский бренд одежды Diverse: 5 форматов франшизы, старт от 800 тыс ₽, без паушального взноса и роялти. Более 350 магазинов в 10 странах. Узнайте условия.",
  icons: {
    icon: [
      { url: asset("/favicon-96x96.png"), sizes: "96x96", type: "image/png" },
      { url: asset("/favicon.ico"), sizes: "any" },
    ],
    shortcut: asset("/favicon.ico"),
    apple: [
      { url: asset("/apple-touch-icon.png"), sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: asset("/site.webmanifest"),
  verification: {
    google: "8eXeN44ZaQUhjbkHLQnGVvGGpuwkewh5SftUgjeFzCM",
  },
  appleWebApp: {
    title: "Diverse Russia",
    statusBarStyle: "black-translucent",
  },
  robots: {
    index: true,
    follow: true,
  },
  twitter: {
    card: "summary_large_image",
    title: "Франшиза одежды Diverse — открыть магазин без взноса и роялти",
    description:
      "Франшиза одежды Diverse: 5 форматов, старт от 800 тыс ₽, без паушального взноса и роялти. Полное сопровождение 24/7.",
    images: [asset("/images/hero/main.jpg")],
  },
  openGraph: {
    title: "Франшиза одежды Diverse — открыть магазин без взноса и роялти",
    description:
      "Франшиза одежды Diverse: 5 форматов, старт от 800 тыс ₽, без паушального взноса и роялти. Полное сопровождение 24/7.",
    url: `${siteUrl}${basePath}/`,
    siteName: "Diverse Россия",
    locale: "ru_RU",
    type: "website",
    images: [
      {
        url: asset("/images/hero/main.jpg"),
        width: 1920,
        height: 1080,
        alt: "Франшиза Diverse — официальный представитель в России",
      },
    ],
  },
  keywords: [
    "франшиза одежды", "франшиза магазина одежды",
    "франшиза Diverse",
    "открыть магазин одежды по франшизе",
    "бизнес по франшизе",
    "паушальный взнос 0", "роялти 0%",
  ],
  alternates: {
    canonical: `${siteUrl}${basePath}/`,
  },
  other: {
    "theme-color": "#000000",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Diverse Россия",
  legalName: SITE.company,
  description: "Официальный представитель бренда в России и СНГ",
  url: siteUrl + basePath,
  logo: `${siteUrl}${basePath}/apple-touch-icon.png`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "пл. Победы, 4, оф. 210",
    addressLocality: "Калининград",
    addressRegion: "Калининградская область",
    postalCode: "236022",
    addressCountry: "RU",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: CONTACTS.phoneRaw,
    contactType: "sales",
    email: CONTACTS.email,
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Франшиза Diverse в России",
  url: siteUrl + basePath,
  description: "Официальный представитель бренда Diverse в РФ и СНГ. Франшиза культового польского бренда.",
  inLanguage: "ru",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" data-scroll-behavior="smooth">
      <body>
        {/* Preloads — начинаем загрузку до CSS/JS */}
        <link rel="preload" as="image" href={asset("/brand/logo-light.svg")} />
        <link rel="preconnect" href="https://tile.openstreetmap.org" />
        <link rel="dns-prefetch" href="https://tile.openstreetmap.org" />

        {/* Hero entrance animation — inline чтобы работала сразу, без ожидания CSS файла */}
        <style>{`
          @keyframes hero-fade-up { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes hero-fade-lg { from { opacity: 0; transform: translateY(25px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes hero-fade-in { from { opacity: 0; } to { opacity: 1; } }
          .hero-a { animation: hero-fade-up 0.6s ease-out forwards; }
          .hero-a-lg { animation: hero-fade-lg 0.7s ease-out forwards; }
          .hero-a-in { animation: hero-fade-in 0.7s ease-out forwards; }
          @media (prefers-reduced-motion: reduce) { .hero-a, .hero-a-lg, .hero-a-in { animation: none; opacity: 1; } }
        `}</style>
        <JsonLd data={organizationSchema} />
        <JsonLd data={websiteSchema} />
        <UserCityProvider>
          <ModalProvider>
            {children}
            <ContactModal />
            <ContactFloating />
            <ExitIntentPopup />
            <AnalyticsConsent />
          </ModalProvider>
        </UserCityProvider>
      </body>
    </html>
  );
}
