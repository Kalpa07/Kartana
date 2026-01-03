"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearCart } from "@/store/cartSlice";
// import { placeOrder } from "@/store/orderSlice";
import { apiPlaceOrder } from "@/api/api";

const CheckoutPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);

  const userData =
    typeof window !== "undefined"
      ? JSON.parse(sessionStorage.getItem("userData") || "null")
      : null;

  const userId = userData?.id;

  const subtotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const shipping = cart.length ? 50 : 0;
  const total = subtotal + shipping;

  const [showAddressForm, setShowAddressForm] = useState(false);
  const [isAddressSaved, setIsAddressSaved] = useState(false);

  const [address, setAddress] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveAddress = () => {
    if (
      !address.name ||
      !address.phone ||
      !address.street ||
      !address.city ||
      !address.state ||
      !address.pincode
    ) {
      alert("Please fill all address fields");
      return;
    }

    setIsAddressSaved(true);
    setShowAddressForm(false);
  };

  const handlePlaceOrder = async () => {
    if (!cart.length || !isAddressSaved || !userId) return;

    try {
      await apiPlaceOrder(userId, cart, address);

      dispatch(clearCart());
      router.push("/orders");
    } catch (err) {
      console.error("Failed to place order", err);
    }
  };

  if (!cart.length) {
    return (
      <div className="min-h-screen bg-neutral-900 text-white pt-24 text-center">
        Your cart is empty
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-900 text-white px-10 pt-24 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {/* ADDRESS SECTION */}
      <div className="bg-gray-800 p-6 rounded-lg w-full max-w-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">Delivery Address</h2>

        {!showAddressForm && !isAddressSaved && (
          <button
            onClick={() => setShowAddressForm(true)}
            className="w-full border border-gray-500 py-2 rounded"
          >
            + Add Address
          </button>
        )}

        {showAddressForm && (
          <div className="space-y-3">
            <input
              name="name"
              placeholder="Full Name"
              value={address.name}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700"
            />
            <input
              name="phone"
              placeholder="Phone Number"
              value={address.phone}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700"
            />
            <input
              name="street"
              placeholder="Street Address"
              value={address.street}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700"
            />
            <div className="flex gap-2">
              <input
                name="city"
                placeholder="City"
                value={address.city}
                onChange={handleChange}
                className="w-1/2 p-2 rounded bg-gray-700"
              />
              <input
                name="state"
                placeholder="State"
                value={address.state}
                onChange={handleChange}
                className="w-1/2 p-2 rounded bg-gray-700"
              />
            </div>
            <input
              name="pincode"
              placeholder="Pincode"
              value={address.pincode}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700"
            />

            <button
              onClick={handleSaveAddress}
              className="w-full bg-color-primary py-2 rounded font-semibold"
            >
              Save Address
            </button>
          </div>
        )}

        {isAddressSaved && !showAddressForm && (
          <div className="bg-gray-700 p-4 rounded space-y-1">
            <p className="font-semibold">{address.name}</p>
            <p>{address.street}</p>
            <p>
              {address.city}, {address.state} - {address.pincode}
            </p>
            <p>Phone: {address.phone}</p>

            <button
              onClick={() => setShowAddressForm(true)}
              className="mt-2 text-sm text-color-primary underline"
            >
              Edit Address
            </button>
          </div>
        )}
      </div>

      {/* ORDER SUMMARY */}
      <div className="bg-gray-800 p-6 rounded-lg w-full max-w-lg">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹ {subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>₹ {shipping.toFixed(2)}</span>
          </div>
          <hr className="border-gray-600" />
          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>₹ {total.toFixed(2)}</span>
          </div>
        </div>

        <button
          disabled={!isAddressSaved}
          onClick={handlePlaceOrder}
          className={`mt-6 w-full py-3 rounded font-semibold ${
            isAddressSaved
              ? "bg-color-primary"
              : "bg-gray-600 cursor-not-allowed"
          }`}
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
