export interface Product {
  id: string;
  name: string;
  category: string;
  subCategory: string;
  price: number;
  image: string[];
  description: string;
  specifications: string[];
  available: boolean;
  rentalDuration: RentalDuration;
  setupCharges?: number;
  deliveryCharges?: number;
}

export interface RentalDuration {
  minimum: string;
  standard: string;
  pricing: {
    hourly?: number;
    daily?: number;
  };
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  itemCount: number;
}

export interface SearchResult {
  type: "product" | "category";
  id: string;
  name: string;
  image: string;
  description: string;
}

export type LoadingState = "idle" | "loading" | "success" | "error";
