export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string[];
  description: string;
  available: boolean;
  returnDate?: string;
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
