import bcrypt from "bcrypt";
import { prisma } from "../db";

/**
 * Get user by email
 */
export async function getUserByEmail(email: string) {
  try {
    return await prisma.user.findUnique({
      where: { email },
    });
  } catch (error) {
    console.error("Error fetching user by email:", error);
    return null;
  }
}

/**
 * Get user by ID
 */
export async function getUserById(id: string) {
  try {
    return await prisma.user.findUnique({
      where: { id },
    });
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    return null;
  }
}

/**
 * Create new user
 */
export async function createUser({
  email,
  password,
  name,
}: {
  email: string;
  password: string;
  name?: string;
}) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    return await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return null;
  }
}

/**
 * Verify user password
 */
export async function verifyPassword(password: string, hashedPassword: string) {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    console.error("Error verifying password:", error);
    return false;
  }
}
