import { User as PrismaUser } from "@/lib/generated/prisma"
import Link from "next/link"

import { Icons } from "@/components/shared/icons"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

// Extend the Prisma User type with additional fields
interface User extends PrismaUser {
  role?: string;
}

interface UserCardProps {
  user: User
  onDelete: (id: string) => void
}

export function UserCard({ user, onDelete }: UserCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={user.image || ""} alt={user.name || ""} />
            <AvatarFallback>
              <Icons.user className="h-6 w-6" />
            </AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <h3 className="text-lg font-semibold">{user.name}</h3>
            <p className="text-sm text-muted-foreground">{user.email}</p>
            <p className="text-xs text-muted-foreground">
              Role: {user.role || "User"}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t bg-muted/50 p-3">
        <Button
          variant="outline"
          size="sm"
          className="h-8"
          asChild
        >
          <Link href={`/admin/users/edit/${user.id}`}>
            <Icons.edit className="mr-2 h-3.5 w-3.5" />
            Edit
          </Link>
        </Button>
        <Button
          variant="destructive"
          size="sm"
          className="h-8"
          onClick={() => onDelete(user.id)}
        >
          <Icons.delete className="mr-2 h-3.5 w-3.5" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  )
} 