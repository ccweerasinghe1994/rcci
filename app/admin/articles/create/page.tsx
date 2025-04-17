"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, ImageIcon, Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
// import { RichTextEditor } from "@/components/rich-text-editor"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample data for authors - in a real app, this would come from an API
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

export default function CreateArticlePage() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [content, setContent] = useState("")
  const [authorId, setAuthorId] = useState("")
  const [category, setCategory] = useState("")
  const [status, setStatus] = useState("draft")
  const [featuredImage, setFeaturedImage] = useState<File | null>(null)
  const [featuredImagePreview, setFeaturedImagePreview] = useState<string | null>(null)
  const [authors, setAuthors] = useState(initialAuthors)
  const [isAddAuthorOpen, setIsAddAuthorOpen] = useState(false)
  const [newAuthor, setNewAuthor] = useState({
    name: "",
    position: "",
    biography: "",
  })

  // Generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim()
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value
    setTitle(newTitle)
    setSlug(generateSlug(newTitle))
  }

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSlug(e.target.value.replace(/\s+/g, "-").toLowerCase())
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setFeaturedImage(file)

      // Create preview URL
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setFeaturedImagePreview(event.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAddAuthor = () => {
    const id = Math.random().toString(36).substring(2, 9)
    const author = { id, ...newAuthor }
    setAuthors([...authors, author])
    setAuthorId(author.id)
    setNewAuthor({ name: "", position: "", biography: "" })
    setIsAddAuthorOpen(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Get the author object based on authorId
    const selectedAuthor = authors.find((author) => author.id === authorId)

    // Here you would typically send the data to your backend
    console.log({
      title,
      slug,
      excerpt,
      content,
      author: selectedAuthor,
      category,
      status,
      featuredImage,
    })

    alert("Article saved successfully!")
    router.push("/admin/articles")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => router.push("/admin/articles")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-3xl font-bold tracking-tight">Create New Article</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Article Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter article title"
                    value={title}
                    onChange={handleTitleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug</Label>
                  <Input id="slug" placeholder="article-slug" value={slug} onChange={handleSlugChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    placeholder="Brief summary of the article"
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Article Body</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="editor">
                  <TabsList className="mb-4">
                    <TabsTrigger value="editor">Rich Editor</TabsTrigger>
                    <TabsTrigger value="preview">Preview</TabsTrigger>
                  </TabsList>
                  <TabsContent value="editor">
                    {/* <RichTextEditor content={content} onChange={setContent} /> */}
                  </TabsContent>
                  <TabsContent value="preview">
                    <div className="prose max-w-none border rounded-md p-4 min-h-[300px]">
                      {content ? (
                        <div dangerouslySetInnerHTML={{ __html: content }} />
                      ) : (
                        <p className="text-muted-foreground">No content to preview</p>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Publish</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="author">Author</Label>
                    <Dialog open={isAddAuthorOpen} onOpenChange={setIsAddAuthorOpen}>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 px-2">
                          <Plus className="h-4 w-4 mr-1" />
                          Add New
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
                  <Select value={authorId} onValueChange={setAuthorId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select author" />
                    </SelectTrigger>
                    <SelectContent>
                      {authors.map((author) => (
                        <SelectItem key={author.id} value={author.id}>
                          {author.name} - {author.position}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="news">News</SelectItem>
                      <SelectItem value="events">Events</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="economy">Economy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => router.push("/admin/articles")}>
                  Cancel
                </Button>
                <Button type="submit">{status === "published" ? "Publish" : "Save Draft"}</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Featured Image</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-md p-6 relative">
                  <input
                    type="file"
                    id="featured-image"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    accept="image/*"
                    onChange={handleImageChange}
                  />

                  {featuredImagePreview ? (
                    <div className="w-full">
                      <img
                        src={featuredImagePreview || "/placeholder.svg"}
                        alt="Featured image preview"
                        className="w-full h-auto rounded-md mb-2"
                      />
                      <p className="text-sm text-center text-muted-foreground">{featuredImage?.name}</p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2 w-full"
                        type="button"
                        onClick={() => {
                          setFeaturedImage(null)
                          setFeaturedImagePreview(null)
                        }}
                      >
                        Remove Image
                      </Button>
                    </div>
                  ) : (
                    <>
                      <ImageIcon className="h-10 w-10 text-muted-foreground mb-2" />
                      <div className="flex flex-col items-center">
                        <p className="font-medium">Upload featured image</p>
                        <p className="text-sm text-muted-foreground">Drag and drop or click to upload</p>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}
