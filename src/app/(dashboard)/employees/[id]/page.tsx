"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { assets } from "@/constants/assets";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import { fetchEmployeeById } from "@/store/slices/employeeSlice";
import { format } from "date-fns";

export default function EmployeeProfilePage() {
  // normalize id to string
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
  }, [status]);

  if (!employee) return <p className="p-6">Loading employee…</p>;

  // explicit typing so Object.entries knows each URL is a string or undefined
  const docs = employee.documents as Record<string, string | undefined>;

  return (
    <div className="space-y-6 p-6">
      {/* Top summary */}
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
          onClick={() => router.push(`/employees/${id}/edit`)}
        >
          <Image src={assets.icons.edit} alt="" width={16} height={16} />
          <span>Edit Profile</span>
        </button>
      </div>

      {/* Tab strip */}
      <ul className="flex border-b border-gray-700">
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
                ? "text-orange-500 border-b-2 border-orange-500"
                : "text-gray-400 hover:text-gray-200"
            }`}
          >
            <Image src={t.icon} alt="" width={16} height={16} />
            <span>{t.label}</span>
          </li>
        ))}
      </ul>

      {/* Content panel */}
      <div className="bg-[#1A1A1A] rounded-lg p-6 space-y-6">
        {tab === 1 && (
          <div className="grid grid-cols-2 gap-6 text-gray-300">
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
                <p className="text-white">{value}</p>
              </div>
            ))}
          </div>
        )}

        {tab === 2 && (
          <div className="grid grid-cols-2 gap-6 text-gray-300">
            {[
              ["Employee ID", employee.employeeId],
              ["Username", employee.professionalInfo.username],
              ["Type", employee.type],
              ["Department", employee.department],
              ["Designation", employee.designation],
              ["Working Days", employee.professionalInfo.workingDays],
              ["Joining Date", employee.professionalInfo.joiningDate],
              ["Office Location", employee.professionalInfo.officeLocation],
              ["Status", employee.status],
            ].map(([label, value]) => (
              <div key={label} className="space-y-1">
                <p className="text-sm">{label}</p>
                <p className="text-white">{value}</p>
              </div>
            ))}
          </div>
        )}

        {tab === 3 && (
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(docs).map(([key, url]) =>
              url ? (
                <div
                  key={key}
                  className="flex items-center justify-between bg-[#111] rounded-lg px-4 py-3"
                >
                  <span className="text-gray-200">
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
              ) : null
            )}
          </div>
        )}

        {tab === 4 && (
          <div className="grid grid-cols-2 gap-6 text-gray-300">
            {[
              ["Email Address", employee.accountLinks.email],
              ["Slack ID", employee.accountLinks.slackId],
              ["Skype ID", employee.accountLinks.skypeId],
              ["Github ID", employee.accountLinks.githubId],
            ].map(([label, value]) => (
              <div key={label} className="space-y-1">
                <p className="text-sm">{label}</p>
                <p className="text-white">{value}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
