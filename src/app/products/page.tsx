'use client'
import React, { useState, useEffect } from "react";
import ProdCard from "./ProdCard";
import "./product.css";
import LoadingSpinner from "../../components/LoadingSpinner";

interface Product {
  _id: number;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
}

const Page = () => {

const [products, setProducts] = useState<Product[]>([]);
const [loading, setLoading] = useState(true);

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;


useEffect(() => {
  fetch(`${API_BASE_URL}/products`)
  .then((res) => res.json())
  .then((data) => data.data || [])
  .then((data) => {
    if (Array.isArray(data)) {
        setProducts(data); // If the response is an array
      } else if (data.products && Array.isArray(data.products)) {
        setProducts(data.products); // If the response has a `products` property
      } else {
        console.error("Unexpected API response format:", data);
      }
    })
    .catch((error) => console.error("Error fetching products:", error));
    setLoading(false)
}, []);
  
  return (
    <div className="">
      <div className="til h-20 p-5 text-xl md:text-3xl text-sky-400 font-bold">
        Welcome To Products Area,
      </div>
      <div className="min-h-[100vb] flex">
        <section className="sidebar w-[40%] md:w-[15%] h-[full] border-1 p-5">
          <h3 className="text-lg text-sky-500 font-bold ">
            Supplayers Countries
          </h3>
          <ul className="p-5 flex flex-col gap-3 text-md font-bold text-gray-500">
            <li>Saudia Arabia</li>
            <li>Egypt</li>
            <li>Yamen</li>
            <li>Kiwait</li>
            <li>Russia</li>
          </ul>
          <h3 className=""></h3>
        </section>
        { !loading ?
          <section className="products w-[85%] max-h-[100vb] p-5 grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 overflow-y-scroll">
          {products.length > 0 ? (
            products.map((Product) => (
              <ProdCard
              id={Product._id}
              key={Product._id}
              title={Product.title}
              desc={Product.description}
                price={Product.price}
                src={Product.imageUrl || "/placeholder.png"}
              />
            ))
          ) : (
            <p className="text-red-500 w-fit text-lg font-bold">No products available.</p>
          )}
        </section>
        : <LoadingSpinner />
      }
      </div>
    </div>
  );
};

export default Page;
