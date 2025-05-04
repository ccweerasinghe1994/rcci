import { getArticleBySlug, getArticles } from "@/app/admin/articles/actions";
import HeroBanner from "@/components/sections/HeroBanner";
import AuthorList from "@/components/shared/AuthorList";
import { SocialShare } from "@/components/shared/SocialShare";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  const { articles } = await getArticles();

  if (!articles) return [];

  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const { article } = await getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Article not found",
      description: "The article you are looking for could not be found.",
    };
  }

  return {
    title: `${article.title} | RCCI News & Media`,
    description:
      article.excerpt ||
      article.content.substring(0, 160).replace(/<[^>]+>/g, ""),
  };
}

export default async function ArticlePage({ params }: { params: Params }) {
  const { slug } = await params;
  const { article, error } = await getArticleBySlug(slug);

  if (!article || error) {
    notFound();
  }

  // Get recent articles for the sidebar
  const { articles: allArticles } = await getArticles();
  const recentArticles =
    allArticles
      ?.filter((a) => a.id !== article.id && a.status === "published")
      .slice(0, 3) || [];

  const formattedDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  // Prepare URL for sharing
  const fullUrl = `${
    process.env.NEXT_PUBLIC_SITE_URL || "https://rcci.org"
  }/articles/${slug}`;

  return (
    <div className="flex flex-col min-h-screen max-w-[1170px]  mx-auto xl:px-0 lg:px-2 md:px-4 sm:px-6 px-12">
      <main className="flex-1">
        {/* Hero Section */}
        <HeroBanner type="get-started" />

        {/* Secondary Navigation */}
        <section className="border-b border-gray-200 py-4">
          <div className="container">
            <div className="flex gap-8">
              <Link
                href="#rcci-newsletter"
                className="text-primary hover:underline"
              >
                RCCI Newsletter
              </Link>
              <Link
                href="#daily-comment"
                className="text-primary hover:underline"
              >
                Daily Comment
              </Link>
              <Link
                href="#rcci-in-news"
                className="text-primary hover:underline"
              >
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
                  {article.author && (
                    <div className="text-gray-700 mb-6">
                      By {article.author.name}
                    </div>
                  )}

                  <div className="border-t-2 border-[#68b0da] w-full my-6" />

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

                  {/* Author Information */}
                  {article.author && <AuthorList authors={[article.author]} />}
                </div>
              </div>

              {/* Sidebar */}
              <div className="md:w-1/3 space-y-6">
                {/* Recent Articles */}
                <div className="border border-t-7 border-[#002b49] rounded-sm overflow-hidden">
                  <div className="text-primary p-3 font-semibold text-2xl">
                    Recent Articles
                  </div>
                  <div className="p-4">
                    <ul className="space-y-4">
                      {recentArticles.map((recentArticle) => (
                        <li key={recentArticle.id}>
                          <Link
                            href={`/articles/${recentArticle.slug}`}
                            className="group"
                          >
                            <h3 className="font-[400] text-sm group-hover:text-primary group-hover:underline text-[#047bc1] underline">
                              {recentArticle.title}
                            </h3>
                          </Link>
                        </li>
                      ))}
                      {recentArticles.length === 0 && (
                        <li className="text-gray-500 text-sm text-center py-2">
                          No recent articles
                        </li>
                      )}
                    </ul>
                  </div>
                </div>

                {/* Categories */}
                {/* <div className="border border-gray-200 rounded-md overflow-hidden mb-6">
                  <div className="bg-[#001a3a] text-white p-3 font-semibold">
                    Categories
                  </div>
                  <div className="p-4">
                    <ul className="space-y-1">
                      <li>
                        <Link
                          href="/articles?category=news"
                          className="text-primary hover:underline text-sm"
                        >
                          News
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/articles?category=events"
                          className="text-primary hover:underline text-sm"
                        >
                          Events
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/articles?category=press"
                          className="text-primary hover:underline text-sm"
                        >
                          Press Releases
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/articles?category=blog"
                          className="text-primary hover:underline text-sm"
                        >
                          Blog
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div> */}

                <div className="border border-t-7 border-[#002b49] rounded-md overflow-hidden bg-gray-50">
                  <div className="flex items-center justify-between w-[300px]">
                    <div className="text-primary p-3 font-semibold text-2xl">
                      Advanced Search
                    </div>
                    <Image
                      src="/images/searchImage.webp"
                      alt="RCCI News"
                      width={48}
                      height={48}
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-gray-600 mb-4">
                      Subscribe to our newsletter to receive the latest news and
                      updates from RCCI.
                    </p>
                    <Button className="w-full bg-[#047bc1] rounded-sm">
                      Subscribe
                    </Button>
                  </div>
                </div>

                {/* Subscribe Box */}
                <div className="border border-t-7 border-[#002b49] rounded-md overflow-hidden bg-gray-50">
                  <div className="flex items-center justify-between w-[300px]">
                    <div className="text-primary p-3 font-semibold text-2xl">
                      RCCI News
                    </div>
                    <Image
                      src="/images/emailImage.webp"
                      alt="RCCI News"
                      width={48}
                      height={48}
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-gray-600 mb-4">
                      Subscribe to our newsletter to receive the latest news and
                      updates from RCCI.
                    </p>
                    <Button className="w-full bg-[#047bc1] rounded-sm">
                      Subscribe
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
