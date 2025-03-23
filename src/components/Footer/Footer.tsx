'use client'
import React from "react";
import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faLock, faContactCard } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const Footer = () => {
    return (
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-links">
            <Link href="#">
              <FontAwesomeIcon icon={faContactCard} /> About Us
            </Link>
            <Link href="#">
              <FontAwesomeIcon icon={faLock} /> Praivcy Policy
            </Link>
            <Link href="#">
              <FontAwesomeIcon icon={faPhone} /> Contact Us
            </Link>
          </div>
          <p>All Right Recived © {new Date().getFullYear()}</p>
        </div>
      </footer>
    );
};

export default Footer;
