"use client";

import { partners } from "@/data/partners";

export default function PartnerTicker() {
  return (
    <section data-header="light" className="bg-white overflow-hidden">
      <style>{`
        @keyframes partnerScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .partner-scroller {
          display: flex;
          width: max-content;
          animation: partnerScroll 50s linear infinite;
        }
        .partner-logo {
          flex-shrink: 0;
          margin-right: 3rem;
          height: 3.5rem;
          display: flex;
          align-items: center;
        }
        @media (min-width: 768px) {
          .partner-logo {
            height: 5rem;
            margin-right: 5rem;
          }
        }
        .partner-logo img {
          height: 100%;
          width: auto;
          object-fit: contain;
          max-width: 200px;
        }
        .partner-logo[data-id="motul"] img {
          max-height: 65%;
          max-width: 130px;
        }
      `}</style>

      <div className="container-brand py-16 md:py-24 text-center">
        <p className="text-xs tracking-[0.3em] uppercase text-brand-gray-400 mb-4">
          Партнёры бренда
        </p>
        <h2 className="text-3xl md:text-5xl font-bold text-brand-black leading-[1.1]">
          С кем сотрудничает <span className="text-brand-accent">Diverse</span>
        </h2>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />

        <div className="overflow-hidden">
          <div className="partner-scroller">
            {[...partners, ...partners].map((p, i) => (
              <div key={`${p.id}-${i}`} className="partner-logo" data-id={p.id}>
                <img
                  src={p.logo}
                  alt={p.name}
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
