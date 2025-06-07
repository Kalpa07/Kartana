import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req: Request) {
  // Get the session of the logged-in user
  const session = await getServerSession(authOptions);

  // Check if the user is not authenticated or if there is no valid user ID
  if (!session || !session.user || !session.user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Parse the body of the request
  const body = await req.json();
  const { cart } = body;

  // Validate if the cart is an array and not empty
  if (!Array.isArray(cart) || cart.length === 0) {
    return NextResponse.json({ error: "Cart is empty or invalid" }, { status: 400 });
  }

  // Simulated order save (add actual DB or GraphQL logic here)
  console.log(`User ${session.user.id} placed an order:`, cart);

  // Respond with success
  return NextResponse.json({ message: "Order placed successfully" });
}
