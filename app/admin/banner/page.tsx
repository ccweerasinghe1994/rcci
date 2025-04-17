"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, ImageIcon } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Define the banner data type
interface BannerData {
  title: string
  content: string
  buttonText: string
  buttonLink: string
  imageUrl: string
}

// Default banner data (fallback)
const defaultBannerData: BannerData = {
  title: "Rodrigues re-imagined",
  content:
    "All over the world, the private sector is a major driver of industrial development, economic growth and social integration and well-being. The Rodrigues Chamber of Commerce and Industry provides a platform of self-organisation and representation to inspire and support Rodriguan businesses in their drive towards an inclusive and sustainable development.",
  buttonText: "JOIN THE CHAMBER",
  buttonLink: "/join",
  imageUrl: "/placeholder.svg?height=600&width=800",
}

export default function BannerPage() {
  const router = useRouter()
  const [bannerData, setBannerData] = useState<BannerData>(defaultBannerData)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("edit")

  // Fetch banner data on component mount
  useEffect(() => {
    const fetchBannerData = async () => {
      setIsLoading(true)
      try {
        const response = await fetch("/api/banner")
        if (!response.ok) {
          throw new Error("Failed to fetch banner data")
        }
        const data = await response.json()
        setBannerData(data)
      } catch (error) {
        console.error("Error fetching banner data:", error)
        // Fall back to default data on error
        setBannerData(defaultBannerData)
      } finally {
        setIsLoading(false)
      }
    }

    fetchBannerData()
  }, [])

  // Handle image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]

      // Create preview URL
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setPreviewImage(event.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      // In a real app, you would upload the image first if changed
      // and get back a URL to use in the banner data

      // For now, we'll just simulate the image upload
      const updatedBannerData = {
        ...bannerData,
        // If there's a new image, we'd use its URL here
        // For now, we'll just keep the existing URL
        imageUrl: previewImage ? bannerData.imageUrl : bannerData.imageUrl,
      }

      // Send the updated data to the API
      const response = await fetch("/api/banner", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedBannerData),
      })

      if (!response.ok) {
        throw new Error("Failed to update banner")
      }

      alert("Banner updated successfully!")
    } catch (error) {
      console.error("Error updating banner:", error)
      alert("Failed to update banner. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => router.push("/admin")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-3xl font-bold tracking-tight">Manage Hero Banner</h2>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="edit">Edit</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="edit" className="space-y-6">
          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <CardTitle>Banner Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={bannerData.title}
                    onChange={(e) => setBannerData({ ...bannerData, title: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    rows={6}
                    value={bannerData.content}
                    onChange={(e) => setBannerData({ ...bannerData, content: e.target.value })}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="buttonText">Button Text</Label>
                    <Input
                      id="buttonText"
                      value={bannerData.buttonText}
                      onChange={(e) => setBannerData({ ...bannerData, buttonText: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="buttonLink">Button Link</Label>
                    <Input
                      id="buttonLink"
                      value={bannerData.buttonLink}
                      onChange={(e) => setBannerData({ ...bannerData, buttonLink: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Banner Image</Label>
                  <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-md p-6 relative">
                    <input
                      type="file"
                      id="banner-image"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      accept="image/*"
                      onChange={handleImageChange}
                    />

                    {previewImage ? (
                      <div className="w-full">
                        <img
                          src={previewImage || "/placeholder.svg"}
                          alt="Banner preview"
                          className="w-full h-auto max-h-[300px] object-cover rounded-md mb-2"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-2 w-full"
                          type="button"
                          onClick={() => setPreviewImage(null)}
                        >
                          Remove Image
                        </Button>
                      </div>
                    ) : (
                      <>
                        <ImageIcon className="h-10 w-10 text-muted-foreground mb-2" />
                        <div className="flex flex-col items-center">
                          <p className="font-medium">Upload banner image</p>
                          <p className="text-sm text-muted-foreground">Drag and drop or click to upload</p>
                          <p className="text-xs text-muted-foreground mt-1">Recommended size: 1920x1080px</p>
                        </div>
                      </>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">Current image: {bannerData.imageUrl}</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" type="button" onClick={() => router.push("/admin")}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSaving}>
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </TabsContent>

        <TabsContent value="preview">
          <Card>
            <CardHeader>
              <CardTitle>Banner Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative bg-[#001a3a] text-white rounded-lg overflow-hidden">
                <div className="container flex py-16">
                  <div className="w-full md:w-1/2 space-y-6 z-10">
                    <h1 className="text-4xl font-bold">{bannerData.title}</h1>
                    <p className="text-base">{bannerData.content}</p>
                    <div className="pt-4">
                      <div className="inline-block border border-white px-8 py-3 uppercase font-medium tracking-wide">
                        {bannerData.buttonText}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block absolute top-0 right-0 w-1/2 h-full">
                    <img
                      src={previewImage || bannerData.imageUrl}
                      alt="Banner background"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-[#001a3a]/50"></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
