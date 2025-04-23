import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/prisma";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import Link from "next/link";

// Function to limit words in a title
function limitWords(title: string, limit = 10): string {
  const words = title.split(' ');
  if (words.length <= limit) return title;
  return words.slice(0, limit).join(' ') + '...';
}

async function getDailyCommentArticles() {
  try {
    // Find the daily-comment category
    const category = await prisma.category.findUnique({
      where: {
        slug: "daily-comment"
      }
    });

    if (!category) {
      return [];
    }

    // Get articles from the daily-comment category
    const articles = await prisma.article.findMany({
      where: {
        categoryId: category.id,
        status: "published"
      },
      orderBy: {
        publishedAt: "desc"
      },
      include: {
        featuredImage: true,
        author: true,
        category: true
      }
    });

    return articles;
  } catch (error) {
    console.error("Error fetching daily comment articles:", error);
    return [];
  }
}

export default async function DailyCommentPage() {
  const articles = await getDailyCommentArticles();

  return (
    <div className="container py-8 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold">Daily Comment</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Daily insights and commentary from RCCI experts
        </p>
      </div>

      {articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <Card key={article.id} className="flex flex-col h-full">
              <CardHeader className="pb-3">
                <div className="text-sm text-muted-foreground mb-1">
                  {article.publishedAt 
                    ? formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })
                    : "Recently"
                  }
                </div>
                <CardTitle className="line-clamp-2" title={article.title}>
                  {limitWords(article.title)}
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-2 flex-grow">
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
                <p className="line-clamp-3 text-muted-foreground">
                  {article.excerpt || article.content.replace(/<[^>]+>/g, "").substring(0, 150) + "..."}
                </p>
              </CardContent>
              <CardFooter className="pt-2">
                <div className="flex items-center justify-between w-full">
                  <Link href={`/articles/${article.slug}`} className="text-primary hover:underline">
                    Read more
                  </Link>
                  {article.author && (
                    <div className="text-sm text-muted-foreground">
                      By {article.author.name}
                    </div>
                  )}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border rounded-lg bg-gray-50">
          <p className="text-muted-foreground mb-4">No daily comments found.</p>
          <p className="text-sm text-muted-foreground">
            Check back tomorrow for the latest commentary from our experts.
          </p>
        </div>
      )}
    </div>
  );
} 