"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function useSignup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();

    if (!res.ok) {
      setError(data.message || "Signup failed");
    } else {
      router.push("/signin");
    }
  }

  return {
    name,
    email,
    password,
    remember,
    error,
    setName,
    setEmail,
    setPassword,
    setRemember,
    handleSubmit,
  };
}
