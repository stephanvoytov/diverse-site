"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { faqItems } from "@/data/franchise";

export default function Faq() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section data-header="light" className="bg-white overflow-hidden">
      <div className="container-brand py-16 md:py-24">
        {/* Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          style={{ willChange: "transform, opacity" }}
        >
          <p className="text-xs tracking-[0.3em] uppercase text-brand-gray-400 mb-4">
            Часто спрашивают
          </p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-brand-black leading-[1.1] mb-4">
            Отвечаем на{" "}
            <span className="text-brand-accent">главные вопросы</span>
          </h2>
          <p className="text-base md:text-lg text-brand-gray-400 max-w-xl mx-auto">
            Собрали то, что обычно волнует перед открытием
          </p>
        </motion.div>

        {/* Accordion */}
        <div className="max-w-3xl mx-auto space-y-3">
          {faqItems.map((item, i) => {
            const isOpen = openIdx === i;

            return (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className={`rounded-sm overflow-hidden transition-[background-color,border-color,box-shadow] duration-300 ${
                  isOpen
                    ? "bg-white shadow-md border border-brand-accent/20"
                    : "bg-white/80 border border-brand-gray-200 hover:border-brand-gray-300"
                }`}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  className="w-full text-left px-5 md:px-7 py-4 md:py-5 flex items-center justify-between gap-4"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${i}`}
                >
                  <span className="text-sm md:text-base font-semibold text-brand-black pr-4">
                    {item.question}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="shrink-0 w-6 h-6 rounded-full border border-brand-gray-300 flex items-center justify-center text-brand-gray-500 text-sm"
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    >
                      <path d="M6 1v10M1 6h10" />
                    </svg>
                  </motion.span>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${i}`}
                      role="region"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 md:px-7 pb-5 md:pb-6 border-t border-brand-gray-100 pt-4">
                        <p className="text-sm text-brand-gray-400 leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </div>

      </div>
    </section>
  );
}
