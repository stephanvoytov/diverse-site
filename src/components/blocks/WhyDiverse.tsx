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
        <div className="grid md:grid-cols-3 gap-5 md:gap-6 max-w-5xl mx-auto">
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
              {/* Tagline + name */}
              <div className="px-6 pt-6 pb-3">
                <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-brand-accent">
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

              {/* Metrics row: revenue */}
              <div className="px-6 pt-4 pb-3">
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

              {/* Zero fee badge */}
              <div className={`mx-6 mb-3 px-3 py-2 rounded-sm flex items-center justify-center gap-4 ${
                card.accent ? "bg-white/5" : "bg-brand-accent/5"
              }`}>
                <span className="text-sm font-bold text-brand-accent">0 ₽ взнос</span>
                <span className={`w-px h-4 ${
                  card.accent ? "bg-white/10" : "bg-brand-gray-200"
                }`} />
                <span className="text-sm font-bold text-brand-accent">0% роялти</span>
                <span className={`w-px h-4 ${
                  card.accent ? "bg-white/10" : "bg-brand-gray-200"
                }`} />
                <span className={`text-xs ${
                  card.accent ? "text-white/50" : "text-brand-gray-400"
                }`}>{card.area}</span>
              </div>

              {/* Divider */}
              <div className={`mx-6 h-px ${
                card.accent ? "bg-white/10" : "bg-brand-gray-200"
              }`} />

              {/* Scenarios */}
              <div className="px-6 py-4 space-y-2 flex-1">
                <p className={`text-[10px] tracking-[0.15em] uppercase font-semibold ${
                  card.accent ? "text-white/40" : "text-brand-gray-400"
                }`}>
                  Сценарии окупаемости
                </p>
                {card.scenarios.map((s) => (
                  <div
                    key={s.label}
                    className={`flex items-center justify-between gap-2 px-3 py-1.5 rounded-sm text-xs ${
                      card.accent ? "bg-white/5" : "bg-brand-gray-100"
                    }`}
                  >
                    <span className={card.accent ? "text-white/60" : "text-brand-gray-500"}>{s.label}</span>
                    <span className={`font-semibold ${
                      card.accent ? "text-white" : "text-brand-black"
                    }`}>{formatPayoff(s.payoff)}</span>
                    <span className={`text-[11px] ${
                      card.accent ? "text-white/40" : "text-brand-gray-400"
                    }`}>{s.months}</span>
                  </div>
                ))}
              </div>

              {/* Area (repeated for clarity) */}
              <div className={`mx-6 pb-4 flex items-center gap-1.5 ${
                card.accent ? "text-white/30" : "text-brand-gray-300"
              }`}>
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <rect x="1" y="1" width="12" height="12" rx="1" />
                  <path d="M5 1v12M9 1v12M1 5h12M1 9h12" />
                </svg>
                <span className="text-[11px]">{card.area}</span>
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
