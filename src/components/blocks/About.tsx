"use client";

import { motion } from "framer-motion";
import CountUp from "@/components/ui/CountUp";
import { aboutStats } from "@/data/brand";

const easeInOut: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeInOut } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } },
};

export default function About() {
  return (
    <section data-header="light" className="bg-white">
      <div className="container-brand py-5 md:py-8">
        {/* Header — два текстовых блока */}
        <motion.div
          className="grid md:grid-cols-2 gap-6 md:gap-10 mb-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          <motion.div variants={fadeUp}>
            <p className="text-xs eyebrow text-brand-gray-400 mb-4">
              О бренде
            </p>
            <h2 className="section-title text-brand-black">
              Diverse: <br />
              <span className="text-brand-accent">30+ лет</span> истории
            </h2>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-col justify-end">
            <p className="body-text text-brand-gray-400 leading-relaxed">
              Польский fashion-бренд с характером: сильный дизайн, европейское качество, дерзкая энергия. Рождён в Гданьске, вдохновлён уличной культурой и спортом.
            </p>
          </motion.div>

        </motion.div>

        {/* Stats — один observer, дети через stagger */}
        <motion.div
          className="flex gap-5 md:gap-16 mb-4 max-md:justify-between"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
        >
          {aboutStats.map((stat) => {
            const match = stat.num.match(/^(\d+)(.*)$/);
            const countUp = match ? (
              <CountUp
                to={Number(match[1])}
                suffix={match[2]}
                className={`text-3xl md:text-4xl font-bold ${stat.accent ? "text-brand-accent" : "text-brand-black"}`}
              />
            ) : (
              stat.num
            );

            return (
              <motion.div
                key={stat.num}
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <p className={`text-3xl md:text-4xl font-bold ${stat.accent ? "text-brand-accent" : "text-brand-black"}`}>
                  {countUp}
                </p>
                <p className="text-xs label text-brand-gray-400 mt-1">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Links — один observer */}
        <motion.div
          className="mt-4 md:mt-10 flex max-sm:flex-col items-center gap-3 md:gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          <motion.div variants={fadeUp}>
            <a
              href="/about/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-black hover:text-brand-accent transition-colors group"
            >
              Подробнее о бренде
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </motion.div>
          <motion.span
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            className="max-sm:hidden w-px h-4 bg-brand-gray-200"
          />
          <motion.div variants={fadeUp}>
            <a
              href="/collection/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-black hover:text-brand-accent transition-colors group"
            >
              Посмотреть коллекции
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
