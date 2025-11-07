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
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex flex-col flex-1">
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
