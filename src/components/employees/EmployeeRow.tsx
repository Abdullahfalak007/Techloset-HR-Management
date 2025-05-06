// src/components/employees/EmployeeRow.tsx
"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function EmployeeRow({
  employee,
  onDeleteSuccess,
  isAdmin,
}: {
  employee: any;
  onDeleteSuccess?: () => void;
  isAdmin: boolean;
}) {
  const router = useRouter();

  const handleView = () => router.push(`/employees/${employee.id}/edit`);
  const handleDelete = async () => {
    if (!confirm("Delete this employee?")) return;
    const res = await fetch(`/api/employees/${employee.id}`, {
      method: "DELETE",
    });
    if (res.ok) onDeleteSuccess?.();
  };

  return (
    <tr className="hover:bg-gray-900 transition">
      <td className="px-4 py-3 flex items-center space-x-2">
        <Image
          src={employee.avatar || "/assets/icons/default-avatar.png"}
          width={30}
          height={30}
          alt=""
          className="rounded-full"
        />
        <span>{employee.name}</span>
      </td>
      <td className="px-4 py-3">{employee.employeeId}</td>
      <td className="px-4 py-3">{employee.department}</td>
      <td className="px-4 py-3">{employee.designation}</td>
      <td className="px-4 py-3">{employee.type}</td>
      <td className="px-4 py-3">
        <span className="text-xs bg-orange-800 px-2 py-1 rounded text-white">
          {employee.status}
        </span>
      </td>
      {isAdmin && (
        <td className="py-3 flex space-x-3">
          <button onClick={handleView} title="View/Edit">
            <img src="/assets/icons/view.svg" alt="View" className="w-4 h-4" />
          </button>
          <button onClick={handleView} title="View/Edit">
            <img src="/assets/icons/edit.svg" alt="Edit" className="w-4 h-4" />
          </button>
          <button onClick={handleDelete} title="Delete">
            <img
              src="/assets/icons/delete.svg"
              alt="Delete"
              className="w-4 h-4"
            />
          </button>
        </td>
      )}
    </tr>
  );
}
