export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  cart: Product[];
  isAuthenticated: boolean;

}

export interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  quantity: number; 
}

export interface CartItem {
  title: string;
  price: number;
  image: string;
  quantity: number;
}

export interface OrderItem {
  title: string;
  price: number;
  quantity: number;
}

export interface Order {
  orderId: string;
  date: string;
  items: OrderItem[];
  total: number;
}
