import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt"; // For typing the JWT
import { Session } from "next-auth"; // For typing the session

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        const res = await fetch(`http://localhost:3001/users?email=${credentials.email}`);
        const users = await res.json();
        const user = users[0];

        if (!user) {
          throw new Error("User not found");
        }

        if (user.password !== credentials.password) {
          throw new Error("Incorrect password");
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          cart: user.cart,  
          orderHistory: user.orderHistory,  
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    error: "/auth/signin",
  },
  session: {
    strategy: "jwt" as const, 
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.cart = user.cart;  // Store cart in JWT token
        token.orderHistory = user.orderHistory;  // Store order history in JWT token
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user && token.id) {
        session.user.id = token.id as string;
        session.user.cart = token.cart;  // Attach cart data to session
        session.user.orderHistory = token.orderHistory;  // Attach order history data to session
      }
      return session;
    },
  },
};

const handler = (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, authOptions);
export { handler as GET, handler as POST };
