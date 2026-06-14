"use client";

import { useEffect, useState } from "react";
import { useModal } from "@/lib/modal-context";

export default function StickyCta() {
  const { open: openModal } = useModal();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`md:hidden fixed bottom-0 left-0 right-0 z-50 transition-transform duration-400 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="bg-white/95 backdrop-blur-md border-t border-brand-gray-200 px-4 py-3 shadow-xl">
        <button
          onClick={openModal}
          className="w-full py-3.5 bg-brand-accent text-white text-xs tracking-[0.2em] uppercase font-semibold rounded-sm hover:bg-brand-accent-hover transition-colors cursor-pointer"
        >
          Стать партнёром
        </button>
      </div>
    </div>
  );
}
