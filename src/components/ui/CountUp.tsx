"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

interface CountUpProps {
  /** Конечное число */
  to: number;
  /** Суффикс после числа (например "+") */
  suffix?: string;
  /** Префикс перед числом */
  prefix?: string;
  /** Длительность анимации в секундах */
  duration?: number;
  /** CSS-классы */
  className?: string;
  /** Начинать анимацию только при появлении в viewport */
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
  const [mounted, setMounted] = useState(false);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));

  useEffect(() => { setMounted(true); }, []);

  // IntersectionObserver для триггера анимации
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

  // Сброс если not once
  useEffect(() => {
    if (!once && !inView) {
      setDone(false);
      count.set(0);
    }
  }, [inView, once, count]);

  // SSR fallback — отдаём финальное значение сразу
  if (!mounted) {
    return <span className={className}>{prefix}{to}{suffix}</span>;
  }

  return (
    <span ref={ref} className={className}>
      <span>{prefix}</span>
      <motion.span>{rounded}</motion.span>
      <span>{suffix}</span>
    </span>
  );
}
