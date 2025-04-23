"use client"

import HeroBanner from "@/components/sections/HeroBanner"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function GetStartedLayout({
  children,
}: {
  children: React.ReactNode
}) {
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

        {/* Children Content */}
        {children}
      </main>
    </div>
  )
} 