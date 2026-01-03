import { CartItem, Order } from "@/lib/types"; 
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      cart?: CartItem[];
      orderHistory?: Order[];
    };
  }

  interface User {
    id: string;
    firstName: string;
    lastName:string;
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
