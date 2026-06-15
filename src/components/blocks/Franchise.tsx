"use client";

import { motion } from "framer-motion";
import { plans, benefits } from "@/data/franchise";
import { useModal } from "@/lib/modal-context";

const cardProfit: Record<string, string> = {
  island: "~80 тыс ₽",
  renovation: "~150 тыс ₽",
  standard: "~250 тыс ₽",
};

export default function Franchise() {
  const { open: openModal } = useModal();
  return (
    <section
      data-header="dark"
      className="relative min-h-screen bg-brand-black"
    >
      {/* Static pattern */}
      <div className="absolute inset-0 opacity-[0.04]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container-brand relative z-10 py-10 md:py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.p
            className="text-xs tracking-[0.3em] uppercase text-brand-gray-300 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            style={{ willChange: "transform, opacity" }}
          >
            Франшиза
          </motion.p>
          <motion.h2
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-4"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ willChange: "transform, opacity" }}
          >
            Откройте магазин{" "}
            <span className="text-brand-accent">Diverse</span>
          </motion.h2>
          <motion.p
            className="text-base md:text-lg text-white/50 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ willChange: "transform, opacity" }}
          >
            Польский бренд с 30-летней историей. Без паушального взноса и роялти.
          </motion.p>
        </div>

        {/* Cards — тизер: только имя, описание и инвестиции */}
        <div className="grid md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{ willChange: "transform, opacity" }}
              className="bg-white/5 border border-white/10 rounded-sm p-6 md:p-8 flex flex-col"
            >
              <p className="text-xs tracking-[0.2em] uppercase text-brand-accent mb-2">
                {plan.tagline}
              </p>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                {plan.name}
              </h3>
              <p className="text-sm text-white/50 leading-relaxed">
                {plan.desc}
              </p>
              {/* Investment + Profit */}
              <div className="mt-auto pt-5 flex items-end justify-between gap-2">
                <div>
                  <p className="text-lg md:text-xl font-bold text-brand-accent">
                    {plan.investment}
                  </p>
                  <p className="text-[11px] text-white/30 tracking-wide">
                    Инвестиции
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg md:text-xl font-bold text-white">
                    {cardProfit[plan.id]}
                  </p>
                  <p className="text-[11px] text-white/30 tracking-wide">
                    Прибыль / мес
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Benefits row */}
        <motion.div
          className="mt-12 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{ willChange: "transform, opacity" }}
        >
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
            {benefits.map((b, i) => (
              <motion.div
                key={b}
                className="flex items-center gap-2"
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.3, delay: 0.45 + i * 0.06 }}
                style={{ willChange: "transform, opacity" }}
              >
                <span className="w-1 h-1 rounded-full bg-brand-accent shrink-0" />
                <span className="text-sm text-white/60">{b}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Ссылка на страницу франшизы */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4, delay: 0.5 }}
          style={{ willChange: "transform, opacity" }}
        >
          <a
            href="/franchise/"
            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors group"
          >
            Все условия франшизы
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </motion.div>

        {/* Бейдж Комсомольской правды */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.55 }}
          style={{ willChange: "transform, opacity" }}
        >
          <a
            href="https://www.kp.ru/money/biznes/luchshie-franshizy-magazinov-odezhdy-v-rossii/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-5 py-3 border border-white/10 rounded-sm hover:bg-white/[0.04] transition-colors group"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
              <path d="M10 1l2.39 4.84 5.34.78-3.87 3.77.91 5.33L10 13.13 5.23 15.72l.91-5.33L2.27 6.62l5.34-.78L10 1z" fill="#D12026"/>
            </svg>
            <span className="text-sm text-white/50 group-hover:text-white/80 transition-colors">
              <span className="text-white/80 font-medium">Топ-8</span> лучших франшиз магазинов одежды —{" "}
              <span className="text-white/60">рейтинг </span>
              <span className="font-medium text-white/80">«Комсомольской правды»</span>
              <span className="text-white/40 ml-1">2026</span>
            </span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 text-white/30 group-hover:text-white/50 transition-colors">
              <path d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <button
            onClick={openModal}
            className="inline-flex items-center justify-center px-8 py-4 text-sm tracking-[0.2em] font-semibold uppercase text-white bg-brand-accent hover:bg-brand-accent-hover transition-all duration-300 rounded-sm cursor-pointer"
          >
            Стать партнёром
          </button>
        </motion.div>

      </div>
    </section>
  );
}
