"use client";


import { Order } from "@/lib/client";
import { motion } from "framer-motion";
import { Package, Truck, CheckCircle, XCircle, Clock } from "lucide-react";
import Link from "next/link";


export default function OrdersPage({orders}: {orders: Order[]}) {
  return (
    <section className="py-16 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">My Orders</h2>

        {orders.length === 0 ? (
          <div className="text-center py-20">
            <Package size={64} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600">You haven’t placed any orders yet.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      Order #{order.id}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Placed on {order.createdAt.toString()}
                    </p>
                  </div>

                  <StatusBadge status={order.status} />
                </div>
{/* 
                <div className="border-t pt-4 space-y-2">
                  {order.products.map((item, i) => (
                    <p key={i} className="text-gray-700 text-sm">
                      {item.qty} × {item.name}
                    </p>
                  ))}
                </div> */}

                <div className="flex justify-between items-center mt-4">
                  <p className="text-gray-800 font-semibold">
                    Total: <span className="text-gray-900">{order.total}</span>
                  </p>
                  <Link
                    href={`/myorders/${order.status.toLowerCase()}`}
                    className="text-sm text-gray-900 font-medium hover:underline"
                  >
                    View Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
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
