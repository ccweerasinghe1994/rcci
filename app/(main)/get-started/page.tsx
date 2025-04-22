import Link from "next/link"
import { Button } from "@/components/ui/button"
import HeroBanner from "@/components/sections/HeroBanner"
import { SocialShare } from "@/components/shared/SocialShare"

export default function GetStarted() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Banner Section */}
        <HeroBanner type="get-started" />

        {/* Secondary Navigation */}
        <section className="border-b border-gray-200 py-4">
          <div className="container">
            <div className="flex gap-8">
              <Link href="join" className="text-primary hover:underline">
                Join the RCCI
              </Link>
              <Link href="/start-business" className="text-primary hover:underline">
                Start a business
              </Link>
              <Link href="#about-rcci" className="text-primary hover:underline">
                About RCCI
              </Link>
            </div>
          </div>
        </section>


      </main>
    </div>
  )
}
