// src/app/(dashboard)/attendance/mark/page.tsx
"use client";

import EmployeeAttendanceTable from "@/components/attendance/EmployeeAttendanceTable";
import MarkAttendanceModal from "@/components/attendance/MarkAttendanceModal";
import { useMarkAttendance } from "./useMarkAttendance";

export default function MarkAttendancePage() {
  const { employees, loading, selected, modalOpen, open, close, onSubmit } =
    useMarkAttendance();

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
