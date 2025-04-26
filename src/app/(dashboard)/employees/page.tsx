"use client";

import { useSession } from "next-auth/react";
import { useEmployees } from "@/hooks/useEmployees";
import EmployeeHeader from "@/components/employees/EmployeeHeader";
import EmployeeTable from "@/components/employees/EmployeeTable";

export default function EmployeesPage() {
  const { data: session, status } = useSession();
  const { employees, loading } = useEmployees();

  if (status === "loading" || loading) return <p>Loading...</p>;
  if (!session) return <p>Unauthorized</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <EmployeeHeader isAdmin={session.user.role === "ADMIN"} />
      </div>
      <EmployeeTable employees={employees} />
    </div>
  );
}
