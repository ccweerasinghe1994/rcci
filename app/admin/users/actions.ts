"use server";

import { prisma } from "@/prisma";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

// Input schema for getUsers function
const getUsersInputSchema = z.object({
  searchTerm: z.string().optional(),
  status: z.string().optional(),
  membershipType: z.string().optional(),
  page: z.number().default(1),
  limit: z.number().default(10),
});

export type GetUsersInput = z.infer<typeof getUsersInputSchema>;

export type UserWithStatus = {
  id: string;
  name: string | null;
  email: string;
  emailVerified: Date | null;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
  status: "Active" | "Inactive" | "Pending";
  membershipType: "Personal" | "Corporate";
};

export type UsersFilterParams = {
  searchTerm?: string;
  status?: string;
  membershipType?: string;
  page: number;
  limit: number;
};

export async function getUsers(page = 1, pageSize = 9) {
  const skip = (page - 1) * pageSize;

  try {
    const [users, totalCount] = await Promise.all([
      prisma.user.findMany({
        skip,
        take: pageSize,
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.user.count(),
    ]);

    const pageCount = Math.ceil(totalCount / pageSize);

    return { users, pageCount, currentPage: page };
  } catch (error) {
    console.error("Failed to fetch users:", error);
    throw new Error("Failed to fetch users");
  }
}

export async function deleteUser(id: string) {
  try {
    await prisma.user.delete({
      where: { id },
    });

    revalidatePath("/admin/users");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete user:", error);
    return { success: false, error: "Failed to delete user" };
  }
}

export async function updateUserStatus(userId: string, status: string) {
  // Validate input
  if (!userId) {
    throw new Error("User ID is required");
  }

  // Check if user exists
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  // Update user status
  //   await prisma.user.update({
  //     where: { id: userId },
  //     data: {  },
  //   });

  return { success: true };
}

export async function resetFilters(formData: FormData) {
  const search = formData.get("search")?.toString();

  if (search) {
    redirect(`/admin/users?search=${search}`);
  } else {
    redirect("/admin/users");
  }
}
