import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="border-t border-amber-300">
      <div className="container m-auto justify-between sm:flex">
        <p className="pt-4 text-center">© 2025 | LIRODEV</p>
        <div className="mt-3 flex items-center justify-center gap-4 text-2xl">
          <a href="#" className="transition-all hover:text-amber-300">
            <FaFacebook />
          </a>
          <a href="#" className="transition-all hover:text-amber-300">
            <FaInstagram />
          </a>
          <a href="#" className="transition-all hover:text-amber-300">
            <FaLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
