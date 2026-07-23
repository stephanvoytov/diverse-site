"use client";

import { motion } from "framer-motion";
import { tinaField } from "tinacms/dist/react";
import SectionHeader from "@/components/shared/SectionHeader";
import { siteContent } from "@/data/site-content";

const fallback = siteContent.marketBlock;

const easeOut: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

export default function MarketBlock({ data }: { data?: typeof fallback }) {
  const s = data ?? fallback;
  return (
    <section data-header="light" className="bg-white py-16 md:py-24">
      <div className="container-brand">
        {/* Header */}
        <SectionHeader
          eyebrow={s.eyebrow}
          className="mb-12 md:mb-14"
          desc={s.desc}
          margin
          eyebrowField={tinaField(s, "eyebrow")}
          descField={tinaField(s, "desc")}
        >
          <span data-tina-field={tinaField(s, "headingBefore")}>{s.headingBefore}</span>{" "}
          <span className="text-brand-accent" data-tina-field={tinaField(s, "headingAccent")}>{s.headingAccent}</span>
        </SectionHeader>

        {/* Reasons list — 1 observer вместо 5 */}
        <motion.div
          className="max-w-3xl mx-auto space-y-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.06 } },
          }}
          data-tina-field={tinaField(s, "reasons")}
        >
          {s.reasons.map((reason, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 12 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: easeOut } },
              }}
              className="flex items-start gap-4"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brand-accent shrink-0 mt-2.5" />
              <p className="body-text text-brand-gray-500 leading-relaxed">
                {reason}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
