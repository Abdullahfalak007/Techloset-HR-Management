"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { assets } from "@/constants/assets";

type Employee = {
  id: string;
  name: string;
  designation: string;
  email: string;
  avatar?: string;
  personalInfo: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    dob: string;
    maritalStatus: string;
    gender: string;
    nationality: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
  professional: {
    employeeId: string;
    username: string;
    employeeType: string;
    department: string;
    designation: string;
    workingDays: string;
    joiningDate: string;
    officeLocation: string;
    status: string;
  };
  documents: {
    appointmentLetter?: string;
    salarySlip?: string;
    relievingLetter?: string;
    experienceLetter?: string;
  };
  accounts: {
    email: string;
    slackId: string;
    skypeId: string;
    githubId: string;
  };
};

const TABS = [
  { id: 1, label: "Personal Information", icon: assets.icons.user },
  { id: 2, label: "Professional Information", icon: assets.icons.briefcase },
  { id: 3, label: "Documents", icon: assets.icons.document },
  { id: 4, label: "Account Access", icon: assets.icons.lock },
];

export default function EmployeeProfilePage() {
  const { id } = useParams();
  const router = useRouter();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [tab, setTab] = useState(1);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/employees/${id}`)
      .then((res) => res.json())
      .then((data) => setEmployee(data))
      .catch((err) => {
        console.error("Failed to load employee:", err);
        router.push("/employees");
      });
  }, [id, router]);

  if (!employee) return <p className="p-6">Loading employee…</p>;

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
              <span>{employee.email}</span>
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
        {TABS.map((t) => (
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
              ["Employee ID", employee.professional.employeeId],
              ["User Name", employee.professional.username],
              ["Employee Type", employee.professional.employeeType],
              ["Department", employee.professional.department],
              ["Designation", employee.professional.designation],
              ["Working Days", employee.professional.workingDays],
              ["Joining Date", employee.professional.joiningDate],
              ["Office Location", employee.professional.officeLocation],
              ["Status", employee.professional.status],
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
            {Object.entries(employee.documents).map(
              ([key, url]) =>
                url && (
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
                )
            )}
          </div>
        )}

        {tab === 4 && (
          <div className="grid grid-cols-2 gap-6 text-gray-300">
            {[
              ["Email Address", employee.accounts.email],
              ["Slack ID", employee.accounts.slackId],
              ["Skype ID", employee.accounts.skypeId],
              ["Github ID", employee.accounts.githubId],
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
