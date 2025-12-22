"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Toast from "@/components/Toast";
import Image from "next/image";
import Link from "next/link";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    const { firstName, lastName, email, password, confirmPassword } = formData;
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError("All fields are required");
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:4000/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
            mutation CreateUser($data: CreateUserInput!) {
              createUser(data: $data) {
                id
                email
              }
            }
          `,
          variables: { data: { firstName, lastName, email, password } },
        }),
      });
      const result = await res.json();

      if (result.errors) {
        setError(result.errors[0].message);
        setLoading(false);
        return;
      }

      setSuccess("Account created successfully!");
      router.push("/auth/signin");
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-full md:h-screen">
      {/* Left Section */}
      <div className="bg-grey w-full md:w-1/2  h-screen  flex flex-col justify-center items-center px-6 space-y-6">
        <Image
          src="/images/Kartana.png"
          alt="Kartana Logo"
          width={500}
          height={100}
          className="object-contain"
        />
        <p className="text-white text-2xl text-center max-w-sm">
          Discover the Future of Shopping
        </p>
        <p className="text-white text-md">
          Already have an account?{" "}
          <Link
            href="/auth/signin"
            className="text-color-primary underline hover:opacity-80"
          >
            Sign in
          </Link>
        </p>
      </div>

      {/* Right Section (Form) */}
      <div className="bg-color-neutral w-full md:w-1/2 h-auto md:h-screen flex items-center justify-center">
        <form
          className="w-full max-w-md bg-opacity-5 p-8 space-y-6"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-semibold text-white text-center">
            Create an Account
          </h2>

          {/* {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {success && <p className="text-green-500 text-sm text-center">{success}</p>} */}

          <Toast message={error} type="error" show={!!error} />
          <Toast message={success} type="success" show={!!success} />

          <div className="flex flex-col md:flex-row md:gap-4">
            <div className="w-full md:w-1/2 space-y-2">
              <label htmlFor="email" className="text-white text-sm">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter your First Name"
                className="mt-1 block w-full p-3 rounded-md bg-color-neutral text-white border border-grey focus:outline-none foc
                us:ring-2 focus:ring-grey"
              />
            </div>

            <div className="w-full md:w-1/2 space-y-2">
              <label htmlFor="email" className="text-white text-sm">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter your Last Name"
                className="mt-1 block w-full p-3 rounded-md bg-color-neutral text-white border border-grey focus:outline-none focus:ring-2 focus:ring-grey"
              />
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="email" className="text-white text-sm">
              Email
            </label>
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
            <label htmlFor="password" className="text-white text-sm">
              Password
            </label>
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
            <label htmlFor="confirmPassword" className="text-white text-sm">
              Confirm Password
            </label>
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
            disabled={loading}
            className={`cursor-pointer w-full bg-color-primary text-black py-3 rounded-md transition duration-200 ${
              loading ? "opacity-60 cursor-not-allowed" : "hover:opacity-90"
            }`}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
