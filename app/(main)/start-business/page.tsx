import Link from "next/link"
import { Button } from "@/components/ui/button"
import HeroBanner from "@/components/sections/HeroBanner"
import { SocialShare } from "@/components/shared/SocialShare"

export default function StartBusiness() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Banner Section - reuse the get-started banner */}
        <HeroBanner type="get-started" />

        {/* Secondary Navigation */}
        <section className="border-b border-gray-200 py-4">
          <div className="container">
            <div className="flex gap-8">
              <Link href="/get-started" className="text-primary hover:underline">
                Get Started
              </Link>
              <Link href="/join" className="text-primary hover:underline">
                Join the RCCI
              </Link>
              <Link href="#about-business" className="text-primary hover:underline">
                About Business
              </Link>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-8">
          <div className="container">
            {/* Social Sharing */}
            <SocialShare className="float-left mr-6" vertical={true} title="Start a Business in Rodrigues" />

            <div className="ml-16">
              <h2 className="text-2xl font-bold mb-8">Start a Business in Rodrigues</h2>

              {/* Business Registration */}
              <div className="mb-12 border border-gray-200 rounded-lg p-6" id="business-registration">
                <h3 className="text-xl font-bold mb-2">Business Registration Process</h3>
                <div className="prose max-w-none">
                  <p>
                    Starting a business in Rodrigues requires following these steps for proper registration:
                  </p>
                  <ol className="list-decimal pl-5 mt-4 space-y-2">
                    <li>Choose a business structure (sole proprietorship, partnership, corporation)</li>
                    <li>Register your business name with the Registrar of Companies</li>
                    <li>Obtain a Business Registration Number (BRN)</li>
                    <li>Register for tax purposes with the Mauritius Revenue Authority</li>
                    <li>Apply for any necessary permits or licenses specific to your industry</li>
                    <li>Register with the Social Security office if you'll have employees</li>
                  </ol>
                  <p className="mt-4">
                    The RCCI can provide guidance throughout this process and connect you with the right resources.
                  </p>
                </div>
              </div>

              {/* Business Planning */}
              <div className="mb-12 border border-gray-200 rounded-lg p-6" id="business-planning">
                <h3 className="text-xl font-bold mb-2">Business Planning Resources</h3>
                <div className="prose max-w-none">
                  <p>
                    A solid business plan is essential for any new venture. The RCCI offers resources to help you develop your business plan:
                  </p>
                  <ul className="list-disc pl-5 mt-4 space-y-2">
                    <li>Business plan templates and guides</li>
                    <li>Market research assistance</li>
                    <li>Financial planning tools</li>
                    <li>Mentorship opportunities with established business owners</li>
                    <li>Workshops and seminars on business planning</li>
                  </ul>
                  <p className="mt-4">
                    Contact the RCCI office to schedule a consultation with our business advisors.
                  </p>
                </div>
              </div>

              {/* Funding Options */}
              <div className="mb-12 border border-gray-200 rounded-lg p-6" id="funding-options">
                <h3 className="text-xl font-bold mb-2">Funding and Financial Support</h3>
                <div className="prose max-w-none">
                  <p>
                    Explore various funding options available to entrepreneurs in Rodrigues:
                  </p>
                  <ul className="list-disc pl-5 mt-4 space-y-2">
                    <li>Government grants and subsidies for small businesses</li>
                    <li>Small business loans from local banks and credit unions</li>
                    <li>Microfinance programs</li>
                    <li>Angel investors and venture capital options</li>
                    <li>Crowdfunding platforms</li>
                  </ul>
                  <p className="mt-4">
                    The RCCI can help connect you with financial institutions and inform you about available government support programs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
} 