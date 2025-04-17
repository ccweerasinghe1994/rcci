import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardCard } from "@/components/ui/dashboard-card"
import { FileText, ImageIcon, Plus, UserCircle, Users } from "lucide-react"
import { getDashboardData } from "./actions"

export default async function AdminDashboard() {
  const dashboardData = await getDashboardData()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Articles</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.articles.count}</div>
            <p className="text-xs text-muted-foreground">
              {dashboardData.articles.lastUpdated 
                ? `Last updated: ${new Date(dashboardData.articles.lastUpdated).toLocaleDateString()}` 
                : "No articles yet"}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.users.count}</div>
            <p className="text-xs text-muted-foreground">
              {dashboardData.users.lastUpdated 
                ? `Last updated: ${new Date(dashboardData.users.lastUpdated).toLocaleDateString()}` 
                : "No users yet"}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Authors</CardTitle>
            <UserCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.authors.count}</div>
            <p className="text-xs text-muted-foreground">
              {dashboardData.authors.lastUpdated 
                ? `Last updated: ${new Date(dashboardData.authors.lastUpdated).toLocaleDateString()}` 
                : "No authors yet"}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Banners</CardTitle>
            <ImageIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.banners.count}</div>
            <p className="text-xs text-muted-foreground">
              {dashboardData.banners.lastUpdated 
                ? `Last updated: ${new Date(dashboardData.banners.lastUpdated).toLocaleDateString()}` 
                : "No banners yet"}
            </p>
          </CardContent>
        </Card>
      </div>

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
