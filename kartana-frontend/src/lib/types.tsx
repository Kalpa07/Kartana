export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  cart: CartItem[];
  orderHistory: Order[];
  isAuthenticated?: boolean;
}

export interface Product {
  id: string;
  title: string;
  price: number;
  image?: string;
  quantity: number;
}

export interface CartItem {
  title: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface Address {
  name: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
}

export interface OrderItem {
  title: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface Order {
  orderId: string;
  createdAt: string;
  items: OrderItem[];
  shippingAddress: Address;
  total: number;
  status: string;
}

export interface PlaceOrderResponse {
  placeOrder: {
    orderId: string;
    createdAt: string;
    items: {
      title: string;
      price: number;
      quantity: number;
    }[];
    shippingAddress: Address;
    total: number;
    status: string;
  };
}
