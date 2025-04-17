"use client"

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Edit, Eye, Mail, MoreHorizontal, Search, Trash2 } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import { UserWithStatus } from "./actions"

interface UsersTableProps {
  users: UserWithStatus[]
  totalUsers: number
  totalPages: number
  currentPage: number
  searchTerm: string
  statusFilter: string
  membershipFilter: string
}

export function UsersTable({
  users,
  totalUsers,
  totalPages,
  currentPage,
  searchTerm: initialSearchTerm,
  statusFilter: initialStatusFilter,
  membershipFilter: initialMembershipFilter,
}: UsersTableProps) {
  const router = useRouter()
  const pathname = usePathname()
  
  // Local state for form inputs
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm)
  const [statusFilter, setStatusFilter] = useState(initialStatusFilter)
  const [membershipFilter, setMembershipFilter] = useState(initialMembershipFilter)
  
  // Pagination calculation
  const itemsPerPage = 10
  const startItem = (currentPage - 1) * itemsPerPage + 1
  const endItem = Math.min(currentPage * itemsPerPage, totalUsers)
  
  // Handle filter changes
  const handleFilterChange = () => {
    const params = new URLSearchParams()
    
    if (searchTerm) params.set("search", searchTerm)
    if (statusFilter !== "all") params.set("status", statusFilter)
    if (membershipFilter !== "all") params.set("membershipType", membershipFilter)
    params.set("page", "1") // Reset to page 1 when filters change
    
    const queryString = params.toString()
    router.push(`${pathname}${queryString ? `?${queryString}` : ""}`)
  }
  
  // Handle pagination
  const handlePageChange = (page: number) => {
    const params = new URLSearchParams()
    
    if (initialSearchTerm) params.set("search", initialSearchTerm)
    if (initialStatusFilter !== "all") params.set("status", initialStatusFilter)
    if (initialMembershipFilter !== "all") params.set("membershipType", initialMembershipFilter)
    params.set("page", page.toString())
    
    const queryString = params.toString()
    router.push(`${pathname}${queryString ? `?${queryString}` : ""}`)
  }

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search users..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleFilterChange()
            }}
          />
        </div>
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={(value) => {
            setStatusFilter(value)
            setTimeout(handleFilterChange, 0)
          }}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
          <Select value={membershipFilter} onValueChange={(value) => {
            setMembershipFilter(value)
            setTimeout(handleFilterChange, 0)
          }}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Membership Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Memberships</SelectItem>
              <SelectItem value="personal">Personal</SelectItem>
              <SelectItem value="corporate">Corporate</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleFilterChange} className="md:hidden">
            Apply Filters
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Membership Type</TableHead>
              <TableHead>Join Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No users found
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name || "—"}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.membershipType}</TableCell>
                  <TableCell>{user.createdAt.toLocaleDateString()}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        user.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : user.status === "Inactive"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {user.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          <span>View Details</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Edit User</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Mail className="mr-2 h-4 w-4" />
                          <span>Send Email</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {users.length > 0 && (
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {startItem} to {endItem} of {totalUsers} users
          </div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(page => {
                  // Show first and last page always
                  if (page === 1 || page === totalPages) return true
                  // Show pages around current page
                  if (Math.abs(page - currentPage) <= 1) return true
                  return false
                })
                .map((page, index, array) => {
                  // Add ellipsis
                  if (index > 0 && array[index - 1] !== page - 1) {
                    return (
                      <PaginationItem key={`ellipsis-${page}`}>
                        <span className="px-4">...</span>
                      </PaginationItem>
                    )
                  }
                  return (
                    <PaginationItem key={page}>
                      <PaginationLink 
                        isActive={page === currentPage} 
                        onClick={() => handlePageChange(page)}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  )
                })}
              <PaginationItem>
                <PaginationNext
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </>
  )
} 