// components/dashboard/Sidebar.tsx
"use client";

import Link from "next/link";
import { LayoutDashboard, ShoppingBag, List, Users } from "lucide-react";
import { usePathname } from "next/navigation";

const links = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/products", label: "Products", icon: ShoppingBag },
  { href: "/dashboard/categories", label: "Categories", icon: List },
  { href: "/dashboard/users", label: "Users", icon: Users },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white shadow-md flex flex-col">
      <div className="px-6 py-4 border-b">
        <h2 className="text-xl font-bold text-gray-800">Matrix Admin</h2>
      </div>

      <nav className="flex-1 p-4 space-y-2">
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
    </aside>
  );
}
