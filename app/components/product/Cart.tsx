"use client";

import { ShoppingCart } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { toast } from "react-toastify";
import { Context } from "../contextProvider";
import Button from "../btn/Button";

export default function ShoppingCartIcon({ productId, type = "icon" }: { productId: string, type?: string }) {
  const { status } = useSession();
  const router = useRouter();
  const { count } = useContext(Context);
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
          count.setter(count.value + 1);
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
    <>
      {type === "icon" ?
        <ShoppingCart
          onClick={handleAddToCart}
          size={18}
          className="text-gray-800"
        />
        :
        <Button onClick={handleAddToCart}>Add to Cart</Button>
      }
    </>
  );
}
