"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { assets } from "@/constants/assets";
import UserDropdown from "./UserDropdown"; // <-- new import

export default function Navbar({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  const { data: session } = useSession();

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
      {/* Left: title & subtitle */}
      <div>
        <h1 className="text-2xl font-bold text-white">{title}</h1>
        {subtitle && <p className="text-gray-400 text-sm">{subtitle}</p>}
      </div>

      {/* Right: search, bell, and our new dropdown */}
      <div className="flex items-center space-x-4">
        {/* search box */}
        <input
          type="text"
          placeholder="Search"
          className="rounded-lg px-3 py-2 outline-none focus:ring-0 bg-[var(--input-bg)] border border-[var(--input-border)] text-[var(--text)] placeholder-[var(--placeholder)]"
        />

        {/* notifications bell */}
        <button>
          <Image
            src={assets.icons.bell}
            alt="Notifications"
            width={24}
            height={24}
          />
        </button>

        {/* only show dropdown if logged in */}
        {session?.user && <UserDropdown />}
      </div>
    </header>
  );
}
