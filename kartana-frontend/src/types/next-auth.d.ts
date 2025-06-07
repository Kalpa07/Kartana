import { CartItem, Order } from "@/lib/types";  // Assuming types are defined in a separate file

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      cart?: CartItem[];
      orderHistory?: Order[];
    };
  }

  interface User {
    id: string;
    name: string;
    email: string;
    cart?: CartItem[];
    orderHistory?: Order[];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    cart?: CartItem[];
    orderHistory?: Order[];
  }
}
