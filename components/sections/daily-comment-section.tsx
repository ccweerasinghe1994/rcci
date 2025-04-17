import Link from "next/link"
import Image from "next/image"

export function DailyCommentSection() {
  return (
    <section className="py-12 md:py-16">
      <div className="container">
        <h2 className="text-3xl font-bold mb-8">The Daily Comment</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="relative aspect-4/3 w-full">
              <Image src="/placeholder.svg?height=400&width=500" alt="Daily Comment" fill className="object-cover" />
            </div>
            <div className="mt-4 text-sm">
              <p>
                A daily commentary on the news type test set in the French countryside, bathing the wheat fields in
                golden light. Birds sang happily in the trees as a farmer opened his barn door, ready to begin a new day
                of work. Dew beaded on the leaves of the vines, heralding a beautiful day for the grape harvest.
              </p>
              <p className="mt-2">
                In a small village nestled in the hollow of a verdant valley, the locals were already busy with their
                morning routines. The local bakery exuded an intoxicating aroma of fresh bread and golden croissants.
              </p>
            </div>
          </div>
          <div className="md:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p>
                  croissants. Madame Dupont, the baker, greeted her customers with a warm smile as she filled their
                  baskets with crusty baguettes.
                </p>
                <p className="mt-4">
                  Not far away, a school was opening its doors to students who came in close ranks, schoolbags on their
                  backs and sparkling shoes. The teacher, Mr. Lambert, welcomed them kindly before beginning his lesson
                  on French history. Today, he would talk about the French Revolution, a subject that fascinated the
                  students with its anecdotes and its impact on their country.
                </p>
                <p className="mt-4">
                  Not far away, a school was opening its doors to students who came in close ranks, schoolbags on their
                  backs and sparkling shoes. The teacher, Mr. Lambert, welcomed them kindly before beginning his lesson
                  on French history. Today, he would talk about the French Revolution, a subject that fascinated the
                  students with its anecdotes and its impact on their country.
                </p>
              </div>
              <div>
                <p>
                  Not far away, a school was opening its doors to students who came in close ranks, schoolbags on their
                  backs and sparkling shoes. The teacher, Mr. Lambert, welcomed them kindly before beginning his lesson
                  on French history. Today, he would talk about the French Revolution, a subject that fascinated the
                  students with its anecdotes and its impact on their country.
                </p>
                <p className="mt-4">
                  Not far away, a school was opening its doors to students who came in close ranks, schoolbags on their
                  backs and sparkling shoes. The teacher, Mr. Lambert, welcomed them kindly before beginning his lesson
                  on French history. Today, he would talk about the French Revolution, a subject that fascinated the
                  students with its anecdotes and its impact on their country.
                </p>
                <p className="mt-4">
                  Not far from there, a school was opening its doors
                  <Link href="#" className="text-primary font-medium ml-1 hover:underline">
                    Read More
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
