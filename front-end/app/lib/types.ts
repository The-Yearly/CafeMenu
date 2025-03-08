export interface CartData {
  itemId: number;
  name: string;
  bio: string;
  image: string;
  cost: number;
  quantity: number;
}

export interface Bill {
  cartItems: CartData[];
  tableId: number;
  totalCost: number;
}
export default interface Categories {
  name: string;
  images: string;
  slug: string;
}
export interface Food {
  itemId: number;
  name: string;
  bio: string;
  image: string;
  category: string;
  subcategory: string;
  isVegan: Boolean;
  tags: string[];
  cost: number;
  availability: Boolean;
  quantity: number;
}

export interface Order {
  Cart: CartData;
  totalCost: number;
  tableId: number;
}

export interface User {
  username: String;
  password: String;
  isAdmin: boolean;
}
