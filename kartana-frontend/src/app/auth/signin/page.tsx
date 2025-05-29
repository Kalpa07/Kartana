'use client';

import Image from "next/image";
import Link from "next/link";

const SignIn = () => {
  return (
    <div className="flex flex-row h-screen">
      
      {/* Left Section */}
      <div className="bg-grey w-1/2 h-screen flex flex-col justify-center items-center px-6 space-y-6">
        {/* Logo */}
        <Image
          src="/images/Kartana.png"
          alt="Kartana Logo"
          width={500}
          height={100}
          className="object-contain"
        />

        {/* Tagline */}
        <p className="text-white text-2xl text-center max-w-sm">
          Discover the Future of Shopping 
        </p>

        {/* Already have account? */}
        <p className="text-white text-md">
            Don’t have an account?{' '}
          <Link href="/auth/signup" className="text-color-primary underline hover:opacity-80">
            Sign up
          </Link>
        </p>
      </div>

      {/* Right Section (Form placeholder) */}
      <div className="bg-color-neutral w-1/2 h-screen flex items-center justify-center px-6">
        <form className="w-full max-w-md  bg-opacity-5 p-8  space-y-6">
            <h2 className="text-2xl font-semibold text-white text-center">Create an Account</h2>

            <div className="flex flex-col space-y-2">
            <label htmlFor="email" className="text-white text-sm">Email</label>
            <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="p-3 rounded-md bg-color-neutral text-white border border-grey focus:outline-none focus:ring-2 focus:ring-grey autofill:bg-color-neutral autofill:text-white"
            />
            </div>

            <div className="flex flex-col space-y-2">
            <label htmlFor="password" className="text-white text-sm">Password</label>
            <input
                type="password"
                id="password"
                placeholder="Enter password"
                className="p-3 rounded-md bg-color-neutral text-white border border-grey focus:outline-none focus:ring-2 focus:ring-grey"
            />
            </div>
            <button
            type="submit"
            className="w-full bg-color-primary text-black py-3 rounded-md hover:opacity-90 transition duration-200"
            >
            Sign In
            </button>
        </form>
        </div>

    </div>
  );
};

export default SignIn;
