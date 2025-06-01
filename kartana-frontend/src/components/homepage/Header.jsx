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
    textTitle: 'Deal of the Day: iPhones!',
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
    <div className="bg-grey text-white px-4 md:px-10 py-10 md:py-20">
      <div className="flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Text Content */}
        <div className="w-full md:w-1/2 text-center md:text-left space-y-5">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            {slides[current].textTitle}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl font-medium">
            {slides[current].textSubtitle}
          </p>
          <button className="bg-color-primary hover:bg-white text-black font-semibold px-6 py-3 rounded-full text-base sm:text-lg transition-colors duration-300 w-40">
            See More
          </button>
        </div>

        {/* Animated Image */}
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={slides[current].image}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-[700px]"
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

      {/* Dots Navigation */}
      <div className="flex justify-center mt-8 space-x-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => handleDotClick(i)}
            className={`h-3 w-3 rounded-full transition-all duration-300 ${
              i === current ? 'bg-white scale-125' : 'bg-color-neutral'
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Header;
