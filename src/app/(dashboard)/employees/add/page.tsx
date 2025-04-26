// "use client";
// import { useRouter } from "next/navigation";
// import { useAppDispatch } from "@/hooks/useStore";
// import EmployeeForm from "@/components/employees/EmployeeForm";
// import { createEmployee } from "@/store/slices/employeeSlice";

// export default function AddEmployeePage() {
//   const router = useRouter();
//   const dispatch = useAppDispatch();

//   async function handleCreate(data: any) {
//     await dispatch(createEmployee(data));
//     router.push("/employees");
//   }

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl mb-4">Add New Employee</h1>
//       <EmployeeForm />
//     </div>
//   );
// }

"use client";

import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/hooks/useStore";
import EmployeeForm from "@/components/employees/EmployeeForm";
import { createEmployee } from "@/store/slices/employeeSlice";

export default function AddEmployeePage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  async function handleCreate(data: any) {
    await dispatch(createEmployee(data));
    router.push("/employees");
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Add New Employee</h1>
      <EmployeeForm onSubmit={handleCreate} />
    </div>
  );
}
