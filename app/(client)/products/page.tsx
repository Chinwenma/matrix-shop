"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { products } from "@/lib/products";
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import PageBanner from "@/app/components/banner/PageBanner";

const categories = Array.from(new Set(products.map((p) => p.category)));

export default function ProductsPage() {
  const router = useRouter();
  const pathname = usePathname();

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const productsPerPage = 8;

  // Read category from URL query on client-side only
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const categoryQuery = params.get("category");
      setSelectedCategory(categoryQuery);
      setCurrentPage(1);
    }
  }, [pathname]);

  const filteredProducts = selectedCategory
    ? products.filter((p) => p.category === selectedCategory)
    : products;

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleCategoryClick = (category: string | null) => {
    setSelectedCategory(category);
    setCurrentPage(1);

    const query = category ? `?category=${category}` : "";
    router.push(`/products${query}`);
  };

  return (
    <main>
      <PageBanner
        title={selectedCategory ?? "Explore All Products"}
        subtitle="Discover furniture for every room — crafted with elegance and comfort."
        backgroundImage="/assets/chair10.jpg"
        overlayOpacity="bg-black/80"
      />

      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-3 justify-center mb-10">
            <button
              onClick={() => handleCategoryClick(null)}
              className={`px-4 py-2 rounded-lg font-medium ${
                selectedCategory === null
                  ? "bg-teal-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`px-4 py-2 rounded-lg font-medium ${
                  selectedCategory === category
                    ? "bg-teal-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          <motion.div
            key={`${currentPage}-${selectedCategory}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10"
          >
            {currentProducts.map((product, index) => (
              <motion.div
                key={product.id}
                variants={fadeInUp}
                initial="hidden"
                animate="show"
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="relative"
              >
                <motion.div className="bg-gray-50 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer">
                  <div className="relative w-full h-60 overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />

                    <button
                      className="absolute top-3 right-3 bg-white/80 backdrop-blur-md rounded-full p-2 shadow-md hover:bg-white hover:scale-110 transition-all duration-200"
                      aria-label="Add to cart"
                    >
                      <ShoppingCart size={18} className="text-gray-800" />
                    </button>
                  </div>

                  <div className="p-5 text-center">
                    <p className="text-gray-500 text-sm">{product.brand}</p>
                    <h3 className="text-lg font-medium mt-1 text-gray-900">
                      {product.name}
                    </h3>

                    <div className="mt-2 flex justify-center items-center space-x-2">
                      {product.oldPrice && (
                        <span className="text-gray-400 line-through text-sm">
                          ${product.oldPrice}
                        </span>
                      )}
                      <span className="text-red-600 font-semibold">
                        ${product.price}
                      </span>
                    </div>

                    <Link
                      href={`/products/${product.id}`}
                      className="mt-4 w-full py-2 rounded-lg bg-black text-white text-sm font-medium hover:bg-gray-800 transition text-center block"
                    >
                      View Product
                    </Link>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Pagination Controls */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center items-center gap-3 mt-12"
          >
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`flex items-center justify-center w-9 h-9 rounded-full border transition-all duration-200 ${
                currentPage === 1
                  ? "opacity-50 cursor-not-allowed border-gray-300 text-gray-400"
                  : "hover:bg-gray-100 border-gray-300 text-gray-700"
              }`}
            >
              <ChevronLeft size={18} />
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => goToPage(index + 1)}
                className={`w-8 h-8 flex items-center justify-center rounded-full border text-sm font-medium transition-colors ${
                  currentPage === index + 1
                    ? "bg-red-600 text-white border-red-600"
                    : "text-gray-600 border-gray-300 hover:bg-gray-100"
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`flex items-center justify-center w-9 h-9 rounded-full border transition-all duration-200 ${
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed border-gray-300 text-gray-400"
                  : "hover:bg-gray-100 border-gray-300 text-gray-700"
              }`}
            >
              <ChevronRight size={18} />
            </button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
