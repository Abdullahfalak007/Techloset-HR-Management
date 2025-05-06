// src/app/(dashboard)/layout.tsx
"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/layout/Sidebar"; // <-- now points at src/components/layout
import Navbar from "@/components/layout/Navbar"; // if you added the Navbar from above

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();

  // don’t render until we know who we are
  if (status === "loading") return null;
  if (status === "unauthenticated") {
    router.replace("/signin");
    return null;
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar
          title="Dashboard"
          subtitle="You are now on the Dashboard page."
        />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
