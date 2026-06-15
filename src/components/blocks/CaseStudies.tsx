"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { caseStudies } from "@/data/metrics";
import YoutubeEmbed from "@/components/shared/YoutubeEmbed";

export default function CaseStudies() {
  const [videoOpen, setVideoOpen] = useState<string | null>(null);

  return (
    <section id="section-cases" data-header="light" className="bg-white py-16 md:py-24">
      <div className="container-brand">
        {/* Header */}
        <motion.div
          className="text-center mb-12 md:mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          style={{ willChange: "transform, opacity" }}
        >
          <p className="text-xs tracking-[0.3em] uppercase text-brand-gray-400 mb-4">
            Реальные результаты
          </p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-brand-black leading-[1.1] mb-4">
            Кейсы действующих <span className="text-brand-accent">франчайзи</span>
          </h2>
          <p className="text-base md:text-lg text-brand-gray-400 max-w-xl mx-auto">
            11 магазинов в России и СНГ — от Калининграда до Якутска и Алматы
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-5 md:gap-6 max-w-5xl mx-auto">
          {caseStudies.map((cs, i) => {
            const isVideo = videoOpen === cs.id;

            return (
            <motion.div
              key={cs.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{ willChange: "transform, opacity" }}
              className="group rounded-sm overflow-hidden border border-brand-gray-200 bg-white hover:border-brand-gray-300 hover:shadow-sm transition-[border-color,box-shadow] duration-300"
            >
              {/* Photo / Video */}
              <div className="aspect-[4/3] bg-brand-gray-100 overflow-hidden relative">
                {isVideo && cs.youtubeId ? (
                  <YoutubeEmbed videoId={cs.youtubeId} />
                ) : (
                  <Image
                    src={cs.photo}
                    alt={`Магазин Diverse в ${cs.city}`}
                    width={500}
                    height={375}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  />
                )}
                {/* Badge */}
                <div className="absolute top-3 left-3 bg-brand-accent text-white text-[10px] font-bold px-2.5 py-1 rounded-sm uppercase tracking-wide">
                  {cs.format}
                </div>
                {cs.youtubeId && !isVideo && (
                  <button
                    onClick={() => setVideoOpen(cs.id)}
                    className="absolute top-3 right-3 bg-black/70 hover:bg-black/90 text-white text-[10px] font-semibold px-2.5 py-1.5 rounded-sm uppercase tracking-wide flex items-center gap-1.5 transition-colors"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    Видео
                  </button>
                )}
                {isVideo && cs.youtubeId && (
                  <button
                    onClick={() => setVideoOpen(null)}
                    className="absolute top-3 right-3 bg-black/70 hover:bg-black/90 text-white text-[10px] font-semibold px-2.5 py-1.5 rounded-sm uppercase tracking-wide flex items-center gap-1.5 transition-colors"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Фото
                  </button>
                )}
              </div>

              {/* Info */}
              <div className="p-5 md:p-6 space-y-3">
                {/* City + Mall */}
                <div>
                  <p className="text-base font-bold text-brand-black">{cs.city}</p>
                  <p className="text-xs font-semibold text-brand-accent">
                    {cs.mall.replace(/[«»]/g, "")}
                  </p>
                </div>

                {/* Quote */}
                <p className="text-sm text-brand-gray-500 leading-relaxed italic border-l-2 border-brand-accent/30 pl-3">
                  &laquo;{cs.quote}&raquo;
                </p>

                {/* Divider */}
                <div className="h-px bg-brand-gray-200" />

                {/* Financial metrics */}
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <p className="text-base font-bold text-brand-black">{cs.paybackPeriod}</p>
                    <p className="text-[11px] text-brand-gray-400">Окупаемость</p>
                  </div>
                  <div>
                    <p className="text-base font-bold text-brand-accent">{cs.profitMonth}</p>
                    <p className="text-[11px] text-brand-gray-400">Прибыль / мес</p>
                  </div>
                  <div>
                    <p className="text-base font-bold text-brand-gray-500">{cs.investment}</p>
                    <p className="text-[11px] text-brand-gray-400">Инвестиции</p>
                  </div>
                </div>

                {/* Opened */}
                {cs.opened && (
                  <p className="text-xs text-brand-gray-400">
                    Открыт в {cs.opened} году
                    {cs.area !== "—" && ` · ${cs.area}`}
                  </p>
                )}
              </div>
            </motion.div>
          );
        })}
        </div>
      </div>
    </section>
  );
}
