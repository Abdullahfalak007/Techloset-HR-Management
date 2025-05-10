// "use client";

// import EmployeeHeader from "@/components/employees/EmployeeHeader";
// import EmployeeTable from "@/components/employees/EmployeeTable";
// import { useEmployeesList } from "./useEmployeesList";

// export default function EmployeesPage() {
//   const { session, loading, filtered, isAdmin, refresh } = useEmployeesList();

//   if (loading) return <p className="p-6">Loading…</p>;
//   if (!session) return <p className="p-6">Unauthorized</p>;

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <EmployeeHeader isAdmin={isAdmin} />
//       </div>
//       <EmployeeTable
//         employees={filtered}
//         onDeleteSuccess={refresh}
//         isAdmin={isAdmin}
//       />
//     </div>
//   );
// }

"use client";

import EmployeeTable from "@/components/employees/EmployeeTable";
import { useEmployeesList } from "./useEmployeesList";
import SearchBar from "@/components/common/SearchBar";
import { useRouter } from "next/navigation";

export default function EmployeesPage() {
  const { session, loading, filtered, isAdmin, refresh } = useEmployeesList();
  const router = useRouter();

  if (loading) return <p className="p-6">Loading…</p>;
  if (!session) return <p className="p-6">Unauthorized</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <SearchBar placeholder="Search employees…" basePath="/employees" />

        {isAdmin && (
          <button
            onClick={() => router.push("/employees/add")}
            className="ml-4 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--button-text)] px-4 py-2 rounded"
          >
            Add New
          </button>
        )}
      </div>

      <EmployeeTable
        employees={filtered}
        onDeleteSuccess={refresh}
        isAdmin={isAdmin}
      />
    </div>
  );
}
