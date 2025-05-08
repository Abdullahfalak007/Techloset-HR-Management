// "use client";

// import { useEffect } from "react";
// import { useParams } from "next/navigation";
// import { format } from "date-fns";
// import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
// import { fetchProjects, patchProjectStatus } from "@/store/slices/projectSlice";

// export default function EmployeeProjectsPage() {
//   // normalize id to a string
//   const { id: rawId } = useParams();
//   const employeeId = Array.isArray(rawId) ? rawId[0] : rawId!;

//   const dispatch = useAppDispatch();

//   const allProjects = useAppSelector((s) => s.projects.items);
//   // filter by assignee.id (slice returns { assignee: { id, name, avatar? } })
//   const projects = allProjects.filter((p) => p.assignee.id === employeeId);
//   const loading = useAppSelector((s) => s.projects.loading);

//   useEffect(() => {
//     dispatch(fetchProjects());
//   }, []);

//   const changeStatus = async (
//     projectId: string,
//     newStatus: "IN_PROGRESS" | "COMPLETED"
//   ) => {
//     await dispatch(patchProjectStatus({ id: projectId, status: newStatus }));
//   };

//   if (loading) return <p className="p-6">Loading…</p>;

//   return (
//     <div className="overflow-auto border border-gray-700 rounded-lg bg-[#1A1A1A] p-6">
//       <h2 className="text-xl font-semibold text-white mb-4">Projects</h2>
//       <table className="min-w-full text-white text-sm">
//         <thead className="border-b border-gray-700">
//           <tr>
//             {["Title", "Start Date", "End Date", "Status", "Action"].map(
//               (h) => (
//                 <th key={h} className="px-4 py-2 text-left">
//                   {h}
//                 </th>
//               )
//             )}
//           </tr>
//         </thead>
//         <tbody className="divide-y divide-gray-700">
//           {projects.map((p) => (
//             <tr key={p.id} className="hover:bg-gray-900">
//               <td className="px-4 py-2">{p.title}</td>
//               <td className="px-4 py-2">
//                 {format(new Date(p.startDate), "MMM d, yyyy")}
//               </td>
//               <td className="px-4 py-2">
//                 {format(new Date(p.endDate), "MMM d, yyyy")}
//               </td>
//               <td className="px-4 py-2">{p.status.replace("_", " ")}</td>
//               <td className="px-4 py-2 space-x-2">
//                 {p.status !== "COMPLETED" && (
//                   <button
//                     onClick={() => changeStatus(p.id, "COMPLETED")}
//                     className="px-3 py-1 rounded bg-green-600 text-white text-xs"
//                   >
//                     Mark Complete
//                   </button>
//                 )}
//                 {p.status !== "IN_PROGRESS" && (
//                   <button
//                     onClick={() => changeStatus(p.id, "IN_PROGRESS")}
//                     className="px-3 py-1 rounded bg-yellow-600 text-white text-xs"
//                   >
//                     Mark In Progress
//                   </button>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// src/app/(dashboard)/employees/[id]/projects/page.tsx
"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { format } from "date-fns";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import { fetchProjects, patchProjectStatus } from "@/store/slices/projectSlice";

export default function EmployeeProjectsPage() {
  const { id: rawId } = useParams();
  const employeeId = Array.isArray(rawId) ? rawId[0] : rawId!;

  const dispatch = useAppDispatch();
  const allProjects = useAppSelector((s) => s.projects.items);
  const projects = allProjects.filter((p) => p.assignee.id === employeeId);
  const loading = useAppSelector((s) => s.projects.loading);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const changeStatus = async (
    projectId: string,
    newStatus: "IN_PROGRESS" | "COMPLETED"
  ) => {
    await dispatch(patchProjectStatus({ id: projectId, status: newStatus }));
  };

  if (loading) return <p className="p-6">Loading…</p>;

  return (
    <div className="overflow-auto border border-[var(--border)] rounded-lg bg-[var(--container-bg)] p-6">
      <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">
        Projects
      </h2>
      <table className="min-w-full text-[var(--text-primary)] text-sm">
        <thead className="border-b border-[var(--border)]">
          <tr>
            {["Title", "Start Date", "End Date", "Status", "Action"].map(
              (h) => (
                <th key={h} className="px-4 py-2 text-left">
                  {h}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--border)]">
          {projects.map((p) => (
            <tr key={p.id} className="hover:bg-[var(--surface-hover)]">
              <td className="px-4 py-2">{p.title}</td>
              <td className="px-4 py-2">
                {format(new Date(p.startDate), "MMM d, yyyy")}
              </td>
              <td className="px-4 py-2">
                {format(new Date(p.endDate), "MMM d, yyyy")}
              </td>
              <td className="px-4 py-2">{p.status.replace("_", " ")}</td>
              <td className="px-4 py-2 space-x-2">
                {p.status !== "COMPLETED" && (
                  <button
                    onClick={() => changeStatus(p.id, "COMPLETED")}
                    className="px-3 py-1 rounded bg-[var(--success)] text-[var(--button-text)] text-xs"
                  >
                    Mark Complete
                  </button>
                )}
                {p.status !== "IN_PROGRESS" && (
                  <button
                    onClick={() => changeStatus(p.id, "IN_PROGRESS")}
                    className="px-3 py-1 rounded bg-[var(--warning)] text-[var(--button-text)] text-xs"
                  >
                    Mark In Progress
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
