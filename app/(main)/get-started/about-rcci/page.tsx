import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import HeroBanner from "@/components/sections/HeroBanner"
import { SocialShare } from "@/components/shared/SocialShare"

export default function AboutRCCI() {
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
              <Link href="/get-started/start-business" className="text-primary hover:underline">
                Start a Business
              </Link>
              <Link href="/join" className="text-primary hover:underline">
                Join the RCCI
              </Link>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-8">
          <div className="container">
            {/* Social Sharing */}
            <SocialShare className="float-left mr-6" vertical={true} title="About RCCI" />

            <div className="ml-16">
              <h2 className="text-2xl font-bold mb-8">About the Rodrigues Chamber of Commerce and Industry</h2>

              {/* Mission & Vision */}
              <div className="mb-12 border border-gray-200 rounded-lg p-6" id="mission-vision">
                <h3 className="text-xl font-bold mb-2">Our Mission & Vision</h3>
                <div className="prose max-w-none">
                  <p>
                    The Rodrigues Chamber of Commerce and Industry (RCCI) is dedicated to fostering a vibrant business 
                    community and sustainable economic growth in Rodrigues. We serve as the voice of the private sector, 
                    representing businesses of all sizes across various industries.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div className="bg-blue-50 p-4 rounded-md">
                      <h4 className="font-semibold mb-2">Our Mission</h4>
                      <p>
                        To promote and protect the interests of the business community in Rodrigues by providing advocacy, 
                        networking opportunities, and resources that enhance business growth and contribute to the island's 
                        economic development.
                      </p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-md">
                      <h4 className="font-semibold mb-2">Our Vision</h4>
                      <p>
                        To be the leading organization that drives sustainable economic prosperity in Rodrigues through 
                        innovation, collaboration, and responsible business practices.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* History */}
              <div className="mb-12 border border-gray-200 rounded-lg p-6" id="history">
                <h3 className="text-xl font-bold mb-2">Our History</h3>
                <div className="prose max-w-none">
                  <p>
                    Founded in 1996, the RCCI has played a pivotal role in the economic development of Rodrigues for 
                    more than 25 years. What began as a small association of local businesses has grown into a 
                    comprehensive chamber representing hundreds of businesses across the island.
                  </p>
                  <p className="mt-4">
                    Throughout our history, we have advocated for policies that support business growth, facilitated 
                    training and development programs, and created platforms for business networking and collaboration. 
                    Our organization has been instrumental in helping Rodrigues businesses adapt to changing economic 
                    landscapes and embrace new opportunities.
                  </p>
                </div>
              </div>

              {/* Leadership & Structure */}
              <div className="mb-12 border border-gray-200 rounded-lg p-6" id="leadership">
                <h3 className="text-xl font-bold mb-2">Leadership & Structure</h3>
                <div className="prose max-w-none">
                  <p>
                    The RCCI is led by a Board of Directors elected by our members. Our board represents diverse sectors 
                    of the economy and brings a wealth of business experience to guide our organization.
                  </p>
                  <div className="mt-6">
                    <h4 className="font-semibold mb-3">Our Leadership Team:</h4>
                    <ul className="list-disc pl-5 space-y-2">
                      <li><strong>Mr. Sajith Wijenayake</strong> - President</li>
                      <li><strong>Mr. P. M. Abeysekara</strong> - Vice President</li>
                      <li><strong>Mr. Shaameel Mohideen</strong> - Vice President</li>
                      <li><strong>Mr. Mahen Kariyawasan</strong> - Immediate Past President</li>
                    </ul>
                  </div>
                  <p className="mt-4">
                    Our operations are organized into several committees focusing on key areas such as Trade & 
                    Investment, Tourism, Agriculture, Education & Training, and Sustainability.
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