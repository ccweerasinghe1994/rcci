"use client"

import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function NewsMedia() {
  const pathname = usePathname()
  
  return (
    // Content Section
    <section className="py-12">
      <div className="container">
        <h2 className="text-3xl font-bold mb-12 text-center">News & Media Resources</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Newsletter Card */}
          <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="aspect-video relative">
              <Image 
                src="/images/rcci-news-letter.jpeg" 
                alt="RCCI Newsletter" 
                className="object-cover"
                fill
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-3">RCCI Newsletter</h3>
              <p className="text-gray-600 mb-4">
                Stay informed with our official newsletter featuring the latest updates, 
                announcements, and developments from the Rodrigues Chamber of Commerce and Industry.
              </p>
              <Link 
                href="/news-media/newsletter" 
                className="inline-flex items-center text-primary font-medium hover:underline"
              >
                Read newsletters <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
          
          {/* Daily Comment Card */}
          <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="aspect-video relative">
              <Image 
                src="/images/daily-comment.jpeg" 
                alt="Daily Comment" 
                className="object-cover"
                fill
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-3">Daily Comment</h3>
              <p className="text-gray-600 mb-4">
                Expert insights and commentary on current business trends, economic developments, 
                and policy changes that affect the business community in Rodrigues.
              </p>
              <Link 
                href="/news-media/daily-comment" 
                className="inline-flex items-center text-primary font-medium hover:underline"
              >
                Read comments <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
          
          {/* RCCI in the News Card */}
          <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="aspect-video relative">
              <Image 
                src="/images/rcci-in-the-news.jpeg" 
                alt="RCCI in the News" 
                className="object-cover"
                fill
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-3">RCCI in the News</h3>
              <p className="text-gray-600 mb-4">
                Coverage of RCCI activities, events, and initiatives in local and international media. 
                See how RCCI is making an impact and shaping the business landscape.
              </p>
              <Link 
                href="/news-media/news" 
                className="inline-flex items-center text-primary font-medium hover:underline"
              >
                View news <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
        
        {/* Why Follow RCCI News & Media */}
        <div className="mt-16 bg-gray-50 rounded-xl p-8">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-6 text-center">Why Follow RCCI News & Media?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Stay Informed</h4>
                  <p className="text-gray-600">Keep up with the latest business developments, policy changes, and economic trends in Rodrigues.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Expert Insights</h4>
                  <p className="text-gray-600">Gain valuable perspectives from industry experts and RCCI leaders on issues affecting your business.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Business Opportunities</h4>
                  <p className="text-gray-600">Discover new opportunities, partnerships, and initiatives that can help grow your business in Rodrigues.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Upcoming Events</h4>
                  <p className="text-gray-600">Be the first to know about upcoming RCCI events, workshops, and networking opportunities for your business.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
