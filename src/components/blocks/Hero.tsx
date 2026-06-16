"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Button from "@/components/ui/Button";
import CountUp from "@/components/ui/CountUp";
import DiverseLogo from "@/components/shared/DiverseLogo";
import { asset } from "@/lib/path";
import { useModal } from "@/lib/modal-context";
import { useUserCity } from "@/lib/user-city-context";

export default function Hero() {
  const { open: openModal } = useModal();
  const { city } = useUserCity();
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
      data-header="light"
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
        className="absolute inset-0 overflow-hidden"
        style={{ y: backgroundY }}
      >
        {/* Desktop photo */}
        <div className="max-md:hidden absolute inset-0">
          <Image
            src={asset("/images/hero/main.jpg")}
            alt="Франшиза Diverse — официальный представитель бренда в России"
            fill
            className="object-cover object-[50%_20%]"
            priority
            sizes="100vw"
          />
        </div>
        {/* Mobile photo (9:16) */}
        <div className="md:hidden absolute inset-0">
          <Image
            src={asset("/images/hero/main-mobile.png")}
            alt="Франшиза Diverse — официальный представитель бренда в России"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
        </div>
      </motion.div>

      {/* Layer 3: Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/65 to-black/85" />

      {/* Layer 4: Content */}
      <motion.div
        className="relative z-10 flex flex-col justify-center items-center text-center h-full px-[5vw] max-sm:pt-12 pt-14 md:pt-16"
        style={{ y: textY, opacity }}
      >
        {/* Tagline */}
        <motion.p
          className="text-xs md:text-sm tracking-[0.3em] uppercase text-white/60 max-sm:mb-4 mb-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Официальный представитель бренда в России
        </motion.p>

        {/* Main Heading — smoother progression */}
        <motion.h1
          className="flex flex-col max-md:text-[13vw] md:text-8xl lg:text-9xl font-bold text-white uppercase leading-none max-w-5xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <span>Франшиза</span>
          <span className="text-brand-accent -mt-1 sm:-mt-2 md:-mt-3 leading-none">
            <DiverseLogo className="h-[0.55em] w-auto block" />
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          className="max-sm:mt-4 mt-5 max-sm:text-xs text-base md:text-lg text-white/70 max-w-2xl leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {city
            ? `Откройте Diverse в ${city} — рядом с вами уже 11 магазинов сети`
            : <>
                <span className="max-sm:hidden">Готовая модель бизнеса в сегменте масс-маркет/мидл. Один из самых популярных брендов в Европе. Партнёр Dakar Rally.</span>
                <span className="sm:hidden">Готовая модель бизнеса в сегменте масс-маркет/мидл. Один из самых популярных брендов в Европе. Партнёр Dakar Rally.</span>
              </>}
        </motion.p>

        {/* Pricing — separate, more prominent on mobile */}
        <motion.p
          className="max-sm:mt-3 mt-3 max-sm:text-sm text-base md:text-lg text-white/90 font-medium max-w-2xl leading-snug"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          0&nbsp;₽ паушальный взнос&nbsp;·&nbsp;0%&nbsp;роялти&nbsp;·&nbsp;от&nbsp;800&nbsp;000&nbsp;₽
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="max-sm:mt-6 mt-8 flex flex-col sm:flex-row max-sm:gap-3 gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Button variant="accent" size="md" className="sm:px-8 sm:py-4" onClick={openModal}>
            Получить консультацию
          </Button>
          <Button
            variant="outline"
            size="md"
            onClick={() => document.getElementById("section-cases")?.scrollIntoView({ behavior: "smooth" })}
            className="border-white text-white hover:bg-white hover:text-black sm:px-8 sm:py-4"
          >
            Посмотреть кейсы
          </Button>
        </motion.div>

        {/* Stats row */}
        <motion.div
          className="max-sm:mt-6 mt-8 md:mt-10 flex max-sm:gap-2 gap-4 md:gap-10 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <div>
            <p className="max-sm:text-xl text-2xl md:text-3xl font-bold text-white">
              <CountUp to={30} suffix="+" className="max-sm:text-xl text-2xl md:text-3xl font-bold text-white" />
            </p>
            <p className="text-xs tracking-[0.15em] uppercase text-white/50 mt-1">
              Лет на рынке
            </p>
          </div>
          <div className="w-px bg-white/20" />
          <div>
            <p className="max-sm:text-xl text-2xl md:text-3xl font-bold text-white">
              <CountUp to={400} suffix="+" className="max-sm:text-xl text-2xl md:text-3xl font-bold text-white" />
            </p>
            <p className="text-xs tracking-[0.15em] uppercase text-white/50 mt-1">
              Магазинов в мире
            </p>
          </div>
          <div className="w-px bg-white/20" />
          <div>
            <p className="max-sm:text-xl text-2xl md:text-3xl font-bold text-brand-accent">
              <CountUp to={11} className="max-sm:text-xl text-2xl md:text-3xl font-bold text-brand-accent" />
            </p>
            <p className="text-xs tracking-[0.15em] uppercase text-white/50 mt-1">
              В РФ и Казахстане
            </p>
          </div>
        </motion.div>
      </motion.div>

    </section>
  );
}
