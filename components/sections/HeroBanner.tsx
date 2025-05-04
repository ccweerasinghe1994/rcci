"use client";

import { getBannerData } from "@/app/admin/banner/action";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface BannerData {
  title: string;
  content: string;
  buttonText: string;
  buttonLink: string;
  imageUrl: string;
  type: string;
}

// Default banner data as fallback
const defaultBannerData: Record<string, BannerData> = {
  hero: {
    title: "Rodrigues re-imagined",
    content:
      "All over the world, the private sector is a major driver of industrial development, economic growth and social integration and well-being. The Rodrigues Chamber of Commerce and Industry provides a platform of self-organisation and representation to inspire and support Rodriguan businesses in their drive towards an inclusive and sustainable development.",
    buttonText: "JOIN THE CHAMBER",
    buttonLink: "/join",
    imageUrl: "/placeholder.svg?height=600&width=800",
    type: "hero",
  },
  "get-started": {
    title: "Get Started with RCCI",
    content:
      "Begin your journey with the Rodrigues Chamber of Commerce and Industry. Learn about our services, membership benefits, and how we can help your business grow.",
    buttonText: "LEARN MORE",
    buttonLink: "/get-started#benefits",
    imageUrl: "/placeholder.svg?height=600&width=800",
    type: "get-started",
  },
  "news-media": {
    title: "News & Media",
    content:
      "Stay updated with the latest news, events, and announcements from the Rodrigues Chamber of Commerce and Industry and our business community.",
    buttonText: "VIEW ALL",
    buttonLink: "/news-media",
    imageUrl: "/placeholder.svg?height=600&width=800",
    type: "news-media",
  },
};

interface HeroBannerProps {
  type?: string;
}

export default function HeroBanner({ type = "hero" }: HeroBannerProps) {
  const [bannerData, setBannerData] = useState<BannerData>(
    defaultBannerData[type] || defaultBannerData.hero
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBannerData = async () => {
      try {
        setIsLoading(true);
        const data = await getBannerData(type);
        setBannerData(data);
      } catch (error) {
        console.error(`Error fetching banner data for type ${type}:`, error);
        // Fall back to default data on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchBannerData();
  }, [type]);

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
    );
  }

  return (
    <section className="relative bg-[#001a3a] text-white">
      <div className="container flex">
        <div className="w-full md:w-1/2 py-8 md:py-10 space-y-3 z-10">
          <h1 className="text-[32px] font-bold">{bannerData.title}</h1>
          <div
            className="text-base text-white prose max-w-none"
            dangerouslySetInnerHTML={{ __html: bannerData.content }}
          />
          <div className="pt-4">
            <Link
              href={bannerData.buttonLink}
              className="inline-block rounded-sm font-bold border-white border-2 px-8 py-3  tracking-wide hover:bg-white hover:text-[#001a3a] transition-colors"
            >
              {bannerData.buttonText}
            </Link>
          </div>
        </div>
        <div className="hidden md:block absolute top-0 right-0 w-full h-full">
          {bannerData.imageUrl && (
            <Image
              src={bannerData.imageUrl}
              alt="Banner background"
              fill
              className="object-cover"
              priority
            />
          )}
          <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--color-primary)_40%,rgba(22,62,172,0.62)_60%,rgba(248,247,247,0.22))]" />
        </div>
      </div>
    </section>
  );
}
