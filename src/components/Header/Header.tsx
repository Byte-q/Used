'use client'
import React, { useEffect, useState } from "react";
import "./Header.css";
import SubHeader from "./SubHeader";
import Image from "next/image";
import Search from "../Search";
import Button from "../Button";
import Link from "next/link";
import LoadingSpinner from "../LoadingSpinner";

const Header = () => {
  interface User {
    email: string;
    username: string;
    imageUrl: string;
  }

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchUserData = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      const API_BASE_URL = process.env.API_BASE_URL;
      const res = await fetch(`${API_BASE_URL}/users/${userId}`);
      const allData = await res.json();
      const data = allData.data;

      if (res.ok) {
        setUser(data);
      } else {
        console.error("Error fetching user:", data.error);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setLoading(false);
    }
  };
  fetchUserData();
}, []);

  return (
    <main>
      <div className="header1 p-5 h-25 flex justify-between text-white">
        <Link href={"/"}>
          <div className="logo flex h-full items-center gap-2 text-2xl font-bold">
            <Image
              className="hidden md:block"
              src="/logo.png"
              alt="none"
              width={50}
              height={50}
            />
            Used
          </div>
        </Link>
        <div className="search h-full w-35 md:w-60 flex items-center gap-2">
          <Search />
          <search />
        </div>
        {!loading ? <div className="sing flex gap-5">
          <div className="profile flex items-center gap-4">
            {user ? <Link href={"/cart"}>
              <Image
                className=""
                src="/cart.png"
                alt="none"
                width={40}
                height={40}
              />
            </Link> : <div></div>}
            {user ? <Link href={"/profile"}>
              <Image
                className="rounded-full"
                src={user.imageUrl || "/profile.png"}
                alt="none"
                width={40}
                height={40}
              />
            </Link> : 
          <div className="log flex">
            <Button name="Sign Up" path="/signup" />
          </div>
            }
          </div>
        </div> : <LoadingSpinner />}
      </div>
      <SubHeader />
    </main>
  );
};

export default Header;
