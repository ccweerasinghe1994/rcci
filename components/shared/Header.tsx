"use client";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger
} from "../ui/sheet";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href={"/"} className="bg-primary w-10 h-10 flex items-center justify-center text-white font-bold text-xl">RC</Link>
            <span className="text-xl font-semibold">Rodrigues re-imagined</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/admin" className="text-primary">Admin</Link>
            <Link href="/login" className="text-primary">Login</Link>
            <Link href="/help" className="text-primary">Help</Link>
            <Link href="/join">
              <Button>Join RCCI</Button>
            </Link>
          </div>
          
          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-10 w-10 p-0">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent 
                side="right" 
                className="w-[80%] sm:w-[350px] p-6 data-[state=open]:duration-700 data-[state=closed]:duration-700"
              >
                <SheetTitle className="text-left text-lg font-bold">
                  Rodrigues re-imagined
                </SheetTitle>
                <nav className="flex flex-col gap-4 mt-8">
                  <SheetClose asChild>
                    <Link href="/admin" className="text-primary text-lg py-2 border-b border-gray-100">Admin</Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href="/login" className="text-primary text-lg py-2 border-b border-gray-100">Login</Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href="/help" className="text-primary text-lg py-2 border-b border-gray-100">Help</Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href="/join" className="py-2">
                      <Button className="w-full">Join RCCI</Button>
                    </Link>
                  </SheetClose>
                  
                  <div className="mt-4 border-t border-gray-200 pt-4">
                    <SheetClose asChild>
                      <Link href="/get-started" className="block text-lg py-2 border-b border-gray-100 font-medium text-primary">
                        GET STARTED
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link href="/news-media" className="block text-lg py-2 border-b border-gray-100 font-medium text-gray-600">
                        NEWS & MEDIA
                      </Link>
                    </SheetClose>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        
        {/* Navigation Tabs - visible only on desktop */}
        <div className="hidden md:block border-t border-gray-200">
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
