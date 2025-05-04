import ArticleCard from "@/components/shared/ArticleCard";
import { SocialShare } from "@/components/shared/SocialShare";
import { getNewsArticles } from "./actions";

export default async function RCCINewsPage() {
  const { articles, error } = await getNewsArticles();

  return (
    // Content Section
    <section className="py-8">
      <div className="container">
        {/* Social Sharing */}
        <SocialShare
          className="float-left mr-6"
          vertical={true}
          title="RCCI in the News"
        />

        <div className="ml-16">
          <h2 className="text-2xl font-bold mb-4">RCCI in the News</h2>

          <p className="text-gray-700 mb-8 max-w-3xl">
            Stay informed about the latest news and media coverage featuring the
            Rodrigues Chamber of Commerce and Industry. This section provides
            updates on how RCCI is making an impact in the business community
            and contributing to economic development in Rodrigues.
          </p>

          {/* Articles Section */}
          <div className="mt-12">
            <h3 className="text-xl font-bold mb-6">Latest News</h3>

            {error ? (
              <div className="text-red-500">{error}</div>
            ) : articles.length > 0 ? (
              <div className="space-y-6">
                {articles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            ) : (
              <div className="text-gray-500 p-4 bg-gray-50 rounded-lg">
                No news articles available at the moment. Check back soon for
                the latest news and media coverage about RCCI.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
