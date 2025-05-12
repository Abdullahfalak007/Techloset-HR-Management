// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import StepPersonalInfo from "./StepPersonalInfo";
// import StepProfessionalInfo from "./StepProfessionalInfo";
// import StepDocuments from "./StepDocuments";
// import StepAccountAccess from "./StepAccountAccess";
// import { assets } from "@/constants/assets";
// import { FormState } from "@/types/types";

// const TABS = [
//   { id: 1, label: "Personal Information", icon: assets.icons.user },
//   { id: 2, label: "Professional Information", icon: assets.icons.briefcase },
//   { id: 3, label: "Documents", icon: assets.icons.document },
//   { id: 4, label: "Account Access", icon: assets.icons.lock },
// ];

// export default function EmployeeForm({
//   initialData,
//   onSubmit,
// }: {
//   initialData?: any;
//   onSubmit: (payload: any) => Promise<any>;
// }) {
//   const [step, setStep] = useState(1);
//   const [submitting, setSubmitting] = useState(false);
//   const isEditing = Boolean(initialData);

//   const [form, setForm] = useState<FormState>({
//     employee: { avatar: initialData?.avatar ?? "" },
//     personalInfo: {
//       firstName: initialData?.personalInfo?.firstName ?? "",
//       lastName: initialData?.personalInfo?.lastName ?? "",
//       email: initialData?.personalInfo?.email ?? "",
//       phone: initialData?.personalInfo?.phone ?? "",
//       dob: initialData?.personalInfo?.dob ?? "",
//       gender: initialData?.personalInfo?.gender ?? "",
//       nationality: initialData?.personalInfo?.nationality ?? "",
//       maritalStatus: initialData?.personalInfo?.maritalStatus ?? "",
//       address: initialData?.personalInfo?.address ?? "",
//       city: initialData?.personalInfo?.city ?? "",
//       state: initialData?.personalInfo?.state ?? "",
//       zipCode: initialData?.personalInfo?.zipCode ?? "",
//     },
//     professionalInfo: {
//       employeeType: initialData?.type ?? "Office",
//       employeeId: initialData?.employeeId ?? "",
//       username: initialData?.professional?.username ?? "",
//       joiningDate: initialData?.professional?.joiningDate ?? "",
//       workingDays: initialData?.professional?.workingDays ?? "",
//       officeLocation: initialData?.professional?.officeLocation ?? "",
//       department: initialData?.department ?? "",
//       designation: initialData?.designation ?? "",
//       status: initialData?.status ?? "Permanent",
//     },
//     documents: {
//       appointmentLetter: initialData?.documents?.appointmentLetter ?? null,
//       salarySlip: initialData?.documents?.salarySlip ?? null,
//       relievingLetter: initialData?.documents?.relievingLetter ?? null,
//       experienceLetter: initialData?.documents?.experienceLetter ?? null,
//     },
//     accountLinks: {
//       email: initialData?.accounts?.email ?? "",
//       slackId: initialData?.accounts?.slackId ?? "",
//       skypeId: initialData?.accounts?.skypeId ?? "",
//       githubId: initialData?.accounts?.githubId ?? "",
//     },
//   });

//   function updateSection<K extends keyof FormState>(
//     section: K,
//     data: Partial<FormState[K]>
//   ) {
//     setForm((prev) => ({
//       ...prev,
//       [section]: { ...prev[section], ...data },
//     }));
//   }

//   function handleAvatarChange(url: string) {
//     setForm((prev) => ({
//       ...prev,
//       employee: { avatar: url },
//     }));
//   }

//   const next = () => setStep((s) => Math.min(s + 1, 4));
//   const back = () => setStep((s) => Math.max(s - 1, 1));

//   const submitAll = async () => {
//     setSubmitting(true);

//     // combine the two for the single Employee.name field
//     const fullName =
//       form.personalInfo.firstName.trim() +
//       " " +
//       form.personalInfo.lastName.trim();

//     // pull out the ten "real" embedded fields
//     const {
//       email,
//       phone,
//       dob,
//       maritalStatus,
//       gender,
//       nationality,
//       address,
//       city,
//       state,
//       zipCode,
//     } = form.personalInfo;

//     // If we're in "edit" mode, we must omit firstName/lastName entirely.
//     // If we're in "add" mode, we send the entire personalInfo so that
//     // your POST /api/employees validation still sees firstName/lastName.
//     const personalPayload = isEditing
//       ? {
//           email,
//           phone,
//           dob,
//           maritalStatus,
//           gender,
//           nationality,
//           address,
//           city,
//           state,
//           zipCode,
//         }
//       : form.personalInfo;

//     const payload = {
//       employee: {
//         name: fullName,
//         employeeId: form.professionalInfo.employeeId,
//         department: form.professionalInfo.department,
//         designation: form.professionalInfo.designation,
//         type: form.professionalInfo.employeeType,
//         status: form.professionalInfo.status,
//         avatar: form.employee.avatar,
//       },
//       personalInfo: personalPayload,
//       professionalInfo: {
//         username: form.professionalInfo.username,
//         joiningDate: form.professionalInfo.joiningDate,
//         workingDays: form.professionalInfo.workingDays,
//         officeLocation: form.professionalInfo.officeLocation,
//       },
//       documents: form.documents,
//       accountLinks: form.accountLinks,
//     };

//     await onSubmit(payload);
//     setSubmitting(false);
//   };

//   const renderStep = () => {
//     switch (step) {
//       case 1:
//         return (
//           <StepPersonalInfo
//             isEditing={isEditing}
//             data={form.personalInfo}
//             avatarUrl={form.employee.avatar}
//             onChange={(d) => updateSection("personalInfo", d)}
//             onAvatarChange={handleAvatarChange}
//             onNext={next}
//           />
//         );
//       case 2:
//         return (
//           <StepProfessionalInfo
//             isEditing={isEditing}
//             data={form.professionalInfo}
//             onChange={(d) => updateSection("professionalInfo", d)}
//             onBack={back}
//             onNext={next}
//           />
//         );
//       case 3:
//         return (
//           <StepDocuments
//             data={form.documents}
//             onChange={(d) => updateSection("documents", d)}
//             onBack={back}
//             onNext={next}
//           />
//         );
//       case 4:
//         return (
//           <StepAccountAccess
//             isEditing={isEditing}
//             data={form.accountLinks}
//             onChange={(d) => updateSection("accountLinks", d)}
//             onBack={back}
//             onSubmit={submitAll}
//             submitting={submitting}
//           />
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="bg-[var(--container-bg)] p-6 rounded-lg flex flex-col h-full space-y-6">
//       <ul className="flex border-b border-[var(--border)] flex-shrink-0">
//         {TABS.map((tab) => (
//           <li
//             key={tab.id}
//             onClick={() => setStep(tab.id)}
//             className={`cursor-pointer px-4 py-2 -mb-px flex items-center select-none ${
//               step === tab.id
//                 ? "text-[var(--accent)] border-b-2 border-[var(--accent)]"
//                 : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
//             }`}
//           >
//             <Image
//               src={tab.icon}
//               alt=""
//               width={16}
//               height={16}
//               className="mr-2"
//             />
//             {tab.label}
//           </li>
//         ))}
//       </ul>
//       <div className="flex-1 overflow-y-auto">{renderStep()}</div>
//     </div>
//   );
// }

// src/components/employees/EmployeeForm.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import StepPersonalInfo from "./StepPersonalInfo";
import StepProfessionalInfo from "./StepProfessionalInfo";
import StepDocuments from "./StepDocuments";
import StepAccountAccess from "./StepAccountAccess";
import { assets } from "@/constants/assets";
import { FormState } from "@/types/types";

const TABS = [
  { id: 1, label: "Personal Information", icon: assets.icons.user },
  { id: 2, label: "Professional Information", icon: assets.icons.briefcase },
  { id: 3, label: "Documents", icon: assets.icons.document },
  { id: 4, label: "Account Access", icon: assets.icons.lock },
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
  const isEditing = Boolean(initialData);

  // ─── Global “Save” handler in edit-mode ──────────────────
  useEffect(() => {
    function handleGlobalSave() {
      if (isEditing) {
        submitAll();
      }
    }
    window.addEventListener("save-employee", handleGlobalSave);
    return () => {
      window.removeEventListener("save-employee", handleGlobalSave);
    };
  }, [step, submitting, isEditing]);

  // ─── Form state ───────────────────────────────────────────
  const [form, setForm] = useState<FormState>({
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

  function updateSection<K extends keyof FormState>(
    section: K,
    data: Partial<FormState[K]>
  ) {
    setForm((prev) => ({
      ...prev,
      [section]: { ...prev[section], ...data },
    }));
  }

  function handleAvatarChange(url: string) {
    setForm((prev) => ({
      ...prev,
      employee: { avatar: url },
    }));
  }

  const next = () => setStep((s) => Math.min(s + 1, 4));
  const back = () => setStep((s) => Math.max(s - 1, 1));

  // ─── Submit all (shared by both Add & Edit) ─────────────
  const submitAll = async () => {
    setSubmitting(true);

    // Combine first + last into single name
    const fullName =
      form.personalInfo.firstName.trim() +
      " " +
      form.personalInfo.lastName.trim();

    // Extract the 10 “real” fields
    const {
      email,
      phone,
      dob,
      maritalStatus,
      gender,
      nationality,
      address,
      city,
      state,
      zipCode,
    } = form.personalInfo;

    // In edit-mode omit firstName/lastName (we only PATCH the embedded parts)
    const personalPayload = isEditing
      ? {
          email,
          phone,
          dob,
          maritalStatus,
          gender,
          nationality,
          address,
          city,
          state,
          zipCode,
        }
      : form.personalInfo;

    const payload = {
      employee: {
        name: fullName,
        employeeId: form.professionalInfo.employeeId,
        department: form.professionalInfo.department,
        designation: form.professionalInfo.designation,
        type: form.professionalInfo.employeeType,
        status: form.professionalInfo.status,
        avatar: form.employee.avatar,
      },
      personalInfo: personalPayload,
      professionalInfo: {
        username: form.professionalInfo.username,
        joiningDate: form.professionalInfo.joiningDate,
        workingDays: form.professionalInfo.workingDays,
        officeLocation: form.professionalInfo.officeLocation,
      },
      documents: form.documents,
      accountLinks: form.accountLinks,
    };

    await onSubmit(payload);
    setSubmitting(false);
  };

  // ─── Render the correct step ─────────────────────────────
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <StepPersonalInfo
            isEditing={isEditing}
            data={form.personalInfo}
            avatarUrl={form.employee.avatar}
            onChange={(d) => updateSection("personalInfo", d)}
            onAvatarChange={handleAvatarChange}
            onNext={next}
          />
        );
      case 2:
        return (
          <StepProfessionalInfo
            isEditing={isEditing}
            data={form.professionalInfo}
            onChange={(d) => updateSection("professionalInfo", d)}
            onBack={back}
            onNext={next}
          />
        );
      case 3:
        return (
          <StepDocuments
            isEditing={isEditing}
            data={form.documents}
            onChange={(d) => updateSection("documents", d)}
            onBack={back}
            onNext={next}
          />
        );
      case 4:
        return (
          <StepAccountAccess
            isEditing={isEditing}
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
    <div className="bg-[var(--container-bg)] rounded-lg flex flex-col h-full space-y-4">
      {/* Tab strip */}
      <ul className="flex border-b border-[var(--border)] flex-shrink-0 space-x-4">
        {TABS.map((tab) => (
          <li
            key={tab.id}
            onClick={() => setStep(tab.id)}
            className={`cursor-pointer -mb-px flex items-center select-none whitespace-nowrap flex-shrink-0 ${
              step === tab.id
                ? "text-[var(--accent)] border-b-2 border-[var(--accent)]"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
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

      {/* Step content */}
      <div className="flex-1 overflow-y-auto">{renderStep()}</div>
    </div>
  );
}
