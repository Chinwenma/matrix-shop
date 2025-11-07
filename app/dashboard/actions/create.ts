"use server";

/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { CategoryFormData } from "../admin/categories/new/page";

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