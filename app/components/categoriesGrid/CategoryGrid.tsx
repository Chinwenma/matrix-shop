import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";

export default async function CategoriesGrid() {
  const categories = await prisma.category.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10">
          Explore Our Categories
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div
              key={category.id}
              className="relative group overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 bg-white"
            >
              {/* Image */}
              <div className="relative h-64 w-full">
                <Image
                  src={category.image!}
                  alt={category.name}
                  height={700}
                  width={700}
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
                href={`/products?category=${encodeURIComponent(category.name)}`}
                  className="inline-block text-sm font-medium text-white bg-gray-900 px-4 py-2 rounded-lg hover:bg-gray-700 transition-all duration-300"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
