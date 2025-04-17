import Link from "next/link"
import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <section className="py-16 md:py-24 bg-primary text-white">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready to join our community?</h2>
            <p className="mt-4 text-lg opacity-90">
              Become a member today and access all the benefits the Rodrigues Chamber of Commerce and Industry has to
              offer.
            </p>
          </div>
          <Link href="/join">
            <Button size="lg" variant="secondary">
              JOIN THE CHAMBER
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
