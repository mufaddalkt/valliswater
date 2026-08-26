"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap-utils";
import { Eye, ShieldCheck, Sparkles, Zap } from "lucide-react";

export function TransformationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const textItems = Array.from(textRef.current?.children || []).filter(Boolean);
      if (textItems.length > 0) {
        gsap.from(textItems, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "top 30%",
            scrub: 1,
          },
          opacity: 0,
          y: 30,
          stagger: 0.15,
          ease: "power2.out",
        });
      }

      const cardItems = Array.from(cardsRef.current?.children || []).filter(Boolean);
      if (cardItems.length > 0) {
        gsap.from(cardItems, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 50%",
            end: "top 15%",
            scrub: 1,
          },
          opacity: 0,
          scale: 0.95,
          stagger: 0.2,
          ease: "power2.out",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="transformation"
      ref={sectionRef}
      className="relative min-h-screen w-full flex flex-col justify-center items-center px-6 sm:px-12 lg:px-20 py-28 z-20 pointer-events-none"
    >
      <div className="w-full max-w-5xl mx-auto text-center space-y-8 pointer-events-auto select-none">
        {/* Editorial Headline */}
        <div ref={textRef} className="space-y-3">
          <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-sky-400 font-medium flex items-center justify-center gap-2">
            <Sparkles className="w-3.5 h-3.5" />
            CHAPTER 03 // THE ARCHITECTURE OF GLASS
          </span>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-serif tracking-[0.14em] uppercase font-light text-white leading-tight">
            CRAFTED AS A
            <span className="block italic text-transparent bg-clip-text bg-gradient-to-r from-sky-200 via-white to-neutral-300 font-normal">
              LIVING MONOLITH.
            </span>
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 font-light max-w-xl mx-auto font-sans leading-relaxed pt-2">
            The vessel was engineered with the same precision as haute horlogerie. Optical-grade silica flint glass preserves the living molecular vitality and sub-zero chill of the source.
          </p>
        </div>

        {/* 3 Macro Craft Points */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 text-left"
        >
          <div className="p-6 bg-[#0e1014]/80 backdrop-blur-xl border border-white/10 rounded-sm space-y-3 hover:border-sky-400/40 transition-colors">
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-sky-300">
              <Eye className="w-5 h-5" />
            </div>
            <h3 className="text-base font-serif tracking-wider text-white">
              Optical Flint Glass
            </h3>
            <p className="text-xs text-neutral-400 font-light leading-relaxed font-sans">
              Formulated with ultra-low iron silica to achieve total chromatic neutrality and zero UV degradation of delicate mineral ions.
            </p>
            <span className="text-[10px] font-mono text-sky-400 block pt-1">
              REFRACTIVE INDEX: 1.52
            </span>
          </div>

          <div className="p-6 bg-[#0e1014]/80 backdrop-blur-xl border border-white/10 rounded-sm space-y-3 hover:border-sky-400/40 transition-colors">
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-sky-300">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-serif tracking-wider text-white">
              Titanium Micro-Closure
            </h3>
            <p className="text-xs text-neutral-400 font-light leading-relaxed font-sans">
              Milled from aerospace Grade 5 titanium. Features laser-etched batch serialization and a hermetic micro-gasket preventing air intrusion.
            </p>
            <span className="text-[10px] font-mono text-sky-400 block pt-1">
              HERMETIC SEAL: 0.001 BAR
            </span>
          </div>

          <div className="p-6 bg-[#0e1014]/80 backdrop-blur-xl border border-white/10 rounded-sm space-y-3 hover:border-sky-400/40 transition-colors">
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-sky-300">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-serif tracking-wider text-white">
              Cryogenic Bottling
            </h3>
            <p className="text-xs text-neutral-400 font-light leading-relaxed font-sans">
              Bottled directly inside the mountain cavern at 2.4°C under an inert nitrogen blanket to maintain raw natural mountain freshness.
            </p>
            <span className="text-[10px] font-mono text-sky-400 block pt-1">
              SOURCE TEMPERATURE: 2.4°C
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
