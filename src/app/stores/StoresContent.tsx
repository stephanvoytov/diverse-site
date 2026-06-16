"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { useModal } from "@/lib/modal-context";
import { useUserCity } from "@/lib/user-city-context";
import { stores } from "@/data/stores";
import { asset } from "@/lib/path";

const russianStores = stores.filter((s) => s.country === "Россия");
const kzStores = stores.filter((s) => s.country === "Казахстан");

export default function StoresContent() {
  const { open: openModal } = useModal();
  const { city } = useUserCity();
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section data-header="dark" className="relative bg-brand-black pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
          <div className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
          <div className="container-brand relative z-10 text-center">
            <motion.p
              className="text-xs tracking-[0.3em] uppercase text-brand-gray-300 mb-4"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Магазины
            </motion.p>
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Партнёрская сеть <span className="text-brand-accent">ООО «ХАУС»</span>
            </motion.h1>
            <motion.p
              className="text-base md:text-lg text-white/60 max-w-xl mx-auto mb-10"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              11 магазинов Diverse в 10 городах России и Казахстана
            </motion.p>

            <motion.div
              className="flex justify-center gap-8 md:gap-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-white">11</p>
                <p className="text-xs tracking-[0.15em] uppercase text-white/50 mt-1">Магазинов</p>
              </div>
              <div className="w-px bg-white/15" />
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-brand-accent">10</p>
                <p className="text-xs tracking-[0.15em] uppercase text-white/50 mt-1">Городов</p>
              </div>
              <div className="w-px bg-white/15" />
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-white">2</p>
                <p className="text-xs tracking-[0.15em] uppercase text-white/50 mt-1">Страны</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Store grid */}
        <section data-header="light" className="bg-white py-20 md:py-28">
          <div className="container-brand">
            <motion.div
              className="text-center mb-14"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-xs tracking-[0.3em] uppercase text-brand-gray-400 mb-4">Адреса</p>
              <h2 className="text-3xl md:text-5xl font-bold text-brand-black leading-[1.1] mb-4">
                Все магазины <span className="text-brand-accent">Diverse</span>
              </h2>
              <p className="text-base md:text-lg text-brand-gray-400 max-w-xl mx-auto">
                От Калининграда до Якутска и Алматы
              </p>
            </motion.div>

            {/* Россия */}
            <div className="mb-14">
              <h3 className="text-xl font-bold text-brand-black mb-6 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-brand-accent" />
                Россия
                <span className="text-sm font-normal text-brand-gray-400">({russianStores.length} магазинов)</span>
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {russianStores.map((store, i) => (
                  <StoreCard key={`ru-${i}`} store={store} index={i} />
                ))}
              </div>
            </div>

            {/* Казахстан */}
            <div>
              <h3 className="text-xl font-bold text-brand-black mb-6 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-brand-accent" />
                Казахстан
                <span className="text-sm font-normal text-brand-gray-400">({kzStores.length} магазина)</span>
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {kzStores.map((store, i) => (
                  <StoreCard key={`kz-${i}`} store={store} index={i} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section data-header="dark" className="bg-brand-black py-16 md:py-20 text-center">
          <div className="container-brand">
            <motion.h2
              className="text-3xl md:text-5xl font-bold text-white leading-[1.1] mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {city ? `Нет магазина в ${city}?` : "Нет магазина в вашем городе?"}
            </motion.h2>
            <motion.p
              className="text-base md:text-lg text-white/60 max-w-xl mx-auto mb-8"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              {city
                ? `Откройте Diverse по франшизе — станьте первым в ${city}`
                : "Откройте его по франшизе — станьте первым в своём городе"}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <button
                onClick={openModal}
                className="inline-flex items-center justify-center px-8 py-4 text-sm tracking-[0.2em] font-semibold uppercase text-white bg-brand-accent hover:bg-brand-accent-hover transition-all duration-300 rounded-sm cursor-pointer"
              >
                Стать партнёром
              </button>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

/* ——— Store card ——— */

function StoreCard({ store, index }: { store: (typeof stores)[0]; index: number }) {
  const [imgFailed, setImgFailed] = useState(false);
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: (index % 6) * 0.06 }}
      className="group rounded-sm overflow-hidden bg-brand-gray-100 border border-brand-gray-200 hover:border-brand-gray-300 transition-all duration-300"
    >
      <div className="aspect-[4/3] bg-brand-gray-200 overflow-hidden">
        {imgFailed ? (
          <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-brand-accent bg-brand-gray-100">
            {store.city[0]}
          </div>
        ) : (
          <Image
            src={asset(store.photo)}
            alt={`${store.city} — ${store.mall || store.address}`}
            width={400}
            height={300}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
            onError={() => setImgFailed(true)}
          />
        )}
      </div>
      <div className="p-4 md:p-5">
        <p className="text-base font-bold text-brand-black mb-1">{store.city}</p>
        {store.mall && (
          <p className="text-xs font-semibold text-brand-accent mb-1">{store.mall.replace(/[«»]/g, "")}</p>
        )}
        <p className="text-xs text-brand-gray-400">{store.address}</p>
      </div>
    </motion.article>
  );
}
