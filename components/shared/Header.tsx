"use client";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-purple-700 to-violet-800 text-white shadow-md mx-auto max-w-screen-lg my-4 rounded-lg">
      <div className="flex justify-between items-center p-4">
        <Link href="/" className="font-bold text-xl tracking-tight">RCCI</Link>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden focus:outline-none" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
        
        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="font-medium hover:text-purple-200 transition-colors">Home</Link>
          <Link href="/login" className="font-medium hover:text-purple-200 transition-colors">Login</Link>
          <Link href="/register" className="font-medium bg-white text-purple-700 px-4 py-1.5 rounded-md hover:bg-purple-100 transition-colors">Register</Link>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden flex flex-col p-4 border-t border-purple-600">
          <Link href="/" className="py-2 font-medium hover:text-purple-200 transition-colors">Home</Link>
          <Link href="/login" className="py-2 font-medium hover:text-purple-200 transition-colors">Login</Link>
          <Link href="/register" className="py-2 mt-2 text-center font-medium bg-white text-purple-700 px-4 py-1.5 rounded-md hover:bg-purple-100 transition-colors">Register</Link>
        </div>
      )}
    </nav>
  );
}
