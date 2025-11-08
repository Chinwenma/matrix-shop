"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
// import { isObjectId } from "@/lib/slugify";
import ImageKit from "imagekit";
import prisma from "@/lib/prisma";

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