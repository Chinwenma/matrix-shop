import prisma from "@/lib/prisma";
import { promises } from "dns";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = { params: Promise <{ id: string }> };

// (Optional) SEO for the product view page
export async function generateMetadata({ params }: Props) {
  const { id } =  await params;
  const product = await prisma.product.findUnique({
    where: { slug: id },
    select: { name: true, description: true, image: true},
  });
  if (!product) return { title: "Product not found" };
  return {
    title: `View: ${product.name}`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.image ? [{ url: product.image }] : undefined,
    },
  };
}

export default async function AdminProductView({ params }: Props) {
  const { id } =  await params;
  const product = await prisma.product.findUnique({
    where: { slug: id },
    select: {
      name: true,
      slug: true,
      price: true,
      oldPrice: true,
      brand: true,
      image: true,
      images: true,
      description: true,
      category: { select: { name: true } },
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!product) return notFound();

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Product Details</h1>
          <p className="text-sm text-slate-500">
            Slug: <span className="font-mono">{product.slug}</span>
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            href={`/dashboard/products/${product.slug}/edit`}
            className="rounded-lg border px-3 py-1.5 text-sm hover:bg-slate-50"
          >
            Edit
          </Link>
          <Link
            href="/dashboard/admin/products"
            className="rounded-lg border px-3 py-1.5 text-sm hover:bg-slate-50"
          >
            ← Back
          </Link>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-[1fr,18rem]">
        {/* Main content */}
        <div className="rounded-2xl border bg-white p-5 space-y-4">
          <div className="flex items-center justify-between text-sm text-slate-500">
            <span>
              Updated{" "}
              {product.updatedAt.toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>

          <h2 className="text-2xl font-bold">{product.name}</h2>

          <p className="text-gray-700">
            <span className="font-medium">Brand:</span> {product.brand || "N/A"}
          </p>

          <p className="text-gray-700">
            <span className="font-medium">Category:</span> {product.category.name}
          </p>

          <p className="text-gray-700">
            <span className="font-medium">Price:</span>{" "}
            <span className="text-teal-600 font-semibold">${product.price.toFixed(2)}</span>{" "}
            {product.oldPrice && (
              <span className="line-through text-gray-400 ml-2">
                ${product.oldPrice.toFixed(2)}
              </span>
            )}
          </p>

          {product.description && (
            <div>
              <h3 className="font-medium mb-1">Description:</h3>
              <p className="text-gray-700">{product.description}</p>
            </div>
          )}

          {/* Main Image */}
          {product.image && (
            <div className="mt-4 relative w-full h-80 overflow-hidden rounded-xl bg-slate-100">
              <Image src={product.image} alt={product.name} fill className="object-cover" />
            </div>
          )}

          {/* Gallery Images */}
          {product.images.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {product.images.map((img) => (
                <div key={img} className="relative w-24 h-24 overflow-hidden rounded-md bg-slate-100">
                  <Image src={img} alt="Gallery" fill className="object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Meta / quick info */}
        <aside className="space-y-4">
          <div className="rounded-2xl border bg-white p-4">
            <div className="text-sm font-semibold">Info</div>
            <dl className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">Created</dt>
                <dd>{product.createdAt.toLocaleDateString()}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">Updated</dt>
                <dd>{product.updatedAt.toLocaleDateString()}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">Slug</dt>
                <dd className="font-mono">{product.slug}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">Brand</dt>
                <dd>{product.brand || "N/A"}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">Category</dt>
                <dd>{product.category.name}</dd>
              </div>
            </dl>
          </div>
        </aside>
      </div>
    </div>
  );
}
