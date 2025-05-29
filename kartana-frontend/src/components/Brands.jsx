'use client';

import Image from 'next/image';
import Link from 'next/link';

const brands = [
  { name: 'Apple', logo: '/images/apple.png', url: '/brands/apple' },
  { name: 'Asus', logo: '/images/asus.png', url: '/brands/asus' },
  { name: 'Microsoft', logo: '/images/microsoft.png', url: '/brands/microsoft' },
  { name: 'Dell', logo: '/images/dell.png', url: '/brands/dell' },
  { name: 'Bose', logo: '/images/bose.png', url: '/brands/bose' },
];

const Brands = () => {
  return (
    <section className="bg-color-neutral text-white py-12 px-6 sm:px-12">
      <h2 className="text-2xl sm:text-3xl font-bold mb-10 text-center">Top Brands</h2>

      <div className="flex flex-wrap justify-center gap-12">
        {brands.map((brand, index) => (
          <Link
            key={index}
            href={brand.url}
            className="flex items-center justify-center bg-grey rounded-full w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 hover:scale-105 transition-transform duration-300 shadow-md"
          >
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-24 md:h-24">
              <Image
                src={brand.logo}
                alt={brand.name}
                fill
                className="object-contain"
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Brands;
