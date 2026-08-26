"use client";

import React, { useState } from "react";
import { ArrowUpRight, Check, Compass, ShieldCheck } from "lucide-react";
import { soundManager } from "@/lib/audio";

export function Footer() {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    soundManager.playWaterDrop();
    setSubscribed(true);
  };

  return (
    <footer className="relative bg-[#08090b] text-neutral-300 border-t border-white/10 pt-20 pb-12 px-6 sm:px-12 lg:px-20 z-20">
      <div className="w-full max-w-7xl mx-auto space-y-16">
        {/* Top Tier: Monogram & Allocation Signup */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-4xl sm:text-6xl font-serif tracking-[0.25em] uppercase font-light text-white">
              VALLIS
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 font-light max-w-md font-sans leading-relaxed">
              Artesian Glacial Water bottled directly from the 4,200m subterranean alpine vault. Preserving raw molecular perfection without human compromise.
            </p>
            <div className="flex items-center gap-3 text-xs font-mono text-sky-400">
              <Compass className="w-4 h-4" />
              <span>46°01&apos;22&quot;N 7°44&apos;58&quot;E · 4,200M ALTITUDE</span>
            </div>
          </div>

          {/* Allocation Newsletter */}
          <div className="lg:col-span-6 space-y-4">
            <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-sky-400 font-semibold block">
              SEASONAL GRAND CRU ALLOCATION
            </span>
            <p className="text-xs text-neutral-400 font-light">
              Receive private invitations to limited seasonal magnum releases and bespoke sommelier dining allocations.
            </p>

            {subscribed ? (
              <div className="p-4 bg-sky-500/10 border border-sky-400/30 rounded-xs text-xs font-mono text-sky-300 flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>Allocation request registered. You will be notified prior to seasonal bottling.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-white/5 border border-white/10 px-4 py-3 text-xs font-mono text-white placeholder:text-neutral-600 focus:outline-none focus:border-sky-400 transition-colors rounded-xs"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-white text-black hover:bg-sky-200 transition-colors text-xs font-mono tracking-widest uppercase font-semibold rounded-xs"
                >
                  REQUEST ACCESS
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Middle Tier: Certifications & Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-y border-white/5 text-xs font-mono">
          <div className="space-y-3">
            <span className="text-neutral-500 uppercase tracking-widest block text-[10px]">
              EXPLORATION
            </span>
            <ul className="space-y-2">
              <li><a href="#origin" className="hover:text-white transition-colors">Geological Genesis</a></li>
              <li><a href="#purity" className="hover:text-white transition-colors">Mineral Spectrum</a></li>
              <li><a href="#transformation" className="hover:text-white transition-colors">Flint Glass Craft</a></li>
              <li><a href="#collection" className="hover:text-white transition-colors">Vessel Sizes</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <span className="text-neutral-500 uppercase tracking-widest block text-[10px]">
              COMMERCE
            </span>
            <ul className="space-y-2">
              <li><a href="#shop" className="hover:text-white transition-colors">Reserve Online</a></li>
              <li><span className="text-neutral-500">Private Cellar Storage</span></li>
              <li><span className="text-neutral-500">Sommelier Partnerships</span></li>
              <li><span className="text-neutral-500">White-Glove Courier</span></li>
            </ul>
          </div>

          <div className="space-y-3">
            <span className="text-neutral-500 uppercase tracking-widest block text-[10px]">
              PRESERVATION
            </span>
            <ul className="space-y-2">
              <li><a href="#sustainability" className="hover:text-white transition-colors">100% Circular Silica</a></li>
              <li><span className="text-neutral-500">Alpine Aquifer Trust</span></li>
              <li><span className="text-neutral-500">Zero Plastic Protocol</span></li>
              <li><span className="text-neutral-500">Carbon Negative Audit</span></li>
            </ul>
          </div>

          <div className="space-y-3">
            <span className="text-neutral-500 uppercase tracking-widest block text-[10px]">
              AUTHENTICITY
            </span>
            <div className="space-y-2 text-[11px] text-neutral-400">
              <p>SGS Certified Laboratory</p>
              <p>ISO 22000 Alpine Facility</p>
              <p>Batch Verification: #VAL-2026</p>
            </div>
          </div>
        </div>

        {/* Bottom Tier: Copyright & Legal */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-mono tracking-widest text-neutral-500">
          <p>© 2026 VALLIS ARTESIAN WATER SA. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-6">
            <span>TERMS OF VAULT</span>
            <span>PRIVACY DISCLOSURE</span>
            <span>LAB ACCREDITATION</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
