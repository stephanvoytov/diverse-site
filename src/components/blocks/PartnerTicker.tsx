"use client";

import Image from "next/image";
import { asset } from "@/lib/path";
import { tinaField } from "tinacms/dist/react";

interface PartnerItem {
  id?: string;
  name?: string;
  logo?: string;
}

interface PartnerTickerProps {
  simple?: boolean;
  data?: {
    partnersEyebrow?: string;
    partnersHeading?: string;
    partnersEyebrowSimple?: { simpleEyebrow?: string };
    partnerItems?: PartnerItem[];
  };
}

export default function PartnerTicker({ simple, data }: PartnerTickerProps) {
  const partners = data?.partnerItems || [];
  if (!partners.length) return null;

  /* prettier-ignore */
  return (
    <section data-header="light" className="bg-white py-16 md:py-24">
      <div className="container-brand text-center">
        {simple ? (
          <p className="text-xs eyebrow text-brand-gray-400 pb-8 md:pb-12" data-tina-field={data ? tinaField(data, "partnersEyebrow") : undefined}>
            {data?.partnersEyebrow || data?.partnersEyebrowSimple?.simpleEyebrow || "Партнёры Diverse"}
          </p>
        ) : (
          <div className="pb-8 md:pb-12">
            <p className="text-xs eyebrow text-brand-gray-400 mb-4" data-tina-field={data ? tinaField(data, "partnersEyebrow") : undefined}>
              {data?.partnersEyebrow || "Партнёры бренда"}
            </p>
            <h2 className="section-title text-brand-black" data-tina-field={data ? tinaField(data, "partnersHeading") : undefined}
              dangerouslySetInnerHTML={{ __html: data?.partnersHeading || 'С кем сотрудничает <span class="text-brand-accent">Diverse</span>' }} />
          </div>
        )}
      </div>

      <div className="overflow-hidden">
        <div
          className="flex flex-nowrap items-center gap-8 md:gap-14"
          style={{
            width: "max-content",
            animation: "marquee 30s linear infinite",
          }}
        >
          {/* First set */}
          {partners.map((p) => (
            <div
              key={p.id}
              className="flex items-center justify-center flex-shrink-0"
            >
              {p.logo && (
                <Image
                  src={asset(p.logo)}
                  alt={p.name || ""}
                  width={140}
                  height={52}
                  draggable={false}
                  className="object-contain"
                  style={{
                    width: "min(25vw, 140px)",
                    height: "clamp(36px, 5vw, 52px)",
                  }}
                />
              )}
            </div>
          ))}
          {/* Duplicate for seamless loop */}
          {partners.map((p) => (
            <div
              key={`dup-${p.id}`}
              className="flex items-center justify-center flex-shrink-0"
            >
              {p.logo && (
                <Image
                  src={asset(p.logo)}
                  alt={p.name || ""}
                  width={140}
                  height={52}
                  draggable={false}
                  className="object-contain"
                  style={{
                    width: "min(25vw, 140px)",
                    height: "clamp(36px, 5vw, 52px)",
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
