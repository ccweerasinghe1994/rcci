"use server";

import { prisma } from "@/prisma";
import { revalidatePath } from "next/cache";

// Get all categories
export async function getCategories() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        name: "asc",
      },
      include: {
        _count: {
          select: { articles: true },
        },
      },
    });
    return { categories };
  } catch (error) {
    console.error("Error fetching categories:", error);
    return { error: "Failed to fetch categories" };
  }
}

// Create a new category
export async function createCategory(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const slug = formData.get("slug") as string;
    const description = formData.get("description") as string;

    if (!name || !slug) {
      return { error: "Name and slug are required" };
    }

    // Check if category with same name or slug already exists
    const existingCategory = await prisma.category.findFirst({
      where: {
        OR: [{ name }, { slug }],
      },
    });

    if (existingCategory) {
      return { error: "A category with this name or slug already exists" };
    }

    const category = await prisma.category.create({
      data: {
        name,
        slug,
        description,
      },
    });

    revalidatePath("/admin/categories");
    return { success: true, category };
  } catch (error) {
    console.error("Error creating category:", error);
    return { error: "Failed to create category" };
  }
}

// Update a category
export async function updateCategory(formData: FormData) {
  try {
    const id = formData.get("id") as string;
    const name = formData.get("name") as string;
    const slug = formData.get("slug") as string;
    const description = formData.get("description") as string;

    if (!id || !name || !slug) {
      return { error: "ID, name, and slug are required" };
    }

    // Check if another category with same name or slug already exists
    const existingCategory = await prisma.category.findFirst({
      where: {
        OR: [{ name }, { slug }],
        NOT: {
          id,
        },
      },
    });

    if (existingCategory) {
      return {
        error: "Another category with this name or slug already exists",
      };
    }

    const category = await prisma.category.update({
      where: { id },
      data: {
        name,
        slug,
        description,
      },
    });

    revalidatePath("/admin/categories");
    return { success: true, category };
  } catch (error) {
    console.error("Error updating category:", error);
    return { error: "Failed to update category" };
  }
}

// Delete a category
export async function deleteCategory(formData: FormData) {
  try {
    const id = formData.get("id") as string;

    if (!id) {
      return { error: "Category ID is required" };
    }

    // Check if category is in use
    const articlesCount = await prisma.article.count({
      where: { categoryId: id },
    });

    if (articlesCount > 0) {
      return { error: "Cannot delete category that is used by articles" };
    }

    await prisma.category.delete({
      where: { id },
    });

    revalidatePath("/admin/categories");
    return { success: true };
  } catch (error) {
    console.error("Error deleting category:", error);
    return { error: "Failed to delete category" };
  }
}
