"use client"

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
import { Edit, Search, Trash2, Upload } from "lucide-react"
import Image from "next/image"
import { useState, useTransition } from "react"
import { deleteAuthor, updateAuthor, uploadAuthorImage } from "./actions"

interface Author {
  id: string
  name: string
  position: string
  biography: string
  authorImage?: string | null
  createdAt: Date
  updatedAt: Date
}

interface ManageAuthorsProps {
  authors: Author[]
}

export function ManageAuthors({ authors }: ManageAuthorsProps) {
  const [isPending, startTransition] = useTransition()
  const [searchTerm, setSearchTerm] = useState("")
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [currentAuthor, setCurrentAuthor] = useState<Author | null>(null)
  const [previewImage, setPreviewImage] = useState<string>("")
  const [isUploading, setIsUploading] = useState(false)

  const filteredAuthors = authors.filter(
    (author) =>
      author.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      author.position.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleEditClick = (author: Author) => {
    setCurrentAuthor(author)
    setPreviewImage(author.authorImage || "/uploads/authors/default.png")
    setIsEditOpen(true)
  }

  const handleDeleteClick = (author: Author) => {
    setCurrentAuthor(author)
    setIsDeleteOpen(true)
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !currentAuthor) return
    
    // Show local preview
    const reader = new FileReader()
    reader.onload = (event) => {
      if (event.target?.result) {
        setPreviewImage(event.target.result as string)
      }
    }
    reader.readAsDataURL(file)
    
    // Upload the file
    setIsUploading(true)
    const formData = new FormData()
    formData.append("file", file)
    
    try {
      const result = await uploadAuthorImage(formData)
      if (result.success && result.filePath) {
        setCurrentAuthor({
          ...currentAuthor,
          authorImage: result.filePath
        })
      } else {
        console.error("Image upload failed:", result.error)
      }
    } catch (error) {
      console.error("Error uploading image:", error)
    } finally {
      setIsUploading(false)
    }
  }

  const handleUpdateSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!currentAuthor) return
    
    const formData = new FormData(e.currentTarget)
    formData.append("id", currentAuthor.id)
    formData.append("authorImage", currentAuthor.authorImage || "")
    
    startTransition(async () => {
      const result = await updateAuthor(formData)
      if (result.success) {
        setIsEditOpen(false)
      } else {
        console.error("Failed to update author:", result.error)
      }
    })
  }

  const handleDeleteSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!currentAuthor) return
    
    const formData = new FormData()
    formData.append("id", currentAuthor.id)
    
    startTransition(async () => {
      const result = await deleteAuthor(formData)
      if (result.success) {
        setIsDeleteOpen(false)
      } else {
        console.error("Failed to delete author:", result.error)
      }
    })
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
                  <TableHead>Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Biography</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAuthors.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-6 italic text-muted-foreground">
                      No authors found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredAuthors.map((author) => (
                    <TableRow key={author.id}>
                      <TableCell>
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-secondary">
                          {author.authorImage ? (
                            <Image
                              src={author.authorImage}
                              alt={author.name}
                              width={40}
                              height={40}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                              {author.name.charAt(0).toUpperCase()}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{author.name}</TableCell>
                      <TableCell>{author.position}</TableCell>
                      <TableCell className="max-w-xs truncate">{author.biography}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEditClick(author)}
                          >
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive"
                            onClick={() => handleDeleteClick(author)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Edit Author Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Author</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpdateSubmit} className="space-y-4 py-4">
            <div className="flex flex-col items-center mb-4">
              <div className="relative w-32 h-32 rounded-full overflow-hidden mb-3">
                {previewImage ? (
                  <Image 
                    src={previewImage} 
                    alt="Author preview" 
                    width={128} 
                    height={128} 
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-secondary flex items-center justify-center text-2xl">
                    {currentAuthor?.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Label htmlFor="edit-file-upload" className="cursor-pointer">
                  <div className="flex items-center gap-1 text-sm bg-secondary text-secondary-foreground hover:bg-secondary/80 px-3 py-2 rounded-md">
                    <Upload className="h-4 w-4" />
                    {isUploading ? "Uploading..." : "Change Image"}
                  </div>
                </Label>
                <input
                  id="edit-file-upload"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                  disabled={isUploading || !currentAuthor}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-name">Name *</Label>
              <Input
                id="edit-name"
                name="name"
                defaultValue={currentAuthor?.name}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-position">Position *</Label>
              <Input
                id="edit-position"
                name="position"
                defaultValue={currentAuthor?.position}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-biography">Biography *</Label>
              <Textarea
                id="edit-biography"
                name="biography"
                rows={4}
                defaultValue={currentAuthor?.biography}
                required
              />
            </div>
            <DialogFooter className="pt-4">
              <DialogClose asChild>
                <Button type="button" variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" disabled={isPending || isUploading}>
                {isPending ? "Saving..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Author Dialog */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Author</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleDeleteSubmit}>
            <div className="py-4">
              <p>
                Are you sure you want to delete <span className="font-semibold">{currentAuthor?.name}</span>? This action
                cannot be undone.
              </p>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" variant="destructive" disabled={isPending}>
                {isPending ? "Deleting..." : "Delete"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
} 