import { FileText, ImageIcon, UserCircle, Users } from "lucide-react"
import { StatCard } from "./stat-card"

interface DashboardData {
  authors: {
    count: number
    lastUpdated: Date | null
  }
  banners: {
    count: number
    lastUpdated: Date | null
  }
  articles: {
    count: number
    lastUpdated: Date | null
  }
  users: {
    count: number
    lastUpdated: Date | null
  }
}

interface StatCardsGridProps {
  data: DashboardData
}

export function StatCardsGrid({ data }: StatCardsGridProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Articles"
        count={data.articles.count}
        icon={FileText}
        lastUpdated={data.articles.lastUpdated}
      />
      
      <StatCard
        title="Users"
        count={data.users.count}
        icon={Users}
        lastUpdated={data.users.lastUpdated}
      />
      
      <StatCard
        title="Authors"
        count={data.authors.count}
        icon={UserCircle}
        lastUpdated={data.authors.lastUpdated}
      />
      
      <StatCard
        title="Banners"
        count={data.banners.count}
        icon={ImageIcon}
        lastUpdated={data.banners.lastUpdated}
      />
    </div>
  )
} 