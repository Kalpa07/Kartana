import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { FaTwitter, FaLinkedin, FaInstagram, FaYoutube } from "react-icons/fa";

const footerLinks = [
    { label: "About Kartana", link: "#" },
    { label: "Careers At Kartana", link: "#" },
    { label: "Terms of Use", link: "#" },
    { label: "Disclaimer", link: "#" },
    { label: "Help And Support", link: "#" },
    { label: "Store Locator", link: "#" },
    { label: "Site map", link: "#" },
    { label: "FAQs", link: "#" },
    { label: "Buying Guide", link: "#" },
    { label: "Return Policy", link: "#" },
];

const Footer = () => {
    return (
        <footer className="bg-grey text-white py-10 px-6">
            <div className="container mx-auto flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-6 lg:space-y-0">

                {/* Left Section - Connect with us */}
                <div className="flex flex-col w-full lg:w-5/6">
                    <h2 className="text-xl font-semibold mb-4">Connect with us!</h2>
                    <div className="flex flex-row w-2/4 gap-4 mb-6">
                        <input
                            type="email"
                            placeholder="Email"
                            className="flex-grow p-3 rounded-lg bg-color-neutral text-white border-none focus:outline-none"
                        />
                        <button
                            className="p-3 bg-color-primary text-white rounded-lg flex items-center justify-center min-w-[50px]"
                        >
                            <FaArrowRight className="text-xl" />
                        </button>
                    </div>

                    <div className="flex gap-10 mt-4">
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
                            <FaTwitter className="text-2xl" />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
                            <FaLinkedin className="text-2xl" />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
                            <FaInstagram className="text-2xl" />
                        </a>
                        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
                            <FaYoutube className="text-2xl" />
                        </a>
                    </div>
                </div>

                <div className="w-px h-80 bg-color-neutral lg:block hidden mx-4" />

                {/* Right Section */}
                <div className="flex flex-col items-start space-y-6 w-full lg:w-1/2">
                    <div className="flex flex-col lg:flex-row gap-20 w-full">

                        <div className="flex flex-col space-y-2">
                            <h3 className="text-lg font-semibold">Useful Links</h3>
                            <ul className="space-y-2">
                                {footerLinks.map((link, index) => (
                                    <li key={index}>
                                        <Link href={link.link} className="text-white hover:text-gray-400">
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="flex flex-col space-y-2">
                            <h3 className="text-lg font-semibold">More Information</h3>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-white hover:text-gray-400">Privacy Policy</a></li>
                                <li><a href="#" className="text-white hover:text-gray-400">Terms of Service</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-start mt-16 ml-15">
                <p>&copy; Copyright 2025 Kartana</p>
            </div>
        </footer>
    );
};

export default Footer;
