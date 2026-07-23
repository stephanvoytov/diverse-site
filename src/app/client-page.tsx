"use client";

import { useTina } from "tinacms/dist/react";
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
import { SITE_URL } from "@/config/site";

const StoresMap = dynamic(() => import("@/components/shared/StoresMap"), {
  loading: () => (
    <div className="flex items-center justify-center h-[400px] bg-brand-gray-100 text-brand-gray-400 text-sm">
      Загрузка карты…
    </div>
  ),
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TinaData = Record<string, any>;

interface TinaResult {
  data: TinaData;
  query: string;
  variables: Record<string, unknown>;
}

interface ClientPageProps {
  blocks: Record<string, TinaResult | null>;
}

const EMPTY: TinaResult = { data: {}, query: "", variables: {} };

export default function ClientPage({ blocks }: ClientPageProps) {
  const hero = useTina(blocks.hero ?? EMPTY);
  const about = useTina(blocks.about ?? EMPTY);
  const kpRating = useTina(blocks.kpRating ?? EMPTY);
  const franchise = useTina(blocks.franchise ?? EMPTY);
  const marketBlock = useTina(blocks.marketBlock ?? EMPTY);
  const trustModel = useTina(blocks.trustModel ?? EMPTY);
  const roadmap = useTina(blocks.roadmap ?? EMPTY);
  const caseStudies = useTina(blocks.caseStudies ?? EMPTY);
  const faq = useTina(blocks.faq ?? EMPTY);
  const contacts = useTina(blocks.contacts ?? EMPTY);
  const stores = useTina(blocks.stores ?? EMPTY);

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
      { "@type": "ListItem", position: 1, name: "Главная", item: SITE_URL + asset("/") },
    ],
  };

  return (
    <>
      <link rel="prefetch" href={asset("/about/")} />
      <link rel="prefetch" href={asset("/franchise/")} />
      <link rel="prefetch" href={asset("/collection/")} />
      <link rel="prefetch" href={asset("/stores/")} />
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />
      <Header />
      <main>
        <Hero data={hero?.data?.home} />
        <FadeIn><About data={about?.data?.home} /></FadeIn>
        <FadeIn><KpRating data={kpRating?.data?.home} /></FadeIn>
        <FadeIn><Franchise data={franchise?.data?.home} /></FadeIn>
        <FadeIn><MarketBlock data={marketBlock?.data?.home} /></FadeIn>
        <FadeIn><TrustModel data={trustModel?.data?.home} /></FadeIn>
        <FadeIn><Roadmap data={roadmap?.data?.home} /></FadeIn>
        <FadeIn margin><CaseStudies data={caseStudies?.data?.home} /></FadeIn>
        <FadeIn><StoresMap data={stores?.data?.home} /></FadeIn>
        <FadeIn><Faq data={faq?.data?.home} /></FadeIn>
        <FadeIn margin><Contacts data={contacts?.data?.home} /></FadeIn>
      </main>
      <Footer />
    </>
  );
}