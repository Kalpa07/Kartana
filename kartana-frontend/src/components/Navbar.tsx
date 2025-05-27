"use client";
import { FaUser, FaSearch, FaShoppingCart,FaMapMarkerAlt } from "react-icons/fa";
import {TiThMenuOutline } from "react-icons/ti";

const Navbar=()=> {
  return (
    <nav className="flex items-center justify-between px-4 py-2 bg-base text-white">
      <div className="text-2xl font-bold text-green-400">Kartana</div>
      <div className="hidden md:flex items-center w-1/3">
        <input
          type="text"
          placeholder="Search"
          className="w-full px-2 py-1 rounded-l bg-white text-black"
        />
        <button className="bg-gray-300 p-2 rounded-r">
          <FaSearch className="text-black" />
        </button>
      </div>
      <div className="flex items-center space-x-4 text-sm">
        <span className="hidden sm:inline-flex items-center">
          <FaMapMarkerAlt className="mr-1" /> Goa, 403506
        </span>
        <TiThMenuOutline className="text-lg" />
        <FaUser className="text-lg" />
        <FaShoppingCart className="text-lg" />
      </div>
    </nav>
  );
}

export default Navbar;