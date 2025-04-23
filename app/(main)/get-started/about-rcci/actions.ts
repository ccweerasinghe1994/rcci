"use server";

import { prisma } from "@/prisma";

// Get all aboutRCCI articles
export async function getAboutRCCIArticles() {
  try {
    const articles = await prisma.article.findMany({
      where: {
        status: "published",
        category: "aboutRCCI", // Fetch articles with category "aboutRCCI"
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
    console.error("Error fetching aboutRCCI articles:", error);
    return { error: "Failed to fetch articles", articles: [] };
  }
}
