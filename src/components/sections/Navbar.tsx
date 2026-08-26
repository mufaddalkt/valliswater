"use client";

import React, { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { Volume2, VolumeX, ShoppingBag, Menu, X } from "lucide-react";
import { soundManager } from "@/lib/audio";

export function Navbar() {
  const { totalCount, toggleCart, isAudioMuted, toggleAudio } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    soundManager.playChime(1100);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 flex justify-center px-4 sm:px-8 py-4 sm:py-6 ${
          isScrolled
            ? "py-3 sm:py-4 bg-[#0c0d10]/80 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
            : "bg-transparent"
        }`}
      >
        <div className="w-full max-w-7xl flex items-center justify-between">
          {/* Left: Brand Monogram & Origin Telemetry */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => scrollToSection("hero")}
              className="flex items-center gap-3 text-left group"
              data-cursor="TOP"
            >
              <span className="text-xl sm:text-2xl font-serif tracking-[0.3em] font-medium text-white transition-opacity group-hover:opacity-80">
                VALLIS
              </span>
              <span className="hidden md:inline-block text-[9px] font-mono tracking-[0.25em] text-sky-300/70 border-l border-white/20 pl-3">
                4,200M ALPS
              </span>
            </button>
          </div>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-[11px] font-mono tracking-[0.25em] uppercase text-neutral-300">
            <button
              onClick={() => scrollToSection("origin")}
              className="hover:text-white transition-colors relative py-1 hover:after:w-full after:w-0 after:h-[1px] after:bg-sky-400 after:absolute after:bottom-0 after:left-0 after:transition-all"
            >
              01 Origin
            </button>
            <button
              onClick={() => scrollToSection("purity")}
              className="hover:text-white transition-colors relative py-1 hover:after:w-full after:w-0 after:h-[1px] after:bg-sky-400 after:absolute after:bottom-0 after:left-0 after:transition-all"
            >
              02 Purity
            </button>
            <button
              onClick={() => scrollToSection("transformation")}
              className="hover:text-white transition-colors relative py-1 hover:after:w-full after:w-0 after:h-[1px] after:bg-sky-400 after:absolute after:bottom-0 after:left-0 after:transition-all"
            >
              03 Craft
            </button>
            <button
              onClick={() => scrollToSection("collection")}
              className="hover:text-white transition-colors relative py-1 hover:after:w-full after:w-0 after:h-[1px] after:bg-sky-400 after:absolute after:bottom-0 after:left-0 after:transition-all"
            >
              04 Collection
            </button>
            <button
              onClick={() => scrollToSection("sustainability")}
              className="hover:text-white transition-colors relative py-1 hover:after:w-full after:w-0 after:h-[1px] after:bg-sky-400 after:absolute after:bottom-0 after:left-0 after:transition-all"
            >
              05 Circularity
            </button>
            <button
              onClick={() => scrollToSection("shop")}
              className="text-sky-300 hover:text-white transition-colors relative py-1 font-semibold hover:after:w-full after:w-0 after:h-[1px] after:bg-white after:absolute after:bottom-0 after:left-0 after:transition-all"
            >
              Shop Reserve
            </button>
          </nav>

          {/* Right: Audio Toggle & Cart Button */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Ambient Sound Toggle */}
            <button
              onClick={toggleAudio}
              className={`p-2.5 rounded-full border transition-all duration-300 flex items-center gap-2 ${
                !isAudioMuted
                  ? "bg-sky-500/10 border-sky-400/50 text-sky-300 shadow-[0_0_15px_rgba(120,180,214,0.3)]"
                  : "bg-white/5 border-white/10 text-neutral-400 hover:text-white hover:border-white/30"
              }`}
              title={isAudioMuted ? "Enable Alpine Soundscape" : "Mute Soundscape"}
              data-cursor={isAudioMuted ? "SOUND ON" : "MUTE"}
            >
              {isAudioMuted ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-sky-400 animate-pulse" />
                  <span className="hidden sm:inline-block text-[9px] font-mono tracking-widest uppercase">
                    Glacier Live
                  </span>
                </>
              )}
            </button>

            {/* Cart Drawer Trigger */}
            <button
              onClick={toggleCart}
              className="px-4 py-2 sm:px-5 sm:py-2.5 bg-white text-black hover:bg-sky-200 transition-all duration-300 rounded-xs flex items-center gap-2.5 text-xs font-mono tracking-[0.2em] uppercase font-semibold"
              data-cursor="CART"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reserve</span>
              <span className="w-5 h-5 rounded-full bg-black text-white text-[10px] flex items-center justify-center font-bold">
                {totalCount}
              </span>
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 text-neutral-300 hover:text-white bg-white/5 border border-white/10 rounded-full"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-[#0c0d10]/95 backdrop-blur-2xl flex flex-col justify-center px-8 py-20 space-y-8 animate-in fade-in duration-300">
          <div className="space-y-6 text-xl font-serif tracking-[0.25em] uppercase text-neutral-200">
            <button
              onClick={() => scrollToSection("origin")}
              className="block w-full text-left py-2 border-b border-white/10 hover:text-sky-300"
            >
              01 — Origin & Source
            </button>
            <button
              onClick={() => scrollToSection("purity")}
              className="block w-full text-left py-2 border-b border-white/10 hover:text-sky-300"
            >
              02 — Mineral Purity
            </button>
            <button
              onClick={() => scrollToSection("transformation")}
              className="block w-full text-left py-2 border-b border-white/10 hover:text-sky-300"
            >
              03 — Glass Craftsmanship
            </button>
            <button
              onClick={() => scrollToSection("collection")}
              className="block w-full text-left py-2 border-b border-white/10 hover:text-sky-300"
            >
              04 — The Collection
            </button>
            <button
              onClick={() => scrollToSection("sustainability")}
              className="block w-full text-left py-2 border-b border-white/10 hover:text-sky-300"
            >
              05 — Infinite Circularity
            </button>
            <button
              onClick={() => scrollToSection("shop")}
              className="block w-full text-left py-2 border-b border-sky-400 text-sky-400"
            >
              06 — Shop Reserve
            </button>
          </div>

          <div className="pt-8 text-xs font-mono tracking-widest text-neutral-400 flex justify-between">
            <span>ALTITUDE: 4,200M</span>
            <span>TDS: 18 MG/L</span>
          </div>
        </div>
      )}
    </>
  );
}
