"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import EmployeeHeader from "@/components/employees/EmployeeHeader";
import EmployeeTable from "@/components/employees/EmployeeTable";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import { fetchEmployees } from "@/store/slices/employeeSlice";

export default function EmployeesPage() {
  const { data: session, status: authStatus } = useSession();
  const dispatch = useAppDispatch();

  const status = useAppSelector((s) => s.employees.status);
  const loading = status === "loading";
  const employees = useAppSelector((s) => s.employees.employees);

  // read ?search=
  const searchParams = useSearchParams();
  const q = searchParams.get("search")?.toLowerCase() || "";

  // filter by name, ID, department, or designation
  const filtered = employees.filter((e) =>
    [e.name, e.employeeId, e.department, e.designation].some((field) =>
      field.toLowerCase().includes(q)
    )
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchEmployees());
    }
  }, [status, dispatch]);

  if (authStatus === "loading" || loading) {
    return <p className="p-6">Loading…</p>;
  }
  if (!session) {
    return <p className="p-6">Unauthorized</p>;
  }

  const isAdmin = session.user.role === "ADMIN";

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <EmployeeHeader isAdmin={isAdmin} />
      </div>
      <EmployeeTable
        employees={filtered}
        onDeleteSuccess={() => dispatch(fetchEmployees())}
        isAdmin={isAdmin}
      />
    </div>
  );
}
