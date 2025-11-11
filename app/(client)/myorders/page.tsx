import OrdersPage from "@/app/components/orders/Order";
import authOptions from "@/lib/authOptions";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

export default async function MyOrdersPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return <p className="p-8 text-center">Please sign in to view your orders.</p>;
  }
  const myOrders = await prisma.order.findMany({
    where: { userId: session.user.id!,  },
    orderBy: { createdAt: "desc" }
  })
  return <OrdersPage orders={myOrders} />;
}