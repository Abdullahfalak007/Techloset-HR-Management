"use client";

import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/hooks/useStore";
import { createEmployee } from "@/store/slices/employeeSlice";
import EmployeeForm from "@/components/employees/EmployeeForm";

export default function AddEmployeePage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  async function handleCreate(data: any) {
    await dispatch(createEmployee(data));
    router.push("/employees");
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-6 font-bold">Add New Employee</h1>
      <EmployeeForm onSubmit={handleCreate} />
    </div>
  );
}
