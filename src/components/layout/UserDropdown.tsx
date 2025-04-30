// // src/components/layout/UserDropdown.tsx
// "use client";

// import { useSession, signOut } from "next-auth/react";
// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useState, useRef, useEffect } from "react";
// import { assets } from "@/constants/assets";

// export default function UserDropdown() {
//   const { data: session } = useSession();
//   const [open, setOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   // close on outside click
//   useEffect(() => {
//     function onClick(e: MouseEvent) {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(e.target as Node)
//       ) {
//         setOpen(false);
//       }
//     }
//     document.addEventListener("mousedown", onClick);
//     return () => document.removeEventListener("mousedown", onClick);
//   }, []);

//   if (!session?.user) return null;
//   const { name, image, role, id } = session.user as any;

//   return (
//     <div ref={dropdownRef} className="relative">
//       <button
//         onClick={() => setOpen((o) => !o)}
//         className="flex items-center space-x-2 px-3 py-2 rounded hover:bg-gray-800 transition"
//       >
//         <Image
//           src={image || "/assets/icons/default-avatar.png"}
//           alt="avatar"
//           width={32}
//           height={32}
//           className="rounded-full"
//         />
//         <div className="text-left">
//           <p className="text-sm font-medium text-white">{name}</p>
//           <p className="text-xs text-gray-400 uppercase">{role}</p>
//         </div>
//         <svg
//           className={`w-4 h-4 text-gray-400 transform transition-transform ${
//             open ? "rotate-180" : ""
//           }`}
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//         >
//           <path strokeWidth="2" d="M19 9l-7 7-7-7" />
//         </svg>
//       </button>

//       {open && (
//         <div className="absolute right-0 mt-2 w-48 bg-[#111] rounded shadow-lg z-50">
//           <Link
//             href="/profile"
//             className="block px-4 py-2 text-white hover:bg-gray-800"
//           >
//             Profile
//           </Link>
//           <Link
//             href={`/employees/${id}`}
//             className="block px-4 py-2 text-white hover:bg-gray-800"
//           >
//             Employee Info
//           </Link>
//           <Link
//             href="/change-password"
//             className="block px-4 py-2 text-white hover:bg-gray-800"
//           >
//             Change Password
//           </Link>
//           <hr className="border-gray-700 my-1" />
//           <button
//             onClick={() => signOut()}
//             className="w-full text-left px-4 py-2 text-white hover:bg-gray-800"
//           >
//             Logout
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// src/components/layout/UserDropdown.tsx
"use client";

import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

export default function UserDropdown() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isAdmin = session?.user?.role === "ADMIN";
  const [empId, setEmpId] = useState<string | null>(null);

  // 1) fetch /api/employees/me on mount
  useEffect(() => {
    fetch("/api/employees/me")
      .then((res) => res.json())
      .then((data: { id: string | null }) => {
        console.log("→ /api/employees/me returned:", data);
        setEmpId(data.id);
      })
      .catch(console.error);
  }, []);

  // 2) close on outside click
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  if (!session?.user) return null;
  const { name, image, role } = session.user as any;

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center space-x-2 px-3 py-2 rounded hover:bg-gray-800 transition"
      >
        <Image
          src={image || "/assets/icons/default-avatar.png"}
          alt="avatar"
          width={32}
          height={32}
          className="rounded-full"
        />
        <div className="text-left">
          <p className="text-sm font-medium text-white">{name}</p>
          <p className="text-xs text-gray-400 uppercase">{role}</p>
        </div>
        <svg
          className={`w-4 h-4 text-gray-400 transform transition-transform ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-[#111] rounded shadow-lg z-50">
          <Link
            href="/profile"
            className="block px-4 py-2 text-white hover:bg-gray-800"
          >
            Profile
          </Link>

          {/* always show for non-admin, link to specific record if we have it */}
          {!isAdmin && (
            <Link
              href={empId ? `/employees/${empId}` : "/employees"}
              className="block px-4 py-2 text-white hover:bg-gray-800"
            >
              Employee Info
            </Link>
          )}

          <Link
            href="/change-password"
            className="block px-4 py-2 text-white hover:bg-gray-800"
          >
            Change Password
          </Link>

          <hr className="border-gray-700 my-1" />

          <button
            onClick={() => signOut()}
            className="w-full text-left px-4 py-2 text-white hover:bg-gray-800"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
