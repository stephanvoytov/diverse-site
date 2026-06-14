"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

type RevealDirection = "left" | "right" | "up" | "down";

interface RevealProps {
  children: React.ReactNode;
  direction?: RevealDirection;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

const directionVariants: Record<RevealDirection, { x?: number; y?: number }> =
  {
    left: { x: -80 },
    right: { x: 80 },
    up: { y: 60 },
    down: { y: -60 },
  };

export default function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.7,
  className = "",
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-80px" });

  const offset = directionVariants[direction];

  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={{
          opacity: 0,
          x: offset.x ?? 0,
          y: offset.y ?? 0,
        }}
        animate={
          isInView
            ? { opacity: 1, x: 0, y: 0 }
            : { opacity: 0, x: offset.x ?? 0, y: offset.y ?? 0 }
        }
        transition={{
          duration,
          delay,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
