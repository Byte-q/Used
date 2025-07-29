'use client'
import React from "react";
import { Lock, Phone, Contact } from 'lucide-react'
import Link from "next/link";

const Footer = () => {
    return (
      // create a footer component with links and icons
      // using Tailwind CSS for styling and Lucide icons for visual elements
      <footer className="bg-gray-800 text-white p-6">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
            <Link href="/privacy-policy" className="flex items-center space-x-2 hover:text-gray-400">
              <Lock className="h-5 w-5" />
              <span>Privacy Policy</span>
            </Link>
            <Link href="/terms-of-service" className="flex items-center space-x-2 hover:text-gray-400">
              <Lock className="h-5 w-5" />
              <span>Terms of Service</span>
            </Link>
            <Link href="/contact-us" className="flex items-center space-x-2 hover:text-gray-400">
              <Contact className="h-5 w-5" />
              <span>Contact Us</span>
            </Link>
          </div>
          <div className="mt-4 md:mt-0">
            <p className="text-sm">&copy; {new Date().getFullYear()} University Of Alribat. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
};

export default Footer;
