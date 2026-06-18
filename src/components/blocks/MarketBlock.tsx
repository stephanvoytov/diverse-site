"use client";

import { motion } from "framer-motion";

const reasons = [
  "Освобождение ниш после 2022 года — международные сети ушли, их место заняли локальные бренды",
  "Рост российских fashion-сетей — рынок перестраивается, сильные бренды наращивают долю",
  "Постоянный спрос на одежду — люди покупают круглый год, нет ярко выраженной сезонности",
  "Широкий ассортимент — мужская и женская одежда на любой сезон и случай",
  "Возможность масштабирования — один магазин может стать сетью",
] as const;

export default function MarketBlock() {
  return (
    <section data-header="light" className="bg-brand-gray-100 py-16 md:py-24">
      <div className="container-brand">
        {/* Header */}
        <motion.div
          className="text-center mb-12 md:mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs tracking-[0.3em] uppercase text-brand-gray-400 mb-4">
            Почему сейчас
          </p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-brand-black leading-[1.1] mb-4">
            Выгодное время для{" "}
            <span className="text-brand-accent">открытия магазина</span>
          </h2>
          <p className="text-base md:text-lg text-brand-gray-400 max-w-xl mx-auto">
            Рынок одежды в России переживает структурные изменения — это создаёт окно возможностей для новых игроков
          </p>
        </motion.div>

        {/* Reasons list */}
        <div className="max-w-3xl mx-auto space-y-5">
          {reasons.map((reason, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex items-start gap-4"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brand-accent shrink-0 mt-2.5" />
              <p className="text-base md:text-lg text-brand-gray-500 leading-relaxed">
                {reason}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
