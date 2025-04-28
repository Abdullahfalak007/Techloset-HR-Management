"use client";

import { useState } from "react";
import Image from "next/image";
import StepPersonalInfo from "./StepPersonalInfo";
import StepProfessionalInfo from "./StepProfessionalInfo";
import StepDocuments from "./StepDocuments";
import StepAccountAccess from "./StepAccountAccess";
import { assets } from "@/constants/assets";

const TABS = [
  {
    id: 1,
    label: "Personal Information",
    // Make sure you have this in assets.icons:
    icon: assets.icons.user,
  },
  {
    id: 2,
    label: "Professional Information",
    icon: assets.icons.briefcase,
  },
  {
    id: 3,
    label: "Documents",
    icon: assets.icons.document,
  },
  {
    id: 4,
    label: "Account Access",
    icon: assets.icons.lock,
  },
];

export default function EmployeeForm({
  initialData,
  onSubmit,
}: {
  initialData?: any;
  onSubmit: (payload: any) => Promise<any>;
}) {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    employee: { avatar: initialData?.avatar ?? "" },
    personalInfo: {
      firstName: initialData?.personalInfo?.firstName ?? "",
      lastName: initialData?.personalInfo?.lastName ?? "",
      email: initialData?.personalInfo?.email ?? "",
      phone: initialData?.personalInfo?.phone ?? "",
      dob: initialData?.personalInfo?.dob ?? "",
      gender: initialData?.personalInfo?.gender ?? "",
      nationality: initialData?.personalInfo?.nationality ?? "",
      maritalStatus: initialData?.personalInfo?.maritalStatus ?? "",
      address: initialData?.personalInfo?.address ?? "",
      city: initialData?.personalInfo?.city ?? "",
      state: initialData?.personalInfo?.state ?? "",
      zipCode: initialData?.personalInfo?.zipCode ?? "",
    },
    professionalInfo: {
      employeeType: initialData?.type ?? "Office",
      employeeId: initialData?.employeeId ?? "",
      username: initialData?.professional?.username ?? "",
      joiningDate: initialData?.professional?.joiningDate ?? "",
      workingDays: initialData?.professional?.workingDays ?? "",
      officeLocation: initialData?.professional?.officeLocation ?? "",
      department: initialData?.department ?? "",
      designation: initialData?.designation ?? "",
      status: initialData?.status ?? "Permanent",
    },
    documents: {
      appointmentLetter: initialData?.documents?.appointmentLetter ?? null,
      salarySlip: initialData?.documents?.salarySlip ?? null,
      relievingLetter: initialData?.documents?.relievingLetter ?? null,
      experienceLetter: initialData?.documents?.experienceLetter ?? null,
    },
    accountLinks: {
      email: initialData?.accounts?.email ?? "",
      slackId: initialData?.accounts?.slackId ?? "",
      skypeId: initialData?.accounts?.skypeId ?? "",
      githubId: initialData?.accounts?.githubId ?? "",
    },
  });

  const updateSection = (section: keyof typeof form, data: Partial<any>) =>
    setForm((prev) => ({
      ...prev,
      [section]: { ...prev[section], ...data },
    }));

  const next = () => setStep((s) => Math.min(s + 1, 4));
  const back = () => setStep((s) => Math.max(s - 1, 1));

  const submitAll = async () => {
    setSubmitting(true);

    const fullName =
      form.personalInfo.firstName.trim() +
      " " +
      form.personalInfo.lastName.trim();

    const personal = {
      email: form.personalInfo.email,
      phone: form.personalInfo.phone,
      dob: form.personalInfo.dob,
      gender: form.personalInfo.gender,
      nationality: form.personalInfo.nationality,
      maritalStatus: form.personalInfo.maritalStatus,
      address: form.personalInfo.address,
      city: form.personalInfo.city,
      state: form.personalInfo.state,
      zipCode: form.personalInfo.zipCode,
    };

    const professional = {
      username: form.professionalInfo.username,
      joiningDate: form.professionalInfo.joiningDate,
      workingDays: form.professionalInfo.workingDays,
      officeLocation: form.professionalInfo.officeLocation,
    };

    const employeePayload = {
      name: fullName,
      employeeId: form.professionalInfo.employeeId,
      department: form.professionalInfo.department,
      designation: form.professionalInfo.designation,
      type: form.professionalInfo.employeeType,
      status: form.professionalInfo.status,
      avatar: form.employee.avatar,
    };

    await onSubmit({
      employee: employeePayload,
      personalInfo: personal,
      professionalInfo: professional,
      documents: form.documents,
      accountLinks: form.accountLinks,
    });

    setSubmitting(false);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <StepPersonalInfo
            data={form.personalInfo}
            onChange={(d) => updateSection("personalInfo", d)}
            onNext={next}
          />
        );
      case 2:
        return (
          <StepProfessionalInfo
            data={form.professionalInfo}
            onChange={(d) => updateSection("professionalInfo", d)}
            onBack={back}
            onNext={next}
          />
        );
      case 3:
        return (
          <StepDocuments
            data={form.documents}
            onChange={(d) => updateSection("documents", d)}
            onBack={back}
            onNext={next}
          />
        );
      case 4:
        return (
          <StepAccountAccess
            data={form.accountLinks}
            onChange={(d) => updateSection("accountLinks", d)}
            onBack={back}
            onSubmit={submitAll}
            submitting={submitting}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-[#1A1A1A] p-6 rounded-lg space-y-6">
      <ul className="flex border-b border-gray-700">
        {TABS.map((tab) => (
          <li
            key={tab.id}
            onClick={() => setStep(tab.id)}
            className={`
              cursor-pointer px-4 py-2 -mb-px flex items-center select-none
              ${
                step === tab.id
                  ? "text-orange-500 border-b-2 border-orange-500"
                  : "text-gray-400 hover:text-gray-200"
              }
            `}
          >
            <Image
              src={tab.icon}
              alt=""
              width={16}
              height={16}
              className="mr-2"
            />
            {tab.label}
          </li>
        ))}
      </ul>

      <div>{renderStep()}</div>
    </div>
  );
}
