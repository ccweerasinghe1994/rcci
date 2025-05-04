"use server";

import { Article, Author, Category, Image } from "@/lib/generated/prisma";
import { prisma } from "@/prisma";

export type ArticleWithAuthorAndCategory = Article & {
  author: Author | null;
  featuredImage: Image | null;
  category: Category;
};

// Define return type for the function
type GetNewsletterArticlesReturn = {
  articles: ArticleWithAuthorAndCategory[];
  error?: string | null;
};

// Get all newsletter articles
export async function getNewsletterArticles(): Promise<GetNewsletterArticlesReturn> {
  try {
    // First, find the Category with slug "newsletter"
    const newsletterCategory = await prisma.category.findUnique({
      where: {
        slug: "newsletter",
      },
    });

    if (!newsletterCategory) {
      return { articles: [], error: "Category not found" };
    }

    // Then query articles with that category ID
    const articles = await prisma.article.findMany({
      where: {
        status: "published",
        categoryId: newsletterCategory.id,
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

    return { articles, error: null };
  } catch (error) {
    console.error("Error fetching newsletter articles:", error);
    return { articles: [], error: "Failed to fetch articles" };
  }
}
