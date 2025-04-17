import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Users, Plus, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Articles</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Registered Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">+5 from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Hero Banner</CardTitle>
            <CardDescription>Manage the homepage hero banner content and image</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-between items-center">
            <div>Last updated: April 15, 2025</div>
            <Link href="/admin/banner">
              <Button>
                <ImageIcon className="mr-2 h-4 w-4" />
                Edit Banner
              </Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Articles Management</CardTitle>
            <CardDescription>Create and manage articles for the RCCI website</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-between items-center">
            <div>12 total articles</div>
            <Link href="/admin/articles/create">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Article
              </Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>User Management</CardTitle>
            <CardDescription>Manage registered users of the RCCI platform</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-between items-center">
            <div>45 registered users</div>
            <Link href="/admin/users">
              <Button variant="outline">
                <Users className="mr-2 h-4 w-4" />
                View Users
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
