"use client";

import { useEffect, useRef, useState } from "react";

/** Fades and lifts its children into place the first time they scroll into view. */
export default function ScrollReveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`sr ${seen ? "sr-in" : ""} ${className}`} style={{ ["--sr-d" as string]: `${delay}s` }}>
      {children}
    </div>
  );
}
