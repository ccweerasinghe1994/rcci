import { Facebook, Linkedin, Mail } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#001a3a] text-white py-12">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-8 md:mb-0">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-white w-10 h-10 flex items-center justify-center text-[#001a3a] font-bold text-xl">
                RC
              </div>
              <span className="text-xl font-semibold">Rodrigues re-imagined</span>
            </div>
            <p className="max-w-md mb-6 text-[15px]">
              Small island, big visions! When the public sector looms large, we go bold. Entrepreneurs of Rodrigues -
              create, innovate, make waves... and join the Chamber!
            </p>
            <div className="flex gap-4">
              <Link href="#" className="bg-white rounded-full p-2 text-[#001a3a] hover:opacity-80 transition-opacity">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="bg-white rounded-full p-2 text-[#001a3a] hover:opacity-80 transition-opacity">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="#" className="bg-white rounded-full p-2 text-[#001a3a] hover:opacity-80 transition-opacity">
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
            <div>
              <h3 className="text-[16px] mb-4">Link</h3>
              <ul className="space-y-2 text-[15px]">
                <li>
                  <Link href="#" className="hover:underline">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/get-started" className="hover:underline">
                    Get Started
                  </Link>
                </li>
                <li>
                  <Link href="/news-media" className="hover:underline">
                    News & Media
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Join the RCCI
                  </Link>
                </li>
              </ul>
            </div>

            <div className="text-[15px]">
              <h3 className="text-[16px] mb-4">Contacts</h3>
              <address className="not-italic space-y-2">
                <p>Rodrigues Chamber of Commerce and Industry</p>
                <p>Mount Venus, English Bay R0514 Rodrigues,</p>
                <p>Mauritius, Indian Ocean</p>
                <p className="mt-4">+230 570 570 67, sec@rcci.mu</p>
                <p>Meetings currently on appointment only</p>
              </address>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t-[1px] border-white/60  text-[15px]">
          <p className="text-center">© 2025 Rodrigues Chamber of Commerce and Industry. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 