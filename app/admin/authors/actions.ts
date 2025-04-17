"use server";

import { prisma } from "@/prisma";
import { revalidatePath } from "next/cache";

export async function getAuthors() {
  try {
    const authors = await prisma.author.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return { authors };
  } catch (error) {
    console.error("Error fetching authors:", error);
    return { error: "Failed to fetch authors" };
  }
}

export async function addAuthor(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const position = formData.get("position") as string;
    const biography = formData.get("biography") as string;
    const authorImage = formData.get("authorImage") as string;

    if (!name || !position || !biography) {
      return { error: "Name, position, and biography are required" };
    }

    const author = await prisma.author.create({
      data: {
        name,
        position,
        biography,
        authorImage,
      },
    });

    revalidatePath("/admin/authors");
    return { success: true, author };
  } catch (error) {
    console.error("Error creating author:", error);
    return { error: "Failed to create author" };
  }
}

export async function updateAuthor(formData: FormData) {
  try {
    const id = formData.get("id") as string;
    const name = formData.get("name") as string;
    const position = formData.get("position") as string;
    const biography = formData.get("biography") as string;
    const authorImage = formData.get("authorImage") as string;

    if (!id || !name || !position || !biography) {
      return { error: "Author ID, name, position, and biography are required" };
    }

    const author = await prisma.author.update({
      where: { id },
      data: {
        name,
        position,
        biography,
        authorImage,
      },
    });

    revalidatePath("/admin/authors");
    return { success: true, author };
  } catch (error) {
    console.error("Error updating author:", error);
    return { error: "Failed to update author" };
  }
}

export async function deleteAuthor(formData: FormData) {
  try {
    const id = formData.get("id") as string;

    if (!id) {
      return { error: "Author ID is required" };
    }

    await prisma.author.delete({
      where: { id },
    });

    revalidatePath("/admin/authors");
    return { success: true };
  } catch (error) {
    console.error("Error deleting author:", error);
    return { error: "Failed to delete author" };
  }
}

export async function uploadAuthorImage(formData: FormData) {
  try {
    const file = formData.get("file") as File;

    if (!file) {
      return { error: "Image file is required" };
    }

    // Create unique filename
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create filename with extension
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 9)}.${fileExt}`;
    const filePath = `/uploads/authors/${fileName}`;

    // Save file to public directory
    const fs = require("fs");
    const path = require("path");

    // Ensure the directory exists
    const uploadDir = path.join(process.cwd(), "public", "uploads", "authors");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Write the file
    fs.writeFileSync(path.join(process.cwd(), "public", filePath), buffer);

    return { success: true, filePath };
  } catch (error) {
    console.error("Error uploading image:", error);
    return { error: "Failed to upload image" };
  }
}
