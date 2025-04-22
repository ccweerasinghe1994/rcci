import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Info } from "lucide-react"
import HeroBanner from "@/components/sections/HeroBanner"
import { SocialShare } from "@/components/shared/SocialShare"

export default function NewsMedia() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Banner Section */}
        <HeroBanner type="news-media" />

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
            {/* Social Sharing */}
            <SocialShare className="float-left mr-6" vertical={true} title="RCCI News & Media" />

            <div className="ml-16">
              <h2 className="text-2xl font-bold mb-8">RCCI Archive</h2>

              {/* Advanced Search */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="text-xl font-semibold">Advanced Search</h3>
                  <div className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center">
                    <Info size={12} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label htmlFor="start-date" className="block text-sm font-medium text-gray-700 mb-1">
                      Start Date
                    </label>
                    <input type="date" id="start-date" className="w-full border border-gray-300 rounded-md p-2" />
                  </div>
                  <div>
                    <label htmlFor="end-date" className="block text-sm font-medium text-gray-700 mb-1">
                      End Date
                    </label>
                    <input type="date" id="end-date" className="w-full border border-gray-300 rounded-md p-2" />
                  </div>
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                      Economic Sectors / Topic Categories
                    </label>
                    <select id="category" className="w-full border border-gray-300 rounded-md p-2">
                      <option>Select</option>
                      <option>Business</option>
                      <option>Economy</option>
                      <option>Tourism</option>
                    </select>
                  </div>
                </div>

                <div className="mb-4">
                  <input type="text" placeholder="Search..." className="w-full border border-gray-300 rounded-md p-2" />
                </div>

                <div className="flex gap-4">
                  <Button className="bg-[#1976D2]">Apply</Button>
                  <Button variant="outline">Reset</Button>
                </div>
              </div>

              {/* News Articles */}
              <div className="space-y-6">
                {/* Article 1 */}
                <div className="border-b border-gray-200 pb-6">
                  <Link href="/articles/a-daily-comment-in-france" className="block hover:underline">
                    <h3 className="text-xl font-bold mb-1">A daily comment in france</h3>
                  </Link>
                  <div className="text-gray-600 mb-1">John Doe</div>
                  <div className="text-gray-500 text-sm">March 24, 2025</div>
                </div>

                {/* Article 2 */}
                <div className="border-b border-gray-200 pb-6">
                  <Link href="/articles/les-avantages-du-teletravail" className="block hover:underline">
                    <h3 className="text-xl font-bold mb-1">Les avantages du télétravail dans le monde moderne</h3>
                  </Link>
                  <div className="text-gray-600 mb-1">Juswal</div>
                  <div className="text-gray-500 text-sm">March 19, 2025</div>
                </div>

                {/* Article 3 */}
                <div className="border-b border-gray-200 pb-6">
                  <Link href="/articles/lorem-ipsum-dolor" className="block hover:underline">
                    <h3 className="text-xl font-bold mb-1">Lorem Ipsum Dolor</h3>
                  </Link>
                  <div className="text-gray-600 mb-1">John Doe</div>
                  <div className="text-gray-500 text-sm">February 5, 2025</div>
                </div>

                {/* Article 4 */}
                <div className="border-b border-gray-200 pb-6">
                  <Link href="/articles/lorem-de-french" className="block hover:underline">
                    <h3 className="text-xl font-bold mb-1">Lorem de french</h3>
                  </Link>
                  <div className="text-gray-600 mb-1">John Doe</div>
                  <div className="text-gray-500 text-sm">February 5, 2025</div>
                </div>

                {/* Article 5 */}
                <div className="border-b border-gray-200 pb-6">
                  <Link href="/articles/news-ipsum-dolor-amet" className="block hover:underline">
                    <h3 className="text-xl font-bold mb-1">News Ipsum Dolor Amet Uno Dos Tres</h3>
                  </Link>
                  <div className="text-gray-600 mb-1">Juswal</div>
                  <div className="text-gray-500 text-sm">February 5, 2025</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
