import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  stock: number;
}

  export async function POST(req: Request) {
    try {
      const filePath = path.join(process.cwd(), "data", "products.json");
  
      const fileData = fs.readFileSync(filePath, "utf8");
      let products: Product[] = JSON.parse(fileData);
  
      const { id, name, description, price, image, stock } = await req.json();
  
      products = products.map((product: Product) =>
        product.id === id
          ? { ...product, name, description, price, image, stock }
          : product
      );
  
      fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
  
      return NextResponse.json({ message: "Product updated successfully" });
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { error: "Failed to update product" },
        { status: 500 }
      );
    }
  }
