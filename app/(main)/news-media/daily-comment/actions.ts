"use server";

import { Article, Author, Category, Image } from "@/lib/generated/prisma";
import { prisma } from "@/prisma";

export type ArticleWithAuthorAndCategory = Article & {
  author: Author | null;
  featuredImage: Image | null;
  category: Category;
};

// Define return type for the function
type GetDailyCommentArticlesReturn = {
  articles: ArticleWithAuthorAndCategory[];
  error?: string | null;
};

// Get all daily comment articles
export async function getDailyCommentArticles(): Promise<GetDailyCommentArticlesReturn> {
  try {
    // First, find the Category with slug "daily-comment"
    const dailyCommentCategory = await prisma.category.findUnique({
      where: {
        slug: "daily-comment",
      },
    });

    if (!dailyCommentCategory) {
      return { articles: [], error: "Category not found" };
    }

    // Then query articles with that category ID
    const articles = await prisma.article.findMany({
      where: {
        status: "published",
        categoryId: dailyCommentCategory.id,
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
    console.error("Error fetching daily comment articles:", error);
    return { articles: [], error: "Failed to fetch articles" };
  }
}

// async function getDailyCommentArticles() {
//     try {
//       // Find the daily-comment category
//       const category = await prisma.category.findUnique({
//         where: {
//           slug: "daily-comment",
//         },
//       });

//       if (!category) {
//         return { articles: [], error: null };
//       }

//       // Get articles from the daily-comment category
//       const articles = await prisma.article.findMany({
//         where: {
//           categoryId: category.id,
//           status: "published",
//         },
//         orderBy: {
//           publishedAt: "desc",
//         },
//         include: {
//           featuredImage: true,
//           author: true,
//           category: true,
//         },
//       });

//       return { articles, error: null };
//     } catch (error) {
//       console.error("Error fetching daily comment articles:", error);
//       return { articles: [], error: "Failed to fetch articles" };
//     }
//   }
