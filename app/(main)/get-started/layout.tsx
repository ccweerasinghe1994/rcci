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
    <div className="flex flex-col min-h-screen max-w-[1170px]  mx-auto xl:px-0 lg:px-2 md:px-4 sm:px-6 px-12" >
      <main className="flex-1">
        {/* Banner Section */}
        {/* <div className="max-w-[1170px]  mx-auto xl:px-0 lg:px-2 md:px-4 sm:px-6 px-12"></div> */}
        <HeroBanner type="get-started" />

        {/* Secondary Navigation */}
        <section className="border border-gray-200 py-4">
          <div className="container">
            <div className="flex gap-8">
              <Link 
                href="/get-started/start-business" 
                className={`${pathname === '/get-started/start-business' ? 'text-[#047bc1] font-bold underline' : 'text-[#047bc1] hover:underline'}`}
              >
                Start a business
              </Link>
              <Link 
                href="/get-started/about-rcci" 
                className={`${pathname === '/get-started/about-rcci' ? 'text-[#047bc1] font-bold underline' : 'text-[#047bc1] hover:underline'}`}
              >
                About RCCI
              </Link>
              <Link 
                href="/join" 
                className={`${pathname === '/join' ? 'text-[#047bc1] font-bold underline' : 'text-[#047bc1] hover:underline'}`}
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