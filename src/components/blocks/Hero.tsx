"use client";

import { useRef, Fragment } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { tinaField } from "tinacms/dist/react";
import Button from "@/components/ui/Button";
import CountUp from "@/components/ui/CountUp";
import DiverseLogo from "@/components/shared/DiverseLogo";
import { asset } from "@/lib/path";
import { useModal } from "@/lib/modal-context";
import { useUserCity } from "@/lib/user-city-context";
import { siteContent } from "@/data/site-content";

const fallback = siteContent.hero;

export default function Hero({ data }: { data?: typeof fallback }) {
  const s = data ?? fallback;
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
    <>
      {/* Preload Hero image — responsive через imageSrcSet, без media (нет варнингов) */}
      <link
        rel="preload"
        as="image"
        imageSrcSet={asset("/images/hero/main-mobile.webp") + " 767w, " + asset("/images/hero/main.webp") + " 768w"}
        imageSizes="100vw"
      />
      <section
        ref={ref}
        data-header="dark"
        className="relative h-dvh min-h-[600px] overflow-hidden bg-black"
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
          {/* Picture: browser loads only matching media — no double download */}
          <picture>
            <source media="(max-width: 767px)" srcSet={asset("/images/hero/main-mobile.webp")} type="image/webp" sizes="100vw" />
            <source media="(min-width: 768px)" srcSet={asset("/images/hero/main.webp")} type="image/webp" sizes="100vw" />
            <source media="(max-width: 767px)" srcSet={asset("/images/hero/main-mobile.png")} sizes="100vw" />
            <source media="(min-width: 768px)" srcSet={asset("/images/hero/main.jpg")} sizes="100vw" />
            <img
              src={asset("/images/hero/main.jpg")}
              alt="Франшиза Diverse — официальный представитель бренда в России"
              className="absolute inset-0 w-full h-full object-cover object-[50%_20%]"
              fetchPriority="high"
              sizes="100vw"
            />
          </picture>
        </motion.div>

        {/* Layer 3: Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/65 to-black/85" />

        {/* Layer 4: Content */}
        <motion.div
          className="relative z-10 flex flex-col justify-center items-center text-center h-full px-[5vw] max-sm:pt-12 pt-14 md:pt-16"
          style={{ y: textY, opacity }}
        >
          {/* Tagline */}
          <p
            className="hero-a opacity-0 text-xs md:text-sm eyebrow text-white/60 max-sm:mb-4 mb-5"
            style={{ animationDelay: '0.2s' }}
            data-tina-field={tinaField(s, "tagline")}
          >
            {s.tagline}
          </p>

          {/* Main Heading — smoother progression */}
          <h1
            className="hero-a-lg opacity-0 flex flex-col max-md:text-[13vw] md:text-8xl lg:text-9xl font-bold text-white uppercase leading-none max-w-5xl"
            style={{ animationDelay: '0.35s' }}
          >
            <span data-tina-field={tinaField(s, "heading")}>{s.heading}</span>
            <span className="text-brand-accent -mt-1 sm:-mt-2 md:-mt-3 leading-none">
              <DiverseLogo className="h-[0.55em] w-auto block" />
            </span>
          </h1>

          {/* Description — всегда полный текст бренда */}
          <p
            className="hero-a opacity-0 max-sm:mt-4 mt-5 max-sm:text-xs body-text text-white/70 max-w-2xl leading-relaxed"
            style={{ animationDelay: '0.5s' }}
            data-tina-field={tinaField(s, "description")}
          >
            {s.description}
          </p>

          {/* Pricing — separate, more prominent on mobile */}
          <p
            className="hero-a opacity-0 max-sm:mt-3 mt-3 max-sm:text-sm body-text text-white/90 font-medium max-w-2xl leading-snug"
            style={{ animationDelay: '0.6s' }}
            data-tina-field={tinaField(s, "pricing")}
          >
            {s.pricing}
          </p>

          {/* CTA Buttons */}
          <div
            className="hero-a opacity-0 max-sm:mt-6 mt-8 flex flex-col sm:flex-row max-sm:gap-3 gap-3"
            style={{ animationDelay: '0.7s' }}
          >
            <Button variant="accent" size="md" className="max-sm:py-[14px] sm:px-8 sm:py-4" onClick={openModal} data-tina-field={tinaField(s.cta, "consultation")}>
              {s.cta.consultation}
            </Button>
            <Button
              variant="outline"
              size="md"
              onClick={() => document.getElementById("section-cases")?.scrollIntoView({ behavior: "smooth" })}
              className="border-white text-white hover:bg-white hover:text-black max-sm:py-[14px] sm:px-8 sm:py-4"
              data-tina-field={tinaField(s.cta, "cases")}
            >
              {s.cta.cases}
            </Button>
          </div>

            {/* Stats row */}
          <div
            className="hero-a-in opacity-0 max-sm:mt-6 mt-8 md:mt-10 flex max-sm:gap-2 gap-4 md:gap-10 text-center"
            style={{ animationDelay: '0.8s' }}
          >
            {s.stats.map((stat, i) => {
              const match = stat.value.match(/^(\d+)(.*)$/);
              const isLast = i === s.stats.length - 1;
              return (
                <Fragment key={stat.label}>
                  {i > 0 && <div className="w-px bg-white/20" />}
                  <div>
                    <p className={`max-sm:text-xl text-2xl md:text-3xl font-bold ${isLast ? "text-brand-accent" : "text-white"}`} data-tina-field={tinaField(s.stats[i], "value")}>
                      {match ? <CountUp to={Number(match[1])} suffix={match[2]} className={`max-sm:text-xl text-2xl md:text-3xl font-bold ${isLast ? "text-brand-accent" : "text-white"}`} /> : stat.value}
                    </p>
                    <p className="text-xs label text-white/50 mt-1" data-tina-field={tinaField(s.stats[i], "label")}>
                      {stat.label}
                    </p>
                  </div>
                </Fragment>
              );
            })}
          </div>
        </motion.div>

      </section>
    </>
  );
}
