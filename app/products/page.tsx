// import PageBanner from "../components/banner/PageBanner";


// export default function CategoriesPage() {
//   return (
//     <>
//       <PageBanner
//         title="explore all products"
//         subtitle="Discover furniture for every room — crafted with elegance and comfort."
//         backgroundImage="/assets/chair10.jpg"
//         overlayOpacity="bg-black/80"
//       />
//     </>
//   );
// }










"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import PageBanner from "../components/banner/PageBanner";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  oldPrice?: number;
  image: string;
  status?: "bestseller" | "on sale" | "out of stock";
}

const products: Product[] = [
  {
    id: 1,
    name: "Modern Wooden Chair",
    brand: "OakLine",
    price: 120,
    image: "/assets/chair1.jpg",
    status: "bestseller",
  },
  {
    id: 2,
    name: "Classic Leather Sofa",
    brand: "ComfortHaus",
    price: 540,
    image: "/assets/chair10.jpg",
  },
  {
    id: 3,
    name: "Marble Coffee Table",
    brand: "Urban Edge",
    price: 230,
    image: "/assets/chair9.jpg",
  },
  {
    id: 4,
    name: "Velvet Lounge Chair",
    brand: "LuxHome",
    price: 320,
    oldPrice: 400,
    image: "/assets/chair8.jpg",
    status: "on sale",
  },
  {
    id: 5,
    name: "Oak Dining Set",
    brand: "NordCraft",
    price: 780,
    image: "/assets/chair4.jpg",
    status: "out of stock",
  },
  {
    id: 6,
    name: "Rustic Bookshelf",
    brand: "WoodWorks",
    price: 260,
    image: "/assets/chair6.jpg",
  },
];

export default function FurnitureProducts() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (

    <main>
      <PageBanner
         title="explore all products"
         subtitle="Discover furniture for every room — crafted with elegance and comfort."
         backgroundImage="/assets/chair10.jpg"
       overlayOpacity="bg-black/80"
     />
  
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-6">

        {/* Product Grid */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10"
        >
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              variants={fadeInUp}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="relative"
            >
              {/* Status Badge */}
              {product.status && (
                <span
                  className={`absolute top-3 left-3 text-xs font-semibold uppercase px-2 py-1 rounded text-white z-10 ${
                    product.status === "bestseller"
                      ? "bg-yellow-500"
                      : product.status === "on sale"
                      ? "bg-green-600"
                      : "bg-red-600"
                  }`}
                >
                  {product.status}
                </span>
              )}

              {/* Card */}
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-gray-50 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <div className="relative w-full h-60 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
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
  className={`mt-4 w-full py-2 rounded-lg bg-black text-white text-sm font-medium hover:bg-gray-800 transition text-center block ${
    product.status === "out of stock"
      ? "opacity-50 cursor-not-allowed pointer-events-none"
      : ""
  }`}
>
  View Product
</Link>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Pagination */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex justify-center items-center gap-2 mt-12"
        >
          {[...Array(totalPages)].map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              whileHover={{ scale: 1.1 }}
              className={`w-8 h-8 flex items-center justify-center rounded-full border text-sm font-medium transition-colors ${
                currentPage === index + 1
                  ? "bg-red-600 text-white border-red-600"
                  : "text-gray-600 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {index + 1}
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
      </main>
  );
}
