import { CTASection } from "@/components/sections/cta-section"
import { DailyCommentSection } from "@/components/sections/daily-comment-section"
import HeroBanner from "@/components/sections/HeroBanner"
import { NewsSection } from "@/components/sections/news-section"
import { TestimonialsSection } from "@/components/sections/testimonials-section"

export default function Home() {
  return (
    <>
      <div className="max-w-[1170px]  mx-auto xl:px-0 lg:px-2 md:px-4 sm:px-6 px-12">
      <HeroBanner />
      <DailyCommentSection />
      <NewsSection />
      </div>
      {/* <FeaturesSection /> */}
      {/* <TestimonialsSection /> */}
      {/* <CTASection /> */}
    </>
  )
}
