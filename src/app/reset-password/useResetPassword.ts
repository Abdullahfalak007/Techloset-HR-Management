"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function useResetPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    const e = params.get("email");
    if (!e) {
      router.replace("/forgot-password");
    } else {
      setEmail(e);
    }
  }, [params, router]);

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

  return {
    email,
    newPassword,
    confirmPassword,
    setNewPassword,
    setConfirmPassword,
    message,
    error,
    handleSubmit,
  };
}
