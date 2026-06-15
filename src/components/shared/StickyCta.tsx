"use client";

import { useEffect, useState } from "react";
import { useModal } from "@/lib/modal-context";

export default function StickyCta() {
  const { open: openModal } = useModal();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.6);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-400 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      {/* Mobile: full-width bar. Desktop: compact centered button */}
      <div className="bg-white/95 backdrop-blur-md border-t border-brand-gray-200 px-4 py-3 shadow-xl md:bg-transparent md:border-none md:shadow-none md:px-0 md:pb-6">
        <button
          onClick={openModal}
          className="w-full py-3.5 bg-brand-accent text-white text-xs tracking-[0.2em] uppercase font-semibold rounded-sm hover:bg-brand-accent-hover transition-colors cursor-pointer md:w-auto md:mx-auto md:block md:px-8 md:py-3.5 md:shadow-xl"
        >
          Рассчитать прибыль
        </button>
      </div>
    </div>
  );
}
