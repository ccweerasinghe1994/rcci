import ArticleCard from "@/components/shared/ArticleCard";
import { SocialShare } from "@/components/shared/SocialShare";
import { getDailyCommentArticles } from "./actions";

export default async function DailyCommentPage() {
  const { articles, error } = await getDailyCommentArticles();

  return (
    // Content Section
    <section className="py-8">
      <div className="container">
        {/* Social Sharing */}
        <SocialShare
          className="float-left mr-6"
          vertical={true}
          title="Daily Comment - RCCI"
        />

        <div className="ml-16">
          <h2 className="text-2xl font-bold mb-4">Daily Comment</h2>

          <p className="text-gray-700 mb-8 max-w-3xl">
            Daily insights and commentary from RCCI experts on local business
            trends, economic developments, and policy changes affecting the
            Rodrigues business community. Our daily comments provide valuable
            perspectives to help you navigate the business landscape.
          </p>

          {/* Articles Section */}
          <div className="mt-12">
            <h3 className="text-xl font-bold mb-6">Latest Comments</h3>

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
                No daily comments available at the moment. Check back tomorrow
                for the latest commentary from our experts.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
