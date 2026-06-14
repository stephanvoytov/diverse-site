"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { caseStudies } from "@/data/metrics";

export default function CaseStudies() {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section data-header="dark" className="relative bg-brand-black py-16 md:py-24">
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container-brand relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-14 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs tracking-[0.3em] uppercase text-brand-gray-300 mb-4">
            Реальные кейсы
          </p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-4">
            Уже открыты и <span className="text-brand-accent">работают</span>
          </h2>
          <p className="text-base md:text-lg text-white/50 max-w-2xl mx-auto">
            11 магазинов в России и Казахстане — от Калининграда до Якутска и Алматы
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-6 max-w-5xl mx-auto">
          {caseStudies.map((cs, i) => {
            const isOpen = activeId === cs.id;
            return (
              <motion.div
                key={cs.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`group rounded-sm overflow-hidden border transition-all duration-500 cursor-pointer ${
                  isOpen
                    ? "border-brand-accent/40 bg-white/[0.08] shadow-[0_0_40px_-16px_rgba(209,32,38,0.25)]"
                    : "border-white/10 bg-white/5 hover:bg-white/[0.07] hover:border-white/20"
                }`}
                onClick={() => setActiveId(isOpen ? null : cs.id)}
              >
                {/* Photo */}
                <div className="aspect-[16/10] bg-brand-gray-900 overflow-hidden">
                  <Image
                    src={cs.photo}
                    alt={`Магазин Diverse в ${cs.city}`}
                    width={600}
                    height={375}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                  />
                </div>

                {/* Info */}
                <div className="p-5 md:p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-white mb-0.5">
                        {cs.city}
                      </p>
                      <p className="text-xs text-white/40">
                        {cs.mall.replace(/[«»]/g, "")}
                      </p>
                    </div>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="shrink-0 w-6 h-6 rounded-full border border-white/20 flex items-center justify-center text-white/40 group-hover:text-white/60"
                    >
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                        <path d="M5 1v8M1 5h8" />
                      </svg>
                    </motion.span>
                  </div>

                  {/* Stats row */}
                  <div className="flex flex-wrap gap-3 mt-3">
                    <span className="inline-flex items-center gap-1.5 text-[11px] text-white/40">
                      <span className="w-1 h-1 rounded-full bg-brand-accent" />
                      Открыт {cs.opened}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[11px] text-white/40">
                      <span className="w-1 h-1 rounded-full bg-brand-accent" />
                      {cs.area}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[11px] text-white/40">
                      <span className="w-1 h-1 rounded-full bg-brand-accent" />
                      {cs.format}
                    </span>
                  </div>

                  {/* Expandable details */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 mt-4 border-t border-white/10 space-y-3">
                          <p className="text-sm text-white/60 leading-relaxed">
                            {cs.description}
                          </p>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-brand-accent font-medium uppercase tracking-[0.1em]">
                              Выручка:
                            </span>
                            <span className="text-sm font-bold text-white">
                              {cs.sales}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
