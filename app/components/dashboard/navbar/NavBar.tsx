"use client";

import Image from "next/image";
import { LogOut } from "lucide-react";

export default function Navbar() {
  const handleLogout = () => {
    // Add real logout logic later
    alert("Logged out successfully!");
  };

  return (
    <header className="flex justify-between items-center bg-white shadow-md h-16 px-6 ml-64 fixed top-0 right-0 left-64 z-10">
      {/* Left: Logo */}
      <div className="flex items-center space-x-2">
        <Image src="/assets/logo.png" alt="Logo" width={35} height={35} />
        <h2 className="font-semibold text-lg text-gray-800">Matrix Dashboard</h2>
      </div>

      {/* Right: Profile */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <Image
            src="/assets/profile.jpg"
            alt="Profile Picture"
            width={35}
            height={35}
            className="rounded-full"
          />
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-800">Chinwe Okorie</p>
            <p className="text-xs text-gray-500">Admin</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-1 text-red-600 hover:text-red-800 font-medium text-sm"
        >
          <LogOut size={16} /> Logout
        </button>
      </div>
    </header>
  );
}
