"use client"
import "quill/dist/quill.snow.css";
import React, { useEffect, useState, useTransition } from "react";

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
import { ArrowLeft, ExternalLink, ImageIcon, Plus, Trash } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { addAuthor, getAuthors } from "../../../authors/actions";
import { getArticleById, getCategories, updateArticle } from "../../actions";

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

// Note: This interface should match what's in the actual component
interface ArticleEditorProps {
  content: string;
  onChange: (value: string) => void;
  initialContent?: string;
}

export default function EditArticlePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  // Unwrap params using React.use() with proper typing
  const { id } = React.use(params as any) as { id: string };
  
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(true);
  
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [authorId, setAuthorId] = useState("none");
  const [categoryId, setCategoryId] = useState("");
  const [status, setStatus] = useState("draft");
  const [featuredImage, setFeaturedImage] = useState<File | null>(null);
  const [featuredImagePreview, setFeaturedImagePreview] = useState<string | null>(null);
  const [currentImageId, setCurrentImageId] = useState<string | null>(null);
  
  const [authors, setAuthors] = useState<any[]>([]);
  const [isAddAuthorOpen, setIsAddAuthorOpen] = useState(false);
  const [newAuthor, setNewAuthor] = useState({
    name: "",
    position: "",
    biography: "",
  });
  const [isLoadingAuthors, setIsLoadingAuthors] = useState(true);
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);

  // Load article data on component mount
  useEffect(() => {
    const loadArticle = async () => {
      try {
        const result = await getArticleById(id);
        if (result.article) {
          const article = result.article;
          setTitle(article.title);
          setSlug(article.slug);
          setExcerpt(article.excerpt || "");
          setContent(article.content);
          setAuthorId(article.authorId || "none");
          setCategoryId(article.categoryId || "");
          setStatus(article.status);
          
          if (article.featuredImage) {
            setFeaturedImagePreview(article.featuredImage.path);
            setCurrentImageId(article.featuredImage.id);
          }
        } else {
          toast.error("Failed to load article");
          router.push("/admin/articles");
        }
      } catch (error) {
        console.error("Error loading article:", error);
        toast.error("Error loading article");
        router.push("/admin/articles");
      } finally {
        setIsLoading(false);
      }
    };

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

    const loadCategories = async () => {
      try {
        const result = await getCategories();
        if (result.categories) {
          setCategories(result.categories);
        } else {
          toast.error("Failed to load categories");
        }
      } catch (error) {
        console.error("Error loading categories:", error);
        toast.error("Error loading categories");
      } finally {
        setIsLoadingCategories(false);
      }
    };

    loadArticle();
    loadAuthors();
    loadCategories();
  }, [id, router]);

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
    
    // Only auto-generate slug if it's a new article or the slug hasn't been manually edited
    if (!id || slug === generateSlug(title)) {
      setSlug(generateSlug(newTitle));
    }
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

  const handleRemoveImage = () => {
    setFeaturedImage(null);
    setFeaturedImagePreview(null);
    setCurrentImageId(null);
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

    if (!title || !slug || !content || !categoryId) {
      toast.error("Please fill in all required fields");
      return;
    }

    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append("id", id);
        formData.append("title", title);
        formData.append("slug", slug);
        formData.append("excerpt", excerpt);
        formData.append("content", content);
        formData.append("authorId", authorId);
        formData.append("categoryId", categoryId);
        formData.append("status", status);
        
        if (currentImageId) {
          formData.append("currentImageId", currentImageId);
        }
        
        if (featuredImage) {
          formData.append("featuredImage", featuredImage);
        }

        const result = await updateArticle(formData);

        if (result.success) {
          toast.success("Article updated successfully");
          router.push("/admin/articles");
        } else {
          toast.error(result.error || "Failed to update article");
        }
      } catch (error) {
        console.error("Error updating article:", error);
        toast.error("Error updating article");
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading article...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => router.push("/admin/articles")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-3xl font-bold tracking-tight">Edit Article</h2>
        </div>
        
        <Button asChild variant="outline" size="sm">
          <Link href={`/articles/${slug}`} target="_blank" className="flex items-center gap-2">
            <ExternalLink className="h-4 w-4" />
            View Article
          </Link>
        </Button>
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
                    placeholder="Article Title"
                    value={title}
                    onChange={handleTitleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug</Label>
                  <Input
                    id="slug"
                    placeholder="article-slug"
                    value={slug}
                    onChange={handleSlugChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="excerpt">Excerpt (Optional)</Label>
                  <Textarea
                    id="excerpt"
                    placeholder="Brief summary of the article"
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <DynamicArticleEditor 
                    content={content} 
                    onChange={setContent} 
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Publishing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={categoryId} onValueChange={setCategoryId}>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {isLoadingCategories ? (
                        <SelectItem value="loading" disabled>
                          Loading categories...
                        </SelectItem>
                      ) : categories.length > 0 ? (
                        categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="none" disabled>
                          No categories available
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="author">Author</Label>
                  <div className="flex space-x-2">
                    <Select value={authorId} onValueChange={setAuthorId} disabled={isLoadingAuthors}>
                      <SelectTrigger id="author" className="flex-1">
                        <SelectValue placeholder={isLoadingAuthors ? "Loading authors..." : "Select author"} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        {authors.map((author) => (
                          <SelectItem key={author.id} value={author.id}>
                            {author.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Dialog open={isAddAuthorOpen} onOpenChange={setIsAddAuthorOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="icon">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add New Author</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="author-name">Name</Label>
                            <Input
                              id="author-name"
                              value={newAuthor.name}
                              onChange={(e) => setNewAuthor({ ...newAuthor, name: e.target.value })}
                              placeholder="Author name"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="author-position">Position</Label>
                            <Input
                              id="author-position"
                              value={newAuthor.position}
                              onChange={(e) => setNewAuthor({ ...newAuthor, position: e.target.value })}
                              placeholder="Author position"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="author-bio">Biography</Label>
                            <Textarea
                              id="author-bio"
                              value={newAuthor.biography}
                              onChange={(e) => setNewAuthor({ ...newAuthor, biography: e.target.value })}
                              placeholder="Author biography"
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                          </DialogClose>
                          <Button type="button" onClick={handleAddAuthor} disabled={isPending}>
                            Add Author
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Featured Image</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {featuredImagePreview ? (
                  <div className="space-y-2">
                    <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-gray-200">
                      <Image
                        src={featuredImagePreview.startsWith('data:') ? featuredImagePreview : featuredImagePreview}
                        alt="Featured image preview"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2"
                        onClick={handleRemoveImage}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500">
                      {featuredImage ? featuredImage.name : "Current featured image"}
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed border-gray-200 p-4">
                    <div className="rounded-full bg-gray-100 p-2">
                      <ImageIcon className="h-6 w-6 text-gray-400" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-500">No featured image selected</p>
                      <p className="text-xs text-gray-400">
                        Supported formats: JPEG, PNG, GIF, WebP. Max size: 5MB.
                      </p>
                    </div>
                    <label
                      htmlFor="image-upload"
                      className="cursor-pointer rounded-md bg-gray-50 px-3 py-1.5 text-sm font-medium hover:bg-gray-100"
                    >
                      Choose Image
                    </label>
                    <Input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </div>
                )}
                {featuredImagePreview && (
                  <label className="cursor-pointer text-center block">
                    <Button variant="outline" type="button" size="sm" className="w-full">
                      Change Image
                    </Button>
                    <Input
                      id="image-change"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>
                )}
              </CardContent>
            </Card>

            <CardFooter className="flex justify-between border rounded-lg p-6">
              <Button variant="outline" type="button" onClick={() => router.push("/admin/articles")}>
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Updating..." : "Update Article"}
              </Button>
            </CardFooter>
          </div>
        </div>
      </form>
    </div>
  );
} 