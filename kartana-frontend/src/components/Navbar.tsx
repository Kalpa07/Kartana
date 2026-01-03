"use client";
import {
  FaUser,
  FaSearch,
  FaShoppingCart,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { TiThMenuOutline } from "react-icons/ti";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import Modal from "react-modal";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();

  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [area, setArea] = useState("Goa, 403506");
  const [status, setState] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setState(sessionStorage.getItem("loggedin") === "true");
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
    sessionStorage.setItem("loggedin", "false");
    sessionStorage.removeItem("userData");
    setLogoutModalOpen(false);
    router.push("/auth/signin");
  };

  return (
    <div
      ref={dropdownRef}
      className="flex flex-row items-center justify-between p-x-5 h-[50px] bg-grey text-white"
    >
      <div className="w-28 h-10 relative ml-5 flex items-center">
        <Link href="/">
          <Image
            src="/images/Kartana.png"
            alt="Kartana Logo"
            width={112}
            height={40}
            className="object-contain"
          />
        </Link>
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
            <span
              className="hidden sm:inline-flex items-center cursor-pointer"
              onClick={toggleLocationModal}
            >
              <FaMapMarkerAlt className="mr-1 w-max" /> {area}
            </span>
            <Modal
              isOpen={locationModalOpen}
              onRequestClose={closeLocationModal}
              className="custom-modal-content"
              overlayClassName="custom-modal-overlay"
            >
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Select Area
              </h2>
              <ul className="space-y-3">
                {["Goa, 403506", "Mumbai, 400001", "Delhi, 110001"].map(
                  (item) => (
                    <li
                      key={item}
                      onClick={() => handleAreaSelection(item)}
                      className="p-3 rounded-lg cursor-pointer hover:bg-gray-200 text-gray-700 font-medium transition"
                    >
                      {item}
                    </li>
                  )
                )}
              </ul>
              <button
                onClick={closeLocationModal}
                className="mt-5 w-full py-2 bg-gray-600 hover:bg-gray-500 hover:text-black rounded-lg font-medium transition"
              >
                Close
              </button>
            </Modal>
          </div>

          {/* Menu Toggle */}
          <div className="relative">
            <TiThMenuOutline
              className="text-xl cursor-pointer active:text-color-primary"
              onClick={() => {
                setMenuOpen(!menuOpen);
                setUserOpen(false);
              }}
            />
            {menuOpen && (
              <div className="absolute right-[-80px] bg-white text-black shadow-lg w-50 mt-3 rounded-md">
                <ul>
                  <li className="p-2 w-50 dropdown-menu group relative">
                    <Link
                      href="/browse"
                      onClick={() => {
                        setMenuOpen(false);
                      }}
                    >
                      Computer and Tablets
                    </Link>
                    <div className="absolute right-full  mr-0 top-0 mt-2 hidden group-hover:block bg-white shadow-lg w-40 h-auto rounded-md">
                      <ul>
                        <li className="p-2 dropdown-menu group relative active:text-color-primary">
                          <Link
                            href="/browse"
                            onClick={() => {
                              setMenuOpen(false);
                            }}
                          >
                            Laptops
                          </Link>
                        </li>
                        <li className="p-2 dropdown-menu group relative">
                          <Link
                            href="/browse"
                            onClick={() => {
                              setMenuOpen(false);
                            }}
                          >
                            Tablets
                          </Link>
                        </li>
                        <li className="p-2 dropdown-menu group relative">
                          <Link
                            href="/browse"
                            onClick={() => {
                              setMenuOpen(false);
                            }}
                          >
                            Macbooks
                          </Link>
                        </li>
                        <li className="p-2 dropdown-menu group relative">
                          <Link
                            href="/browse"
                            onClick={() => {
                              setMenuOpen(false);
                            }}
                          >
                            Computers
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="p-2 dropdown-menu group relative">
                    <Link
                      href="#"
                      onClick={() => {
                        setMenuOpen(false);
                      }}
                    >
                      Home Appliances
                    </Link>
                    <div className="absolute right-full  mr-0 top-0 mt-2 hidden group-hover:block bg-white shadow-lg w-40 h-auto rounded-md">
                      <ul>
                        <li className="p-2 dropdown-menu group relative ">
                          <Link
                            href="/browse"
                            onClick={() => {
                              setMenuOpen(false);
                            }}
                          >
                            Laptops
                          </Link>
                        </li>
                        <li className="p-2 dropdown-menu group relative">
                          <Link
                            href="/browse"
                            onClick={() => {
                              setMenuOpen(false);
                            }}
                          >
                            Tablets
                          </Link>
                        </li>
                        <li className="p-2 dropdown-menu group relative">
                          <Link
                            href="/browse"
                            onClick={() => {
                              setMenuOpen(false);
                            }}
                          >
                            Macbooks
                          </Link>
                        </li>
                        <li className="p-2 dropdown-menu group relative">
                          <Link
                            href="/browse"
                            onClick={() => {
                              setMenuOpen(false);
                            }}
                          >
                            Computers
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="p-2 dropdown-menu group relative">
                    <Link
                      href="/browse"
                      onClick={() => {
                        setMenuOpen(false);
                      }}
                    >
                      Audio and Video
                    </Link>
                    <div className="absolute right-full  mr-0 top-0 mt-2 hidden group-hover:block bg-white shadow-lg w-40 h-auto rounded-md">
                      <ul>
                        <li className="p-2 dropdown-menu group relative active:text-color-primary">
                          <Link
                            href="/browse"
                            onClick={() => {
                              setMenuOpen(false);
                            }}
                          >
                            Laptops
                          </Link>
                        </li>
                        <li className="p-2 dropdown-menu group relative">
                          <Link
                            href="/browse"
                            onClick={() => {
                              setMenuOpen(false);
                            }}
                          >
                            Tablets
                          </Link>
                        </li>
                        <li className="p-2 dropdown-menu group relative">
                          <Link
                            href="/browse"
                            onClick={() => {
                              setMenuOpen(false);
                            }}
                          >
                            Macbooks
                          </Link>
                        </li>
                        <li className="p-2 dropdown-menu group relative">
                          <Link
                            href="/browse"
                            onClick={() => {
                              setMenuOpen(false);
                            }}
                          >
                            Computers
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="p-2 dropdown-menu group relative">
                    <Link
                      href="/browse"
                      onClick={() => {
                        setMenuOpen(false);
                      }}
                    >
                      Phones and Wearable
                    </Link>
                    <div className="absolute right-full  mr-0 top-0 mt-2 hidden group-hover:block bg-white shadow-lg w-40 h-auto rounded-md">
                      <ul>
                        <li className="p-2 dropdown-menu group relative">
                          <Link
                            href="/browse"
                            onClick={() => {
                              setMenuOpen(false);
                            }}
                          >
                            Laptops
                          </Link>
                        </li>
                        <li className="p-2 dropdown-menu group relative">
                          <Link
                            href="/browse"
                            onClick={() => {
                              setMenuOpen(false);
                            }}
                          >
                            Tablets
                          </Link>
                        </li>
                        <li className="p-2 dropdown-menu group relative">
                          <Link
                            href="/browse"
                            onClick={() => {
                              setMenuOpen(false);
                            }}
                          >
                            Macbooks
                          </Link>
                        </li>
                        <li className="p-2 dropdown-menu group relative">
                          <Link
                            href="/browse"
                            onClick={() => {
                              setMenuOpen(false);
                            }}
                          >
                            Computers
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="p-2 dropdown-menu group relative">
                    <Link
                      href="/browse"
                      onClick={() => {
                        setMenuOpen(false);
                      }}
                    >
                      Televisions
                    </Link>
                    <div className="absolute right-full  mr-0 top-0 mt-2 hidden group-hover:block bg-white shadow-lg w-40 h-auto rounded-md">
                      <ul>
                        <li className="p-2 dropdown-menu group relative active:text-color-primary">
                          <Link
                            href="/browse"
                            onClick={() => {
                              setMenuOpen(false);
                            }}
                          >
                            Laptops
                          </Link>
                        </li>
                        <li className="p-2 dropdown-menu group relative">
                          <Link
                            href="/browse"
                            onClick={() => {
                              setMenuOpen(false);
                            }}
                          >
                            Tablets
                          </Link>
                        </li>
                        <li className="p-2 dropdown-menu group relative">
                          <Link
                            href="/browse"
                            onClick={() => {
                              setMenuOpen(false);
                            }}
                          >
                            Macbooks
                          </Link>
                        </li>
                        <li className="p-2 dropdown-menu group relative">
                          <Link
                            href="/browse"
                            onClick={() => {
                              setMenuOpen(false);
                            }}
                          >
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

          <div className="relative">
            <FaUser
              className="text-xl cursor-pointer "
              onClick={() => {
                setUserOpen(!userOpen);
                setMenuOpen(false);
              }}
            />
            {userOpen && (
              <div className="absolute right-[-50] bg-white text-black shadow-lg w-30 mt-3 rounded-md">
                <ul>
                  {/* {status === true && (
                    <li className="p-2 dropdown-menu">
                      <Link
                        href="/account"
                        onClick={() => {
                          setUserOpen(false);
                        }}
                      >
                        My Account
                      </Link>
                    </li>
                  )} */}
                  {status === false && (
                    <li className="p-2 dropdown-menu">
                      <Link
                        href="/auth/signup"
                        onClick={() => {
                          setUserOpen(false);
                        }}
                      >
                        Sign Up
                      </Link>
                    </li>
                  )}
                  {status === false && (
                    <li className="p-2 dropdown-menu">
                      <Link
                        href="/auth/signin"
                        onClick={() => {
                          setUserOpen(false);
                        }}
                      >
                        Sign In
                      </Link>
                    </li>
                  )}
                  {status === true && (
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
          <h2 className="text-lg font-semibold mb-4 text-black">
            Are you sure you want to logout?
          </h2>
          <div className="flex space-x-4">
            <button
              onClick={() => {
                setLogoutModalOpen(false);
              }}
              className="mt-4 text-sm text-blue-600 hover:underline"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                handleLogout();
                setLogoutModalOpen(false);
              }}
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
