"use client";

import React, { useRef, useEffect } from "react";
import { PRODUCTS, ProductItem } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import { gsap, ScrollTrigger } from "@/lib/gsap-utils";
import { ArrowRight, Check, Plus, Sparkles } from "lucide-react";
import { soundManager } from "@/lib/audio";

export function HorizontalCollection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const { activeProduct, setActiveProduct, addItem } = useCart();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;

      const totalScroll = track.scrollWidth - window.innerWidth + 200;

      gsap.to(track, {
        x: () => -totalScroll,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${totalScroll}`,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // Dynamically select product based on horizontal scroll progress
            const index = Math.min(
              PRODUCTS.length - 1,
              Math.floor(self.progress * PRODUCTS.length)
            );
            if (PRODUCTS[index] && PRODUCTS[index].id !== activeProduct.id) {
              setActiveProduct(PRODUCTS[index]);
            }
          },
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [activeProduct.id, setActiveProduct]);

  const handleSelectProduct = (product: ProductItem) => {
    soundManager.playChime(1100);
    setActiveProduct(product);
  };

  const handleQuickAdd = (e: React.MouseEvent, product: ProductItem) => {
    e.stopPropagation();
    addItem(product, "single");
  };

  return (
    <section
      id="collection"
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-[#0c0d10] z-20"
    >
      {/* Header bar pinned in section */}
      <div className="absolute top-8 left-8 sm:left-14 right-8 sm:right-14 z-30 flex justify-between items-center pointer-events-none">
        <div className="space-y-1">
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-sky-400 font-medium">
            CHAPTER 04 // THE COLLECTION
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif tracking-[0.15em] uppercase text-white font-light">
            Vessels of Purity
          </h2>
        </div>

        <div className="hidden sm:flex items-center gap-3 text-xs font-mono text-neutral-400">
          <span>HORIZONTAL IMMERSION</span>
          <span className="w-8 h-[1px] bg-white/20" />
          <span className="text-sky-300">01 — 05</span>
        </div>
      </div>

      {/* Horizontal Scrolling Track */}
      <div
        ref={trackRef}
        className="h-full flex items-center gap-8 sm:gap-14 px-8 sm:px-20 pt-20"
      >
        {/* Intro Card */}
        <div className="w-[320px] sm:w-[420px] shrink-0 p-8 sm:p-12 border border-white/10 bg-white/[0.02] backdrop-blur-xl rounded-sm flex flex-col justify-between h-[65vh] select-none">
          <div className="space-y-4">
            <span className="text-xs font-mono text-sky-400 uppercase tracking-widest">
              VESSEL SCALING
            </span>
            <h3 className="text-3xl sm:text-4xl font-serif tracking-wider text-white font-light leading-tight">
              Calibrated Proportions for Every Occasion.
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
              From pocket-sized daily commutes to grand dining tables, every VALLIS bottle maintains optical glass clarity and hermetic cryogenic freshness.
            </p>
          </div>

          <div className="text-xs font-mono text-neutral-500 tracking-wider flex items-center gap-2">
            <span>SCROLL HORIZONTALLY</span>
            <ArrowRight className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
          </div>
        </div>

        {/* Product Cards */}
        {PRODUCTS.map((product, idx) => {
          const isSelected = activeProduct.id === product.id;
          return (
            <div
              key={product.id}
              onClick={() => handleSelectProduct(product)}
              className={`w-[320px] sm:w-[380px] shrink-0 p-8 sm:p-10 border rounded-sm flex flex-col justify-between h-[65vh] transition-all duration-500 cursor-pointer select-none relative group ${
                isSelected
                  ? "bg-white/[0.07] border-sky-400/80 shadow-[0_0_40px_rgba(120,180,214,0.2)]"
                  : "bg-white/[0.02] border-white/10 hover:border-white/30 hover:bg-white/[0.04]"
              }`}
              data-cursor="SELECT 3D"
            >
              {/* Card Header */}
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400">
                  NO. 0{idx + 1} // {product.edition}
                </span>
                <span className="text-xs font-mono text-sky-300 font-semibold px-2.5 py-1 bg-white/5 border border-white/10 rounded-xs">
                  {product.volume}
                </span>
              </div>

              {/* Center Silhouette Info */}
              <div className="my-auto space-y-3 py-6">
                <h4 className="text-2xl sm:text-3xl font-serif tracking-wider text-white font-light">
                  {product.name}
                </h4>
                <p className="text-xs text-sky-200/90 font-mono tracking-wide">
                  {product.subtitle}
                </p>
                <p className="text-xs text-neutral-400 font-light leading-relaxed line-clamp-3">
                  {product.description}
                </p>

                {/* Tasting note pill tags */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {product.tastingNotes.map((note, nIdx) => (
                    <span
                      key={nIdx}
                      className="text-[9px] font-mono tracking-wider px-2 py-0.5 bg-white/5 border border-white/10 text-neutral-300 rounded-full"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </div>

              {/* Specs & Quick Action */}
              <div className="pt-4 border-t border-white/10 space-y-4">
                <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-neutral-400">
                  <div>
                    <span className="block text-neutral-500">DIMENSIONS</span>
                    <span className="text-white">{product.specs.height} × {product.specs.diameter}</span>
                  </div>
                  <div>
                    <span className="block text-neutral-500">NET WEIGHT</span>
                    <span className="text-white">{product.specs.weight}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-mono text-white font-medium">
                      ${product.price}
                    </span>
                    <span className="text-[10px] font-mono text-neutral-400">/ vessel</span>
                  </div>

                  <button
                    onClick={(e) => handleQuickAdd(e, product)}
                    className="px-4 py-2 bg-white text-black hover:bg-sky-200 transition-colors text-[10px] font-mono tracking-widest uppercase font-semibold flex items-center gap-1.5 rounded-xs"
                    data-cursor="ADD"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>RESERVE</span>
                  </button>
                </div>
              </div>

              {/* Active 3D Indicator */}
              {isSelected && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-sky-400 text-black text-[9px] font-mono tracking-widest uppercase font-bold rounded-full shadow-lg flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" />
                  <span>ACTIVE IN 3D STAGE</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
