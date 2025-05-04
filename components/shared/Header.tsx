"use client";
import { Menu } from "lucide-react";
import Image from "next/image";
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
    <header className="w-full bg-white mt-10 xl:px-0 lg:px-2 md:px-4 sm:px-6">
        <div className="max-w-[1170px]  mx-auto flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href={"/"}>
            <Image className="aspect-auto" src={"/images/rccilogo.svg"} alt="RCCI Logo" width={494} height={100} />
            </Link>
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
                      className={`text-lg py-2 border-b border-gray-100 hover:border-b-primary ${isActive('/admin') ? 'text-primary font-medium border-b-primary' : 'text-gray-600 hover:text-primary transition-colors'}`}
                    >
                      Admin
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link 
                      href="/login" 
                      className={`text-lg py-2 border-b border-gray-100 hover:border-b-primary ${isActive('/login') ? 'text-primary font-medium border-b-primary' : 'text-gray-600 hover:text-primary transition-colors'}`}
                    >
                      Login
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link 
                      href="/help" 
                      className={`text-lg py-2 border-b border-gray-100 hover:border-b-primary ${isActive('/help') ? 'text-primary font-medium border-b-primary' : 'text-gray-600 hover:text-primary transition-colors'}`}
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
                        className={`block text-lg py-2 border-b border-gray-100 hover:border-b-primary ${isActive('/get-started') ? 'text-primary font-medium border-b-primary' : 'text-gray-600 hover:text-primary transition-colors'}`}
                      >
                        GET STARTED
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link 
                        href="/news-media" 
                        className={`block text-lg py-2 border-b border-gray-100 hover:border-b-primary ${isActive('/news-media') ? 'text-primary font-medium border-b-primary' : 'text-gray-600 hover:text-primary transition-colors'}`}
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
        <div className="max-w-[1170px] mt-8 mx-auto border-t border-gray-200">
          <div className="flex h-12">
            <nav className="flex">
              <Link
                href="/get-started"
                className={`flex items-center font-medium ${isActive('/get-started') 
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
