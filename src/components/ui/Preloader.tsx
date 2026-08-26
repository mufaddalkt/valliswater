"use client";

import React, { useEffect, useState, useRef } from "react";
import { gsap } from "@/lib/gsap-utils";

export function Preloader({ onComplete }: { onComplete?: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 14) + 6;
      if (current >= 100) {
        current = 100;
        setProgress(100);
        clearInterval(interval);

        // Animate exit with GSAP
        const tl = gsap.timeline({
          onComplete: () => {
            setIsDone(true);
            onComplete?.();
          },
        });

        tl.to(counterRef.current, {
          y: -20,
          opacity: 0,
          duration: 0.4,
          ease: "power2.inOut",
        })
          .to(
            logoRef.current,
            {
              scale: 0.95,
              opacity: 0,
              duration: 0.5,
              ease: "power2.inOut",
            },
            "-=0.2"
          )
          .to(containerRef.current, {
            clipPath: "inset(0 0 100% 0)",
            duration: 0.7,
            ease: "power3.inOut",
          });
      } else {
        setProgress(current);
      }
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  if (isDone) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[10000] bg-[#0c0d0f] text-white flex flex-col items-center justify-between p-8 sm:p-14 select-none"
      style={{ clipPath: "inset(0 0 0 0)" }}
    >
      {/* Top telemetry */}
      <div className="w-full flex justify-between items-center text-[10px] tracking-[0.3em] text-neutral-400 uppercase font-mono">
        <span>VALLIS // SUB-ALPINE</span>
        <span>LAT 46.01° N</span>
      </div>

      {/* Center Monogram & Silhouette */}
      <div ref={logoRef} className="flex flex-col items-center gap-6">
        <div className="relative w-16 h-28 border border-white/20 rounded-t-full rounded-b-lg flex flex-col items-center justify-between p-2 overflow-hidden shadow-[0_0_50px_rgba(120,180,214,0.15)]">
          {/* Cap */}
          <div className="w-4 h-3 bg-white/40 rounded-t-sm" />
          {/* Water level filling */}
          <div
            className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-sky-400/30 to-white/10 transition-all duration-100 ease-out"
            style={{ height: `${progress}%` }}
          />
          {/* Monogram */}
          <span className="relative z-10 text-[10px] tracking-[0.25em] font-serif opacity-80 mt-auto mb-2">
            V
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-serif tracking-[0.35em] uppercase font-light text-neutral-100">
          VALLIS
        </h1>
        <p className="text-[11px] tracking-[0.25em] uppercase text-sky-300/80 font-light">
          Glacial Artesian Aquifer
        </p>
      </div>

      {/* Bottom Counter */}
      <div
        ref={counterRef}
        className="w-full flex justify-between items-end border-t border-white/10 pt-4"
      >
        <span className="text-[11px] tracking-[0.25em] uppercase text-neutral-400 font-mono">
          PURITY CALIBRATION
        </span>
        <div className="flex items-baseline gap-1 font-mono">
          <span className="text-3xl sm:text-4xl font-light tracking-tight text-white">
            {progress.toString().padStart(2, "0")}
          </span>
          <span className="text-xs text-sky-400">%</span>
        </div>
      </div>
    </div>
  );
}
