'use client'

import React, { useState, useEffect } from 'react'
import AdminLayout from '@/app/admin/layouts/AdminLayout'
import { UploadButton } from '@/utils/uploadthing';

const page = () => {
   const [loading, setLoading] = useState(true);
   const [newProduct, setNewProduct] = useState({
      title: "",
      description: "",
      price: "",
      image: "",
      stock: "",
    });

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  const addProduct = async () => {
    if (!newProduct.title || !newProduct.price || !newProduct.image) {
      alert("❌ Please fill all required fields!");
      return;
    }
    
    try {
      const res = await fetch(`${API_BASE_URL}/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newProduct.title,
          description: newProduct.description,
          price: parseFloat(newProduct.price),
          imageUrl: newProduct.image,
          stock: parseInt(newProduct.stock) || 0,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ Product added successfully!");
        setNewProduct({
          title: "",
          description: "",
          price: "",
          image: "",
          stock: "",
        }); // Reset form
      } else {
        alert(data.error || "❌ Failed to add product");
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };
  return (
    <AdminLayout title="المنتجات - عرض منتجات" description=' عرض جميع المنتجات'>
    <div className=" p-4 rounded-md shadow-md m-auto w-95">
            <h3 className="text-lg font-semibold mb-2">Add New Product</h3>
            <input
              type="text"
              placeholder="Name"
              value={newProduct.title}
              onChange={(e) =>
                setNewProduct({ ...newProduct, title: e.target.value })
              }
              className="w-full p-2 mb-2 border rounded"
            />
            <input
              type="text-area"
              placeholder="Description"
              value={newProduct.description}
              onChange={(e) =>
                setNewProduct({ ...newProduct, description: e.target.value })
              }
              className="w-full p-2 mb-2 border rounded"
            />
            <input
              type="number"
              placeholder="Price"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
              className="w-full p-2 mb-2 border rounded"
            />
            <input
              type="number"
              placeholder="Stock"
              value={newProduct.stock}
              onChange={(e) =>
                setNewProduct({ ...newProduct, stock: e.target.value })
              }
              className="w-full p-2 mb-2 border rounded"
            />
            <UploadButton
              className="my-2"
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                // Do something with the response
                console.log("Files: ", res);
                if (res.length > 0) {
                  setNewProduct({ ...newProduct, image: `https://bfk51v7csb.ufs.sh/f/${res[0].key}` });
                  alert("Image Upload Completed");
                }
              }}
              onUploadError={(error: Error) => {
                // Do something with the error.
                alert(`ERROR! ${error.message}`);
              }}
            />
            <button
              onClick={addProduct}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
            >
              Add Product
            </button>
          </div>
    </AdminLayout>
  )
}

export default page