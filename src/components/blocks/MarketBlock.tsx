"use client";

import { motion } from "framer-motion";

const stats = [
  {
    value: "4+ трлн ₽",
    label: "Годовой объём рынка одежды в России",
    img: "/images/market/scale.avif",
  },
  {
    value: "3,1 тыс. ₽",
    label: "Средний чек покупки одежды",
    img: "/images/market/checkout.jpg",
  },
  {
    value: "Средний",
    label: "Массовый ценовой сегмент рынка",
    img: "/images/market/street.jpg",
  },
] as const;

const reasons = [
  { title: "Новые возможности", desc: "После 2022 освободились ниши в регионах" },
  { title: "Постоянный спрос", desc: "Одежду покупают круглый год" },
  { title: "Офлайн востребован", desc: "Покупателям важны примерка и консультация" },
  { title: "Прозрачная экономика", desc: "Понятная модель доходов и расходов" },
  { title: "Рынок перераспределяется", desc: "Сильные сети увеличивают долю" },
] as const;

export default function MarketBlock() {
  return (
    <section data-header="light" className="bg-brand-gray-100 py-16 md:py-24">
      <div className="container-brand">
        {/* Header */}
        <motion.div
          className="text-center mb-10 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs tracking-[0.3em] uppercase text-brand-gray-400 mb-4">
            Рынок
          </p>
          <h2 className="text-2xl md:text-4xl font-bold text-brand-black leading-[1.1]">
            Рынок одежды — один из крупнейших
            <br />
            <span className="text-brand-accent">сегментов розничной торговли</span>
          </h2>
        </motion.div>

        {/* Карточки с фото */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 max-w-5xl mx-auto mb-14 md:mb-16">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative min-h-[260px] md:min-h-[340px] bg-cover bg-center rounded-sm overflow-hidden"
              style={{ backgroundImage: `url(${stat.img})` }}
            >
              {/* Затемнение */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

              {/* Контент */}
              <div className="relative z-10 h-full flex flex-col items-center justify-end pb-8 md:pb-10 px-6">
                <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.1] mb-2 whitespace-nowrap">
                  {stat.value}
                </p>
                <p className="text-xs md:text-sm text-white/70 leading-snug max-w-[200px] text-center">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Reasons */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-10 md:gap-y-12 max-w-5xl mx-auto">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <div className="w-10 h-0.5 bg-brand-gray-300 mb-4" />
              <p className="text-base md:text-lg font-bold text-brand-black leading-tight mb-1.5">
                {reason.title}
              </p>
              <p className="text-sm md:text-base text-brand-gray-400 leading-snug">
                {reason.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
