// // src/components/employees/EmployeeHeader.tsx
// "use client";

// import { useRouter } from "next/navigation";

// export default function EmployeeHeader({ isAdmin }: { isAdmin: boolean }) {
//   const router = useRouter();

//   return (
//     <div className="flex items-center justify-between w-full">
//       <input
//         type="text"
//         placeholder="Search"
//         className="bg-transparent border border-gray-600 rounded-lg px-4 py-2 w-full max-w-md text-white placeholder:text-gray-400"
//       />

//       <div className="flex items-center space-x-4">
//         <button className="border border-gray-600 px-4 py-2 rounded-lg text-white hover:bg-gray-800">
//           Filter
//         </button>
//         {isAdmin && (
//           <button
//             className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg"
//             onClick={() => router.push("/employees/add")}
//           >
//             + Add New Employee
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";

import { assets } from "@/constants/assets";
import Image from "next/image";

type Props = {
  isAdmin: boolean;
};

export default function EmployeeHeader({ isAdmin }: Props) {
  return (
    <>
      <div>
        <h2 className="text-2xl font-semibold">All Employees</h2>
        <p className="text-gray-400 text-sm">All Employee Information</p>
      </div>

      <div className="flex items-center gap-4">
        {isAdmin && (
          <button className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
            <span className="text-white">Add New Employee</span>
            <Image src={assets.icons.plus} alt="Add" width={16} height={16} />
          </button>
        )}

        <button className="border border-gray-600 px-4 py-2 rounded-lg text-sm hover:bg-gray-700">
          <Image
            src={assets.icons.filter}
            alt="Filter"
            width={16}
            height={16}
          />
        </button>
      </div>
    </>
  );
}
