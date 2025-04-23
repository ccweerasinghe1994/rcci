"use client"
import "quill/dist/quill.snow.css";
import type React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, ImageIcon, Plus } from "lucide-react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import { addAuthor, getAuthors } from "../../authors/actions";
import { createArticle } from "../actions";

// Dynamically import the article editor component to avoid SSR issues
const DynamicArticleEditor = dynamic(
  () => import("@/components/ui/article-editor").then((mod) => mod.ArticleEditor),
  {
    ssr: false,
    loading: () => (
      <div className="border rounded-md min-h-[300px] flex items-center justify-center bg-gray-50">
        <p className="text-gray-400">Loading editor...</p>
      </div>
    ),
  }
);

export default function CreateArticlePage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("draft");
  const [featuredImage, setFeaturedImage] = useState<File | null>(null);
  const [featuredImagePreview, setFeaturedImagePreview] = useState<string | null>(null);
  const [authors, setAuthors] = useState<any[]>([]);
  const [isAddAuthorOpen, setIsAddAuthorOpen] = useState(false);
  const [newAuthor, setNewAuthor] = useState({
    name: "",
    position: "",
    biography: "",
  });
  const [isLoadingAuthors, setIsLoadingAuthors] = useState(true);

  // Load authors on component mount
  useEffect(() => {
    const loadAuthors = async () => {
      try {
        const result = await getAuthors();
        if (result.authors) {
          setAuthors(result.authors);
        } else {
          toast.error("Failed to load authors");
        }
      } catch (error) {
        console.error("Error loading authors:", error);
        toast.error("Error loading authors");
      } finally {
        setIsLoadingAuthors(false);
      }
    };

    loadAuthors();
  }, []);

  // Generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    setSlug(generateSlug(newTitle));
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSlug(e.target.value.replace(/\s+/g, "-").toLowerCase());
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFeaturedImage(file);

      // Create preview URL
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setFeaturedImagePreview(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddAuthor = async () => {
    if (!newAuthor.name || !newAuthor.position || !newAuthor.biography) {
      toast.error("Please fill in all author fields");
      return;
    }

    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append("name", newAuthor.name);
        formData.append("position", newAuthor.position);
        formData.append("biography", newAuthor.biography);

        const result = await addAuthor(formData);

        if (result.success && result.author) {
          setAuthors([...authors, result.author]);
          setAuthorId(result.author.id);
          setNewAuthor({ name: "", position: "", biography: "" });
          setIsAddAuthorOpen(false);
          toast.success("Author added successfully");
        } else {
          toast.error(result.error || "Failed to add author");
        }
      } catch (error) {
        console.error("Error adding author:", error);
        toast.error("Error adding author");
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !slug || !content || !category) {
      toast.error("Please fill in all required fields");
      return;
    }

    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("slug", slug);
        formData.append("excerpt", excerpt);
        formData.append("content", content);
        formData.append("authorId", authorId);
        formData.append("category", category);
        formData.append("status", status);
        
        if (featuredImage) {
          formData.append("featuredImage", featuredImage);
        }

        const result = await createArticle(formData);

        if (result.success) {
          toast.success("Article created successfully");
          router.push("/admin/articles");
        } else {
          toast.error(result.error || "Failed to create article");
        }
      } catch (error) {
        console.error("Error creating article:", error);
        toast.error("Error creating article");
      }
    });
  };

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
                <DynamicArticleEditor 
                  content={content}
                  onChange={setContent}
                />
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
                          <Button onClick={handleAddAuthor} disabled={isPending}>
                            {isPending ? "Adding..." : "Add Author"}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <Select value={authorId} onValueChange={setAuthorId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select author" />
                    </SelectTrigger>
                    <SelectContent>
                      {isLoadingAuthors ? (
                        <SelectItem value="loading" disabled>
                          Loading authors...
                        </SelectItem>
                      ) : authors.length > 0 ? (
                        authors.map((author) => (
                          <SelectItem key={author.id} value={author.id}>
                            {author.name} - {author.position}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="none" disabled>
                          No authors available
                        </SelectItem>
                      )}
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
                      <SelectItem value="economy">Economy</SelectItem>
                      <SelectItem value="dailyComments">Daily Comments</SelectItem>
                      <SelectItem value="getStarted">Get Started</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => router.push("/admin/articles")}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isPending}>
                  {isPending ? "Saving..." : status === "published" ? "Publish" : "Save Draft"}
                </Button>
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
                          setFeaturedImage(null);
                          setFeaturedImagePreview(null);
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
  );
}
