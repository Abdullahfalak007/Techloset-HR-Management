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
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

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

  if (status === "loading") return null;
  if (status === "unauthenticated") {
    router.replace("/signin");
    return null;
  }

  return (
    // 1) make the outer container exactly the viewport, no native scroll
    <div className="flex h-screen overflow-hidden">
      {/* 2) sidebar sits full‐height and never scrolls */}
      <Sidebar />

      {/* 3) right side is a column that also never scrolls itself */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar title={title} subtitle={subtitle} />

        {/* 4) only *this* <main> scrolls */}
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
