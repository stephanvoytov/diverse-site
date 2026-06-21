"use client";

import { useState } from "react";
import Image from "next/image";
import SectionHeader from "@/components/shared/SectionHeader";
import FadeIn from "@/components/shared/FadeIn";
import { caseStudies } from "@/data/metrics";
import { asset } from "@/lib/path";
import YoutubeEmbed from "@/components/shared/YoutubeEmbed";

export default function CaseStudies() {
  const [videoOpen, setVideoOpen] = useState<string | null>(null);

  return (
    <section id="section-cases" data-header="light" className="bg-white py-16 md:py-24">
      <div className="container-brand">
        {/* Header */}
        <SectionHeader
          eyebrow="Реальные результаты"
          desc="Реальные истории партнёров — от Калининграда до Уфы"
          className="mb-12 md:mb-14"
          margin
        >
          Кейсы действующих <span className="text-brand-accent">франчайзи</span>
        </SectionHeader>

         {/* Cards */}
        <div className="grid md:grid-cols-2 gap-5 md:gap-6 max-w-4xl mx-auto">
          {caseStudies.map((cs, i) => {
            const isVideo = videoOpen === cs.id;

            return (
            <FadeIn
              as="article"
              key={cs.id}
              delay={i * 0.1}
              duration={0.5}
              y={30}
              margin
              className={`group rounded-sm overflow-hidden border border-brand-gray-200 bg-white hover:border-[rgba(0,0,0,0.15)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)] transition-[border-color,box-shadow] duration-300 ${
                i >= 2 ? 'hidden' : ''
              }`}
            >
              {/* Photo / Video */}
              <div className="aspect-[4/3] bg-brand-gray-100 overflow-hidden relative">
                {isVideo && cs.youtubeId ? (
                  <YoutubeEmbed videoId={cs.youtubeId} />
                ) : (
                  <Image
                    src={asset(cs.photo)}
                    alt={`Магазин Diverse в ${cs.city}`}
                    width={500}
                    height={375}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={i === 0}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                )}
                {/* Badge */}
                <div className="absolute top-3 left-3 bg-brand-accent text-white text-[9px] font-bold px-2.5 py-1 rounded-sm uppercase tracking-[0.08em]">
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
                <p className="text-[13px] text-brand-gray-500 leading-relaxed italic pt-3 border-t border-brand-gray-200">
                  &laquo;{cs.quote}&raquo;
                </p>

                {/* Divider */}
                <div className="h-px bg-brand-gray-200" />

                {/* Financial metrics */}
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <p className="text-base font-bold text-brand-black">{cs.paybackPeriod}</p>
                    <p className="text-[10px] text-brand-gray-400 tracking-[0.05em] uppercase">Окупаемость</p>
                  </div>
                  <div>
                    <p className="text-base font-bold text-brand-accent">{cs.profitMonth}</p>
                    <p className="text-[10px] text-brand-gray-400 tracking-[0.05em] uppercase">Прибыль / мес</p>
                  </div>
                  <div>
                    <p className="text-base font-bold text-brand-gray-500">{cs.investment}</p>
                    <p className="text-[10px] text-brand-gray-400 tracking-[0.05em] uppercase">Инвестиции</p>
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
            </FadeIn>
          );
        })}
        </div>
      </div>
    </section>
  );
}
