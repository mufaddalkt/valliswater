import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { SmoothScroll } from "@/components/animations/SmoothScroll";
import { CustomCursor } from "@/components/animations/CustomCursor";
import { CartDrawer } from "@/components/ui/CartDrawer";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["200", "300", "400", "500", "600", "700"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0b0c0e",
};

export const metadata: Metadata = {
  title: "VALLIS // Artesian Glacial Water — Pure by Nature",
  description:
    "Sub-alpine artesian glacial water bottled at 4,200m elevation through 300 years of volcanic basalt filtration. Optical flint silica crystal with titanium micro-closures.",
  keywords: [
    "Vallis",
    "Luxury Water",
    "Artesian Water",
    "Glacial Water",
    "Bottled Water",
    "Alpine Aquifer",
    "High Silica Water",
    "Natural Alkaline",
  ],
  authors: [{ name: "VALLIS Alpine Water SA" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${plusJakarta.variable} ${spaceGrotesk.variable} dark`}
    >
      <body className="bg-[#0b0c0e] text-[#f2f3f5] min-h-screen antialiased selection:bg-sky-500/30 selection:text-white font-sans">
        <CartProvider>
          <SmoothScroll>
            {/* Film Grain Texture Overlay */}
            <div className="film-grain" />

            {/* Ambient Radial Vignette */}
            <div className="fixed inset-0 vignette-radial pointer-events-none z-0" />

            {/* Custom Fluid Cursor */}
            <CustomCursor />

            {/* Slide-over Cart Drawer */}
            <CartDrawer />

            {/* Main Application */}
            {children}
          </SmoothScroll>
        </CartProvider>
      </body>
    </html>
  );
}
