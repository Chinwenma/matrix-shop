import prisma from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { Edit, PlusCircle, Trash2 } from "lucide-react";

export const dynamic = "force-dynamic";

type Props = {
  searchParams?: Promise<{
    page?: string;
    pageSize?: string;
  }>;
};

export default async function ProductsDashboardPage({ searchParams }: Props) {
  const params = await searchParams;

  // Pagination logic
  const page = Math.max(1, Number(params?.page) || 1);
  const pageSize = Math.min(50, Math.max(1, Number(params?.pageSize) || 10));
  const skip = (page - 1) * pageSize;

  // Fetch products
  const [total, products] = await Promise.all([
    prisma.product.count(),
    prisma.product.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        category: { select: { name: true } },
      },
      skip,
      take: pageSize,
    }),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  // Helper for pagination URLs
  const q = (p: number) => {
    const query = new URLSearchParams();
    query.set("page", String(p));
    query.set("pageSize", String(pageSize));
    return `/dashboard/admin/products?${query.toString()}`;
  };

  return (
    <section className="p-8 bg-gray-50 min-h-screen overflow-y-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Products</h2>
        <Link
          href="/dashboard/admin/products/new"
          className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-all"
        >
          <PlusCircle size={20} />
          Add New
        </Link>
      </div>

      {/* Products Table */}
      <div className="overflow-x-auto bg-white shadow-sm rounded-2xl">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 text-gray-800 text-sm uppercase font-medium">
            <tr>
              <th className="px-6 py-4">Image</th>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Brand</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((prod) => (
              <tr key={prod.id} className="border-t">
                <td className="px-4 py-3">
                  <div className="relative h-10 w-10 overflow-hidden rounded-md bg-slate-100">
                    {prod.image && (
                      <Image
                        src={prod.image}
                        alt={prod.name}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                </td>

                <td className="px-4 py-3 font-medium">{prod.name}</td>
                <td className="px-4 py-3 text-slate-500">{prod.brand}</td>
                <td className="px-4 py-3 text-slate-500">
                  {prod.category?.name || "—"}
                </td>
                <td className="px-4 py-3 text-slate-700 font-semibold">
                  ${prod.price.toFixed(2)}
                </td>

                <td className="px-6 py-4 text-right space-x-3">
                  <Link
                    className="text-blue-700 hover:underline"
                    href={`/dashboard/admin/products/${prod.slug}/view`}
                  >
                    View
                  </Link>
                  <Link
                    href={`/dashboard/admin/products/${prod.id}/edit`}
                    className="inline-flex items-center gap-1 text-teal-600 hover:text-teal-800"
                  >
                    <Edit size={16} />
                    Edit
                  </Link>
                  <button
                    // onClick={() => handleDelete(prod.id)}
                    className="inline-flex items-center gap-1 text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          {Array.from({ length: totalPages }).map((_, i) => {
            const pageNum = i + 1;
            return (
              <Link
                key={pageNum}
                href={q(pageNum)}
                className={`px-3 py-1 rounded-md border text-sm font-medium ${
                  page === pageNum
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
              >
                {pageNum}
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}
