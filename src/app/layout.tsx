import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ModalProvider } from "@/lib/modal-context";
import { UserCityProvider } from "@/lib/user-city-context";
import ContactModal from "@/components/shared/ContactModal";
import ContactFloating from "@/components/shared/ContactFloating";
import ExitIntentPopup from "@/components/shared/ExitIntentPopup";
import JsonLd from "@/components/shared/JsonLd";
import { CONTACTS, SITE } from "@/config/site";

const ymId = process.env.NEXT_PUBLIC_YM_ID || "";
const vkPixelId = process.env.NEXT_PUBLIC_VK_PIXEL_ID || "";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || SITE.url;

const inter = Inter({
  subsets: ["cyrillic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Франшиза Diverse — официальный представитель в России",
  description:
    "Франшиза культового польского бренда Diverse. 0₽ паушальный взнос, 0% роялти. 11 магазинов уже открыты. Станьте партнёром в своём городе.",
  icons: {
    icon: `${basePath}/favicon.ico`,
    shortcut: `${basePath}/favicon.ico`,
    apple: [
      { url: `${basePath}/apple-touch-icon.png`, sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: `${basePath}/site.webmanifest`,
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
    title: "Франшиза Diverse в РФ и СНГ",
    description:
      "Станьте партнёром культового польского бренда. Полное сопровождение 24/7 — от поиска помещения до открытия.",
    images: [`${basePath}/images/hero/main.jpg`],
  },
  openGraph: {
    title: "Франшиза Diverse",
    description:
      "Польский fashion-бренд с 30-летней историей. 400+ магазинов, партнёр Dakar Rally и 24h Le Mans. Три формата на выбор.",
    siteName: "Diverse Россия",
    locale: "ru_RU",
    type: "website",
    images: [
      {
        url: `${basePath}/images/hero/main.jpg`,
        width: 1920,
        height: 1080,
        alt: "Франшиза Diverse — официальный представитель в России",
      },
    ],
  },
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
    <html lang="ru" className={inter.variable} data-scroll-behavior="smooth">
      <body>
        {/* Preloads — начинаем загрузку до CSS/JS */}
        <link rel="preload" as="image" href={`${basePath}/brand/logo-light.svg`} />
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
          </ModalProvider>
        </UserCityProvider>

        {ymId && (
          <Script id="yandex-metrica" strategy="afterInteractive">
            {`
              (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
              (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

              ym(${ymId}, "init", {
                clickmap:true,
                trackLinks:true,
                accurateTrackBounce:true,
                webvisor:true
              });
            `}
          </Script>
        )}

        {vkPixelId && (
          <Script id="vk-pixel" strategy="afterInteractive">
            {`
              !function(){var t=document.createElement("script");t.type="text/javascript",t.async=!0,t.src="https://vk.com/js/api/openapi.js?169",t.onload=function(){VK.Retargeting.Init("${vkPixelId}"),VK.Retargeting.Hit()},document.head.appendChild(t)}();
            `}
          </Script>
        )}

        {ymId && (
          <noscript>
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`https://mc.yandex.ru/watch/${ymId}`} style={{position:"absolute",left:-9999}} alt="" />
            </div>
          </noscript>
        )}
      </body>
    </html>
  );
}
