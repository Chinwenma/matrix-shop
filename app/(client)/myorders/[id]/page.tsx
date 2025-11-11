"use client";

import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
// import Image from "next/image";
import { ArrowLeft, CheckCircle, Truck, XCircle, Clock } from "lucide-react";
import { orders } from "@/lib/orders";



export default function OrderDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.id as string;

  const order = orders.find((o) => o.status === orderId);

  if (!order) {
    return (
      <section className="py-16 text-center">
        <h2 className="text-2xl font-semibold text-gray-700">Order not found 😢</h2>
        <button
          onClick={() => router.push("/my-orders")}
          className="mt-6 px-5 py-2 rounded-lg bg-black text-white text-sm font-medium hover:bg-gray-800 transition"
        >
          Back to Orders
        </button>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => router.push("/myorders")}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
          >
            <ArrowLeft size={18} /> Back
          </button>
          <StatusBadge status={order.status} />
        </div>

        {/* Order Info */}
        <div className="bg-white p-6 rounded-2xl shadow-sm mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            {/* Order #{order.id} */}
          </h2>
          <p className="text-gray-500 text-sm">Placed on {order.date}</p>
          <p className="text-gray-800 font-medium mt-2">Total: {order.total}</p>
        </div>

        {/* Items */}
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Items</h3>
          <div className="divide-y">
            {order.items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                className="flex items-center justify-between py-4"
              >
                <div className="flex items-center gap-4">
                  {/* <Image
                    src={item.image}
                    alt={item.name}
                    width={60}
                    height={60}
                    className="rounded-lg"
                  /> */}
                  <div>
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-gray-500 text-sm">Qty: {item.qty}</p>
                  </div>
                </div>
                {/* <p className="text-gray-800 font-medium">{item.price}</p> */}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StatusBadge({ status }: { status: string }) {
  let color = "bg-gray-200 text-gray-700";
  let icon = <Clock size={16} />;

  switch (status) {
    case "Delivered":
      color = "bg-green-100 text-green-700";
      icon = <CheckCircle size={16} />;
      break;
    case "Pending":
      color = "bg-yellow-100 text-yellow-700";
      icon = <Truck size={16} />;
      break;
    case "Canceled":
      color = "bg-red-100 text-red-700";
      icon = <XCircle size={16} />;
      break;
  }

  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1 text-sm font-medium rounded-full ${color}`}
    >
      {icon}
      {status}
    </span>
  );
}
