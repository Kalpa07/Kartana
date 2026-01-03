"use client";

import { FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    addToCart as addToCartRedux,
    updateQuantity,
    removeFromCart as removeFromCartRedux,
    setCart,
} from "@/store/cartSlice";
import {
    apiAddToCart,
    apiUpdateCartQuantity,
    apiRemoveFromCart,
    apiGetCart,
} from "@/api/api";
import Image from "next/image";

const Card = ({ title, price, description, image, rate }) => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);

    const userData =
        typeof window !== "undefined"
            ? JSON.parse(sessionStorage.getItem("userData") || "null")
            : null;

    const userId = userData?.id;
    const [quantity, setQuantity] = useState(0);
    const [loading, setLoading] = useState(false);

    const added = quantity > 0;

    useEffect(() => {
        if (!userId) return;

        const fetchCartOnMount = async () => {
            try {
                const cartItems = await apiGetCart(userId);
                dispatch(setCart(cartItems));
            } catch (err) {
                console.error("Failed to fetch cart on mount:", err);
            }
        };

        fetchCartOnMount();
    }, [userId, dispatch]);

    useEffect(() => {
        const existingItem = cart.find((item) => item.title === title);
        setQuantity(existingItem ? existingItem.quantity : 0);
    }, [cart, title]);

    const syncCart = async () => {
        if (!userId) return;
        try {
            const cartItems = await apiGetCart(userId);
            dispatch(setCart(cartItems));
        } catch (err) {
            console.error("Failed to sync cart:", err);
        }
    };

    const addToCart = async () => {
        if (!userId) return alert("Please log in first");

        setLoading(true);
        try {
            await apiAddToCart(userId, { title, price, image, quantity: 1 });
            await syncCart();
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const increment = async () => {
        if (!userId) return;
        setLoading(true);
        try {
            const newQty = quantity + 1;
            await apiUpdateCartQuantity(userId, title, newQty);
            await syncCart();
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const decrement = async () => {
        if (!userId) return;
        setLoading(true);
        try {
            if (quantity > 1) {
                const newQty = quantity - 1;
                await apiUpdateCartQuantity(userId, title, newQty);
            } else if (quantity === 1) {
                await apiRemoveFromCart(userId, title);
            }
            await syncCart();
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative flex flex-col my-6 bg-grey shadow-sm rounded-lg w-80 mx-5">
            <div className="relative p-2.5 h-75 overflow-hidden rounded-xl">
                <Image src={image} alt={title} className="w-75 h-75 rounded-md" />
            </div>

            <div className="p-4">
                <div className="mb-2 flex justify-between">
                    <p className="text-white text-xl font-semibold">
                        {title.length > 30 ? `${title.slice(0, 30)}...` : title}
                    </p>
                    <p className="text-white text-xl font-semibold">₹ {price}</p>
                </div>

                <p className="text-white font-light">
                    {description.length > 100
                        ? `${description.slice(0, 100)}...`
                        : description}
                </p>

                <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center text-white text-xl">
                        <FaStar className="text-yellow-300 mr-1" />
                        <span>{rate}</span>
                    </div>

                    {added ? (
                        <div className="flex items-center gap-2">
                            <button
                                onClick={decrement}
                                disabled={loading}
                                className="px-2 bg-gray-500 rounded"
                            >
                                -
                            </button>
                            <span className="text-white">{quantity}</span>
                            <button
                                onClick={increment}
                                disabled={loading}
                                className="px-2 bg-gray-500 rounded"
                            >
                                +
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={addToCart}
                            disabled={loading}
                            className="bg-color-primary px-4 py-2 rounded text-white"
                        >
                            {loading ? "Adding..." : "Add to Cart"}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Card;
