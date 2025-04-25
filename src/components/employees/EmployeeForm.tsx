// "use client";
// import { useState } from "react";

// export default function EmployeeForm({
//   initialData = {},
//   onSubmit,
// }: {
//   initialData?: any;
//   onSubmit: (data: any) => void;
// }) {
//   const [form, setForm] = useState({
//     name: initialData.name || "",
//     employeeId: initialData.employeeId || "",
//     department: initialData.department || "",
//     designation: initialData.designation || "",
//     type: initialData.type || "Office",
//     status: initialData.status || "Permanent",
//     avatar: initialData.avatar || "",
//   });

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   return (
//     <form
//       onSubmit={(e) => {
//         e.preventDefault();
//         onSubmit(form);
//       }}
//       className="space-y-4 max-w-xl"
//     >
//       <input
//         name="name"
//         value={form.name}
//         onChange={handleChange}
//         placeholder="Name"
//         className="input"
//       />
//       <input
//         name="employeeId"
//         value={form.employeeId}
//         onChange={handleChange}
//         placeholder="Employee ID"
//         className="input"
//       />
//       <input
//         name="department"
//         value={form.department}
//         onChange={handleChange}
//         placeholder="Department"
//         className="input"
//       />
//       <input
//         name="designation"
//         value={form.designation}
//         onChange={handleChange}
//         placeholder="Designation"
//         className="input"
//       />
//       <select
//         name="type"
//         value={form.type}
//         onChange={handleChange}
//         className="input"
//       >
//         <option value="Office">Office</option>
//         <option value="Remote">Remote</option>
//       </select>
//       <select
//         name="status"
//         value={form.status}
//         onChange={handleChange}
//         className="input"
//       >
//         <option value="Permanent">Permanent</option>
//         <option value="Contractual">Contractual</option>
//       </select>
//       <input
//         name="avatar"
//         value={form.avatar}
//         onChange={handleChange}
//         placeholder="Avatar URL"
//         className="input"
//       />

//       <button
//         className="bg-orange-500 px-4 py-2 rounded text-white"
//         type="submit"
//       >
//         Save
//       </button>
//     </form>
//   );
// }

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
  onSubmit: (data: any) => void;
}) {
  const [form, setForm] = useState({
    name: initialData.name || "",
    employeeId: initialData.employeeId || "",
    department: initialData.department || "",
    designation: initialData.designation || "",
    type: initialData.type || "Office",
    status: initialData.status || "Permanent",
    gender: initialData.gender || "",
    maritalStatus: initialData.maritalStatus || "",
    avatar: initialData.avatar || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(form);
      }}
      className="space-y-4 max-w-xl"
    >
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

      <input
        name="avatar"
        value={form.avatar}
        onChange={handleChange}
        placeholder="Avatar URL"
        className="input"
      />

      <button
        className="bg-orange-500 px-4 py-2 rounded text-white"
        type="submit"
      >
        Save
      </button>
    </form>
  );
}
