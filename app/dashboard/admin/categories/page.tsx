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

export default async function CategoriesDashboardPage({ searchParams }: Props) {
  const params = await searchParams;

  // Pagination logic
  const page = Math.max(1, Number(params?.page) || 1);
  const pageSize = Math.min(50, Math.max(1, Number(params?.pageSize) || 10));
  const skip = (page - 1) * pageSize;

  // Fetch from database
  const [total, categories] = await Promise.all([
    prisma.category.count(),
    prisma.category.findMany({
      orderBy: { createdAt: "desc" },
      select: { id: true, name: true, slug: true, image: true, description: true },
      skip,
      take: pageSize,
    }),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  // Helper to create pagination URLs
  const q = (p: number) => {
    const query = new URLSearchParams();
    query.set("page", String(p));
    query.set("pageSize", String(pageSize));
    return `/dashboard/admin/categories?${query.toString()}`;
  };

  return (
    <section className="p-8 bg-gray-50 min-h-screen overflow-y-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Categories</h2>
        <Link
          href="/dashboard/admin/categories/new"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
        >
          <PlusCircle size={20} />
          Add New
        </Link>
      </div>

      {/* Categories Table */}
      <div className="overflow-x-auto bg-white shadow-sm rounded-2xl">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 text-gray-800 text-sm uppercase font-medium">
            <tr>
              <th className="px-6 py-4">Image</th>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Slug</th>
              <th className="px-6 py-4">Description</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
               {categories.map((cat) => (
                <tr key={cat.id} className="border-t">
                  <td className="px-4 py-3">
                    <div className="relative h-10 w-10 overflow-hidden rounded-md bg-slate-100">
                      {cat.image && (
                        <Image
                          src={cat.image}
                          alt={cat.name}
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 font-medium">{cat.name}</td>
                  <td className="px-4 py-3 text-slate-500">{cat.slug}</td>
                  <td className="px-4 py-3 text-slate-500">{cat.description}</td> 
            
                <td className="px-6 py-4 text-right space-x-3">
                  <Link
                    href={`/dashboard/admin/categories/${cat.id}/edit`}
                    className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800"
                  >
                    <Edit size={16} />
                    Edit
                  </Link>
                  <button
                    // onClick={() => handleDelete(cat.id)}
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
    </section>
  );
}
