"use client";
import Link from "next/link";
import { useState } from "react";
import { Button } from "../ui/button";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href={"/"} className="bg-primary w-10 h-10 flex items-center justify-center text-white font-bold text-xl">RC</Link>
            <span className="text-xl font-semibold">Rodrigues re-imagined</span>
          </div>
          <div className="flex items-center gap-4">
          <Link href="/admin" className="text-primary">Admin</Link>
          <Link href="/join">
            <Button>Join RCCI</Button>
          </Link>
          </div>
        </div>
        {/* Navigation Tabs */}
        <div className="border-t border-gray-200">
          <div className="container flex h-12">
            <nav className="flex">
              <Link
                href="/get-started"
                className="flex items-center px-4 font-medium text-primary border-b-2 border-primary"
              >
                GET STARTED
              </Link>
              <Link href="/news-media" className="flex items-center px-4 font-medium text-gray-600 hover:text-primary">
                NEWS & MEDIA
              </Link>
            </nav>
          </div>
        </div>
      </header>
  );
}
