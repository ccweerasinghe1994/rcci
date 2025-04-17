"use client"

import { Icons } from "@/components/shared/icons"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"

interface PaginationProps {
  pageCount: number
  currentPage: number
}

export function UsersPagination({ pageCount, currentPage }: PaginationProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Create a new URLSearchParams instance so we can modify it
  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams)
    params.set("page", pageNumber.toString())
    return `${pathname}?${params.toString()}`
  }

  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex-1 text-sm text-muted-foreground">
        Page {currentPage} of {pageCount}
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          className="h-8 w-8 p-0"
          disabled={currentPage <= 1}
          asChild
        >
          <Link
            href={createPageURL(currentPage - 1)}
            aria-label="Go to previous page"
          >
            <Icons.chevronLeft className="h-4 w-4" />
          </Link>
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          className="h-8 w-8 p-0"
          disabled={currentPage >= pageCount}
          asChild
        >
          <Link 
            href={createPageURL(currentPage + 1)}
            aria-label="Go to next page"
          >
            <Icons.chevronRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
} 