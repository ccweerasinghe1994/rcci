import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, FileText, Users, LogOut, UserCircle, ImageIcon } from "lucide-react"

export const metadata = {
  title: "RCCI Admin",
  description: "Admin panel for Rodrigues Chamber of Commerce and Industry",
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex">
          {/* Sidebar */}
          <div className="w-14 md:w-64 bg-primary text-white flex flex-col transition-all duration-300">
            <div className="p-2 md:p-4 border-b border-primary-foreground/10 flex justify-center md:justify-start">
              <div className="flex items-center gap-2">
                <div className="bg-white w-10 h-10 flex items-center justify-center text-primary font-bold text-xl">
                  RC
                </div>
                <span className="hidden md:inline text-xl font-semibold">Admin Panel</span>
              </div>
            </div>
            <nav className="flex-1 py-4">
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/admin"
                    className="flex items-center justify-center md:justify-start gap-3 px-2 md:px-4 py-2 rounded-md hover:bg-primary-foreground/10 transition-colors"
                  >
                    <LayoutDashboard size={20} />
                    <span className="hidden md:inline">Dashboard</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/banner"
                    className="flex items-center justify-center md:justify-start gap-3 px-2 md:px-4 py-2 rounded-md hover:bg-primary-foreground/10 transition-colors"
                  >
                    <ImageIcon size={20} />
                    <span className="hidden md:inline">Hero Banner</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/articles"
                    className="flex items-center justify-center md:justify-start gap-3 px-2 md:px-4 py-2 rounded-md hover:bg-primary-foreground/10 transition-colors"
                  >
                    <FileText size={20} />
                    <span className="hidden md:inline">Articles</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/authors"
                    className="flex items-center justify-center md:justify-start gap-3 px-2 md:px-4 py-2 rounded-md hover:bg-primary-foreground/10 transition-colors"
                  >
                    <UserCircle size={20} />
                    <span className="hidden md:inline">Authors</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/users"
                    className="flex items-center justify-center md:justify-start gap-3 px-2 md:px-4 py-2 rounded-md hover:bg-primary-foreground/10 transition-colors"
                  >
                    <Users size={20} />
                    <span className="hidden md:inline">Users</span>
                  </Link>
                </li>
              </ul>
            </nav>
            <div className="p-2 md:p-4 border-t border-primary-foreground/10">
              <Link href="/">
                <Button
                  variant="outline"
                  size="icon"
                  className="w-10 h-10 md:w-full md:h-auto md:justify-start text-white border-white hover:bg-primary-foreground/10 hover:text-white"
                >
                  <LogOut size={20} className="md:mr-2" />
                  <span className="hidden md:inline">Exit Admin</span>
                </Button>
              </Link>
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 flex flex-col">
            <header className="h-16 border-b bg-white flex items-center px-6">
              <h1 className="text-xl font-semibold">RCCI Admin</h1>
            </header>
            <main className="flex-1 p-4 md:p-6 bg-gray-50 overflow-auto">{children}</main>
          </div>
        </div>
      </body>
    </html>
  )
}
