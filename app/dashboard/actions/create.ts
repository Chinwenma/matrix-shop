"use server";

/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { CategoryFormData } from "../admin/categories/new/page";
import { ProductFormData } from "../admin/products/new/page";

/**
 * Creates a new category with the provided form data
 * @param formData - The data for the new announcement containing title, slug, date, image, description, and details
 * @returns Promise<void>
 */
export async function createCategory(formData: CategoryFormData) {
  const { name, slug, image, description } = formData;
  await prisma.category.create({
    data: {
      name,
      slug,
      image,
      description,
    },
  });
  revalidatePath("/dashboard/admin/categories");
  revalidatePath("/categories");
  revalidatePath("/");
}


/**
 * Creates a new category with the provided form data
 * @param formData 
 * @returns Promise<void>
 */
export async function createProduct(formData: ProductFormData) {
  const {
    name,
    slug,
    price,
    brand,
    oldPrice,
    image,
    images,
    description,
    categoryId,
  } = formData;
  try {
    await prisma.product.create({
      data: {
        name,
        slug,
        price,
        brand,
        oldPrice,
        image,
        images,
        description,
        categoryId,
      },
    });
  } catch (error: any) {
    console.log(error);

    throw new Error(`Failed to create event: ${error.message}`);
  }

  revalidatePath("/dashboard/admin/products");
  revalidatePath("/products");
  revalidatePath("/");
}
