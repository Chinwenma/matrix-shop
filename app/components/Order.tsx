"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";


type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

type Cart = {
  id: string;
  totalPrice: number;
  totalItems: number;
  items: CartItem[];
};

export default function CheckoutPage({ cart }: { cart: Cart }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  // const [paymentMethod] = useState<"card" | "paypal">("card");

  const subtotal = cart.totalPrice;
  const shipping = cart.totalItems * 5; // or make dynamic later
  const total = subtotal + shipping;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    country: "United States",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
    email: "",
    notes: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.streetAddress || !formData.city || !formData.phone || !formData.email) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cartId: cart.id,
          shippingAddress: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            company: formData.company || null,
            country: formData.country,
            streetAddress: formData.streetAddress,
            city: formData.city,
            state: formData.state,
            zipCode: formData.zipCode,
            phone: formData.phone,
            email: formData.email,
          },
          notes: formData.notes || null,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to create order");
      }

      toast.success("Order placed successfully!");
      router.push(`/myorders/${result.orderId}?success=true`);
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

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

      <form onSubmit={handlePlaceOrder}>
        <div className="grid md:grid-cols-3 gap-10">
          {/* Left: Billing Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="md:col-span-2 space-y-6"
          >
            <div>
              <h2 className="text-xl font-semibold mb-4">Billing Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm font-medium">First Name <span className="text-red-500">*</span></label>
                  <input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full border rounded-md p-3 mt-1 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Last Name <span className="text-red-500">*</span></label>
                  <input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full border rounded-md p-3 mt-1 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Company</label>
                  <input
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full border rounded-md p-3 mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Country / Region <span className="text-red-500">*</span></label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full border rounded-md p-3 mt-1"
                  >
                    <option>United States</option>
                    <option>Nigeria</option>
                    <option>United Kingdom</option>
                    <option>Canada</option>
                    <option>Australia</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="text-sm font-medium">Street Address <span className="text-red-500">*</span></label>
                  <input
                    name="streetAddress"
                    value={formData.streetAddress}
                    onChange={handleInputChange}
                    required
                    placeholder="House number and street name"
                    className="w-full border rounded-md p-3 mt-1"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Town / City <span className="text-red-500">*</span></label>
                  <input
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="w-full border rounded-md p-3 mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">State <span className="text-red-500">*</span></label>
                  <input
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                    className="w-full border rounded-md p-3 mt-1"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">ZIP Code</label>
                  <input
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className="w-full border rounded-md p-3 mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Phone <span className="text-red-500">*</span></label>
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    type="tel"
                    placeholder="(123) 456-7890"
                    className="w-full border rounded-md p-3 mt-1"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="text-sm font-medium">Email <span className="text-red-500">*</span></label>
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    type="email"
                    placeholder="example@youremail.com"
                    className="w-full border rounded-md p-3 mt-1"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="text-sm font-medium">Order Notes (optional)</label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Notes about your order, e.g. special delivery instructions."
                    className="w-full border rounded-md p-3 mt-1 resize-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center mt-8">
              <Link
                href="/cart"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition"
              >
                ← Return to Cart
              </Link>
            </div>
          </motion.div>

          {/* Right: Order Summary & Place Order */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="border rounded-lg p-6 bg-gray-50">
              <h2 className="text-xl font-semibold mb-4">Your Order</h2>
              <div className="space-y-3 text-sm">
                {cart.items.map((item) => (
                  <div key={item.id} className="flex justify-between py-2 border-b border-gray-200 last:border-0">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <hr className="my-5 border-gray-300" />

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-3 border-t border-gray-300 mt-3">
                  <span>Total</span>
                  <span className="text-orange-600">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 text-white rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
              <p className="text-sm opacity-90 mb-4">Credit/Debit Card (via Stripe)</p>

              <motion.button
                whileHover={{ scale: isLoading ? 1 : 1.02 }}
                whileTap={{ scale: isLoading ? 1 : 0.98 }}
                disabled={isLoading}
                type="submit"
                className="mt-4 w-full bg-orange-600 hover:bg-orange-700 disabled:bg-orange-800 transition font-medium py-4 rounded-md text-lg flex items-center justify-center gap-3"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" opacity="0.3" />
                      <path fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Processing Order...
                  </>
                ) : (
                  <>Place Order – ${total.toFixed(2)}</>
                )}
              </motion.button>

              <p className="text-xs opacity-70 mt-4 text-center">
                Your payment is secure and encrypted
              </p>
            </div>
          </motion.div>
        </div>
      </form>
    </div>
  );
}