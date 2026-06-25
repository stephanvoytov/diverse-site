"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { asset } from "@/lib/path";
import SectionHeader from "@/components/shared/SectionHeader";

const easeOut: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

export default function KpRating() {
  return (
    <section data-header="light" className="bg-brand-gray-100 py-16 md:py-24">
      <div className="container-brand">
        <SectionHeader
          eyebrow="Экспертная оценка"
          desc="Независимый рейтинг крупнейшего издательства России"
          className="mb-12"
          margin
        >
          <span className="text-brand-accent">Топ-8</span> лучших франшиз
        </SectionHeader>

        <motion.div
          className="grid md:grid-cols-2 gap-8 md:gap-12 items-center max-w-5xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.12 } },
          }}
        >
          {/* Левая колонка — текст + бейдж */}
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -20 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: easeOut } },
            }}
            className="space-y-6"
          >
            {/* Бейдж KP */}
            <a
              href="https://www.kp.ru/money/biznes/luchshie-franshizy-magazinov-odezhdy-v-rossii/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-5 py-3 bg-brand-gray-100 rounded-sm hover:bg-brand-gray-200 transition-colors group"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#D12026"/>
              </svg>
              <div>
                <p className="text-sm font-bold text-brand-black">Топ-8</p>
                <p className="text-xs text-brand-gray-400">лучших франшиз магазинов одежды в России — 2026</p>
              </div>
            </a>

            <p className="body-text text-brand-gray-400 leading-relaxed">
              «Комсомольская правда» — крупнейшее издательство России с аудиторией более 40 млн человек. Ежегодный рейтинг франшиз составляется на основе анализа десятков параметров: от финансовой устойчивости до качества поддержки партнёров.
            </p>

            <p className="body-text text-brand-gray-400 leading-relaxed">
              Попадание в Топ-8 подтверждает, что модель Diverse признана одной из самых надёжных и перспективных на рынке франчайзинга.
            </p>

            <a
              href="https://www.kp.ru/money/biznes/luchshie-franshizy-magazinov-odezhdy-v-rossii/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-accent hover:text-brand-accent-hover transition-colors group"
            >
              Читать полный обзор
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </motion.div>

          {/* Правая колонка — логотип КП */}
          <motion.div
            variants={{
              hidden: { opacity: 0, x: 20 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: easeOut } },
            }}
            className="relative"
          >
            <a
              href="https://www.kp.ru/money/biznes/luchshie-franshizy-magazinov-odezhdy-v-rossii/"
              target="_blank"
              rel="noopener noreferrer"
              className="block relative bg-white rounded-sm overflow-hidden border border-brand-gray-200 hover:border-brand-accent/40 transition-colors group"
            >
              <Image
                src={asset("/images/kp-rating.jpg")}
                alt="Комсомольская правда — логотип издания"
                width={1254}
                height={705}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="w-full h-auto group-hover:scale-[1.01] transition-transform duration-500"
              />
            </a>
            <p className="text-xs text-brand-gray-300 mt-3 text-center">
              Источник: kp.ru · рейтинг лучших франшиз магазинов одежды 2026
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
