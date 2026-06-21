import dynamic from "next/dynamic";
import Header from "@/components/shared/Header";
import Hero from "@/components/blocks/Hero";
import About from "@/components/blocks/About";
import MarketBlock from "@/components/blocks/MarketBlock";
import Franchise from "@/components/blocks/Franchise";
import TrustModel from "@/components/blocks/TrustModel";
import Roadmap from "@/components/blocks/Roadmap";
import CaseStudies from "@/components/blocks/CaseStudies";
import Faq from "@/components/blocks/Faq";
import Contacts from "@/components/blocks/Contacts";
import Footer from "@/components/shared/Footer";
import JsonLd from "@/components/shared/JsonLd";
import { faqItems } from "@/data/franchise";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const StoresMap = dynamic(() => import("@/components/shared/StoresMap"), {
  loading: () => (
    <div className="flex items-center justify-center h-[400px] bg-brand-gray-100 text-brand-gray-400 text-sm">
      Загрузка карты…
    </div>
  ),
});

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

  return (
    <>
      {/* Prefetch ключевых страниц — браузер загрузит при простое сети */}
      <link rel="prefetch" href={`${basePath}/about/`} />
      <link rel="prefetch" href={`${basePath}/franchise/`} />
      <link rel="prefetch" href={`${basePath}/collection/`} />
      <link rel="prefetch" href={`${basePath}/stores/`} />
      <JsonLd data={faqSchema} />
      <Header />
      <main>
        <Hero />
        <About />
        <Franchise />
        <MarketBlock />
        <TrustModel />
        <Roadmap />
        <CaseStudies />
        <StoresMap />
        <Faq />
        <Contacts />
      </main>
      <Footer />
    </>
  );
}
