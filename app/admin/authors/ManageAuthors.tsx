import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { Edit, Search, Trash2 } from "lucide-react"
import { useState } from "react"

interface Author {
  id: string
  name: string
  position: string
  biography: string
}

interface ManageAuthorsProps {
  authors: Author[]
  onEditAuthor: (author: Author) => void
  onDeleteAuthor: (authorId: string) => void
}

export function ManageAuthors({ authors, onEditAuthor, onDeleteAuthor }: ManageAuthorsProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [isEditAuthorOpen, setIsEditAuthorOpen] = useState(false)
  const [isDeleteAuthorOpen, setIsDeleteAuthorOpen] = useState(false)
  const [currentAuthor, setCurrentAuthor] = useState<Author | null>(null)

  const filteredAuthors = authors.filter(
    (author) =>
      author.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      author.position.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleEditAuthor = () => {
    if (!currentAuthor) return
    onEditAuthor(currentAuthor)
    setIsEditAuthorOpen(false)
  }

  const handleDeleteAuthor = () => {
    if (!currentAuthor) return
    onDeleteAuthor(currentAuthor.id)
    setIsDeleteAuthorOpen(false)
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Authors Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-6">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search authors..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Biography</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAuthors.map((author) => (
                  <TableRow key={author.id}>
                    <TableCell className="font-medium">{author.name}</TableCell>
                    <TableCell>{author.position}</TableCell>
                    <TableCell className="max-w-xs truncate">{author.biography}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setCurrentAuthor(author)
                            setIsEditAuthorOpen(true)
                          }}
                        >
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-600"
                          onClick={() => {
                            setCurrentAuthor(author)
                            setIsDeleteAuthorOpen(true)
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Edit Author Dialog */}
      <Dialog open={isEditAuthorOpen} onOpenChange={setIsEditAuthorOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Author</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Name</Label>
              <Input
                id="edit-name"
                value={currentAuthor?.name || ""}
                onChange={(e) => setCurrentAuthor(currentAuthor ? { ...currentAuthor, name: e.target.value } : null)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-position">Position</Label>
              <Input
                id="edit-position"
                value={currentAuthor?.position || ""}
                onChange={(e) =>
                  setCurrentAuthor(currentAuthor ? { ...currentAuthor, position: e.target.value } : null)
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-biography">Biography</Label>
              <Textarea
                id="edit-biography"
                rows={4}
                value={currentAuthor?.biography || ""}
                onChange={(e) =>
                  setCurrentAuthor(currentAuthor ? { ...currentAuthor, biography: e.target.value } : null)
                }
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleEditAuthor}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Author Dialog */}
      <Dialog open={isDeleteAuthorOpen} onOpenChange={setIsDeleteAuthorOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Author</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>
              Are you sure you want to delete <span className="font-semibold">{currentAuthor?.name}</span>? This action
              cannot be undone.
            </p>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button variant="destructive" onClick={handleDeleteAuthor}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
} 