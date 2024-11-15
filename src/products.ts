import { Product } from "./types";

export const PRODUCTS: Product[] = [
  // Sound Equipment
  {
    id: "sound-1",
    name: "Professional Speaker Set",
    category: "sound",
    price: 2000,
    image: [
      "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&q=80",
    ],
    description: "High-quality speaker system for events",
    available: true,
  },
  {
    id: "sound-1",
    name: "Professional PA System",
    category: "sound",
    price: 4000,
    image: [
      "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&q=80",
    ],
    description: "Complete PA system suitable for medium to large venues",
    available: true,
  },
  {
    id: "sound-2",
    name: "Wireless Microphone Set",
    category: "sound",
    price: 500,
    image: [
      "https://images.unsplash.com/photo-1504509546545-e000b4a62425?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1504509546545-e000b4a62425?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1546464677-c25cd52c5934?auto=format&fit=crop&q=80",
    ],
    description: "Professional wireless microphone system with 4 mics",
    available: true,
  },

  {
    id: "light-1",
    name: "LED Par Lights Set",
    category: "lighting",
    price: 1500,
    image: [
      "https://images.unsplash.com/photo-1504509546545-e000b4a62425?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1504509546545-e000b4a62425?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1504509546545-e000b4a62425?auto=format&fit=crop&q=80",
    ],
    description: "Set of 8 LED par lights with DMX controller",
    available: true,
  },
  {
    id: "light-2",
    name: "Moving Head Lights",
    category: "lighting",
    price: 1800,
    image: [
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=80",
    ],
    description: "Professional moving head lights with various effects",
    available: true,
  },

  {
    id: "decor-1",
    name: "LED Backdrop",
    category: "decor",
    price: 3000,
    image: [
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80",
    ],
    description: "Stunning LED backdrop for events and weddings",
    available: true,
  },
  {
    id: "decor-2",
    name: "Party Decoration Set",
    category: "decor",
    price: 1200,
    image: [
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80",
    ],
    description: "Complete decoration set for parties and events",
    available: true,
    // usedForEvents: [wedding, reception, haldi],
  },
];
