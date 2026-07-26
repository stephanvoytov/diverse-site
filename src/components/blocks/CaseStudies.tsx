"use client";

import { useState } from "react";
import Image from "next/image";
import { tinaField } from "tinacms/dist/react";
import SectionHeader from "@/components/shared/SectionHeader";
import FadeIn from "@/components/shared/FadeIn";
import { asset } from "@/lib/path";
import YoutubeEmbed from "@/components/shared/YoutubeEmbed";
import { siteContent } from "@/data/site-content";

const fallback = siteContent.caseStudies;

/** Склонение названий городов для предлога «в» (предложный падеж) */
function inCity(city: string): string {
  const map: Record<string, string> = {
    "Калининград": "Калининграде",
    "Уфа": "Уфе",
  };
  return map[city] ?? city;
}

export default function CaseStudies({ data }: { data?: typeof fallback }) {
  const s = data ?? fallback;
  const [videoOpen] = useState<string | null>(null);

  return (
    <section id="section-cases" data-header="light" className="bg-brand-gray-100 py-16 md:py-24">
      <div className="container-brand">
        {/* Header */}
        <SectionHeader
          eyebrow={s.eyebrow}
          desc={s.desc}
          className="mb-12 md:mb-14"
          margin
          eyebrowField={tinaField(s, "eyebrow")}
          descField={tinaField(s, "desc")}
        >
          <span data-tina-field={tinaField(s, "headingBefore")}>{s.headingBefore}</span>{" "}
          <span className="text-brand-accent" data-tina-field={tinaField(s, "headingAccent")}>{s.headingAccent}</span>
        </SectionHeader>

         {/* Cards */}
        <div className="grid md:grid-cols-2 gap-5 md:gap-6 max-w-4xl mx-auto">
          {(s.cases || []).map((cs: { id: string; city: string; mall: string; photo: string; format: string; youtubeId?: string; quote: string; paybackPeriod: string; profitMonth: string; investment: string; opened: string; area: string; _content_source?: unknown }, i: number) => {
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
                    alt={`Магазин Diverse в ${inCity(cs.city)}`}
                    width={500}
                    height={375}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={i === 0}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                )}
                {/* Badge */}
                <div className="absolute top-3 left-3 bg-brand-accent text-white text-[9px] font-bold px-2.5 py-1 rounded-sm uppercase tracking-[0.08em]" data-tina-field={tinaField(cs, "format")}>
                  {cs.format}
                </div>
              </div>

              {/* Info */}
              <div className="p-5 md:p-6 space-y-3">
                {/* City + Mall */}
                <div>
                  <p className="text-base font-bold text-brand-black" data-tina-field={tinaField(cs, "city")}>{cs.city}</p>
                  <p className="text-xs font-semibold text-brand-accent" data-tina-field={tinaField(cs, "mall")}>
                    {cs.mall.replace(/[«»]/g, "")}
                  </p>
                </div>

                {/* Quote */}
                <p className="text-[13px] text-brand-gray-500 leading-relaxed italic pt-3 border-t border-brand-gray-200" data-tina-field={tinaField(cs, "quote")}>
                  &laquo;{cs.quote}&raquo;
                </p>

                {/* Divider */}
                <div className="h-px bg-brand-gray-200" />

                {/* Financial metrics */}
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <p className="text-base font-bold text-brand-black" data-tina-field={tinaField(cs, "paybackPeriod")}>{cs.paybackPeriod}</p>
                    <p className="text-[10px] text-brand-gray-400 tracking-[0.05em] uppercase" data-tina-field={tinaField(s.caseLabels, "payback")}>{s.caseLabels.payback}</p>
                  </div>
                  <div>
                    <p className="text-base font-bold text-brand-accent" data-tina-field={tinaField(cs, "profitMonth")}>{cs.profitMonth}</p>
                    <p className="text-[10px] text-brand-gray-400 tracking-[0.05em] uppercase" data-tina-field={tinaField(s.caseLabels, "profitMonth")}>{s.caseLabels.profitMonth}</p>
                  </div>
                  <div>
                    <p className="text-base font-bold text-brand-gray-500" data-tina-field={tinaField(cs, "investment")}>{cs.investment}</p>
                    <p className="text-[10px] text-brand-gray-400 tracking-[0.05em] uppercase" data-tina-field={tinaField(s.caseLabels, "investment")}>{s.caseLabels.investment}</p>
                  </div>
                </div>

                {/* Opened */}
                {cs.opened && (
                  <p className="text-xs text-brand-gray-400">
                    <span data-tina-field={tinaField(s, "openedPrefix")}>{s.openedPrefix}</span> <span data-tina-field={tinaField(cs, "opened")}>{cs.opened}</span> <span data-tina-field={tinaField(s, "openedSuffix")}>{s.openedSuffix}</span>
                    {cs.area !== "—" && <span data-tina-field={tinaField(cs, "area")}> · {cs.area}</span>}
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
