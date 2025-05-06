// "use client";

// import { useState, useEffect } from "react";
// import { useParams } from "next/navigation";
// import { format } from "date-fns";

// type Record = {
//   date: string;
//   checkIn: string;
//   checkOut: string;
//   breakTime: string | null;
//   workHours: string | null;
//   status: string;
// };

// export default function EmployeeAttendancePage() {
//   const { id } = useParams();
//   const [records, setRecords] = useState<Record[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch("/api/attendance")
//       .then((r) => r.json())
//       .then((all: any[]) => {
//         setRecords(all.filter((r) => r.employee.id === id));
//       })
//       .finally(() => setLoading(false));
//   }, [id]);

//   if (loading) return <p className="p-6">Loading…</p>;

//   return (
//     <div className="overflow-auto border border-gray-700 rounded-lg bg-[#1A1A1A] p-6">
//       <h2 className="text-xl font-semibold text-white mb-4">
//         Attendance Records
//       </h2>
//       <table className="min-w-full text-white text-sm">
//         <thead className="border-b border-gray-700">
//           <tr>
//             {[
//               "Date",
//               "Check In",
//               "Check Out",
//               "Break",
//               "Working Hours",
//               "Status",
//             ].map((h) => (
//               <th key={h} className="px-4 py-2 text-left">
//                 {h}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody className="divide-y divide-gray-700">
//           {records.map((r, i) => (
//             <tr key={i} className="hover:bg-gray-900">
//               <td className="px-4 py-2">
//                 {format(new Date(r.date), "MMM d, yyyy")}
//               </td>
//               <td className="px-4 py-2">{r.checkIn}</td>
//               <td className="px-4 py-2">{r.checkOut}</td>
//               <td className="px-4 py-2">{r.breakTime || "—"}</td>
//               <td className="px-4 py-2">{r.workHours || "—"}</td>
//               <td className="px-4 py-2">
//                 <span
//                   className={`text-xs px-2 py-1 rounded ${
//                     r.status === "ON_TIME"
//                       ? "bg-green-600"
//                       : r.status === "LATE"
//                       ? "bg-yellow-600"
//                       : "bg-red-600"
//                   } text-white`}
//                 >
//                   {r.status}
//                 </span>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { format } from "date-fns";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import { fetchAttendanceRecords } from "@/store/slices/attendanceSlice";

type Record = {
  date: string;
  checkIn: string;
  checkOut: string;
  breakTime: string | null;
  workHours: string | null;
  status: string;
  employee: {
    id: string;
    name: string;
    avatar?: string;
    department: string;
    designation: string;
    type: string;
  };
};

export default function EmployeeAttendancePage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const all = useAppSelector((s) => s.attendance.records);
  const records = all.filter((r) => r.employee.id === id);
  const status = useAppSelector((s) => s.attendance.status);
  const loading = status === "loading";

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAttendanceRecords());
    }
  }, [status]);

  if (loading) return <p className="p-6">Loading…</p>;

  return (
    <div className="overflow-auto border border-gray-700 rounded-lg bg-[#1A1A1A] p-6">
      <h2 className="text-xl font-semibold text-white mb-4">
        Attendance Records
      </h2>
      <table className="min-w-full text-white text-sm">
        <thead className="border-b border-gray-700">
          <tr>
            {[
              "Date",
              "Check In",
              "Check Out",
              "Break",
              "Working Hours",
              "Status",
            ].map((h) => (
              <th key={h} className="px-4 py-2 text-left">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {records.map((r, i) => (
            <tr key={i} className="hover:bg-gray-900">
              <td className="px-4 py-2">
                {format(new Date(r.date), "MMM d, yyyy")}
              </td>
              <td className="px-4 py-2">{r.checkIn}</td>
              <td className="px-4 py-2">{r.checkOut}</td>
              <td className="px-4 py-2">{r.breakTime || "—"}</td>
              <td className="px-4 py-2">{r.workHours || "—"}</td>
              <td className="px-4 py-2">
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    r.status === "ON_TIME"
                      ? "bg-green-600"
                      : r.status === "LATE"
                      ? "bg-yellow-600"
                      : "bg-red-600"
                  } text-white`}
                >
                  {r.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
