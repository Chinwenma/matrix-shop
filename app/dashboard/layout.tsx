import "../globals.css";

import Sidebar from "../components/dashboard/sidebar/SiderBar";

import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/authOptions";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Dashboard App",
  description: "Admin dashboard built with Next.js",
};
export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  if(!session || !session.user){
    return notFound();
  }

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar user={session.user}/>

    
        <main className="flex-1 ml-64 h-screen overflow-y-auto bg-gray-50 p-6">{children}</main>
     
    </div>
  );
}
