// src/components/layout/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { assets } from "@/constants/assets";
import { navItems } from "@/constants/sidebar/navItems";
import { useTheme } from "@/constants/theme/ThemeContext";

export default function Sidebar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const { theme, toggleTheme } = useTheme();

  if (status === "loading") return null;

  const isAdmin = session?.user.role === "ADMIN";
  const employeeAllowed = new Set(["Dashboard", "All Employees", "Settings"]);
  const items = isAdmin
    ? navItems
    : navItems.filter((i) => employeeAllowed.has(i.label));

  const isDark = theme === "dark";

  return (
    <aside
      className="
        w-68 min-h-screen flex flex-col justify-between
        py-6 px-4 bg-[var(--sidebar-bg)]
      "
    >
      {/* Logo */}
      <div className="space-y-10">
        <div className="flex items-center space-x-2">
          <img src={assets.images.logo} alt="HR Logo" className="h-8 w-8" />
          <span className="text-xl font-bold">HR SEARCH</span>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {items.map((item) => {
            const active = pathname === item.href;

            // Background for active/inactive
            const bgClass = active
              ? isDark
                ? "bg-[var(--surface)]"
                : "bg-[var(--accent)]"
              : "";

            // Text color
            const textClass = active
              ? isDark
                ? "text-[var(--accent)]"
                : "text-[var(--text-primary)]"
              : "text-[var(--text-primary)]";

            // Padding + rounding
            const shapeClass = active
              ? "pl-6 pr-4 py-2 rounded-r-lg"
              : "px-3 py-2 rounded-lg hover:bg-[var(--surface-hover)]";

            return (
              <Link key={item.href} href={item.href}>
                <div
                  className={`
                    relative flex items-center space-x-3 cursor-pointer transition
                    ${bgClass} ${textClass} ${shapeClass}
                  `}
                >
                  {active && (
                    <span
                      className="
                        absolute left-0 top-0
                        h-full w-1
                        bg-[var(--accent)]
                        rounded-l-lg
                      "
                    />
                  )}
                  <img
                    src={item.icon}
                    alt={item.label}
                    className="w-5 h-5 icon-theme"
                  />
                  <span>{item.label}</span>
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Theme toggle */}
      <div className="w-48 mx-auto mt-6 flex space-x-1 bg-[var(--header-bg)] px-2 py-1 rounded-md">
        <button
          onClick={() => theme !== "light" && toggleTheme()}
          className={`
            flex items-center space-x-1 px-4 py-1 rounded-md transition
            ${
              theme === "light"
                ? "bg-[var(--accent)] text-white"
                : "bg-[var(--header-bg)] text-[var(--text-secondary)]"
            }
          `}
        >
          <img src={assets.icons.sun} alt="Light" className="w-4 h-4" />
          <span>Light</span>
        </button>
        <button
          onClick={() => theme !== "dark" && toggleTheme()}
          className={`
            flex items-center space-x-1 px-4 py-1 rounded-md transition
            ${
              theme === "dark"
                ? "bg-[var(--accent)] text-white"
                : "bg-[var(--header-bg)] text-[var(--text-secondary)]"
            }
          `}
        >
          <img src={assets.icons.moon} alt="Dark" className="w-4 h-4" />
          <span>Dark</span>
        </button>
      </div>
    </aside>
  );
}
