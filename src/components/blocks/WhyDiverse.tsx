"use client";

import { motion } from "framer-motion";
import { whyDiverseMetrics } from "@/data/metrics";

export default function WhyDiverse() {
  return (
    <section data-header="light" className="bg-white py-16 md:py-24">
      <div className="container-brand">
        {/* Header */}
        <motion.div
          className="text-center mb-14 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs tracking-[0.3em] uppercase text-brand-gray-400 mb-4">
            Цифры и факты
          </p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-brand-black leading-[1.1] mb-4">
            Почему <span className="text-brand-accent">Diverse</span> — прибыльная франшиза
          </h2>
          <p className="text-base md:text-lg text-brand-gray-400 max-w-2xl mx-auto">
            Реальные показатели действующей сети из 11 магазинов
          </p>
        </motion.div>

        {/* Metrics grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
          {whyDiverseMetrics.map((m, i) => (
            <motion.div
              key={m.label}
              className="relative group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <div className="h-full bg-brand-gray-100 border border-brand-gray-200 rounded-sm p-6 md:p-7 transition-all duration-300 group-hover:border-brand-accent/30 group-hover:shadow-sm">
                <p className="text-3xl md:text-4xl font-bold text-brand-accent mb-1 leading-none">
                  {m.value}
                </p>
                <p className="text-sm font-semibold text-brand-black mb-2">
                  {m.label}
                </p>
                <p className="text-xs text-brand-gray-400 leading-relaxed">
                  {m.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom text */}
        <motion.div
          className="text-center mt-10 md:mt-12"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p className="text-sm text-brand-gray-400 max-w-2xl mx-auto">
            Все показатели — средние по действующей сети из 11 магазинов. 
            Индивидуальный расчёт под ваш город и формат — на консультации.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
