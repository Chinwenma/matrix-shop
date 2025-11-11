import "../globals.css";

import Sidebar from "../components/dashboard/sidebar/SiderBar";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard App",
  description: "Admin dashboard built with Next.js",
};
export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

    
        <main className="flex-1 ml-64 h-screen overflow-y-auto bg-gray-50 p-6">{children}</main>
     
    </div>
  );
}
