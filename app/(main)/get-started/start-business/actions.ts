"use server";

import { prisma } from "@/prisma";

// Get all getStarted articles
export async function getStartedArticles() {
  try {
    const articles = await prisma.article.findMany({
      where: {
        status: "published",
        category: "getStarted", // Fetch articles with category "getStarted"
      },
      orderBy: {
        publishedAt: "desc",
      },
      include: {
        author: true,
        featuredImage: true,
      },
    });
    return { articles };
  } catch (error) {
    console.error("Error fetching getStarted articles:", error);
    return { error: "Failed to fetch articles", articles: [] };
  }
}
