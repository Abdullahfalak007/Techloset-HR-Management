// src/app/attendance/mark/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import EmployeeAttendanceTable from "@/components/attendance/EmployeeAttendanceTable";
import MarkAttendanceModal from "@/components/attendance/MarkAttendanceModal";

type Employee = {
  id: string;
  name: string;
  avatar?: string;
  employeeId: string;
  department: string;
  designation: string;
  type: string;
  status: string;
};

export default function MarkAttendancePage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  const [selected, setSelected] = useState<Employee | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/employees")
      .then((r) => r.json())
      .then((d) => {
        setEmployees(d);
        setLoading(false);
      });
  }, []);

  const open = (e: Employee) => {
    setSelected(e);
    setModalOpen(true);
  };
  const close = () => {
    setSelected(null);
    setModalOpen(false);
  };

  const onSubmit = async (payload: any) => {
    await fetch("/api/attendance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    close();
    router.refresh(); // re-fetch overview or keep listing page fresh
  };

  if (loading) return <p className="p-6">Loading…</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Employee Attendance</h1>
      <EmployeeAttendanceTable employees={employees} onMark={open} />
      {modalOpen && selected && (
        <MarkAttendanceModal
          employee={selected}
          onClose={close}
          onSubmit={onSubmit}
        />
      )}
    </div>
  );
}
