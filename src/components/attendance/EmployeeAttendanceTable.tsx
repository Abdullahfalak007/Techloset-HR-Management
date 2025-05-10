// // src/components/attendance/EmployeeAttendanceTable.tsx
// import Image from "next/image";

// type Emp = {
//   id: string;
//   name: string;
//   avatar?: string;
//   employeeId: string;
//   department: string;
//   designation: string;
//   type: string;
//   status: string;
// };

// export default function EmployeeAttendanceTable({
//   employees,
//   onMark,
// }: {
//   employees: Emp[];
//   onMark: (e: Emp) => void;
// }) {
//   return (
//     <div className="overflow-auto border border-gray-700 rounded-lg">
//       <table className="min-w-full text-white text-sm">
//         <thead className="border-b border-gray-700">
//           <tr>
//             <th className="px-4 py-3 text-left">Employee</th>
//             <th className="px-4 py-3 text-left">Employee ID</th>
//             <th className="px-4 py-3 text-left">Department</th>
//             <th className="px-4 py-3 text-left">Designation</th>
//             <th className="px-4 py-3 text-left">Type</th>
//             <th className="px-4 py-3 text-left">Status</th>
//             <th className="px-4 py-3 text-left">Action</th>
//           </tr>
//         </thead>
//         <tbody className="divide-y divide-gray-700">
//           {employees.map((e) => (
//             <tr key={e.id} className="hover:bg-gray-900 transition">
//               <td className="px-4 py-3 flex items-center space-x-2">
//                 <Image
//                   src={e.avatar || "/assets/icons/default-avatar.png"}
//                   alt="avatar"
//                   width={30}
//                   height={30}
//                   className="rounded-full"
//                 />
//                 <span>{e.name}</span>
//               </td>
//               <td className="px-4 py-3">{e.employeeId}</td>
//               <td className="px-4 py-3">{e.department}</td>
//               <td className="px-4 py-3">{e.designation}</td>
//               <td className="px-4 py-3">{e.type}</td>
//               <td className="px-4 py-3 text-orange-500">{e.status}</td>
//               <td className="px-4 py-3">
//                 <button
//                   onClick={() => onMark(e)}
//                   className="hover:text-green-400"
//                   title="Mark Attendance"
//                 >
//                   ✓ Mark
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// src/components/attendance/EmployeeAttendanceTable.tsx
import { Emp } from "@/types/types";
import Image from "next/image";

export default function EmployeeAttendanceTable({
  employees,
  onMark,
}: {
  employees: Emp[];
  onMark: (e: Emp) => void;
}) {
  return (
    <div className="overflow-auto border border-[var(--border)] rounded-lg">
      <table className="min-w-full text-[var(--text-primary)] text-sm">
        <thead className="border-b border-[var(--border)]">
          <tr>
            <th className="px-4 py-3 text-left">Employee</th>
            <th className="px-4 py-3 text-left">Employee ID</th>
            <th className="px-4 py-3 text-left">Department</th>
            <th className="px-4 py-3 text-left">Designation</th>
            <th className="px-4 py-3 text-left">Type</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-left">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--border)]">
          {employees.map((e) => (
            <tr key={e.id} className="hover:bg-[var(--surface)] transition">
              <td className="px-4 py-3 flex items-center space-x-2">
                <Image
                  src={e.avatar || "/assets/icons/default-avatar.png"}
                  alt="avatar"
                  width={30}
                  height={30}
                  className="rounded-full"
                />
                <span>{e.name}</span>
              </td>
              <td className="px-4 py-3">{e.employeeId}</td>
              <td className="px-4 py-3">{e.department}</td>
              <td className="px-4 py-3">{e.designation}</td>
              <td className="px-4 py-3">{e.type}</td>
              <td className="px-4 py-3 text-[var(--accent)]">{e.status}</td>
              <td className="px-4 py-3">
                <button
                  onClick={() => onMark(e)}
                  className="hover:text-[var(--success)]"
                  title="Mark Attendance"
                >
                  ✓ Mark
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
