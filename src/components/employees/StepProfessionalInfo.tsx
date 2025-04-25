type Props = {
  data: any;
  onChange: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
};

export default function StepProfessionalInfo({
  data,
  onChange,
  onNext,
  onBack,
}: Props) {
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    onChange({ [name]: value });
  };

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
        <input
          name="department"
          placeholder="Department"
          value={data.department}
          onChange={handleChange}
          className="input"
        />
        <input
          name="designation"
          placeholder="Designation"
          value={data.designation}
          onChange={handleChange}
          className="input"
        />
        <input
          name="workingDays"
          placeholder="Working Days"
          value={data.workingDays}
          onChange={handleChange}
          className="input"
        />
        <input
          name="joiningDate"
          type="date"
          value={data.joiningDate}
          onChange={handleChange}
          className="input"
        />
        <input
          name="officeLocation"
          placeholder="Office Location"
          value={data.officeLocation}
          onChange={handleChange}
          className="input"
        />
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
