// src/app/(dashboard)/employees/[id]/layout.tsx
"use client";

import { useState, useEffect } from "react";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { assets } from "@/constants/assets";

type EmployeeSummary = {
  id: string;
  name: string;
  designation: string;
  avatar?: string;
  personalInfo: { email: string };
};

export default function EmployeeDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { id } = useParams();
  const pathname = usePathname();
  const [employee, setEmployee] = useState<EmployeeSummary | null>(null);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/employees/${id}`)
      .then((r) => r.json())
      .then(setEmployee)
      .catch(console.error);
  }, [id]);

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
    //test // test commit 2
    <div className="space-y-6 p-6">
      {/* ─── Top summary ───────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between bg-[#1A1A1A] p-6 rounded-lg">
        <div className="flex items-center space-x-4">
          <Image
            src={employee.avatar || "/assets/icons/default-avatar.png"}
            alt="Avatar"
            width={72}
            height={72}
            className="rounded-lg object-cover"
          />
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-white">{employee.name}</h1>
            <p className="flex items-center text-gray-400 space-x-2">
              <Image
                src={assets.icons.briefcase}
                alt=""
                width={16}
                height={16}
              />
              <span>{employee.designation}</span>
            </p>
            <p className="flex items-center text-gray-400 space-x-2">
              <Image src={assets.icons.mail} alt="" width={16} height={16} />
              <span>{employee.personalInfo.email}</span>
            </p>
          </div>
        </div>
        <button
          className="bg-orange-500 px-5 py-2 rounded-lg flex items-center space-x-2 hover:bg-orange-600 transition"
          onClick={() => (window.location.href = `/employees/${id}/edit`)}
        >
          <Image src={assets.icons.edit} alt="" width={16} height={16} />
          <span>Edit Profile</span>
        </button>
      </div>

      {/* ─── Inner layout ──────────────────────────────────────────────────────── */}
      <div className="flex space-x-6">
        {/* Left sidebar */}
        <nav className="w-1/4 bg-[#1A1A1A] rounded-lg p-4 space-y-2">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center px-4 py-2 space-x-2 rounded-lg transition ${
                  active
                    ? "bg-orange-500 text-white"
                    : "text-gray-300 hover:bg-[#111]"
                }`}
              >
                <Image
                  src={item.icon}
                  alt={item.label}
                  width={16}
                  height={16}
                />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right panel (child route) */}
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
