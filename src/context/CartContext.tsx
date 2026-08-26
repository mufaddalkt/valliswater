"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { ProductItem, PRODUCTS } from "@/lib/products";
import { soundManager } from "@/lib/audio";

export interface CartEntry {
  id: string;
  product: ProductItem;
  packType: "single" | "case6" | "case12";
  quantity: number;
  engraving?: string;
  unitPrice: number;
}

interface CartContextType {
  items: CartEntry[];
  isOpen: boolean;
  activeProduct: ProductItem;
  setActiveProduct: (product: ProductItem) => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (product: ProductItem, packType?: "single" | "case6" | "case12", engraving?: string) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  totalCount: number;
  subtotal: number;
  shipping: number;
  freeShippingThreshold: number;
  remainingForFreeShipping: number;
  isAudioMuted: boolean;
  toggleAudio: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartEntry[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState<ProductItem>(PRODUCTS[1]); // Default 500ml
  const [isAudioMuted, setIsAudioMuted] = useState(true);

  // Initialize with signature bottle if desired or empty
  useEffect(() => {
    // Check localStorage if available
    try {
      const saved = localStorage.getItem("vallis_cart");
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("vallis_cart", JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  const toggleAudio = () => {
    const muted = soundManager.toggleMute();
    setIsAudioMuted(muted);
  };

  const openCart = () => {
    soundManager.playChime(950);
    setIsOpen(true);
  };

  const closeCart = () => {
    setIsOpen(false);
  };

  const toggleCart = () => {
    if (isOpen) closeCart();
    else openCart();
  };

  const addItem = (
    product: ProductItem,
    packType: "single" | "case6" | "case12" = "single",
    engraving?: string
  ) => {
    soundManager.playWaterDrop();
    const unitPrice =
      packType === "case12"
        ? product.packPrices.case12
        : packType === "case6"
        ? product.packPrices.case6
        : product.packPrices.single;

    const entryId = `${product.id}-${packType}-${engraving || "none"}`;

    setItems((prev) => {
      const existing = prev.find((item) => item.id === entryId);
      if (existing) {
        return prev.map((item) =>
          item.id === entryId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: entryId,
          product,
          packType,
          quantity: 1,
          engraving,
          unitPrice,
        },
      ];
    });

    setIsOpen(true);
  };

  const removeItem = (id: string) => {
    soundManager.playChime(600);
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    soundManager.playChime(800 + delta * 200);
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartEntry[]
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );
  const freeShippingThreshold = 100;
  const shipping = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 15;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        activeProduct,
        setActiveProduct,
        openCart,
        closeCart,
        toggleCart,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalCount,
        subtotal,
        shipping,
        freeShippingThreshold,
        remainingForFreeShipping,
        isAudioMuted,
        toggleAudio,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
