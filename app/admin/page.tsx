import { DashboardCard } from "@/components/ui/dashboard-card"
import { StatCardsGrid } from "@/components/ui/stat-cards-grid"
import { ImageIcon, Plus, UserCircle, Users } from "lucide-react"
import { getDashboardData } from "./actions"

export default async function AdminDashboard() {
  const dashboardData = await getDashboardData()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>

      {/* Summary Cards */}
      <StatCardsGrid data={dashboardData} />

      {/* Action Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        <DashboardCard
          title="Hero Banner"
          description="Manage the homepage hero banner content and image"
          lastUpdated={dashboardData.banners.lastUpdated}
          linkHref="/admin/banner"
          linkText="Edit Banner"
          icon={<ImageIcon className="mr-2 h-4 w-4" />}
          count={dashboardData.banners.count}
        />
        
        <DashboardCard
          title="Articles Management"
          description="Create and manage articles for the RCCI website"
          lastUpdated={dashboardData.articles.lastUpdated}
          linkHref="/admin/articles/create"
          linkText="Create Article"
          icon={<Plus className="mr-2 h-4 w-4" />}
          count={dashboardData.articles.count}
        />
        
        <DashboardCard
          title="Authors Management"
          description="Manage authors who contribute to the RCCI website"
          lastUpdated={dashboardData.authors.lastUpdated}
          linkHref="/admin/authors"
          linkText="Manage Authors"
          icon={<UserCircle className="mr-2 h-4 w-4" />}
          count={dashboardData.authors.count}
        />
        
        <DashboardCard
          title="User Management"
          description="Manage registered users of the RCCI platform"
          lastUpdated={dashboardData.users.lastUpdated}
          linkHref="/admin/users"
          linkText="View Users"
          icon={<Users className="mr-2 h-4 w-4" />}
          count={dashboardData.users.count}
        />
      </div>
    </div>
  )
}
