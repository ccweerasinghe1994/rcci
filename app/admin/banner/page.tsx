"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, ImageIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useFormStatus } from "react-dom"
import { getAllBannerTypes, getBannerData, saveBannerData } from "./action"

// Define the banner data type
interface BannerData {
  title: string
  content: string
  buttonText: string
  buttonLink: string
  imageUrl: string
  type: string
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Saving..." : "Save Changes"}
    </Button>
  )
}

// Banner form component
function BannerForm({ bannerData, onSubmit, formSubmitStatus, previewImage, setPreviewImage, handleImageChange }: {
  bannerData: BannerData;
  onSubmit: (formData: FormData) => Promise<void>;
  formSubmitStatus: { success?: boolean; message?: string } | null;
  previewImage: string | null;
  setPreviewImage: (url: string | null) => void;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const [activeTab, setActiveTab] = useState("edit")
  const router = useRouter()

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList>
        <TabsTrigger value="edit">Edit</TabsTrigger>
        <TabsTrigger value="preview">Preview</TabsTrigger>
      </TabsList>

      <TabsContent value="edit" className="space-y-6">
        <form action={onSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Banner Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <input type="hidden" name="type" value={bannerData.type} />
              
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  defaultValue={bannerData.title}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  name="content"
                  rows={6}
                  defaultValue={bannerData.content}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="buttonText">Button Text</Label>
                  <Input
                    id="buttonText"
                    name="buttonText"
                    defaultValue={bannerData.buttonText}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="buttonLink">Button Link</Label>
                  <Input
                    id="buttonLink"
                    name="buttonLink"
                    defaultValue={bannerData.buttonLink}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Banner Image</Label>
                <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-md p-6 relative">
                  <input
                    type="file"
                    id="image"
                    name="image"
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
              <SubmitButton />
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
  )
}

export default function BannerPage() {
  const router = useRouter()
  const [bannerTypes, setBannerTypes] = useState<string[]>(['hero', 'get-started', 'news-media'])
  const [activeType, setActiveType] = useState<string>('hero')
  const [bannerData, setBannerData] = useState<Record<string, BannerData>>({})
  const [previewImages, setPreviewImages] = useState<Record<string, string | null>>({})
  const [isLoading, setIsLoading] = useState(true)
  const [formSubmitStatus, setFormSubmitStatus] = useState<{ success?: boolean; message?: string } | null>(null)

  // Format banner type for display
  const formatBannerType = (type: string) => {
    return type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  }

  // Fetch banner data on component mount
  useEffect(() => {
    const fetchAllBannerData = async () => {
      setIsLoading(true)
      try {
        // Get all banner types
        const types = await getAllBannerTypes()
        setBannerTypes(types)
        
        // Fetch data for each banner type
        const bannersData: Record<string, BannerData> = {}
        const previewImgs: Record<string, string | null> = {}
        
        for (const type of types) {
          const data = await getBannerData(type)
          bannersData[type] = data
          previewImgs[type] = null
        }
        
        setBannerData(bannersData)
        setPreviewImages(previewImgs)
      } catch (error) {
        console.error("Error fetching banner data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAllBannerData()
  }, [])

  // Handle image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]

      // Create preview URL
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setPreviewImages(prev => ({
            ...prev,
            [activeType]: event.target?.result as string
          }))
        }
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle form submission with server action
  const handleSubmit = async (formData: FormData) => {
    const result = await saveBannerData(formData)
    setFormSubmitStatus(result)
    
    if (result.success) {
      // Refresh data after successful save
      try {
        const type = formData.get('type') as string
        const updatedData = await getBannerData(type)
        setBannerData(prev => ({
          ...prev,
          [type]: updatedData
        }))
        // Clear preview image for this type
        setPreviewImages(prev => ({
          ...prev,
          [type]: null
        }))
      } catch (error) {
        console.error("Error fetching updated banner data:", error)
      }
    }

    // Clear status message after 3 seconds
    setTimeout(() => {
      setFormSubmitStatus(null)
    }, 3000)
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
        <h2 className="text-3xl font-bold tracking-tight">Manage Banners</h2>
      </div>

      {formSubmitStatus && (
        <div className={`p-4 rounded-md ${formSubmitStatus.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
          {formSubmitStatus.message}
        </div>
      )}

      <Tabs value={activeType} onValueChange={setActiveType}>
        <TabsList className="mb-6">
          {bannerTypes.map(type => (
            <TabsTrigger key={type} value={type}>
              {formatBannerType(type)}
            </TabsTrigger>
          ))}
        </TabsList>

        {bannerTypes.map(type => (
          <TabsContent key={type} value={type}>
            {bannerData[type] && (
              <BannerForm 
                bannerData={bannerData[type]}
                onSubmit={handleSubmit}
                formSubmitStatus={formSubmitStatus}
                previewImage={previewImages[type]}
                setPreviewImage={(url) => setPreviewImages(prev => ({ ...prev, [type]: url }))}
                handleImageChange={handleImageChange}
              />
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
