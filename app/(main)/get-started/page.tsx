"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import HeroBanner from "@/components/sections/HeroBanner"
import { SocialShare } from "@/components/shared/SocialShare"
import Image from "next/image"
import { usePathname } from "next/navigation"

export default function GetStarted() {
  const pathname = usePathname()
  
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Banner Section */}
        <HeroBanner type="get-started" />

        {/* Secondary Navigation */}
        <section className="border-b border-gray-200 py-4">
          <div className="container">
            <div className="flex gap-8">
              <Link 
                href="/get-started/start-business" 
                className={`${pathname === '/get-started/start-business' ? 'text-primary font-semibold underline' : 'text-primary hover:underline'}`}
              >
                Start a business
              </Link>
              <Link 
                href="/get-started/about-rcci" 
                className={`${pathname === '/get-started/about-rcci' ? 'text-primary font-semibold underline' : 'text-primary hover:underline'}`}
              >
                About RCCI
              </Link>
              <Link 
                href="/join" 
                className={`${pathname === '/join' ? 'text-primary font-semibold underline' : 'text-primary hover:underline'}`}
              >
                Join the RCCI
              </Link>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12">
          <div className="container">
            <h2 className="text-3xl font-bold mb-12 text-center">How Can We Help You?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Start a Business Card */}
              <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="aspect-video relative">
                  <Image 
                    src="/images/start-a-business.jpeg" 
                    alt="Starting a business" 
                    className="object-cover"
                    fill
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">Start a Business</h3>
                  <p className="text-gray-600 mb-4">
                    Learn about the necessary steps, documentation, and resources needed to establish 
                    a new business in Rodrigues. Get guidance on registration, planning, and funding options.
                  </p>
                  <Link 
                    href="/get-started/start-business" 
                    className="inline-flex items-center text-primary font-medium hover:underline"
                  >
                    Learn more <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
              
              {/* About RCCI Card */}
              <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="aspect-video relative">
                  <Image 
                    src="/images/about-rcci.jpeg" 
                    alt="About RCCI" 
                    className="object-cover"
                    fill
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">About RCCI</h3>
                  <p className="text-gray-600 mb-4">
                    Discover the mission, vision, and history of the Rodrigues Chamber of Commerce 
                    and Industry. Learn about our leadership and organizational structure.
                  </p>
                  <Link 
                    href="/get-started/about-rcci" 
                    className="inline-flex items-center text-primary font-medium hover:underline"
                  >
                    Learn more <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
              
              {/* Join RCCI Card */}
              <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="aspect-video relative">
                  <Image 
                    src="/images/join-the-rcci.jpeg" 
                    alt="Join RCCI" 
                    className="object-cover"
                    fill
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">Join the RCCI</h3>
                  <p className="text-gray-600 mb-4">
                    Explore the benefits of becoming an RCCI member, including networking opportunities, 
                    advocacy support, access to resources, and exclusive business events.
                  </p>
                  <Link 
                    href="/join" 
                    className="inline-flex items-center text-primary font-medium hover:underline"
                  >
                    Learn more <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Why Get Started with RCCI */}
            <div className="mt-16 bg-gray-50 rounded-xl p-8">
              <div className="max-w-3xl mx-auto">
                <h3 className="text-2xl font-bold mb-6 text-center">Why Get Started with RCCI?</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Local Expertise</h4>
                      <p className="text-gray-600">Access to professionals who understand Rodrigues' unique business environment and regulations.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Networking</h4>
                      <p className="text-gray-600">Connect with established business owners, potential partners, and mentors who can guide your journey.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Resources</h4>
                      <p className="text-gray-600">Access to business plans, market research, training workshops, and other tools essential for business success.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Faster Growth</h4>
                      <p className="text-gray-600">Benefit from the RCCI's experience to avoid common pitfalls and accelerate your business development.</p>
                    </div>
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
