import { z } from "zod";

export const emailSchema = z
  .string()
  .min(1, { message: "Email is required" })
  .email({ message: "Invalid email address format" })
  .trim()
  .toLowerCase();

// Can be imported as:
// import { emailSchema } from "@/validation/emailSchema";
