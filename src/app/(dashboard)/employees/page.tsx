// // // // "use client";

// // // // import { useSession } from "next-auth/react";
// // // // import { useEmployees } from "@/hooks/useEmployees";
// // // // import EmployeeHeader from "@/components/employees/EmployeeHeader";
// // // // import EmployeeTable from "@/components/employees/EmployeeTable";

// // // // export default function EmployeesPage() {
// // // //   const { data: session, status } = useSession();
// // // //   const { employees, loading, refresh } = useEmployees();

// // // //   if (status === "loading" || loading) return <p>Loading...</p>;
// // // //   if (!session) return <p>Unauthorized</p>;

// // // //   return (
// // // //     <div className="p-6">
// // // //       <div className="flex justify-between items-center mb-6">
// // // //         <EmployeeHeader isAdmin={session.user.role === "ADMIN"} />
// // // //       </div>
// // // //       <EmployeeTable employees={employees} onDeleteSuccess={refresh} />
// // // //     </div>
// // // //   );
// // // // }

// // // // src/app/(dashboard)/employees/page.tsx
// // // "use client";

// // // import { useEffect, useState } from "react";
// // // import { useSession } from "next-auth/react";
// // // import { useRouter } from "next/navigation";
// // // import { useEmployees } from "@/hooks/useEmployees";
// // // import EmployeeHeader from "@/components/employees/EmployeeHeader";
// // // import EmployeeTable from "@/components/employees/EmployeeTable";

// // // export default function EmployeesPage() {
// // //   const { data: session, status } = useSession();
// // //   const router = useRouter();

// // //   const { employees, loading, refresh } = useEmployees();
// // //   const [skipping, setSkipping] = useState(true);

// // //   // Wait until session is known
// // //   useEffect(() => {
// // //     if (status !== "authenticated") return;

// // //     // if non-admin, fetch your own empId and redirect
// // //     if (session.user.role !== "ADMIN") {
// // //       fetch("/api/employees/me")
// // //         .then((res) => res.json())
// // //         .then((data: { id: string | null }) => {
// // //           if (data.id) {
// // //             router.replace(`/employees/${data.id}/edit`);
// // //           } else {
// // //             // no emp record? maybe fallback
// // //             router.replace("/profile");
// // //           }
// // //         })
// // //         .catch(() => {
// // //           router.replace("/profile");
// // //         });
// // //     } else {
// // //       // admin: stop skipping so we render the list
// // //       setSkipping(false);
// // //     }
// // //   }, [session, status, router]);

// // //   if (status === "loading" || loading) {
// // //     return <p className="p-6">Loading…</p>;
// // //   }

// // //   // if non-admin, we're redirecting—render nothing (or a spinner)
// // //   if (session && session.user.role !== "ADMIN") {
// // //     return null;
// // //   }

// // //   // at this point, session.user.role === 'ADMIN' and skipping === false
// // //   return (
// // //     <div className="p-6">
// // //       <div className="flex justify-between items-center mb-6">
// // //         <EmployeeHeader isAdmin={true} />
// // //       </div>
// // //       <EmployeeTable
// // //         employees={employees}
// // //         onDeleteSuccess={refresh}
// // //         isAdmin={true}
// // //       />
// // //     </div>
// // //   );
// // // }

// // // src/app/(dashboard)/employees/page.tsx
// // "use client";

// // import { useEffect, useState } from "react";
// // import { useSession } from "next-auth/react";
// // import { useRouter } from "next/navigation";
// // import { useEmployees } from "@/hooks/useEmployees";
// // import EmployeeHeader from "@/components/employees/EmployeeHeader";
// // import EmployeeTable from "@/components/employees/EmployeeTable";

// // export default function EmployeesPage() {
// //   const { data: session, status } = useSession();
// //   const router = useRouter();
// //   const { employees, loading, refresh } = useEmployees();
// //   const [showList, setShowList] = useState(false);

// //   useEffect(() => {
// //     if (status !== "authenticated") return;

// //     // Non-admins: fetch your own employee ID, then redirect
// //     if (session.user.role !== "ADMIN") {
// //       fetch("/api/employees/me")
// //         .then((res) => res.json())
// //         .then((data: { id: string | null }) => {
// //           if (data.id) {
// //             router.replace(`/employees/${data.id}/edit`);
// //           } else {
// //             router.replace("/profile");
// //           }
// //         })
// //         .catch(() => {
// //           router.replace("/profile");
// //         });
// //     } else {
// //       // Admin: show the list
// //       setShowList(true);
// //     }
// //   }, [status, session, router]);

// //   // while NextAuth or fetch is resolving, show loading
// //   if (status === "loading" || loading) {
// //     return <p className="p-6">Loading…</p>;
// //   }

// //   // if non-admin and we haven't toggled showList, bail out (they're being redirected)
// //   if (session?.user.role !== "ADMIN" && !showList) {
// //     return null;
// //   }

// //   // only admins reach here
// //   return (
// //     <div className="p-6">
// //       <div className="flex justify-between items-center mb-6">
// //         <EmployeeHeader isAdmin={true} />
// //       </div>
// //       <EmployeeTable
// //         employees={employees}
// //         onDeleteSuccess={refresh}
// //         isAdmin={true}
// //       />
// //     </div>
// //   );
// // }

// // src/app/(dashboard)/employees/page.tsx
// "use client";

// import { useSession } from "next-auth/react";
// import { useEmployees } from "@/hooks/useEmployees";
// import EmployeeHeader from "@/components/employees/EmployeeHeader";
// import EmployeeTable from "@/components/employees/EmployeeTable";

// export default function EmployeesPage() {
//   const { data: session, status } = useSession();
//   const { employees, loading, refresh } = useEmployees();

//   // show spinner until we know session & have data
//   if (status === "loading" || loading) {
//     return <p className="p-6">Loading…</p>;
//   }
//   if (!session) {
//     return <p className="p-6">Unauthorized</p>;
//   }

//   // admins get full actions; non-admins just view
//   const isAdmin = session.user.role === "ADMIN";

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <EmployeeHeader isAdmin={isAdmin} />
//       </div>
//       <EmployeeTable
//         employees={employees}
//         onDeleteSuccess={refresh}
//         isAdmin={isAdmin}
//       />
//     </div>
//   );
// }

// src/app/(dashboard)/employees/page.tsx
"use client";

import { useSession } from "next-auth/react";
import { useEmployees } from "@/hooks/useEmployees";
import EmployeeHeader from "@/components/employees/EmployeeHeader";
import EmployeeTable from "@/components/employees/EmployeeTable";

export default function EmployeesPage() {
  const { data: session, status } = useSession();
  const { employees, loading, refresh } = useEmployees();

  // 1) Show loading until auth+data are ready
  if (status === "loading" || loading) {
    return <p className="p-6">Loading…</p>;
  }
  // 2) If somehow not signed in, block
  if (!session) {
    return <p className="p-6">Unauthorized</p>;
  }

  // 3) Determine if this user is an admin
  const isAdmin = session.user.role === "ADMIN";

  // 4) Always render the table—no redirects here!
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <EmployeeHeader isAdmin={isAdmin} />
      </div>
      <EmployeeTable
        employees={employees}
        onDeleteSuccess={refresh}
        isAdmin={isAdmin}
      />
    </div>
  );
}
