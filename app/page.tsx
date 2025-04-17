import { CTASection } from "@/components/sections/cta-section"
import { DailyCommentSection } from "@/components/sections/daily-comment-section"
import { FeaturesSection } from "@/components/sections/features-section"
import { HeroSection } from "@/components/sections/hero-section"
import { NewsSection } from "@/components/sections/news-section"
import { TestimonialsSection } from "@/components/sections/testimonials-section"

export default function Home() {
  return (
    <>
      <HeroSection />
      <DailyCommentSection />
      <FeaturesSection />
      <NewsSection />
      <TestimonialsSection />
      <CTASection />
    </>
  )
}
