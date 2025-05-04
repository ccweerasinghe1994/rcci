"use client";

import { User } from "@/lib/generated/prisma";
import { format } from "date-fns";
import {
  Check,
  MoreHorizontal,
  Pencil,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Trash,
  User as UserIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { deleteUser, updateUserStatus } from "@/app/admin/users/actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Pagination } from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";

export interface UsersTableProps {
  users: User[];
  totalPages: number;
  currentPage: number;
  searchParams: { [key: string]: string | string[] | undefined };
}

export function UsersTable({
  users,
  totalPages,
  currentPage,
  searchParams,
}: UsersTableProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<{ [key: string]: boolean }>({});
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams();

    // Preserve existing search params
    for (const [key, value] of Object.entries(searchParams)) {
      if (key !== "page" && value) {
        params.set(key, Array.isArray(value) ? value[0] : value);
      }
    }

    // Add new page
    params.set("page", page.toString());

    router.push(`/admin/users?${params.toString()}`);
  };

  const handleDeleteUser = async () => {
    if (!userToDelete) return;

    try {
      setIsLoading({ ...isLoading, [`delete-${userToDelete.id}`]: true });

      const result = await deleteUser(userToDelete.id);

      if (!result.success) {
        throw new Error(result.error || "Failed to delete user");
      }

      toast.success(`${userToDelete.name} has been deleted successfully.`);

      // Refresh the current route
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete user. Please try again.");
    } finally {
      setIsLoading({ ...isLoading, [`delete-${userToDelete.id}`]: false });
      setIsDeleteDialogOpen(false);
      setUserToDelete(null);
    }
  };

  const handleStatusChange = async (userId: string, status: string) => {
    try {
      setIsLoading({ ...isLoading, [`status-${userId}`]: true });

      const result = await updateUserStatus(userId, status);

      if (!result.success) {
        throw new Error("Failed to update user status");
      }

      toast.success(`User status has been updated to ${status}.`);

      // Refresh the current route
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update user status. Please try again.");
    } finally {
      setIsLoading({ ...isLoading, [`status-${userId}`]: false });
    }
  };

  const getUserStatusBadge = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return (
          <Badge variant={"default"} className="flex items-center gap-1">
            <Check className="h-3 w-3" /> Active
          </Badge>
        );
      case "PENDING":
        return (
          <Badge variant={"secondary"} className="flex items-center gap-1">
            <Shield className="h-3 w-3" /> Pending
          </Badge>
        );
      case "SUSPENDED":
        return (
          <Badge variant={"destructive"} className="flex items-center gap-1">
            <ShieldAlert className="h-3 w-3" /> Suspended
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="flex items-center gap-1">
            <UserIcon className="h-3 w-3" /> {status}
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Membership</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No users found.
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{getUserStatusBadge(user.status)}</TableCell>
                  <TableCell>
                    {user.membershipType ? (
                      <Badge variant="outline">{user.membershipType}</Badge>
                    ) : (
                      <Badge variant="outline">Free</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {format(new Date(user.createdAt), "MMM dd, yyyy")}
                  </TableCell>
                  <TableCell>
                    {user.role === "ADMIN" ? (
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1"
                      >
                        <ShieldCheck className="h-3 w-3" />
                        Admin
                      </Badge>
                    ) : user.role === "MODERATOR" ? (
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1"
                      >
                        <Shield className="h-3 w-3" />
                        Moderator
                      </Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1"
                      >
                        <UserIcon className="h-3 w-3" />
                        User
                      </Badge>
                    )}
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
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => router.push(`/admin/users/${user.id}`)}
                        >
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit user
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel>Set Status</DropdownMenuLabel>
                        <DropdownMenuItem
                          disabled={
                            user.status === "ACTIVE" ||
                            !!isLoading[`status-${user.id}`]
                          }
                          onClick={() => handleStatusChange(user.id, "ACTIVE")}
                        >
                          {isLoading[`status-${user.id}`]
                            ? "Loading..."
                            : "Set as Active"}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          disabled={
                            user.status === "PENDING" ||
                            !!isLoading[`status-${user.id}`]
                          }
                          onClick={() => handleStatusChange(user.id, "PENDING")}
                        >
                          {isLoading[`status-${user.id}`]
                            ? "Loading..."
                            : "Set as Pending"}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          disabled={
                            user.status === "SUSPENDED" ||
                            !!isLoading[`status-${user.id}`]
                          }
                          onClick={() =>
                            handleStatusChange(user.id, "SUSPENDED")
                          }
                        >
                          {isLoading[`status-${user.id}`]
                            ? "Loading..."
                            : "Set as Suspended"}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => {
                            setUserToDelete(user);
                            setIsDeleteDialogOpen(true);
                          }}
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          Delete user
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

      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this user?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              user account and remove their data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteUser}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={!!isLoading[`delete-${userToDelete?.id}`]}
            >
              {isLoading[`delete-${userToDelete?.id}`]
                ? "Deleting..."
                : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
