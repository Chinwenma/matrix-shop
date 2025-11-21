import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await getServerSession();
  if (!session?.user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const {
    cartId,
    // shippingAddress, notes
  } = await req.json();

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    const cart = await prisma.cart.findUnique({
      where: { id: cartId, userId: user.id, isActive: true },
      include: { items: { include: { product: true } } },
    });

    if (!cart || cart.items.length === 0) {
      return NextResponse.json(
        { error: "Cart not found or empty" },
        { status: 400 }
      );
    }

    const order = await prisma.order.create({
      data: {
        userId: user.id,
        cartId: cart.id,
        total: cart.totalPrice + cart.totalItems * 5, // + shipping
        status: "paid",
        items: {
          create: cart.items.map((item) => ({
            cartItemId: item.id,
            productId: item.productId,
            name: item.product.name,
            image: item.product.image,
            price: item.price,
            quantity: item.quantity,
            subtotal: item.subtotal,
          })),
        },
      },
      include: { items: true },
    });

    // Deactivate cart
    await prisma.cart.update({
      where: { id: cart.id },
      data: { isActive: false },
    });

    return NextResponse.json({ success: true, orderId: order.id });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Someething went wrong",
      },
      { status: 500 }
    );
  }
}
