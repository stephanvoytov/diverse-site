import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ModalProvider } from "@/lib/modal-context";
import ContactModal from "@/components/shared/ContactModal";
import StickyCta from "@/components/shared/StickyCta";
import TelegramFloat from "@/components/shared/TelegramFloat";
import JsonLd from "@/components/shared/JsonLd";

const ymId = process.env.NEXT_PUBLIC_YM_ID || "";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://diversebrand.ru";

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
    title: "Франшиза Diverse в России",
    description:
      "Официальный представитель бренда Diverse в РФ и СНГ. 30+ лет, 400+ магазинов, партнёр Dakar Rally.",
    images: [`${basePath}/images/hero.webp`],
  },
  openGraph: {
    title: "Франшиза Diverse в России",
    description:
      "Официальный представитель бренда Diverse в РФ и СНГ. 30+ лет, 400+ магазинов, партнёр Dakar Rally.",
    locale: "ru_RU",
    type: "website",
    images: [
      {
        url: `${basePath}/images/hero.webp`,
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
  name: "Diverse Russia",
  legalName: "ООО «ХАУС»",
  description: "Официальный представитель бренда Diverse в России и СНГ",
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
    telephone: "+7-906-237-35-61",
    contactType: "sales",
    email: "diverserussia@yandex.ru",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={inter.variable} data-scroll-behavior="smooth">
      <body>
        <JsonLd data={organizationSchema} />
        <ModalProvider>
          {children}
          <ContactModal />
          <StickyCta />
          <TelegramFloat />
        </ModalProvider>

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
        <noscript>
          <div>
            <img src="https://mc.yandex.ru/watch/${ymId}" style={{position:"absolute",left:-9999}} alt="" />
          </div>
        </noscript>
      </body>
    </html>
  );
}
