'use client'
import React from "react";
import "./Footer.css";
import { Lock, Phone, Contact } from 'lucide-react'
import Link from "next/link";

const Footer = () => {
    return (
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-links">
            <Link href="#">
              <Contact /> About Us
            </Link>
            <Link href="#">
              <Lock /> Praivcy Policy
            </Link>
            <Link href="#">
              <Phone /> Contact Us
            </Link>
          </div>
          <p>All Right Recived © {new Date().getFullYear()}</p>
        </div>
      </footer>
    );
};

export default Footer;
