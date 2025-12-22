"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/userSlice";
import Toast from "@/components/Toast";
import Link from "next/link";
import Image from "next/image";

const SignIn = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    const { email, password } = formData;
    if (!email || !password) {
      setError("Fill all fields");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:4000/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
            mutation Login($email: String!, $password: String!) {
              login(email: $email, password: $password) {
                id
                email
                firstName
                lastName
              }
            }
          `,
          variables: { email, password },
        }),
      });
      const result = await res.json();
      const user = result.data.login;
      dispatch(setUser({ ...user }));
      sessionStorage.setItem("loggedin", "true");
      sessionStorage.setItem("userData", JSON.stringify(user));
      setSuccess("Signed in successfully!");
      router.push("/"); // redirect
      setLoading(false);
    } catch (err) {
      console.error(err);
      sessionStorage.setItem("loggedin", "false");
      setError("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-full md:h-screen">
      {/* Left Section */}
      <div className="bg-grey w-full md:w-1/2 h-screen flex flex-col justify-center items-center px-6 space-y-6">
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
          Don’t have an account?{" "}
          <Link
            href="/auth/signup"
            className="text-color-primary underline hover:opacity-80"
          >
            Sign up
          </Link>
        </p>
      </div>

      {/* Right Section */}
      <div className="bg-color-neutral w-full md:w-1/2 h-screen flex items-center justify-center px-6">
        <form
          className="w-full max-w-md bg-opacity-5 p-8 space-y-6"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-semibold text-white text-center">
            Sign In
          </h2>

          {/* {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    {success && <p className="text-green-500 text-sm text-center">{success}</p>} */}

          <Toast message={error} type="error" show={!!error} />
          <Toast message={success} type="success" show={!!success} />

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

          <button
            type="submit"
            disabled={loading}
            className={`cursor-pointer w-full bg-color-primary text-black py-3 rounded-md transition duration-200 ${
              loading ? "opacity-60 cursor-not-allowed" : "hover:opacity-90"
            }`}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
