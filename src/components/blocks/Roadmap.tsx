"use client";

import { motion } from "framer-motion";
import { tinaField } from "tinacms/dist/react";
import SectionHeader from "@/components/shared/SectionHeader";
import { roadmapSteps } from "@/data/franchise";
import { siteContent } from "@/data/site-content";

const fallback = siteContent.roadmap;

const easeOut: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

export default function Roadmap({ data }: { data?: typeof fallback }) {
  const s = data ?? fallback;
  return (
    <section data-header="light" className="bg-white">
      <div className="container-brand py-16 md:py-24">
        {/* Header */}
        <SectionHeader
          eyebrow={s.eyebrow}
          desc={s.desc}
          className="mb-14 md:mb-20"
          margin
          eyebrowField={tinaField(s, "eyebrow")}
          descField={tinaField(s, "desc")}
        >
          <span data-tina-field={tinaField(s, "headingBefore")}>{s.headingBefore}</span>{" "}
          <span className="text-brand-accent" data-tina-field={tinaField(s, "headingAccent")}>{s.headingAccent}</span>
        </SectionHeader>

        {/* Timeline — 1 observer вместо 6 */}
        <motion.div
          className="relative max-w-4xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.08 } },
          }}
        >
          {roadmapSteps.map((step, i) => (
            <motion.div
              key={step.number}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: easeOut } },
              }}
              className="relative flex gap-5 md:gap-8 pb-8 md:pb-10 last:pb-0"
            >
              {/* Number circle + line */}
              <div className="flex flex-col items-center shrink-0">
                <span className="relative z-10 flex items-center justify-center w-10 h-10 rounded-full bg-brand-accent text-white text-sm font-bold">
                  {step.number}
                </span>
                {/* Line connector (hidden on last) */}
                {i < roadmapSteps.length - 1 && (
                  <div className="w-0.5 flex-1 bg-brand-gray-200 mt-1" />
                )}
              </div>

              {/* Content card */}
              <div className="flex-1 min-w-0 pb-1">
                <div className="bg-white border border-brand-gray-200 rounded-sm p-5 md:p-6">
                  <span className="inline-block text-[10px] label text-brand-accent font-semibold mb-1">
                    {step.duration}
                  </span>
                  <h3 className="text-lg md:text-xl font-bold text-brand-black mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-brand-gray-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
