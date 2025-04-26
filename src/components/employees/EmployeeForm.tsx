// src/components/employees/EmployeeForm.tsx
"use client";

import { useState } from "react";
import StepPersonalInfo from "./StepPersonalInfo";
import StepProfessionalInfo from "./StepProfessionalInfo";
import StepDocuments from "./StepDocuments";
import StepAccountAccess from "./StepAccountAccess";

export default function EmployeeForm({
  initialData,
  onSubmit,
}: {
  initialData?: any;
  onSubmit: (payload: {
    employee: any;
    personalInfo: any;
    professionalInfo: any;
    documents: any;
    accountLinks: any;
  }) => Promise<any>;
}) {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    // contains only avatar, type by default
    employee: {
      type: initialData?.type ?? "Office",
      avatar: initialData?.avatar ?? "",
    },
    personalInfo: {
      firstName: "",
      lastName: "",
      email: initialData?.personalInfo?.email ?? "",
      phone: initialData?.personalInfo?.phone ?? "",
      dob: initialData?.personalInfo?.dob ?? "",
      maritalStatus: initialData?.personalInfo?.maritalStatus ?? "",
      gender: initialData?.personalInfo?.gender ?? "",
      nationality: initialData?.personalInfo?.nationality ?? "",
      address: initialData?.personalInfo?.address ?? "",
      city: initialData?.personalInfo?.city ?? "",
      state: initialData?.personalInfo?.state ?? "",
      zipCode: initialData?.personalInfo?.zipCode ?? "",
    },
    professionalInfo: {
      // now holds both your PROF and EMP fields
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

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => s - 1);

  const submitAll = async () => {
    setSubmitting(true);

    // Build fullName
    const fullName =
      form.personalInfo.firstName.trim() +
      " " +
      form.personalInfo.lastName.trim();

    // Personal payload
    const personal = {
      email: form.personalInfo.email,
      phone: form.personalInfo.phone,
      dob: form.personalInfo.dob,
      maritalStatus: form.personalInfo.maritalStatus,
      gender: form.personalInfo.gender,
      nationality: form.personalInfo.nationality,
      address: form.personalInfo.address,
      city: form.personalInfo.city,
      state: form.personalInfo.state,
      zipCode: form.personalInfo.zipCode,
    };

    // Professional payload (only the embedded fields)
    const professional = {
      username: form.professionalInfo.username,
      joiningDate: form.professionalInfo.joiningDate,
      workingDays: form.professionalInfo.workingDays,
      officeLocation: form.professionalInfo.officeLocation,
    };

    // Now build your top-level employee object,
    // pulling in both the avatar/type and the fields saved under professionalInfo
    const employeePayload = {
      name: fullName,
      employeeId: form.professionalInfo.employeeId,
      department: form.professionalInfo.department,
      designation: form.professionalInfo.designation,
      type: form.employee.type,
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
}
