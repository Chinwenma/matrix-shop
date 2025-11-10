/* eslint-disable @typescript-eslint/no-explicit-any */


import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: true,
      products: {
        include: {
          product: true,
        },
      },
    },
  });

  return (
    <section className="p-8 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6">Recent Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <table className="w-full table-auto border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2 border-b">Order ID</th>
              <th className="px-4 py-2 border-b">User</th>
              <th className="px-4 py-2 border-b">Products</th>
              <th className="px-4 py-2 border-b">Total</th>
              <th className="px-4 py-2 border-b">Status</th>
              <th className="px-4 py-2 border-b">Created</th>
              <th className="px-4 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">{order.id}</td>
                <td className="px-4 py-2 border-b">{order.user.name}</td>
                <td className="px-4 py-2 border-b">
                  {order.products.map((p) => (
                    <div key={p.id}>{p.product.name} x {p.quantity}</div>
                  ))}
                </td>
                <td className="px-4 py-2 border-b">${order.total.toFixed(2)}</td>
                <td className="px-4 py-2 border-b">{order.status}</td>
                <td className="px-4 py-2 border-b">{order.createdAt.toLocaleDateString()}</td>
                <td className="px-4 py-2 border-b">
                  <Link href={`/dashboard/admin/orders/${order.id}`} className="text-teal-600 hover:underline">View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
