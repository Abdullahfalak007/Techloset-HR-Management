"use client";

import EmployeeForm from "@/components/employees/EmployeeForm";
import { useAddEmployee } from "./useAddEmployee";

export default function AddEmployeePage() {
  const { handleCreate } = useAddEmployee();

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-6 font-bold">Add New Employee</h1>
      <EmployeeForm onSubmit={handleCreate} />
    </div>
  );
}
