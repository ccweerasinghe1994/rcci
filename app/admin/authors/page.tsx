"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, Edit, Trash2 } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

// Sample data for authors
const initialAuthors = [
  {
    id: "1",
    name: "John Doe",
    position: "Editor-in-Chief",
    biography: "John has been writing about business and economics for over 15 years.",
  },
  {
    id: "2",
    name: "Jane Smith",
    position: "Senior Writer",
    biography: "Jane specializes in technology and innovation topics.",
  },
  {
    id: "3",
    name: "Robert Johnson",
    position: "Contributing Editor",
    biography: "Robert brings insights from his 20 years of experience in the industry.",
  },
]

export default function AuthorsPage() {
  const [authors, setAuthors] = useState(initialAuthors)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddAuthorOpen, setIsAddAuthorOpen] = useState(false)
  const [isEditAuthorOpen, setIsEditAuthorOpen] = useState(false)
  const [isDeleteAuthorOpen, setIsDeleteAuthorOpen] = useState(false)
  const [currentAuthor, setCurrentAuthor] = useState<(typeof authors)[0] | null>(null)
  const [newAuthor, setNewAuthor] = useState({
    name: "",
    position: "",
    biography: "",
  })

  const filteredAuthors = authors.filter(
    (author) =>
      author.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      author.position.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddAuthor = () => {
    const id = Math.random().toString(36).substring(2, 9)
    setAuthors([...authors, { id, ...newAuthor }])
    setNewAuthor({ name: "", position: "", biography: "" })
    setIsAddAuthorOpen(false)
  }

  const handleEditAuthor = () => {
    if (!currentAuthor) return
    setAuthors(authors.map((author) => (author.id === currentAuthor.id ? currentAuthor : author)))
    setIsEditAuthorOpen(false)
  }

  const handleDeleteAuthor = () => {
    if (!currentAuthor) return
    setAuthors(authors.filter((author) => author.id !== currentAuthor.id))
    setIsDeleteAuthorOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Authors</h2>
        <Dialog open={isAddAuthorOpen} onOpenChange={setIsAddAuthorOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Author
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Author</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={newAuthor.name}
                  onChange={(e) => setNewAuthor({ ...newAuthor, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">Position</Label>
                <Input
                  id="position"
                  value={newAuthor.position}
                  onChange={(e) => setNewAuthor({ ...newAuthor, position: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="biography">Biography</Label>
                <Textarea
                  id="biography"
                  rows={4}
                  value={newAuthor.biography}
                  onChange={(e) => setNewAuthor({ ...newAuthor, biography: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={handleAddAuthor}>Add Author</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

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
    </div>
  )
}
