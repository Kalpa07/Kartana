"use client";

import { useEffect } from "react";
import { setCart, updateQuantity, removeFromCart } from "@/store/cartSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

interface CartItem {
  title: string;
  price: number;
  image: string;
  quantity: number;
}

const CartPage = () => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);

  const userData =
    typeof window !== "undefined"
      ? JSON.parse(sessionStorage.getItem("userData") || "null")
      : null;
  const userId = userData?.id;

  useEffect(() => {
    if (!userId) return;

    const fetchCart = async () => {
      try {
        const res = await fetch("http://localhost:4000/graphql", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: `
              query GetCart($userId: ID!) {
                getCart(userId: $userId) {
                  title
                  price
                  image
                  quantity
                }
              }
            `,
            variables: { userId },
          }),
        });

        const result = await res.json();
        dispatch(setCart(result?.data?.getCart || []));
      } catch (err) {
        console.error("Failed to fetch cart:", err);
      }
    };

    fetchCart();
  }, [userId, dispatch]);

  if (!cart.length) {
    return <p className="text-white text-center mt-10">Your cart is empty</p>;
  }

  const subtotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const shipping = cart.length ? 50 : 0;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen px-10 py-6 bg-neutral-900 text-white pt-24">
      <h1 className="text-3xl font-bold mb-6">My Cart</h1>

      <div className="flex gap-8">
        {/* LEFT – CART ITEMS */}
        <div className="w-2/3 bg-gray-800 p-6 rounded-lg shadow space-y-4">
          {cart.map((item: CartItem) => (
            <div
              key={item.title}
              className="flex items-center gap-4 border-b pb-4 last:border-b-0"
            >
              <img src={item.image} className="w-24 h-24 rounded" />

              <div className="flex-1">
                <p className="font-semibold">{item.title}</p>
                <p>₹ {item.price}</p>

                <div className="flex gap-2 mt-2 items-center">
                  <button
                    className="px-3 bg-gray-600 rounded"
                    onClick={async () => {
                      const newQty = item.quantity - 1;
                      if (newQty === 0) {
                        await removeItem(userId, item.title);
                        dispatch(removeFromCart(item.title));
                      } else {
                        await updateQty(userId, item.title, newQty);
                        dispatch(
                          updateQuantity({
                            title: item.title,
                            quantity: newQty,
                          })
                        );
                      }
                    }}
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    className="px-3 bg-gray-600 rounded"
                    onClick={async () => {
                      const newQty = item.quantity + 1;
                      await updateQty(userId, item.title, newQty);
                      dispatch(
                        updateQuantity({ title: item.title, quantity: newQty })
                      );
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT – ORDER SUMMARY */}
        <div className="w-1/3 bg-gray-800 p-6 rounded-lg shadow h-fit">
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>

          <div className="space-y-2 text-gray-200">
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

          <button className="mt-6 w-full bg-blue-600 py-3 rounded hover:bg-blue-700">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

// ------------------
// GraphQL helpers
// ------------------
async function updateQty(userId: string, title: string, quantity: number) {
  await fetch("http://localhost:4000/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        mutation UpdateCartQuantity($userId: ID!, $title: String!, $quantity: Int!) {
          updateCartQuantity(userId: $userId, title: $title, quantity: $quantity) {
            title
            quantity
          }
        }
      `,
      variables: { userId, title, quantity },
    }),
  });
}

async function removeItem(userId: string, title: string) {
  await fetch("http://localhost:4000/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        mutation RemoveFromCart($userId: ID!, $title: String!) {
          removeFromCart(userId: $userId, title: $title) {
            title
          }
        }
      `,
      variables: { userId, title },
    }),
  });
}
