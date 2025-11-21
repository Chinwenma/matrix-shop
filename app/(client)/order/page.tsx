import CheckoutPage from "@/app/components/Order";
import authOptions from "@/lib/authOptions";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import Link from "next/link";
export default async function page() {
   const session = await getServerSession(authOptions);
    if (!session) {
      return (
        <div className="my-20">
          <h1 className="text-3xl font-bold mb-8 text-center my-20">Please Sign In to view your cart</h1>
          <div className="flex justify-center">
            <Link href="/signin" className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded">
              Sign In
            </Link>
          </div>
        </div>
      );
    }
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });
    if (!user) {
      return (
        <div className="my-20">
          <h1 className="text-3xl font-bold mb-8 text-center my-20">Please Sign In to view your cart</h1>
          <div className="flex justify-center">
            <Link href="/signin" className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded">
              Sign In
            </Link>
          </div>
        </div>
      );
    }
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
    if (!cart) {
      return (
        <div className="my-20">
          <h1 className="text-3xl font-bold mb-8 text-center my-20">No active cart for user</h1>
        </div>
      );
    }
    const cartData= {
      id: cart.id,
      totalPrice: cart.totalPrice,
      totalItems: cart.totalItems,
      items: cart.items.map(item=>({
        id: item.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
      }))
    }
  return <CheckoutPage cart={cartData} />
}
