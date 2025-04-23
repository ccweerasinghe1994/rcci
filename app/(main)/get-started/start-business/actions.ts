"use server";

import { prisma } from "@/prisma";

// Get all getStarted articles
export async function getStartedArticles() {
  try {
    // First, find the Category with slug "get-started"
    const getStartedCategory = await prisma.category.findUnique({
      where: {
        slug: "getstarted",
      },
    });

    if (!getStartedCategory) {
      return { error: "Category not found", articles: [] };
    }

    // Then query articles with that category ID
    const articles = await prisma.article.findMany({
      where: {
        status: "published",
        categoryId: getStartedCategory.id,
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
    console.error("Error fetching getStarted articles:", error);
    return { error: "Failed to fetch articles", articles: [] };
  }
}
