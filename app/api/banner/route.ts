import { getBannerData } from "@/app/admin/banner/action";
import { NextResponse } from "next/server";

// GET /api/banner - Get current banner data
export async function GET() {
  try {
    const data = await getBannerData();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in banner API:", error);
    return NextResponse.json(
      { error: "Failed to fetch banner data" },
      { status: 500 }
    );
  }
}
