"use client";
import { FaUser, FaSearch, FaShoppingCart, FaMapMarkerAlt } from "react-icons/fa";
import { TiThMenuOutline } from "react-icons/ti";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import Modal from "react-modal";
import Link from 'next/link';
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  const { data: session, status } = useSession();
  console.log(session);

  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [area, setArea] = useState("Goa, 403506");
  const [menuOpen, setMenuOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
        setUserOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleLocationModal = () => setLocationModalOpen(!locationModalOpen);
  const closeLocationModal = () => setLocationModalOpen(false);

  const handleAreaSelection = (newArea: string) => {
    setArea(newArea);
    closeLocationModal();
  };

  const toggleLogoutModal = () => setLogoutModalOpen(!logoutModalOpen);

  const handleLogout = () => {
    signOut();
    setLogoutModalOpen(false);
  };

  return (
    <div ref={dropdownRef} className="flex flex-row items-center justify-between p-x-5 h-[50px] bg-grey text-white">
      <div className="w-28 h-10 relative ml-5 flex items-center">
        <Image
          src="/images/Kartana.png"
          alt="Kartana Logo"
          width={112}
          height={40}
          className="object-contain"
        />
      </div>
      <div className="flex flex-row">

        <div className="hidden md:flex w-80 mr-5 bg-white rounded-full overflow-hidden border border-gray-300">
          <input
            type="text"
            placeholder="Search"
            className="flex-grow px-4 text-black outline-none bg-transparent"
          />
          <button className="p-2">
            <FaSearch className="text-black" />
          </button>
        </div>

        <div className="flex items-center space-x-4 text-sm mr-5">
          {/* Location Dropdown */}
          <div className="relative">
            <span className="hidden sm:inline-flex items-center cursor-pointer" onClick={toggleLocationModal}>
              <FaMapMarkerAlt className="mr-1 w-max" /> {area}
            </span>
            <Modal
              isOpen={locationModalOpen}
              onRequestClose={closeLocationModal}
              className="modal"
              overlayClassName="overlay"
            >
              <div>
                <h2>Select Area</h2>
                <ul>
                  <li onClick={() => handleAreaSelection("Goa, 403506")}>Goa, 403506</li>
                  <li onClick={() => handleAreaSelection("Mumbai, 400001")}>Mumbai, 400001</li>
                  <li onClick={() => handleAreaSelection("Delhi, 110001")}>Delhi, 110001</li>
                </ul>
                <button onClick={closeLocationModal}>Close</button>
              </div>
            </Modal>
          </div>

          {/* Menu Toggle */}
          <div className="relative">
            <TiThMenuOutline
              className="text-xl cursor-pointer active:text-color-primary"
              onClick={() => { setMenuOpen(!menuOpen); setUserOpen(false); }}
            />
            {menuOpen && (
              <div className="absolute right-[-80px] bg-white text-black shadow-lg w-50 mt-3 rounded-md">
                <ul>
                  {/* Main Menu Items */}
                  <li className="p-2 w-50 dropdown-menu group relative">
                    <Link href="/browse" onClick={() => { setMenuOpen(false); }}>
                      Computer and Tablets
                    </Link>
                    {/* Sub-menu for Computers and Tablets */}
                    <div className="absolute right-full  mr-0 top-0 mt-2 hidden group-hover:block bg-white shadow-lg w-40 h-auto rounded-md">
                      <ul>
                        <li className="p-2 dropdown-menu group relative active:text-color-primary">
                          <Link href="/browse" onClick={() => { setMenuOpen(false); }}>
                            Laptops
                          </Link>
                        </li>
                        <li className="p-2 dropdown-menu group relative">
                          <Link href="/brose" onClick={() => { setMenuOpen(false); }}>
                            Tablets
                          </Link>
                        </li>
                        <li className="p-2 dropdown-menu group relative">
                          <Link href="/macbooks" onClick={() => { setMenuOpen(false); }}>
                            Macbooks
                          </Link>
                        </li>
                        <li className="p-2 dropdown-menu group relative">
                          <Link href="/computers" onClick={() => { setMenuOpen(false); }}>
                            Computers
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="p-2 dropdown-menu group relative">
                    <Link href="/account" onClick={() => { setMenuOpen(false); }}>
                      Home Appliances
                    </Link>
                    {/* Sub-menu for Computers and Tablets */}
                    <div className="absolute right-full  mr-0 top-0 mt-2 hidden group-hover:block bg-white shadow-lg w-40 h-auto rounded-md">
                      <ul>
                        <li className="p-2 dropdown-menu group relative ">
                          <Link href="/laptops" onClick={() => { setMenuOpen(false); }}>
                            Laptops
                          </Link>
                        </li>
                        <li className="p-2 dropdown-menu group relative">
                          <Link href="/tablets" onClick={() => { setMenuOpen(false); }}>
                            Tablets
                          </Link>
                        </li>
                        <li className="p-2 dropdown-menu group relative">
                          <Link href="/macbooks" onClick={() => { setMenuOpen(false); }}>
                            Macbooks
                          </Link>
                        </li>
                        <li className="p-2 dropdown-menu group relative">
                          <Link href="/computers" onClick={() => { setMenuOpen(false); }}>
                            Computers
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="p-2 dropdown-menu group relative">
                    <Link href="/account" onClick={() => { setMenuOpen(false); }}>
                      Audio and Video
                    </Link>
                    {/* Sub-menu for Computers and Tablets */}
                    <div className="absolute right-full  mr-0 top-0 mt-2 hidden group-hover:block bg-white shadow-lg w-40 h-auto rounded-md">
                      <ul>
                        <li className="p-2 dropdown-menu group relative active:text-color-primary">
                          <Link href="/laptops" onClick={() => { setMenuOpen(false); }}>
                            Laptops
                          </Link>
                        </li>
                        <li className="p-2 dropdown-menu group relative">
                          <Link href="/tablets" onClick={() => { setMenuOpen(false); }}>
                            Tablets
                          </Link>
                        </li>
                        <li className="p-2 dropdown-menu group relative">
                          <Link href="/macbooks" onClick={() => { setMenuOpen(false); }}>
                            Macbooks
                          </Link>
                        </li>
                        <li className="p-2 dropdown-menu group relative">
                          <Link href="/computers" onClick={() => { setMenuOpen(false); }}>
                            Computers
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="p-2 dropdown-menu group relative">
                    <Link href="/account" onClick={() => { setMenuOpen(false); }}>
                      Phones and Wearable
                    </Link>
                    {/* Sub-menu for Computers and Tablets */}
                    <div className="absolute right-full  mr-0 top-0 mt-2 hidden group-hover:block bg-white shadow-lg w-40 h-auto rounded-md">
                      <ul>
                        <li className="p-2 dropdown-menu group relative">
                          <Link href="/laptops" onClick={() => { setMenuOpen(false); }}>
                            Laptops
                          </Link>
                        </li>
                        <li className="p-2 dropdown-menu group relative">
                          <Link href="/tablets" onClick={() => { setMenuOpen(false); }}>
                            Tablets
                          </Link>
                        </li>
                        <li className="p-2 dropdown-menu group relative">
                          <Link href="/macbooks" onClick={() => { setMenuOpen(false); }}>
                            Macbooks
                          </Link>
                        </li>
                        <li className="p-2 dropdown-menu group relative">
                          <Link href="/computers" onClick={() => { setMenuOpen(false); }}>
                            Computers
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="p-2 dropdown-menu group relative">
                    <Link href="/account" onClick={() => { setMenuOpen(false); }}>
                      Televisions
                    </Link>
                    {/* Sub-menu for Computers and Tablets */}
                    <div className="absolute right-full  mr-0 top-0 mt-2 hidden group-hover:block bg-white shadow-lg w-40 h-auto rounded-md">
                      <ul>
                        <li className="p-2 dropdown-menu group relative active:text-color-primary">
                          <Link href="/laptops" onClick={() => { setMenuOpen(false); }}>
                            Laptops
                          </Link>
                        </li>
                        <li className="p-2 dropdown-menu group relative">
                          <Link href="/tablets" onClick={() => { setMenuOpen(false); }}>
                            Tablets
                          </Link>
                        </li>
                        <li className="p-2 dropdown-menu group relative">
                          <Link href="/macbooks" onClick={() => { setMenuOpen(false); }}>
                            Macbooks
                          </Link>
                        </li>
                        <li className="p-2 dropdown-menu group relative">
                          <Link href="/computers" onClick={() => { setMenuOpen(false); }}>
                            Computers
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* User Profile */}
          <div className="relative">
            <FaUser
              className="text-xl cursor-pointer "
              onClick={() => { setUserOpen(!userOpen); setMenuOpen(false); }}
            />
            {userOpen && (
              <div className="absolute right-[-50] bg-white text-black shadow-lg w-30 mt-3 rounded-md">
                <ul>
                  {status === "authenticated" && (
                    <li className="p-2 dropdown-menu">
                      <Link href="/account"
                        onClick={() => { setUserOpen(false); }}
                      >
                        My Account
                      </Link>
                    </li>
                  )}
                  {status === "unauthenticated" && (
                    <li className="p-2 dropdown-menu">
                      <Link href="/auth/signup"
                        onClick={() => { setUserOpen(false); }}
                      >
                        Sign Up
                      </Link>
                    </li>
                  )}
                  {status === "unauthenticated" && (
                    <li className="p-2 dropdown-menu">
                      <Link href="/auth/signin"
                        onClick={() => { setUserOpen(false); }}
                      >
                        Sign In
                      </Link>
                    </li>
                  )}
                  {status === "authenticated" && (
                    <li
                      className="p-2 dropdown-menu cursor-pointer"
                      onClick={() => {
                        setUserOpen(false);
                        toggleLogoutModal();
                      }}
                    >
                      Logout
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>

          {/* Shopping Cart */}
          <div className="relative">
            <Link href="/cart">
              <FaShoppingCart className="text-xl cursor-pointer" />
            </Link>
          </div>
        </div>
      </div>

      {/* Logout Modal */}
      {logoutModalOpen && (
        <Modal
          isOpen={logoutModalOpen}
          onRequestClose={toggleLogoutModal}
          className="bg-white rounded-md opacity-100 p-6 max-w-xs mx-auto mt-40 shadow-lg outline-none"
          overlayClassName="fixed inset-0 bg-[rgba(0,0,0,0.3)] flex items-center justify-center z-50"
        >
          <h2 className="text-lg font-semibold mb-4 text-black">Are you sure you want to logout?</h2>
          <div className="flex space-x-4">
            <button
              onClick={() => { setLogoutModalOpen(false); }}
              className="mt-4 text-sm text-blue-600 hover:underline"
            >
              Cancel
            </button>
            <button
              onClick={() => { handleLogout(); setLogoutModalOpen(false); }}
              className="mt-4 text-sm text-red-600 hover:underline"
            >
              Logout
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Navbar;
