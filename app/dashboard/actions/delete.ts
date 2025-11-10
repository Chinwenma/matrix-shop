"use server"
/* eslint-disable @typescript-eslint/no-explicit-any */

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
function isRecordNotFound(e: any) {
  return e?.code === "P2025";
}

export async function deleteCategory(id: string) {
  if (!id) return;
  try {
    await prisma.category.delete({ where: { id } });
  } catch (e: any) {
    if (!isRecordNotFound(e)) throw e;
  }
  revalidatePath("/dashboard/admin/categories");
    revalidatePath("/categories");
    // revalidatePath("/");
}



// export async function deleteHomily(id: string) {
//   if (!id) return;

//   try {
//     await prisma.homily.delete({ where: { id } });
//   } catch (e: any) {
//     if (!isRecordNotFound(e)) throw e;
//   }
//   revalidatePath("/dashboard/bishop/homily");
//   revalidatePath("/homily");
//   revalidatePath("/");
// }

// export async function deleteClergy(id: string) {
//   if (!id) return;
//   try {
//     await prisma.clergy.delete({ where: { id } });
//   } catch (e: any) {
//     if (!isRecordNotFound(e)) throw e;
//   }
//   revalidatePath("/dashboard/admin/clergy");
//   revalidatePath("/clergy");
// }

// export async function deleteEvent(id: string) {
//   if (!id) return;

//   try {
//     await prisma.event.delete({ where: {id} });
//   } catch (e: any) {
//     if (!isRecordNotFound(e)) throw e;
//   }
//   revalidatePath("/dashboard/admin/events");
//   revalidatePath("/event");
//   revalidatePath("/");
// }

