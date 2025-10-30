"use client";

import { FC, useEffect, useState } from "react";
import { ShoppingCart, Heart, User, Search } from "lucide-react";
import Link from "next/link";

const Navbar: FC = () => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 90);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`w-full border-b transition-all duration-300 z-50 ${
        isSticky
          ? "fixed top-0 left-0 bg-white shadow-md animate-slideDown"
          : "relative"
      }`}
    >
      {/* Top Bar */}
      <div className="bg-[#2b2541] text-gray-300 text-sm flex justify-between items-center px-12 py-2">
        <p>✓ Free Shipping On All Orders Over $50</p>
        <div className="flex items-center space-x-4">
          <select className="bg-transparent text-gray-300 outline-none">
            <option value="eng">Eng</option>
          </select>
          <Link href="#">Faqs</Link>
          <Link href="#">Need Help</Link>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="bg-gray-100 py-4 px-12 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <span className="text-teal-600 text-2xl">🛋️</span>
          <span className="font-semibold text-xl text-gray-800">MatrixShop</span>
        </div>

        {/* Search Bar */}
        <div className="relative w-[300px]">
          <input
            type="text"
            placeholder="Search here..."
            className="w-full rounded-md border border-gray-300 py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <Search className="absolute right-3 top-2.5 text-gray-500 h-4 w-4" />
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-5">
          <Link href="/cart" className="flex items-center space-x-1">
            <ShoppingCart className="w-5 h-5 text-gray-700" />
            <span className="text-sm">Cart</span>
          </Link>
          <Heart className="w-5 h-5 text-gray-700 cursor-pointer" />
          <User className="w-5 h-5 text-gray-700 cursor-pointer" />
        </div>
      </div>
      {/* Bottom Navigation */}
      <nav className="flex justify-between items-center text-sm px-12 py-2 bg-white">
        <div className="flex space-x-6">
          {[
            { name: "Home", href: "/" },
            { name: "Categories", href: "/categories" },
            { name: "Products", href: "/products" },
            { name: "About", href: "/about" },
            { name: "Contact", href: "/contact" },
          ].map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="hover:text-teal-600 text-gray-700 transition"
            >
              {link.name}
            </Link>
          ))}
        </div>
        <p className="text-gray-700 text-sm">
          Hotline: <span className="font-medium">(808) 555-0111</span>
        </p>
      </nav>
    </header>
  );
};

export default Navbar;
