"use client";
import CartProducts from "../../components/cart/CartProducts"

const Cart = () => {
  return (
    <div className="bg-color-neutral h-screen pt-20 ">
      <div className="flex flex-row">
        <div className="bg-red-400 h-200 w-2/3 pl-10">
          <h2 className="text-4xl font-bold text-white"> My Cart</h2>
          <CartProducts/>
        </div>
        <div  className="bg-amber-300 h-200 w-1/3 pl-10">
          <h2 className="text-4xl font-bold text-white"> My Cart</h2>

        </div>
      </div>
     
    </div>
  )
}

export default Cart;
