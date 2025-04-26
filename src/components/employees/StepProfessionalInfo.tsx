// src/components/employees/StepProfessionalInfo.tsx
type Props = {
  data: any;
  onChange: (d: any) => void;
  onNext: () => void;
  onBack: () => void;
};

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
  const handleChange = (e: any) =>
    onChange({ [e.target.name]: e.target.value });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <input
          name="employeeId"
          placeholder="Employee ID"
          value={data.employeeId}
          onChange={handleChange}
          className="input"
        />

        <input
          name="username"
          placeholder="Username"
          value={data.username}
          onChange={handleChange}
          className="input"
        />

        <input
          name="employeeType"
          placeholder="Employee Type"
          value={data.employeeType}
          onChange={handleChange}
          className="input"
        />

        <select
          name="department"
          value={data.department}
          onChange={handleChange}
          className="input"
        >
          <option value="">Select Department</option>
          {departments.map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>

        <select
          name="designation"
          value={data.designation}
          onChange={handleChange}
          className="input"
        >
          <option value="">Designation</option>
          {designations.map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>

        <select
          name="workingDays"
          value={data.workingDays}
          onChange={handleChange}
          className="input"
        >
          <option value="">Working Days</option>
          {workingDayOptions.map((w) => (
            <option key={w}>{w}</option>
          ))}
        </select>

        <input
          name="joiningDate"
          type="date"
          value={data.joiningDate}
          onChange={handleChange}
          className="input"
        />

        {/* Office Location dropdown */}
        <select
          name="officeLocation"
          value={data.officeLocation}
          onChange={handleChange}
          className="input"
        >
          <option value="">Office Location</option>
          {cities.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        <select
          name="status"
          value={data.status}
          onChange={handleChange}
          className="input"
        >
          <option value="">Status</option>
          {statusOptions.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>

      <div className="flex justify-between">
        <button onClick={onBack} className="btn-secondary">
          Back
        </button>
        <button onClick={onNext} className="btn-primary">
          Next
        </button>
      </div>
    </div>
  );
}
