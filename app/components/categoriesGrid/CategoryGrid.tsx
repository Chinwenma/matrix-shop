"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

const categories = [
  {
    id: 1,
    name: "Living Room",
    image: "/assets/chair1.png",
    description: "Cozy sofas, coffee tables & TV stands",
  },
  {
    id: 2,
    name: "Bedroom",
    image: "/assets/chair1.png",
    description: "Comfortable beds, wardrobes & nightstands",
  },
  {
    id: 3,
    name: "Dining Room",
    image: "/assets/chair1.png",
    description: "Stylish dining tables & chairs",
  },
  {
    id: 4,
    name: "Office",
    image: "/assets/chair1.png",
    description: "Desks, chairs & storage for your workspace",
  },
  {
    id: 5,
    name: "Outdoor",
    image: "/assets/chair1.png",
    description: "Perfect sets for gardens & patios",
  },
  {
    id: 6,
    name: "Kids Room",
    image: "/assets/chair1.png",
    description: "Fun furniture for little ones",
  },
];

export default function CategoriesGrid() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10">
          Explore Our Categories
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 bg-white"
            >
              {/* Image */}
              <div className="relative h-64 w-full">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Text */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {category.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {category.description}
                </p>

                <Link
                  href={`/categories/${category.id}`}
                  className="inline-block text-sm font-medium text-white bg-gray-900 px-4 py-2 rounded-lg hover:bg-gray-700 transition-all duration-300"
                >
                  Shop Now
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
