"use client";
import { FaUser, FaSearch, FaShoppingCart,FaMapMarkerAlt } from "react-icons/fa";
import {TiThMenuOutline } from "react-icons/ti";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import Modal from "react-modal";
import Link from 'next/link';
import { useSession } from "next-auth/react";

const Navbar=()=> {

  const { data: session, status } = useSession();
  console.log(session,status); 
  
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [area, setArea] = useState("Goa, 403506");

  const [menuOpen, setMenuOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
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

        {/* <div className="hidden md:flex w-80 mr-5">
          <input
            type="text"
            placeholder="Search"
            className="w-full px-2 py-1 rounded-l bg-white text-black"
          />
          <button className="bg-white p-2 rounded-full">
            <FaSearch className="text-black" />
          </button>
        </div> */}

        <div className="hidden md:flex w-80   mr-5 bg-white rounded-full overflow-hidden border border-gray-300"> 
          <input type="text" placeholder="Search" className="flex-grow px-4  text-black outline-none bg-transparent" /> 
          <button className="p-2"> <FaSearch className="text-black" /> </button> 
        </div>

        <div className="flex items-center space-x-4 text-sm mr-5">
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

          <div className="relative">
            <TiThMenuOutline
              className="text-xl cursor-pointer"
              onClick={() => {setMenuOpen(!menuOpen);setUserOpen(false)}}
            />
            {menuOpen && (
              <div className="absolute right-0 bg-white text-black shadow-lg w-30 mt-2 rounded-md">
                <ul>
                  <li className="p-2">Profile</li>
                  <li className="p-2  dropdown-menu ">
                    <Link href="/account"
                        onClick={() => {
                          setMenuOpen(false);
                        }}
                      >
                        My Account
                    </Link>
                  </li>
                  <li className="p-2">Settings</li>
                  <li className="p-2">SignUp</li>
                  <li className="p-2">Settings</li>
                  <li className="p-2">Logout</li>
                </ul>
              </div>
            )}
          </div>

          <div className="relative">
            <FaUser
              className="text-xl cursor-pointer"
              onClick={() => {setUserOpen(!userOpen);setMenuOpen(false)}}
            />
            {userOpen && (
              <div className="absolute right-0 bg-white text-black shadow-lg w-30 mt-2 rounded-md">
                <ul>
                  {status === "authenticated" && (
                    <li className="p-2  dropdown-menu ">
                      <Link href="/account"
                        onClick={() => {
                          setMenuOpen(false);
                        }}
                      >
                        My Account
                      </Link>
                    </li>
                  )}
                  {status === "unauthenticated" && (
                    <li className="p-2  dropdown-menu ">
                      <Link href="/auth/signup"
                        onClick={() => {
                          setMenuOpen(false);
                        }}
                      >
                        SignUp
                      </Link>
                    </li>
                  )}
                  {status === "unauthenticated" && (
                    <li className="p-2  dropdown-menu ">
                      <Link href="/auth/signin"
                        onClick={() => {
                          setMenuOpen(false);
                        }}
                      >
                        SignIn
                      </Link>
                    </li>
                  )}
                  {status === "authenticated" && (
                    <li className="p-2  dropdown-menu ">
                      <Link href="/account"
                        onClick={() => {
                          setMenuOpen(false);
                        }}
                      >
                        Logout
                      </Link>
                    </li>)}
                </ul>
              </div>
            )}
          </div>

          <div className="relative">
            <Link href="/#">
              <FaShoppingCart className="text-xl cursor-pointer" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;