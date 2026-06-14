"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { plans, benefits } from "@/data/franchise";
import { useModal } from "@/lib/modal-context";

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1 },
  }),
};

export default function Franchise() {
  const { open: openModal } = useModal();
  const [openId, setOpenId] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const winH = window.innerHeight;
      // progress: 0 when section bottom enters viewport, 1 when top leaves
      const progress = Math.max(0, Math.min(1,
        (winH - rect.top) / (winH + rect.height)
      ));
      // Map to -60px to 60px
      const y = -60 + progress * 120;
      if (glowRef.current) {
        glowRef.current.style.transform = `translateY(${y}px)`;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="section-franchise" data-header="dark" ref={sectionRef} className="relative min-h-screen bg-brand-black">
      {/* Static pattern */}
      <div className="absolute inset-0 opacity-[0.04]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Large subtle glow — parallax via native scroll */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          ref={glowRef}
          className="w-[900px] h-[500px] shrink-0 will-change-transform"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(209,32,38,0.12) 0%, transparent 60%)",
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
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Франшиза
          </motion.p>
          <motion.h2
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-4"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Откройте магазин{" "}
            <span className="text-brand-accent">Diverse</span>
          </motion.h2>
          <motion.p
            className="text-base md:text-lg text-white/50 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            0 ₽ паушальный взнос · 0% роялти · Никаких предоплат
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.id}
              layout
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className={`relative rounded-sm overflow-hidden cursor-pointer transition-all duration-500 flex flex-col ${
                openId === plan.id
                  ? "bg-white/[0.12] border border-brand-accent/40 shadow-[0_0_50px_-18px_rgba(209,32,38,0.35)]"
                  : "bg-white/5 border border-white/10 hover:bg-white/[0.08]"
              }`}
              onClick={() => setOpenId(openId === plan.id ? null : plan.id)}
            >
              {/* Always visible */}
              <div className="p-6 md:p-8 flex flex-col flex-1">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-xs tracking-[0.2em] uppercase text-brand-accent mb-2">
                      {plan.tagline}
                    </p>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                      {plan.name}
                    </h3>
                  </div>
                  {/* Expand indicator */}
                  <motion.div
                    animate={{ rotate: openId === plan.id ? 45 : 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className={`shrink-0 mt-1 w-7 h-7 rounded-full border flex items-center justify-center transition-colors duration-500 ${
                      openId === plan.id
                        ? "border-brand-accent text-brand-accent"
                        : "border-white/20 text-white/40"
                    }`}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                      <path d="M7 1v12M1 7h12" />
                    </svg>
                  </motion.div>
                </div>
                <p className="text-sm text-white/50 leading-relaxed">
                  {plan.desc}
                </p>
                <div className="flex items-center justify-between mt-auto pt-5">
                  <motion.span
                    className="text-lg md:text-xl font-bold text-brand-accent"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                  >
                    {plan.investment}
                  </motion.span>
                  <span className={`text-[10px] tracking-[0.15em] uppercase transition-all duration-500 ${
                    openId === plan.id
                      ? "text-brand-accent/70"
                      : "text-white/30"
                  }`}>
                    {openId === plan.id ? "свернуть" : "подробнее"}
                  </span>
                </div>
              </div>

              {/* Expanded details */}
              <AnimatePresence>
                {openId === plan.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 md:px-8 pb-6 md:pb-8 border-t border-white/10 pt-5">
                      <ul className="space-y-3">
                        {plan.details.map((d, idx) => (
                          <motion.li
                            key={d}
                            className="flex items-start gap-3 text-sm text-white/65"
                            initial={{ opacity: 0, x: -15 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.35, delay: idx * 0.08 }}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-accent mt-[7px] shrink-0" />
                            {d}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Benefits row */}
        <motion.div
          className="mt-12 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.div
            className="flex flex-wrap justify-center gap-x-8 gap-y-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {benefits.map((b, i) => (
              <motion.div
                key={b}
                className="flex items-center gap-2"
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.45 + i * 0.06 }}
              >
                <span className="w-1 h-1 rounded-full bg-brand-accent shrink-0" />
                <span className="text-sm text-white/60">{b}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Бейдж Комсомольской правды */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.55 }}
        >
          <a
            href="https://www.kp.ru/money/biznes/luchshie-franshizy-magazinov-odezhdy-v-rossii/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-5 py-3 border border-white/10 rounded-sm hover:bg-white/[0.04] transition-colors group"
          >
            {/* Иконка-звезда */}
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
              <path d="M10 1l2.39 4.84 5.34.78-3.87 3.77.91 5.33L10 13.13 5.23 15.72l.91-5.33L2.27 6.62l5.34-.78L10 1z" fill="#D12026"/>
            </svg>
            <span className="text-sm text-white/50 group-hover:text-white/80 transition-colors">
              <span className="text-white/80 font-medium">Топ-10</span> лучших франшиз одежды — 
              <span className="text-white/60"> рейтинг </span>
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
          viewport={{ once: true }}
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
