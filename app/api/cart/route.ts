import authOptions from "@/lib/authOptions";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

// Utility: recalculate totals when cart items change
async function recalcCartTotals(cartId: string) {
  const items = await prisma.cartItem.findMany({
    where: { cartId },
  });

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.subtotal, 0);

  await prisma.cart.update({
    where: { id: cartId },
    data: { totalItems, totalPrice },
  });
}

// 🛒 GET → Retrieve active cart for a user
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    if (!email)
      return NextResponse.json({ error: "User ID required" }, { status: 400 });
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    const cart = await prisma.cart.findFirst({
      where: { userId: user.id, isActive: true },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    return NextResponse.json(cart ?? { message: "No active cart" });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch cart" },
      { status: 500 }
    );
  }
}

// 🛍️ POST → Add item to cart
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({
      error: "not signed in",
    });
  }

  try {
    const { productId, quantity } = await req.json();
    const email = session?.user.email;
    if (!email || !productId)
      return NextResponse.json(
        { error: "Missing userId or productId" },
        { status: 400 }
      );

    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    let cart = await prisma.cart.findFirst({
      where: { userId: user.id, isActive: true },
    });
    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId: user.id },
      });
    }

    // get product details
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });
    if (!product)
      return NextResponse.json({ error: "Product not found" }, { status: 404 });

    // check if product already exists in cart
    const existingItem = await prisma.cartItem.findFirst({
      where: { cartId: cart.id, productId },
    });

    if (existingItem) {
      // update quantity
      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: {
          quantity: existingItem.quantity + (quantity || 1),
          subtotal:
            (existingItem.quantity + (quantity || 1)) * existingItem.price,
        },
      });
    } else {
      // add new item
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          price: product.price,
          quantity: quantity || 1,
          subtotal: product.price * (quantity || 1),
        },
      });
    }

    // recalculate totals
    await recalcCartTotals(cart.id);

    const updatedCart = await prisma.cart.findUnique({
      where: { id: cart.id },
      include: { items: { include: { product: true } } },
    });

    return NextResponse.json(updatedCart);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to add to cart" },
      { status: 500 }
    );
  }
}

// 🧾 PATCH → Update quantity of a cart item
export async function PATCH(req: Request) {
  try {
    const { itemId, quantity } = await req.json();
    if (!itemId || typeof quantity !== "number")
      return NextResponse.json(
        { error: "Missing itemId or invalid quantity" },
        { status: 400 }
      );

    const item = await prisma.cartItem.findUnique({ where: { id: itemId } });
    if (!item)
      return NextResponse.json({ error: "Item not found" }, { status: 404 });

    const updatedItem = await prisma.cartItem.update({
      where: { id: itemId },
      data: {
        quantity,
        subtotal: item.price * quantity,
      },
    });

    await recalcCartTotals(item.cartId);

    return NextResponse.json(updatedItem);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to update cart item" },
      { status: 500 }
    );
  }
}

// 🗑️ DELETE → Remove an item from cart
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const itemId = searchParams.get("itemId");

    if (!itemId)
      return NextResponse.json({ error: "itemId required" }, { status: 400 });

    const item = await prisma.cartItem.delete({
      where: { id: itemId },
    });

    await recalcCartTotals(item.cartId);

    return NextResponse.json({ message: "Item removed" });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to delete item" },
      { status: 500 }
    );
  }
}

// ♻️ PUT → Clear or deactivate the cart
export async function PUT(req: Request) {
  try {
    const { userId, action } = await req.json();
    if (!userId)
      return NextResponse.json({ error: "userId required" }, { status: 400 });

    const cart = await prisma.cart.findFirst({
      where: { userId, isActive: true },
    });
    if (!cart)
      return NextResponse.json({ error: "Cart not found" }, { status: 404 });

    if (action === "clear") {
      await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
      await prisma.cart.update({
        where: { id: cart.id },
        data: { totalItems: 0, totalPrice: 0 },
      });
    } else if (action === "deactivate") {
      await prisma.cart.update({
        where: { id: cart.id },
        data: { isActive: false },
      });
    }

    return NextResponse.json({ message: `Cart ${action} successful` });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to update cart" },
      { status: 500 }
    );
  }
}
