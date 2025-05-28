import Link from 'next/link';
import {
  FaLaptop,
  FaMobileAlt,
  FaTv,
  FaHeadphones,
  FaMicrophone,
  FaPrint,
  FaSnowflake,
  FaSpeakerDeck
} from 'react-icons/fa';

const categories = [
  { name: "Laptops", icon: <FaLaptop /> },
  { name: "Mobiles", icon: <FaMobileAlt /> },
  { name: "Televisions", icon: <FaTv /> },
  { name: "Headphones", icon: <FaHeadphones /> },
  { name: "Microphones", icon: <FaMicrophone /> },
  { name: "Printers", icon: <FaPrint /> },
  { name: "Air Conditioners", icon: <FaSnowflake /> },
  { name: "Speakers", icon: <FaSpeakerDeck /> },
];

const CategoryBar = () => {
  return (
    <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 px-4 sm:px-6 py-4 bg-grey">
      {categories.map((cat, idx) => (
        <Link
          key={idx}
          href={`/category/${cat.name.toLowerCase().replace(/\s+/g, '-')}`}
          className="flex flex-col items-center justify-center w-28 sm:w-32 md:w-36 lg:w-40 p-3 sm:p-4 rounded-xl text-center shadow-md gradientCategory-bg hover:scale-105 transition-transform duration-300"
        >
          <div className="text-3xl sm:text-4xl md:text-5xl mb-2">{cat.icon}</div>
          <span className="text-sm sm:text-base md:text-lg font-medium">{cat.name}</span>
        </Link>
      ))}
    </div>
  );
};

export default CategoryBar;
