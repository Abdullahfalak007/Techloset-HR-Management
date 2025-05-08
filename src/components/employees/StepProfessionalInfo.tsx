// "use client";
// import React from "react";

// type Props = {
//   data: any;
//   onChange: (d: any) => void;
//   onNext: () => void;
//   onBack: () => void;
// };

// const employeeTypes = ["Office", "Remote"];
// const workingDayOptions = [
//   "Monday to Saturday",
//   "Monday to Thursday",
//   "Flexible",
// ];
// const departments = [
//   "Engineering",
//   "Quality Assurance",
//   "DevOps",
//   "Product",
//   "Design",
//   "Marketing",
//   "Sales",
//   "Human Resources",
//   "Finance",
//   "Support",
// ];
// const designations = [
//   "Intern",
//   "Junior Developer",
//   "Software Engineer",
//   "Senior Software Engineer",
//   "QA Engineer",
//   "DevOps Engineer",
//   "Team Lead",
//   "Project Manager",
//   "Product Manager",
//   "Designer",
//   "HR Manager",
//   "Sales Executive",
// ];
// const statusOptions = ["Permanent", "Contractual"];
// const cities = [
//   "Karachi",
//   "Lahore",
//   "Islamabad",
//   "Rawalpindi",
//   "Faisalabad",
//   "Peshawar",
//   "Quetta",
//   "Multan",
//   "Sialkot",
//   "Gujranwala",
// ];

// export default function StepProfessionalInfo({
//   data,
//   onChange,
//   onNext,
//   onBack,
// }: Props) {
//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => onChange({ [e.target.name]: e.target.value });

//   return (
//     <div className="space-y-6">
//       <div className="grid grid-cols-2 gap-4">
//         <input
//           name="employeeId"
//           placeholder="Employee ID"
//           value={data.employeeId}
//           onChange={handleChange}
//           className="w-full bg-[#111] border border-gray-700 rounded px-4 py-2 placeholder-gray-500 text-gray-100 focus:border-orange-500 focus:ring-0"
//         />

//         <input
//           name="username"
//           placeholder="Username"
//           value={data.username}
//           onChange={handleChange}
//           className="w-full bg-[#111] border border-gray-700 rounded px-4 py-2 placeholder-gray-500 text-gray-100 focus:border-orange-500 focus:ring-0"
//         />

//         <select
//           name="employeeType"
//           value={data.employeeType}
//           onChange={handleChange}
//           className="w-full bg-[#111] border border-gray-700 rounded px-4 py-2 placeholder-gray-500 text-gray-100 focus:border-orange-500 focus:ring-0"
//         >
//           <option value="">Employee Type</option>
//           {employeeTypes.map((t) => (
//             <option key={t} value={t}>
//               {t}
//             </option>
//           ))}
//         </select>

//         <select
//           name="department"
//           value={data.department}
//           onChange={handleChange}
//           className="w-full bg-[#111] border border-gray-700 rounded px-4 py-2 placeholder-gray-500 text-gray-100 focus:border-orange-500 focus:ring-0"
//         >
//           <option value="">Select Department</option>
//           {departments.map((d) => (
//             <option key={d} value={d}>
//               {d}
//             </option>
//           ))}
//         </select>

//         <select
//           name="designation"
//           value={data.designation}
//           onChange={handleChange}
//           className="w-full bg-[#111] border border-gray-700 rounded px-4 py-2 placeholder-gray-500 text-gray-100 focus:border-orange-500 focus:ring-0"
//         >
//           <option value="">Designation</option>
//           {designations.map((d) => (
//             <option key={d} value={d}>
//               {d}
//             </option>
//           ))}
//         </select>

//         <select
//           name="workingDays"
//           value={data.workingDays}
//           onChange={handleChange}
//           className="w-full bg-[#111] border border-gray-700 rounded px-4 py-2 placeholder-gray-500 text-gray-100 focus:border-orange-500 focus:ring-0"
//         >
//           <option value="">Working Days</option>
//           {workingDayOptions.map((w) => (
//             <option key={w} value={w}>
//               {w}
//             </option>
//           ))}
//         </select>

//         <input
//           name="joiningDate"
//           type="date"
//           value={data.joiningDate}
//           onChange={handleChange}
//           className="w-full bg-[#111] border border-gray-700 rounded px-4 py-2 placeholder-gray-500 text-gray-100 focus:border-orange-500 focus:ring-0"
//         />

//         <select
//           name="officeLocation"
//           value={data.officeLocation}
//           onChange={handleChange}
//           className="w-full bg-[#111] border border-gray-700 rounded px-4 py-2 placeholder-gray-500 text-gray-100 focus:border-orange-500 focus:ring-0"
//         >
//           <option value="">Office Location</option>
//           {cities.map((c) => (
//             <option key={c} value={c}>
//               {c}
//             </option>
//           ))}
//         </select>

//         <select
//           name="status"
//           value={data.status}
//           onChange={handleChange}
//           className="w-full bg-[#111] border border-gray-700 rounded px-4 py-2 placeholder-gray-500 text-gray-100 focus:border-orange-500 focus:ring-0"
//         >
//           <option value="">Status</option>
//           {statusOptions.map((s) => (
//             <option key={s} value={s}>
//               {s}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div className="flex justify-between">
//         <button
//           onClick={onBack}
//           className="px-6 py-2 rounded border border-gray-600 text-gray-300 hover:border-gray-500"
//         >
//           Back
//         </button>
//         <button
//           onClick={onNext}
//           className="bg-orange-500 px-6 py-2 rounded text-white hover:bg-orange-600 transition"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }
"use client";
import React from "react";

type Props = {
  data: any;
  onChange: (d: any) => void;
  onNext: () => void;
  onBack: () => void;
};

const employeeTypes = ["Office", "Remote"];
const workingDayOptions = [
  "Monday to Saturday",
  "Monday to Thursday",
  "Flexible",
];
const departments = [
  "Engineering",
  "Quality Assurance",
  "DevOps",
  "Product",
  "Design",
  "Marketing",
  "Sales",
  "Human Resources",
  "Finance",
  "Support",
];
const designations = [
  "Intern",
  "Junior Developer",
  "Software Engineer",
  "Senior Software Engineer",
  "QA Engineer",
  "DevOps Engineer",
  "Team Lead",
  "Project Manager",
  "Product Manager",
  "Designer",
  "HR Manager",
  "Sales Executive",
];
const statusOptions = ["Permanent", "Contractual"];
const cities = [
  "Karachi",
  "Lahore",
  "Islamabad",
  "Rawalpindi",
  "Faisalabad",
  "Peshawar",
  "Quetta",
  "Multan",
  "Sialkot",
  "Gujranwala",
];

export default function StepProfessionalInfo({
  data,
  onChange,
  onNext,
  onBack,
}: Props) {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => onChange({ [e.target.name]: e.target.value });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        {[
          { name: "employeeId", placeholder: "Employee ID", type: "text" },
          { name: "username", placeholder: "Username", type: "text" },
        ]
          .concat(
            employeeTypes.map((t) => ({
              name: "employeeType",
              placeholder: "Employee Type",
              type: "select",
              options: employeeTypes,
            }))
          )
          // … build rest …
          .map((field: any) =>
            field.type === "select" ? (
              <select
                key={field.name}
                name={field.name}
                value={data[field.name]}
                onChange={handleChange}
                className="w-full bg-[var(--surface)] border border-[var(--border)] rounded px-4 py-2 placeholder-[var(--text-secondary)] text-[var(--text-primary)] focus:border-[var(--accent)] focus:ring-0"
              >
                <option value="">{field.placeholder}</option>
                {field.options.map((opt: string) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            ) : (
              <input
                key={field.name}
                name={field.name}
                type={field.type}
                placeholder={field.placeholder}
                value={data[field.name]}
                onChange={handleChange}
                className="w-full bg-[var(--surface)] border border-[var(--border)] rounded px-4 py-2 placeholder-[var(--text-secondary)] text-[var(--text-primary)] focus:border-[var(--accent)] focus:ring-0"
              />
            )
          )}
      </div>

      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="px-6 py-2 rounded border border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--text-primary)]"
        >
          Back
        </button>
        <button
          onClick={onNext}
          className="bg-[var(--accent)] px-6 py-2 rounded text-[var(--text-primary)] hover:bg-[var(--accent-hover)] transition"
        >
          Next
        </button>
      </div>
    </div>
  );
}
