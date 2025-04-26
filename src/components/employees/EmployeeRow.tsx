// // src/components/employees/EmployeeRow.tsx
// "use client";

// import { useRouter } from "next/navigation";
// import { assets } from "@/constants/assets";
// import Image from "next/image";

// export default function EmployeeRow({ employee }: { employee: any }) {
//   const router = useRouter();

//   const handleView = () => {
//     // adjust if you have a dedicated "view" page; otherwise you can
//     // repurpose the edit page or build a details page at /employees/[id]
//     router.push(`/employees/${employee.id}`);
//   };

//   const handleEdit = () => {
//     router.push(`/employees/${employee.id}/edit`);
//   };

//   const handleDelete = async () => {
//     if (confirm("Are you sure you want to delete this employee?")) {
//       await fetch(`/api/employees/${employee.id}`, {
//         method: "DELETE",
//       });
//       // refresh the current route to re-fetch the list
//       router.refresh();
//     }
//   };

//   return (
//     <tr className="hover:bg-gray-900 transition">
//       <td className="px-4 py-3 flex items-center space-x-2">
//         <Image
//           src={employee.avatar || "/assets/icons/default-avatar.png"}
//           alt="avatar"
//           width={30}
//           height={30}
//           className="rounded-full"
//         />
//         <span>{employee.name}</span>
//       </td>
//       <td className="px-4 py-3">{employee.employeeId}</td>
//       <td className="px-4 py-3">{employee.department}</td>
//       <td className="px-4 py-3">{employee.designation}</td>
//       <td className="px-4 py-3">{employee.type}</td>
//       <td className="px-4 py-3">
//         <span className="text-xs bg-orange-800 px-2 py-1 rounded text-white">
//           {employee.status}
//         </span>
//       </td>
//       <td className="px-4 py-3 flex space-x-3">
//         {/* View */}
//         <button onClick={handleView} title="View Profile">
//           <img src={assets.icons.view} alt="View" className="w-4 h-4" />
//         </button>

//         {/* Edit */}
//         <button onClick={handleEdit} title="Edit Profile">
//           <img src={assets.icons.edit} alt="Edit" className="w-4 h-4" />
//         </button>

//         {/* Delete */}
//         <button onClick={handleDelete} title="Delete">
//           <img src={assets.icons.delete} alt="Delete" className="w-4 h-4" />
//         </button>
//       </td>
//     </tr>
//   );
// }

// src/components/employees/EmployeeRow.tsx
// src/components/employees/EmployeeRow.tsx
"use client";

import { useRouter } from "next/navigation";
import { assets } from "@/constants/assets";
import Image from "next/image";

export default function EmployeeRow({ employee }: { employee: any }) {
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/employees/${employee.id}/edit`);
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this employee?")) {
      await fetch(`/api/employees/${employee.id}`, { method: "DELETE" });
      router.refresh(); // re‐fetch the list
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
