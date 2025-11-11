"use client";

import { FC, useCallback, useEffect, useState } from "react";
import { ShoppingCart, User, X, Menu } from "lucide-react";
import Link from "next/link";
import { navLinks } from "@/app/constants/Constant";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
const Navbar: FC = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = useCallback(() => setIsOpen((prev) => !prev), []);
  const closeMenu = useCallback(() => setIsOpen(false), []);
  const { data, status } = useSession();
  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 90);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header
      className={`w-full border-b transition-all duration-300 z-50 ${
        isSticky
          ? "fixed top-0 left-0 bg-white shadow-md animate-slideDown"
          : "relative"
      }`}
    >
      {/* 🔹 Top Bar */}
      <div className="hidden md:flex justify-between items-center bg-[#2b2541] text-gray-300 text-sm px-12 py-2">
        <p>✓ Free Shipping On All Orders Over $50</p>
        <div className="flex items-center space-x-5">
          <select className="bg-transparent text-gray-300 outline-none">
            <option value="eng">Eng</option>
          </select>
          <Link href="#" className="hover:text-white transition">
            Faqs
          </Link>
          <Link href="#" className="hover:text-white transition">
            Need Help
          </Link>
        </div>
      </div>

      {/* 🔹 Main Navigation */}
      <div className="bg-gray-100 px-4 md:px-12 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center  space-x-2 shrink-0">
          {/* <span className="text-teal-600 text-3xl">🛋️</span> */}
          <span className="font-semibold text-2xl text-gray-800 whitespace-nowrap">
            MatrixShop
          </span>
        </Link>

        {/* Nav Links */}
        <nav className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              href={link.url}
              className="text-gray-700 hover:text-teal-600 text-sm font-medium transition"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Side Icons */}
        <div className="flex items-center space-x-4 md:space-x-6 shrink-0">
          <Link
            href="/cart"
            className="flex items-center space-x-1 text-gray-700 hover:text-teal-600 transition"
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="hidden sm:inline text-sm font-medium">Cart</span>
          </Link>
          {status === "unauthenticated" && (
            <Link
              href="/signin"
              className="flex items-center space-x-1 text-gray-700 hover:text-teal-600 transition"
            >
              <User className="w-5 h-5 text-gray-700 hover:text-teal-600 cursor-pointer transition" />
            </Link>
          )}

          {
            status === "authenticated" && <div>
              <Image src={data?.user?.image || "/default-profile.png"} alt="Profile" width={32} height={32} className="rounded-full cursor-pointer"/>
              <p>{data.user.name}</p>
              <Link href="/myorders" className="text-sm text-gray-700 hover:text-teal-600 transition">Orders</Link>
              <button onClick={()=>signOut()}>Signout</button>
            </div>
          }

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-gray-800"
            aria-label="Toggle Menu"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      <div
        id="mobile-menu"
        className={`fixed top-0 bg-[#2b2541] right-0 h-full w-[75%] sm:w-[60%] text-white z-40 transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out flex flex-col px-6 py-8 items-center`}
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={closeMenu}
          className="self-end mb-8"
          aria-label="Close Menu"
        >
          <X size={28} />
        </button>

        <nav className="flex flex-col gap-6 text-lg" role="menu">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              href={link.url}
              onClick={closeMenu}
              className="pb-2"
              tabIndex={0}
              role="menuitem"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-lg z-30 md:hidden"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}
    </header>
  );
};

export default Navbar;
