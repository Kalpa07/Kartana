"use client";

import { useSelector } from "react-redux";
import Image from "next/image";

// Assuming `cartItems` has a type like { id: string, title: string, price: number, quantity: number, image: string }
const CartProducts = () => {
  const cartItems = useSelector((state) => state.cart || []);
  console.log(cartItems);  // Log cart items to see what you're getting

  const total = Array.isArray(cartItems)
    ? cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    : 0;

  if (!cartItems.length) {
    return (
      <div className="p-6 text-center text-gray-500">
        Your cart is empty.
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Your Cart</h2>

      {cartItems.map((item) => (
        <div
          key={item.id}  // Use a unique key like item.id if available
          className="flex items-center justify-between border-b pb-4"
        >
          <div className="flex items-center gap-4">
            <Image
              src={item.image}
              alt={item.title}
              width={80}
              height={80}
              className="rounded object-cover"
            />
            <div>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-gray-600">₹ {item.price} x {item.quantity}</p>
            </div>
          </div>
        </div>
      ))}

      <div className="mt-8 text-right border-t pt-4">
        <p className="text-xl font-semibold">Total: ₹ {total.toFixed(2)}</p>
        <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartProducts;
