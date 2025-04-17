import { Card, CardContent } from "@/components/ui/card"

export function TestimonialsSection() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">What Our Members Say</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Hear from businesses that have benefited from being part of our chamber.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="bg-white">
            <CardContent className="pt-6">
              <div className="flex flex-col gap-4">
                <p className="italic">
                  "Joining the Rodrigues Chamber of Commerce was one of the best decisions for my business. The
                  networking opportunities and support have been invaluable."
                </p>
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                    JD
                  </div>
                  <div>
                    <p className="font-medium">Jane Doe</p>
                    <p className="text-sm text-muted-foreground">CEO, Local Business</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white">
            <CardContent className="pt-6">
              <div className="flex flex-col gap-4">
                <p className="italic">
                  "The advocacy work done by the Chamber has helped create a more favorable business environment in
                  Rodrigues. I've seen tangible benefits."
                </p>
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                    JS
                  </div>
                  <div>
                    <p className="font-medium">John Smith</p>
                    <p className="text-sm text-muted-foreground">Founder, Tech Startup</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white">
            <CardContent className="pt-6">
              <div className="flex flex-col gap-4">
                <p className="italic">
                  "The training programs offered by the Chamber have helped me develop new skills and knowledge that
                  I've applied directly to growing my business."
                </p>
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                    MP
                  </div>
                  <div>
                    <p className="font-medium">Maria Perez</p>
                    <p className="text-sm text-muted-foreground">Owner, Retail Shop</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
