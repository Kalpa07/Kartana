"use client";

import { useEffect } from "react";
import { setCart } from "@/store/cartSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { FaTrash } from "react-icons/fa";
import {
  apiGetCart,
  apiUpdateCartQuantity,
  apiRemoveFromCart,
} from "@/api/api";
import { useRouter } from "next/navigation";

const CartPage = () => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);
  const router = useRouter();

  const userData =
    typeof window !== "undefined"
      ? JSON.parse(sessionStorage.getItem("userData") || "null")
      : null;

  const userId = userData?.id;

  useEffect(() => {
    if (!userId) return;

    const loadCart = async () => {
      try {
        const cartItems = await apiGetCart(userId);
        dispatch(setCart(cartItems));
      } catch (err) {
        console.error("Failed to fetch cart:", err);
      }
    };

    loadCart();
  }, [userId, dispatch]);

  const syncCart = async () => {
    if (!userId) return;
    try {
      const cartItems = await apiGetCart(userId);
      dispatch(setCart(cartItems));
    } catch (err) {
      console.error("Failed to sync cart:", err);
    }
  };

  if (!cart.length) {
    return (
      <div className="px-10 py-6 bg-neutral-900 text-white pt-24">
        <div className="bg-gray-800 p-6 rounded-lg shadow">
          <p className="text-center py-10">Your cart is empty</p>
        </div>
      </div>
    );
  }

  const subtotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const shipping = cart.length ? 50 : 0;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen px-10 py-6 bg-neutral-900 text-white pt-24">
      <h1 className="text-3xl font-bold mb-6">My Cart</h1>

      <div className="flex gap-8">
        {/* LEFT – Cart Items */}
        <div className="w-2/3 bg-gray-800 p-6 rounded-lg shadow space-y-4">
          {cart.map((item) => (
            <div
              key={item.title}
              className="relative flex items-center gap-4 border-b pb-4 last:border-b-0"
            >
              <div className="absolute top-3 right-3 flex flex-col items-end gap-6">
                <button
                  className="text-gray-400 hover:text-red-500"
                  onClick={async () => {
                    await apiRemoveFromCart(userId, item.title);
                    await syncCart();
                  }}
                >
                  <FaTrash size={16} />
                </button>

                <span className="text-lg font-semibold">
                  ₹ {(item.price * item.quantity).toFixed(2)}
                </span>
              </div>

              <img src={item.image} className="w-24 h-24 rounded" />

              <div className="flex-1">
                <p className="font-semibold">{item.title}</p>
                <p>₹ {item.price}</p>

                <div className="flex gap-3 mt-2 items-center">
                  <button
                    className="px-3 bg-gray-600 rounded"
                    onClick={async () => {
                      const newQty = item.quantity - 1;

                      if (newQty === 0) {
                        await apiRemoveFromCart(userId, item.title);
                      } else {
                        await apiUpdateCartQuantity(userId, item.title, newQty);
                      }

                      await syncCart();
                    }}
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    className="px-3 bg-gray-600 rounded"
                    onClick={async () => {
                      const newQty = item.quantity + 1;
                      await apiUpdateCartQuantity(userId, item.title, newQty);
                      await syncCart();
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT – Order Summary */}
        <div className="w-1/3 bg-gray-800 p-6 rounded-lg shadow h-fit">
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹ {subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span>₹ {shipping.toFixed(2)}</span>
            </div>

            <hr className="my-2 border-gray-600" />

            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>₹ {total.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={() => router.push("/checkout")}
            className="mt-6 w-full bg-color-primary py-3 rounded font-semibold"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
