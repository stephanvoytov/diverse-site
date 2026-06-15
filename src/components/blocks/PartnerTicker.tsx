import { partners } from "@/data/partners";

interface PartnerTickerProps {
  simple?: boolean;
}

export default function PartnerTicker({ simple }: PartnerTickerProps) {
  /* prettier-ignore */
  return (
    <section data-header="light" className="bg-white py-16 md:py-24">
      <style>{`.ps::-webkit-scrollbar, .ps { scrollbar-width: none; }`}</style>

      <div className="container-brand text-center">
        {simple ? (
          <p className="text-xs tracking-[0.3em] uppercase text-brand-gray-400 pb-8 md:pb-12">
            Партнёры Diverse
          </p>
        ) : (
          <div className="pb-8 md:pb-12">
            <p className="text-xs tracking-[0.3em] uppercase text-brand-gray-400 mb-4">
              Партнёры бренда
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-brand-black leading-[1.1]">
              С кем сотрудничает{" "}
              <span className="text-brand-accent">Diverse</span>
            </h2>
          </div>
        )}
      </div>

      <div className="ps overflow-x-auto">
        <div
          className="flex flex-nowrap items-center gap-8 md:gap-14 px-6 md:px-0"
          style={{ width: "max-content", margin: "0 auto" }}
        >
          {partners.map((p) => (
            <div
              key={p.id}
              className="flex items-center justify-center flex-shrink-0"
            >
              <img
                src={p.logo}
                alt={p.name}
                draggable={false}
                className="object-contain"
                style={{
                  maxWidth: "min(25vw, 140px)",
                  maxHeight: "clamp(28px, 5vw, 52px)",
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
