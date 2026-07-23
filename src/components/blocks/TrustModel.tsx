"use client";

import { motion } from "framer-motion";
import { tinaField } from "tinacms/dist/react";
import SectionHeader from "@/components/shared/SectionHeader";
import { trustPoints } from "@/data/brand";
import { siteContent } from "@/data/site-content";

const fallback = siteContent.trustModel;

const easeOut: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

export default function TrustModel({ data }: { data?: typeof fallback }) {
  const s = data ?? fallback;
  return (
    <section data-header="light" className="bg-brand-gray-100 py-16 md:py-24">
      <div className="container-brand">
        {/* Header */}
        <SectionHeader
          eyebrow={s.eyebrow}
          desc={s.desc}
          className="mb-12 md:mb-14"
          margin
          eyebrowField={tinaField(s, "eyebrow")}
          descField={tinaField(s, "desc")}
        >
          <span data-tina-field={tinaField(s, "headingBefore")}>{s.headingBefore}</span>{" "}
          <span className="text-brand-accent" data-tina-field={tinaField(s, "headingAccent")}>{s.headingAccent}</span>
        </SectionHeader>

        {/* Trust cards — 1 observer вместо 4 */}
        <motion.div
          className="grid md:grid-cols-2 gap-5 md:gap-6 max-w-4xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.08 } },
          }}
        >
          {trustPoints.map((point) => (
            <motion.div
              key={point.title}
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: easeOut } },
              }}
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
        </motion.div>
      </div>
    </section>
  );
}
