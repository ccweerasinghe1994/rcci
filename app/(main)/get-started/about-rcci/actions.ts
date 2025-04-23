"use server";

import { prisma } from "@/prisma";

// Get all aboutRCCI articles
export async function getAboutRCCIArticles() {
  try {
    // First, find the Category with slug "about-rcci"
    const aboutRCCICategory = await prisma.category.findUnique({
      where: {
        slug: "about-rcci",
      },
    });

    if (!aboutRCCICategory) {
      return { error: "Category not found", articles: [] };
    }

    // Then query articles with that category ID
    const articles = await prisma.article.findMany({
      where: {
        status: "published",
        categoryId: aboutRCCICategory.id,
      },
      orderBy: {
        publishedAt: "desc",
      },
      include: {
        author: true,
        featuredImage: true,
        category: true,
      },
    });

    return { articles };
  } catch (error) {
    console.error("Error fetching aboutRCCI articles:", error);
    return { error: "Failed to fetch articles", articles: [] };
  }
}
