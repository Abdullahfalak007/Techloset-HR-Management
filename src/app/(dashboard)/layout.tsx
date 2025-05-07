// src/app/(dashboard)/layout.tsx
"use client";

import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import { useMemo } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 1) Always call hooks in the same order:
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  // 2) Compute title/subtitle unconditionally:
  const { title, subtitle } = useMemo(() => {
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length === 0) {
      return {
        title: "Dashboard",
        subtitle: "You are now on the Dashboard page.",
      };
    }
    const human = segments
      .map((seg) =>
        seg.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
      )
      .join(" / ");
    return {
      title: human,
      subtitle: `You are now on the ${human} page.`,
    };
  }, [pathname]);

  // 3) Then do your early returns:
  if (status === "loading") return null;
  if (status === "unauthenticated") {
    router.replace("/signin");
    return null;
  }

  // 4) Finally render:
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar title={title} subtitle={subtitle} />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
