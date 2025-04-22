import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Facebook, Linkedin, Mail, LinkIcon } from "lucide-react"
import HeroBanner from "@/components/sections/HeroBanner"

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
              <Link href="#join-rcci" className="text-primary hover:underline">
                Join the RCCI
              </Link>
              <Link href="#start-business" className="text-primary hover:underline">
                Start a business
              </Link>
              <Link href="#about-rcci" className="text-primary hover:underline">
                About RCCI
              </Link>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-8">
          <div className="container">
            {/* Social Sharing */}
            <div className="flex flex-col gap-2 float-left mr-6">
              <Link href="#" className="w-8 h-8 rounded-full bg-[#3b5998] flex items-center justify-center text-white">
                <Facebook size={16} />
              </Link>
              <Link href="#" className="w-8 h-8 rounded-full bg-[#0077b5] flex items-center justify-center text-white">
                <Linkedin size={16} />
              </Link>
              <Link href="#" className="w-8 h-8 rounded-full bg-[#d14836] flex items-center justify-center text-white">
                <Mail size={16} />
              </Link>
              <Link
                href="#"
                className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700"
              >
                <LinkIcon size={16} />
              </Link>
            </div>

            <div className="ml-16">
              <h2 className="text-2xl font-bold mb-8">Get Started</h2>

              {/* RCCI Members' Code of Conduct */}
              <div className="mb-12 border border-gray-200 rounded-lg p-6">
                <Link href="/articles/rcci-members-code-of-conduct" className="block hover:underline">
                  <h3 className="text-xl font-bold mb-2">RCCI Members' Code of Conduct</h3>
                </Link>
                <div className="mb-1">John Doe</div>
                <div className="text-gray-500 text-sm mb-4">March 3, 2025</div>
                <div className="prose max-w-none">
                  <p>
                    The RCCI Members' Code of Conduct establishes guidelines for professional behavior and ethical
                    practices for all members.
                  </p>
                </div>
              </div>

              {/* Start a business */}
              <div className="mb-12 border border-gray-200 rounded-lg p-6" id="start-business">
                <h3 className="text-xl font-bold mb-2">Start a business</h3>
                <div className="mb-1">John Doe</div>
                <div className="text-gray-500 text-sm mb-4">March 3, 2025</div>
                <div className="prose max-w-none">
                  <p>
                    Learn about the necessary steps, documentation, and resources needed to establish a new business in
                    Rodrigues.
                  </p>
                </div>
              </div>

              {/* Why You Should Join the RCCI */}
              <div className="mb-12 border border-gray-200 rounded-lg p-6" id="join-rcci">
                <h3 className="text-xl font-bold mb-2">Why You Should Join the RCCI</h3>
                <div className="mb-1">John Doe</div>
                <div className="text-gray-500 text-sm mb-4">March 3, 2025</div>
                <div className="prose max-w-none">
                  <p>
                    Discover the benefits of becoming an RCCI member, including networking opportunities, advocacy, and
                    business resources.
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
