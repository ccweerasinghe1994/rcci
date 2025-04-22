import { getArticleBySlug, getArticles } from "@/app/admin/articles/actions"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { SocialShare } from "@/components/shared/SocialShare"

export async function generateStaticParams() {
  const { articles } = await getArticles()
  
  if (!articles) return []
  
  return articles.map((article) => ({
    slug: article.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { article } = await getArticleBySlug(params.slug)
  
  if (!article) {
    return {
      title: 'Article not found',
      description: 'The article you are looking for could not be found.'
    }
  }
  
  return {
    title: `${article.title} | RCCI News & Media`,
    description: article.excerpt || article.content.substring(0, 160).replace(/<[^>]+>/g, ""),
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { article, error } = await getArticleBySlug(slug)

  if (!article || error) {
    notFound()
  }

  // Get recent articles for the sidebar
  const { articles: allArticles } = await getArticles()
  const recentArticles = allArticles
    ?.filter((a) => a.id !== article.id && a.status === "published")
    .slice(0, 3) || []

  const formattedDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : ""
    
  // Prepare URL for sharing
  const fullUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://rcci.org'}/articles/${slug}`

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-[#0d3b66] text-white">
          <div className="container py-12 relative">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-2/3 space-y-4">
                <h1 className="text-3xl font-bold">News & Media</h1>
                <p className="max-w-xl">
                  Stay up to date with the latest news, announcements, and insights from the Rodrigues Chamber of Commerce
                  and Industry. Find press releases, articles, and updates about our activities and initiatives.
                </p>
                <div className="pt-4">
                  <Button variant="outline" className="border-white text-white hover:bg-white hover:text-[#0d3b66]">
                    Subscribe
                  </Button>
                </div>
              </div>
              <div className="hidden md:flex md:w-1/3 justify-end">
                <div className="relative w-64 h-64">
                  <Image
                    src="/images/news-icon.svg"
                    alt="News and Media"
                    width={200}
                    height={200}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Secondary Navigation */}
        <section className="border-b border-gray-200 py-4">
          <div className="container">
            <div className="flex gap-8">
              <Link href="#rcci-newsletter" className="text-primary hover:underline">
                RCCI Newsletter
              </Link>
              <Link href="#daily-comment" className="text-primary hover:underline">
                Daily Comment
              </Link>
              <Link href="#rcci-in-news" className="text-primary hover:underline">
                RCCI in the News
              </Link>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-8">
          <div className="container">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Main Content */}
              <div className="md:w-2/3">
                {/* Social Sharing */}
                <SocialShare 
                  className="float-left mr-6" 
                  vertical={true} 
                  title={article.title}
                  url={fullUrl}
                />

                {/* Article Title and Meta */}
                <div className="ml-16">
                  <h2 className="text-2xl font-bold mb-2">{article.title}</h2>
                  <div className="text-gray-500 mb-6">{formattedDate}</div>
                  {article.author && <div className="text-gray-700 mb-6">By {article.author.name}</div>}

                  {/* Featured Image */}
                  {article.featuredImage && (
                    <div className="relative aspect-video w-full mb-6 overflow-hidden rounded-lg">
                      <Image
                        src={article.featuredImage.path}
                        alt={article.title}
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                  )}

                  {/* Article Content */}
                  <div 
                    className="prose max-w-none article-content" 
                    dangerouslySetInnerHTML={{ __html: article.content }} 
                  />
                </div>
              </div>

              {/* Sidebar */}
              <div className="md:w-1/3">
                {/* Recent Articles */}
                <div className="border border-gray-200 rounded-md overflow-hidden mb-6">
                  <div className="bg-[#001a3a] text-white p-3 font-semibold">Recent Articles</div>
                  <div className="p-4">
                    <ul className="space-y-4">
                      {recentArticles.map((recentArticle) => (
                        <li key={recentArticle.id}>
                          <Link 
                            href={`/articles/${recentArticle.slug}`} 
                            className="group"
                          >
                            <div className="flex items-start gap-3">
                              <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                                {recentArticle.featuredImage ? (
                                  <Image
                                    src={recentArticle.featuredImage.path}
                                    alt={recentArticle.title}
                                    fill
                                    className="object-cover"
                                  />
                                ) : (
                                  <div className="bg-gray-100 h-full w-full flex items-center justify-center text-gray-400">
                                    <span className="text-xs">No image</span>
                                  </div>
                                )}
                              </div>
                              <div>
                                <h3 className="font-medium text-sm group-hover:text-primary group-hover:underline">
                                  {recentArticle.title}
                                </h3>
                                <p className="text-xs text-gray-500 mt-1">
                                  {recentArticle.publishedAt
                                    ? new Date(recentArticle.publishedAt).toLocaleDateString()
                                    : ""}
                                </p>
                              </div>
                            </div>
                          </Link>
                        </li>
                      ))}
                      {recentArticles.length === 0 && (
                        <li className="text-gray-500 text-sm text-center py-2">No recent articles</li>
                      )}
                    </ul>
                  </div>
                </div>

                {/* Categories */}
                <div className="border border-gray-200 rounded-md overflow-hidden mb-6">
                  <div className="bg-[#001a3a] text-white p-3 font-semibold">Categories</div>
                  <div className="p-4">
                    <ul className="space-y-1">
                      <li>
                        <Link href="/articles?category=news" className="text-primary hover:underline text-sm">
                          News
                        </Link>
                      </li>
                      <li>
                        <Link href="/articles?category=events" className="text-primary hover:underline text-sm">
                          Events
                        </Link>
                      </li>
                      <li>
                        <Link href="/articles?category=press" className="text-primary hover:underline text-sm">
                          Press Releases
                        </Link>
                      </li>
                      <li>
                        <Link href="/articles?category=blog" className="text-primary hover:underline text-sm">
                          Blog
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Subscribe Box */}
                <div className="border border-gray-200 rounded-md overflow-hidden bg-gray-50">
                  <div className="bg-[#001a3a] text-white p-3 font-semibold">Stay Updated</div>
                  <div className="p-4">
                    <p className="text-sm text-gray-600 mb-4">
                      Subscribe to our newsletter to receive the latest news and updates from RCCI.
                    </p>
                    <Button className="w-full">Subscribe</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
