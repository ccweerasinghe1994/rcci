"use client"

import HeroBanner from "@/components/sections/HeroBanner"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function NewsMediaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Banner Section */}
        <HeroBanner type="news-media" />

        {/* Secondary Navigation */}
        <section className="border-b border-gray-200 py-4">
          <div className="container">
            <div className="flex gap-8">
              <Link 
                href="/news-media/newsletter" 
                className={`${pathname === '/news-media/newsletter' ? 'text-primary font-semibold underline' : 'text-primary hover:underline'}`}
              >
                RCCI Newsletter
              </Link>
              <Link 
                href="/news-media/daily-comment" 
                className={`${pathname === '/news-media/daily-comment' ? 'text-primary font-semibold underline' : 'text-primary hover:underline'}`}
              >
                Daily Comment
              </Link>
              <Link 
                href="/news-media/news" 
                className={`${pathname === '/news-media/news' ? 'text-primary font-semibold underline' : 'text-primary hover:underline'}`}
              >
                RCCI in the News
              </Link>
            </div>
          </div>
        </section>

        {/* Children Content */}
        {children}
      </main>
    </div>
  )
} 