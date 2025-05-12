// "use client";

// import { format } from "date-fns";
// import Link from "next/link";
// import AttendanceTable from "@/components/attendance/AttendanceTable";
// import { useAttendanceOverview } from "./useAttendanceOverview";

// export default function AttendanceOverviewPage() {
//   const { filtered, loading } = useAttendanceOverview();

//   if (loading) return <p className="p-6">Loading…</p>;

//   return (
//     <div className="p-6 space-y-6">
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-bold">Attendance</h1>
//         <Link
//           href="/attendance/mark"
//           className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--button-text)] px-4 py-2 rounded"
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

import { useRouter } from "next/navigation";
import AttendanceTable from "@/components/attendance/AttendanceTable";
import { useAttendanceOverview } from "./useAttendanceOverview";
import SearchBar from "@/components/common/SearchBar";

export default function AttendanceOverviewPage() {
  const { filtered, loading } = useAttendanceOverview();
  const router = useRouter();

  if (loading) return <p className="p-6">Loading…</p>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <SearchBar placeholder="Search attendance…" basePath="/attendance" />
        <button
          onClick={() => router.push("/attendance/mark")}
          className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--button-text)] px-4 py-2 rounded transition"
        >
          Mark Attendance
        </button>
      </div>
      <AttendanceTable
        records={filtered.map((r) => ({
          ...r,
          checkIn: new Date(r.checkIn).toLocaleString(), // or your existing format
          checkOut: new Date(r.checkOut).toLocaleString(),
        }))}
      />
    </div>
  );
}
