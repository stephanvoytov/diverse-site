"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { tinaField } from "tinacms/dist/react";
import SectionHeader from "@/components/shared/SectionHeader";
import { faqItems } from "@/data/franchise";
import { siteContent } from "@/data/site-content";

const fallback = siteContent.faq;

const easeOut: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

export default function Faq({ data }: { data?: typeof fallback }) {
  const s = data ?? fallback;
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section data-header="light" className="bg-brand-gray-100 overflow-hidden">
      <div className="container-brand py-16 md:py-24">
        {/* Header */}
        <SectionHeader
          eyebrow={s.eyebrow}
          desc={s.desc}
          className="mb-12 md:mb-16"
          margin
          eyebrowField={tinaField(s, "eyebrow")}
          descField={tinaField(s, "desc")}
        >
          <span data-tina-field={tinaField(s, "headingBefore")}>{s.headingBefore}</span>{" "}
          <span className="text-brand-accent" data-tina-field={tinaField(s, "headingAccent")}>{s.headingAccent}</span>
        </SectionHeader>

        {/* Accordion — 1 observer вместо 5 */}
        <motion.div
          className="max-w-3xl mx-auto space-y-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.05 } },
          }}
        >
          {faqItems.map((item, i) => {
            const isOpen = openIdx === i;

            return (
              <motion.article
                key={i}
                layout="position"
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: easeOut } },
                }}
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
                    transition={{ duration: 0.2, ease: easeOut }}
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
                      transition={{ duration: 0.2, ease: easeOut }}
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
        </motion.div>
      </div>
    </section>
  );
}
