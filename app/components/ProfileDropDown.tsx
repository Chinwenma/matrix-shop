'use client';
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default function ProfileDropdown({ data }: { data: { user: { image: string; name: string } } }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="relative inline-block text-left">
            {/* Profile Image */}
            <Image
                src={data?.user?.image || "/assets/MyLogo.png"}
                alt="Profile"
                width={32}
                height={32}
                className="rounded-full cursor-pointer border border-gray-300"
                onClick={() => setOpen(!open)}
            />

            {/* Dropdown Menu */}
            {open && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                    <div className="px-4 py-3 border-b">
                        <p className="text-sm font-medium text-gray-900">{data.user.name}</p>
                    </div>
                    <div className="py-2">
                        <Link
                            href="/myorders"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition"
                        >
                            Orders
                        </Link>
                        <button
                            onClick={() => signOut()}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition"
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
