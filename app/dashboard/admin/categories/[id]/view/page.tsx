import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ id: string }> };

// (Optional) SEO for the admin view page
export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const item = await prisma.category.findUnique({
    where: { slug: id },
    select: { name: true, description: true, image: true },
  });
  if (!item) return { title: "Categories not found" };
  return {
    title: `View: ${item.name}`,
    description: item.description,
    openGraph: {
      title: item.name,
      description: item.description,
      images: item.image ? [{ url: item.image }] : undefined,
    },
  };
}

export default async function AdminAnnouncementView({ params }: Props) {
  const { id } = await params;
  const item = await prisma.category.findUnique({
    where: { slug: id },
    select: {
      name: true,
      slug: true,
      image: true,
      description: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!item) return notFound();

  return (
    <div className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Category Details</h1>
          <p className="text-sm text-slate-500">
            Slug: <span className="font-mono">{item.slug}</span>
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            href={`/dashboard/category/${item.slug}/edit`}
            className="rounded-lg border px-3 py-1.5 text-sm hover:bg-slate-50"
          >
            Edit
          </Link>
          <Link
            href="/dashboard/admin/categories"
            className="rounded-lg border px-3 py-1.5 text-sm hover:bg-slate-50"
          >
            ← Back
          </Link>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-[1fr,18rem]">
        {/* Main content */}
        <div className="rounded-2xl border bg-white p-5">
          <div className="flex items-center justify-between text-sm text-slate-500">
            <span>
              Updated{" "}
              {item.updatedAt.toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>

          <h2 className="mt-6 text-2xl font-bold">{item.name}</h2>

          {item.description && (
            <p className="mt-3 text-slate-700">{item.description}</p>
          )}

          {item.image && (
            <div className="mt-4 relative w-full h-80  overflow-hidden rounded-xl bg-slate-100">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
              />
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
                <dd>{item.createdAt.toLocaleDateString()}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">Updated</dt>
                <dd>{item.updatedAt.toLocaleDateString()}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">Slug</dt>
                <dd className="font-mono">{item.slug}</dd>
              </div>
            </dl>
          </div>
        </aside>
      </div>
    </div>
  );
}
