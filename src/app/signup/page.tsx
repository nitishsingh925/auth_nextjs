"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const SignupPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleForm = async (e: any) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const formData = Object.fromEntries(form.entries());

    try {
      setLoading(true);
      const response = await fetch("/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        toast.error(data.error);
        throw new Error("Signup failed");
      }
      toast.success("Signup successful! Redirecting...");
      router.push("/login");
    } catch (error: any) {
      toast.error("Signup failed. Please try again.");
      console.error("Signup failed:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Toaster position="top-center" reverseOrder={false} />
      <h1 className="text-4xl p-4">{loading ? "Processing" : "Signup"}</h1>
      <form onSubmit={handleForm} className="flex flex-col">
        <label htmlFor="username" className="p-2">
          Username
        </label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
          type="text"
          id="username"
          name="username"
          placeholder="Username"
          required
        />
        <label htmlFor="email" className="p-2">
          Email
        </label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          required
        />
        <label htmlFor="password" className="p-2">
          Password
        </label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
          type="password"
          id="password"
          name="password"
          autoComplete="off"
          placeholder="Password"
          required
        />
        <button
          type="submit"
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        >
          Sign up
        </button>
      </form>
      <Link href="/login" className="text-blue-600">
        Visit login page
      </Link>
    </div>
  );
};

export default SignupPage;
