// // src/app/(dashboard)/page.tsx
// "use client";

// import { useEffect } from "react";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { isSameDay, isThisWeek, subDays } from "date-fns";
// import { useAppDispatch, useAppSelector } from "@/hooks/useStore";

// import { fetchEmployees } from "@/store/slices/employeeSlice";
// import { fetchLeaves } from "@/store/slices/leaveSlice";
// import { fetchProjects } from "@/store/slices/projectSlice";
// import { fetchAttendanceRecords } from "@/store/slices/attendanceSlice";

// import StatsCard from "@/components/dashboard/StatsCard";
// import AttendanceChart from "@/components/dashboard/AttendanceChart";
// import RecentAttendanceTable from "@/components/dashboard/RecentAttendanceTable";

// import { assets } from "@/constants/assets";
// import Image from "next/image";

// export default function DashboardPage() {
//   const router = useRouter();
//   const { data: session, status: authStatus } = useSession();
//   const dispatch = useAppDispatch();

//   // grab slices
//   const { employees, status: empStatus } = useAppSelector((s) => s.employees);
//   const { items: leaves, loading: leaveLoading } = useAppSelector(
//     (s) => s.leaves
//   );
//   const { records: attendanceItems, status: attendanceStatus } = useAppSelector(
//     (s) => s.attendance
//   );
//   const { items: projects, loading: projectLoading } = useAppSelector(
//     (s) => s.projects
//   );

//   // only fetch if we're an admin
//   useEffect(() => {
//     if (session?.user.role === "ADMIN") {
//       dispatch(fetchEmployees());
//       dispatch(fetchLeaves());
//       dispatch(fetchAttendanceRecords());
//       dispatch(fetchProjects());
//     }
//   }, [session?.user.role, dispatch]);

//   // handle session state
//   if (authStatus === "loading") return <p className="p-6">Loading…</p>;
//   if (!session) return <p className="p-6">Unauthorized</p>;

//   // non-admin -> simple welcome
//   if (session.user.role !== "ADMIN") {
//     return (
//       <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-6">
//         {/* ← New logo + text row */}
//         <div className="flex items-center space-x-4">
//           <Image
//             src={assets.images.logo} // ← from constants
//             alt="HR SEARCH Logo"
//             width={80}
//             height={80}
//           />
//           <span className="text-4xl font-extrabold text-white">HR SEARCH</span>
//         </div>

//         <h1 className="text-3xl font-bold text-white">
//           Welcome, {session.user.name}!
//         </h1>
//         <p className="text-gray-400 text-center">
//           Enjoy your personalized dashboard. Check your profile for the latest
//           updates.
//         </p>
//         <button
//           onClick={() => router.push(`/employees/${session.user.id}`)}
//           className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition"
//         >
//           Go to Profile
//         </button>
//         <p className="text-gray-500 text-sm mt-6">
//           This Application is built by Developer Bilal.
//         </p>
//       </div>
//     );
//   }

//   // admin -> rich stats view
//   // show a loader if any of the admin slices is still fetching
//   if (
//     empStatus === "loading" ||
//     leaveLoading ||
//     attendanceStatus === "loading" ||
//     projectLoading
//   ) {
//     return <p className="p-6">Loading…</p>;
//   }

//   //
//   // Compute top-line numbers + changes
//   //
//   const totalEmployees = employees.length;
//   const totalLeaves = leaves.length;
//   const todayCount = attendanceItems.filter((a) =>
//     isSameDay(new Date(a.date), new Date())
//   ).length;
//   const totalProjects = projects.length;

//   const computeChange = (curr: number, prev: number) =>
//     prev > 0 ? Math.round(((curr - prev) / prev) * 100) : 0;

//   const yesterdayCount = attendanceItems.filter((a) =>
//     isSameDay(new Date(a.date), subDays(new Date(), 1))
//   ).length;

//   const employeeChange = computeChange(totalEmployees, totalEmployees - 1);
//   const leaveChange = computeChange(totalLeaves, totalLeaves - 1);
//   const attendanceChange = computeChange(todayCount, yesterdayCount);
//   const projectChange = computeChange(totalProjects, totalProjects - 1);

//   //
//   // Build 7-day “stacked beats” data
//   //
//   const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
//   const attendanceStats = weekDays.map((dayLabel, idx) => {
//     const entries = attendanceItems.filter((a) => {
//       const d = new Date(a.date);
//       return d.getDay() === idx && isThisWeek(d, { weekStartsOn: 0 });
//     });
//     return {
//       dayName: dayLabel,
//       ON_TIME: entries.filter((a) => a.status === "ON_TIME").length,
//       LATE: entries.filter((a) => a.status === "LATE").length,
//       ABSENT: entries.filter((a) => a.status === "ABSENT").length,
//     };
//   });

//   //
//   // Grab the last 5 attendance records and attach employee info
//   //
//   const recentAttendance = attendanceItems
//     .slice()
//     .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
//     .slice(0, 5)
//     .map((a) => {
//       const emp = employees.find((e) => e.id === a.employeeId)!;
//       return {
//         id: a.id,
//         employee: {
//           id: emp.id,
//           name: emp.name,
//           avatar: emp.avatar,
//           designation: emp.designation,
//           type: emp.type,
//         },
//         checkIn: a.checkIn,
//         checkOut: a.checkOut,
//         status: a.status,
//       };
//     });

//   return (
//     <div className="space-y-6 p-6">
//       {/* Header */}
//       <div>
//         <h1 className="text-2xl font-bold text-white">Dashboard</h1>
//         <p className="text-gray-400">You are now on the Dashboard page.</p>
//       </div>

//       {/* Stats Cards */}
//       <div className="border border-gray-700 rounded-lg p-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <StatsCard
//             title="Total Employees"
//             value={totalEmployees}
//             icon={assets.icons.user}
//             change={employeeChange}
//             positive={true}
//           />
//           <StatsCard
//             title="Total Leaves"
//             value={totalLeaves}
//             icon={assets.icons.leaves}
//             change={leaveChange}
//             positive={true}
//           />
//           <StatsCard
//             title="Today Attendance"
//             value={todayCount}
//             icon={assets.icons.calendar}
//             change={attendanceChange}
//             positive={false}
//           />
//           <StatsCard
//             title="Total Projects"
//             value={totalProjects}
//             icon={assets.icons.project}
//             change={projectChange}
//             positive={true}
//           />
//         </div>
//       </div>

//       {/* Attendance Overview */}
//       <div className="border border-gray-700 rounded-lg p-6">
//         <h2 className="text-xl font-semibold text-white mb-4">
//           Attendance Overview
//         </h2>
//         <AttendanceChart data={attendanceStats} />
//       </div>

//       {/* Recent Attendance */}
//       <div className="border border-gray-700 rounded-lg p-6">
//         <h2 className="text-xl font-semibold text-white mb-4">
//           Recent Attendance
//         </h2>
//         <RecentAttendanceTable rows={recentAttendance} />
//       </div>
//     </div>
//   );
// }

// src/app/(dashboard)/page.tsx
"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { isSameDay, isThisWeek, subDays } from "date-fns";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";

import { fetchEmployees } from "@/store/slices/employeeSlice";
import { fetchLeaves } from "@/store/slices/leaveSlice";
import { fetchProjects } from "@/store/slices/projectSlice";
import { fetchAttendanceRecords } from "@/store/slices/attendanceSlice";

import StatsCard from "@/components/dashboard/StatsCard";
import AttendanceChart from "@/components/dashboard/AttendanceChart";
import RecentAttendanceTable from "@/components/dashboard/RecentAttendanceTable";

import { assets } from "@/constants/assets";
import Image from "next/image";

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, status: authStatus } = useSession();
  const dispatch = useAppDispatch();

  const { employees, status: empStatus } = useAppSelector((s) => s.employees);
  const { items: leaves, loading: leaveLoading } = useAppSelector(
    (s) => s.leaves
  );
  const { records: attendanceItems, status: attendanceStatus } = useAppSelector(
    (s) => s.attendance
  );
  const { items: projects, loading: projectLoading } = useAppSelector(
    (s) => s.projects
  );

  useEffect(() => {
    if (session?.user.role === "ADMIN") {
      dispatch(fetchEmployees());
      dispatch(fetchLeaves());
      dispatch(fetchAttendanceRecords());
      dispatch(fetchProjects());
    }
  }, [session?.user.role, dispatch]);

  if (authStatus === "loading") return <p className="p-6">Loading…</p>;
  if (!session) return <p className="p-6">Unauthorized</p>;

  if (session.user.role !== "ADMIN") {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-6">
        <div className="flex items-center space-x-4">
          <Image
            src={assets.images.logo}
            alt="HR SEARCH Logo"
            width={80}
            height={80}
          />
          <span className="text-4xl font-extrabold text-[var(--text-primary)]">
            HR SEARCH
          </span>
        </div>

        <h1 className="text-3xl font-bold text-[var(--text-primary)]">
          Welcome, {session.user.name}!
        </h1>
        <p className="text-[var(--text-secondary)] text-center">
          Enjoy your personalized dashboard. Check your profile for the latest
          updates.
        </p>
        <button
          onClick={() => router.push(`/employees/${session.user.id}`)}
          className="bg-[var(--accent)] text-[var(--button-text)] px-6 py-2 rounded-lg hover:bg-[var(--accent-hover)] transition"
        >
          Go to Profile
        </button>
        <p className="text-[var(--text-secondary)] text-sm mt-6">
          This Application is built by Developer Bilal.
        </p>
      </div>
    );
  }

  if (
    empStatus === "loading" ||
    leaveLoading ||
    attendanceStatus === "loading" ||
    projectLoading
  ) {
    return <p className="p-6">Loading…</p>;
  }

  const totalEmployees = employees.length;
  const totalLeaves = leaves.length;
  const todayCount = attendanceItems.filter((a) =>
    isSameDay(new Date(a.date), new Date())
  ).length;
  const totalProjects = projects.length;

  const computeChange = (curr: number, prev: number) =>
    prev > 0 ? Math.round(((curr - prev) / prev) * 100) : 0;

  const yesterdayCount = attendanceItems.filter((a) =>
    isSameDay(new Date(a.date), subDays(new Date(), 1))
  ).length;

  const employeeChange = computeChange(totalEmployees, totalEmployees - 1);
  const leaveChange = computeChange(totalLeaves, totalLeaves - 1);
  const attendanceChange = computeChange(todayCount, yesterdayCount);
  const projectChange = computeChange(totalProjects, totalProjects - 1);

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const attendanceStats = weekDays.map((dayLabel, idx) => {
    const entries = attendanceItems.filter((a) => {
      const d = new Date(a.date);
      return d.getDay() === idx && isThisWeek(d, { weekStartsOn: 0 });
    });
    return {
      dayName: dayLabel,
      ON_TIME: entries.filter((a) => a.status === "ON_TIME").length,
      LATE: entries.filter((a) => a.status === "LATE").length,
      ABSENT: entries.filter((a) => a.status === "ABSENT").length,
    };
  });

  const recentAttendance = attendanceItems
    .slice()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5)
    .map((a) => {
      const emp = employees.find((e) => e.id === a.employeeId)!;
      return {
        id: a.id,
        employee: {
          id: emp.id,
          name: emp.name,
          avatar: emp.avatar,
          designation: emp.designation,
          type: emp.type,
        },
        checkIn: a.checkIn,
        checkOut: a.checkOut,
        status: a.status,
      };
    });

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">
          Dashboard
        </h1>
        <p className="text-[var(--text-secondary)]">
          You are now on the Dashboard page.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="border border-[var(--border)] rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <StatsCard
            title="Total Employees"
            value={totalEmployees}
            icon={assets.icons.user}
            change={employeeChange}
            positive
          />
          <StatsCard
            title="Total Leaves"
            value={totalLeaves}
            icon={assets.icons.leaves}
            change={leaveChange}
            positive
          />
          <StatsCard
            title="Today Attendance"
            value={todayCount}
            icon={assets.icons.calendar}
            change={attendanceChange}
            positive={false}
          />
          <StatsCard
            title="Total Projects"
            value={totalProjects}
            icon={assets.icons.project}
            change={projectChange}
            positive
          />
        </div>
      </div>

      {/* Attendance Overview */}
      <div className="border border-[var(--border)] rounded-lg p-6">
        <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">
          Attendance Overview
        </h2>
        <AttendanceChart data={attendanceStats} />
      </div>

      {/* Recent Attendance */}
      <div className="border border-[var(--border)] rounded-lg p-6">
        <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">
          Recent Attendance
        </h2>
        <RecentAttendanceTable rows={recentAttendance} />
      </div>
    </div>
  );
}
