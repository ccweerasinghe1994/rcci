import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { prisma } from "@/prisma"
import { formatDistanceToNow } from "date-fns"
import Image from "next/image"
import Link from "next/link"

// Helper function to limit words in a title
function limitWords(title: string, limit = 5): string {
  const words = title.split(' ')
  if (words.length <= limit) return title
  return words.slice(0, limit).join(' ') + '...'
}

async function getLatestArticles(limit = 3) {
  try {
    // Find the categories for news and events
    const newsAndEventCategories = await prisma.category.findMany({
      where: {
        slug: { in: ["news", "events"] }
      },
      select: { id: true }
    });
    
    // Extract the category ids
    const categoryIds = newsAndEventCategories.map(cat => cat.id);
    
    // If no matching categories found, return empty array
    if (categoryIds.length === 0) {
      return [];
    }
    
    const articles = await prisma.article.findMany({
      where: {
        status: "published",
        categoryId: {
          in: categoryIds,
        },
      },
      orderBy: {
        publishedAt: "desc",
      },
      include: {
        featuredImage: true,
        category: true,
      },
      take: limit,
    })
    return articles
  } catch (error) {
    console.error("Error fetching latest articles:", error)
    return []
  }
}

export async function NewsSection() {
  const latestArticles = await getLatestArticles()

  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Latest RCCI News & Events</h2>
          <Link href="/news-media" className="text-primary hover:underline mt-4 md:mt-0">
            View all news
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {latestArticles?.length > 0 ? (
            latestArticles.map((article) => (
              <Card key={article.id}>
                <CardHeader>
                  <CardTitle title={article.title}>{limitWords(article.title)}</CardTitle>
                  <CardDescription>
                    {article.publishedAt
                      ? formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })
                      : ""}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {article.featuredImage && (
                    <div className="aspect-video relative mb-4 overflow-hidden rounded-lg">
                      <Image
                        src={article.featuredImage.path}
                        alt={article.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  {!article.featuredImage && (
                    <div className="aspect-video relative mb-4 overflow-hidden rounded-lg bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400">No image</span>
                    </div>
                  )}
                  <p className="line-clamp-3">
                    {article.excerpt || article.content.replace(/<[^>]+>/g, "").substring(0, 150) + "..."}
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href={`/articles/${article.slug}`} className="text-primary hover:underline">
                    Read more
                  </Link>
                </CardFooter>
              </Card>
            ))
          ) : (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>No articles found</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>There are no published articles to display at this time.</p>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
