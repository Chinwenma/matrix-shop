"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
// import { isObjectId } from "@/lib/slugify";
import ImageKit from "imagekit";
import prisma from "@/lib/prisma";
import { isObjectId } from "@/lib/slugify";

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_KEY ?? "",
  privateKey: process.env.PRIVATE_KEY ?? "",
  urlEndpoint: process.env.NEXT_PUBLIC_URL_ENDPOINT ?? "",
});

export async function updateCategoryAction(
  oldSlug: string,
  formData: FormData
) {
  const name = String(formData.get("name") ?? "").trim();
  const slug = String(formData.get("slug") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  

  if (!name) {
    throw new Error("Name is required.");
  }
  if (!slug) {
    throw new Error("Slug is required.");
  }
  
  const existingCategory = await prisma.category.findUnique({
    where: { slug },
  });
  if (!existingCategory) {
    throw new Error("Category not found.");
  }
  let imageUrl = existingCategory.image;
  const imageFile = formData.get("image");
  if (imageFile instanceof File && imageFile.size > 0) {
    try {
      // Upload new image image
      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const uploadResponse = await imagekit.upload({
        file: buffer,
        fileName: `Category-image-${slug}-${Date.now()}.${imageFile.name
          .split(".")
          .pop()}`,
        folder: "/matrix-shop/categories/images",
      });
      imageUrl = uploadResponse.url;

      // Delete old image image from ImageKit
      if (existingCategory.image) {
        const fileId = existingCategory.image
          .split("/")
          .pop()
          ?.split(".")[0];
        if (fileId) {
          try {
            await imagekit.deleteFile(fileId);
          } catch (error: any) {
            console.error(`Failed to delete old image image: ${error.message}`);
          }
        }
      }
    } catch (error: any) {
      throw new Error(`Failed to upload image image: ${error.message}`);
    }
  }

  await prisma.category.update({
    where: { slug: oldSlug },
    data: {
      name,
      slug,
      image: imageUrl,
      description,
    },
  });
  revalidatePath("/dashboard/admin/categories");
  revalidatePath(`/categories/${slug}`);
  revalidatePath("/dashboard/admin/categories");
//   revalidatePath("/");
  redirect("/dashboard/admin/categories");
}


export async function updateProductAction(slugOrId: string, formData: FormData) {
  const name = String(formData.get("name") || "").trim();
  const slug = String(formData.get("slug") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const brand = String(formData.get("brand") || "").trim();
  const price = parseFloat(String(formData.get("price") || "0"));
  const oldPrice = formData.get("oldPrice")
    ? parseFloat(String(formData.get("oldPrice")))
    : undefined;
  const categoryId = String(formData.get("categoryId") || "");

  if (!name || !slug || !description || !categoryId) {
    throw new Error("Name, slug, description, and category are required");
  }

  const where = isObjectId(slugOrId) ? { id: slugOrId } : { slug: slugOrId };
  const existingProduct = await prisma.product.findUnique({ where });
  if (!existingProduct) throw new Error("Product not found");

  if (slug !== existingProduct.slug) {
    const slugExists = await prisma.product.findUnique({ where: { slug } });
    if (slugExists) throw new Error("Slug already exists");
  }

  // Handle main image
  let imageUrl = existingProduct.image;
  const imageFile = formData.get("image");
  if (imageFile instanceof File && imageFile.size > 0) {
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    const uploadResponse = await imagekit.upload({
      file: buffer,
      fileName: `product-image-${slug}-${Date.now()}.${imageFile.name.split(".").pop()}`,
      folder: "/matrix-shop/products/main",
    });
    imageUrl = uploadResponse.url;
  }

  // Handle gallery images
  let imageUrls = existingProduct.images;
  const imageFiles = formData.getAll("images");
  if (imageFiles.some((f) => f instanceof File && f.size > 0)) {
    imageUrls = [];
    for (const file of imageFiles) {
      if (file instanceof File && file.size > 0) {
        const buffer = Buffer.from(await file.arrayBuffer());
        const uploadResponse = await imagekit.upload({
          file: buffer,
          fileName: `product-image-${slug}-${Date.now()}.${file.name.split(".").pop()}`,
          folder: "/matrix-shop/products/gallery",
        });
        imageUrls.push(uploadResponse.url);
      }
    }
  }

  await prisma.product.update({
    where,
    data: {
      name,
      slug,
      description,
      brand,
      price,
      oldPrice,
      image: imageUrl,
      images: imageUrls,
      categoryId,
    },
  });

  revalidatePath("/dashboard/admin/products");
  revalidatePath("/products");
  revalidatePath("/");

  redirect("/dashboard/admin/products");
}
