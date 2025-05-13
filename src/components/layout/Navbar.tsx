"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { assets } from "@/constants/assets";
import UserDropdown from "./UserDropdown";
import { useEffect, useState } from "react";
import SearchBar from "@/components/common/SearchBar";

export default function Navbar({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  const { data: session } = useSession();
  const router = useRouter();
  const [unread, setUnread] = useState(0);

  // fetch unread count
  useEffect(() => {
    if (session?.user) {
      fetch("/api/notifications")
        .then((r) => r.json())
        .then((data: any[]) => setUnread(data.filter((n) => !n.read).length))
        .catch(console.error);
    }
  }, [session]);

  return (
    <header
      className="
        flex items-center justify-between
        px-6 py-4
        border-b border-[var(--border)]
        bg-[var(--header-bg)]
      "
    >
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm text-[var(--text-secondary)]">{subtitle}</p>
        )}
      </div>

      {/* Search + Icons */}
      <div className="flex items-center space-x-4">
        <SearchBar placeholder="Search" className="w-64" inputClassName="" />

        {/* Notifications bell */}
        <button
          className="relative flex items-center px-3 py-2 rounded bg-[var(--surface)] hover:bg-[var(--surface-hover)]"
          onClick={() => router.push("/notification")}
          title="View notifications"
        >
          <Image
            src={assets.icons.bell}
            alt="Notifications"
            width={24}
            height={24}
            className="icon-theme"
          />
          {unread > 0 && (
            <span
              className="
                absolute -top-1 -right-1
                inline-flex items-center justify-center
                h-4 w-4 rounded-full
                bg-[var(--error)]
                text-[var(--text-primary)]
                text-xs
              "
            >
              {unread}
            </span>
          )}
        </button>

        {/* User dropdown */}
        {session?.user && <UserDropdown />}
      </div>
    </header>
  );
}
