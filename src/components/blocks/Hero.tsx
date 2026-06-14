"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Button from "@/components/ui/Button";
import DiverseLogo from "@/components/shared/DiverseLogo";
import { asset } from "@/lib/path";
import { useModal } from "@/lib/modal-context";

export default function Hero() {
  const { open: openModal } = useModal();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

  return (
    <section
      ref={ref}
      data-header="dark"
      className="relative h-screen min-h-[600px] overflow-hidden bg-black"
    >
      {/* Layer 1: Fallback gradient (always on) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #2a2a2a 100%)",
        }}
      />

      {/* Layer 2: Photo with parallax */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center max-md:bg-[30%_center] bg-no-repeat"
        style={{
          backgroundImage: `url('${asset("/images/hero.webp")}')`,
          y: backgroundY,
        }}
      />

      {/* Layer 3: Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/65 to-black/85" />

      {/* Layer 4: Content */}
      <motion.div
        className="relative z-10 flex flex-col justify-center items-center text-center h-full px-6 max-sm:pt-12 pt-14 md:pt-16"
        style={{ y: textY, opacity }}
      >
        {/* Tagline */}
        <motion.p
          className="text-xs md:text-sm tracking-[0.3em] uppercase text-white/60 max-sm:mb-4 mb-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Официальный представитель в России
        </motion.p>

        {/* Main Heading */}
        <motion.h1
          className="flex flex-col max-sm:text-4xl text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-bold text-white uppercase leading-none max-w-5xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <span>Франшиза</span>
          <span className="text-brand-accent -mt-1 sm:-mt-2 md:-mt-3 leading-none">
            <DiverseLogo className="h-[0.55em] w-auto block" />
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="max-sm:mt-4 mt-5 text-base md:text-lg text-white/70 max-w-2xl leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Польский бренд. Партнёр Dakar Rally. 30+ лет на рынке.
          <br />
          <span className="text-white/90">
            0₽ паушальный взнос · 0% роялти · Свой склад в Европе
          </span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="max-sm:mt-6 mt-8 flex flex-col sm:flex-row max-sm:gap-3 gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Button variant="accent" size="lg" onClick={openModal}>
            Стать партнёром
          </Button>
          <Button
            variant="outline"
            size="lg"
            href="/franchise/"
            className="border-white text-white hover:bg-white hover:text-black"
          >
            Узнать больше
          </Button>
        </motion.div>

        {/* Presentation link (hidden on mid-size screens to save space) */}
        <motion.div
          className="max-sm:mt-4 mt-5 hidden lg:block"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <button
            onClick={openModal}
            className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-white/40 hover:text-white/80 transition-colors cursor-pointer"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 1v8M5 6l3 3 3-3M2 12v2a1 1 0 001 1h10a1 1 0 001-1v-2"/>
            </svg>
            Скачать презентацию
          </button>
        </motion.div>

        {/* Stats row */}
        <motion.div
          className="max-sm:mt-6 mt-8 md:mt-10 flex max-sm:gap-2 gap-4 md:gap-10 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <div>
            <p className="max-sm:text-xl text-2xl md:text-3xl font-bold text-white">30+</p>
            <p className="text-xs tracking-[0.15em] uppercase text-white/50 mt-1">
              Лет на рынке
            </p>
          </div>
          <div className="w-px bg-white/20" />
          <div>
            <p className="max-sm:text-xl text-2xl md:text-3xl font-bold text-white">400+</p>
            <p className="text-xs tracking-[0.15em] uppercase text-white/50 mt-1">
              Магазинов в мире
            </p>
          </div>
          <div className="w-px bg-white/20" />
          <div>
            <p className="max-sm:text-xl text-2xl md:text-3xl font-bold text-brand-accent">11</p>
            <p className="text-xs tracking-[0.15em] uppercase text-white/50 mt-1">
              В РФ и Казахстане
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute max-sm:bottom-3 bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-2 bg-white/60 rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
