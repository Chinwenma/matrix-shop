/* eslint-disable @typescript-eslint/no-explicit-any */

import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { isObjectId } from "@/lib/slugify";

import { ArrowLeft, Upload } from "lucide-react";
import Link from "next/link";
import { updateProductAction } from "@/app/dashboard/actions/update";
import Image from "next/image";

type Props = { params: Promise<{ id: string }> };
export default async function EditProductPage({ params }: Props) {
  const { id: slug } = await params;
  if (!slug) return notFound();
  const where = isObjectId(slug) ? { id: slug } : { slug };
  const item = await prisma.product.findUnique({ where });
  if (!item) return notFound();

  return (
    <section className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/dashboard/admin/products"
            className="flex items-center text-gray-700 hover:text-gray-900"
          >
            <ArrowLeft size={18} className="mr-2" />
            Back
          </Link>
          <h2 className="text-2xl font-bold text-gray-800">Edit Product</h2>
        </div>

        {/* Form */}
        <form
          action={updateProductAction.bind(null, slug)}
          className="space-y-6"
          // encType="multipart/form-data"
        >
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              defaultValue={item.name}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Slug</label>
            <input
              type="text"
              name="slug"
              defaultValue={item.slug}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Description */}
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

          {/* Brand */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Brand
            </label>
            <input
              type="text"
              name="brand"
              defaultValue={item.brand}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Price
            </label>
            <input
              type="number"
              name="price"
              step="0.01"
              defaultValue={item.price}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Old Price */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Old Price
            </label>
            <input
              type="number"
              name="oldPrice"
              step="0.01"
              defaultValue={item.oldPrice ?? ""}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Category ID
            </label>
            <input
              type="text"
              name="categoryId"
              defaultValue={item.categoryId}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Cover Image */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Cover Image
            </label>
            <div className="flex items-center gap-4">
              {item.image && (
                <Image
                  src={item.image}
                  alt="cover"
                  width={100}
                  height={100}
                  className="rounded-md"
                />
              )}
              <label className="flex items-center gap-2 cursor-pointer text-gray-500 border rounded-md px-3 py-1 hover:bg-gray-100">
                <Upload size={20} />
                <span>Choose file</span>
                <input type="file" name="image" className="hidden" />
              </label>
            </div>
          </div>

          {/* Gallery Images */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Gallery Images
            </label>
            <div className="flex flex-wrap gap-3 mb-2">
              {item.images.map((img, i) => (
                <Image
                  key={i}
                  src={img}
                  alt="gallery"
                  width={100}
                  height={100}
                  className="rounded-md"
                />
              ))}
            </div>
            <label className="flex items-center gap-2 cursor-pointer text-gray-500 border rounded-md px-3 py-1 hover:bg-gray-100">
              <Upload size={20} />
              <span>Choose files</span>
              <input type="file" name="images" multiple className="hidden" />
            </label>
          </div>

          {/* Submit & Cancel */}
          <div className="flex justify-end gap-2">
            <button
              type="submit"
              className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-all font-medium shadow-sm"
            >
              Update Product
            </button>
            <Link
              href="/dashboard/admin/products"
              className="rounded-xl border px-4 py-2 hover:bg-slate-50"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}
