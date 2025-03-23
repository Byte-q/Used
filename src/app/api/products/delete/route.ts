import { NextResponse } from "next/server";
import * as fs from "node:fs";
import path from "path";

interface Product {
  id: string;
  [key: string]: string | number | boolean | null | undefined; // Add other properties as needed
}

const filePath = path.join(process.cwd(), "data", "products.json");

// ✅ GET: Fetch all products
export async function GET() {
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, "[]");
    }

    const fileData = fs.readFileSync(filePath, "utf8");
    const products = JSON.parse(fileData);

    return NextResponse.json(Array.isArray(products) ? products : []);
  } catch (error) {
    console.error("Error loading products:", error);
    return NextResponse.json(
      { error: "Failed to load products" },
      { status: 500 }
    );
  }
}

// ✅ DELETE: Remove a product by ID
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    if (!id)
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );

    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, "[]");
    }

    const fileData = fs.readFileSync(filePath, "utf8");
    let products = JSON.parse(fileData);

    if (!Array.isArray(products)) products = [];

    // Remove the product with matching ID
    const updatedProducts: Product[] = products.filter((product: Product) => product.id !== id);

    fs.writeFileSync(filePath, JSON.stringify(updatedProducts, null, 2));

    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
