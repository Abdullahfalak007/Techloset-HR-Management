// src/components/employees/EmployeeRow.tsx
"use client";

import { useRouter } from "next/navigation";
import { assets } from "@/constants/assets";
import Image from "next/image";

export default function EmployeeRow({
  employee,
  onDeleteSuccess,
}: {
  employee: any;
  onDeleteSuccess?: () => void;
}) {
  const router = useRouter();

  const handleView = () => {
    router.push(`/employees/${employee.id}`);
  };

  const handleEdit = () => {
    router.push(`/employees/${employee.id}/edit`);
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this employee?")) {
      return;
    }
    const res = await fetch(`/api/employees/${employee.id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      onDeleteSuccess?.();
    } else {
      console.error("Failed to delete", await res.text());
      alert("Could not delete employee.");
    }
  };

  return (
    <tr className="hover:bg-gray-900 transition">
      <td className="px-4 py-3 flex items-center space-x-2">
        <Image
          src={employee.avatar || "/assets/icons/default-avatar.png"}
          alt="avatar"
          width={30}
          height={30}
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
      <td className="px-4 py-3 flex space-x-3">
        <button onClick={handleView} title="View Profile">
          <img src={assets.icons.view} alt="View" className="w-4 h-4" />
        </button>
        <button onClick={handleEdit} title="Edit Profile">
          <img src={assets.icons.edit} alt="Edit" className="w-4 h-4" />
        </button>
        <button onClick={handleDelete} title="Delete">
          <img src={assets.icons.delete} alt="Delete" className="w-4 h-4" />
        </button>
      </td>
    </tr>
  );
}
