import { Search, SlidersHorizontal } from "lucide-react";
import { Metadata } from "next";
import { Suspense } from "react";

import { UsersTable } from "@/components/tables/UsersTable";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { prisma } from "@/prisma";
import { resetFilters } from "./actions";
import { FilterIndicator } from "./filter-indicator";

export const metadata: Metadata = {
  title: "User Management | Admin Dashboard",
  description: "Manage users of the RCCI platform",
};

interface UsersPageProps {
  searchParams: Promise<{
    search?: string;
    status?: string;
    role?: string;
    membershipType?: string;
    page?: string;
  }>;
}

async function getUsers(params: Awaited<UsersPageProps["searchParams"]>) {
  const { search, status, role, membershipType, page } = params;

  const pageNumber = page ? parseInt(page) : 1;
  const pageSize = 10;
  const skip = (pageNumber - 1) * pageSize;

  // Build up the query filters
  const where: any = {};

  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
    ];
  }

  if (status && status !== "all") {
    where.status = status;
  }

  if (role && role !== "all") {
    where.role = role;
  }

  if (membershipType && membershipType !== "all") {
    where.membershipType = membershipType;
  }

  // Get users with pagination
  const users = await prisma.user.findMany({
    where,
    orderBy: { createdAt: "desc" },
    skip,
    take: pageSize,
  });

  // Get total count for pagination
  const totalUsers = await prisma.user.count({ where });
  const totalPages = Math.ceil(totalUsers / pageSize);

  return {
    users,
    totalPages,
    currentPage: pageNumber,
  };
}

async function UsersContent(props: UsersPageProps) {
  const searchParams = await props.searchParams;
  const { users, totalPages, currentPage } = await getUsers(searchParams);

  return (
    <UsersTable
      users={users}
      totalPages={totalPages}
      currentPage={currentPage}
      searchParams={searchParams}
    />
  );
}

// Server component
export default async function UsersPage({ searchParams }: UsersPageProps) {
  const params = await searchParams;
  const search = params.search;
  const status = params.status;
  const role = params.role;
  const membershipType = params.membershipType;

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Users</h2>
          <p className="text-muted-foreground">
            Manage user accounts, roles, and permissions.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>User Management</CardTitle>
          <CardDescription>
            View and manage all users in the system.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            <div className="relative w-full sm:max-w-[400px]">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <form method="GET">
                {/* Preserve existing filters */}
                {status && <input type="hidden" name="status" value={status} />}
                {role && <input type="hidden" name="role" value={role} />}
                {membershipType && (
                  <input
                    type="hidden"
                    name="membershipType"
                    value={membershipType}
                  />
                )}
                <Input
                  name="search"
                  placeholder="Search users..."
                  className="pl-9 w-full"
                  defaultValue={search || ""}
                />
              </form>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm">
                    <SlidersHorizontal className="mr-2 h-4 w-4" />
                    Filters
                    <FilterIndicator
                      status={status}
                      role={role}
                      membershipType={membershipType}
                    />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Filter Users</SheetTitle>
                    <SheetDescription>
                      Apply filters to narrow down the list of users.
                    </SheetDescription>
                  </SheetHeader>

                  <div className="space-y-4 py-4 px-4">
                    <form method="GET" className="space-y-6">
                      {/* Preserve search term if present */}
                      {search && (
                        <input type="hidden" name="search" value={search} />
                      )}

                      <div className="space-y-2">
                        <label htmlFor="status" className="text-sm font-medium">
                          Status
                        </label>
                        <Select name="status" defaultValue={status || "all"}>
                          <SelectTrigger id="status" className="w-full">
                            <SelectValue placeholder="All Statuses" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Statuses</SelectItem>
                            <SelectItem value="ACTIVE">Active</SelectItem>
                            <SelectItem value="PENDING">Pending</SelectItem>
                            <SelectItem value="SUSPENDED">Suspended</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="role" className="text-sm font-medium">
                          Role
                        </label>
                        <Select name="role" defaultValue={role || "all"}>
                          <SelectTrigger id="role" className="w-full">
                            <SelectValue placeholder="All Roles" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Roles</SelectItem>
                            <SelectItem value="USER">User</SelectItem>
                            <SelectItem value="MODERATOR">Moderator</SelectItem>
                            <SelectItem value="ADMIN">Admin</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="membershipType"
                          className="text-sm font-medium"
                        >
                          Membership Type
                        </label>
                        <Select
                          name="membershipType"
                          defaultValue={membershipType || "all"}
                        >
                          <SelectTrigger id="membershipType" className="w-full">
                            <SelectValue placeholder="All Memberships" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Memberships</SelectItem>
                            <SelectItem value="FREE">Free</SelectItem>
                            <SelectItem value="BASIC">Basic</SelectItem>
                            <SelectItem value="PREMIUM">Premium</SelectItem>
                            <SelectItem value="CORPORATE">Corporate</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center gap-2 pt-6">
                        <Button type="submit" className="flex-1">
                          Apply Filters
                        </Button>
                      </div>
                    </form>

                    <div className="pt-4 border-t mt-4">
                      <form action={resetFilters}>
                        {search && (
                          <input type="hidden" name="search" value={search} />
                        )}
                        <SheetClose asChild>
                          <Button
                            type="submit"
                            variant="outline"
                            className="w-full mt-2"
                          >
                            Reset Filters
                          </Button>
                        </SheetClose>
                      </form>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          <Suspense fallback={<UsersTableSkeleton />}>
            <UsersContent searchParams={searchParams} />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}

function UsersTableSkeleton() {
  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <div className="h-12 px-4 border-b flex items-center bg-muted/40">
          <div className="flex items-center gap-4">
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-4 w-[60px]" />
          </div>
        </div>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-16 px-4 border-b flex items-center">
            <div className="flex flex-1 items-center gap-4">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-4 w-[150px]" />
              <Skeleton className="h-4 w-[150px]" />
              <Skeleton className="h-4 w-[80px]" />
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-4 w-[80px]" />
              <Skeleton className="h-8 w-8 rounded-md ml-auto" />
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <Skeleton className="h-10 w-[350px]" />
      </div>
    </div>
  );
}
