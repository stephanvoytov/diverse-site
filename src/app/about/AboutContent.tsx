"use client";

import { motion } from "framer-motion";
import { useTina } from "tinacms/dist/react";
import { tinaField } from "tinacms/dist/react";
import SectionHeader from "@/components/shared/SectionHeader";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { useModal } from "@/lib/modal-context";
import PartnerTicker from "@/components/blocks/PartnerTicker";
import CountUp from "@/components/ui/CountUp";
import Image from "next/image";
import { asset } from "@/lib/path";

const easeOut: [number, number, number, number] = [0.25, 0.1, 0.25, 1];
const fadeUp = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: easeOut } },
};
const fadeUp12 = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: easeOut } },
};
const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

interface TinaResult {
  data: Record<string, unknown>;
  query: string;
  variables: Record<string, unknown>;
}

export default function AboutContent({ data }: { data: TinaResult | null }) {
  const { data: tinaData } = useTina(data || { data: {}, query: "", variables: {} });
  const s = (tinaData?.pageAbout || {}) as {
    heroEyebrow?: string;
    heroHeading?: string;
    heroDesc?: string;
    stats?: Array<{ num?: number; suffix?: string; label?: string; accent?: boolean }>;
    philosophyEyebrow?: string;
    philosophyHeading?: string;
    philosophyBody1?: string;
    philosophyBody2?: string;
    advantagesEyebrow?: string;
    advantagesHeading?: string;
    advantages?: Array<{ title?: string; desc?: string }>;
    timelineEyebrow?: string;
    timelineHeading?: string;
    milestones?: Array<{ year?: string; title?: string; desc?: string }>;
    repEyebrow?: string;
    repHeading?: string;
    repBody?: string;
    repInn?: string;
    repAddress?: string;
    ctaHeading?: string;
    ctaButton?: string;
  };

  const { open: openModal } = useModal();
  return (
    <>
      <Header />
      <main>
        {/* ===== 1. Hero ===== */}
        <section data-header="dark" className="relative bg-brand-black pt-20 pb-16 md:pt-40 md:pb-32">
          <div className="container-brand text-center">
            <motion.p
              className="text-xs eyebrow text-brand-gray-300 mb-4"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: easeOut }}
              data-tina-field={tinaField(s, "heroEyebrow")}
            >
              {s.heroEyebrow}
            </motion.p>
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-5"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: easeOut }}
              data-tina-field={tinaField(s, "heroHeading")}
              dangerouslySetInnerHTML={{ __html: s.heroHeading || "" }}
            />
            <motion.p
              className="body-text text-white/60 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2, ease: easeOut }}
              data-tina-field={tinaField(s, "heroDesc")}
            >
              {s.heroDesc}
            </motion.p>
          </div>
        </section>

        {/* ===== 2. Stats ===== */}
        <section data-header="light" className="bg-white py-16 md:py-20">
          <div className="container-brand">
            <motion.div
              className="flex flex-nowrap justify-center gap-6 md:gap-20 text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
            >
              {(s.stats || []).map((stat) => (
                <motion.div key={stat.label} variants={fadeUp12}>
                  <p
                    className={`text-5xl md:text-6xl font-bold ${stat.accent ? "text-brand-accent" : "text-brand-black"}`}
                    data-tina-field={tinaField(stat, "num")}
                  >
                    <CountUp to={stat.num || 0} suffix={stat.suffix || ""} className="" />
                  </p>
                  <p
                    className="text-[10px] md:text-xs label text-brand-gray-400 mt-1 md:mt-2"
                    data-tina-field={tinaField(stat, "label")}
                  >
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ===== 3. PartnerTicker ===== */}
        <PartnerTicker simple />

        {/* ===== 4. О бренде — философия + фото бренда ===== */}
        <section data-header="light" className="bg-brand-gray-100 py-20 md:py-28">
          <div className="container-brand max-w-4xl">
            <SectionHeader
              eyebrow={s.philosophyEyebrow}
              eyebrowField={tinaField(s, "philosophyEyebrow")}
            >
              <span data-tina-field={tinaField(s, "philosophyHeading")} dangerouslySetInnerHTML={{ __html: s.philosophyHeading || "" }} />
            </SectionHeader>

            <motion.div
              className="space-y-8 body-text text-brand-gray-400 leading-relaxed"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                visible: { transition: { staggerChildren: 0.1 } },
              }}
            >
              <motion.p variants={fadeUp} data-tina-field={tinaField(s, "philosophyBody1")}>
                {s.philosophyBody1}
              </motion.p>

              {/* Фото бренда — разбивает текст */}
              <motion.div variants={fadeUp} className="not-prose">
                <div className="relative aspect-[2/1] md:aspect-[3/1] rounded-sm overflow-hidden">
                  <Image
                    src={asset("/images/about/diverse.jpg")}
                    alt="Diverse — бренд одежды"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, 896px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              </motion.div>

              <motion.p variants={fadeUp} data-tina-field={tinaField(s, "philosophyBody2")}>
                {s.philosophyBody2}
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* ===== 5. Европейское качество ===== */}
        <section data-header="light" className="bg-white py-20 md:py-28">
          <div className="container-brand">
            <SectionHeader
              eyebrow={s.advantagesEyebrow}
              eyebrowField={tinaField(s, "advantagesEyebrow")}
            >
              <span data-tina-field={tinaField(s, "advantagesHeading")} dangerouslySetInnerHTML={{ __html: s.advantagesHeading || "" }} />
            </SectionHeader>

            <motion.div
              className="grid md:grid-cols-3 gap-8 md:gap-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
            >
              {(s.advantages || []).map((col) => (
                <motion.div
                  key={col.title}
                  variants={fadeUp}
                  className="border border-brand-gray-200 rounded-lg p-8 text-center"
                >
                  <h3 className="text-lg font-bold text-brand-black mb-3" data-tina-field={tinaField(col, "title")}>{col.title}</h3>
                  <p className="text-sm text-brand-gray-400 leading-relaxed" data-tina-field={tinaField(col, "desc")}>{col.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ===== 6. Timeline ===== */}
        <section data-header="light" className="bg-brand-gray-100 py-20 md:py-28">
          <div className="container-brand">
            <SectionHeader
              eyebrow={s.timelineEyebrow}
              eyebrowField={tinaField(s, "timelineEyebrow")}
            >
              <span data-tina-field={tinaField(s, "timelineHeading")} dangerouslySetInnerHTML={{ __html: s.timelineHeading || "" }} />
            </SectionHeader>

            <motion.div
              className="relative max-w-3xl mx-auto"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                visible: { transition: { staggerChildren: 0.08 } },
              }}
            >
              <div className="absolute left-[19px] top-0 bottom-0 w-px bg-brand-gray-300 md:left-1/2 md:-translate-x-px" />

              {(s.milestones || []).map((m, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <motion.div
                    key={m.year}
                    variants={fadeUp}
                    className={`relative flex items-start gap-6 pb-12 last:pb-0 md:gap-0 ${
                      isLeft ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    <div className="relative z-10 shrink-0 md:absolute md:left-1/2 md:-translate-x-1/2">
                      <div className="w-[38px] h-[38px] rounded-full bg-white border-2 border-brand-accent flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-brand-accent" />
                      </div>
                    </div>

                    <div className={`max-md:flex-1 md:flex-none md:w-[calc(50%-28px)] ${isLeft ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"}`}>
                      <span className="inline-block text-sm font-bold text-brand-accent mb-1" data-tina-field={tinaField(m, "year")}>{m.year}</span>
                      <h3 className="text-xl font-bold text-brand-black mb-2" data-tina-field={tinaField(m, "title")}>{m.title}</h3>
                      <p className="text-sm text-brand-gray-400 leading-relaxed" data-tina-field={tinaField(m, "desc")}>{m.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Collections link */}
            <motion.div
              className="text-center mt-16 pt-10 border-t border-brand-gray-200"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <p className="text-sm text-brand-gray-400 mb-4">
                Узнайте больше о продукте
              </p>
              <a
                href="/collection/"
                className="inline-flex items-center gap-2 text-sm font-semibold text-brand-accent hover:text-brand-accent-hover transition-colors group"
              >
                Посмотреть коллекции
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </motion.div>
          </div>
        </section>

        {/* ===== 7. Representative ===== */}
        <section data-header="light" className="bg-white py-20 md:py-28">
          <div className="container-brand max-w-4xl">
            <div className="relative border border-brand-gray-200 rounded-lg pt-10 pb-12 px-8 md:px-14">
              <div className="absolute top-0 left-8 right-8 h-1 bg-brand-accent rounded-t-lg" />

              <motion.div
                className="text-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  visible: { transition: { staggerChildren: 0.1 } },
                }}
              >
                <motion.p variants={fadeUp} className="text-xs eyebrow text-brand-gray-400 mb-4" data-tina-field={tinaField(s, "repEyebrow")}>{s.repEyebrow}</motion.p>
                <motion.h2 variants={fadeUp} className="section-title text-brand-black mb-6" data-tina-field={tinaField(s, "repHeading")}>
                  {s.repHeading}
                </motion.h2>
                <motion.p variants={fadeUp} className="body-text text-brand-gray-400 leading-relaxed max-w-2xl mx-auto mb-8" data-tina-field={tinaField(s, "repBody")}>
                  {s.repBody}
                </motion.p>
                <motion.div variants={fadeUp} className="inline-flex items-center gap-2 text-sm text-brand-gray-400">
                  <span className="w-2 h-2 rounded-full bg-brand-accent" />
                  <span data-tina-field={tinaField(s, "repInn")}>{s.repInn}</span>
                  <span className="w-2 h-2 rounded-full bg-brand-accent" />
                  <span data-tina-field={tinaField(s, "repAddress")}>{s.repAddress}</span>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ===== 8. CTA ===== */}
        <section data-header="dark" className="bg-brand-black py-16 md:py-20 text-center">
          <div className="container-brand">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                visible: { transition: { staggerChildren: 0.1 } },
              }}
            >
              <motion.h2
                variants={fadeUp}
                className="section-title text-white mb-6"
                data-tina-field={tinaField(s, "ctaHeading")}
                dangerouslySetInnerHTML={{ __html: s.ctaHeading || "" }}
              />
              <motion.div variants={fadeUp12}>
                <button
                  onClick={openModal}
                  className="btn-accent"
                  data-tina-field={tinaField(s, "ctaButton")}
                >
                  {s.ctaButton}
                </button>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}