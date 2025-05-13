// // // // src/app/(dashboard)/employees/[id]/layout.tsx
// // // "use client";

// // // import { useEffect } from "react";
// // // import { useParams, usePathname } from "next/navigation";
// // // import Link from "next/link";
// // // import Image from "next/image";
// // // import { assets } from "@/constants/assets";
// // // import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
// // // import { fetchEmployeeById } from "@/store/slices/employeeSlice";

// // // export default function EmployeeDetailLayout({
// // //   children,
// // // }: {
// // //   children: React.ReactNode;
// // // }) {
// // //   const { id: rawId } = useParams();
// // //   const id = Array.isArray(rawId) ? rawId[0] : rawId!;
// // //   const pathname = usePathname();
// // //   const dispatch = useAppDispatch();

// // //   const employee = useAppSelector((s) =>
// // //     s.employees.employees.find((e) => e.id === id)
// // //   );
// // //   const status = useAppSelector((s) => s.employees.status);

// // //   useEffect(() => {
// // //     if (status === "idle") {
// // //       dispatch(fetchEmployeeById(id));
// // //     }
// // //   }, [status, dispatch, id]);

// // //   if (!employee) return <p className="p-6">Loading…</p>;

// // //   const base = `/employees/${id}`;
// // //   const navItems = [
// // //     { label: "Profile", href: base, icon: assets.icons.user },
// // //     {
// // //       label: "Attendance",
// // //       href: `${base}/attendance`,
// // //       icon: assets.icons.calendar,
// // //     },
// // //     { label: "Projects", href: `${base}/projects`, icon: assets.icons.project },
// // //     { label: "Leave", href: `${base}/leave`, icon: assets.icons.leaves },
// // //   ];

// // //   return (
// // //     <div className="space-y-6 p-6">
// // //       {/* Top summary */}
// // //       <div className="flex items-center justify-between bg-[var(--container-bg)] p-6 rounded-lg">
// // //         <div className="flex items-center space-x-4">
// // //           <Image
// // //             src={employee.avatar || "/assets/icons/default-avatar.png"}
// // //             alt="Avatar"
// // //             width={72}
// // //             height={72}
// // //             className="rounded-lg object-cover"
// // //           />
// // //           <div className="space-y-1">
// // //             <h1 className="text-2xl font-bold text-[var(--text-primary)]">
// // //               {employee.name}
// // //             </h1>
// // //             <p className="flex items-center text-[var(--text-secondary)] space-x-2">
// // //               <Image
// // //                 src={assets.icons.briefcase}
// // //                 alt=""
// // //                 width={16}
// // //                 height={16}
// // //               />
// // //               <span>{employee.designation}</span>
// // //             </p>
// // //             <p className="flex items-center text-[var(--text-secondary)] space-x-2">
// // //               <Image src={assets.icons.mail} alt="" width={16} height={16} />
// // //               <span>{employee.personalInfo.email}</span>
// // //             </p>
// // //           </div>
// // //         </div>
// // //         <button
// // //           className="bg-[var(--accent)] px-5 py-2 rounded-lg flex items-center space-x-2 hover:bg-[var(--accent-hover)] transition"
// // //           onClick={() => (window.location.href = `/employees/${id}/edit`)}
// // //         >
// // //           <Image src={assets.icons.edit} alt="" width={16} height={16} />
// // //           <span className="text-[var(--button-text)]">Edit Profile</span>
// // //         </button>
// // //       </div>

// // //       {/* Inner layout */}
// // //       <div className="flex space-x-6">
// // //         {/* Left sidebar */}
// // //         <nav className="w-1/4 bg-[var(--container-bg)] rounded-lg p-4 space-y-2">
// // //           {navItems.map((item) => {
// // //             const active = pathname === item.href;
// // //             return (
// // //               <Link
// // //                 key={item.href}
// // //                 href={item.href}
// // //                 className={`flex items-center px-4 py-2 space-x-2 rounded-lg transition ${
// // //                   active
// // //                     ? "bg-[var(--accent)] text-[var(--button-text)]"
// // //                     : "text-[var(--link-color)] hover:bg-[var(--surface)]"
// // //                 }`}
// // //               >
// // //                 <Image
// // //                   src={item.icon}
// // //                   alt={item.label}
// // //                   width={16}
// // //                   height={16}
// // //                 />
// // //                 <span>{item.label}</span>
// // //               </Link>
// // //             );
// // //           })}
// // //         </nav>

// // //         {/* Right panel */}
// // //         <div className="flex-1">{children}</div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // "use client";

// // import { useEffect } from "react";
// // import { useParams, usePathname } from "next/navigation";
// // import Link from "next/link";
// // import Image from "next/image";
// // import { assets } from "@/constants/assets";
// // import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
// // import { fetchEmployeeById } from "@/store/slices/employeeSlice";

// // export default function EmployeeDetailLayout({
// //   children,
// // }: {
// //   children: React.ReactNode;
// // }) {
// //   const { id: rawId } = useParams();
// //   const id = Array.isArray(rawId) ? rawId[0] : rawId!;
// //   const pathname = usePathname();
// //   const dispatch = useAppDispatch();

// //   // are we on the "edit" sub-route?
// //   const isEdit = pathname.endsWith("/edit");

// //   const employee = useAppSelector((s) =>
// //     s.employees.employees.find((e) => e.id === id)
// //   );
// //   const status = useAppSelector((s) => s.employees.status);

// //   useEffect(() => {
// //     if (status === "idle") {
// //       dispatch(fetchEmployeeById(id));
// //     }
// //   }, [status, dispatch, id]);

// //   if (!employee) return <p className="p-6">Loading…</p>;

// //   const base = `/employees/${id}`;
// //   const navItems = [
// //     { label: "Profile", href: base, icon: assets.icons.user },
// //     {
// //       label: "Attendance",
// //       href: `${base}/attendance`,
// //       icon: assets.icons.calendar,
// //     },
// //     {
// //       label: "Projects",
// //       href: `${base}/projects`,
// //       icon: assets.icons.project,
// //     },
// //     { label: "Leave", href: `${base}/leave`, icon: assets.icons.leaves },
// //   ];

// //   return (
// //     <div className="space-y-6 p-6">
// //       {/* Top summary */}
// //       <div className="flex items-center justify-between bg-[var(--container-bg)] p-6 rounded-lg">
// //         <div className="flex items-center space-x-4">
// //           <div className="relative">
// //             {/* big avatar */}
// //             <Image
// //               src={employee.avatar || "/assets/icons/default-avatar.png"}
// //               alt="Avatar"
// //               width={72}
// //               height={72}
// //               className="rounded-lg object-cover"
// //             />
// //             {isEdit && (
// //               // little edit‐icon overlay
// //               <button
// //                 onClick={() => window.dispatchEvent(new Event("avatar-edit"))}
// //                 className="absolute bottom-0 right-0 bg-[var(--accent)] p-1 rounded-full hover:bg-[var(--accent-hover)] transition"
// //                 title="Change avatar"
// //               >
// //                 <Image
// //                   src={assets.icons.editAvatar}
// //                   alt="Edit Avatar"
// //                   width={16}
// //                   height={16}
// //                 />
// //               </button>
// //             )}
// //           </div>
// //           <div className="space-y-1">
// //             <h1 className="text-2xl font-bold text-[var(--text-primary)]">
// //               {employee.name}
// //             </h1>
// //             <p className="flex items-center text-[var(--text-secondary)] space-x-2">
// //               <Image
// //                 src={assets.icons.briefcase}
// //                 alt=""
// //                 width={16}
// //                 height={16}
// //               />
// //               <span>{employee.designation}</span>
// //             </p>
// //             <p className="flex items-center text-[var(--text-secondary)] space-x-2">
// //               <Image src={assets.icons.mail} alt="" width={16} height={16} />
// //               <span>{employee.personalInfo.email}</span>
// //             </p>
// //           </div>
// //         </div>

// //         {isEdit ? (
// //           // Save button in edit‐mode
// //           <button
// //             onClick={() => window.dispatchEvent(new Event("save-employee"))}
// //             className="bg-[var(--accent)] px-5 py-2 rounded-lg flex items-center space-x-2 hover:bg-[var(--accent-hover)] transition"
// //           >
// //             {/* replace with your save icon */}
// //             <Image src={assets.icons.save} alt="Save" width={16} height={16} />
// //             <span className="text-[var(--button-text)]">Save</span>
// //           </button>
// //         ) : (
// //           // normal edit‐profile entrypoint
// //           <button
// //             className="bg-[var(--accent)] px-5 py-2 rounded-lg flex items-center space-x-2 hover:bg-[var(--accent-hover)] transition"
// //             onClick={() => (window.location.href = `/employees/${id}/edit`)}
// //           >
// //             <Image src={assets.icons.edit} alt="" width={16} height={16} />
// //             <span className="text-[var(--button-text)]">Edit Profile</span>
// //           </button>
// //         )}
// //       </div>

// //       {/* Inner layout */}
// //       <div className="flex space-x-6">
// //         {/* Left sidebar */}
// //         {!isEdit && (
// //           <nav className="w-1/4 bg-[var(--container-bg)] rounded-lg p-4 space-y-2">
// //             {navItems.map((item) => {
// //               const active = pathname === item.href;
// //               return (
// //                 <Link
// //                   key={item.href}
// //                   href={item.href}
// //                   className={`flex items-center px-4 py-2 space-x-2 rounded-lg transition ${
// //                     active
// //                       ? "bg-[var(--accent)] text-[var(--button-text)]"
// //                       : "text-[var(--link-color)] hover:bg-[var(--surface)]"
// //                   }`}
// //                 >
// //                   <Image
// //                     src={item.icon}
// //                     alt={item.label}
// //                     width={16}
// //                     height={16}
// //                   />
// //                   <span>{item.label}</span>
// //                 </Link>
// //               );
// //             })}
// //           </nav>
// //         )}

// //         {/* Right panel */}
// //         <div className={`flex-1 ${isEdit ? "" : ""}`}>{children}</div>
// //       </div>
// //     </div>
// //   );
// // }

// // src/app/(dashboard)/employees/[id]/layout.tsx
// "use client";

// import { useEffect } from "react";
// import { useParams, usePathname } from "next/navigation";
// import Link from "next/link";
// import Image from "next/image";
// import { assets } from "@/constants/assets";
// import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
// import { fetchEmployeeById } from "@/store/slices/employeeSlice";

// export default function EmployeeDetailLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const { id: rawId } = useParams();
//   const id = Array.isArray(rawId) ? rawId[0] : rawId!;
//   const pathname = usePathname();
//   const dispatch = useAppDispatch();

//   // Are we on the "/edit" page?
//   const isEdit = pathname.endsWith("/edit");

//   const employee = useAppSelector((s) =>
//     s.employees.employees.find((e) => e.id === id)
//   );
//   const status = useAppSelector((s) => s.employees.status);

//   useEffect(() => {
//     if (status === "idle") {
//       dispatch(fetchEmployeeById(id));
//     }
//   }, [status, dispatch, id]);

//   if (!employee) return <p className="p-6">Loading…</p>;

//   const base = `/employees/${id}`;
//   const navItems = [
//     { label: "Profile", href: base, icon: assets.icons.user },
//     {
//       label: "Attendance",
//       href: `${base}/attendance`,
//       icon: assets.icons.calendar,
//     },
//     {
//       label: "Projects",
//       href: `${base}/projects`,
//       icon: assets.icons.project,
//     },
//     { label: "Leave", href: `${base}/leave`, icon: assets.icons.leaves },
//   ];

//   return (
//     <div className="border border-[var(--border)] rounded-lg">
//       {/* Top summary + Edit/Save button */}
//       <div className="flex items-center justify-between bg-[var(--container-bg)] p-4 border-b border-[var(--border)]">
//         <div className="flex items-center space-x-4">
//           <div className="relative">
//             {/* Main avatar */}
//             <Image
//               src={employee.avatar || "/assets/icons/default-avatar.png"}
//               alt="Avatar"
//               width={72}
//               height={72}
//               className="rounded-lg object-cover w-24 h-24"
//             />
//             {isEdit && (
//               <button
//                 onClick={() => window.dispatchEvent(new Event("avatar-edit"))}
//                 className="absolute bottom-0 right-0 p-1 rounded-full hover:bg-[var(--accent-hover)] transition"
//                 title="Change avatar"
//               >
//                 <Image
//                   src={assets.icons.editAvatar}
//                   alt="Edit Avatar"
//                   width={16}
//                   height={16}
//                 />
//               </button>
//             )}
//           </div>

//           <div className="space-y-1">
//             <h1 className="text-2xl font-bold text-[var(--text-primary)]">
//               {employee.name}
//             </h1>
//             <p className="flex items-center text-[var(--text-secondary)] space-x-2">
//               <Image
//                 src={assets.icons.briefcase}
//                 alt=""
//                 width={16}
//                 height={16}
//               />
//               <span>{employee.designation}</span>
//             </p>
//             <p className="flex items-center text-[var(--text-secondary)] space-x-2">
//               <Image src={assets.icons.mail} alt="" width={16} height={16} />
//               <span>{employee.personalInfo.email}</span>
//             </p>
//           </div>
//         </div>

//         {isEdit ? (
//           <button
//             onClick={() => window.dispatchEvent(new Event("save-employee"))}
//             className="bg-[var(--accent)] px-5 py-2 rounded-lg flex items-center space-x-2 hover:bg-[var(--accent-hover)] transition"
//           >
//             <Image src={assets.icons.save} alt="Save" width={16} height={16} />
//             <span className="text-[var(--button-text)]">Save</span>
//           </button>
//         ) : (
//           <button
//             className="bg-[var(--accent)] px-5 py-2 rounded-lg flex items-center space-x-2 hover:bg-[var(--accent-hover)] transition"
//             onClick={() => (window.location.href = `/employees/${id}/edit`)}
//           >
//             <Image src={assets.icons.edit} alt="" width={16} height={16} />
//             <span className="text-[var(--button-text)]">Edit Profile</span>
//           </button>
//         )}
//       </div>

//       {/* Inner layout: sidebar + content */}
//       <div className="flex">
//         {/* Sidebar is rendered in all modes now */}
//         <nav className="w-1/4 bg-[var(--sidebar-bg)] p-2 ">
//           {navItems.map((item) => {
//             const active = pathname === item.href;
//             return (
//               <Link
//                 key={item.href}
//                 href={item.href}
//                 className={`flex items-center px-4 py-2 space-x-2 rounded-lg transition ${
//                   active
//                     ? "bg-[var(--accent)] text-[var(--button-text)]"
//                     : "text-[var(--link-color)] hover:bg-[var(--surface)]"
//                 }`}
//               >
//                 <Image
//                   src={item.icon}
//                   alt={item.label}
//                   width={16}
//                   height={16}
//                 />
//                 <span>{item.label}</span>
//               </Link>
//             );
//           })}
//         </nav>

//         {/* Main content area */}
//         <div className="flex-1">{children}</div>
//       </div>
//     </div>
//   );
// }

// src/app/(dashboard)/employees/[id]/layout.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { assets } from "@/constants/assets";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import {
  fetchEmployeeById,
  updateEmployee,
} from "@/store/slices/employeeSlice";

declare global {
  interface Window {
    cloudinary: any;
  }
}

export default function EmployeeDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { id: rawId } = useParams();
  const id = Array.isArray(rawId) ? rawId[0] : rawId!;
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  const isEdit = pathname.endsWith("/edit");
  const employee = useAppSelector((s) =>
    s.employees.employees.find((e) => e.id === id)
  );
  const status = useAppSelector((s) => s.employees.status);

  // Fetch employee if needed
  useEffect(() => {
    if (status === "idle") dispatch(fetchEmployeeById(id));
  }, [status, dispatch, id]);

  // Keep a local preview of the avatar
  const [preview, setPreview] = useState<string | undefined>(employee?.avatar);
  useEffect(() => {
    setPreview(employee?.avatar);
  }, [employee?.avatar]);

  // Set up Cloudinary widget once
  useEffect(() => {
    if (!isEdit || !window.cloudinary) return;

    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
        folder: "hr-management/avatars",
        cropping: true,
        croppingAspectRatio: 1,
        showCompletedButton: true,
        singleUploadAutoClose: false,
        uploadOnSelect: false, // ← do not auto-upload on file select
        showUploadMoreButton: false,
        multiple: false,
      },
      (error: any, result: any) => {
        if (error) {
          console.error("Cloudinary Widget Error:", error);
          return;
        }
        if (result.event === "success") {
          // user clicked "Upload" then "Done"
          setPreview(result.info.secure_url);
        }
      }
    );

    const open = () => widget.open();
    window.addEventListener("avatar-edit", open);
    return () => window.removeEventListener("avatar-edit", open);
  }, [isEdit]);

  if (!employee) return <p className="p-6">Loading…</p>;

  const base = `/employees/${id}`;
  const navItems = [
    { label: "Profile", href: base, icon: assets.icons.user },
    {
      label: "Attendance",
      href: `${base}/attendance`,
      icon: assets.icons.calendar,
    },
    { label: "Projects", href: `${base}/projects`, icon: assets.icons.project },
    { label: "Leave", href: `${base}/leave`, icon: assets.icons.leaves },
  ];

  return (
    <div className="border border-[var(--border)] rounded-lg">
      {/* Top */}
      <div className="flex items-center justify-between bg-[var(--container-bg)] p-4 border-b border-[var(--border)]">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Image
              key={preview}
              src={preview || "/assets/icons/default-avatar.png"}
              alt="Avatar"
              width={96}
              height={96}
              unoptimized
              className="rounded-lg object-cover w-24 h-24"
            />
            {isEdit && (
              <button
                onClick={() => window.dispatchEvent(new Event("avatar-edit"))}
                className="absolute bottom-0 right-0 p-1 rounded-full hover:bg-[var(--accent-hover)] transition"
                title="Change avatar"
              >
                <Image
                  src={assets.icons.editAvatar}
                  alt="Edit Avatar"
                  width={16}
                  height={16}
                />
              </button>
            )}
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-[var(--text-primary)]">
              {employee.name}
            </h1>
            <p className="flex items-center text-[var(--text-secondary)] space-x-2">
              <Image
                src={assets.icons.briefcase}
                alt=""
                width={16}
                height={16}
              />
              <span>{employee.designation}</span>
            </p>
            <p className="flex items-center text-[var(--text-secondary)] space-x-2">
              <Image src={assets.icons.mail} alt="" width={16} height={16} />
              <span>{employee.personalInfo.email}</span>
            </p>
          </div>
        </div>

        {isEdit ? (
          <button
            onClick={async () => {
              // Persist avatar change if any
              if (preview !== employee.avatar) {
                await dispatch(
                  updateEmployee({
                    id,
                    data: { employee: { avatar: preview } },
                  })
                );
              }
              window.dispatchEvent(new Event("save-employee"));
            }}
            className="bg-[var(--accent)] px-5 py-2 rounded-lg flex items-center space-x-2 hover:bg-[var(--accent-hover)] transition"
          >
            <Image src={assets.icons.save} alt="Save" width={16} height={16} />
            <span className="text-[var(--button-text)]">Save</span>
          </button>
        ) : (
          <button
            onClick={() => (window.location.href = `/employees/${id}/edit`)}
            className="bg-[var(--accent)] px-5 py-2 rounded-lg flex items-center space-x-2 hover:bg-[var(--accent-hover)] transition"
          >
            <Image src={assets.icons.edit} alt="Edit" width={16} height={16} />
            <span className="text-[var(--button-text)]">Edit Profile</span>
          </button>
        )}
      </div>

      {/* Sidebar + Content */}
      <div className="flex">
        <nav className="w-1/4 bg-[var(--sidebar-bg)] p-4 space-y-2">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center px-4 py-2 space-x-2 rounded-lg transition ${
                  active
                    ? "bg-[var(--accent)] text-[var(--button-text)]"
                    : "text-[var(--link-color)] hover:bg-[var(--surface)]"
                }`}
              >
                <Image src={item.icon} alt="" width={16} height={16} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
