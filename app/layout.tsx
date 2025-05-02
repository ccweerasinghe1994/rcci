import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Inter, Noto_Sans } from "next/font/google";
import "./globals.css";
// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const notoSans = Noto_Sans({ subsets: ["latin"] })
const inter = Inter({ subsets: ["latin"] })
export const metadata: Metadata = {
  title: "Rodrigues Chamber of Commerce and Industry",
  description: "Official website of the Rodrigues Chamber of Commerce and Industry",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${notoSans.className}`}>
        {children}
        <Toaster />
        </body>
    </html>
  )
}
