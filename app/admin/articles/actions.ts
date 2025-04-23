"use server";

import { prisma } from "@/prisma";
import fs from "fs";
import { revalidatePath } from "next/cache";
import path from "path";

// Get all articles
export async function getArticles() {
  try {
    const articles = await prisma.article.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: true,
        featuredImage: true,
      },
    });
    return { articles };
  } catch (error) {
    console.error("Error fetching articles:", error);
    return { error: "Failed to fetch articles" };
  }
}

// Get a single article by ID
export async function getArticleById(id: string) {
  try {
    const article = await prisma.article.findUnique({
      where: { id },
      include: {
        author: true,
        featuredImage: true,
      },
    });

    if (!article) {
      return { error: "Article not found" };
    }

    return { article };
  } catch (error) {
    console.error("Error fetching article:", error);
    return { error: "Failed to fetch article" };
  }
}

// Get a single article by slug
export async function getArticleBySlug(slug: string) {
  try {
    const article = await prisma.article.findUnique({
      where: { slug },
      include: {
        author: true,
        featuredImage: true,
      },
    });

    if (!article) {
      return { error: "Article not found" };
    }

    return { article };
  } catch (error) {
    console.error("Error fetching article:", error);
    return { error: "Failed to fetch article" };
  }
}

// Create a new article
export async function createArticle(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const excerpt = formData.get("excerpt") as string;
    const content = formData.get("content") as string;
    const authorId = formData.get("authorId") as string;
    const categoryId = formData.get("categoryId") as string;
    const status = formData.get("status") as string;
    const file = formData.get("featuredImage") as File;

    if (!title || !slug || !content || !categoryId || !status) {
      return { error: "Required fields are missing" };
    }

    let imageId = null;

    // Handle featured image upload if provided
    if (file && file.size > 0) {
      const imageResult = await uploadFeaturedImage(file);
      if (imageResult.error) {
        return { error: imageResult.error };
      }
      imageId = imageResult.imageId;
    }

    // Create the article
    const article = await prisma.article.create({
      data: {
        title,
        slug,
        excerpt,
        content,
        categoryId,
        status,
        publishedAt: status === "published" ? new Date() : null,
        authorId: authorId === "none" ? null : authorId || null,
        imageId: imageId || null,
      },
      include: {
        author: true,
        featuredImage: true,
        category: true,
      },
    });

    revalidatePath("/admin/articles");
    return { success: true, article };
  } catch (error) {
    console.error("Error creating article:", error);
    return { error: "Failed to create article" };
  }
}

// Update an existing article
export async function updateArticle(formData: FormData) {
  try {
    const id = formData.get("id") as string;
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const excerpt = formData.get("excerpt") as string;
    const content = formData.get("content") as string;
    const authorId = formData.get("authorId") as string;
    const categoryId = formData.get("categoryId") as string;
    const status = formData.get("status") as string;
    const file = formData.get("featuredImage") as File;
    const currentImageId = formData.get("currentImageId") as string;

    if (!id || !title || !slug || !content || !categoryId || !status) {
      return { error: "Required fields are missing" };
    }

    let imageId: string | null = currentImageId || null;

    // Handle featured image upload if a new one is provided
    if (file && file.size > 0) {
      const imageResult = await uploadFeaturedImage(file);
      if (imageResult.error) {
        return { error: imageResult.error };
      }
      if (imageResult.imageId) {
        imageId = imageResult.imageId;
      }
    }

    // Update the article
    const article = await prisma.article.update({
      where: { id },
      data: {
        title,
        slug,
        excerpt,
        content,
        categoryId,
        status,
        publishedAt: status === "published" ? new Date() : null,
        authorId: authorId === "none" ? null : authorId || null,
        imageId: imageId || null,
      },
      include: {
        author: true,
        featuredImage: true,
        category: true,
      },
    });

    revalidatePath("/admin/articles");
    revalidatePath(`/articles/${slug}`);
    return { success: true, article };
  } catch (error) {
    console.error("Error updating article:", error);
    return { error: "Failed to update article" };
  }
}

// Delete an article
export async function deleteArticle(formData: FormData) {
  try {
    const id = formData.get("id") as string;

    if (!id) {
      return { error: "Article ID is required" };
    }

    // Get the article first to check if it has an image
    const article = await prisma.article.findUnique({
      where: { id },
      include: {
        featuredImage: true,
      },
    });

    if (!article) {
      return { error: "Article not found" };
    }

    // Delete the article
    await prisma.article.delete({
      where: { id },
    });

    revalidatePath("/admin/articles");
    return { success: true };
  } catch (error) {
    console.error("Error deleting article:", error);
    return { error: "Failed to delete article" };
  }
}

// Upload a featured image
async function uploadFeaturedImage(file: File) {
  try {
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
    const filePath = `/uploads/articles/${fileName}`;

    // Save file to public directory
    const uploadDir = path.join(process.cwd(), "public", "uploads", "articles");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    fs.writeFileSync(path.join(process.cwd(), "public", filePath), buffer);

    // Create image record in database
    const image = await prisma.image.create({
      data: {
        fileName,
        fileSize: file.size,
        mimeType: file.type,
        path: filePath,
        alt: file.name,
      },
    });

    return { success: true, imageId: image.id, filePath };
  } catch (error) {
    console.error("Error uploading image:", error);
    return { error: "Failed to upload image" };
  }
}

// Get all categories
export async function getCategories() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        name: "asc",
      },
    });
    return { categories };
  } catch (error) {
    console.error("Error fetching categories:", error);
    return { error: "Failed to fetch categories" };
  }
}
