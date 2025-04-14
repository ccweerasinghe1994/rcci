import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "./prisma";

// Create a separate auth configuration that doesn't use Prisma
// for middleware (Edge runtime compatible)
export const { auth } = NextAuth({
  providers: [], // Empty providers array for middleware
  pages: {
    signIn: "/login",
  },
});

// Full auth configuration with Prisma adapter for API routes
export const { handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          const user = null;

          if (!user) {
            throw new Error("Invalid credentials.");
          }

          return user;
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
});
