"use client";

import { motion } from "framer-motion";
import { plans } from "@/data/franchise";
import { cardProfit } from "@/data/formats";
import { useModal } from "@/lib/modal-context";
import { siteContent } from "@/data/site-content";

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
            {siteContent.franchise.eyebrow}
          </motion.p>
          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOut } },
            }}
            className="section-title text-white"
          >
            {siteContent.franchise.heading}{" "}
            <span className="text-brand-accent">Diverse</span>
          </motion.h2>
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 12 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: easeOut } },
            }}
            className="section-desc text-white/50"
          >
            {siteContent.franchise.desc}
          </motion.p>
        </motion.div>

        {/* Cards — тизер: имя, описание и инвестиции */}

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
              <p className="text-[13px] text-white/60 leading-relaxed mb-6">
                {plan.desc}
              </p>
              {/* Investment + Profit — stacked vertically */}
              <div className="mt-auto pt-5 space-y-3">
                <div>
                  <p className="text-[28px] font-bold text-brand-accent mb-0.5">
                    {plan.investment}
                  </p>
                  <p className="text-[11px] text-white/50 tracking-[0.1em] uppercase">
                    {siteContent.franchise.labels.investment}
                  </p>
                </div>
                <div>
                  <p className="text-lg font-bold text-white">
                    {cardProfit[plan.id]}
                  </p>
                  <p className="text-[11px] text-white/50 tracking-[0.1em] uppercase">
                    {siteContent.franchise.labels.profitMonth}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Disclaimer */}
        <p className="text-center text-[10px] text-white/20 mt-4 md:mt-6">{siteContent.franchise.disclaimer}</p>

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
              {siteContent.franchise.cta}
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
              {siteContent.franchise.links.allConditions}
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
            <a
              href="/franchise/#gallery"
              className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors group"
            >
              {siteContent.franchise.links.example}
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
