"use client";

import { useEffect, useState } from "react";
import { apiFetchOrders } from "@/api/api";
import type { Order } from "@/lib/types";

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  const userData =
    typeof window !== "undefined"
      ? JSON.parse(sessionStorage.getItem("userData") || "null")
      : null;

  const userId = userData?.id;

  useEffect(() => {
    if (!userId) return;

    const loadOrders = async () => {
      try {
        const data = await apiFetchOrders(userId);
        setOrders(data);
      } catch (err) {
        console.error("Failed to fetch orders", err);
      }
    };

    loadOrders();
  }, [userId]);

  if (!orders.length) {
    return (
      <div className="min-h-screen bg-neutral-900 text-white pt-24 text-center">
        No orders yet
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-900 text-white px-10 pt-24">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.orderId} className="bg-gray-800 p-6 rounded-lg">
            <p className="text-sm text-gray-400">Order ID: {order.orderId}</p>
            <p className="text-sm text-gray-400 mb-4">
              Date:{" "}
              {order.createdAt
                ? new Date(Number(order.createdAt)).toLocaleString()
                : "-"}
            </p>

            <div className="mb-4 text-sm text-gray-300">
              <p className="font-semibold">Delivery Address</p>
              <p>{order.shippingAddress.name}</p>
              <p>{order.shippingAddress.street}</p>
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.state} -{" "}
                {order.shippingAddress.pincode}
              </p>
              <p>Phone: {order.shippingAddress.phone}</p>
            </div>

            {order.items.map((item) => (
              <div
                key={item.title}
                className="flex justify-between border-b border-gray-700 py-2"
              >
                <span>
                  {item.title} × {item.quantity}
                </span>
                <span>₹ {item.price * item.quantity}</span>
              </div>
            ))}

            <div className="flex justify-between font-semibold mt-4">
              <span>Total</span>
              <span>₹ {order.total}</span>
            </div>

            {order.status && (
              <p className="mt-2 text-sm text-green-400">
                Status: {order.status}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
