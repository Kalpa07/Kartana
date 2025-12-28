"use client";

import { FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import {
    addToCart as addToCartRedux,
    updateQuantity,
    removeFromCart as removeFromCartRedux,
} from "@/store/cartSlice";

const Card = ({ title, price, description, image, rate }) => {
    const { data: session } = useSession();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const userData = JSON.parse(sessionStorage.getItem("userData") || "null");
    const userId = userData?.id;
    const [quantity, setQuantity] = useState(0);
    const [adding, setAdding] = useState(false);

    const added = quantity > 0;

    useEffect(() => {
        if (!userId) return;

        const fetchCartItem = async () => {
            try {
                const res = await fetch("http://localhost:4000/graphql", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        query: `
              query GetCart($userId: ID!) {
                getCart(userId: $userId) {
                  title
                  quantity
                  price
                  image
                }
              }
            `,
                        variables: { userId },
                    }),
                });

                const result = await res.json();
                const cartItems = result?.data?.getCart || [];
                const item = cartItems.find((i) => i.title === title);

                if (item) {
                    setQuantity(item.quantity);
                    dispatch(addToCartRedux(item));
                }
            } catch (err) {
                console.error("Failed to fetch cart item:", err);
            }
        };

        fetchCartItem();
    }, [userId, title, dispatch]);

    // 🔹 Add item to cart
    const addToCart = async () => {
        if (!userData?.id) {
            alert("Please log in first");
            return;
        }

        setAdding(true);

        try {
            const res = await fetch("http://localhost:4000/graphql", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    query: `
            mutation AddToCart($userId: ID!, $title: String!, $price: Float!, $image: String!, $quantity: Int!) {
              addToCart(userId: $userId, title: $title, price: $price, image: $image, quantity: $quantity) {
                title
                quantity
              }
            }
          `,
                    variables: { userId, title, price, image, quantity: 1 },
                }),
            });

            const result = await res.json();
            const addedItem = result?.data?.addToCart;

            if (addedItem) {
                setQuantity(1);
                dispatch(addToCartRedux({ title, price, image, quantity: 1 }));
            }
        } catch (err) {
            console.error("Failed to add to cart:", err);
        } finally {
            setAdding(false);
        }
    };

    const increment = async () => {
        const newQty = quantity + 1;
        setQuantity(newQty);

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
                variables: { userId, title, quantity: newQty },
            }),
        });

        dispatch(updateQuantity({ title, quantity: newQty }));
    };

    const decrement = async () => {
        if (quantity > 1) {
            const newQty = quantity - 1;
            setQuantity(newQty);

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
                    variables: { userId, title, quantity: newQty },
                }),
            });

            dispatch(updateQuantity({ title, quantity: newQty }));
        } else {
            // remove item
            setQuantity(0);

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

            dispatch(removeFromCartRedux(title));
        }
    };

    return (
        <div className="relative flex flex-col my-6 bg-grey shadow-sm rounded-lg w-80 mx-5">
            <div className="relative p-2.5 h-75 overflow-hidden rounded-xl">
                <img src={image} alt={title} className="w-75 h-75 rounded-md" />
            </div>

            <div className="p-4">
                <div className="mb-2 flex justify-between">
                    <p className="text-white text-xl font-semibold">
                        {title.length > 30 ? `${title.slice(0, 30)}...` : title}
                    </p>
                    <p className="text-white text-xl font-semibold">
                        ${price.toString().length > 5 ? `${price.toString().slice(0, 5)}...` : price}
                    </p>
                </div>

                <p className="text-white font-light">
                    {description.length > 100 ? `${description.slice(0, 100)}...` : description}
                </p>

                <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center text-white text-xl">
                        <FaStar className="text-yellow-300 mr-1" />
                        <span>{rate}</span>
                    </div>

                    {added ? (
                        <div className="flex items-center gap-2">
                            <button onClick={decrement} className="px-2 bg-gray-500 rounded">
                                -
                            </button>
                            <span className="text-white">{quantity}</span>
                            <button onClick={increment} className="px-2 bg-gray-500 rounded">
                                +
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={addToCart}
                            className="bg-color-primary px-4 py-2 rounded text-white"
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
