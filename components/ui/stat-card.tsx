import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"

interface StatCardProps {
  title: string
  count: number
  icon: LucideIcon
  lastUpdated: Date | null
}

export function StatCard({ title, count, icon: Icon, lastUpdated }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{count}</div>
        <p className="text-xs text-muted-foreground">
          {lastUpdated 
            ? `Last updated: ${new Date(lastUpdated).toLocaleDateString()}` 
            : `No ${title.toLowerCase()} yet`}
        </p>
      </CardContent>
    </Card>
  )
} 