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

  // don’t render until we know the session
  if (status === "loading") return null;

  // Only admins see every link, non-admins see just Dashboard, All Employees and Settings
  const isAdmin = session?.user.role === "ADMIN";
  const employeeAllowed = new Set(["Dashboard", "All Employees", "Settings"]);
  const items = isAdmin
    ? navItems
    : navItems.filter((i) => employeeAllowed.has(i.label));

  return (
    <aside
      className="
      w-[250px] min-h-screen flex flex-col justify-between py-6 px-4 rounded-r-2xl transition-colors
      bg-[var(--bg)]      
      text-[var(--text)] 
    "
    >
      <div className="space-y-10">
        {/* logo */}
        <div className="flex items-center space-x-2">
          <img src={assets.images.logo} alt="HR Logo" className="h-8 w-8" />
          <span className="text-xl font-bold">HR SEARCH</span>
        </div>

        {/* nav links */}
        <nav className="space-y-2">
          {items.map((item) => (
            <Link key={item.href} href={item.href}>
              <div
                className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition ${
                  pathname === item.href
                    ? "bg-orange-600 text-white"
                    : "hover:bg-gray-800"
                }`}
              >
                <img src={item.icon} alt={item.label} className="w-5 h-5" />
                <span>{item.label}</span>
              </div>
            </Link>
          ))}
        </nav>
      </div>

      {/* theme toggle */}
      <div className="flex items-center justify-center pt-4">
        <button
          onClick={() => theme !== "light" && toggleTheme()}
          className={`
      relative -mr-1
      ${theme === "light" ? "z-10" : "z-0"}
      flex items-center px-4 py-2 text-sm font-medium rounded-lg transition
      ${
        theme === "light"
          ? "bg-orange-500 text-white"
          : "bg-[#1A1A1A] text-gray-300"
      }
    `}
        >
          <img src={assets.icons.sun} alt="Light" className="w-4 h-4 mr-2" />
          Light
        </button>

        <button
          onClick={() => theme !== "dark" && toggleTheme()}
          className={`
      relative -ml-2
      ${theme === "dark" ? "z-10" : "z-0"}
      flex items-center px-4 py-2 text-sm font-medium rounded-lg transition
      ${
        theme === "dark"
          ? "bg-orange-500 text-white"
          : "bg-[#1A1A1A] text-gray-300"
      }
    `}
        >
          <img src={assets.icons.moon} alt="Dark" className="w-4 h-4 mr-2" />
          Dark
        </button>
      </div>
    </aside>
  );
}
