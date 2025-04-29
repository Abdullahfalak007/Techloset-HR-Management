// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { assets } from "@/constants/assets";
// import { navItems } from "@/constants/sidebar/navItems";
// import { useTheme } from "@/constants/theme/ThemeContext";

// export default function Sidebar() {
//   const pathname = usePathname();
//   const { theme, toggleTheme } = useTheme();

//   return (
//     <aside className="bg-white dark:bg-[#1A1A1A] text-black dark:text-white w-[250px] min-h-screen flex flex-col justify-between py-6 px-4 rounded-r-2xl transition-colors">
//       {/* Logo */}
//       <div className="space-y-10">
//         <div className="flex items-center space-x-2">
//           <img src={assets.images.logo} alt="HR Logo" className="h-8 w-8" />
//           <span className="text-xl font-bold">HR SEARCH</span>
//         </div>

//         {/* Nav Links */}
//         <nav className="space-y-2">
//           {navItems.map((item) => (
//             <Link key={item.href} href={item.href}>
//               <div
//                 className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition ${
//                   pathname === item.href
//                     ? "bg-orange-600 text-white"
//                     : "hover:bg-gray-800"
//                 }`}
//               >
//                 <img src={item.icon} alt={item.label} className="w-5 h-5" />
//                 <span>{item.label}</span>
//               </div>
//             </Link>
//           ))}
//         </nav>
//       </div>

//       {/* Theme Toggle */}
//       {/* <div className="flex items-center justify-between border-t border-gray-700 pt-4">
//         <button
//           onClick={toggleTheme}
//           className="flex-1 flex justify-center items-center px-4 py-2 rounded-lg transition bg-gray-800 hover:bg-orange-500"
//         >
//           <img
//             src={theme === "dark" ? assets.icons.sun : assets.icons.moon}
//             alt="Toggle Theme"
//             className="w-4 h-4 mr-2"
//           />
//           {theme === "dark" ? "Light" : "Dark"}
//         </button>
//       </div> */}
//       {/* Theme Toggle */}
//       <div className="flex items-center justify-center  pt-4">
//         <div className="flex w-fit  rounded-lg overflow-hidden">
//           {/* Light Theme Button */}
//           <button
//             onClick={() => theme !== "light" && toggleTheme()}
//             className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition rounded-lg ${
//               theme === "light"
//                 ? "bg-orange-500 text-white"
//                 : "bg-[#1A1A1A] text-gray-300"
//             }`}
//           >
//             <img src={assets.icons.sun} alt="Light" className="w-4 h-4" />
//             Light
//           </button>

//           {/* Dark Theme Button */}
//           <button
//             onClick={() => theme !== "dark" && toggleTheme()}
//             className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition rounded-lg ${
//               theme === "dark"
//                 ? "bg-orange-500 text-white"
//                 : "bg-[#1A1A1A] text-gray-300"
//             }`}
//           >
//             <img src={assets.icons.moon} alt="Dark" className="w-4 h-4" />
//             Dark
//           </button>
//         </div>
//       </div>
//     </aside>
//   );
// }
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

  // show a loader or nothing until session is resolved
  if (status === "loading") return null;

  // only these items for employees:
  const employeeAllowed = new Set(["Dashboard", "All Employees", "Settings"]);

  const items =
    session?.user.role === "EMPLOYEE"
      ? navItems.filter((i) => employeeAllowed.has(i.label))
      : navItems;

  return (
    <aside className="bg-white dark:bg-[#1A1A1A] text-black dark:text-white w-[250px] min-h-screen flex flex-col justify-between py-6 px-4 rounded-r-2xl transition-colors">
      {/* Logo */}
      <div className="space-y-10">
        <div className="flex items-center space-x-2">
          <img src={assets.images.logo} alt="HR Logo" className="h-8 w-8" />
          <span className="text-xl font-bold">HR SEARCH</span>
        </div>

        {/* Nav Links */}
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

      {/* Theme Toggle */}
      <div className="flex items-center justify-center pt-4 space-x-2">
        <button
          onClick={() => theme !== "light" && toggleTheme()}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition ${
            theme === "light"
              ? "bg-orange-500 text-white"
              : "bg-[#1A1A1A] text-gray-300"
          }`}
        >
          <img src={assets.icons.sun} alt="Light" className="w-4 h-4" />
          Light
        </button>
        <button
          onClick={() => theme !== "dark" && toggleTheme()}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition ${
            theme === "dark"
              ? "bg-orange-500 text-white"
              : "bg-[#1A1A1A] text-gray-300"
          }`}
        >
          <img src={assets.icons.moon} alt="Dark" className="w-4 h-4" />
          Dark
        </button>
      </div>
    </aside>
  );
}
