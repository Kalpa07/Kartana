"use client";
import { FaStar } from 'react-icons/fa';
import { useState } from 'react';
import { useSession } from "next-auth/react";

const Card = ({ title, price, description, image, rate }) => {
    const { data: session } = useSession();
    const [adding, setAdding] = useState(false);
    const [quantity, setQuantity] = useState(0);
    const [added, setAdded] = useState(false);
    const userId = session?.user?.id;

    const increment = async () => {
        setQuantity(prev => prev + 1);
        await updateCart(quantity + 1);
    };

    const decrement = async () => {
        if (quantity > 1) {
            setQuantity(prev => prev - 1);
            await updateCart(quantity - 1);
        } else {
            setQuantity(0);
            setAdded(false);
            await removeFromCart();
        }
    };

    const updateCart = async (newQty) => {
        const res = await fetch(`http://localhost:3001/users/${userId}`);
        const user = await res.json();
        const updatedCart = user.cart.map(item =>
            item.title === title
                ? { ...item, quantity: newQty }
                : item
        );
        await fetch(`http://localhost:3001/users/${userId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ cart: updatedCart }),
        });
    };

    const removeFromCart = async () => {
        const res = await fetch(`http://localhost:3001/users/${userId}`);
        const user = await res.json();
        const updatedCart = user.cart.filter(item => item.title !== title);
        await fetch(`http://localhost:3001/users/${userId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ cart: updatedCart }),
        });
    };

    const addToCart = async () => {
        if (!userId) return alert("Please log in first.");

        try {
            setAdding(true);
            const userRes = await fetch(`http://localhost:3001/users/${userId}`);
            if (!userRes.ok) throw new Error("User not found");
            const user = await userRes.json();

            const existingItem = user.cart?.find(item => item.title === title);
            let updatedCart;
            if (existingItem) {
                updatedCart = user.cart.map(item =>
                    item.title === title
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
                setQuantity(existingItem.quantity + 1);
            } else {
                setQuantity(1);
                updatedCart = [
                    ...user.cart,
                    {
                        title,
                        price,
                        image,
                        quantity: 1,
                    },
                ];
            }

            const patchRes = await fetch(`http://localhost:3001/users/${userId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ cart: updatedCart }),
            });

            if (!patchRes.ok) throw new Error("Failed to update cart");

            setAdded(true);
            alert("Added to cart!");
        } catch (err) {
            console.error(err);
            alert("Something went wrong.");
        } finally {
            setAdding(false);
        }
    };

    return (
        <div className="relative flex flex-col my-6 bg-grey shadow-sm rounded-lg w-80 mx-5">
            <div className="relative p-2.5 h-75 overflow-hidden rounded-xl bg-clip-border">
                <img
                    src={image}
                    alt={title}
                    className="w-75 h-75 object-fit rounded-md"
                />
            </div>
            <div className="p-4">
                <div className="mb-2 flex items-center justify-between">
                    <p className="text-white text-xl font-semibold">
                        {title.length > 30 ? `${title.slice(0, 30)}...` : title}
                    </p>
                    <p className="text-white text-xl font-semibold">
                        ${price.toString().length > 5 ? `${price.toString().slice(0, 5)}...` : price}
                    </p>
                </div>
                <p className="text-white leading-normal font-light">
                    {description.length > 100 ? `${description.slice(0, 100)}...` : description}
                </p>
                <div className="flex flex-row items-center justify-between mt-4">
                    <div className="flex items-center text-white text-xl">
                        <FaStar className="text-yellow-300 mr-1" />
                        <span>{rate}</span>
                    </div>
                    {added ? (
                        <div className="flex items-center gap-2">
                            <span className='px-2 text-color-primary'>Added to cart!</span>
                            <button
                                onClick={decrement}
                                className="px-2 py-1 bg-gray-500 text-white rounded-md"
                            >
                                -
                            </button>
                            <span className="text-white">{quantity}</span>
                            <button
                                onClick={increment}
                                className="px-2 py-1 bg-gray-500 text-white rounded-md"
                            >
                                +
                            </button>
                        </div>
                    ) : (
                        <button
                            className="cursor-pointer rounded-md w-50 bg-color-primary py-2 px-4 text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-secondary-color active:bg-cyan-700 disabled:pointer-events-none disabled:opacity-50"
                            type="button"
                            onClick={addToCart}
                        >
                            {adding ? "Adding..." : "Add to Cart"}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Card;
