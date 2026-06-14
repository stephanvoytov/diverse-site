"use client";

import { motion } from "framer-motion";
import { useModal } from "@/lib/modal-context";

/* ——— Данные для карточек ——— */

interface FormatCard {
  id: string;
  name: string;
  tagline: string;
  revenue: string;
  roi: string;
  area: string;
  fee: string;
  royalty: string;
  accent: boolean;
}

const formatCards: FormatCard[] = [
  {
    id: "island",
    name: "Торговый остров",
    tagline: "Быстрый старт",
    revenue: "~400 000 ₽/мес",
    roi: "~10%",
    area: "от 12 м²",
    fee: "0 ₽",
    royalty: "0%",
    accent: false,
  },
  {
    id: "renovation",
    name: "Реновация",
    tagline: "Переоборудование",
    revenue: "~700 000 ₽/мес",
    roi: "~10%",
    area: "Готовое помещение",
    fee: "0 ₽",
    royalty: "0%",
    accent: true,
  },
  {
    id: "standard",
    name: "Полный стандарт",
    tagline: "Магазин под ключ",
    revenue: "~1 200 000 ₽/мес",
    roi: "~8%",
    area: "от 60 м²",
    fee: "0 ₽",
    royalty: "0%",
    accent: false,
  },
];

/* ——— Функция форматирования чисел ——— */

function formatBig(n: string): string {
  const digits = n.replace(/\D/g, "");
  if (digits.length >= 7) return digits.slice(0, -6) + " млн";
  if (digits.length >= 4) return digits.slice(0, -3) + " тыс";
  return n;
}

export default function WhyDiverse() {
  const { open: openModal } = useModal();

  return (
    <section data-header="light" className="bg-white py-16 md:py-24">
      <div className="container-brand">
        {/* Header */}
        <motion.div
          className="text-center mb-14 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          style={{ willChange: "transform, opacity" }}
        >
          <p className="text-xs tracking-[0.3em] uppercase text-brand-gray-400 mb-4">
            Эффективность
          </p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-brand-black leading-[1.1] mb-4">
            Сколько приносит <span className="text-brand-accent">каждый формат</span>
          </h2>
          <p className="text-base md:text-lg text-brand-gray-400 max-w-2xl mx-auto">
            Оборот и доходность — без паушального взноса и роялти
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-5 md:gap-6 max-w-5xl mx-auto">
          {formatCards.map((card, i) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{ willChange: "transform, opacity" }}
              className={`relative rounded-sm overflow-hidden flex flex-col ${
                card.accent
                  ? "bg-brand-black text-white shadow-lg shadow-black/20 border border-white/10"
                  : "bg-white text-brand-black border border-brand-gray-200"
              }`}
            >
              {/* Tagline */}
              <div className={`px-6 pt-6 pb-2 ${card.accent ? "" : ""}`}>
                <span className={`text-[10px] tracking-[0.2em] uppercase font-semibold ${
                  card.accent ? "text-brand-accent" : "text-brand-accent"
                }`}>
                  {card.tagline}
                </span>
                <h3 className={`text-xl font-bold mt-1 ${
                  card.accent ? "text-white" : "text-brand-black"
                }`}>
                  {card.name}
                </h3>
              </div>

              {/* Divider */}
              <div className={`mx-6 h-px ${
                card.accent ? "bg-white/10" : "bg-brand-gray-200"
              }`} />

              {/* Key metrics */}
              <div className="px-6 py-4 space-y-4 flex-1">
                {/* Revenue — big number */}
                <div>
                  <p className={`text-2xl md:text-3xl font-bold ${
                    card.accent ? "text-white" : "text-brand-black"
                  }`}>
                    {formatBig(card.revenue)}
                  </p>
                  <p className={`text-[11px] ${
                    card.accent ? "text-white/40" : "text-brand-gray-400"
                  }`}>
                    Выручка / мес
                  </p>
                </div>

                {/* ROI — hero accent */}
                <div>
                  <p className={`text-3xl md:text-4xl font-bold ${
                    card.accent ? "text-brand-accent" : "text-brand-accent"
                  }`}>
                    {card.roi}
                  </p>
                  <p className={`text-[11px] ${
                    card.accent ? "text-brand-accent/70" : "text-brand-accent"
                  }`}>
                    Доходность / мес
                  </p>
                </div>

                {/* Area */}
                <div className="flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className={card.accent ? "text-white/30" : "text-brand-gray-300"} stroke="currentColor" strokeWidth="1.2">
                    <rect x="1" y="1" width="12" height="12" rx="1" />
                    <path d="M5 1v12M9 1v12M1 5h12M1 9h12" />
                  </svg>
                  <span className={`text-sm ${
                    card.accent ? "text-white/70" : "text-brand-gray-500"
                  }`}>
                    {card.area}
                  </span>
                </div>
              </div>

              {/* Zero fee badge */}
              <div className={`mx-6 mb-4 px-3 py-2 rounded-sm flex items-center justify-center gap-4 ${
                card.accent ? "bg-white/5" : "bg-brand-accent/5"
              }`}>
                <span className={`text-sm font-bold ${
                  card.accent ? "text-brand-accent" : "text-brand-accent"
                }`}>
                  0 ₽ взнос
                </span>
                <span className={`w-px h-4 ${
                  card.accent ? "bg-white/10" : "bg-brand-gray-200"
                }`} />
                <span className={`text-sm font-bold ${
                  card.accent ? "text-brand-accent" : "text-brand-accent"
                }`}>
                  0% роялти
                </span>
              </div>

              {/* CTA */}
              <div className="px-6 pb-6 mt-auto">
                <button
                  onClick={openModal}
                  className={`w-full py-3 text-xs tracking-[0.2em] uppercase font-semibold rounded-sm transition-all duration-300 cursor-pointer ${
                    card.accent
                      ? "bg-brand-accent text-white hover:bg-brand-accent-hover"
                      : "bg-brand-black text-white hover:bg-neutral-800"
                  }`}
                >
                  Стать партнёром
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Note */}
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4, delay: 0.2 }}
          style={{ willChange: "transform, opacity" }}
        >
          <p className="text-xs text-brand-gray-300 max-w-xl mx-auto leading-relaxed">
            * Расчёты примерные. Точная финмодель под ваш город, формат и локацию — на консультации
          </p>
        </motion.div>
      </div>
    </section>
  );
}
