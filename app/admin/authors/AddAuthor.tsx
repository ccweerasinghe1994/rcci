"use client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Upload } from "lucide-react"
import Image from "next/image"
import { useState, useTransition } from "react"
import { addAuthor, uploadAuthorImage } from "./actions"

export function AddAuthor() {
  const [isPending, startTransition] = useTransition()
  const [isOpen, setIsOpen] = useState(false)
  const [authorImage, setAuthorImage] = useState<string>("/uploads/authors/default.png")
  const [previewImage, setPreviewImage] = useState<string>("/uploads/authors/default.png")
  const [isUploading, setIsUploading] = useState(false)
  
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    
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
        setAuthorImage(result.filePath)
      } else {
        console.error("Image upload failed:", result.error)
      }
    } catch (error) {
      console.error("Error uploading image:", error)
    } finally {
      setIsUploading(false)
    }
  }
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    formData.append("authorImage", authorImage)
    
    startTransition(async () => {
      const result = await addAuthor(formData)
      if (result.success) {
        setIsOpen(false)
        setAuthorImage("/uploads/authors/default.png")
        setPreviewImage("/uploads/authors/default.png")
        e.currentTarget.reset()
      } else {
        console.error("Failed to add author:", result.error)
      }
    })
  }
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Author
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Author</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="flex flex-col items-center mb-4">
            <div className="relative w-32 h-32 rounded-full overflow-hidden mb-3">
              <Image 
                src={previewImage} 
                alt="Author preview" 
                width={128} 
                height={128} 
                className="object-cover"
              />
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="file-upload" className="cursor-pointer">
                <div className="flex items-center gap-1 text-sm bg-secondary text-secondary-foreground hover:bg-secondary/80 px-3 py-2 rounded-md">
                  <Upload className="h-4 w-4" />
                  {isUploading ? "Uploading..." : "Upload Image"}
                </div>
              </Label>
              <input
                id="file-upload"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
                disabled={isUploading}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              name="name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="position">Position *</Label>
            <Input
              id="position"
              name="position"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="biography">Biography *</Label>
            <Textarea
              id="biography"
              name="biography"
              rows={4}
              required
            />
          </div>
          <DialogFooter className="pt-4">
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={isPending || isUploading}>
              {isPending ? "Adding..." : "Add Author"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
} 