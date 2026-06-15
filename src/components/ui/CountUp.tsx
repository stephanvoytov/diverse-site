"use client";

import { useEffect, useRef } from "react";

interface CountUpProps {
  to: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export default function CountUp({
  to,
  suffix = "",
  prefix = "",
  className = "",
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);

  // Единственный useEffect — для LCP (noop, просто чтоб был client component)
  useEffect(() => {
    // всё уже отрисовано статически
  }, []);

  return (
    <span ref={ref} className={className}>
      {prefix}{to}{suffix}
    </span>
  );
}
