"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/components/shared/SectionHeader";
import { trustPoints } from "@/data/brand";

export default function TrustModel() {
  return (
    <section data-header="light" className="bg-brand-gray-100 py-16 md:py-24">
      <div className="container-brand">
        {/* Header */}
        <SectionHeader
          eyebrow="Как устроена модель"
          desc="Никаких скрытых платежей и минимальных объёмов"
          className="mb-12 md:mb-14"
          margin
        >
          Прозрачная <span className="text-brand-accent">финансовая модель</span>
        </SectionHeader>

        {/* Trust cards */}
        <div className="grid md:grid-cols-2 gap-5 md:gap-6 max-w-4xl mx-auto">
          {trustPoints.map((point, i) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white border border-brand-gray-200 rounded-sm p-6 md:p-8"
            >
              <h3 className="text-lg md:text-xl font-bold text-brand-black mb-2">
                {point.title}
              </h3>
              <p className="text-sm text-brand-gray-400 leading-relaxed">
                {point.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
