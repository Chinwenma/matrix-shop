// import bcrypt from "bcryptjs";
// import prisma from "./prisma";

// async function main() {
//   console.log("🌱 Seeding database...");

//   const password = await bcrypt.hash("matrix042", 10);
//   await prisma.user.create({
//     data: {
//       email: "matrix@shop.com",
//       name: "Matrix Shop Admin",
//       password,
//     },
//   });
//   console.log("✅ Database seeded successfully.");  

// }

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });import { categories } from './categories';




// import { PrismaClient } from "@prisma/client";
// import { products } from "./products";
// const prisma = new PrismaClient();

// async function main() {
//   console.log("🌱 Seeding categories and products (optimized)...");

//   // Step 1: Create or get unique categories
//   const categoryNames = [...new Set(products.map(p => p.category))];
//   const categories = await Promise.all(
//     categoryNames.map(async (name) => {
//       const slug = name.toLowerCase().replace(/\s+/g, "-");
//       const existing = await prisma.category.findUnique({ where: { slug } });
//       return existing
//         ? existing
//         : await prisma.category.create({
//             data: {
//               name,
//               slug,
//               image: `/assets/${slug}.jpg`,
//               description: `${name} furniture collection.`,
//             },
//           });
//     })
//   );

//   // Step 2: Map each product to include categoryId
//   const productsToInsert = products.map((p) => {
//     const category = categories.find(c => c.name === p.category);
//     return {
//       slug: p.slug,
//       name: p.name,
//       brand: p.brand,
//       price: p.price,
//       oldPrice: p.oldPrice ?? null,
//       image: p.image,
//       images: p.images,
//       description: p.description,
//       details: p.details,
//       categoryId: category?.id ?? "",
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     };
//   });

//   // Step 3: Bulk insert products
//   await prisma.product.createMany({
//     data: productsToInsert,
//   });

//   console.log(`✅ Inserted ${productsToInsert.length} products successfully!`);
// }

// main()
//   .catch((e) => {
//     console.error("❌ Error seeding data:", e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });

import prisma from "@/lib/prisma";
import { orders } from "./orders"; // your orders array
import bcrypt from "bcryptjs";

async function main() {
  let customer = await prisma.user.findFirst({
    where: { role: "CUSTOMER" },
  });

  if (!customer) {
    const password = await bcrypt.hash("matrix042", 10)
    customer = await prisma.user.create({
      data: {
        name: "Customer",
        email: "customer@example.com",
        password,
        role: "CUSTOMER",
      },
    });
  }

  for (const order of orders) {
    const createdOrder = await prisma.order.create({
      data: {
        userId: customer.id,
        total: order.total,
        status: order.status,
        createdAt: new Date(order.date),
        updatedAt: new Date(order.date),
      },
    });

    for (const item of order.items) {
      const product = await prisma.product.findFirst({
        where: { name: item.name },
      });

      if (!product) {
        console.warn(`Product not found: ${item.name}, skipping`);
        continue;
      }

      await prisma.orderItem.create({
        data: {
          orderId: createdOrder.id,
          productId: product.id,
          quantity: item.qty,
          price: product.price,
        },
      });
    }
  }

  console.log("✅ Seeded orders for a customer successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

