"use client";

import React, { useState, useRef, useEffect } from "react";
import { PRODUCTS, ProductItem } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import { gsap } from "@/lib/gsap-utils";
import { Plus, Check, ShieldCheck, Sparkles, Truck, Box } from "lucide-react";
import { soundManager } from "@/lib/audio";

export function ShopGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const { addItem, setActiveProduct } = useCart();

  const [selectedPacks, setSelectedPacks] = useState<Record<string, "single" | "case6" | "case12">>({
    "vallis-330": "single",
    "vallis-500": "case6",
    "vallis-750": "single",
    "vallis-1000": "single",
    "vallis-sparkling": "case6",
  });

  const [engravings, setEngravings] = useState<Record<string, string>>({});
  const [showEngravingFor, setShowEngravingFor] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(gridRef.current?.children || [], {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "top 20%",
          scrub: 1,
        },
        opacity: 0,
        y: 40,
        stagger: 0.15,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handlePackChange = (productId: string, pack: "single" | "case6" | "case12") => {
    soundManager.playChime(1000);
    setSelectedPacks((prev) => ({ ...prev, [productId]: pack }));
  };

  const handleAddToCart = (product: ProductItem) => {
    const pack = selectedPacks[product.id] || "single";
    const engraving = engravings[product.id];
    addItem(product, pack, engraving);
    setActiveProduct(product);
  };

  return (
    <section
      id="shop"
      ref={sectionRef}
      className="relative min-h-screen w-full px-6 sm:px-12 lg:px-20 py-32 z-20 pointer-events-none"
    >
      <div className="w-full max-w-7xl mx-auto space-y-16 pointer-events-auto select-none">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-2">
            <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-sky-400 font-medium flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              COMMERCE // VAULT ACQUISITION
            </span>
            <h2 className="text-4xl sm:text-6xl font-serif tracking-[0.12em] uppercase font-light text-white leading-tight">
              RESERVE THE WATER
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs font-mono text-neutral-400">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-sky-400" />
              <span>Temperature-Controlled Dispatch</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-sky-400" />
              <span>Complimentary Laser Monogram</span>
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {PRODUCTS.map((product) => {
            const currentPack = selectedPacks[product.id] || "single";
            const price =
              currentPack === "case12"
                ? product.packPrices.case12
                : currentPack === "case6"
                ? product.packPrices.case6
                : product.packPrices.single;

            const unitPrice =
              currentPack === "case12"
                ? (product.packPrices.case12 / 12).toFixed(1)
                : currentPack === "case6"
                ? (product.packPrices.case6 / 6).toFixed(1)
                : product.packPrices.single;

            return (
              <div
                key={product.id}
                onMouseEnter={() => setActiveProduct(product)}
                className="p-8 bg-[#0d0f12]/90 backdrop-blur-xl border border-white/10 rounded-sm flex flex-col justify-between group hover:border-sky-400/50 hover:shadow-[0_10px_30px_rgba(0,0,0,0.6)] transition-all duration-300 relative"
                data-cursor="RESERVE"
              >
                {/* Top Badge */}
                <div className="flex justify-between items-start pb-4 border-b border-white/5">
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-sky-400 uppercase">
                      {product.edition}
                    </span>
                    <h3 className="text-2xl font-serif tracking-wider text-white font-light pt-1">
                      {product.name}
                    </h3>
                  </div>
                  <span className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-xs text-xs font-mono text-white font-semibold">
                    {product.volume}
                  </span>
                </div>

                {/* Body Details */}
                <div className="py-6 space-y-4">
                  <p className="text-xs text-neutral-300 font-light leading-relaxed">
                    {product.description}
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-neutral-400 pt-2 border-t border-white/5">
                    <div>
                      <span className="text-neutral-500 block">pH / ALKALINITY</span>
                      <span className="text-white">{product.specs.ph}</span>
                    </div>
                    <div>
                      <span className="text-neutral-500 block">TDS / MINERALS</span>
                      <span className="text-white">{product.specs.tds}</span>
                    </div>
                  </div>

                  {/* Pack Selector Toggle */}
                  <div className="pt-2">
                    <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block mb-2">
                      SELECT CONFIGURATION:
                    </span>
                    <div className="grid grid-cols-3 gap-1.5 p-1 bg-black/40 border border-white/10 rounded-xs text-[10px] font-mono">
                      <button
                        onClick={() => handlePackChange(product.id, "single")}
                        className={`py-1.5 transition-colors rounded-xs ${
                          currentPack === "single"
                            ? "bg-white text-black font-semibold"
                            : "text-neutral-400 hover:text-white"
                        }`}
                      >
                        Single
                      </button>
                      <button
                        onClick={() => handlePackChange(product.id, "case6")}
                        className={`py-1.5 transition-colors rounded-xs ${
                          currentPack === "case6"
                            ? "bg-white text-black font-semibold"
                            : "text-neutral-400 hover:text-white"
                        }`}
                      >
                        Case (6)
                      </button>
                      <button
                        onClick={() => handlePackChange(product.id, "case12")}
                        className={`py-1.5 transition-colors rounded-xs ${
                          currentPack === "case12"
                            ? "bg-white text-black font-semibold"
                            : "text-neutral-400 hover:text-white"
                        }`}
                      >
                        Crate (12)
                      </button>
                    </div>
                  </div>

                  {/* Custom Engraving Toggle */}
                  <div className="pt-1">
                    {showEngravingFor === product.id ? (
                      <div className="space-y-1.5 animate-in fade-in duration-200">
                        <div className="flex justify-between items-center text-[10px] font-mono text-neutral-400">
                          <span>TITANIUM CAP INITIALS (MAX 3):</span>
                          <button
                            onClick={() => setShowEngravingFor(null)}
                            className="text-neutral-500 hover:text-white"
                          >
                            Cancel
                          </button>
                        </div>
                        <input
                          type="text"
                          maxLength={3}
                          placeholder="e.g. VLS"
                          value={engravings[product.id] || ""}
                          onChange={(e) =>
                            setEngravings({
                              ...engravings,
                              [product.id]: e.target.value.toUpperCase(),
                            })
                          }
                          className="w-full bg-black/60 border border-white/20 px-3 py-1.5 text-xs font-mono tracking-widest text-white uppercase focus:outline-none focus:border-sky-400"
                        />
                      </div>
                    ) : (
                      <button
                        onClick={() => setShowEngravingFor(product.id)}
                        className="text-[10px] font-mono text-sky-400/90 hover:text-sky-300 underline tracking-wider"
                      >
                        + Add Complimentary Laser Monogram
                      </button>
                    )}
                  </div>
                </div>

                {/* Footer Pricing & CTA */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-mono text-white font-medium">
                        ${price}
                      </span>
                      <span className="text-[10px] font-mono text-neutral-400">
                        (${unitPrice}/vessel)
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleAddToCart(product)}
                    className="px-5 py-3 bg-white text-black hover:bg-sky-200 transition-colors text-xs font-mono tracking-widest uppercase font-semibold flex items-center gap-2 rounded-xs shadow-lg group-hover:scale-105 duration-200"
                  >
                    <Plus className="w-4 h-4" />
                    <span>RESERVE</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
