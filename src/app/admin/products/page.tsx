'use client'

import React, { useEffect, useState } from 'react'
import AdminLayout from '@/app/admin/layouts/AdminLayout'
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';

interface Product {
  _id: number;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
}

const page = () => {
  const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      fetchProducts();
    }, []);
    
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/products`);
      if (!res.ok) {
        console.error("Error fetching products:", res.statusText);
        setProducts([]);
        return;
      }

      let allData;
      let data;
      try {
        allData = await res.json();
        data = allData.data || [];
      } catch (error) {
        console.error("Error parsing JSON:", error);
        data = [];
      }

      if (Array.isArray(data)) {
        setProducts(data);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    }
    setLoading(false);
  };

  const deleteProduct = async (id: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) {
        let errorMessage = "❌ Failed to delete product";
        try {
          const data = await res.json();
          errorMessage = data.error || errorMessage;
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
        alert(errorMessage);
        return;
      }

      alert("✅ Product deleted successfully!");
      fetchProducts(); // Refresh product list
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("❌ An error occurred while deleting the product.");
    }
  };

  return (
    <AdminLayout title="المنتجات" description=' إدارة المنتجات'>
      <>
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold mb-4">Products</h2>
          <Link href="/admin/products/add">
            <Button className="mb-4"><Plus className="mr-2" />Add New Product</Button>
          </Link>
    
            {loading ? (
              <p>Loading products...</p>
            ) : products.length === 0 ? (
              <p>No products found.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {products.map((product) => (
                  <div
                    key={product._id}
                    className="flex flex-col border border-gray-500 p-4 rounded-md shadow shadow-gray-950 h-80"
                  >
                    <span className="img relative h-40">
                      <Image
                        fill
                        src={product.imageUrl || "/placeholder.png"}
                        alt={product.title}
                        className="w-full h-40 object-cover rounded-md"
                      />
                    </span>
                    <h3 className="text-lg font-semibold mt-2">{product.title}</h3>
                    <p className="text-sm text-gray-500">{product.description}</p>
                    <p className="mt-2 font-bold text-lg">${product.price}</p>
    
                    {/* 🗑️ Delete Button */}
                    <button
                      onClick={() => deleteProduct(product._id)}
                      className="mt-2 text-red-500 font-bold bg-white px-4 py-2 rounded hover:bg-red-700 hover:text-white duration-300 cursor-pointer w-full"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
      </>
    </AdminLayout>
  )
}

export default page