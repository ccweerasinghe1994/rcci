"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Edit, Plus, RefreshCw, Search, Trash2 } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import { createCategory, deleteCategory, getCategories, updateCategory } from "./actions";

// Required categories for the news-media section
const REQUIRED_CATEGORIES = [
  {
    name: "News",
    slug: "news",
    description: "RCCI in the news and press coverage"
  },
  {
    name: "Daily Comment",
    slug: "daily-comment",
    description: "Daily commentary and insights from RCCI experts"
  },
  {
    name: "Newsletter",
    slug: "newsletter",
    description: "Official RCCI newsletters"
  }
];

export default function CategoriesPage() {
  const [isPending, startTransition] = useTransition();
  const [categories, setCategories] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState<any | null>(null);
  const [categoryToDelete, setCategoryToDelete] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
  });

  // Fetch categories on component mount
  useEffect(() => {
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
        setIsLoading(false);
      }
    };

    loadCategories();
  }, []);

  const filteredCategories = categories.filter(
    (category) => category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditClick = (category: any) => {
    setCategoryToEdit(category);
    setFormData({
      name: category.name,
      slug: category.slug,
      description: category.description || "",
    });
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = (category: any) => {
    setCategoryToDelete(category);
    setIsDeleteDialogOpen(true);
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setFormData({
      ...formData,
      name: newName,
      slug: generateSlug(newName),
    });
  };

  const handleAddCategory = () => {
    if (!formData.name || !formData.slug) {
      toast.error("Name and slug are required");
      return;
    }

    startTransition(async () => {
      try {
        const formDataObj = new FormData();
        formDataObj.append("name", formData.name);
        formDataObj.append("slug", formData.slug);
        formDataObj.append("description", formData.description);

        const result = await createCategory(formDataObj);

        if (result.success) {
          setCategories([...categories, result.category]);
          setIsAddDialogOpen(false);
          setFormData({ name: "", slug: "", description: "" });
          toast.success("Category added successfully");
        } else {
          toast.error(result.error || "Failed to add category");
        }
      } catch (error) {
        console.error("Error adding category:", error);
        toast.error("Error adding category");
      }
    });
  };

  const handleUpdateCategory = () => {
    if (!categoryToEdit || !formData.name || !formData.slug) {
      toast.error("Name and slug are required");
      return;
    }

    startTransition(async () => {
      try {
        const formDataObj = new FormData();
        formDataObj.append("id", categoryToEdit.id);
        formDataObj.append("name", formData.name);
        formDataObj.append("slug", formData.slug);
        formDataObj.append("description", formData.description);

        const result = await updateCategory(formDataObj);

        if (result.success) {
          setCategories(
            categories.map((cat) => (cat.id === categoryToEdit.id ? result.category : cat))
          );
          setIsEditDialogOpen(false);
          setCategoryToEdit(null);
          toast.success("Category updated successfully");
        } else {
          toast.error(result.error || "Failed to update category");
        }
      } catch (error) {
        console.error("Error updating category:", error);
        toast.error("Error updating category");
      }
    });
  };

  const handleDeleteCategory = () => {
    if (!categoryToDelete) return;

    startTransition(async () => {
      try {
        const formDataObj = new FormData();
        formDataObj.append("id", categoryToDelete.id);

        const result = await deleteCategory(formDataObj);

        if (result.success) {
          setCategories(categories.filter((cat) => cat.id !== categoryToDelete.id));
          toast.success("Category deleted successfully");
        } else {
          toast.error(result.error || "Failed to delete category");
        }
      } catch (error) {
        console.error("Error deleting category:", error);
        toast.error("Error deleting category");
      } finally {
        setIsDeleteDialogOpen(false);
        setCategoryToDelete(null);
      }
    });
  };

  const ensureRequiredCategories = () => {
    startTransition(async () => {
      try {
        let addedCount = 0;
        
        // Find missing required categories
        for (const requiredCategory of REQUIRED_CATEGORIES) {
          const exists = categories.some(cat => cat.slug === requiredCategory.slug);
          
          if (!exists) {
            const formDataObj = new FormData();
            formDataObj.append("name", requiredCategory.name);
            formDataObj.append("slug", requiredCategory.slug);
            formDataObj.append("description", requiredCategory.description);
            
            const result = await createCategory(formDataObj);
            
            if (result.success) {
              setCategories(prev => [...prev, result.category]);
              addedCount++;
            }
          }
        }
        
        if (addedCount > 0) {
          toast.success(`Added ${addedCount} missing required categories`);
        } else {
          toast.info("All required categories already exist");
        }
      } catch (error) {
        console.error("Error ensuring required categories:", error);
        toast.error("Error adding required categories");
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Categories</h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={ensureRequiredCategories}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Add Required Categories
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Category
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Category</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Category name"
                    value={formData.name}
                    onChange={handleNameChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug</Label>
                  <Input
                    id="slug"
                    placeholder="category-slug"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea
                    id="description"
                    placeholder="Category description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button onClick={handleAddCategory} disabled={isPending}>
                  {isPending ? "Adding..." : "Add Category"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Manage Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search categories..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <p>Loading categories...</p>
            </div>
          ) : filteredCategories.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Articles</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCategories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell className="font-medium">{category.name}</TableCell>
                    <TableCell>{category.slug}</TableCell>
                    <TableCell className="max-w-[300px] truncate">
                      {category.description || "—"}
                    </TableCell>
                    <TableCell>{category._count?.articles || 0}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditClick(category)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-800"
                          onClick={() => handleDeleteClick(category)}
                          disabled={category._count?.articles > 0}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-6">
              <p className="text-muted-foreground">No categories found.</p>
              {searchTerm && (
                <p className="text-sm text-muted-foreground mt-1">
                  Try a different search term or{" "}
                  <Button variant="link" className="p-0 h-auto" onClick={() => setSearchTerm("")}>
                    clear the search
                  </Button>
                  .
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Category Dialog */}
      {categoryToEdit && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Category</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Name</Label>
                <Input
                  id="edit-name"
                  placeholder="Category name"
                  value={formData.name}
                  onChange={handleNameChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-slug">Slug</Label>
                <Input
                  id="edit-slug"
                  placeholder="category-slug"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-description">Description (Optional)</Label>
                <Textarea
                  id="edit-description"
                  placeholder="Category description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={handleUpdateCategory} disabled={isPending}>
                {isPending ? "Updating..." : "Update Category"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <p>
            Are you sure you want to delete the category{" "}
            <strong>{categoryToDelete?.name}</strong>?
          </p>
          {categoryToDelete && categoryToDelete._count?.articles > 0 && (
            <p className="text-red-500">
              This category cannot be deleted because it is used by {categoryToDelete._count.articles} article(s).
            </p>
          )}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              variant="destructive"
              onClick={handleDeleteCategory}
              disabled={isPending || (categoryToDelete && categoryToDelete._count?.articles > 0)}
            >
              {isPending ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 