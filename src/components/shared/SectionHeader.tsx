"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";

interface SectionHeaderProps {
  children: ReactNode;
  /** Текст айброу над заголовком */
  eyebrow?: string;
  /** Текст подзаголовка */
  desc?: string;
  /** Дополнительные классы на motion.div */
  className?: string;
  /** Классы для desc (по умолч. section-desc text-brand-gray-400) */
  descClassName?: string;
  /** Тёмный фон (title — white, desc — white/60) */
  dark?: boolean;
  /** body-text вместо section-desc */
  wide?: boolean;
  /** Добавить margin: "-60px" на viewport */
  margin?: boolean;
  /** data-tina-field для eyebrow */
  eyebrowField?: string;
  /** data-tina-field для desc */
  descField?: string;
}

export default function SectionHeader({
  children,
  eyebrow,
  desc,
  className = "",
  descClassName,
  dark = false,
  wide = false,
  margin = false,
  eyebrowField,
  descField,
}: SectionHeaderProps) {
  const viewport = margin ? { once: true, margin: "-60px" as const } : { once: true };
  const titleColor = dark ? "text-white" : "text-brand-black";
  const descColor = dark ? "text-white/60" : "text-brand-gray-400";
  const descBase = wide ? "body-text" : "section-desc";
  const eyebrowColor = dark ? "text-white/40" : "text-brand-gray-400";

  return (
    <motion.div
      className={`text-center ${className || "mb-14"}`}
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {eyebrow && (
        <p className={`text-xs eyebrow ${eyebrowColor} mb-4`} data-tina-field={eyebrowField}>{eyebrow}</p>
      )}
      <h2 className={`section-title ${titleColor}`}>{children}</h2>
      {desc && (
        <p className={descClassName ?? `${descBase} ${descColor}`} data-tina-field={descField}>{desc}</p>
      )}
    </motion.div>
  );
}
