'use client';

import Image from 'next/image';
import Link from 'next/link';

const Deals = () => {
  return (
    <section className="bg-color-neutral py-10 px-6 sm:px-12">
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">Deals of The Day</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 h-full">
        {/* Earphones */}
        <Link
          href="/product/earphones"
          className="block transform transition-transform duration-300 hover:-translate-y-2"
        >
          <div className="h-60 sm:h-72 md:h-80 lg:h-96 relative rounded-xl overflow-hidden">
            <Image
              src="/images/deal1.png"
              alt="Earphones"
              fill
              className="object-contain p-2"
            />
          </div>
        </Link>

        {/* Microwave */}
        <Link
          href="/product/earphones"
          className="block transform transition-transform duration-300 hover:-translate-y-2"
        >
          <div className="h-60 sm:h-72 md:h-80 lg:h-96 relative rounded-xl overflow-hidden">
            <Image
              src="/images/deal2.png"
              alt="Earphones"
              fill
              className="object-contain p-2"
            />
          </div>
        </Link>

        {/* Power Bank */}
        <Link
          href="/product/earphones"
          className="block transform transition-transform duration-300 hover:-translate-y-2"
        >
          <div className="h-60 sm:h-72 md:h-80 lg:h-96 relative rounded-xl overflow-hidden">
            <Image
              src="/images/deal3.png"
              alt="Earphones"
              fill
              className="object-contain p-2"
            />
          </div>
        </Link>

        {/* Dyson */}
        <Link
          href="/product/earphones"
          className="block transform transition-transform duration-300 hover:-translate-y-2"
        >
          <div className="h-60 sm:h-72 md:h-80 lg:h-96 relative rounded-xl overflow-hidden">
            <Image
              src="/images/deal4.png"
              alt="Earphones"
              fill
              className="object-contain p-2"
            />
          </div>
        </Link>
      </div>
    </section>
  );
};

export default Deals;
