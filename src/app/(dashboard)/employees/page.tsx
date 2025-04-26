// // src/app/employees/page.tsx
// "use client";

// import { useSession } from "next-auth/react";
// import { useEffect, useState } from "react";
// import EmployeeTable from "../../../components/employees/EmployeeTable";
// import EmployeeHeader from "../../../components/employees/EmployeeHeader";

// export default function EmployeesPage() {
//   const { data: session, status } = useSession();
//   const [employees, setEmployees] = useState([]);

//   useEffect(() => {
//     async function fetchEmployees() {
//       const res = await fetch("/api/employees");
//       if (!res.ok) throw new Error("Failed to fetch employees");
//       const data = await res.json();
//       return data;
//     }

//     fetchEmployees();
//   }, []);

//   if (status === "loading") return <p>Loading...</p>;
//   if (!session) return <p>Unauthorized</p>;

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <EmployeeHeader isAdmin={session.user.role === "ADMIN"} />
//       </div>
//       <EmployeeTable employees={employees} />
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmployees();
  }, []);

  async function fetchEmployees() {
    try {
      const res = await fetch("/api/employees", {
        method: "GET",
      });
      if (!res.ok) throw new Error("Failed to fetch employees");
      const data = await res.json();
      setEmployees(data);
    } catch (error) {
      console.error("Error fetching employees", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <div className="p-6">Loading employees...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Employees</h1>
        <Link
          href="/employees/add"
          className="bg-orange-500 text-white px-4 py-2 rounded"
        >
          Add Employee
        </Link>
      </div>

      {employees.length === 0 ? (
        <p>No employees found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border rounded">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Employee ID</th>
                <th className="p-3 border">Department</th>
                <th className="p-3 border">Designation</th>
                <th className="p-3 border">Type</th>
                <th className="p-3 border">Status</th>
                <th className="p-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp.id} className="border-t">
                  <td className="p-3">{emp.name}</td>
                  <td className="p-3">{emp.employeeId}</td>
                  <td className="p-3">{emp.department}</td>
                  <td className="p-3">{emp.designation}</td>
                  <td className="p-3">{emp.type}</td>
                  <td className="p-3">{emp.status}</td>
                  <td className="p-3 space-x-2">
                    <Link
                      href={`/employees/${emp.id}/edit`}
                      className="text-blue-500 underline"
                    >
                      Edit
                    </Link>
                    {/* Future: Add delete button here */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
