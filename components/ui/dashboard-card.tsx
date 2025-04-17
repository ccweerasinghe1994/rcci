import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ReactNode } from "react"

interface DashboardCardProps {
  title: string
  description: string
  lastUpdated?: Date | string | null
  linkHref: string
  linkText: string
  icon: ReactNode
  count?: number
}

export function DashboardCard({
  title,
  description,
  lastUpdated,
  linkHref,
  linkText,
  icon,
  count,
}: DashboardCardProps) {
  // Format date if it's a Date object
  const formattedDate = lastUpdated instanceof Date 
    ? lastUpdated.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    : lastUpdated;

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center gap-2">
              {title}
              {count !== undefined && (
                <span className="inline-flex items-center justify-center bg-muted text-muted-foreground text-sm h-6 min-w-6 px-1.5 rounded-full">
                  {count}
                </span>
              )}
            </CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          {formattedDate ? `Last updated: ${formattedDate}` : "No updates yet"}
        </div>
        <Link href={linkHref}>
          <Button>
            {icon}
            {linkText}
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
} 