"use client";
import Button from "../../components/Button";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  stock: number;
}

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    stock: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      if (!res.ok) {
        console.error("Error fetching products:", res.statusText);
        setProducts([]);
        return;
      }

      let data;
      try {
        data = await res.json();
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

  // ✅ Add Product Function
  const addProduct = async () => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      alert("❌ Please fill all required fields!");
      return;
    }

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newProduct.name,
          description: newProduct.description,
          price: parseFloat(newProduct.price),
          image: newProduct.image,
          stock: parseInt(newProduct.stock) || 0,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ Product added successfully!");
        fetchProducts(); // Refresh product list
        setNewProduct({
          name: "",
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

  // ✅ Delete Product Function
  const deleteProduct = async (id: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch("/api/products", {
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
    <>
      <div className="p-6 border-b">
        <div className="navigate flex justify-between mb-10">
          <h2 className="text-2xl text-sky-500 font-bold mb-4">
            Admin<span className="hidden md:block">Dashboard</span>
          </h2>
          <span className="links flex flex-row gap-4">
            <Button name="Profile" path="/profile" />
            <Button name="Products" path="/products" />
            <Button name="Home" path="/" />
          </span>
        </div>

        {loading ? (
          <p>Loading products...</p>
        ) : products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex flex-col border border-gray-500 p-4 rounded-md shadow shadow-gray-950 h-80"
              >
                <span className="img relative h-40">
                  <Image
                    fill
                    src={product.image}
                    alt={product.name}
                    className="w-full h-40 object-cover rounded-md"
                  />
                </span>
                <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
                <p className="text-sm text-gray-500">{product.description}</p>
                <p className="mt-2 font-bold text-lg">${product.price}</p>

                {/* 🗑️ Delete Button */}
                <button
                  onClick={() => deleteProduct(product.id)}
                  className="mt-2 text-red-500 font-bold bg-white px-4 py-2 rounded hover:bg-red-700 hover:text-white duration-300 cursor-pointer w-full"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Add Product Form */}
      <div className=" p-4 rounded-md shadow-md mt-6 w-95">
        <h3 className="text-lg font-semibold mb-2">Add New Product</h3>
        <input
          type="text"
          placeholder="Name"
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
          className="w-full p-2 mb-2 border rounded"
        />
        <input
          type="text"
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
          type="text"
          placeholder="Image URL"
          value={newProduct.image}
          onChange={(e) =>
            setNewProduct({ ...newProduct, image: e.target.value })
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
        <button
          onClick={addProduct}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
        >
          Add Product
        </button>
      </div>
    </>
  );
}
