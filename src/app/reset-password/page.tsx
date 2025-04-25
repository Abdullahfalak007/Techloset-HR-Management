"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // Pull email from querystring
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const e = params.get("email");
    if (!e) {
      router.replace("/forgot-password");
    } else {
      setEmail(e);
    }
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, newPassword }),
    });
    const data = await res.json();

    if (!res.ok) {
      setError(data.message || "Password reset failed");
    } else {
      setMessage(data.message);
      setTimeout(() => router.push("/signin"), 2000);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1A1A1A] px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-[#1A1A1A] text-white space-y-6"
      >
        <h2 className="text-3xl font-bold text-center">Reset Password</h2>

        {error && <p className="text-red-500 text-center">{error}</p>}
        {message && <p className="text-green-500 text-center">{message}</p>}

        {/* Email (read-only) */}
        <div className="space-y-1">
          <label className="text-sm text-gray-400">Email Address</label>
          <input
            type="email"
            value={email}
            readOnly
            className="w-full bg-gray-800 border border-orange-500 rounded-lg p-3 text-gray-300 outline-none"
          />
        </div>

        {/* New Password */}
        <div className="space-y-1">
          <label className="text-sm text-gray-400">New Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="w-full bg-transparent border border-orange-500 rounded-lg p-3 outline-none placeholder-gray-500 focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Confirm Password */}
        <div className="space-y-1">
          <label className="text-sm text-gray-400">Confirm New Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full bg-transparent border border-orange-500 rounded-lg p-3 outline-none placeholder-gray-500 focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-orange-500 py-3 rounded-lg text-lg font-medium hover:bg-orange-600 transition"
        >
          Reset Password
        </button>

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
