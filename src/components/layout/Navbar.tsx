// src/components/layout/Navbar.tsx
"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { assets } from "@/constants/assets";

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
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        {subtitle && <p className="text-gray-400 text-sm">{subtitle}</p>}
      </div>

      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search"
          className="bg-[#111] rounded-lg px-3 py-2 placeholder-gray-600 outline-none focus:ring-0"
        />
        <button>
          <img
            src={assets.icons.bell}
            alt="Notifications"
            className="w-6 h-6"
          />
        </button>
        <div className="flex items-center space-x-2">
          <Image
            src={session?.user.image || "/assets/icons/default-avatar.png"}
            width={32}
            height={32}
            alt="avatar"
            className="rounded-full"
          />
          <div className="text-right">
            <p className="text-sm font-medium">{session?.user.name}</p>
            <p className="text-xs text-gray-400">{session?.user.role}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
