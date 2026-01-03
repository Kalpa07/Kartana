import { NextResponse } from "next/server";
import {
  apiGetCart,
  apiUpdateCartQuantity,
  apiRemoveFromCart,
} from "@/api/api";

export async function POST(req: Request) {
  try {
    const { action, payload } = await req.json();

    switch (action) {
      case "GET_CART": {
        const cart = await apiGetCart(payload.userId);
        return NextResponse.json(cart);
      }

      case "UPDATE_QTY": {
        const result = await apiUpdateCartQuantity(
          payload.userId,
          payload.title,
          payload.quantity
        );
        return NextResponse.json(result);
      }

      case "REMOVE_ITEM": {
        const result = await apiRemoveFromCart(
          payload.userId,
          payload.title
        );
        return NextResponse.json(result);
      }

      default:
        return NextResponse.json(
          { error: "Invalid action" },
          { status: 400 }
        );
    }
  } catch (error ) {
    return NextResponse.json(
      { error: error || "Cart operation failed" },
      { status: 500 }
    );
  }
}
