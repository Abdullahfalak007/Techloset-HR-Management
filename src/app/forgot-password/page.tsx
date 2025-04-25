"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();

    if (!res.ok) {
      setError(data.message || "Something went wrong");
      return;
    }

    // Navigate to OTP entry page
    router.push(`/verify-otp?email=${encodeURIComponent(email)}`);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1A1A1A] px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-[#1A1A1A] text-white space-y-6"
      >
        <h2 className="text-3xl font-bold text-center">Forgot Password</h2>
        <p className="text-center text-gray-400">
          Enter your registered email address; we’ll send you a code to reset
          your password.
        </p>

        {error && <p className="text-red-500 text-center">{error}</p>}

        {/* Email Input */}
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

        {/* Send OTP Button */}
        <button
          type="submit"
          className="w-full bg-orange-500 py-3 rounded-lg text-lg font-medium hover:bg-orange-600 transition"
        >
          Send OTP
        </button>

        {/* Back to Sign In */}
        <p className="mt-4 text-sm text-center text-gray-400">
          Remembered your password?{" "}
          <a href="/signin" className="text-orange-500 hover:underline">
            Sign In
          </a>
        </p>
      </form>
    </div>
  );
}
