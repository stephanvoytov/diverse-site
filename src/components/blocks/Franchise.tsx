"use client";

import { motion } from "framer-motion";
import { plans } from "@/data/franchise";
import { cardProfit } from "@/data/formats";
import { useModal } from "@/lib/modal-context";

const easeOut: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

export default function Franchise() {
  const { open: openModal } = useModal();
  return (
    <section
      data-header="dark"
      className="relative min-h-screen bg-brand-black"
    >
      {/* Static pattern — скрыт на мобилке (тяжёлый repaint) */}
      <div className="hidden md:block absolute inset-0 opacity-[0.04]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container-brand relative z-10 py-10 md:py-12">
        {/* Header + badge — 1 observer вместо 4 */}
        <motion.div
          className="text-center mb-8 md:mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: easeOut } },
            }}
            className="text-xs eyebrow text-brand-gray-300 mb-4"
          >
            Франшиза
          </motion.p>
          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOut } },
            }}
            className="section-title text-white"
          >
            Откройте магазин{" "}
            <span className="text-brand-accent">Diverse</span>
          </motion.h2>
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 12 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: easeOut } },
            }}
            className="section-desc text-white/50"
          >
            Три формата на выбор. Без паушального взноса и роялти.
          </motion.p>
        </motion.div>

        {/* Trust badges: Топ-8 + benefits — перед карточками */}
        <div className="max-w-5xl mx-auto mb-8 md:mb-10 text-center space-y-6 md:space-y-8">
          {/* Бейдж Комсомольской правды */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1, ease: easeOut }}
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

        </div>

        {/* Cards — тизер: имя, описание и инвестиции */}
        <motion.div
          className="grid md:grid-cols-3 gap-[4px] max-w-5xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.id}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ y: -4 }}
              className={`rounded-sm p-6 md:p-8 flex flex-col transition-colors duration-300 ${
                plan.id === 'renovation'
                  ? 'border border-brand-accent bg-brand-accent/6 hover:bg-brand-accent/10'
                  : 'border border-white/10 bg-white/5 hover:bg-white/[0.07] hover:border-white/15'
              }`}
            >
              <p className="text-[10px] tracking-[0.15em] uppercase text-brand-accent mb-3">
                {plan.tagline}
              </p>
              <h3 className="text-2xl font-bold text-white mb-3 tracking-[-0.01em]">
                {plan.name}
              </h3>
              <p className="text-[13px] text-white/45 leading-relaxed mb-6">
                {plan.desc}
              </p>
              {/* Investment + Profit — stacked vertically */}
              <div className="mt-auto pt-5 space-y-3">
                <div>
                  <p className="text-[28px] font-bold text-brand-accent mb-0.5">
                    {plan.investment}
                  </p>
                  <p className="text-[11px] text-white/30 tracking-[0.1em] uppercase">
                    Инвестиции
                  </p>
                </div>
                <div>
                  <p className="text-lg font-bold text-white">
                    {cardProfit[plan.id]}
                  </p>
                  <p className="text-[11px] text-white/30 tracking-[0.1em] uppercase">
                    Прибыль / мес
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Disclaimer */}
        <p className="text-center text-[10px] text-white/20 mt-4 md:mt-6">* Все цифры — оценочные, точный расчёт под ваш формат на консультации</p>

        {/* Bottom: CTA + links — компактно */}
        <motion.div
          className="mt-6 md:mt-8 text-center space-y-4 md:space-y-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.08 } },
          }}
        >
          {/* CTA — первым */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <button
              onClick={openModal}
              className="btn-accent"
            >
              Стать партнёром
            </button>
          </motion.div>

          {/* Ссылки — под CTA */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 },
            }}
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
          >
            <a
              href="/franchise/"
              className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors group"
            >
              Все условия франшизы
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
            <a
              href="/franchise/#gallery"
              className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors group"
            >
              Посмотреть пример магазина
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
