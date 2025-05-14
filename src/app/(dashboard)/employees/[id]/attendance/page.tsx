// "use client";

// import { format } from "date-fns";
// import { useEmployeeAttendance } from "./useEmployeeAttendance";
// import Loader from "@/components/common/Loader";

// export default function EmployeeAttendancePage() {
//   const { records, loading } = useEmployeeAttendance();
//   if (loading) return <Loader />;

//   return (
//     <div className="overflow-auto border border-[var(--border)] rounded-lg bg-[var(--surface)] p-6">
//       <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">
//         Attendance Records
//       </h2>
//       <table className="min-w-full text-[var(--text-primary)] text-sm">
//         <thead className="border-b border-[var(--border)]">
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
//         <tbody className="divide-y divide-[var(--border)]">
//           {records.map((r, i) => (
//             <tr key={i} className="hover:bg-[var(--surface-hover)]">
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
//                       ? "bg-[var(--success)]"
//                       : r.status === "LATE"
//                       ? "bg-[var(--warning)]"
//                       : "bg-[var(--error)]"
//                   } text-[var(--button-text)]`}
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

// src/app/(dashboard)/employees/[id]/attendance/page.tsx
"use client";

import { format } from "date-fns";
import { useEmployeeAttendance } from "./useEmployeeAttendance";
import Loader from "@/components/common/Loader";

export default function EmployeeAttendancePage() {
  const { records, loading } = useEmployeeAttendance();
  if (loading) return <Loader />;

  return (
    <div className="overflow-x-auto border border-[var(--border)] rounded-lg bg-[var(--surface)] p-6">
      <table className="min-w-full table-auto text-[var(--text-primary)] text-sm">
        <thead className="border-b border-[var(--border)]">
          <tr>
            {[
              "Date",
              "Check In",
              "Check Out",
              "Break",
              "Working Hours",
              "Status",
            ].map((h) => (
              <th key={h} className="px-4 py-2 text-left whitespace-nowrap">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--border)]">
          {records.map((r, i) => (
            <tr key={i} className="hover:bg-[var(--surface-hover)]">
              <td className="px-4 py-2 whitespace-nowrap">
                {format(new Date(r.date), "MMM d, yyyy")}
              </td>
              <td className="px-4 py-2 whitespace-nowrap">{r.checkIn}</td>
              <td className="px-4 py-2 whitespace-nowrap">{r.checkOut}</td>
              <td className="px-4 py-2 whitespace-nowrap">
                {r.breakTime || "—"}
              </td>
              <td className="px-4 py-2 whitespace-nowrap">
                {r.workHours || "—"}
              </td>
              <td className="px-4 py-2 whitespace-nowrap">
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    r.status === "ON_TIME"
                      ? "bg-[var(--success)]"
                      : r.status === "LATE"
                      ? "bg-[var(--warning)]"
                      : "bg-[var(--error)]"
                  } text-[var(--button-text)]`}
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
