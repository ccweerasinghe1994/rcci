import ArticleCard from "@/components/shared/ArticleCard";
import { SocialShare } from "@/components/shared/SocialShare";
import { getAboutRCCIArticles } from "./actions";

export default async function AboutRCCI() {
  // Fetch aboutRCCI articles
  const { articles, error } = await getAboutRCCIArticles();

  return (
    // Content Section
    <section className="py-8">
      <div className="container">
        {/* Social Sharing */}
        <SocialShare
          className="float-left mr-6"
          vertical={true}
          title="About RCCI"
        />

        <div className="ml-16">
          <h2 className="text-2xl font-bold mb-4">
            About the Rodrigues Chamber of Commerce and Industry
          </h2>

          <p className="text-gray-700 mb-8 max-w-3xl">
            The Rodrigues Chamber of Commerce and Industry (RCCI) is dedicated
            to fostering a vibrant business community and sustainable economic
            growth in Rodrigues. As the voice of the private sector, we
            represent businesses of all sizes across various industries,
            advocating for policies that support business growth, facilitating
            training programs, and creating platforms for business networking
            and collaboration. Our mission is to promote and protect the
            interests of the business community while driving sustainable
            economic prosperity through innovation and responsible business
            practices.
          </p>

          {/* Articles Section */}
          <div className="mt-12">
            <h3 className="text-xl font-bold mb-6">Learn More About RCCI</h3>

            {error ? (
              <div className="text-red-500">Failed to load articles</div>
            ) : articles.length > 0 ? (
              <div className="space-y-6">
                {articles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            ) : (
              <div className="text-gray-500 p-4 bg-gray-50 rounded-lg">
                No articles available at the moment. Check back soon for more
                information about RCCI.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
