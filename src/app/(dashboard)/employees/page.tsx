// src/app/employees/page.tsx
"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import EmployeeTable from "../../../components/employees/EmployeeTable";
import EmployeeHeader from "../../../components/employees/EmployeeHeader";

export default function EmployeesPage() {
  const { data: session, status } = useSession();
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    async function fetchEmployees() {
      const res = await fetch("/api/employees");
      const data = await res.json();
      setEmployees(data);
    }

    fetchEmployees();
  }, []);

  if (status === "loading") return <p>Loading...</p>;
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
