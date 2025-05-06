// // // src/app/(dashboard)/employees/page.tsx
// // "use client";

// // import { useSession } from "next-auth/react";
// // import { useEmployees } from "@/hooks/useEmployees";
// // import EmployeeHeader from "@/components/employees/EmployeeHeader";
// // import EmployeeTable from "@/components/employees/EmployeeTable";

// // export default function EmployeesPage() {
// //   const { data: session, status } = useSession();
// //   const { employees, loading, refresh } = useEmployees();

// //   // 1) Show loading until auth+data are ready
// //   if (status === "loading" || loading) {
// //     return <p className="p-6">Loading…</p>;
// //   }
// //   // 2) If somehow not signed in, block
// //   if (!session) {
// //     return <p className="p-6">Unauthorized</p>;
// //   }

// //   // 3) Determine if this user is an admin
// //   const isAdmin = session.user.role === "ADMIN";

// //   // 4) Always render the table—no redirects here!
// //   return (
// //     <div className="p-6">
// //       <div className="flex justify-between items-center mb-6">
// //         <EmployeeHeader isAdmin={isAdmin} />
// //       </div>
// //       <EmployeeTable
// //         employees={employees}
// //         onDeleteSuccess={refresh}
// //         isAdmin={isAdmin}
// //       />
// //     </div>
// //   );
// // }

// "use client";

// import { useEffect } from "react";
// import { useSession } from "next-auth/react";
// import EmployeeHeader from "@/components/employees/EmployeeHeader";
// import EmployeeTable from "@/components/employees/EmployeeTable";
// import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
// import { fetchEmployees } from "@/store/slices/employeeSlice";

// export default function EmployeesPage() {
//   const { data: session, status: authStatus } = useSession();
//   const dispatch = useAppDispatch();

//   // grab the full status string, then derive loading
//   const status = useAppSelector((s) => s.employees.status);
//   const loading = status === "loading";

//   useEffect(() => {
//     if (status === "idle") {
//       dispatch(fetchEmployees());
//     }
//   }, [status]);

//   if (authStatus === "loading" || loading) {
//     return <p className="p-6">Loading…</p>;
//   }
//   if (!session) {
//     return <p className="p-6">Unauthorized</p>;
//   }

//   const isAdmin = session.user.role === "ADMIN";

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <EmployeeHeader isAdmin={isAdmin} />
//       </div>
//       <EmployeeTable
//         employees={useAppSelector((s) => s.employees.employees)}
//         onDeleteSuccess={() => dispatch(fetchEmployees())}
//         isAdmin={isAdmin}
//       />
//     </div>
//   );
// }

// src/app/(dashboard)/employees/page.tsx
"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import EmployeeHeader from "@/components/employees/EmployeeHeader";
import EmployeeTable from "@/components/employees/EmployeeTable";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import { fetchEmployees } from "@/store/slices/employeeSlice";

export default function EmployeesPage() {
  const { data: session, status: authStatus } = useSession();
  const dispatch = useAppDispatch();

  // 1) track loading state
  const status = useAppSelector((s) => s.employees.status);
  const loading = status === "loading";

  // 2) **always** call this hook, before any early returns
  const employees = useAppSelector((s) => s.employees.employees);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchEmployees());
    }
  }, [status]);

  if (authStatus === "loading" || loading) {
    return <p className="p-6">Loading…</p>;
  }
  if (!session) {
    return <p className="p-6">Unauthorized</p>;
  }

  const isAdmin = session.user.role === "ADMIN";

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <EmployeeHeader isAdmin={isAdmin} />
      </div>
      <EmployeeTable
        employees={employees}
        onDeleteSuccess={() => dispatch(fetchEmployees())}
        isAdmin={isAdmin}
      />
    </div>
  );
}
