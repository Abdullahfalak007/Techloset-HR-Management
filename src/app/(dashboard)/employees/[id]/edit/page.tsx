"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAppDispatch } from "@/hooks/useStore";
import { updateEmployee } from "@/store/slices/employeeSlice";
import EmployeeForm from "@/components/employees/EmployeeForm";

export default function EditEmployeePage() {
  const [employee, setEmployee] = useState(null);
  const router = useRouter();
  const params = useParams();
  const dispatch = useAppDispatch();
  const id = params.id as string;

  useEffect(() => {
    if (!id) return;
    fetch(`/api/employees/${id}`)
      .then((res) => res.json())
      .then(setEmployee);
  }, [id]);

  async function handleUpdate(data: any) {
    if (!id) return;
    await dispatch(updateEmployee({ id, data }));
    router.push("/employees");
  }

  if (!employee) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-6 font-bold">Edit Employee</h1>
      <EmployeeForm initialData={employee} onSubmit={handleUpdate} />
    </div>
  );
}
