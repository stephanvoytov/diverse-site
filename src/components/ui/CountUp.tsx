"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

interface CountUpProps {
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
  once?: boolean;
}

export default function CountUp({
  to,
  suffix = "",
  prefix = "",
  duration = 1.5,
  className = "",
  once = true,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [inView, setInView] = useState(false);
  const [done, setDone] = useState(false);
  const [showMotion, setShowMotion] = useState(false);
  const [mounted, setMounted] = useState(false);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));

  useEffect(() => { setMounted(true); }, []);

  // Как только rounded становится > 0 — показываем motion-версию
  useEffect(() => {
    const unsub = rounded.on("change", (v) => {
      if (v > 0) {
        setShowMotion(true);
        unsub();
      }
    });
    return unsub;
  }, [rounded]);

  // IntersectionObserver
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  // Анимация
  useEffect(() => {
    if (!inView || done) return;
    const controls = animate(count, to, { duration, ease: "easeOut" });
    controls.then(() => setDone(true));
    return () => controls.stop();
  }, [inView, count, to, duration, done]);

  // Сброс
  useEffect(() => {
    if (!once && !inView) {
      setDone(false);
      setShowMotion(false);
      count.set(0);
    }
  }, [inView, once, count]);

  // Показываем финальное число пока анимация не дала > 0
  if (!mounted || !showMotion) {
    return <span ref={ref} className={className}>{prefix}{to}{suffix}</span>;
  }

  return (
    <span ref={ref} className={className}>
      <span>{prefix}</span>
      <motion.span>{rounded}</motion.span>
      <span>{suffix}</span>
    </span>
  );
}
