"use client";

import { useContext, useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Context } from "./contextProvider";

export default function CartIcon({ email }: { email: string }) {
    const [count, setCount] = useState(0);
    const { count: cart } = useContext(Context);
    useEffect(() => {
        async function fetchCart() {
            try {
                const res = await fetch(`/api/cart?email=${email}`);
                const data = await res.json();
                if (data?.items) {
                    setCount(data.totalItems);
                    cart.setter(data.totalItems);
                } else {
                    setCount(0);
                }
            } catch (err) {
                console.error("Failed to fetch cart", err);
                setCount(0);
            }
        }

        if (email) fetchCart();
    }, [email, cart.value]);

    return (
        <div className="relative flex items-center gap-2 cursor-pointer">
            <ShoppingCart className="w-5 h-5" />
            <span className="hidden sm:inline text-sm font-medium">Cart</span>

            {/* Badge */}
            {count > 0 && (
                <span className="absolute -top-2 -right-2 bg-teal-600 text-white text-xs font-bold rounded-full px-2 py-0.5">
                    {count}
                </span>
            )}
        </div>
    );
}
