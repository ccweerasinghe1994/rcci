import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function FeaturesSection() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Services</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            We provide comprehensive support to businesses in Rodrigues through various services designed to foster
            growth and development.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Business Networking</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Connect with other businesses and entrepreneurs to share ideas, experiences, and opportunities for
                collaboration.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Advocacy & Representation</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                We represent the interests of our members to government and other stakeholders to create a favorable
                business environment.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Training & Development</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Access workshops, seminars, and training programs designed to enhance your business skills and
                knowledge.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
