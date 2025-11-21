import OrderDetailsPage from "@/app/components/OrderDetail";
import prisma from "@/lib/prisma";

export default async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = await prisma.order.findUnique({
    where: {
      id,
    },
    include: {
      items: true,
    },
  })

  const orderData = order ? {
    total: order.total,
    date: order.createdAt.toString(),
    status: order.status,
    items: order.items.map(item => ({ name: item.name, qty: item.quantity }))
  } : null
  return <OrderDetailsPage order={orderData} />
}