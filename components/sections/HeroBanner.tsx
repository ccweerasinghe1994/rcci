"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

interface BannerData {
  title: string
  content: string
  buttonText: string
  buttonLink: string
  imageUrl: string
}

// Default banner data as fallback
const defaultBannerData: BannerData = {
  title: "Rodrigues re-imagined",
  content:
    "All over the world, the private sector is a major driver of industrial development, economic growth and social integration and well-being. The Rodrigues Chamber of Commerce and Industry provides a platform of self-organisation and representation to inspire and support Rodriguan businesses in their drive towards an inclusive and sustainable development.",
  buttonText: "JOIN THE CHAMBER",
  buttonLink: "/join",
  imageUrl: "/placeholder.svg?height=600&width=800",
}

export default function HeroBanner() {
  const [bannerData, setBannerData] = useState<BannerData>(defaultBannerData)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchBannerData = async () => {
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
      } finally {
        setIsLoading(false)
      }
    }

    fetchBannerData()
  }, [])

  if (isLoading) {
    return (
      <div className="relative bg-[#001a3a] text-white h-[400px] animate-pulse">
        <div className="container h-full flex items-center">
          <div className="w-full md:w-1/2 space-y-6">
            <div className="h-10 bg-white/20 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-white/20 rounded w-full"></div>
              <div className="h-4 bg-white/20 rounded w-full"></div>
              <div className="h-4 bg-white/20 rounded w-5/6"></div>
            </div>
            <div className="h-10 bg-white/20 rounded w-1/3 mt-4"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative bg-[#001a3a] text-white overflow-hidden">
      <div className="container flex py-16">
        <div className="w-full md:w-1/2 space-y-6 z-10">
          <h1 className="text-4xl font-bold">{bannerData.title}</h1>
          <p className="text-base">{bannerData.content}</p>
          <div className="pt-4">
            <Link href={bannerData.buttonLink}>
              <div className="inline-block border border-white px-8 py-3 uppercase font-medium tracking-wide hover:bg-white hover:text-[#001a3a] transition-colors">
                {bannerData.buttonText}
              </div>
            </Link>
          </div>
        </div>
        <div className="hidden md:block absolute top-0 right-0 w-1/2 h-full">
          <div className="relative w-full h-full">
            {bannerData.imageUrl && (
              <Image
                src={bannerData.imageUrl}
                alt="Banner background"
                fill
                sizes="50vw"
                style={{ objectFit: "cover" }}
                priority
              />
            )}
            <div className="absolute inset-0 bg-[#001a3a]/50"></div>
          </div>
        </div>
      </div>
    </div>
  )
} 