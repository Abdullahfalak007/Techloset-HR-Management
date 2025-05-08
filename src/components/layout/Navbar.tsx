// // src/components/layout/Navbar.tsx
// "use client";

// import { useSession } from "next-auth/react";
// import Image from "next/image";
// import { useRouter, usePathname, useSearchParams } from "next/navigation";
// import { assets } from "@/constants/assets";
// import UserDropdown from "./UserDropdown";
// import { useEffect, useState } from "react";

// export default function Navbar({
//   title,
//   subtitle,
// }: {
//   title: string;
//   subtitle?: string;
// }) {
//   const { data: session } = useSession();
//   const router = useRouter();
//   const pathname = usePathname();
//   const searchParams = useSearchParams();

//   // Keep an internal state for the input
//   const [search, setSearch] = useState(searchParams.get("search") || "");

//   // Sync with back/forward navigation
//   useEffect(() => {
//     setSearch(searchParams.get("search") || "");
//   }, [searchParams]);

//   // Called on every keystroke
//   function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
//     const q = e.target.value;
//     setSearch(q);

//     // Immediately update the URL (replace so history doesn't flood)
//     const trimmed = q.trim();
//     const target = trimmed
//       ? `${pathname}?search=${encodeURIComponent(trimmed)}`
//       : pathname;
//     router.replace(target);
//   }

//   // Notifications badge (unchanged)
//   const [unread, setUnread] = useState(0);
//   useEffect(() => {
//     if (session?.user) {
//       fetch("/api/notifications")
//         .then((r) => r.json())
//         .then((data: any[]) => setUnread(data.filter((n) => !n.read).length))
//         .catch(console.error);
//     }
//   }, [session]);

//   return (
//     <header className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
//       <div>
//         <h1 className="text-2xl font-bold text-white">{title}</h1>
//         {subtitle && <p className="text-gray-400 text-sm">{subtitle}</p>}
//       </div>

//       <div className="flex items-center space-x-4">
//         {/* Instant search input */}
//         <div className="relative">
//           <input
//             type="text"
//             placeholder="Search"
//             value={search}
//             onChange={handleChange}
//             className="bg-[#111] rounded-lg px-3 py-2 placeholder-gray-600 text-white outline-none focus:ring-0"
//           />
//           {search && (
//             <button
//               onClick={() => handleChange({ target: { value: "" } } as any)}
//               className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
//             >
//               ×
//             </button>
//           )}
//         </div>

//         {/* Bell (unchanged) */}
//         <button
//           className="relative"
//           onClick={() => router.push("/notification")}
//           title="View notifications"
//         >
//           <Image
//             src={assets.icons.bell}
//             alt="Notifications"
//             width={24}
//             height={24}
//           />
//           {unread > 0 && (
//             <span className="absolute top-0 right-0 inline-flex items-center justify-center h-4 w-4 rounded-full bg-red-500 text-white text-xs">
//               {unread}
//             </span>
//           )}
//         </button>

//         {session?.user && <UserDropdown />}
//       </div>
//     </header>
//   );
// }

// src/components/layout/Navbar.tsx
// src/components/layout/Navbar.tsx
"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { assets } from "@/constants/assets";
import UserDropdown from "./UserDropdown";
import { useEffect, useState } from "react";

export default function Navbar({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  useEffect(() => {
    setSearch(searchParams.get("search") || "");
  }, [searchParams]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const q = e.target.value;
    setSearch(q);
    const trimmed = q.trim();
    const target = trimmed
      ? `${pathname}?search=${encodeURIComponent(trimmed)}`
      : pathname;
    router.replace(target);
  }

  const [unread, setUnread] = useState(0);
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
        bg-[var(--)]
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
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={handleChange}
            className="
              w-64
              bg-[var(--surface)]
              border border-[var(--input-border)]
              rounded-lg
              px-3 py-2
              placeholder-[var(--input-placeholder)]
              text-[var(--text-primary)]
              outline-none
              focus:ring-0
              focus:border-[var(--accent)]
            "
          />
          {search && (
            <button
              onClick={() => handleChange({ target: { value: "" } } as any)}
              className="
                absolute right-2 top-1/2 -translate-y-1/2
                text-[var(--text-secondary)]
                hover:text-[var(--text-primary)]
              "
            >
              ×
            </button>
          )}
        </div>

        {/* Notifications bell */}
        <button
          className="relative flex items-center space-x-2 px-3 py-2 rounded
          bg-[var(--surface)] hover:bg-[var(--surface-hover)]"
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
                absolute top-0 right-0
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
