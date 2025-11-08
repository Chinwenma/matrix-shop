/* eslint-disable @typescript-eslint/no-explicit-any */

import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { isObjectId } from "@/lib/slugify";

import { ArrowLeft, Upload } from "lucide-react";
import Link from "next/link";
import { updateCategoryAction } from "@/app/dashboard/actions/update";
import Image from "next/image";

type Props = { params: Promise<{ id: string }> };
export default async function EditCategoryPage({ params }: Props) {
  const { id: slug } = await params;
  if (!slug) return notFound();
  const where = isObjectId(slug) ? { id: slug } : { slug };
  const item = await prisma.category.findUnique({ where });
  if (!item) return notFound();

  return (
    <section className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/dashboard/admin/categories"
            className="flex items-center text-gray-700 hover:text-gray-900"
          >
            <ArrowLeft size={18} className="mr-2" />
            Back
          </Link>
          <h2 className="text-2xl font-bold text-gray-800">Edit Category</h2>
        </div>

        {/* Form */}
        <form
          action={updateCategoryAction.bind(null, slug)}
          className="space-y-6"
           encType="multipart/form-data"
        >
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Category Title
            </label>
            <input
              type="text"
              name="name"
              defaultValue={item.name}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Slug</label>
            <input
              type="hidden"
              name="slug"
              defaultValue={item.slug}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Description
            </label>
            <textarea
              name="description"
              defaultValue={item.description ?? ""}
              rows={4}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <p className="mt-1 text-sm text-slate-500">
              Current:{" "}
              <Image
                src={item.image}
                alt="image"
                width={100}
                height={100}
                loading="lazy"
              />
            </p>
            <label className="block text-gray-700 font-medium mb-2">
              Image
            </label>
            <div className="flex items-center gap-2">
              <Upload size={20} className="text-gray-500" />
              <input
                type="file"
                name="image"
                id="image"
                defaultValue={item.image}
                // required
                width={400}
                height={300}
                accept="image/*"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          <div className="flex justify-end mb-4 gap-2">
            <button
              type="submit"
              className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-all font-medium shadow-sm"
            >
              Update Category
            </button>

            <Link
              href="/dashboard/admin/categories"
              className="rounded-xl border px-4 py-2 hover:bg-slate-50"
            >
              Cancel
            </Link>
          </div>
        </form>

        <div className="space-y-4">
          <div className="rounded-2xl border bg-white p-4">
            <div className="text-sm font-medium mb-3">Current image</div>
            <div className="relative aspect-4/3 w-full overflow-hidden rounded-lg bg-slate-100">
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.name}
                  width={400}
                  height={300}
                  className="object-cover w-full"
                />
              ) : (
                <div className="absolute inset-0 grid place-items-center text-xs text-slate-500">
                  No image
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
