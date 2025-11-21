"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { useContext, useState } from "react";
import { Context } from "./contextProvider";

export default function CartPage({ cart }: { cart: { totalPrice: number, items: Array<{ id: string, name: string, price: number, image: string, quantity: number }> } }) {
    const [cartItems, setCartItems] = useState(cart.items);
    const [subtotal, setSubTotal] = useState(cart.totalPrice);
    const { count } = useContext(Context);

    return (
        <div className="max-w-6xl mx-auto px-6 py-16">
            <motion.h1
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl font-bold mb-8"
            >
                Shopping Cart
            </motion.h1>

            {/* Cart Table */}
            <div className="overflow-x-auto border-t border-b">
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-gray-100 uppercase text-gray-600">
                        <tr>
                            <th className="py-4 px-4">Product</th>
                            <th className="py-4 px-4">Price</th>
                            <th className="py-4 px-4">Quantity</th>
                            <th className="py-4 px-4">Total</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map((item, index) => (
                            <motion.tr
                                key={item.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="border-b hover:bg-gray-50"
                            >
                                <td className="py-4 px-4 flex items-center gap-4">
                                    <div className="w-20 h-20 relative rounded-md overflow-hidden">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            height={600}
                                            width={600}
                                            className="object-cover"
                                        />
                                    </div>
                                    <span className="font-medium">{item.name}</span>
                                </td>
                                <td className="py-4 px-4">${item.price}</td>
                                <td className="py-4 px-4">
                                    <span className="">{item.quantity}</span>
                                </td>
                                <td className="py-4 px-4 font-semibold">
                                    ${item.price * item.quantity}
                                </td>
                                <td className="py-4 px-4">
                                    <Trash2 size={18} className="text-red-500 hover:text-red-700 transition" onClick={async () => {
                                        const res = await fetch("/api/cart?itemId=" + item.id, {
                                            method: "DELETE",
                                        });
                                        const data = await res.json();
                                        if (!res.ok) {
                                            toast.error(data.error);
                                        } else {
                                            toast.success(data.message)
                                            count.setter(0)
                                            setCartItems((prev) => prev.filter(i => i.id !== item.id))
                                            setSubTotal((prev) => prev - (item.price * item.quantity));
                                        }
                                    }} />
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Cart Totals */}
            <div className="mt-10 flex flex-col md:flex-row justify-between gap-10">
                {/* Left side - Buttons */}
                <div className="flex gap-4">
                    <div>
                        <Link
                            href="/products"
                            className="border border-gray-300 px-6 py-3 rounded-md text-gray-800 hover:bg-gray-100 transition"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                </div>

                {/* Right side - Totals */}
                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                    className="bg-gray-50 border rounded-lg p-6 w-full md:w-1/3"
                >
                    <h2 className="text-xl font-semibold mb-4">Cart Totals</h2>
                    <div className="flex justify-between mb-2">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                        <span>Shipping</span>
                        <span className="text-green-600 font-medium">Free!!!</span>
                    </div>
                    <hr className="my-3" />
                    <div className="flex justify-between font-semibold text-lg">
                        <span>Total</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="mt-6">
                        <Link
                            href="/order"
                            className="bg-orange-600 text-white px-6 py-3 rounded-md hover:bg-orange-700 transition"
                        >
                            Proceed to Checkout
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
