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
}

/**
 * Get current banner data
 */
export async function getBannerData(): Promise<BannerData> {
  try {
    // Find the active banner
    const banner = await prisma.banner.findFirst({
      where: { active: true },
      include: { image: true },
    });

    if (!banner) {
      // Return default data if no banner exists
      const defaultBannerData: BannerData = {
        title: "Rodrigues re-imagined",
        content:
          "All over the world, the private sector is a major driver of industrial development, economic growth and social integration and well-being. The Rodrigues Chamber of Commerce and Industry provides a platform of self-organisation and representation to inspire and support Rodriguan businesses in their drive towards an inclusive and sustainable development.",
        buttonText: "JOIN THE CHAMBER",
        buttonLink: "/join",
        imageUrl: "/placeholder.svg?height=600&width=800",
      };

      return defaultBannerData;
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
    };
  } catch (error) {
    console.error("Error reading banner data:", error);
    throw new Error("Failed to get banner data");
  }
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

    // Look for an existing active banner
    const existingBanner = await prisma.banner.findFirst({
      where: { active: true },
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
          ...(imageId ? { imageId } : {}),
          active: true,
        },
      });
    }

    // Revalidate paths that might display the banner
    revalidatePath("/");
    revalidatePath("/admin/banner");

    return { success: true, message: "Banner updated successfully" };
  } catch (error) {
    console.error("Error saving banner data:", error);
    return { success: false, message: "Failed to update banner" };
  }
}
