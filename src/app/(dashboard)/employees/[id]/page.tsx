// src/app/(dashboard)/employees/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { assets } from "@/constants/assets";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import { fetchEmployeeById } from "@/store/slices/employeeSlice";
import { format } from "date-fns";

export default function EmployeeProfilePage() {
  const { id: rawId } = useParams();
  const id = Array.isArray(rawId) ? rawId[0] : rawId!;
  const router = useRouter();
  const dispatch = useAppDispatch();

  const employee = useAppSelector((s) =>
    s.employees.employees.find((e) => e.id === id)
  );
  const status = useAppSelector((s) => s.employees.status);
  const [tab, setTab] = useState(1);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchEmployeeById(id));
    }
  }, [status, dispatch, id]);

  if (!employee) return <p className="p-6">Loading employee…</p>;

  const docs = employee.documents as Record<string, string | undefined>;

  return (
    <div className="space-y-6 p-6">
      {/* Top summary */}
      <div className="flex items-center justify-between bg-[var(--container-bg)] p-6 rounded-lg">
        <div className="flex items-center space-x-4">
          <Image
            src={employee.avatar || "/assets/icons/default-avatar.png"}
            alt="Avatar"
            width={72}
            height={72}
            className="rounded-lg object-cover"
          />
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

        <button
          className="bg-[var(--accent)] px-5 py-2 rounded-lg flex items-center space-x-2 hover:bg-[var(--accent-hover)] transition"
          onClick={() => router.push(`/employees/${id}/edit`)}
        >
          <Image src={assets.icons.edit} alt="" width={16} height={16} />
          <span className="text-[var(--button-text)]">Edit Profile Hiii</span>
        </button>
      </div>

      {/* Tab strip */}
      <ul className="flex border-b border-[var(--border)]">
        {[
          { id: 1, label: "Personal Information", icon: assets.icons.user },
          {
            id: 2,
            label: "Professional Information",
            icon: assets.icons.briefcase,
          },
          { id: 3, label: "Documents", icon: assets.icons.document },
          { id: 4, label: "Account Access", icon: assets.icons.lock },
        ].map((t) => (
          <li
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`cursor-pointer px-5 py-2 flex items-center space-x-2 select-none ${
              tab === t.id
                ? "text-[var(--accent)] border-b-2 border-[var(--accent)]"
                : "text-[var(--link-color)] hover:text-[var(--text-primary)]"
            }`}
          >
            <Image src={t.icon} alt="" width={16} height={16} />
            <span>{t.label}</span>
          </li>
        ))}
      </ul>

      {/* Content panel */}
      <div className="bg-[var(--container-bg)] rounded-lg p-6 space-y-6">
        {tab === 1 && (
          <div className="grid grid-cols-2 gap-6 text-[var(--text-secondary)]">
            {[
              ["First Name", employee.personalInfo.firstName],
              ["Last Name", employee.personalInfo.lastName],
              ["Mobile Number", employee.personalInfo.phone],
              ["Email Address", employee.personalInfo.email],
              ["Date of Birth", employee.personalInfo.dob],
              ["Marital Status", employee.personalInfo.maritalStatus],
              ["Gender", employee.personalInfo.gender],
              ["Nationality", employee.personalInfo.nationality],
              ["Address", employee.personalInfo.address],
              ["City", employee.personalInfo.city],
              ["State", employee.personalInfo.state],
              ["Zip Code", employee.personalInfo.zipCode],
            ].map(([label, value]) => (
              <div key={label} className="space-y-1">
                <p className="text-sm">{label}</p>
                <p className="text-[var(--text-primary)]">{value}</p>
              </div>
            ))}
          </div>
        )}
        {/* ... tabs 2, 3, 4 follow the same pattern ... */}
        {tab === 3 && (
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(docs).map(
              ([key, url]) =>
                url && (
                  <div
                    key={key}
                    className="flex items-center justify-between bg-[var(--surface)] rounded-lg px-4 py-3"
                  >
                    <span className="text-[var(--text-secondary)]">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </span>
                    <div className="flex space-x-3">
                      <button title="View">
                        <Image
                          src={assets.icons.view}
                          alt="View"
                          width={16}
                          height={16}
                        />
                      </button>
                      <button title="Download">
                        <Image
                          src={assets.icons.download}
                          alt="Download"
                          width={16}
                          height={16}
                        />
                      </button>
                    </div>
                  </div>
                )
            )}
          </div>
        )}
      </div>
    </div>
  );
}
