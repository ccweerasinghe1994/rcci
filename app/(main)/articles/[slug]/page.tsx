import { Button } from "@/components/ui/button"
import { Facebook, Link2, Linkedin, Mail } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

// This would typically come from a database or CMS
const articles = {
  "rcci-members-code-of-conduct": {
    title: "RCCI Members' Code of Conduct",
    date: "March 3, 2025",
    author: "",
    content: `
      <h2>Members' Code of Conduct</h2>
      <p>The RCCI Code of Conduct is a framework that sets standards of professionalism, integrity, and inclusivity among its members. Membership is both a privilege and a responsibility, and adherence to this Code ensures the trust and mutual respect necessary for a thriving business community.</p>
      
      <h3>1. General Principles</h3>
      <ul>
        <li><strong>Legal Compliance:</strong> Conduct business in accordance with all applicable laws, regulations, and Chamber bylaws, both locally and internationally.</li>
        <li><strong>Ethical Practices:</strong> Conduct business with honesty, integrity, and transparency, avoiding corrupt practices, bribery, and unethical behaviors.</li>
        <li><strong>Non-Discrimination:</strong> Uphold policies of inclusivity, rejecting discrimination based on race, gender, religion, age, disability, or any other protected status.</li>
      </ul>
      
      <h3>2. Professional Conduct</h3>
      <ul>
        <li><strong>Respect and Collaboration:</strong> Treat all members, Chamber staff, and the community with respect and professionalism, fostering an environment of mutual trust and cooperation.</li>
        <li><strong>Reputation and Integrity:</strong> Represent the Chamber positively in all activities, safeguarding its reputation and credibility.</li>
        <li><strong>Conflict Resolution:</strong> Address disputes constructively and respectfully, utilizing mediation or arbitration where appropriate.</li>
      </ul>
      
      <h3>3. Responsibilities toward Employees</h3>
      <ul>
        <li><strong>Safe Workplace:</strong> Ensure a harassment-free, safe, and respectful work environment in compliance with legal standards.</li>
        <li><strong>Diversity and Inclusion:</strong> Value and promote diversity in the workplace, encouraging equal opportunities for all.</li>
        <li><strong>Professional Development:</strong> Recognize and reward merit, and provide opportunities for professional growth and development.</li>
      </ul>
      
      <h3>4. Customer Relations</h3>
      <ul>
        <li><strong>Fair Treatment:</strong> Treat customers with fairness and respect, honoring their cultural and personal values.</li>
        <li><strong>Transparency:</strong> Provide accurate information about products and services, and uphold commitments made to customers.</li>
        <li><strong>Dispute Resolution:</strong> Offer clear processes for addressing customer concerns and complaints.</li>
      </ul>
      
      <h3>5. Supplier and Partner Relations</h3>
      <ul>
        <li><strong>Ethical Sourcing:</strong> Engage with suppliers and partners committed to ethical practices and sustainability.</li>
        <li><strong>Collaboration:</strong> Foster mutually beneficial relationships based on respect and shared values.</li>
        <li><strong>Transparency:</strong> Maintain open and honest communication with all stakeholders.</li>
      </ul>
      
      <h3>6. Commitment to Competition</h3>
      <ul>
        <li><strong>Fair Practices:</strong> Compete fairly and ethically, avoiding anti-competitive behaviors.</li>
        <li><strong>Market Integrity:</strong> Promote free and open competition that benefits the business community and the broader economy.</li>
      </ul>
      
      <h3>7. Environmental Responsibility</h3>
      <ul>
        <li><strong>Sustainability:</strong> Strive to minimize the environmental impact of business activities.</li>
        <li><strong>Compliance:</strong> Adhere to lawful environmental standards applicable to the industry.</li>
        <li><strong>Advocacy:</strong> Promote awareness and adoption of environmentally responsible practices.</li>
      </ul>
      
      <h3>8. Community Engagement</h3>
      <ul>
        <li><strong>Local Support:</strong> Actively contribute to the local community through charitable initiatives and economic development.</li>
        <li><strong>Corporate Citizenship:</strong> Promote ethical business practices and social responsibility.</li>
        <li><strong>Partnerships:</strong> Collaborate with community organizations to address societal challenges.</li>
      </ul>
      
      <h3>9. Communication and Media Relations</h3>
      <ul>
        <li><strong>Professional Representation:</strong> Ensure that all public and private communications reflect positively on RCCI.</li>
        <li><strong>Confidentiality:</strong> Safeguard sensitive information and disclose it only when authorized or legally required.</li>
        <li><strong>Social Media:</strong> Use social media responsibly, refraining from derogatory or defamatory statements.</li>
      </ul>
      
      <h3>10. Membership Obligations</h3>
      <ul>
        <li><strong>Participation:</strong> Engage actively in Chamber activities and events to foster collaboration and growth.</li>
        <li><strong>Support for Mission:</strong> Promote and uphold the mission and goals of the RCCI.</li>
        <li><strong>Adherence:</strong> Follow all guidelines outlined in this Code, with violations subject to review and potential disciplinary action.</li>
      </ul>
      
      <h3>Privacy Policy</h3>
      <p>By joining RCCI, members acknowledge that the Rodrigues Chamber of Commerce and Industry collects personal information, which will be used for internal purposes and which it may share with certain service providers. You may instruct us not to process your personal information for marketing purposes by email at any time. In practice, you will usually either expressly agree in advance to our use of your personal information for marketing purposes, or we will provide you with an opportunity to opt-out of the use of your personal information for marketing purposes.</p>
      
      <p>By committing to this Code of Conduct, RCCI members affirm their dedication to fostering an ethical, inclusive, and prosperous business environment in Rodrigues and beyond.</p>
      
      <h3>Authors</h3>
    `,
  },
  "a-daily-comment-in-france": {
    title: "A daily comment in france",
    date: "March 24, 2025",
    author: "John Doe",
    content: `
      <p>This is a placeholder for the "A daily comment in france" article content.</p>
      <p>The full article would be displayed here with all its sections and paragraphs.</p>
    `,
  },
  "les-avantages-du-teletravail": {
    title: "Les avantages du télétravail dans le monde moderne",
    date: "March 19, 2025",
    author: "Juswal",
    content: `
      <p>This is a placeholder for the "Les avantages du télétravail dans le monde moderne" article content.</p>
      <p>The full article would be displayed here with all its sections and paragraphs.</p>
    `,
  },
  "lorem-ipsum-dolor": {
    title: "Lorem Ipsum Dolor",
    date: "February 5, 2025",
    author: "John Doe",
    content: `
      <p>This is a placeholder for the "Lorem Ipsum Dolor" article content.</p>
      <p>The full article would be displayed here with all its sections and paragraphs.</p>
    `,
  },
  "lorem-de-french": {
    title: "Lorem de french",
    date: "February 5, 2025",
    author: "John Doe",
    content: `
      <p>This is a placeholder for the "Lorem de french" article content.</p>
      <p>The full article would be displayed here with all its sections and paragraphs.</p>
    `,
  },
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const article = articles[slug as keyof typeof articles]

  if (!article) {
    notFound()
  }

  // Recent articles for the sidebar (excluding the current one)
  const recentArticles = Object.entries(articles)
    .filter(([key]) => key !== slug)
    .slice(0, 3)
    .map(([key, article]) => ({ slug: key, ...article }))

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-[#0d3b66] text-white">
          <div className="container py-12 relative">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-2/3 space-y-4">
                <h1 className="text-3xl font-bold">News & Media</h1>
                <p className="max-w-xl">
                  Lorem ipsum dolor sit amet. Eos pariatur libero ea provident deserunt in possimus repudiandae ut
                  placeat inventore 33 quia iure. Qui porro mollitia ut saepe libero vel earum nisi eum libero
                  voluptatem aut nobis inventore 33 eligendi enim 33.
                </p>
                <div className="pt-4">
                  <Button variant="outline" className="border-white text-white hover:bg-white hover:text-[#0d3b66]">
                    Subscribe
                  </Button>
                </div>
              </div>
              <div className="hidden md:flex md:w-1/3 justify-end">
                <div className="relative w-64 h-64">
                  <Image
                    src="/placeholder.svg?height=200&width=200"
                    alt="People with ideas"
                    width={200}
                    height={200}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Secondary Navigation */}
        <section className="border-b border-gray-200 py-4">
          <div className="container">
            <div className="flex gap-8">
              <Link href="#rcci-newsletter" className="text-primary hover:underline">
                RCCI Newsletter
              </Link>
              <Link href="#daily-comment" className="text-primary hover:underline">
                Daily Comment
              </Link>
              <Link href="#rcci-in-news" className="text-primary hover:underline">
                RCCI in the News
              </Link>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-8">
          <div className="container">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Main Content */}
              <div className="md:w-2/3">
                {/* Social Sharing */}
                <div className="flex flex-col gap-2 float-left mr-6">
                  <Link
                    href="#"
                    className="w-8 h-8 rounded-full bg-[#3b5998] flex items-center justify-center text-white"
                  >
                    <Facebook size={16} />
                  </Link>
                  <Link
                    href="#"
                    className="w-8 h-8 rounded-full bg-[#0077b5] flex items-center justify-center text-white"
                  >
                    <Linkedin size={16} />
                  </Link>
                  <Link
                    href="#"
                    className="w-8 h-8 rounded-full bg-[#d14836] flex items-center justify-center text-white"
                  >
                    <Mail size={16} />
                  </Link>
                  <Link
                    href="#"
                    className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700"
                  >
                    <Link2 size={16} />
                  </Link>
                </div>

                {/* Article Title and Meta */}
                <div className="ml-16">
                  <h2 className="text-2xl font-bold mb-2">{article.title}</h2>
                  <div className="text-gray-500 mb-6">{article.date}</div>
                  {article.author && <div className="text-gray-700 mb-6">By {article.author}</div>}

                  {/* Article Content */}
                  <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: article.content }} />
                </div>
              </div>

              {/* Sidebar */}
              <div className="md:w-1/3">
                {/* Recent Articles */}
                <div className="border border-gray-200 rounded-md overflow-hidden mb-6">
                  <div className="bg-[#001a3a] text-white p-3 font-semibold">Recent Articles</div>
                  <div className="p-4">
                    <ul className="space-y-2">
                      {recentArticles.map((article) => (
                        <li key={article.slug}>
                          <Link href={`/articles/${article.slug}`} className="text-primary hover:underline">
                            {article.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4">
                      <Link href="/news-media" className="text-primary hover:underline text-sm">
                        see more articles »
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Advanced Search */}
                <div className="border border-gray-200 rounded-md overflow-hidden mb-6">
                  <div className="bg-[#001a3a] text-white p-3 font-semibold flex justify-between items-center">
                    <span>Advanced Search</span>
                    <span className="bg-white text-[#001a3a] rounded-full w-6 h-6 flex items-center justify-center">
                      ?
                    </span>
                  </div>
                  <div className="p-4">
                    <input
                      type="text"
                      placeholder="Search..."
                      className="w-full border border-gray-300 rounded-md p-2 mb-3"
                    />
                    <Button className="w-full bg-[#1976D2]">Search</Button>
                  </div>
                </div>

                {/* RCCI News */}
                <div className="border border-gray-200 rounded-md overflow-hidden">
                  <div className="bg-[#001a3a] text-white p-3 font-semibold flex justify-between items-center">
                    <span>RCCI News</span>
                    <span className="bg-white text-[#001a3a] rounded-full w-6 h-6 flex items-center justify-center">
                      ?
                    </span>
                  </div>
                  <div className="p-4 flex justify-center">
                    <Button className="bg-[#1976D2]">Subscribe</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
