"use server";

import fs from "fs";
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

// File path for storing banner data
const dataFilePath = path.join(process.cwd(), "data", "banner.json");

/**
 * Get current banner data
 */
export async function getBannerData(): Promise<BannerData> {
  try {
    // Ensure the data directory exists
    const dataDir = path.join(process.cwd(), "data");
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Check if the banner file exists
    if (!fs.existsSync(dataFilePath)) {
      // Return default data if file doesn't exist
      const defaultBannerData: BannerData = {
        title: "Rodrigues re-imagined",
        content:
          "All over the world, the private sector is a major driver of industrial development, economic growth and social integration and well-being. The Rodrigues Chamber of Commerce and Industry provides a platform of self-organisation and representation to inspire and support Rodriguan businesses in their drive towards an inclusive and sustainable development.",
        buttonText: "JOIN THE CHAMBER",
        buttonLink: "/join",
        imageUrl: "/placeholder.svg?height=600&width=800",
      };

      fs.writeFileSync(
        dataFilePath,
        JSON.stringify(defaultBannerData, null, 2)
      );
      return defaultBannerData;
    }

    // Read and parse the banner data
    const fileContent = fs.readFileSync(dataFilePath, "utf-8");
    return JSON.parse(fileContent) as BannerData;
  } catch (error) {
    console.error("Error reading banner data:", error);
    throw new Error("Failed to get banner data");
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

    // Get current banner data for existing image URL
    const currentData = await getBannerData();

    let imageUrl = currentData.imageUrl;

    // Handle image upload if a new image is provided
    if (imageFile && imageFile.size > 0) {
      // In a real implementation, you would upload the image to a storage service
      // and get back a URL. For now, we'll assume the upload succeeded and use a placeholder.

      // Example placeholder for image upload logic:
      // const imageUrl = await uploadImageToStorage(imageFile)

      // For demo purposes, we'll just keep the existing URL or use a placeholder
      imageUrl = `/images/banner/${Date.now()}-${imageFile.name}`;
    }

    // Prepare banner data
    const updatedBannerData: BannerData = {
      title,
      content,
      buttonText,
      buttonLink,
      imageUrl,
    };

    // Save to file
    const dataDir = path.join(process.cwd(), "data");
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    fs.writeFileSync(dataFilePath, JSON.stringify(updatedBannerData, null, 2));

    // Revalidate paths that might display the banner
    revalidatePath("/");
    revalidatePath("/admin/banner");

    return { success: true, message: "Banner updated successfully" };
  } catch (error) {
    console.error("Error saving banner data:", error);
    return { success: false, message: "Failed to update banner" };
  }
}
