// "use client";

// import { useSession } from "next-auth/react";
// import Image from "next/image";
// import { assets } from "@/constants/assets";
// import UserDropdown from "./UserDropdown"; // <-- new import

// export default function Navbar({
//   title,
//   subtitle,
// }: {
//   title: string;
//   subtitle?: string;
// }) {
//   const { data: session } = useSession();

//   return (
//     <header className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
//       {/* Left: title & subtitle */}
//       <div>
//         <h1 className="text-2xl font-bold text-white">{title}</h1>
//         {subtitle && <p className="text-gray-400 text-sm">{subtitle}</p>}
//       </div>

//       {/* Right: search, bell, and our new dropdown */}
//       <div className="flex items-center space-x-4">
//         {/* search box */}
//         <input
//           type="text"
//           placeholder="Search"
//           className="rounded-lg px-3 py-2 outline-none focus:ring-0 bg-[var(--input-bg)] border border-[var(--input-border)] text-[var(--text)] placeholder-[var(--placeholder)]"
//         />

//         {/* notifications bell */}
//         <button>
//           <Image
//             src={assets.icons.bell}
//             alt="Notifications"
//             width={24}
//             height={24}
//           />
//         </button>

//         {/* only show dropdown if logged in */}
//         {session?.user && <UserDropdown />}
//       </div>
//     </header>
//   );
// }

// src/components/layout/Navbar.tsx
"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
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
    <header className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
      <div>
        <h1 className="text-2xl font-bold text-white">{title}</h1>
        {subtitle && <p className="text-gray-400 text-sm">{subtitle}</p>}
      </div>
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search"
          className="bg-[#111] rounded-lg px-3 py-2 placeholder-gray-600 text-white outline-none focus:ring-0"
        />

        {/* Bell button now navigates on click */}
        <button
          className="relative"
          onClick={() => router.push("/notification")}
          title="View notifications"
        >
          <Image
            src={assets.icons.bell}
            alt="Notifications"
            width={24}
            height={24}
          />
          {unread > 0 && (
            <span className="absolute top-0 right-0 inline-flex items-center justify-center h-4 w-4 rounded-full bg-red-500 text-white text-xs">
              {unread}
            </span>
          )}
        </button>

        {session?.user && <UserDropdown />}
      </div>
    </header>
  );
}
