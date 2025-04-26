"use client";

import { useState } from "react";

const departments = ["Engineering", "Marketing", "HR", "Sales"];
const designations = ["Manager", "Developer", "Analyst", "Intern"];
const types = ["Office", "Remote"];
const statuses = ["Permanent", "Contractual"];
const genders = ["Male", "Female", "Other"];
const maritalStatuses = ["Single", "Married", "Divorced"];

export default function EmployeeForm({
  initialData = {},
  onSubmit,
}: {
  initialData?: any;
  onSubmit: (data: any) => Promise<void>;
}) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    // Step 1
    name: initialData.name || "",
    employeeId: initialData.employeeId || "",
    department: initialData.department || "",
    designation: initialData.designation || "",
    type: initialData.type || types[0],
    status: initialData.status || statuses[0],
    avatar: initialData.avatar || "",

    // Step 2
    email: initialData.personalInfo?.email || "",
    phone: initialData.personalInfo?.phone || "",
    dob: initialData.personalInfo?.dob || "",
    maritalStatus: initialData.personalInfo?.maritalStatus || "",
    gender: initialData.personalInfo?.gender || "",
    nationality: initialData.personalInfo?.nationality || "",
    address: initialData.personalInfo?.address || "",
    city: initialData.personalInfo?.city || "",
    state: initialData.personalInfo?.state || "",
    zipCode: initialData.personalInfo?.zipCode || "",

    // Step 3
    username: initialData.professional?.username || "",
    joiningDate: initialData.professional?.joiningDate || "",
    workingDays: initialData.professional?.workingDays || "",
    officeLocation: initialData.professional?.officeLocation || "",

    // Step 4
    slackId: initialData.accounts?.slackId || "",
    skypeId: initialData.accounts?.skypeId || "",
    githubId: initialData.accounts?.githubId || "",
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const payload = {
      employee: {
        name: form.name,
        employeeId: form.employeeId,
        department: form.department,
        designation: form.designation,
        type: form.type,
        status: form.status,
        avatar: form.avatar,
      },
      personalInfo: {
        email: form.email,
        phone: form.phone,
        dob: form.dob,
        maritalStatus: form.maritalStatus,
        gender: form.gender,
        nationality: form.nationality,
        address: form.address,
        city: form.city,
        state: form.state,
        zipCode: form.zipCode,
      },
      professionalInfo: {
        username: form.username,
        joiningDate: form.joiningDate,
        workingDays: form.workingDays,
        officeLocation: form.officeLocation,
      },
      documents: {
        appointmentLetter: "",
        salarySlip: "",
        relievingLetter: "",
        experienceLetter: "",
      },
      accountLinks: {
        email: form.email,
        slackId: form.slackId,
        skypeId: form.skypeId,
        githubId: form.githubId,
      },
    };

    await onSubmit(payload);
    setSubmitting(false);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Stepper */}
      <div className="flex justify-between mb-6">
        {[
          "Employee Info",
          "Personal Info",
          "Professional Info",
          "Accounts",
        ].map((label, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full ${
                step === index + 1
                  ? "bg-orange-500 text-white"
                  : "bg-gray-300 text-black"
              }`}
            >
              {index + 1}
            </div>
            <div className="text-xs mt-1">{label}</div>
          </div>
        ))}
      </div>

      <form
        onSubmit={
          step === 4
            ? handleFinalSubmit
            : (e) => {
                e.preventDefault();
                nextStep();
              }
        }
        className="space-y-4"
      >
        {step === 1 && (
          <>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="input"
            />
            <input
              name="employeeId"
              value={form.employeeId}
              onChange={handleChange}
              placeholder="Employee ID"
              className="input"
            />
            <select
              name="department"
              value={form.department}
              onChange={handleChange}
              className="input"
            >
              <option value="">Select Department</option>
              {departments.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
            <select
              name="designation"
              value={form.designation}
              onChange={handleChange}
              className="input"
            >
              <option value="">Select Designation</option>
              {designations.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="input"
            >
              {types.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="input"
            >
              {statuses.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </>
        )}

        {step === 2 && (
          <>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="input"
            />
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="input"
            />
            <input
              name="dob"
              type="date"
              value={form.dob}
              onChange={handleChange}
              className="input"
            />
            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Address"
              className="input"
            />
            <input
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="City"
              className="input"
            />
            <input
              name="state"
              value={form.state}
              onChange={handleChange}
              placeholder="State"
              className="input"
            />
            <input
              name="zipCode"
              value={form.zipCode}
              onChange={handleChange}
              placeholder="Zip Code"
              className="input"
            />
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="input"
            >
              <option value="">Select Gender</option>
              {genders.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
            <select
              name="maritalStatus"
              value={form.maritalStatus}
              onChange={handleChange}
              className="input"
            >
              <option value="">Select Marital Status</option>
              {maritalStatuses.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </>
        )}

        {step === 3 && (
          <>
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Username"
              className="input"
            />
            <input
              name="joiningDate"
              type="date"
              value={form.joiningDate}
              onChange={handleChange}
              className="input"
            />
            <input
              name="workingDays"
              value={form.workingDays}
              onChange={handleChange}
              placeholder="Working Days"
              className="input"
            />
            <input
              name="officeLocation"
              value={form.officeLocation}
              onChange={handleChange}
              placeholder="Office Location"
              className="input"
            />
          </>
        )}

        {step === 4 && (
          <>
            <input
              name="slackId"
              value={form.slackId}
              onChange={handleChange}
              placeholder="Slack ID"
              className="input"
            />
            <input
              name="skypeId"
              value={form.skypeId}
              onChange={handleChange}
              placeholder="Skype ID"
              className="input"
            />
            <input
              name="githubId"
              value={form.githubId}
              onChange={handleChange}
              placeholder="GitHub ID"
              className="input"
            />
          </>
        )}

        <div className="flex justify-between pt-4">
          {step > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="bg-gray-500 px-4 py-2 rounded text-white"
            >
              Back
            </button>
          )}
          <button
            type="submit"
            className="bg-orange-500 px-4 py-2 rounded text-white"
            disabled={submitting}
          >
            {step === 4 ? (submitting ? "Submitting..." : "Submit") : "Next"}
          </button>
        </div>
      </form>
    </div>
  );
}
