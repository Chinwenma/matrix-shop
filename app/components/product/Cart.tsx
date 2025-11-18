"use client";

import { ShoppingCart } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
export default function ShoppingCartIcon({ productId }: { productId: string }) {
  const { status } = useSession();
  const router = useRouter();
  const handleAddToCart = async () => {
    switch (status) {
      case "loading":
        toast.info("Loading session");
        break;
      case "unauthenticated":
        router.push("/signin");
        break;
      case "authenticated":        
        const res = await fetch("/api/cart", {
          method: "POST",
          body: JSON.stringify({
            productId,
            quantity: 1,
          }),
        });
        const resData = await res.json()
        if (res.ok) {
          toast.success("Item added successfully");
        } else {
          toast.error(resData.error as unknown as string);
        }
        break;
      default:
        toast.info("Loading session");
        break;
    }
  };
  return (
    <ShoppingCart
      onClick={handleAddToCart}
      size={18}
      className="text-gray-800"
    />
  );
}
