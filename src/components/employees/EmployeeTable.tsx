// src/components/employees/EmployeeTable.tsx
import EmployeeRow from "./EmployeeRow";

export default function EmployeeTable({
  employees,
  onDeleteSuccess,
  isAdmin,
}: {
  employees: any[];
  onDeleteSuccess?: () => void;
  isAdmin: boolean;
}) {
  return (
    <div className="overflow-auto border border-gray-700 rounded-lg mt-4">
      <table className="min-w-full text-white text-sm">
        <thead className="bg-[#1A1A1A] border-b border-gray-700">
          <tr>
            <th className="px-4 py-3 text-left">Name</th>
            <th className="px-4 py-3 text-left">Employee ID</th>
            <th className="px-4 py-3 text-left">Department</th>
            <th className="px-4 py-3 text-left">Designation</th>
            <th className="px-4 py-3 text-left">Type</th>
            <th className="px-4 py-3 text-left">Status</th>
            {isAdmin && <th className="px-4 py-3 text-left">Action</th>}
          </tr>
        </thead>
        <tbody className="bg-[#111] divide-y divide-gray-700">
          {employees.map((emp) => (
            <EmployeeRow
              key={emp.id}
              employee={emp}
              onDeleteSuccess={onDeleteSuccess}
              isAdmin={isAdmin}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
