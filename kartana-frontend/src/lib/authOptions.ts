// lib/authOptions.ts
import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await fetch(`http://localhost:3001/users?email=${credentials?.email}`);
          const users = await res.json();

          const user = users[0];
          if (user && user.password === credentials?.password) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
            };
          }

          return null;
        } catch (err) {
          console.error("Auth error:", err);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin", // adjust this if your sign-in path is different
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
