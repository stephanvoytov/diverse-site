"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";

interface FadeInProps {
  children: ReactNode;
  /** Задержка анимации (сек) */
  delay?: number;
  /** Длительность анимации (сек) */
  duration?: number;
  /** Смещение по Y при старте */
  y?: number;
  /** Дополнительные классы */
  className?: string;
  /** margin для viewport */
  margin?: boolean;
  /** as — HTML-тег (по умолч. div) */
  as?: "div" | "p" | "span" | "h2" | "h3" | "h4" | "article" | "section" | "li";
}

export default function FadeIn({
  children,
  delay = 0,
  duration = 0.45,
  y = 15,
  className = "",
  margin = false,
  as = "div",
}: FadeInProps) {
  const viewport = margin ? { once: true, margin: "-60px" as const } : { once: true };
  const MotionTag = motion[as as keyof typeof motion] as React.ElementType;

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </MotionTag>
  );
}
