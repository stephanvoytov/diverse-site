"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { tinaField } from "tinacms/dist/react";
import { useModal } from "@/lib/modal-context";
import { siteContent } from "@/data/site-content";

const fallback = siteContent.franchise;

const easeOut: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

export default function Franchise({ data }: { data?: typeof fallback }) {
  const s = data ?? fallback;
  const { open: openModal } = useModal();

  const plans = s.plans || [];
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  // Шаг = ширина одной карточки (фиксированная)
  const cardStep = () =>
    scrollRef.current?.querySelector<HTMLElement>("[data-card]")?.offsetWidth ?? 0;

  const updateState = () => {
    const el = scrollRef.current;
    if (!el) return;
    const step = cardStep();
    if (step > 0) {
      const idx = Math.round(el.scrollLeft / step);
      setActiveIndex(Math.min(Math.max(idx, 0), plans.length - 1));
    }
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft >= el.scrollWidth - el.clientWidth - 2);
  };

  const next = () => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: cardStep(), behavior: "smooth" });
  };
  const prev = () => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: -cardStep(), behavior: "smooth" });
  };
  const goTo = (i: number) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ left: i * cardStep(), behavior: "smooth" });
  };

  // Колесо мыши / горизонтальный тачпад над каруселью листают её.
  // В начале/в конце скролл «проваливается» на страницу — вертикальный скролл не ломается.
  const wheelLock = useRef(0);
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handler = (e: WheelEvent) => {
      const isHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);
      const delta = isHorizontal ? e.deltaX : e.deltaY;
      if (delta === 0) return;
      const maxScroll = el.scrollWidth - el.clientWidth;
      if ((delta > 0 && el.scrollLeft >= maxScroll) || (delta < 0 && el.scrollLeft <= 0)) return;
      e.preventDefault();
      const now = Date.now();
      if (now - wheelLock.current < 550) return;
      wheelLock.current = now;
      if (delta > 0) next();
      else prev();
    };
    el.addEventListener("wheel", handler, { passive: false });
    return () => el.removeEventListener("wheel", handler);
  }, []);

  return (
    <section
      data-header="dark"
      className="relative min-h-screen bg-brand-black"
    >
      {/* Static pattern — скрыт на мобилке (тяжёлый repaint) */}
      <div className="hidden md:block absolute inset-0 opacity-[0.04]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container-brand relative z-10 py-10 md:py-12">
        {/* Header + badge — 1 observer вместо 4 */}
        <motion.div
          className="text-center mb-8 md:mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: easeOut } },
            }}
            className="text-xs eyebrow text-brand-gray-300 mb-4"
            data-tina-field={tinaField(s, "eyebrow")}
          >
            {s.eyebrow}
          </motion.p>
          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOut } },
            }}
            className="section-title text-white"
          >
            <span data-tina-field={tinaField(s, "heading")}>{s.heading}</span>{" "}
            <span className="text-brand-accent">Diverse</span>
          </motion.h2>
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 12 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: easeOut } },
            }}
            className="section-desc text-white/50"
            data-tina-field={tinaField(s, "desc")}
          >
            {s.desc}
          </motion.p>
        </motion.div>

        {/* Cards — карусель: имя, описание и прибыль */}
        <div className="relative max-w-5xl mx-auto">
          {/* Arrow left */}
          <button
            onClick={prev}
            aria-label="Предыдущие форматы"
            className={`hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full bg-brand-black/70 border border-white/15 text-white/70 hover:text-white hover:border-white/30 hover:bg-brand-black/90 transition-colors cursor-pointer -translate-x-4 ${
              atStart ? "opacity-30 pointer-events-none" : ""
            }`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Viewport: нативный горизонтальный скролл (мобильный свайп работает сам, вертикальный скролл страницы не блокируется) */}
          <div
            ref={scrollRef}
            onScroll={updateState}
            className="flex gap-[4px] overflow-x-auto snap-x snap-mandatory scroll-smooth px-1 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden touch-pan-x"
          >
            {plans.map((plan: { id: string; tagline: string; name: string; desc: string; _content_source?: unknown }) => (
              <div
                key={plan.id}
                data-card
                className={`w-[300px] sm:w-[330px] shrink-0 snap-start rounded-sm p-6 md:p-8 flex flex-col transition-colors duration-300 hover:-translate-y-1 hover:transition-transform ${
                  plan.id === 'renovation'
                    ? 'border border-brand-accent bg-brand-accent/6 hover:bg-brand-accent/10'
                    : 'border border-white/10 bg-white/5 hover:bg-white/[0.07] hover:border-white/15'
                }`}
              >
                <p className="text-[10px] tracking-[0.15em] uppercase text-brand-accent mb-3" data-tina-field={tinaField(plan, "tagline")}>
                  {plan.tagline}
                </p>
                <h3 className="text-2xl font-bold text-white mb-3 tracking-[-0.01em]" data-tina-field={tinaField(plan, "name")}>
                  {plan.name}
                </h3>
                <p className="text-[13px] text-white/60 leading-relaxed mb-6" data-tina-field={tinaField(plan, "desc")}>
                  {plan.desc}
                </p>
                {/* Profit — stacked vertically */}
                <div className="mt-auto pt-5 space-y-3">
                  <div>
                    <p className="text-lg font-bold text-white">
                      {s.cardProfit?.[plan.id as keyof typeof s.cardProfit] || ""}
                    </p>
                    <p className="text-[11px] text-white/50 tracking-[0.1em] uppercase" data-tina-field={tinaField(s.franchiseLabels, "profitMonth")}>
                      {s.franchiseLabels.profitMonth}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Arrow right */}
          <button
            onClick={next}
            aria-label="Следующие форматы"
            className={`hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:border-white/30 hover:bg-white/10 transition-colors cursor-pointer translate-x-4 ${
              atEnd ? "opacity-30 pointer-events-none" : ""
            }`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </div>

        {/* Точки-индикаторы */}
        {plans.length > 1 && (
          <div className="flex items-center justify-center gap-2 mt-6">
            {plans.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Форматы, страница ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  i === activeIndex ? "w-6 bg-brand-accent" : "w-1.5 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>
        )}

        {/* Disclaimer */}
        <p className="text-center text-[10px] text-white/20 mt-4 md:mt-6" data-tina-field={tinaField(s, "disclaimer")}>{s.disclaimer}</p>

        {/* Bottom: CTA + links — компактно */}
        <motion.div
          className="mt-6 md:mt-8 text-center space-y-4 md:space-y-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.08 } },
          }}
        >
          {/* CTA — первым */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <button
              onClick={openModal}
              className="btn-accent"
              data-tina-field={tinaField(s, "ctaButton")}
            >
              {s.ctaButton}
            </button>
          </motion.div>

          {/* Ссылки — под CTA */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 },
            }}
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
          >
            <a
              href="/franchise/"
              className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors group"
              data-tina-field={tinaField(s.franchiseLinks, "allConditions")}
            >
              {s.franchiseLinks.allConditions}
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
            <a
              href="/franchise/#gallery"
              className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors group"
              data-tina-field={tinaField(s.franchiseLinks, "example")}
            >
              {s.franchiseLinks.example}
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
