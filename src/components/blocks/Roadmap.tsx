"use client";

import { motion } from "framer-motion";
import { roadmapSteps } from "@/data/franchise";

export default function Roadmap() {
  return (
    <section data-header="light" className="bg-brand-gray-100">
      <div className="container-brand py-16 md:py-24">
        {/* Header */}
        <motion.div
          className="text-center mb-14 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}

        >
          <p className="text-xs tracking-[0.3em] uppercase text-brand-gray-400 mb-4">
            Как открыть
          </p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-brand-black leading-[1.1] mb-4">
            От заявки до открытия —{" "}
            <span className="text-brand-accent">от 45 до 60 дней</span>
          </h2>
          <p className="text-base md:text-lg text-brand-gray-400 max-w-xl mx-auto">
            Проверенный процесс, который мы отработали на всех запусках сети
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {roadmapSteps.map((step, i) => (
            <motion.div
              key={step.number}
              className="relative flex gap-5 md:gap-8 pb-8 md:pb-10 last:pb-0"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
    
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
                  <span className="inline-block text-[10px] tracking-[0.15em] uppercase text-brand-accent font-semibold mb-1">
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
        </div>

      </div>
    </section>
  );
}
