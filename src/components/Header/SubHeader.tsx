'use client'
import React, { useState, useRef, useEffect } from "react";
import './SubHeader.css'
import { List } from 'lucide-react';
import Link from "next/link";

const SubHeader = () => {
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);
      return (
        <div className="link-cont h-10 header2 flex justify-start pt-0 pb-0 pl-3 pr-3" ref={dropdownRef}>
          <List
            size="lg"
            className="block md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          />
          <ul
            className={`con ${isOpen ? "flex" : "hidden"} absolute top-36 left-3 h-fit bg-gray-500 md:bg-transparent p-5 flex-col md:flex-row duration-300 md:static md:m-0 md:h-full md:c-white md:flex md:justify-between md:items-center`}
          >
            <Link href="/">Home</Link>
            <Link href="/about"> About Us </Link>
            <Link href="/contact"> Contact Us </Link>
            <Link href="/products">Shop</Link>
          </ul>
        </div>
      );
}

export default SubHeader