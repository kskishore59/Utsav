interface Product {
  id: string;
  idealFor: string[];
  name: string;
  category: string;
  subCategory: string;
  price: number;
  setupCharges?: number;
  deliveryCharges?: number;
  rentalDuration: {
    minimum: string; // e.g., "4 hours", "1 day"
    standard: string;
    pricing: {
      hourly?: number;
      daily?: number;
    };
  };
  image: string[];
  description: string;
  specifications?: string[];
  available: boolean;
}

export interface CartItem extends Product {
  quantity: number;
  rentalDays: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: "pending" | "active" | "returned";
  startDate: string;
  endDate: string;
}
