"use server";

import { Article, Author, Category, Image } from "@/lib/generated/prisma";
import { prisma } from "@/prisma";

export type ArticleWithAuthorAndCategory = Article & {
  author: Author | null;
  featuredImage: Image | null;
  category: Category;
};
// Define return type for the function
type GetStartedArticlesReturn = {
  articles: ArticleWithAuthorAndCategory[];
  error?: string;
};

// Get all getStarted articles
export async function getStartedArticles(): Promise<GetStartedArticlesReturn> {
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
