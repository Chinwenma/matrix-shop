// app/dashboard/page.tsx
import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";

export default async function DashboardHome() {
  const [productCount, categoryCount, userCount, orderCount] =
    await Promise.all([
      prisma.product.count(),
      prisma.category.count(),
      prisma.user.count(),
      prisma.order.count(),
    ]);

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    take: 10,
  });

  return (
    <section className="p-4 sm:p-6 md:p-8 min-h-screen">
      <h2 className="text-xl sm:text-2xl font-semibold mb-6">
        Welcome to the Admin Dashboard
      </h2>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        <DashboardCard
          href="/dashboard/admin/products"
          icon="📦"
          label="Products"
          value={productCount}
        />
        <DashboardCard
          href="/dashboard/admin/categories"
          icon="📂"
          label="Categories"
          value={categoryCount}
        />
        <DashboardCard
          href="/dashboard/admin/orders"
          icon="🛒"
          label="Orders"
          value={orderCount}
        />
        <DashboardCard
          href="/dashboard/admin/users"
          icon="👥"
          label="Users"
          value={userCount}
        />
      </div>

      {/* Users */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm">
        <h3 className="text-lg sm:text-xl font-semibold mb-4">
          Recent Users
        </h3>

        {users.length === 0 ? (
          <p>No users registered yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-[700px] w-full border border-gray-200 rounded-lg">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="px-4 py-2">Avatar</th>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2 hidden sm:table-cell">Email</th>
                  <th className="px-4 py-2 hidden md:table-cell">Joined</th>
                  <th className="px-4 py-2">Actions</th>
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

                    <td className="px-4 py-2">{user.name}</td>

                    <td className="px-4 py-2 hidden sm:table-cell">
                      {user.email}
                    </td>

                    <td className="px-4 py-2 hidden md:table-cell">
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
          </div>
        )}
      </div>
    </section>
  );
}

/* Reusable Card */
function DashboardCard({
  href,
  icon,
  label,
  value,
}: {
  href: string;
  icon: string;
  label: string;
  value: number;
}) {
  return (
    <Link
      href={href}
      className="bg-white p-5 rounded-2xl shadow hover:shadow-md transition
        flex flex-col items-center justify-center"
    >
      <span className="text-3xl">{icon}</span>
      <span className="mt-2 font-medium text-gray-700">{label}</span>
      <span className="mt-1 text-teal-600 font-bold text-lg">{value}</span>
    </Link>
  );
}
