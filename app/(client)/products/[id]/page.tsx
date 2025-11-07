import { Star } from "lucide-react";
import Button from "@/app/components/btn/Button";
import prisma from "@/lib/prisma";
import ProductGallery from "@/app/components/product/ProductGallery";

interface ProductDetailsProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetails({ params }: ProductDetailsProps) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: { id },
    include: { category: true },
  });

  if (!product) {
    return (
      <div className="text-center py-20 text-gray-600">
        <p>Product not found.</p>
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-10">
      {/* Left: Interactive gallery (client component) */}
      <ProductGallery images={product.images || []} name={product.name} />

      {/* Right: Product details */}
      <div className="flex flex-col justify-center">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          {product.name}
        </h1>
        {product.category && (
          <p className="text-gray-500 mb-2">{product.category.name}</p>
        )}

        <div className="flex items-center space-x-3 mb-4">
          <p className="text-2xl font-bold text-red-600">
            ${product.price?.toFixed(2)}
          </p>
          {product.oldPrice && (
            <p className="text-gray-400 line-through text-lg">
              ${product.oldPrice.toFixed(2)}
            </p>
          )}
        </div>

        <div className="flex items-center space-x-3 mb-6">
          <Button>Add to Cart</Button>
        </div>

        {product.description && (
          <p className="text-gray-600 mb-6">{product.description}</p>
        )}

        {product.details && product.details.length > 0 && (
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            {product.details.map((detail, i) => (
              <li key={i}>{detail}</li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
