"use server";
import { hash } from "bcryptjs";
import { z } from "zod";

import { prisma } from "@/prisma";
import { emailSchema } from "@/validation/emailSchema";
import { passwordMatchSchema } from "@/validation/passwordMatch";

type RegisterData = {
  email: string;
  password: string;
  confirmPassword: string;
};

export const registeruser = async ({
  confirmPassword,
  email,
  password,
}: RegisterData) => {
  try {
    const newUserSchema = z
      .object({
        email: emailSchema,
      })
      .and(passwordMatchSchema);

    const newUserValidation = newUserSchema.safeParse({
      email,
      password,
      confirmPassword,
    });

    if (!newUserValidation.success) {
      return {
        error: true,
        message:
          newUserValidation.error.errors[0]?.message ?? "An error occurred",
      };
    }

    const hashedPassword = await hash(password, 10);

    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
  } catch (error) {
    // Check for Prisma's unique constraint violation error (P2002)
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === "P2002"
    ) {
      return {
        error: true,
        message:
          "Hey! This email is already taken. Please try a different one or log in if it's yours.",
      };
    }

    console.error("Registration error:", error);
    return {
      error: true,
      message: "An error occurred during registration. Please try again.",
    };
  }

  // If no errors, return success
  return {
    error: false,
    message: "Registration successful!",
  };
};
