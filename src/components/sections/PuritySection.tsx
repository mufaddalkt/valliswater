"use client";

import React, { useState, useRef, useEffect } from "react";
import { MINERAL_ANALYSIS } from "@/lib/products";
import { gsap } from "@/lib/gsap-utils";
import { Activity, Droplets, Gauge, Sparkle } from "lucide-react";
import { soundManager } from "@/lib/audio";

export function PuritySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeMineral, setActiveMineral] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current?.children || [], {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "top 25%",
          scrub: 1,
        },
        opacity: 0,
        x: 50,
        stagger: 0.15,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSelectMineral = (idx: number) => {
    soundManager.playChime(900 + idx * 100);
    setActiveMineral(idx);
  };

  return (
    <section
      id="purity"
      ref={sectionRef}
      className="relative min-h-screen w-full flex items-center px-6 sm:px-12 lg:px-20 py-24 z-20 pointer-events-none"
    >
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left side is open for 3D bottle and mineral particles */}
        <div className="hidden lg:block lg:col-span-5" />

        {/* Right side: Purity Mineral Matrix */}
        <div
          ref={contentRef}
          className="lg:col-span-7 space-y-8 pointer-events-auto select-none"
        >
          <div className="space-y-2">
            <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-sky-400 font-medium flex items-center gap-2">
              <Sparkle className="w-3.5 h-3.5" />
              CHAPTER 02 // MINERAL ARCHITECTURE
            </span>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-serif tracking-[0.12em] uppercase font-light text-white leading-tight">
              FILTERED BY
              <span className="block italic text-sky-200 font-normal">
                NATURE.
              </span>
            </h2>
          </div>

          <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed max-w-xl font-sans">
            Water purity is not defined merely by what is removed, but by the pristine harmony of what remains. VALLIS boasts an ultra-low Total Dissolved Solids of just <strong className="text-white font-medium">18 mg/L</strong>, creating an ethereal lightness on the palate.
          </p>

          {/* Interactive Mineral Spectrum Explorer */}
          <div className="space-y-3 pt-4">
            <div className="flex justify-between items-center text-xs font-mono tracking-wider text-neutral-400 pb-1">
              <span>CERTIFIED LABORATORY ISOTOPE ANALYSIS</span>
              <span className="text-sky-400">BATCH: #VAL-2026-CH</span>
            </div>

            <div className="space-y-2.5">
              {MINERAL_ANALYSIS.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectMineral(idx)}
                  onMouseEnter={() => setActiveMineral(idx)}
                  className={`w-full p-3.5 text-left border rounded-sm transition-all duration-300 ${
                    activeMineral === idx
                      ? "bg-white/[0.08] border-sky-400/70 shadow-[0_0_20px_rgba(120,180,214,0.15)]"
                      : "bg-white/[0.02] border-white/10 hover:border-white/20"
                  }`}
                  data-cursor="INSPECT"
                >
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-sm font-serif tracking-wider text-white">
                      {item.name}
                    </span>
                    <span className="text-xs font-mono text-sky-300 font-medium">
                      {item.value}
                    </span>
                  </div>

                  <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 rounded-full ${
                        activeMineral === idx
                          ? "bg-gradient-to-r from-sky-400 to-cyan-200"
                          : "bg-white/30"
                      }`}
                      style={{ width: `${item.percent}%` }}
                    />
                  </div>

                  {activeMineral === idx && (
                    <div className="mt-2 text-[11px] font-mono text-neutral-300 flex items-center gap-2 animate-in fade-in duration-200">
                      <Activity className="w-3 h-3 text-sky-400" />
                      <span>{item.benefit}</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Key Purity Badges */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="p-3 bg-white/[0.02] border border-white/10 rounded-sm text-center">
              <span className="text-xs font-mono text-neutral-400 block mb-1">pH BALANCE</span>
              <span className="text-xl font-serif text-white font-medium">7.88</span>
              <span className="text-[9px] font-mono text-sky-300 block mt-0.5">Alkaline</span>
            </div>

            <div className="p-3 bg-white/[0.02] border border-white/10 rounded-sm text-center">
              <span className="text-xs font-mono text-neutral-400 block mb-1">TDS WEIGHT</span>
              <span className="text-xl font-serif text-white font-medium">18 mg/L</span>
              <span className="text-[9px] font-mono text-sky-300 block mt-0.5">Ultra-Light</span>
            </div>

            <div className="p-3 bg-white/[0.02] border border-white/10 rounded-sm text-center">
              <span className="text-xs font-mono text-neutral-400 block mb-1">SILICA MATRIX</span>
              <span className="text-xl font-serif text-white font-medium">48 mg/L</span>
              <span className="text-[9px] font-mono text-sky-300 block mt-0.5">Cellular Bio</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
