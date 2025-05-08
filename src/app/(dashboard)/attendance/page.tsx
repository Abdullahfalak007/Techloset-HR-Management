// "use client";

// import { useEffect } from "react";
// import { useSearchParams } from "next/navigation";
// import AttendanceTable from "@/components/attendance/AttendanceTable";
// import { format } from "date-fns";
// import Link from "next/link";
// import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
// import { fetchAttendanceRecords } from "@/store/slices/attendanceSlice";

// export default function AttendanceOverviewPage() {
//   const dispatch = useAppDispatch();
//   const data = useAppSelector((s) => s.attendance.records);
//   const status = useAppSelector((s) => s.attendance.status);
//   const loading = status === "loading";

//   // read ?search=
//   const searchParams = useSearchParams();
//   const q = searchParams.get("search")?.toLowerCase() || "";

//   // filter by employee name, designation or type
//   const filtered = data.filter((r) =>
//     [r.employee.name, r.employee.designation, r.employee.type].some((field) =>
//       field.toLowerCase().includes(q)
//     )
//   );

//   useEffect(() => {
//     if (status === "idle") {
//       dispatch(fetchAttendanceRecords());
//     }
//   }, [status, dispatch]);

//   if (loading) return <p className="p-6">Loading…</p>;

//   return (
//     <div className="p-6 space-y-6">
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-bold">Attendance</h1>
//         <Link
//           href="/attendance/mark"
//           className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded"
//         >
//           Mark Attendance
//         </Link>
//       </div>
//       <AttendanceTable
//         records={filtered.map((r) => ({
//           ...r,
//           checkIn: format(new Date(r.checkIn), "MMM d, yyyy"),
//           checkOut: format(new Date(r.checkOut), "MMM d, yyyy"),
//         }))}
//       />
//     </div>
//   );
// }

// src/app/(dashboard)/attendance/page.tsx
"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import AttendanceTable from "@/components/attendance/AttendanceTable";
import { format } from "date-fns";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import { fetchAttendanceRecords } from "@/store/slices/attendanceSlice";

export default function AttendanceOverviewPage() {
  const dispatch = useAppDispatch();
  const data = useAppSelector((s) => s.attendance.records);
  const status = useAppSelector((s) => s.attendance.status);
  const loading = status === "loading";

  const searchParams = useSearchParams();
  const q = searchParams.get("search")?.toLowerCase() || "";

  const filtered = data.filter((r) =>
    [r.employee.name, r.employee.designation, r.employee.type].some((field) =>
      field.toLowerCase().includes(q)
    )
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAttendanceRecords());
    }
  }, [status, dispatch]);

  if (loading) return <p className="p-6">Loading…</p>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Attendance</h1>
        <Link
          href="/attendance/mark"
          className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--button-text)] px-4 py-2 rounded"
        >
          Mark Attendance
        </Link>
      </div>
      <AttendanceTable
        records={filtered.map((r) => ({
          ...r,
          checkIn: format(new Date(r.checkIn), "MMM d, yyyy"),
          checkOut: format(new Date(r.checkOut), "MMM d, yyyy"),
        }))}
      />
    </div>
  );
}
