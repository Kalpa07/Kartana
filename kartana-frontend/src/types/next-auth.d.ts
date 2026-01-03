import { CartItem, Order } from "@/lib/types";
import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      cart?: CartItem[];
      orderHistory?: Order[];
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    cart?: CartItem[];
    orderHistory?: Order[];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    cart?: CartItem[];
    orderHistory?: Order[];
  }
}
