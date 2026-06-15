"use client";

import { motion } from "framer-motion";
import CountUp from "@/components/ui/CountUp";
import { subbrands, aboutStats } from "@/data/brand";
import { asset } from "@/lib/path";

function ParallaxCard({ item }: { item: (typeof subbrands)[0] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0, transition: { duration: 0.6 } }}
      viewport={{ once: true, margin: "-60px" }}
      style={{ willChange: "transform, opacity" }}
      className="group relative rounded-sm overflow-hidden aspect-[7/8] cursor-pointer"
      whileHover={{ scale: 1.02, transition: { duration: 0.4 } }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${asset(item.img)}')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90 transition-all duration-500" />
      <div className="absolute bottom-0 left-0 right-0 p-6">
          <motion.h3
            className="text-xl md:text-2xl font-bold text-white mb-2"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: 0.2 }}
            style={{ willChange: "transform, opacity" }}
          >
          {item.name}
        </motion.h3>
        <p className="text-sm text-white/70 leading-relaxed">
          {item.desc}
        </p>
      </div>
    </motion.div>
  );
}

export default function About() {
  return (
    <section data-header="light" className="min-h-screen bg-white">
      <div className="container-brand py-6 md:py-8">
        {/* Header */}
        <div
          className="grid md:grid-cols-2 gap-8 md:gap-12 mb-8"
        >
          <div>
            <motion.p
              className="text-xs tracking-[0.3em] uppercase text-brand-gray-400 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5 }}
              style={{ willChange: "transform, opacity" }}
            >
              О бренде
            </motion.p>
            <motion.h2
              className="text-3xl md:text-5xl lg:text-6xl font-bold text-brand-black leading-[1.1]"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{ willChange: "transform, opacity" }}
            >
              Diverse — <br />
              <span className="text-brand-accent">30+ лет</span> истории
            </motion.h2>
          </div>
          <div className="flex flex-col justify-end">
            <motion.p
              className="text-base md:text-lg text-brand-gray-400 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ willChange: "transform, opacity" }}
            >
              Один из крупнейших fashion-брендов Восточной Европы. Более 400
              магазинов в 20+ странах мира. В России и СНГ — ООО «Хаус»,
              11 магазинов в России и Казахстане.
            </motion.p>
          </div>
        </div>

        {/* Stats */}
        <motion.div
          className="flex gap-5 md:gap-16 mb-6 pb-6 border-b border-brand-gray-200 max-md:justify-between"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ willChange: "opacity" }}
        >
          {aboutStats.map((stat, i) => (
            <motion.div
              key={stat.num}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: 0.35 + i * 0.1 }}
              style={{ willChange: "transform, opacity" }}
            >
              <p
                className={`text-3xl md:text-4xl font-bold ${
                  stat.accent ? "text-brand-accent" : "text-brand-black"
                }`}
              >
                {(() => {
                  const match = stat.num.match(/^(\d+)(.*)$/);
                  if (!match) return stat.num;
                  const [, digits, suffix] = match;
                  return <CountUp to={Number(digits)} suffix={suffix} className={`text-3xl md:text-4xl font-bold ${stat.accent ? "text-brand-accent" : "text-brand-black"}`} />;
                })()}
              </p>
              <p className="text-xs tracking-[0.15em] uppercase text-brand-gray-400 mt-1">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Sub-brand cards */}
        <div
          className="grid md:grid-cols-3 gap-4 md:gap-5"
        >
          {subbrands.map((item, i) => (
            <ParallaxCard key={item.name} item={item} />
          ))}
        </div>

        {/* Links */}
        <motion.div
          className="mt-8 md:mt-10 flex max-sm:flex-col items-center gap-3 md:gap-6"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4, delay: 0.3 }}
          style={{ willChange: "transform, opacity" }}
        >
          <a
            href="/about/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-black hover:text-brand-accent transition-colors group"
          >
            Подробнее о бренде
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
          <span className="max-sm:hidden w-px h-4 bg-brand-gray-200" />
          <a
            href="/collection/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-black hover:text-brand-accent transition-colors group"
          >
            Посмотреть коллекции
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
