import { prisma } from "@/prisma"
import { formatDistanceToNow } from "date-fns"
import Image from "next/image"
import Link from "next/link"
// Helper to split HTML content into roughly equal word columns
function splitHtmlContentIntoColumns(html: string, numCols: number, maxWordsPerCol: number, hasImage: boolean = false) {
  // For column splitting, we need to work with plain text to count words
  const tempDiv = typeof window === "undefined" ? null : document.createElement("div")
  let textContent = ""
  
  if (tempDiv) {
    tempDiv.innerHTML = html
    textContent = tempDiv.textContent || ""
  } else {
    // fallback for SSR: strip tags for word counting only
    textContent = html.replace(/<[^>]+>/g, "")
  }
  
  const words = textContent.split(/\s+/)
  const totalWords = words.length
  
  // Calculate column breaks based on word positions
  const columnBreaks = []
  
  // Adjust word count for first column if there's an image
  const firstColWordCount = hasImage ? Math.floor(maxWordsPerCol / 2) : maxWordsPerCol
  
  // Calculate word positions for each column
  let wordPosition = firstColWordCount
  columnBreaks.push(wordPosition)
  
  const remainingCols = numCols - 1
  if (remainingCols > 0) {
    const wordsPerRemainingCol = Math.ceil((totalWords - wordPosition) / remainingCols)
    
    for (let i = 1; i < numCols - 1; i++) {
      wordPosition += wordsPerRemainingCol
      if (wordPosition < totalWords) {
        columnBreaks.push(wordPosition)
      }
    }
  }
  
  // Now split the HTML at appropriate positions
  // This is a simplified approach - a more robust solution would use a proper HTML parser
  const htmlWords = html.split(/(\s+)/)
  const columns = []
  
  let wordCount = 0
  let currentColumn = ""
  let columnIndex = 0
  
  for (let i = 0; i < htmlWords.length; i++) {
    const part = htmlWords[i]
    currentColumn += part
    
    // Count non-empty, non-tag words
    if (part.trim().length > 0 && !part.match(/<[^>]+>/)) {
      wordCount++
    }
    
    if (columnIndex < columnBreaks.length && wordCount >= columnBreaks[columnIndex]) {
      // Try to find the end of the current paragraph or sentence to make a cleaner break
      let lookAhead = i + 1
      let foundBreak = false
      
      while (lookAhead < htmlWords.length && lookAhead < i + 20) {
        const nextPart = htmlWords[lookAhead]
        if (nextPart.includes('</p>') || nextPart.includes('.') || nextPart.includes('!') || nextPart.includes('?')) {
          // Include up to this part in the current column
          while (i < lookAhead) {
            i++
            currentColumn += htmlWords[i]
          }
          foundBreak = true
          break
        }
        lookAhead++
      }
      
      columns.push(currentColumn)
      currentColumn = ""
      columnIndex++
    }
  }
  
  // Add the remaining content to the last column
  if (currentColumn) {
    columns.push(currentColumn)
  }
  
  // Fill any remaining columns with empty strings
  while (columns.length < numCols) {
    columns.push("")
  }
  
  return columns
}

// Function to prepare HTML content for rendering
function prepareHtmlContent(html: string): string {
  console.log(html)
  // Only clean up empty paragraphs while preserving all other HTML
  return html
    .replace(/<p>\s*<br>\s*<\/p>/g, '')
    .replace(/<p><br><\/p>/g, '')
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
  const createExcerpt = (content: string, maxLength = 2000): string => {
    if (content.length <= maxLength) return content
    return content.substring(0, maxLength).trim() + "..."
  }

  const excerpt = latestArticle.excerpt || createExcerpt(latestArticle.content)
  const formattedDate = latestArticle.publishedAt
    ? formatDistanceToNow(new Date(latestArticle.publishedAt), { addSuffix: true })
    : ""

  const hasImage = !!latestArticle.featuredImage
  // Split the excerpt into 3 columns, with adjusted word count if image is present
  const maxWordsPerCol = 100
  const columns = splitHtmlContentIntoColumns(excerpt, 3, maxWordsPerCol, hasImage)
  
  // Determine the number of columns with content
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
                <div dangerouslySetInnerHTML={{ __html: prepareHtmlContent(columns[0]) }} />
              </div>
            </div>
          </div>
          
          {/* Second column: text */}
          <div>
            <div className="prose max-w-none h-full flex flex-col justify-between">
              <div className="article-content">
                <div dangerouslySetInnerHTML={{ __html: prepareHtmlContent(columns[1]) }} />
              
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
                  <div dangerouslySetInnerHTML={{ __html: prepareHtmlContent(columns[2]) }} />
                  <Link
                href={`/articles/${latestArticle.slug}`}
                className="text-primary font-medium hover:underline mt-4"
              >
                Read More
              </Link>
                </div>
              </div>
              
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
