"use client";
import { FaStar } from 'react-icons/fa';

const Card = ({ title, price, description, image ,rate}) => {
  return (
    <div class="relative flex flex-col my-6 bg-grey shadow-sm rounded-lg w-80 mx-5">
        <div class="relative p-2.5 h-75 overflow-hidden rounded-xl bg-clip-border">
            <img
            src={image}
            alt={title}
            class="w-75 h-75 object-fit rounded-md"
            />
        </div>
        <div class="p-4">
            <div class="mb-2 flex items-center justify-between">
            <p class="text-white text-xl font-semibold">
                {title.length > 30 ? `${title.slice(0, 30)}...` : title}
            </p>
            <p class="text-white text-xl font-semibold">
                ${price.length > 5 ? `${price.slice(0, 5)}...` : price}
            </p>
            </div>
            <p class="text-white leading-normal font-light">
                {description.length > 100 ? `${description.slice(0, 100)}...` : description}
            </p>
         <div className="flex flex-row items-center justify-between mt-4">
           <div className="flex items-center text-white text-xl">
                <FaStar className="text-yellow-300 mr-1" />
                <span>{rate}</span>
            </div>
            <button
                className="rounded-md w-50 bg-color-primary py-2 px-4 text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-secondary-color active:bg-cyan-700 disabled:pointer-events-none disabled:opacity-50"
                type="button"
            >
                Add to Cart
            </button>
            </div>

        </div>
    </div>
  )
}

export default Card
