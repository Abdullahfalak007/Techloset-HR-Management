// src/components/employees/EmployeeRow.tsx
import { assets } from "@/constants/assets";
import Image from "next/image";

export default function EmployeeRow({ employee }: { employee: any }) {
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
        <button title="View">
          <img src="/assets/icons/view.svg" alt="View" className="w-4 h-4" />
        </button>
        <button title="Edit">
          <img src="/assets/icons/edit.svg" alt="Edit" className="w-4 h-4" />
        </button>

        <button
          title="Delete"
          onClick={async () => {
            if (confirm("Are you sure?")) {
              await fetch(`/api/employees/${employee.id}`, {
                method: "DELETE",
              });
              window.location.reload(); // or use a state-based refresh
            }
          }}
        >
          <img src={assets.icons.delete} alt="Delete" className="w-4 h-4" />
        </button>
      </td>
    </tr>
  );
}
