import dynamic from "next/dynamic";
import Header from "@/components/shared/Header";
import Hero from "@/components/blocks/Hero";
import About from "@/components/blocks/About";
import KpRating from "@/components/blocks/KpRating";
import MarketBlock from "@/components/blocks/MarketBlock";
import Franchise from "@/components/blocks/Franchise";
import TrustModel from "@/components/blocks/TrustModel";
import Roadmap from "@/components/blocks/Roadmap";
import CaseStudies from "@/components/blocks/CaseStudies";
import Faq from "@/components/blocks/Faq";
import Contacts from "@/components/blocks/Contacts";
import Footer from "@/components/shared/Footer";
import FadeIn from "@/components/shared/FadeIn";
import JsonLd from "@/components/shared/JsonLd";
import { faqItems } from "@/data/franchise";
import { asset } from "@/lib/path";

const StoresMap = dynamic(() => import("@/components/shared/StoresMap"), {
  loading: () => (
    <div className="flex items-center justify-center h-[400px] bg-brand-gray-100 text-brand-gray-400 text-sm">
      Загрузка карты…
    </div>
  ),
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://diversebrand.ru";

export default function Home() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    name: "Навигационная цепочка",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: siteUrl + asset("/") },
    ],
  };

  return (
    <>
      {/* Prefetch ключевых страниц — браузер загрузит при простое сети */}
      <link rel="prefetch" href={asset("/about/")} />
      <link rel="prefetch" href={asset("/franchise/")} />
      <link rel="prefetch" href={asset("/collection/")} />
      <link rel="prefetch" href={asset("/stores/")} />
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />
      <Header />
      <main>
        <Hero />
        <FadeIn><About /></FadeIn>
        <FadeIn><KpRating /></FadeIn>
        <FadeIn><Franchise /></FadeIn>
        <FadeIn><MarketBlock /></FadeIn>
        <FadeIn><TrustModel /></FadeIn>
        <FadeIn><Roadmap /></FadeIn>
        <FadeIn margin><CaseStudies /></FadeIn>
        <FadeIn><StoresMap /></FadeIn>
        <FadeIn><Faq /></FadeIn>
        <FadeIn margin><Contacts /></FadeIn>
      </main>
      <Footer />
    </>
  );
}
