import Header from "@/components/shared/Header";
import Hero from "@/components/blocks/Hero";
import About from "@/components/blocks/About";
import Franchise from "@/components/blocks/Franchise";
import Roadmap from "@/components/blocks/Roadmap";
import Faq from "@/components/blocks/Faq";
import StoresMap from "@/components/shared/StoresMap";
import Contacts from "@/components/blocks/Contacts";
import Footer from "@/components/shared/Footer";
import JsonLd from "@/components/shared/JsonLd";
import { faqItems } from "@/data/franchise";

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
      <JsonLd data={faqSchema} />
      <Header />
      <main>
        <Hero />
        <About />
        <Franchise />
        <Roadmap />
        <Faq />
        <StoresMap />
        <Contacts />
      </main>
      <Footer />
    </>
  );
}
