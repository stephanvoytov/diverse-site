"use client";

import { motion } from "framer-motion";

/* ——— Данные для карточек ——— */

interface Scenario {
  label: string;
  payoff: string;
  months: string;
}

interface FormatCard {
  id: string;
  name: string;
  tagline: string;
  revenue: string;
  area: string;
  fee: string;
  royalty: string;
  accent: boolean;
  scenarios: Scenario[];
}

const formatCards: FormatCard[] = [
  {
    id: "island",
    name: "Торговый остров",
    tagline: "Быстрый старт",
    revenue: "~450 000 ₽/мес",
    area: "от 12 м²",
    fee: "0 ₽",
    royalty: "0%",
    accent: false,
    scenarios: [
      { label: "Пессимистичный", payoff: "~40 000 ₽/мес", months: "24 мес" },
      { label: "Базовый", payoff: "~75 000 ₽/мес", months: "14 мес" },
      { label: "Агрессивный", payoff: "~120 000 ₽/мес", months: "9 мес" },
    ],
  },
  {
    id: "renovation",
    name: "Реновация",
    tagline: "Переоборудование",
    revenue: "~1 000 000 ₽/мес",
    area: "Готовое помещение",
    fee: "0 ₽",
    royalty: "0%",
    accent: true,
    scenarios: [
      { label: "Пессимистичный", payoff: "~60 000 ₽/мес", months: "30 мес" },
      { label: "Базовый", payoff: "~150 000 ₽/мес", months: "14 мес" },
      { label: "Агрессивный", payoff: "~250 000 ₽/мес", months: "9 мес" },
    ],
  },
  {
    id: "standard",
    name: "Полный стандарт",
    tagline: "Магазин под ключ",
    revenue: "~2 500 000 ₽/мес",
    area: "от 60 м²",
    fee: "0 ₽",
    royalty: "0%",
    accent: false,
    scenarios: [
      { label: "Пессимистичный", payoff: "~150 000 ₽/мес", months: "28 мес" },
      { label: "Базовый", payoff: "~400 000 ₽/мес", months: "12 мес" },
      { label: "Агрессивный", payoff: "~700 000 ₽/мес", months: "7 мес" },
    ],
  },
];

/* ——— Функция форматирования чисел ——— */

function formatBig(n: string): string {
  const prefix = n.startsWith("~") ? "~" : "";
  const digits = n.replace(/\D/g, "");
  const suffix = n.includes("₽/мес") ? " ₽/мес" : "";
  if (digits.length >= 7) return prefix + digits.slice(0, -6) + " млн" + suffix;
  if (digits.length >= 4) return prefix + digits.slice(0, -3) + " тыс" + suffix;
  return n;
}

function formatPayoff(n: string): string {
  return formatBig(n);
}

export default function WhyDiverse() {
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
        >
          <p className="text-xs tracking-[0.3em] uppercase text-brand-gray-400 mb-4">
            Эффективность
          </p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-brand-black leading-[1.1] mb-4">
            Сколько приносит <span className="text-brand-accent">каждый формат</span>
          </h2>
          <p className="text-base md:text-lg text-brand-gray-400 max-w-2xl mx-auto">
            Три сценария — от консервативного до агрессивного
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-5 md:gap-6 max-w-6xl mx-auto">
          {formatCards.map((card, i) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative rounded-sm overflow-hidden flex flex-col ${
                card.accent
                  ? "bg-brand-black text-white shadow-lg shadow-black/20 border border-white/10"
                  : "bg-white text-brand-black border border-brand-gray-200"
              }`}
            >
              {/* Header */}
              <div className="px-6 pt-6 pb-3">
                <span className="text-[11px] tracking-[0.2em] uppercase font-semibold text-brand-accent">
                  {card.tagline}
                </span>
                <h3 className={`text-xl font-bold mt-1 ${
                  card.accent ? "text-white" : "text-brand-black"
                }`}>
                  {card.name}
                </h3>
              </div>

              {/* Scenarios */}
              <div className="px-6 pb-4 flex flex-col gap-1 flex-1 min-w-0">
                <span className={`text-[11px] tracking-[0.15em] uppercase font-semibold ${
                  card.accent ? "text-white/30" : "text-brand-gray-400"
                }`}>
                  Сценарии окупаемости
                </span>

                <div className="space-y-px">
                  {card.scenarios.map((s, si) => {
                    const isBase = si === 1;
                    return (
                      <div
                        key={s.label}
                        className={`flex items-center justify-between gap-1.5 px-2.5 py-2 text-xs leading-none whitespace-nowrap ${
                          isBase
                            ? card.accent
                              ? "bg-white/[0.06] font-semibold text-white"
                              : "bg-brand-accent/[0.04] font-semibold text-brand-black"
                            : card.accent
                              ? "text-white/40"
                              : "text-brand-gray-400"
                        }`}
                      >
                        <span className="truncate">{s.label}</span>
                        <span className={`shrink-0 ${isBase ? "" : "text-brand-gray-400"}`}>{formatPayoff(s.payoff)}</span>
                        <span className={`shrink-0 ${isBase ? "text-brand-accent font-bold" : `font-medium ${card.accent ? "text-white/30" : "text-brand-gray-300"}`}`}>
                          {s.months}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom */}
              <div className={`mx-6 h-px ${
                card.accent ? "bg-white/[0.06]" : "bg-brand-gray-200"
              }`} />

              <div className="px-6 pt-3 pb-5 flex items-center justify-between gap-3">
                <div>
                  <span className={`text-xl md:text-2xl font-bold leading-none ${
                    card.accent ? "text-white" : "text-brand-black"
                  }`}>
                    {formatBig(card.revenue)}
                  </span>
                  <span className={`block text-xs mt-0.5 ${
                    card.accent ? "text-white/30" : "text-brand-gray-400"
                  }`}>
                    выручка / мес
                  </span>
                </div>
                <div className="text-right text-xs leading-snug">
                  <span className="font-semibold text-brand-accent">0 ₽ взнос</span>
                  <br />
                  <span className="font-semibold text-brand-accent">0% роялти</span>
                  <br />
                  <span className={card.accent ? "text-white/40" : "text-brand-gray-400"}>{card.area}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Single link to franchise page */}
        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <a
            href="/franchise/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-accent hover:text-brand-accent-hover transition-colors group"
          >
            Все форматы и условия
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </motion.div>

        {/* Note */}
        <motion.div
          className="text-center mt-6"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <p className="text-xs text-brand-gray-300 max-w-xl mx-auto leading-relaxed">
            * Расчёты примерные. Точная финмодель под ваш город, формат и локацию — на консультации
          </p>
        </motion.div>
      </div>
    </section>
  );
}
