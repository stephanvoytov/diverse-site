import { partners } from "@/data/partners";
import Image from "next/image";
import { asset } from "@/lib/path";

interface PartnerTickerProps {
  simple?: boolean;
}

export default function PartnerTicker({ simple }: PartnerTickerProps) {
  /* prettier-ignore */
  return (
    <section data-header="light" className="bg-white py-16 md:py-24">
      <div className="container-brand text-center">
        {simple ? (
          <p className="text-xs eyebrow text-brand-gray-400 pb-8 md:pb-12">
            Партнёры Diverse
          </p>
        ) : (
          <div className="pb-8 md:pb-12">
            <p className="text-xs eyebrow text-brand-gray-400 mb-4">
              Партнёры бренда
            </p>
            <h2 className="section-title text-brand-black">
              С кем сотрудничает{" "}
              <span className="text-brand-accent">Diverse</span>
            </h2>
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
              <Image
                src={asset(p.logo)}
                alt={p.name}
                width={140}
                height={52}
                draggable={false}
                className="object-contain"
                style={{
                  maxWidth: "min(25vw, 140px)",
                  maxHeight: "clamp(36px, 5vw, 52px)",
                  width: "auto",
                  height: "auto",
                }}
              />
            </div>
          ))}
          {/* Duplicate for seamless loop */}
          {partners.map((p) => (
            <div
              key={`dup-${p.id}`}
              className="flex items-center justify-center flex-shrink-0"
            >
              <Image
                src={asset(p.logo)}
                alt={p.name}
                width={140}
                height={52}
                draggable={false}
                className="object-contain"
                style={{
                  maxWidth: "min(25vw, 140px)",
                  maxHeight: "clamp(36px, 5vw, 52px)",
                  width: "auto",
                  height: "auto",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
