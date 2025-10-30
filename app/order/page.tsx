"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal">("card");

  const cartItems = [
    { name: "Porcelain Dinner Plate (27cm)", price: 59 },
    { name: "Ophelia Matte Natural Vase", price: 168 },
    { name: "Luana Bowl", price: 48 },
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const shipping = 15;
  const total = subtotal + shipping;

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-3xl font-bold mb-8"
      >
        Checkout
      </motion.h1>

      <div className="grid md:grid-cols-3 gap-10">
        {/* Left: Billing Form */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="md:col-span-2"
        >
          <h2 className="text-xl font-semibold mb-4">Billing Details</h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="text-sm font-medium">First Name *</label>
              <input className="w-full border rounded-md p-3 mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium">Last Name *</label>
              <input className="w-full border rounded-md p-3 mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium">Company</label>
              <input className="w-full border rounded-md p-3 mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium">Country / Region *</label>
              <select className="w-full border rounded-md p-3 mt-1">
                <option>United States</option>
                <option>Nigeria</option>
                <option>United Kingdom</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-medium">Street Address *</label>
              <input className="w-full border rounded-md p-3 mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium">Town / City *</label>
              <input className="w-full border rounded-md p-3 mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium">State *</label>
              <input className="w-full border rounded-md p-3 mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium">ZIP Code</label>
              <input className="w-full border rounded-md p-3 mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium">Phone *</label>
              <input
                className="w-full border rounded-md p-3 mt-1"
                placeholder="(123) 456-7890"
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                className="w-full border rounded-md p-3 mt-1"
                placeholder="example@youremail.com"
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-medium">Order Notes</label>
              <textarea
                className="w-full border rounded-md p-3 mt-1"
                rows={3}
                placeholder="Type your message here..."
              />
            </div>
          </form>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-8">
            <Link
              href="/cart"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
            >
              ← Return to Cart
            </Link>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="bg-black text-white px-6 py-3 rounded-md"
            >
              Continue to Shipping →
            </motion.button>
          </div>
        </motion.div>

        {/* Right: Order Summary & Payment */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <ul className="space-y-2 text-sm">
              {cartItems.map((item, index) => (
                <li key={index} className="flex justify-between">
                  <span>{item.name}</span>
                  <span>${item.price.toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <hr className="my-4" />
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg mt-3">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <div className="bg-gray-900 text-white rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Payment</h2>
            <div className="space-y-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "card"}
                  onChange={() => setPaymentMethod("card")}
                />
                Credit Card
               
              </label>

              {paymentMethod === "card" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-3 mt-3"
                >
                  <input
                    placeholder="Card number"
                    className="w-full p-3 rounded-md bg-gray-800 border border-gray-700"
                  />
                  <input
                    placeholder="Name on card"
                    className="w-full p-3 rounded-md bg-gray-800 border border-gray-700"
                  />
                  <div className="flex gap-3">
                    <input
                      placeholder="MM/YY"
                      className="w-1/2 p-3 rounded-md bg-gray-800 border border-gray-700"
                    />
                    <input
                      placeholder="Security code"
                      className="w-1/2 p-3 rounded-md bg-gray-800 border border-gray-700"
                    />
                  </div>
                </motion.div>
              )}

              <label className="flex items-center gap-2 mt-3">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "paypal"}
                  onChange={() => setPaymentMethod("paypal")}
                />
                PayPal
              </label>
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              className="mt-6 w-full bg-orange-600 hover:bg-orange-700 transition text-white font-medium py-3 rounded-md"
            >
              Place Order
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
