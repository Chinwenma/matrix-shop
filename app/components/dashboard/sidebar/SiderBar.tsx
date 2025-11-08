"use client";

import { useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  ShoppingBag,
  List,
  Users,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import Image from "next/image";

const links = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/admin/products", label: "Products", icon: ShoppingBag },
  { href: "/dashboard/admin/categories", label: "Categories", icon: List },
  { href: "/dashboard/admin/users", label: "Users", icon: Users },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false); // for mobile sidebar

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        className="fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow-md md:hidden"
        onClick={() => setIsOpen(true)}
      >
        <Menu size={24} />
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed bottom-0 left-0 h-screen bg-white shadow-md flex flex-col justify-between
          w-64 z-50 transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:w-64
        `}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Matrix Admin</h2>
          <button className="md:hidden" onClick={() => setIsOpen(false)}>
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-hidden">
          {links.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                pathname === href
                  ? "bg-gray-900 text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              <Icon size={18} />
              <span>{label}</span>
            </Link>
          ))}
        </nav>

        {/* Bottom User Info */}
        <div className="p-4 border-t flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <Image
              src="/assets/profile.jpg"
              alt="Profile Picture"
              width={35}
              height={35}
              className="rounded-full"
            />
            <div className="text-sm">
              <p className="font-semibold text-gray-800">Chinwe Okorie</p>
              <p className="text-xs text-gray-500">Admin</p>
            </div>
          </div>

          <button
            onClick={() => signOut({ redirect: true })}
            className="text-red-600 hover:text-red-800 transition-colors"
            title="Logout"
          >
            <LogOut size={18} />
          </button>
        </div>
      </aside>
    </>
  );
}
