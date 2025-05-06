// src/app/(dashboard)/employees/page.tsx
"use client";

import { useSession } from "next-auth/react";
import { useEmployees } from "@/hooks/useEmployees";
import EmployeeHeader from "@/components/employees/EmployeeHeader";
import EmployeeTable from "@/components/employees/EmployeeTable";

export default function EmployeesPage() {
  const { data: session, status } = useSession();
  const { employees, loading, refresh } = useEmployees();

  // 1) Show loading until auth+data are ready
  if (status === "loading" || loading) {
    return <p className="p-6">Loading…</p>;
  }
  // 2) If somehow not signed in, block
  if (!session) {
    return <p className="p-6">Unauthorized</p>;
  }

  // 3) Determine if this user is an admin
  const isAdmin = session.user.role === "ADMIN";

  // 4) Always render the table—no redirects here!
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <EmployeeHeader isAdmin={isAdmin} />
      </div>
      <EmployeeTable
        employees={employees}
        onDeleteSuccess={refresh}
        isAdmin={isAdmin}
      />
    </div>
  );
}
