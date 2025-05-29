'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const SignUp = () => {
  const [formData, setFormData] = useState({ email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [checkingUser, setCheckingUser] = useState(false); // prevent spam error setting

  // Auto-clear messages after 10-15 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setError("");
      setSuccess("");
    }, 12000); // 12 seconds

    return () => clearTimeout(timer);
  }, [error, success]);

  // Check if user already exists
  useEffect(() => {
    const checkUserExists = async () => {
      if (formData.email && !checkingUser) {
        setCheckingUser(true);
        try {
          const checkRes = await fetch(`http://localhost:3001/users?email=${formData.email}`);
          const existing = await checkRes.json();
          if (existing.length > 0) {
            setError("User already exists");
          } else {
            setError("");
          }
        } catch (error) {
          console.error("Error checking user:", error);
          setError("Something went wrong while checking user.");
        } finally {
          setCheckingUser(false);
        }
      }
    };

    checkUserExists();
  }, [formData.email]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const { email, password, confirmPassword } = formData;

    if (!email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error("Failed to create user");

      setSuccess("Account created!");
      setFormData({ email: "", password: "", confirmPassword: "" });
    } catch (err) {
      console.error("Error creating user:", err);
      setError("Something went wrong while creating account.");
    }
  };

  return (
    <div className="flex flex-row h-screen">
      {/* Left Section */}
      <div className="bg-grey w-1/2 h-screen flex flex-col justify-center items-center px-6 space-y-6">
        <Image
          src="/images/Kartana.png"
          alt="Kartana Logo"
          width={500}
          height={100}
          className="object-contain"
        />
        <p className="text-white text-xl text-center max-w-sm">
          Discover the Future of Shopping with Kartana – Where Web2 meets Web3!
        </p>
        <p className="text-white text-sm">
          Already have an account?{" "}
          <Link href="/auth/signin" className="text-color-primary underline hover:opacity-80">
            Sign in
          </Link>
        </p>
      </div>

      {/* Right Section (Form) */}
      <div className="bg-color-neutral w-1/2 h-screen flex items-center justify-center">
        <form className="w-full max-w-md bg-opacity-5 p-8 space-y-6" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-semibold text-white text-center">Create an Account</h2>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {success && <p className="text-green-500 text-sm text-center">{success}</p>}

          <div className="flex flex-col space-y-2">
            <label htmlFor="email" className="text-white text-sm">Email</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="p-3 rounded-md bg-color-neutral text-white border border-grey focus:outline-none focus:ring-2 focus:ring-grey"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="password" className="text-white text-sm">Password</label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="p-3 rounded-md bg-color-neutral text-white border border-grey focus:outline-none focus:ring-2 focus:ring-grey"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="confirmPassword" className="text-white text-sm">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              className="p-3 rounded-md bg-color-neutral text-white border border-grey focus:outline-none focus:ring-2 focus:ring-grey"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-color-primary text-black py-3 rounded-md hover:opacity-90 transition duration-200"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
