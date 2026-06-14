"use client";

import { motion } from "framer-motion";
import { roadmapSteps } from "@/data/franchise";
import { useModal } from "@/lib/modal-context";

export default function Roadmap() {
  const { open: openModal } = useModal();
  return (
    <section data-header="light" className="bg-brand-gray-100 overflow-hidden">
      <div className="container-brand py-16 md:py-24">
        {/* Header */}
        <motion.div
          className="text-center mb-14 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs tracking-[0.3em] uppercase text-brand-gray-400 mb-4">
            Как открыть
          </p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-brand-black leading-[1.1] mb-4">
            От заявки до открытия —{" "}
            <span className="text-brand-accent">30 дней</span>
          </h2>
          <p className="text-base md:text-lg text-brand-gray-400 max-w-xl mx-auto">
            Проверенный процесс, который мы отработали на 11 запусках
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical line (desktop) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-brand-gray-200 -translate-x-1/2" />

          <div className="space-y-8 md:space-y-0">
            {roadmapSteps.map((step, i) => {
              const isLeft = i % 2 === 0;

              return (
                <motion.div
                  key={step.number}
                  className={`relative md:flex items-start ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  {/* Card */}
                  <div
                    className={`md:w-[calc(50%-32px)] ${
                      isLeft ? "md:text-right md:pr-0" : "md:text-left md:pl-0"
                    }`}
                  >
                    <div
                      className={`inline-block bg-white border border-brand-gray-200 rounded-sm p-5 md:p-6 ${
                        isLeft ? "md:mr-0" : "md:ml-0"
                      }`}
                    >
                      <div className="flex items-start gap-4 md:gap-5">
                        <div
                          className={`shrink-0 ${
                            isLeft ? "md:order-2" : ""
                          }`}
                        >
                          <span className="flex items-center justify-center w-10 h-10 rounded-full bg-brand-accent text-white text-sm font-bold">
                            {step.number}
                          </span>
                        </div>
                        <div className={isLeft ? "md:order-1" : ""}>
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
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="hidden md:flex absolute left-1/2 top-0 -translate-x-1/2 items-center justify-center">
                    <div className="w-4 h-4 rounded-full border-2 border-brand-accent bg-white z-10" />
                  </div>

                  {/* Spacer for the other side */}
                  <div className="hidden md:block md:w-[calc(50%-32px)]" />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-14"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <button
            onClick={openModal}
            className="inline-flex items-center justify-center px-8 py-4 text-sm tracking-[0.2em] font-semibold uppercase text-white bg-brand-black hover:bg-neutral-900 transition-all duration-300 rounded-sm cursor-pointer"
          >
            Начать прямо сейчас
          </button>
        </motion.div>
      </div>
    </section>
  );
}
