"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/components/shared/SectionHeader";

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
        <SectionHeader
          eyebrow="Почему сейчас"
          className="mb-12 md:mb-14"
          desc="Рынок одежды в России переживает структурные изменения — это создаёт окно возможностей для новых игроков"
          margin
        >
          Выгодное время для{" "}
          <span className="text-brand-accent">открытия магазина</span>
        </SectionHeader>

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
              <p className="body-text text-brand-gray-500 leading-relaxed">
                {reason}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
