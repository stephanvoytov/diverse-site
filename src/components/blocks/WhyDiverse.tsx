"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/components/shared/SectionHeader";
import { formatCards, type FormatCard } from "@/data/formats";
import { formatBig, formatPayoff } from "@/lib/format";

export default function WhyDiverse() {
  return (
    <section data-header="light" className="bg-white py-16 md:py-24">
      <div className="container-brand">
        {/* Header */}
        <SectionHeader
          eyebrow="Эффективность"
          desc="Три сценария — от консервативного до агрессивного"
          descClassName="body-text text-brand-gray-400 max-w-2xl mx-auto"
          className="mb-14 md:mb-16"
          margin
        >
          Сколько приносит <span className="text-brand-accent">каждый формат</span>
        </SectionHeader>

        {/* Cards: horizontal swipe on mobile, grid on desktop */}
        <div className="relative max-w-6xl mx-auto">
          <div className="md:grid md:grid-cols-3 flex gap-3 md:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-2 md:pb-0">
          {formatCards.map((card, i) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative rounded-sm overflow-hidden flex flex-col min-w-[72vw] md:min-w-0 snap-center shrink-0 first:ml-6 last:mr-6 md:first:ml-0 md:last:mr-0 ${
                card.accent
                  ? "bg-white text-brand-black border-2 border-brand-accent shadow-lg shadow-brand-accent/5"
                  : "bg-white text-brand-black border-2 border-brand-gray-300 shadow-sm"
              }`}
            >
              {/* Top strip */}
              <div className={`shrink-0 h-1 ${card.accent ? "bg-brand-accent" : "bg-brand-gray-300"}`} />

              {/* Header */}
              <div className="px-6 pt-6 pb-3">
                <span className="text-[11px] tracking-[0.2em] uppercase font-semibold text-brand-accent">
                  {card.tagline}
                </span>
                <h3 className="text-xl font-bold mt-1 text-brand-black">
                  {card.name}
                </h3>
              </div>

              {/* Scenarios */}
              <div className="px-6 pb-6 flex flex-col flex-1 min-w-0">
                <span className="text-[11px] label font-semibold mb-3 text-brand-gray-400">
                  Сценарии окупаемости
                </span>

                <div className="space-y-1">
                  {card.scenarios.map((s, si) => {
                    const isBase = si === 1;
                    return (
                      <div
                        key={s.label}
                        className={`flex items-center justify-between gap-1.5 px-2.5 py-2 text-xs leading-none max-md:whitespace-normal md:whitespace-nowrap ${
                          isBase
                            ? card.accent
                              ? "bg-brand-accent/[0.06] font-semibold text-brand-black"
                              : "bg-brand-accent/[0.04] font-semibold text-brand-black"
                            : "text-brand-gray-400"
                        }`}
                      >
                        <span className="truncate">{s.label}</span>
                        <span className="shrink-0 text-brand-gray-400">{formatPayoff(s.payoff)}</span>
                        <span className={`shrink-0 font-medium ${isBase ? "text-brand-accent font-bold" : "text-brand-gray-300"}`}>
                          {s.months}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom */}
              <div className="mx-6 h-px bg-brand-gray-200" />

              <div className="px-6 pt-4 pb-6 flex items-center justify-between gap-3">
                <div>
                  <span className="text-xl md:text-2xl font-bold leading-none text-brand-black">
                    {formatBig(card.revenue)}
                  </span>
                  <span className="block text-xs mt-0.5 text-brand-gray-400">
                    выручка / мес
                  </span>
                </div>
                <div className="text-right text-xs leading-snug">
                  <span className="font-semibold text-brand-accent">0 ₽ взнос</span>
                  <br />
                  <span className="font-semibold text-brand-accent">0% роялти</span>
                  <br />
                  <span className="text-brand-gray-400">{card.area}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        {/* Scroll hint gradient on mobile */}
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent md:hidden" />
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
