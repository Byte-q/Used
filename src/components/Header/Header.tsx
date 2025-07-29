'use client'
import React, { useEffect, useState } from "react";
import "./Header.css";
import SubHeader from "./SubHeader";
import Image from "next/image";
import Button from "../Button";
import Link from "next/link";
import LoadingSpinner from "../LoadingSpinner";
import { ModeToggle } from "../modeToggle";

const Header = () => {
  interface User {
    email: string;
    username: string;
    imageUrl: string;
  }

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

useEffect(() => {
  const fetchUserData = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/users/${userId}`);
      const allData = await res.json();
      const data = allData.data;

      if (res.ok) {
        setUser(data);
      } else {
        console.error("Error fetching user:", allData.error);
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
    <main className="">
      <div className="header1 p-5 h-25 flex justify-between text-white">
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
        <Link href={"/"}>
          <div className="logo flex h-full items-center gap-2 text-2xl font-bold">
            <span>
            <ModeToggle />
            </span>
            Used
            <Image
              className="hidden md:block"
              src="/logo.png"
              alt="none"
              width={50}
              height={50}
              />
          </div>
        </Link>
      </div>
      <SubHeader />
    </main>
  );
};

export default Header;
