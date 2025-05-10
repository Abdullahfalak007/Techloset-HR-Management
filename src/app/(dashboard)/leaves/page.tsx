// "use client";

// import { format } from "date-fns";
// import { useAdminLeaves } from "./useAdminLeaves";

// export default function AdminLeavePage() {
//   const { filtered, loading, updateStatus } = useAdminLeaves();

//   if (loading) return <p className="p-6">Loading…</p>;

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4 text-[var(--text-primary)]">
//         Admin Leave Panel
//       </h1>
//       <div className="overflow-auto border border-[var(--border)] rounded-lg">
//         <table className="min-w-full text-[var(--text-primary)] text-sm">
//           <thead className="border-b border-[var(--border)]">
//             <tr>
//               {[
//                 "Employee",
//                 "Email",
//                 "Reason",
//                 "Start Date",
//                 "End Date",
//                 "Status",
//                 "Actions",
//               ].map((h) => (
//                 <th key={h} className="px-4 py-3 text-left">
//                   {h}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {filtered.map((l) => (
//               <tr
//                 key={l.id}
//                 className="border-b last:border-none hover:bg-[var(--surface-hover)] transition"
//               >
//                 <td className="px-4 py-3 flex items-center space-x-2">
//                   <img
//                     src={
//                       (l as any).employee?.avatar ||
//                       "/assets/icons/default-avatar.png"
//                     }
//                     alt=""
//                     className="w-8 h-8 rounded-full"
//                   />
//                   <span>{(l as any).employee?.name || "—"}</span>
//                 </td>
//                 <td className="px-4 py-3">
//                   {(l as any).employee?.personalInfo?.email || "—"}
//                 </td>
//                 <td className="px-4 py-3">{l.reason}</td>
//                 <td className="px-4 py-3">
//                   {format(new Date(l.startDate), "MMM d, yyyy")}
//                 </td>
//                 <td className="px-4 py-3">
//                   {format(new Date(l.endDate), "MMM d, yyyy")}
//                 </td>
//                 <td className="px-4 py-3">
//                   <span
//                     className={`text-xs px-2 py-1 rounded ${
//                       l.status === "APPROVED"
//                         ? "bg-[var(--success)]"
//                         : l.status === "PENDING"
//                         ? "bg-[var(--warning)]"
//                         : "bg-[var(--error)]"
//                     } text-[var(--button-text)]`}
//                   >
//                     {l.status}
//                   </span>
//                 </td>
//                 <td className="px-4 py-3 space-x-2">
//                   {l.status === "PENDING" && (
//                     <>
//                       <button
//                         onClick={() => updateStatus(l.id, "APPROVED")}
//                         className="px-3 py-1 rounded bg-[var(--success)] text-[var(--button-text)] text-xs"
//                       >
//                         Approve
//                       </button>
//                       <button
//                         onClick={() => updateStatus(l.id, "REJECTED")}
//                         className="px-3 py-1 rounded bg-[var(--error)] text-[var(--button-text)] text-xs"
//                       >
//                         Reject
//                       </button>
//                     </>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

"use client";

import { format } from "date-fns";
import { useAdminLeaves } from "./useAdminLeaves";
import SearchBar from "@/components/common/SearchBar";

export default function AdminLeavePage() {
  const { filtered, loading, updateStatus } = useAdminLeaves();

  if (loading) return <p className="p-6">Loading…</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <SearchBar placeholder="Search leave requests…" basePath="/leaves" />
      </div>

      <div className="overflow-auto border border-[var(--border)] rounded-lg">
        <table className="min-w-full text-[var(--text-primary)] text-sm">
          <thead className="border-b border-[var(--border)]">
            <tr>
              {[
                "Employee",
                "Email",
                "Reason",
                "Start Date",
                "End Date",
                "Status",
                "Actions",
              ].map((h) => (
                <th key={h} className="px-4 py-3 text-left">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((l) => (
              <tr
                key={l.id}
                className="border-b last:border-none hover:bg-[var(--surface-hover)] transition"
              >
                <td className="px-4 py-3 flex items-center space-x-2">
                  <img
                    src={
                      (l as any).employee?.avatar ||
                      "/assets/icons/default-avatar.png"
                    }
                    alt=""
                    className="w-8 h-8 rounded-full"
                  />
                  <span>{(l as any).employee?.name || "—"}</span>
                </td>
                <td className="px-4 py-3">
                  {(l as any).employee?.personalInfo?.email || "—"}
                </td>
                <td className="px-4 py-3">{l.reason}</td>
                <td className="px-4 py-3">
                  {format(new Date(l.startDate), "MMM d, yyyy")}
                </td>
                <td className="px-4 py-3">
                  {format(new Date(l.endDate), "MMM d, yyyy")}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      l.status === "APPROVED"
                        ? "bg-[var(--success)]"
                        : l.status === "PENDING"
                        ? "bg-[var(--warning)]"
                        : "bg-[var(--error)]"
                    } text-[var(--button-text)]`}
                  >
                    {l.status}
                  </span>
                </td>
                <td className="px-4 py-3 space-x-2">
                  {l.status === "PENDING" && (
                    <>
                      <button
                        onClick={() => updateStatus(l.id, "APPROVED")}
                        className="px-3 py-1 rounded bg-[var(--success)] text-[var(--button-text)] text-xs"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => updateStatus(l.id, "REJECTED")}
                        className="px-3 py-1 rounded bg-[var(--error)] text-[var(--button-text)] text-xs"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
