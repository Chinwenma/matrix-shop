import { notFound } from "next/navigation";
import Sidebar from "../components/dashboard/sidebar/SiderBar";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/authOptions";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return notFound();
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar user={session.user} />

      {/* Main content */}
      <main className="flex-1 ml-0 md:ml-64 overflow-y-auto p-4 sm:p-6">
        {children}
      </main>
    </div>
  );
}
