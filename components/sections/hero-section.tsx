"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"

// Define the banner data type
interface BannerData {
  title: string
  content: string
  buttonText: string
  buttonLink: string
  imageUrl: string
}

// Default banner data (fallback)
const defaultBannerData: BannerData = {
  title: "Rodrigues re-imagined",
  content:
    "All over the world, the private sector is a major driver of industrial development, economic growth and social integration and well-being. The Rodrigues Chamber of Commerce and Industry provides a platform of self-organisation and representation to inspire and support Rodriguan businesses in their drive towards an inclusive and sustainable development.",
  buttonText: "JOIN THE CHAMBER",
  buttonLink: "/join",
  imageUrl: "/placeholder.svg?height=600&width=800",
}

export function HeroSection() {
  const [bannerData, setBannerData] = useState<BannerData>(defaultBannerData)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchBannerData = async () => {
      setIsLoading(true)
      try {
        const response = await fetch("/api/banner")
        if (!response.ok) {
          throw new Error("Failed to fetch banner data")
        }
        const data = await response.json()
        setBannerData(data)
      } catch (error) {
        console.error("Error fetching banner data:", error)
        // Fall back to default data on error
        setBannerData(defaultBannerData)
      } finally {
        setIsLoading(false)
      }
    }

    fetchBannerData()
  }, [])

  if (isLoading) {
    return (
      <section className="relative bg-[#001a3a] text-white min-h-[400px] flex items-center">
        <div className="container">
          <div className="animate-pulse">
            <div className="h-10 bg-white/20 rounded w-1/3 mb-6"></div>
            <div className="h-4 bg-white/20 rounded w-full mb-2"></div>
            <div className="h-4 bg-white/20 rounded w-5/6 mb-2"></div>
            <div className="h-4 bg-white/20 rounded w-4/6 mb-6"></div>
            <div className="h-10 bg-white/20 rounded w-40"></div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative bg-[#001a3a] text-white">
      <div className="container flex">
        <div className="w-full md:w-1/2 py-16 md:py-20 space-y-6 z-10">
          <h1 className="text-4xl font-bold">{bannerData.title}</h1>
          <p className="text-base">{bannerData.content}</p>
          <div className="pt-4">
            <Link
              href={bannerData.buttonLink}
              className="inline-block border border-white px-8 py-3 uppercase font-medium tracking-wide hover:bg-white hover:text-[#001a3a] transition-colors"
            >
              {bannerData.buttonText}
            </Link>
          </div>
        </div>
        <div className="hidden md:block absolute top-0 right-0 w-full h-full">
  {/* Background Image */}
  <Image
    src="/images/cta-bg.jpg"
    alt="Background"
    fill
    className="object-cover"
    priority
  />
  {/* Gradient Overlay */}
  <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--color-primary)_40%,rgba(22,62,172,0.62)_60%,rgba(248,247,247,0.22))]" />
</div>
      </div>
    </section>
  )
}
