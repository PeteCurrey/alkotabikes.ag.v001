"use client";

import React, { useEffect, useRef, useState } from "react";

const STEPS = [
  { num: "01", label: "DEFINE THE RIDE" },
  { num: "02", label: "CLOSE THE GEOMETRY" },
  { num: "03", label: "SOLVE THE SUSPENSION" },
  { num: "04", label: "PACKAGE THE MACHINE" },
  { num: "05", label: "ENGINEER THE STRUCTURE" },
  { num: "06", label: "DEVELOP THE CARBON" },
  { num: "07", label: "BUILD THE PROTOTYPE" },
  { num: "08", label: "ASSEMBLE THE SYSTEM" },
  { num: "09", label: "VALIDATE" },
  { num: "10", label: "ITERATE" },
];

export default function ProcessNav() {
  const [active, setActive] = useState("01");
  const observersRef = useRef<IntersectionObserver[]>([]);

  useEffect(() => {
    // Clean up any previous observers
    observersRef.current.forEach((obs) => obs.disconnect());
    observersRef.current = [];

    STEPS.forEach(({ num }) => {
      const el = document.getElementById(`step-${num}`);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(num);
        },
        { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
      );
      obs.observe(el);
      observersRef.current.push(obs);
    });

    return () => observersRef.current.forEach((obs) => obs.disconnect());
  }, []);

  const scrollTo = (num: string) => {
    const el = document.getElementById(`step-${num}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav className="hidden xl:flex flex-col gap-0 w-full">
      {STEPS.map(({ num, label }) => {
        const isActive = active === num;
        return (
          <button
            key={num}
            onClick={() => scrollTo(num)}
            className={`group flex items-center gap-3 px-4 py-3 text-left transition-all border-l-2 ${
              isActive
                ? "border-alkota-signal bg-alkota-signal/8"
                : "border-white/10 hover:border-white/30 hover:bg-white/3"
            }`}
          >
            <span
              className={`font-mono text-[10px] tabular-nums font-bold transition-colors ${
                isActive ? "text-alkota-signal" : "text-alkota-slate group-hover:text-alkota-white"
              }`}
            >
              {num}
            </span>
            <span
              className={`font-mono text-[9px] uppercase tracking-widest transition-colors leading-tight ${
                isActive ? "text-alkota-white font-bold" : "text-alkota-slate/70 group-hover:text-alkota-slate"
              }`}
            >
              {label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
