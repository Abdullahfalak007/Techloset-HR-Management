// // src/app/(dashboard)/attendance/page.tsx
// "use client";

// import { useEffect, useState } from "react";
// import AttendanceTable from "@/components/attendance/AttendanceTable";
// import { format } from "date-fns";
// import Link from "next/link";

// type AttendanceRecord = {
//   id: string;
//   date: string;
//   checkIn: string;
//   checkOut: string;
//   breakTime: string | null;
//   workHours: string | null;
//   status: string;
//   employee: {
//     id: string;
//     name: string;
//     avatar?: string;
//     department: string;
//     designation: string;
//     type: string;
//   };
// };

// export default function AttendanceOverviewPage() {
//   const [data, setData] = useState<AttendanceRecord[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch("/api/attendance")
//       .then((r) => r.json())
//       .then((d) => {
//         setData(d);
//         setLoading(false);
//       });
//   }, []);

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
//         records={data.map((r) => ({
//           ...r,
//           checkIn: format(new Date(r.checkIn), "MMM d, yyyy"),
//           checkOut: format(new Date(r.checkOut), "MMM d, yyyy"),
//         }))}
//       />
//     </div>
//   );
// }

"use client";

import { useEffect } from "react";
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

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAttendanceRecords());
    }
  }, [status]);

  if (loading) return <p className="p-6">Loading…</p>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Attendance</h1>
        <Link
          href="/attendance/mark"
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded"
        >
          Mark Attendance
        </Link>
      </div>
      <AttendanceTable
        records={data.map((r) => ({
          ...r,
          checkIn: format(new Date(r.checkIn), "MMM d, yyyy"),
          checkOut: format(new Date(r.checkOut), "MMM d, yyyy"),
        }))}
      />
    </div>
  );
}
