// src/components/employees/EmployeeTable.tsx
import EmployeeRow from "./EmployeeRow";

export default function EmployeeTable({ employees }: { employees: any[] }) {
  return (
    <div className="w-full overflow-auto border border-gray-700 rounded-lg mt-4">
      <table className="min-w-full text-sm text-white">
        <thead className="bg-[#1A1A1A] border-b border-gray-700">
          <tr>
            <th className="px-4 py-3 text-left">Employee Name</th>
            <th className="px-4 py-3 text-left">Employee ID</th>
            <th className="px-4 py-3 text-left">Department</th>
            <th className="px-4 py-3 text-left">Designation</th>
            <th className="px-4 py-3 text-left">Type</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-left">Action</th>
          </tr>
        </thead>
        <tbody className="bg-[#111] divide-y divide-gray-700">
          {employees.map((emp) => (
            <EmployeeRow key={emp.id} employee={emp} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
