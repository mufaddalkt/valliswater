export interface ProductItem {
  id: string;
  name: string;
  subtitle: string;
  tagline: string;
  volume: string;
  volumeNumber: number;
  heightRatio: number;
  widthRatio: number;
  neckRatio: number;
  price: number;
  packPrices: {
    single: number;
    case6: number;
    case12: number;
  };
  sparkling: boolean;
  edition: string;
  description: string;
  tastingNotes: string[];
  specs: {
    height: string;
    diameter: string;
    weight: string;
    glassType: string;
    ph: string;
    tds: string;
    silica: string;
  };
  accentColor: string;
}

export const PRODUCTS: ProductItem[] = [
  {
    id: "vallis-330",
    name: "VALLIS Petite",
    subtitle: "Pocket Edition",
    tagline: "Precision hydration designed for motion.",
    volume: "330 ML",
    volumeNumber: 330,
    heightRatio: 0.75,
    widthRatio: 0.88,
    neckRatio: 0.85,
    price: 18,
    packPrices: {
      single: 18,
      case6: 98,
      case12: 180,
    },
    sparkling: false,
    edition: "Everyday Carry",
    description:
      "Crafted for elevated daily commutes and intimate dining. Solid flint glass with calibrated pocket ergonomics.",
    tastingNotes: ["Velvety mouthfeel", "Crisp arctic finish", "Zero minerality weight"],
    specs: {
      height: "192 mm",
      diameter: "58 mm",
      weight: "340 g",
      glassType: "Ultra-Clear Flint Glass",
      ph: "7.85 Natural Alkaline",
      tds: "18 mg/L",
      silica: "42 mg/L",
    },
    accentColor: "#92c4df",
  },
  {
    id: "vallis-500",
    name: "VALLIS Classic",
    subtitle: "The Signature Silhouette",
    tagline: "The quintessential balance of purity and volume.",
    volume: "500 ML",
    volumeNumber: 500,
    heightRatio: 1.0,
    widthRatio: 1.0,
    neckRatio: 1.0,
    price: 24,
    packPrices: {
      single: 24,
      case6: 130,
      case12: 240,
    },
    sparkling: false,
    edition: "Signature Reserve",
    description:
      "Our most celebrated vessel. Flawless optical clarity encapsulating 300 years of glacial alpine filtration.",
    tastingNotes: ["Glacial purity", "Delicate sweet mineral tone", "Effortless lightness"],
    specs: {
      height: "238 mm",
      diameter: "66 mm",
      weight: "480 g",
      glassType: "Monolithic Silica Crystal",
      ph: "7.88 Natural Alkaline",
      tds: "18 mg/L",
      silica: "48 mg/L",
    },
    accentColor: "#78b4d6",
  },
  {
    id: "vallis-750",
    name: "VALLIS Grand Carafe",
    subtitle: "Epicurean Edition",
    tagline: "Sculpted for table service and sommelier pairings.",
    volume: "750 ML",
    volumeNumber: 750,
    heightRatio: 1.25,
    widthRatio: 1.12,
    neckRatio: 1.15,
    price: 34,
    packPrices: {
      single: 34,
      case6: 185,
      case12: 340,
    },
    sparkling: false,
    edition: "Gastronomic Service",
    description:
      "Proportioned to stand alongside the world's grand crus. Refracts candlelight with architectural stillness.",
    tastingNotes: ["Silky palate opener", "Neutralizes tannins", "Sustained freshness"],
    specs: {
      height: "282 mm",
      diameter: "76 mm",
      weight: "690 g",
      glassType: "Hand-Finished Borosilicate",
      ph: "7.90 Natural Alkaline",
      tds: "19 mg/L",
      silica: "51 mg/L",
    },
    accentColor: "#a0d2eb",
  },
  {
    id: "vallis-1000",
    name: "VALLIS Monument",
    subtitle: "The 1-Litre Magnum",
    tagline: "A sculptural monolith of subterranean perfection.",
    volume: "1000 ML",
    volumeNumber: 1000,
    heightRatio: 1.45,
    widthRatio: 1.22,
    neckRatio: 1.25,
    price: 46,
    packPrices: {
      single: 46,
      case6: 250,
      case12: 460,
    },
    sparkling: false,
    edition: "Collector’s Vessel",
    description:
      "A heavyweight tactile presence engineered for enduring luxury. Laser-serialized titanium closure.",
    tastingNotes: ["Immense crispness", "Deep glacial serenity", "Pristine neutral finish"],
    specs: {
      height: "320 mm",
      diameter: "84 mm",
      weight: "920 g",
      glassType: "Dual-Wall Insulated Crystal",
      ph: "7.92 Natural Alkaline",
      tds: "18 mg/L",
      silica: "54 mg/L",
    },
    accentColor: "#b2e0f2",
  },
  {
    id: "vallis-sparkling",
    name: "VALLIS Effervescence",
    subtitle: "Micro-Carbonated Reserve",
    tagline: "Natural alpine mineral spring with gossamer bubbles.",
    volume: "750 ML",
    volumeNumber: 750,
    heightRatio: 1.28,
    widthRatio: 1.15,
    neckRatio: 1.18,
    price: 38,
    packPrices: {
      single: 38,
      case6: 210,
      case12: 380,
    },
    sparkling: true,
    edition: "Cellar Reserve",
    description:
      "Infused with delicate volcanic micro-bubbles under low pressure. Creates a dancing, champagne-like texture.",
    tastingNotes: ["Pin-point effervescence", "Bright mineral acidity", "Invigorating crisp mouthfeel"],
    specs: {
      height: "288 mm",
      diameter: "78 mm",
      weight: "740 g",
      glassType: "Pressure-Calibrated Crystal",
      ph: "6.40 Naturally Carbonated",
      tds: "34 mg/L",
      silica: "46 mg/L",
    },
    accentColor: "#7ed0e0",
  },
];

export const MINERAL_ANALYSIS = [
  { name: "Silica (SiO₂)", value: "48.2 mg/L", benefit: "Collagen & Cellular Hydration", percent: 88 },
  { name: "Magnesium (Mg²⁺)", value: "3.4 mg/L", benefit: "Neuromuscular Calm & Equilibrium", percent: 34 },
  { name: "Calcium (Ca²⁺)", value: "8.1 mg/L", benefit: "Cellular Bone & Membrane Density", percent: 45 },
  { name: "Potassium (K⁺)", value: "1.2 mg/L", benefit: "Bio-Electric Intracellular Balance", percent: 22 },
  { name: "Total Dissolved Solids (TDS)", value: "18 mg/L", benefit: "Ultra-Lightweight Viscosity", percent: 14 },
  { name: "Natural pH Level", value: "7.88", benefit: "Optimized Physiological Alkaline", percent: 92 },
];
