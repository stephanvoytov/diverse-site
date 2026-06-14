import Header from "@/components/shared/Header";
import Hero from "@/components/blocks/Hero";
import About from "@/components/blocks/About";
import Franchise from "@/components/blocks/Franchise";
import Roadmap from "@/components/blocks/Roadmap";
import Faq from "@/components/blocks/Faq";
import StoresMap from "@/components/shared/StoresMap";
import Contacts from "@/components/blocks/Contacts";
import Footer from "@/components/shared/Footer";

export default function Home() {
  return (
    <>
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
