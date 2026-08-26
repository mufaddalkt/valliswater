"use client";

import React, { useState, useRef, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { X, Plus, Minus, Trash2, ShieldCheck, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import { gsap } from "@/lib/gsap-utils";
import confetti from "canvas-confetti";

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    updateQuantity,
    removeItem,
    clearCart,
    totalCount,
    subtotal,
    shipping,
    freeShippingThreshold,
    remainingForFreeShipping,
  } = useCart();

  const drawerRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  // GSAP animation on open/close
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      gsap.to(backdropRef.current, {
        opacity: 1,
        pointerEvents: "auto",
        duration: 0.4,
        ease: "power2.out",
      });
      gsap.to(drawerRef.current, {
        x: "0%",
        duration: 0.5,
        ease: "power3.out",
      });
    } else {
      document.body.style.overflow = "";
      gsap.to(backdropRef.current, {
        opacity: 0,
        pointerEvents: "none",
        duration: 0.3,
        ease: "power2.in",
      });
      gsap.to(drawerRef.current, {
        x: "100%",
        duration: 0.4,
        ease: "power3.in",
      });
    }
  }, [isOpen]);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderComplete(true);
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#78b4d6", "#ffffff", "#c8e8ef", "#d2d6dc"],
      });
    }, 1200);
  };

  const handleFinishOrder = () => {
    setOrderComplete(false);
    clearCart();
    closeCart();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        ref={backdropRef}
        onClick={closeCart}
        className="fixed inset-0 z-[9990] bg-black/60 backdrop-blur-md opacity-0 pointer-events-none transition-opacity duration-300"
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className="fixed top-0 right-0 bottom-0 w-full max-w-lg z-[9995] bg-[#0e1013] text-neutral-100 border-l border-white/10 shadow-2xl flex flex-col justify-between transform translate-x-full transition-transform"
      >
        {/* Header */}
        <div className="p-6 sm:p-8 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-baseline gap-3">
            <h2 className="text-xl font-serif tracking-[0.2em] uppercase text-white font-light">
              Your Reserve
            </h2>
            <span className="text-xs font-mono text-sky-400">
              ({totalCount} {totalCount === 1 ? "vessel" : "vessels"})
            </span>
          </div>

          <button
            onClick={closeCart}
            className="p-2 hover:bg-white/10 rounded-full transition-colors text-neutral-400 hover:text-white"
            aria-label="Close cart"
            data-cursor="CLOSE"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress */}
        <div className="px-6 sm:px-8 py-3 bg-white/[0.02] border-b border-white/5">
          <div className="flex justify-between items-center text-[11px] tracking-wider font-mono text-neutral-300 mb-2">
            <span>
              {remainingForFreeShipping > 0
                ? `Add $${remainingForFreeShipping} for Complimentary Alpine Delivery`
                : "Unlocked: Complimentary Temperature-Controlled Shipping"}
            </span>
            <span className="text-sky-400 font-medium">
              {Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100))}%
            </span>
          </div>
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-sky-500 to-cyan-300 transition-all duration-500 rounded-full"
              style={{
                width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%`,
              }}
            />
          </div>
        </div>

        {/* Items Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          {orderComplete ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-12">
              <div className="w-16 h-16 rounded-full bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-sky-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-serif tracking-[0.15em] text-white">
                  ORDER CONFIRMED
                </h3>
                <p className="text-xs text-neutral-400 tracking-wider font-mono">
                  DISPATCH REF: #VAL-{Math.floor(100000 + Math.random() * 900000)}
                </p>
              </div>
              <p className="text-sm text-neutral-300 max-w-xs font-light leading-relaxed">
                Your bespoke VALLIS collection has been reserved at the alpine aquifer vault and is prepared for secure refrigerated transit.
              </p>
              <button
                onClick={handleFinishOrder}
                className="w-full py-4 bg-white text-black text-xs font-mono tracking-[0.25em] uppercase hover:bg-sky-200 transition-colors"
              >
                RETURN TO STORY
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-16 text-neutral-400">
              <Sparkles className="w-10 h-10 stroke-[1] text-sky-400/60" />
              <p className="text-sm font-light tracking-widest uppercase">
                Your reserve is currently empty.
              </p>
              <p className="text-xs text-neutral-500 max-w-xs">
                Explore the collection of pure subterranean alpine bottles.
              </p>
              <button
                onClick={closeCart}
                className="mt-4 px-6 py-2.5 border border-white/20 text-xs font-mono tracking-widest uppercase text-white hover:border-white transition-colors"
              >
                DISCOVER COLLECTION
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="p-4 bg-white/[0.03] border border-white/10 rounded-sm flex gap-4 items-center group hover:border-white/20 transition-colors"
              >
                {/* Bottle Icon / Mini visual */}
                <div className="w-16 h-20 bg-neutral-900 border border-white/10 rounded-sm flex flex-col items-center justify-center p-2 relative shrink-0">
                  <div className="w-4 h-2 bg-neutral-400 rounded-t-xs" />
                  <div className="w-8 flex-1 border border-sky-400/30 rounded-t-lg rounded-b-xs flex items-center justify-center">
                    <span className="text-[8px] font-mono text-sky-300">
                      {item.product.volume}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex justify-between items-start">
                    <h4 className="text-sm font-serif tracking-wider text-white truncate">
                      {item.product.name}
                    </h4>
                    <span className="text-sm font-mono text-white font-medium">
                      ${item.unitPrice * item.quantity}
                    </span>
                  </div>

                  <p className="text-[11px] font-mono text-neutral-400">
                    {item.packType === "case12"
                      ? "Wooden Crate of 12"
                      : item.packType === "case6"
                      ? "Vault Pack of 6"
                      : "Single Vessel"} · ${item.unitPrice} each
                  </p>

                  {item.engraving && (
                    <p className="text-[10px] font-mono text-sky-400/90 italic">
                      Engraved: &quot;{item.engraving}&quot;
                    </p>
                  )}

                  {/* Quantity & Delete */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center border border-white/20 rounded-xs">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-1 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-3 text-xs font-mono text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-1 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-neutral-500 hover:text-rose-400 transition-colors p-1"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer with Checkout */}
        {items.length > 0 && !orderComplete && (
          <div className="p-6 sm:p-8 border-t border-white/10 bg-[#0b0c0e] space-y-4">
            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between text-neutral-400">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Refrigerated Delivery</span>
                <span>{shipping === 0 ? "Complimentary" : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Alpine Conservation Fund</span>
                <span>$0.00 (Included)</span>
              </div>
              <div className="flex justify-between text-sm text-white pt-2 border-t border-white/10 font-serif tracking-widest">
                <span>TOTAL</span>
                <span className="font-mono font-medium">${(subtotal + shipping).toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full py-4 bg-white hover:bg-sky-200 text-black text-xs font-mono tracking-[0.25em] uppercase font-semibold flex items-center justify-center gap-3 transition-all duration-300 disabled:opacity-50"
              data-cursor="PAY NOW"
            >
              {isCheckingOut ? (
                <span className="animate-pulse">ENCRYPTING DISPATCH...</span>
              ) : (
                <>
                  <span>PROCEED TO WHITE-GLOVE CHECKOUT</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-neutral-400 font-mono tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
              <span>Insured Transit · Zero-Breakage Guarantee</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
