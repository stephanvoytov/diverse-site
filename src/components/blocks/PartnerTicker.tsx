"use client";

import { useEffect, useRef } from "react";
import { partners } from "@/data/partners";

interface PartnerTickerProps {
  simple?: boolean;
}

export default function PartnerTicker({ simple }: PartnerTickerProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    let pos = 0;
    let raf: number;
    const speed = 0.4;

    const tick = () => {
      pos -= speed;
      const half = el.scrollWidth / 2;
      if (Math.abs(pos) >= half) pos += half;
      el.style.transform = `translateX(${pos}px)`;
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section data-header="light" className="bg-white overflow-hidden">
      <div className="container-brand py-16 md:py-24 text-center">
        {simple ? (
          <p className="text-xs tracking-[0.3em] uppercase text-brand-gray-400">
            Партнёры Diverse
          </p>
        ) : (
          <>
            <p className="text-xs tracking-[0.3em] uppercase text-brand-gray-400 mb-4">
              Партнёры бренда
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-brand-black leading-[1.1]">
              С кем сотрудничает <span className="text-brand-accent">Diverse</span>
            </h2>
          </>
        )}
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />

        <div className="overflow-hidden">
          <div ref={scrollerRef} className="flex" style={{ width: "max-content" }}>
            {[...partners, ...partners].map((p, i) => (
              <div
                key={`${p.id}-${i}`}
                className="flex-shrink-0 flex items-center"
                style={{
                  height: "3.5rem",
                  marginRight: "3rem",
                }}
              >
                <img
                  src={p.logo}
                  alt={p.name}
                  draggable={false}
                  className="h-full w-auto object-contain"
                  style={{
                    maxWidth: p.id === "motul" ? 130 : 200,
                    maxHeight: p.id === "motul" ? "65%" : undefined,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
