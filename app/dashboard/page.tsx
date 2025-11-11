// app/dashboard/page.tsx
import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";

export default async function DashboardHome() {
  // Fetch counts from the database
  const [productCount, categoryCount, userCount, orderCount] = await Promise.all([
    prisma.product.count(),
    prisma.category.count(),
    prisma.user.count(),
    prisma.order.count() 
  ]);

  // Fetch recent users
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    take: 10,
  });

  return (
    <section className="p-8 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6">Welcome to the Admin Dashboard</h2>

      {/* Top Cards with Counts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <Link
          href="/dashboard/admin/products"
          className="p-6 bg-white rounded-2xl shadow hover:shadow-md transition flex flex-col items-center justify-center"
        >
          <span className="text-3xl font-bold">📦</span>
          <span className="mt-2 font-medium text-gray-700">Products</span>
          <span className="mt-1 text-teal-600 font-bold text-lg">{productCount}</span>
        </Link>

        <Link
          href="/dashboard/admin/categories"
          className="p-6 bg-white rounded-2xl shadow hover:shadow-md transition flex flex-col items-center justify-center"
        >
          <span className="text-3xl font-bold">📂</span>
          <span className="mt-2 font-medium text-gray-700">Categories</span>
          <span className="mt-1 text-teal-600 font-bold text-lg">{categoryCount}</span>
        </Link>

        <Link
          href="/dashboard/admin/orders"
          className="p-6 bg-white rounded-2xl shadow hover:shadow-md transition flex flex-col items-center justify-center"
        >
          <span className="text-3xl font-bold">🛒</span>
          <span className="mt-2 font-medium text-gray-700">Orders</span>
          <span className="mt-1 text-teal-600 font-bold text-lg">{orderCount}</span>
        </Link>

        <Link
          href="/dashboard/admin/users"
          className="p-6 bg-white rounded-2xl shadow hover:shadow-md transition flex flex-col items-center justify-center"
        >
          <span className="text-3xl font-bold">👥</span>
          <span className="mt-2 font-medium text-gray-700">Users</span>
          <span className="mt-1 text-teal-600 font-bold text-lg">{userCount}</span>
        </Link>
      </div>

      {/* Users Table */}
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-2xl shadow-sm">
        <h3 className="text-xl font-semibold mb-4">Recent Users</h3>

        {users.length === 0 ? (
          <p>No users registered yet.</p>
        ) : (
          <table className="w-full table-auto border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-4 py-2 border-b">Avatar</th>
                <th className="px-4 py-2 border-b">Name</th>
                <th className="px-4 py-2 border-b">Email</th>
                {/* <th className="px-4 py-2 border-b">Role</th> */}
                <th className="px-4 py-2 border-b">Joined</th>
                <th className="px-4 py-2 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2">
                    {user.avatar ? (
                      <Image
                        src={user.avatar}
                        alt={user.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gray-200 rounded-full" />
                    )}
                  </td>
                  <td className="px-4 py-2 ">{user.name}</td>
                  <td className="px-4 py-2 ">{user.email}</td>
                  {/* <td className="px-4 py-2 border-b">{user.role}</td> */}
                  <td className="px-4 py-2">
                    {user.createdAt.toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 flex gap-2">
                    <Link
                      href={`/dashboard/admin/users/${user.id}/edit`}
                      className="text-teal-600 hover:underline"
                    >
                      Edit
                    </Link>
                    <button className="text-red-600 hover:underline">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}
