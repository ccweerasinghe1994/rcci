import { prisma } from "@/prisma"
import { formatDistanceToNow } from "date-fns"
import Image from "next/image"
import Link from "next/link"
// Helper to split HTML content into roughly equal word columns
function splitHtmlContentIntoColumns(html: string, numCols: number, maxWordsPerCol: number, hasImage: boolean = false) {
  // Remove tags for word splitting, but keep original for rendering
  const tempDiv = typeof window === "undefined" ? null : document.createElement("div")
  let textContent = ""
  if (tempDiv) {
    tempDiv.innerHTML = html
    textContent = tempDiv.textContent || ""
  } else {
    // fallback for SSR: strip tags
    textContent = html.replace(/<[^>]+>/g, "")
  }
  const words = textContent.split(/\s+/)
  const columns: string[] = []
  let wordIndex = 0

  // Adjust word count for first column if there's an image
  const firstColWordCount = hasImage ? Math.floor(maxWordsPerCol / 2) : maxWordsPerCol
  const remainingCols = numCols - 1
  
  // First column
  let start = wordIndex
  let end = Math.min(start + firstColWordCount, words.length)
  columns.push(words.slice(start, end).join(" "))
  wordIndex = end

  // Distribute remaining words across other columns
  const remainingWords = words.length - wordIndex
  const wordsPerRemainingCol = Math.ceil(remainingWords / remainingCols)

  for (let i = 1; i < numCols; i++) {
    start = wordIndex
    end = Math.min(start + wordsPerRemainingCol, words.length)
    columns.push(words.slice(start, end).join(" "))
    wordIndex = end
  }
  
  return columns
}

async function getLatestArticle() {
  try {
    const article = await prisma.article.findFirst({
      where: {
        status: "published",
      },
      orderBy: {
        publishedAt: "desc",
      },
      include: {
        author: true,
        featuredImage: true,
      },
    })
    return article
  } catch (error) {
    console.error("Error fetching latest article:", error)
    return null
  }
}

export async function DailyCommentSection() {
  const latestArticle = await getLatestArticle()
  if (!latestArticle) return null

  // Function to extract a short excerpt
  const createExcerpt = (content: string, maxLength = 51200): string => {
    if (content.length <= maxLength) return content
    return content.substring(0, maxLength).trim() + "..."
  }

  const excerpt = latestArticle.excerpt || createExcerpt(latestArticle.content)
  const formattedDate = latestArticle.publishedAt
    ? formatDistanceToNow(new Date(latestArticle.publishedAt), { addSuffix: true })
    : ""

  const hasImage = !!latestArticle.featuredImage
  // Split the excerpt into 3 columns, with adjusted word count if image is present
  const maxWordsPerCol = 90
  const columns = splitHtmlContentIntoColumns(excerpt, 3, maxWordsPerCol, hasImage)
  
  // Determine the number of columns with content
  const activeColumns = columns.filter(col => col.trim().length > 0).length
  const hasThirdColumn = columns[2] && columns[2].trim().length > 0

  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="container">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">The Daily Comment</h2>
          <span className="text-sm text-gray-500">{formattedDate}</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* First column: image, title, author, and first column text */}
          <div className="flex flex-col">
            <div className="prose max-w-none mt-3">
              <div className="article-content">
              {
              latestArticle.featuredImage &&
                <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden mb-3">
                  <Image
                    src={latestArticle.featuredImage.path}
                    alt={latestArticle.title}
                    fill
                    className="object-cover"
                  />
                </div>
              }
                {columns[0]}
              </div>
            </div>
          </div>
          
          {/* Second column: text */}
          <div>
            <div className="prose max-w-none h-full flex flex-col justify-between">
              <div className="article-content">
                {columns[1]}
              
              {/* Show "Read More" link in second column if third column is empty */}
              {!hasThirdColumn && (
                <Link
                href={`/articles/${latestArticle.slug}`}
                className="text-primary font-medium hover:underline mt-4 block"
                >
                  Read More
                </Link>
              )}
              </div>
            </div>
          </div>
          
          {/* Third column: text and read more (only if there's content) */}
          {hasThirdColumn && (
            <div className="flex flex-col h-full justify-between">
              <div className="prose max-w-none">
                <div className="article-content">
                  {columns[2]}
                </div>
              </div>
              <Link
                href={`/articles/${latestArticle.slug}`}
                className="text-primary font-medium hover:underline mt-4"
              >
                Read More
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
