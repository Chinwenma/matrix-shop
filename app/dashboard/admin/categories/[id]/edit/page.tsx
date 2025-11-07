"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Upload } from "lucide-react";
import Link from "next/link";

export default function EditCategoryPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params; // The category ID from the URL

  // Dummy category data (you can later fetch from an API)
  const [category, setCategory] = useState({
    title: "",
    slug: "",
    description: "",
    image: "",
  });

  // Simulate fetching category data
  useEffect(() => {
    // Replace with real API call later
    const mockCategory = {
      id,
      title: "Furniture",
      slug: "furniture",
      description: "Elegant and modern home furniture collection.",
      image: "/images/furniture.jpg",
    };
    setCategory(mockCategory);
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updated Category:", category);

    // Simulate update to backend
    setTimeout(() => {
      alert("Category updated successfully!");
      router.push("/dashboard/categories");
    }, 1000);
  };

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
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-6"
        >
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Category Title
            </label>
            <input
              type="text"
              name="title"
              value={category.title}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Slug
            </label>
            <input
              type="text"
              name="slug"
              value={category.slug}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={category.description}
              onChange={handleChange}
              rows={4}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Image URL
            </label>
            <div className="flex items-center gap-2">
              <Upload size={20} className="text-gray-500" />
              <input
                type="text"
                name="image"
                value={category.image}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all font-medium shadow-sm"
            >
              Update Category
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
