"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTina } from "tinacms/dist/react";
import { tinaField } from "tinacms/dist/react";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { useModal } from "@/lib/modal-context";
import { collections } from "@/data/collections";
import { asset } from "@/lib/path";

function CollectionSection({
  item,
  index,
}: {
  item: (typeof collections)[number];
  index: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["-30%", "30%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [0, 1, 1, 0],
  );
  const scale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);

  const isFirst = index === 0;
  const isEven = index % 2 === 0;

  return (
    <section
      ref={ref}
      className="relative h-dvh w-full overflow-hidden snap-start"
    >
      {/* Parallax background */}
      <motion.div
        style={{ y: bgY, scale }}
        className="absolute inset-0 will-change-transform"
      >
        {item.image ? (
          <Image
            src={asset(`/images/collections/${item.image}`)}
            alt={`Коллекция ${item.name}`}
            fill
            className="object-cover"
            style={{ objectPosition: item.bgPosition || "center" }}
            sizes="100vw"
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${item.colorFrom}, ${item.colorTo})`,
            }}
          />
        )}
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />
        {/* Diagonal accent — alternates side */}
        <div
          className={`absolute top-0 h-full w-px bg-white/[0.04] ${
            isEven ? "left-[15%]" : "right-[15%]"
          }`}
        />
        {/* Large watermark — alternates side */}
        <div
          className={`absolute inset-0 flex items-center ${
            isEven ? "justify-start pl-[8%]" : "justify-end pr-[8%]"
          }`}
        >
          <span className="text-[clamp(8rem,25vw,20rem)] font-black text-white/[0.04] select-none tracking-[0.05em] leading-none">
            {item.short}
          </span>
        </div>
      </motion.div>

      {/* Content — always left-aligned for readability */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 h-full flex flex-col justify-end pb-16 md:pb-20 lg:pb-24"
      >
        <div className="container-brand w-full">
          <div className="max-w-xl">
            {/* Index + tag */}
            <div className="flex items-center gap-3 mb-2 md:mb-3">
              <span className="text-xs md:text-sm tracking-[0.25em] font-semibold text-white/40">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="w-8 h-px bg-white/20" />
              <span className="text-xs md:text-sm tracking-[0.25em] font-semibold text-brand-accent">
                {item.tag}
              </span>
            </div>

            {/* Name */}
            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white leading-[0.92] tracking-[-0.02em] mt-1">
              {item.name}
            </h2>

            {/* Description */}
            <p className="text-base sm:text-lg md:text-xl text-white/70 leading-relaxed mt-3 md:mt-4 max-w-lg">
              {item.vibe}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Scroll hint */}
      {isFirst && (
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <span className="text-[10px] tracking-[0.3em] text-white/30 uppercase">
            Листайте
          </span>
          <motion.span
            className="block w-px h-8 bg-white/20"
            animate={{ height: [8, 24, 8] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      )}
    </section>
  );
}

interface TinaData {
  heroEyebrow?: string;
  heroHeading?: string;
  heroDesc?: string;
  ctaEyebrow?: string;
  ctaHeading?: string;
  ctaDesc?: string;
  ctaButton?: string;
  [key: string]: unknown;
}

interface TinaResult {
  data: Record<string, unknown>;
  query: string;
  variables: Record<string, unknown>;
}

export default function CollectionContent({ data }: { data: TinaResult }) {
  const { data: tinaData } = useTina(data);
  const s = tinaData.pageCollection as TinaData;
  const { open: openModal } = useModal();
  return (
    <>
      <Header transparent />
      <main className="bg-black snap-y snap-mandatory">
        {/* Hero */}
        <section className="relative h-dvh w-full overflow-hidden snap-start bg-black">
          <div className="absolute inset-0">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)",
              }}
            >
              <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                  backgroundSize: "40px 40px",
                }}
              />
              <div className="absolute top-0 left-1/4 h-full w-px bg-white/[0.03]" />
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
          <div className="relative z-10 h-full flex flex-col justify-center">
            <div className="container-brand">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-3xl"
              >
                <span
                  className="text-xs eyebrow text-brand-accent font-semibold mb-4 block"
                  data-tina-field={tinaField(s, "heroEyebrow")}
                >
                  {s.heroEyebrow}
                </span>
                <h1
                  className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.05] tracking-[-0.02em]"
                  data-tina-field={tinaField(s, "heroHeading")}
                  dangerouslySetInnerHTML={{ __html: s.heroHeading || "" }}
                />
                <p
                  className="body-text text-white/50 max-w-xl mt-4 md:mt-6 leading-relaxed"
                  data-tina-field={tinaField(s, "heroDesc")}
                >
                  {s.heroDesc}
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Collection sections */}
        {collections.map((item, index) => (
          <CollectionSection key={item.id} item={item} index={index} />
        ))}

        {/* CTA */}
        <section className="relative h-dvh w-full overflow-hidden snap-start bg-black flex items-center justify-center">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background:
                "radial-gradient(ellipse at center, #e94560 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />
          <div className="relative z-10 container-brand text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span
                className="text-xs eyebrow text-brand-accent font-semibold mb-4 block"
                data-tina-field={tinaField(s, "ctaEyebrow")}
              >
                {s.ctaEyebrow}
              </span>
              <h2
                className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-4"
                data-tina-field={tinaField(s, "ctaHeading")}
                dangerouslySetInnerHTML={{ __html: s.ctaHeading || "" }}
              />
              <p
                className="text-white/50 body-text max-w-md mx-auto mb-8 leading-relaxed"
                data-tina-field={tinaField(s, "ctaDesc")}
              >
                {s.ctaDesc}
              </p>
              <button
                onClick={openModal}
                className="inline-flex items-center justify-center px-10 py-4 text-sm tracking-[0.2em] font-semibold uppercase text-white bg-brand-accent hover:bg-brand-accent-hover transition-all duration-300 rounded-sm cursor-pointer"
                data-tina-field={tinaField(s, "ctaButton")}
              >
                {s.ctaButton}
              </button>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}