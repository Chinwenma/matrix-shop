"use client";

import { useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  ShoppingBag,
  List,
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
  { href: "/dashboard/admin/orders", label: "Orders", icon: ShoppingBag },
];

export default function Sidebar({
  user,
}: {
  user: { avatar?: string };
}) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Hamburger */}
      <button
        className="fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow md:hidden"
        onClick={() => setIsOpen(true)}
      >
        <Menu size={22} />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 z-50 h-screen w-64 bg-white shadow-md
          flex flex-col justify-between
          transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-bold">Matrix Admin</h2>
          <button
            className="md:hidden"
            onClick={() => setIsOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {links.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;

            return (
              <Link
                key={href}
                href={href}
                onClick={() => setIsOpen(false)} // 🔥 closes on mobile
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition
                  ${
                    active
                      ? "bg-teal-900 text-white"
                      : "text-gray-700 hover:bg-gray-200"
                  }
                `}
              >
                <Icon size={18} />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User / Logout */}
        <div className="p-4 border-t flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src={user.avatar ?? "/assets/chair4.png"}
              alt="Profile"
              width={36}
              height={36}
              className="rounded-full"
            />
            <div className="text-sm">
              <p className="font-semibold">Chinwe Okorie</p>
              <p className="text-xs text-gray-500">Admin</p>
            </div>
          </div>

          <button
            onClick={() => signOut({ redirect: true })}
            className="text-red-600 hover:text-red-800"
            title="Logout"
          >
            <LogOut size={18} />
          </button>
        </div>
      </aside>
    </>
  );
}
