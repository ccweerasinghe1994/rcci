import ArticleCard from "@/components/shared/ArticleCard";
import { SocialShare } from "@/components/shared/SocialShare";
import { getNewsletterArticles } from "./actions";

export default async function NewsletterPage() {
  const { articles, error } = await getNewsletterArticles();

  return (
    // Content Section
    <section className="py-8">
      <div className="container">
        {/* Social Sharing */}
        <SocialShare
          className="float-left mr-6"
          vertical={true}
          title="RCCI Newsletter"
        />

        <div className="ml-16">
          <h2 className="text-2xl font-bold mb-4">RCCI Newsletter</h2>

          <p className="text-gray-700 mb-8 max-w-3xl">
            Stay updated with our regular newsletters, featuring the latest
            developments in the Rodrigues business community, upcoming events,
            and important policy updates. Our newsletters provide comprehensive
            insights and information to help businesses in Rodrigues stay
            informed and connected.
          </p>

          {/* Articles Section */}
          <div className="mt-12">
            <h3 className="text-xl font-bold mb-6">Latest Newsletters</h3>

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
                No newsletter articles available at the moment. Check back soon
                for the latest newsletters from RCCI.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
