"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // If user is unauthenticated, redirect them to /signin
    if (status === "unauthenticated") {
      router.replace("/signin");
    }
  }, [status, router]);

  if (status === "loading") return <p>Loading...</p>;
  if (!session) return null; // When redirecting, render nothing

  return (
    <div className="min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p>
        <strong>Name:</strong> {session.user.name}
      </p>
      <p>
        <strong>Email:</strong> {session.user.email}
      </p>
      <p>
        <strong>Role:</strong> {session.user.role}
      </p>
      <button
        onClick={() => signOut()}
        className="mt-4 bg-red-500 text-white px-3 py-1 rounded"
      >
        Sign Out
      </button>
    </div>
  );
}
