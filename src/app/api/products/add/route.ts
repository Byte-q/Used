import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "data", "products.json");
    const fileData = fs.readFileSync(filePath, "utf8");
    const products = JSON.parse(fileData);

    if (!Array.isArray(products)) {
      return NextResponse.json([]);
    }

    return NextResponse.json(products);
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: "Failed to load products" },
      { status: 500 }
    );
  }
}
