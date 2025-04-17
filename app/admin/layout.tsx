"use client"

import { Button } from "@/components/ui/button"
import { FileText, ImageIcon, LayoutDashboard, LogOut, Menu, UserCircle, Users, X } from "lucide-react"
import Link from "next/link"
import type React from "react"
import { useState } from "react"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)} 
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`
          fixed inset-y-0 left-0 z-50 
          w-64 bg-primary text-white flex flex-col transition-all duration-300
          transform lg:relative lg:translate-x-0
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="p-4 border-b border-primary-foreground/10 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-white w-10 h-10 flex items-center justify-center text-primary font-bold text-xl">
              RC
            </div>
            <span className="text-xl font-semibold">Admin Panel</span>
          </div>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white hover:text-primary-foreground"
          >
            <X size={24} />
          </button>
        </div>
        
        <nav className="flex-1 py-4 overflow-y-auto">
          <ul className="space-y-2">
            <li>
              <Link
                href="/admin"
                className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-primary-foreground/10 transition-colors"
                onClick={() => setSidebarOpen(false)}
              >
                <LayoutDashboard size={20} />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/banner"
                className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-primary-foreground/10 transition-colors"
                onClick={() => setSidebarOpen(false)}
              >
                <ImageIcon size={20} />
                <span>Hero Banner</span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/articles"
                className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-primary-foreground/10 transition-colors"
                onClick={() => setSidebarOpen(false)}
              >
                <FileText size={20} />
                <span>Articles</span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/authors"
                className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-primary-foreground/10 transition-colors"
                onClick={() => setSidebarOpen(false)}
              >
                <UserCircle size={20} />
                <span>Authors</span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/users"
                className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-primary-foreground/10 transition-colors"
                onClick={() => setSidebarOpen(false)}
              >
                <Users size={20} />
                <span>Users</span>
              </Link>
            </li>
          </ul>
        </nav>
        
        <div className="p-4 border-t border-primary-foreground/10">
          <Link href="/">
            <Button
              variant="outline"
              className="w-full justify-start border-white hover:bg-primary-foreground/10 hover:text-white"
              onClick={() => setSidebarOpen(false)}
            >
              <LogOut size={20} className="mr-2" />
              <span>Exit Admin</span>
            </Button>
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <header className="h-16 border-b bg-white flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setSidebarOpen(true)} 
              className="lg:hidden"
            >
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-semibold">RCCI Admin</h1>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-6 bg-gray-50 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
