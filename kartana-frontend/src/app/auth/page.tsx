'use client';

import Image from "next/image";
import Link from "next/link";

const SignUp = () => {
  return (
    <div className="flex flex-row h-screen">
      
      {/* Left Section */}
      <div className="bg-grey w-1/2 h-screen flex flex-col justify-center items-center px-6 space-y-6">
        {/* Logo */}
        <Image
          src="/images/Kartana.png"
          alt="Kartana Logo"
          width={160}
          height={60}
          className="object-contain"
        />

        {/* Tagline */}
        <p className="text-white text-xl text-center max-w-sm">
          Discover the Future of Shopping with Kartana – Where Web2 meets Web3!
        </p>

        {/* Already have account? */}
        <p className="text-white text-sm">
          Already have an account?{' '}
          <Link href="/auth/signin" className="text-color-primary underline hover:opacity-80">
            Sign in
          </Link>
        </p>
      </div>

      {/* Right Section (Form placeholder) */}
      <div className="bg-color-neutral w-1/2 h-screen flex items-center justify-center">
        {/* Sign up form goes here later */}
      </div>

    </div>
  );
};

export default SignUp;
