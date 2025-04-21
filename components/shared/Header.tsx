"use client";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger
} from "../ui/sheet";

export default function Header() {
  const pathname = usePathname();
  
  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href={"/"} className="bg-primary w-10 h-10 flex items-center justify-center text-white font-bold text-xl">RC</Link>
            <span className="text-xl font-semibold">Rodrigues re-imagined</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <Link 
              href="/admin" 
              className={`transition-colors ${isActive('/admin') ? 'text-primary font-medium' : 'text-gray-600 hover:text-primary'}`}
            >
              Admin
            </Link>
            <Link 
              href="/login" 
              className={`transition-colors ${isActive('/login') ? 'text-primary font-medium' : 'text-gray-600 hover:text-primary'}`}
            >
              Login
            </Link>
            <Link 
              href="/help" 
              className={`transition-colors ${isActive('/help') ? 'text-primary font-medium' : 'text-gray-600 hover:text-primary'}`}
            >
              Help
            </Link>
            <Link href="/join">
              <Button variant={isActive('/join') ? "default" : "outline"}>Join RCCI</Button>
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
                    <Link 
                      href="/admin" 
                      className={`text-lg py-2 border-b border-gray-100 ${isActive('/admin') ? 'text-primary font-medium' : 'text-gray-600'}`}
                    >
                      Admin
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link 
                      href="/login" 
                      className={`text-lg py-2 border-b border-gray-100 ${isActive('/login') ? 'text-primary font-medium' : 'text-gray-600'}`}
                    >
                      Login
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link 
                      href="/help" 
                      className={`text-lg py-2 border-b border-gray-100 ${isActive('/help') ? 'text-primary font-medium' : 'text-gray-600'}`}
                    >
                      Help
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href="/join" className="py-2">
                      <Button className={`w-full ${isActive('/join') ? '' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}>Join RCCI</Button>
                    </Link>
                  </SheetClose>
                  
                  <div className="mt-4 border-t border-gray-200 pt-4">
                    <SheetClose asChild>
                      <Link 
                        href="/get-started" 
                        className={`block text-lg py-2 border-b border-gray-100 ${isActive('/get-started') ? 'text-primary font-medium' : 'text-gray-600'}`}
                      >
                        GET STARTED
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link 
                        href="/news-media" 
                        className={`block text-lg py-2 border-b border-gray-100 ${isActive('/news-media') ? 'text-primary font-medium' : 'text-gray-600'}`}
                      >
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
                className={`flex items-center px-4 font-medium ${isActive('/get-started') 
                  ? 'text-primary border-b-2 border-primary' 
                  : 'text-gray-600 hover:text-primary'}`}
              >
                GET STARTED
              </Link>
              <Link 
                href="/news-media" 
                className={`flex items-center px-4 font-medium ${isActive('/news-media') 
                  ? 'text-primary border-b-2 border-primary' 
                  : 'text-gray-600 hover:text-primary'}`}
              >
                NEWS & MEDIA
              </Link>
            </nav>
          </div>
        </div>
      </header>
  );
}
