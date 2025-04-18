"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { assets } from "@/constants/assets";

export default function SigninPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("Invalid email or password");
    } else {
      router.push("/");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1A1A1A] px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-[#1A1A1A] text-white space-y-6"
      >
        {/* Logo */}
        {/* Header: logo + title side by side */}
        {/* Header: logo + title side by side */}
        <div className="flex items-end justify-center space-x-3">
          <Image
            src={assets.images.logo}
            alt="HR Search Logo"
            width={50}
            height={50}
          />
          <h2 className="text-3xl font-bold">HR SEARCH</h2>
        </div>

        {/* Welcome text */}
        <div className="text-left">
          <h3 className="text-xl font-semibold">Welcome</h3>
          <p className="text-gray-400">Please login here</p>
        </div>

        {error && <p className="text-red-500 text-center">{error}</p>}

        {/* Email */}
        <div className="space-y-1">
          <label className="text-sm text-gray-400">Email Address</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-transparent border border-orange-500 rounded-lg p-3 outline-none placeholder-gray-500 focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Password */}
        <div className="space-y-1">
          <label className="text-sm text-gray-400">Password</label>
          <div className="relative">
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-transparent border border-orange-500 rounded-lg p-3 pr-10 outline-none placeholder-gray-500 focus:ring-2 focus:ring-orange-500"
            />
            {/* eye icon as <img> since it's a standalone SVG */}
            <img
              src={assets.icons.eye}
              alt="Show password"
              className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 cursor-pointer"
              // onClick: toggle password visibility if you wire that up
            />
          </div>
        </div>

        {/* Remember + Forgot */}
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={remember}
              onChange={() => setRemember(!remember)}
              className="h-5 w-5 rounded border-orange-500 bg-transparent text-orange-500 focus:ring-orange-500"
            />
            <span>Remember Me</span>
          </label>
          <a
            href="/forgot-password"
            className="text-orange-500 hover:underline"
          >
            Forgot Password?
          </a>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-orange-500 py-3 rounded-lg text-lg font-medium hover:bg-orange-600 transition"
        >
          Login
        </button>

        <p className="mt-4 text-sm text-center text-gray-400">
          Don't have an account?{" "}
          <a href="/signup" className="text-orange-500 hover:underline">
            Sign Up
          </a>
        </p>
      </form>
    </div>
  );
}
