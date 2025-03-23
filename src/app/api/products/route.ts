import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "products.json");

// ✅ POST: Add a new product
export async function POST(req: Request) {
  try {
    const { name, description, price, image, stock } = await req.json();

    if (!name || !price || !image) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Read existing products
    let products = [];
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, "utf8");
      products = JSON.parse(fileData) || [];
    }

    // Create a new product
    const newProduct = {
      id: products.length > 0 ? products[products.length - 1].id + 1 : 1,
      name,
      description: description || "",
      price,
      image,
      stock: stock || 0,
    };

    // Save to JSON file
    products.push(newProduct);
    fs.writeFileSync(filePath, JSON.stringify(products, null, 2));

    return NextResponse.json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    console.error("Error adding product:", error);
    return NextResponse.json({ error: "Failed to add product" }, { status: 500 });
  }
}



export async function GET() {
  try {
    // Ensure the file exists
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify([])); // Create file with an empty array
    }

    // Read the file
    const fileData = fs.readFileSync(filePath, "utf8");
    // Validate JSON format
    let products;
    try {
      products = JSON.parse(fileData);
    } catch (error) {
      console.error("Invalid JSON format. Resetting file.", error);
      fs.writeFileSync(filePath, "[]");
      products = [];
    }

    // Ensure products is an array
    if (!Array.isArray(products)) {
      console.error("Expected an array but got:", products);
      return NextResponse.json([]);
    }

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error reading products file:", error);
    return NextResponse.json(
      { error: "Failed to load products" },
      { status: 500 }
    );
  }
}

// Delete a product
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    const products = JSON.parse(fs.readFileSync(filePath, "utf8"));

    type Product = { id: number; name: string; description: string; price: number; image: string; stock: number };
    const filteredProducts = products.filter((product: Product) => product.id !== id);

    if (products.length === filteredProducts.length) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    fs.writeFileSync(filePath, JSON.stringify(filteredProducts, null, 2));

    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Delete Error:", error);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
