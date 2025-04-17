"use server";

import { prisma } from "@/prisma";

export type DashboardData = {
  authors: {
    count: number;
    lastUpdated: Date | null;
  };
  banners: {
    count: number;
    lastUpdated: Date | null;
  };
  articles: {
    count: number;
    lastUpdated: Date | null;
  };
  users: {
    count: number;
    lastUpdated: Date | null;
  };
};

export async function getDashboardData(): Promise<DashboardData> {
  // Fetch authors data
  const authorsCount = await prisma.author.count();
  const latestAuthor = await prisma.author.findFirst({
    orderBy: { updatedAt: "desc" },
    select: { updatedAt: true },
  });

  // Fetch banners data
  const bannersCount = await prisma.banner.count();
  const latestBanner = await prisma.banner.findFirst({
    orderBy: { updatedAt: "desc" },
    select: { updatedAt: true },
  });

  // Fetch users data
  const usersCount = await prisma.user.count();
  const latestUser = await prisma.user.findFirst({
    orderBy: { updatedAt: "desc" },
    select: { updatedAt: true },
  });

  // For articles, since there's no Article model yet, we'll use placeholder data
  // You can replace this with actual database queries once you have an Articles model
  const articlesCount = 0;
  const latestArticle = null;

  return {
    authors: {
      count: authorsCount,
      lastUpdated: latestAuthor?.updatedAt || null,
    },
    banners: {
      count: bannersCount,
      lastUpdated: latestBanner?.updatedAt || null,
    },
    articles: {
      count: articlesCount,
      lastUpdated: latestArticle?.updatedAt || null,
    },
    users: {
      count: usersCount,
      lastUpdated: latestUser?.updatedAt || null,
    },
  };
}
