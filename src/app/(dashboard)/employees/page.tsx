"use client";

import EmployeeHeader from "@/components/employees/EmployeeHeader";
import EmployeeTable from "@/components/employees/EmployeeTable";
import { useEmployeesList } from "./useEmployeesList";

export default function EmployeesPage() {
  const { session, loading, filtered, isAdmin, refresh } = useEmployeesList();

  if (loading) return <p className="p-6">Loading…</p>;
  if (!session) return <p className="p-6">Unauthorized</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <EmployeeHeader isAdmin={isAdmin} />
      </div>
      <EmployeeTable
        employees={filtered}
        onDeleteSuccess={refresh}
        isAdmin={isAdmin}
      />
    </div>
  );
}
