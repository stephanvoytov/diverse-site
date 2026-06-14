"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Button from "@/components/ui/Button";
import { asset } from "@/lib/path";

export default function Hero() {
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
          backgroundImage: `url('${asset("/images/hero.jpg")}')`,
          y: backgroundY,
        }}
      />

      {/* Layer 3: Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />

      {/* Layer 4: Content */}
      <motion.div
        className="relative z-10 flex flex-col justify-center items-center text-center h-full px-6 pt-16 md:pt-20"
        style={{ y: textY, opacity }}
      >
        {/* Tagline */}
        <motion.p
          className="text-xs md:text-sm tracking-[0.3em] uppercase text-white/60 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Официальный представитель в России
        </motion.p>

        {/* Main Heading */}
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white uppercase leading-[1.05] max-w-5xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Франшиза
          <br />
          <span className="text-brand-accent">Diverse</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="mt-6 text-base md:text-lg text-white/70 max-w-2xl leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Культовый польский бренд. Партнёр Dakar Rally.
          <br />
          <span className="text-white/90">
            0₽ паушальный взнос · 0% роялти
          </span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="mt-10 flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Button variant="accent" size="lg" href="/franchise">
            Стать партнёром
          </Button>
          <Button
            variant="outline"
            size="lg"
            href="/franchise"
            className="border-white text-white hover:bg-white hover:text-black"
          >
            Узнать больше
          </Button>
        </motion.div>

        {/* Presentation link */}
        <motion.div
          className="mt-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <a
            href="#section-contacts"
            className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-white/40 hover:text-white/80 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 1v8M5 6l3 3 3-3M2 12v2a1 1 0 001 1h10a1 1 0 001-1v-2"/>
            </svg>
            Скачать презентацию франшизы
          </a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          className="mt-10 md:mt-16 flex gap-4 md:gap-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <div>
            <p className="text-2xl md:text-3xl font-bold text-white">30+</p>
            <p className="text-xs tracking-[0.15em] uppercase text-white/50 mt-1">
              Лет на рынке
            </p>
          </div>
          <div className="w-px bg-white/20" />
          <div>
            <p className="text-2xl md:text-3xl font-bold text-white">400+</p>
            <p className="text-xs tracking-[0.15em] uppercase text-white/50 mt-1">
              Магазинов в мире
            </p>
          </div>
          <div className="w-px bg-white/20" />
          <div>
            <p className="text-2xl md:text-3xl font-bold text-brand-accent">11</p>
            <p className="text-xs tracking-[0.15em] uppercase text-white/50 mt-1">
              В РФ и Казахстане
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
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
