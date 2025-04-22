"use server";

import { prisma } from "@/prisma";
import { mkdir, writeFile } from "fs/promises";
import { revalidatePath } from "next/cache";
import path from "path";

// Define the banner data type
interface BannerData {
  title: string;
  content: string;
  buttonText: string;
  buttonLink: string;
  imageUrl: string;
  type: string;
}

// Default banner data by type
const defaultBannerData: Record<string, BannerData> = {
  hero: {
    title: "Rodrigues re-imagined 11111111111111111",
    content:
      "All over the world, the private sector is a major driver of industrial development, economic growth and social integration and well-being. The Rodrigues Chamber of Commerce and Industry provides a platform of self-organisation and representation to inspire and support Rodriguan businesses in their drive towards an inclusive and sustainable development.",
    buttonText: "JOIN THE CHAMBER",
    buttonLink: "/join",
    imageUrl: "/placeholder.svg?height=600&width=800",
    type: "hero",
  },
  "get-started": {
    title: "Get Started with RCCI",
    content:
      "Begin your journey with the Rodrigues Chamber of Commerce and Industry. Learn about our services, membership benefits, and how we can help your business grow.",
    buttonText: "LEARN MORE",
    buttonLink: "/get-started#benefits",
    imageUrl: "/placeholder.svg?height=600&width=800",
    type: "get-started",
  },
  "news-media": {
    title: "News & Media 111111111",
    content:
      "Stay updated with the latest news, events, and announcements from the Rodrigues Chamber of Commerce and Industry and our business community.",
    buttonText: "VIEW ALL",
    buttonLink: "/news-media",
    imageUrl: "/placeholder.svg?height=600&width=800",
    type: "news-media",
  },
};

/**
 * Get banner data by type
 */
export async function getBannerData(
  type: string = "hero"
): Promise<BannerData> {
  try {
    // Find the active banner of the specified type
    const banner = await prisma.banner.findFirst({
      where: {
        active: true,
        type: type,
      },
      include: { image: true },
    });

    if (!banner) {
      // Return default data if no banner exists for this type
      return defaultBannerData[type] || defaultBannerData.hero;
    }

    // Map the database data to the expected format
    return {
      title: banner.title,
      content: banner.content,
      buttonText: banner.buttonText,
      buttonLink: banner.buttonLink,
      imageUrl: banner.image
        ? banner.image.path
        : "/placeholder.svg?height=600&width=800",
      type: banner.type,
    };
  } catch (error) {
    console.error(`Error reading banner data for type ${type}:`, error);
    throw new Error("Failed to get banner data");
  }
}

/**
 * Get all banner types
 */
export async function getAllBannerTypes(): Promise<string[]> {
  return ["hero", "get-started", "news-media"];
}

/**
 * Save banner image to local storage
 */
async function saveImage(imageFile: File): Promise<string | null> {
  try {
    // Create upload directory if it doesn't exist
    const uploadsDir = path.join(process.cwd(), "public", "uploads", "banners");
    await mkdir(uploadsDir, { recursive: true });

    // Generate unique filename
    const uniqueFilename = `${Date.now()}-${imageFile.name
      .replace(/\s+/g, "-")
      .toLowerCase()}`;
    const imagePath = path.join(uploadsDir, uniqueFilename);

    // Convert file to buffer and save
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    await writeFile(imagePath, buffer);

    // Return the public URL path
    return `/uploads/banners/${uniqueFilename}`;
  } catch (error) {
    console.error("Error saving image:", error);
    return null;
  }
}

/**
 * Save banner data
 */
export async function saveBannerData(
  formData: FormData
): Promise<{ success: boolean; message: string }> {
  try {
    // Extract form data
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const buttonText = formData.get("buttonText") as string;
    const buttonLink = formData.get("buttonLink") as string;
    const bannerTtype = (formData.get("type") as string) || "hero";

    // Get the image file if provided
    const imageFile = formData.get("image") as File | null;
    let imageId: string | null = null;

    // Handle image upload if a new image is provided
    if (imageFile && imageFile.size > 0) {
      const imagePath = await saveImage(imageFile);

      if (imagePath) {
        // Create image record in database
        const image = await prisma.image.create({
          data: {
            fileName: imageFile.name,
            fileSize: imageFile.size,
            mimeType: imageFile.type,
            path: imagePath,
            alt: title, // Use banner title as alt text
          },
        });

        imageId = image.id;
      }
    }

    // Look for an existing active banner of this type
    const existingBanner = await prisma.banner.findFirst({
      where: {
        active: true,
        type: bannerTtype,
      },
    });

    if (existingBanner) {
      // Update existing banner
      await prisma.banner.update({
        where: { id: existingBanner.id },
        data: {
          title,
          content,
          buttonText,
          buttonLink,
          ...(imageId ? { imageId } : {}),
          updatedAt: new Date(),
        },
      });
    } else {
      // Create new banner
      await prisma.banner.create({
        data: {
          title,
          content,
          buttonText,
          buttonLink,
          type: bannerTtype,
          ...(imageId ? { imageId } : {}),
          active: true,
        },
      });
    }

    // Revalidate paths that might display the banner
    revalidatePath("/");
    revalidatePath("/get-started");
    revalidatePath("/news-media");
    revalidatePath("/admin/banner");

    return {
      success: true,
      message: `${
        bannerTtype.charAt(0).toUpperCase() + bannerTtype.slice(1)
      } banner updated successfully`,
    };
  } catch (error) {
    console.error("Error saving banner data:", error);
    return { success: false, message: "Failed to update banner" };
  }
}
