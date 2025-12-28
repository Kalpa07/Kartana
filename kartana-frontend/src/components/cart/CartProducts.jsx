"use client";

import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../../store/cartSlice";
import Image from "next/image";

const CartProducts = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  if (!cartItems.length) {
    return (
      <div className="p-6 text-center text-gray-500">
        Your cart is empty.
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {cartItems.map((item) => (
        <div
          key={item.title}   // ✅ CONSISTENT WITH YOUR SLICE
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
              <p className="text-gray-600">
                ₹ {item.price} × {item.quantity}
              </p>
            </div>
          </div>

          <button
            onClick={() => dispatch(removeFromCart(item.title))}
            className="text-red-500 text-sm"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default CartProducts;
