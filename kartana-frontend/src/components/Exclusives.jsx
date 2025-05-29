import {
    FaBoxOpen,
    FaTruck,
    FaCreditCard,
    FaTags,
    FaShoppingCart,
    FaRecycle,
} from "react-icons/fa";

const exclusives = [
    { icon: FaBoxOpen, label: "Kartana Collections", link: "/kartana-collections" },
    { icon: FaTruck, label: "Kartana Express", link: "/kartana-express" },
    { icon: FaCreditCard, label: "EMI Store", link: "/emi-store" },
    { icon: FaTags, label: "Deals Corner", link: "/deals-corner" },
    { icon: FaShoppingCart, label: "Deals Of the Week", link: "/deals-of-the-week" },
    { icon: FaRecycle, label: "E-waste Disposal", link: "/ewaste-disposal" },
];

const Exclusives = () => {
    return (
        <section className="bg-color-neutral text-white py-10 px-4">
            <h2 className="text-2xl font-bold text-center mb-6">Why Kartana?</h2>

            <div className="bg-gradient-to-br from-green-900 via-gray-700 to-red-900 h-40 md:h-60 lg:h-72 rounded-xl mb-10"></div>

            <h3 className="text-xl font-semibold text-center mb-6">Exclusives</h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 max-w-6xl mx-auto">
                {exclusives.map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <a
                            key={index}
                            href={item.link}
                            className="exclusive-box flex flex-col items-center justify-center text-center hover:bg-gray-700 p-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105"
                        >
                            <Icon size={24} className="mb-2" />
                            <span className="text-sm font-medium">{item.label}</span>
                        </a>
                    );
                })}
            </div>
        </section>
    );
};

export default Exclusives;
