import Image from "next/image";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import PageBanner from "@/app/components/banner/PageBanner";
import ShoppingCartIcon from "@/app/components/product/Cart";

// ✅ Next.js 15 now makes searchParams a Promise
interface ProductsPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  // ✅ Await searchParams to unwrap the Promise
  const params = await searchParams;

  const currentPage = Number(params?.page ?? 1);
  const selectedCategory =
    typeof params?.category === "string" ? params.category : null;
  const productsPerPage = 8;

  // --- Fetch all categories for filter buttons ---
  const categories = await prisma.category.findMany({
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });

  // --- Find category ID if category filter is active ---
  let categoryFilter = {};
  if (selectedCategory) {
    const category = await prisma.category.findFirst({
      where: { name: selectedCategory },
      select: { id: true },
    });
    if (category) {
      categoryFilter = { categoryId: category.id };
    }
  }

  // --- Get products (with category info) and total count ---
  const [products, totalProducts] = await Promise.all([
    prisma.product.findMany({
      where: categoryFilter,
      include: { category: { select: { name: true } } },
      orderBy: { createdAt: "desc" },
      skip: (currentPage - 1) * productsPerPage,
      take: productsPerPage,
    }),
    prisma.product.count({ where: categoryFilter }),
  ]);

  const totalPages = Math.ceil(totalProducts / productsPerPage);

  // --- Helper for pagination links ---
  const makePageUrl = (page: number) => {
    const query = new URLSearchParams();
    if (selectedCategory) query.set("category", selectedCategory);
    if (page > 1) query.set("page", String(page));
    return `/products${query.toString() ? `?${query.toString()}` : ""}`;
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
            <Link
              href="/products"
              className={`px-4 py-2 rounded-lg font-medium ${
                !selectedCategory
                  ? "bg-teal-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All
            </Link>

            {categories.map(({ id, name }) => (
              <Link
                key={id}
                href={`/products?category=${encodeURIComponent(name)}`}
                className={`px-4 py-2 rounded-lg font-medium ${
                  selectedCategory === name
                    ? "bg-teal-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {name}
              </Link>
            ))}
          </div>

          {/* Product Grid */}
          {products.length === 0 ? (
            <p className="text-center text-gray-600 py-20">
              No products found in this category.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="relative bg-gray-50 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
                >
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
                      <ShoppingCartIcon productId={product.id} />
                    </button>
                  </div>

                  <div className="p-5 text-center">
                    {product.brand && (
                      <p className="text-gray-500 text-sm">{product.brand}</p>
                    )}
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
                      href={`/products/${product.slug}`}
                      className="mt-4 w-full py-2 rounded-lg bg-black text-white text-sm font-medium hover:bg-gray-800 transition text-center block"
                    >
                      View Product
                    </Link>

                    {product.category && (
                      <p className="text-xs text-gray-400 mt-2">
                        {product.category.name}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-3 mt-12">
              {/* Prev */}
              <Link
                href={makePageUrl(currentPage - 1)}
                className={`flex items-center justify-center w-9 h-9 rounded-full border transition-all duration-200 ${
                  currentPage === 1
                    ? "opacity-50 pointer-events-none border-gray-300 text-gray-400"
                    : "hover:bg-gray-100 border-gray-300 text-gray-700"
                }`}
              >
                <ChevronLeft size={18} />
              </Link>

              {/* Page Numbers */}
              {Array.from({ length: totalPages }).map((_, index) => {
                const page = index + 1;
                return (
                  <Link
                    key={page}
                    href={makePageUrl(page)}
                    className={`w-8 h-8 flex items-center justify-center rounded-full border text-sm font-medium transition-colors ${
                      currentPage === page
                        ? "bg-red-600 text-white border-red-600"
                        : "text-gray-600 border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    {page}
                  </Link>
                );
              })}

              {/* Next */}
              <Link
                href={makePageUrl(currentPage + 1)}
                className={`flex items-center justify-center w-9 h-9 rounded-full border transition-all duration-200 ${
                  currentPage === totalPages
                    ? "opacity-50 pointer-events-none border-gray-300 text-gray-400"
                    : "hover:bg-gray-100 border-gray-300 text-gray-700"
                }`}
              >
                <ChevronRight size={18} />
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
