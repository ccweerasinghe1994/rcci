import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs"; // Or 'bcrypt' depending on which you installed
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "./prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      // Optional: Add name for the provider if needed
      // name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "jsmith@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        // 1. Validate credentials input
        if (!credentials?.email || !credentials.password) {
          console.error("Missing credentials");
          return null;
        }

        // 2. Find the user by email
        const user = await prisma.user.findUnique({
          // Use findUnique for potentially better performance on indexed field
          where: {
            email: credentials.email as string,
          },
        });

        // 3. Check if user exists and has a password stored
        //    (Users created via OAuth might not have a password)
        if (!user || !user.password) {
          console.error(
            "User not found or password not set for:",
            credentials.email
          );
          // You might want to throw a specific error here or return null
          // depending on how you want to handle this (e.g., show "Invalid credentials")
          return null;
        }

        // 4. Compare the provided password with the stored hash
        const passwordMatch = await bcrypt.compare(
          credentials.password as string,
          user.password // Assuming user.password is the stored hash
        );

        // 5. If passwords match, return the user object
        if (passwordMatch) {
          // Important: Don't return the password hash in the user object sent to the client/session
          const { password, ...userWithoutPassword } = user;
          return userWithoutPassword; // Return the user object (without password)
        } else {
          console.error("Password mismatch for:", credentials.email);
          // Passwords don't match
          return null;
        }
      },
    }),
  ],
  // Add session strategy if needed (JWT is default)
  session: {
    strategy: "jwt", // Or "database"
  },
  // Add callbacks if you need to customize session/token data
  callbacks: {
    // Example: Add user ID to the session
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub as string; // 'sub' usually holds the user ID
      }
      return session;
    },
    // Example: Include user ID in the JWT
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id; // Add user id to the token
      }
      return token;
    },
  },
  pages: {
    signIn: "/login",
    // Add other pages if needed (error, verifyRequest, etc.)
    // error: '/auth/error',
  },
  // Enable debug messages in development for more insight
  // debug: process.env.NODE_ENV === 'development',
});
