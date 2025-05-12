"use client";

import EmployeeForm from "@/components/employees/EmployeeForm";
import { useEditEmployee } from "./useEditEmployee";

export default function EditEmployeePage() {
  const { editable, handleUpdate } = useEditEmployee();

  if (!editable) {
    return <p className="p-6">Loading employee…</p>;
  }

  return (
    <div className="p-6">
      <EmployeeForm
        initialData={{
          employeeId: editable.employeeId,
          department: editable.department,
          designation: editable.designation,
          type: editable.type,
          status: editable.status,
          avatar: editable.avatar,
          name: editable.name,
          personalInfo: editable.personalInfo,
          professional: {
            username: editable.professionalInfo.username,
            joiningDate: editable.professionalInfo.joiningDate,
            workingDays: editable.professionalInfo.workingDays,
            officeLocation: editable.professionalInfo.officeLocation,
          },
          documents: editable.documents,
          accounts: editable.accountLinks,
        }}
        onSubmit={handleUpdate}
      />
    </div>
  );
}
