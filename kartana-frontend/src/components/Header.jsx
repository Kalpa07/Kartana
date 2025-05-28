'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const slides = [
  {
    textTitle: 'Limited Time Only: Save Big on MacBooks!',
    textSubtitle: 'Starting ₹89,990!',
    image: '/images/Laptop.png',
  },
  {
    textTitle: 'Deal of the Day: Iphones!',
    textSubtitle: 'Starting ₹79,990!',
    image: '/images/Mobile.png',
  },
  {
    textTitle: 'Hot Offer: Premium Headphones Sale!',
    textSubtitle: 'Starting ₹1,999!',
    image: '/images/Headphone.png',
  },
];

const Header = () => {
  const [current, setCurrent] = useState(0);

  const handleDotClick = (index) => setCurrent(index);

  return (
    <div className="bg-grey h-auto sm:h-auto md:h-screen text-white p-6  relative">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 h-170 px-4 md:px-12 py-20">
        {/* Text Content */}
        <div className="space-y-6 w-full md:w-[660px]">
          <h1 className="text-4xl md:text-6xl font-bold leading-snug text-white">
            {slides[current].textTitle}
          </h1>
          <p className="text-xl md:text-3xl font-medium text-white">{slides[current].textSubtitle}</p>
          <button className="bg-color-primary hover:bg-white px-6 py-3 text-black font-semibold rounded-full w-[150px] text-lg">
            See More
          </button>
        </div>

        {/* Animated Image */}
        <div className="relative w-full md:w-[660px] h-auto flex justify-center items-center ">
          <AnimatePresence mode="wait">
            <motion.div
              key={slides[current].image}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full h-full"
            >
              <Image
                src={slides[current].image}
                alt="Product"
                width={800}
                height={450}
                className="w-full h-auto object-contain"

              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-6 space-x-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => handleDotClick(i)}
            className={`h-2 w-2 rounded-full transition-all duration-300 ${
              i === current ? 'bg-white scale-125' : 'bg-color-neutral'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default Header
