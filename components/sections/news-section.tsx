import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

export function NewsSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Latest RCCI News & Events</h2>
          <Link href="#" className="text-primary hover:underline mt-4 md:mt-0">
            View all news
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>The Benefits of Remote Work in the Modern World</CardTitle>
              <CardDescription>April 15, 2025</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video relative mb-4 overflow-hidden rounded-lg">
                <Image src="/placeholder.svg?height=200&width=400" alt="Remote Work" fill className="object-cover" />
              </div>
              <p className="line-clamp-3">
                Remote work has become a standard practice in many companies around the world. This trend, accelerated
                by the global pandemic, has transformed the way we work.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="#" className="text-primary hover:underline">
                Read more
              </Link>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Sustainable Business Practices</CardTitle>
              <CardDescription>April 10, 2025</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video relative mb-4 overflow-hidden rounded-lg">
                <Image
                  src="/placeholder.svg?height=200&width=400"
                  alt="Sustainable Business"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="line-clamp-3">
                Implementing sustainable practices in your business not only helps the environment but can also lead to
                cost savings and improved brand reputation.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="#" className="text-primary hover:underline">
                Read more
              </Link>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Digital Transformation for SMEs</CardTitle>
              <CardDescription>April 5, 2025</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video relative mb-4 overflow-hidden rounded-lg">
                <Image
                  src="/placeholder.svg?height=200&width=400"
                  alt="Digital Transformation"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="line-clamp-3">
                Small and medium enterprises can benefit greatly from embracing digital technologies to streamline
                operations and reach new markets.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="#" className="text-primary hover:underline">
                Read more
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  )
}
