// // // src/app/(dashboard)/employees/[id]/edit/page.tsx
// // "use client";

// // import { useEffect, useState } from "react";
// // import { useRouter, useParams } from "next/navigation";
// // import { useAppDispatch } from "@/hooks/useStore";
// // import { updateEmployee } from "@/store/slices/employeeSlice";
// // import EmployeeForm from "@/components/employees/EmployeeForm";

// // // ─── 1) Define an “editable” employee shape that extends the Prisma embedded fields
// // type EditableEmployee = {
// //   id: string;
// //   name: string;
// //   employeeId: string;
// //   department: string;
// //   designation: string;
// //   type: string;
// //   status: string;
// //   avatar?: string;
// //   // now includes firstName & lastName alongside the real embedded keys
// //   personalInfo: {
// //     firstName: string;
// //     lastName: string;
// //     email: string;
// //     phone: string;
// //     dob: string;
// //     gender: string;
// //     nationality: string;
// //     maritalStatus: string;
// //     address: string;
// //     city: string;
// //     state: string;
// //     zipCode: string;
// //   };
// //   professional: {
// //     username: string;
// //     joiningDate: string;
// //     workingDays: string;
// //     officeLocation: string;
// //   };
// //   documents: Record<string, any>;
// //   accounts: Record<string, any>;
// // };

// // export default function EditEmployeePage() {
// //   const [employee, setEmployee] = useState<EditableEmployee | null>(null);
// //   const router = useRouter();
// //   const params = useParams();
// //   const dispatch = useAppDispatch();
// //   const id = params.id as string;

// //   // ─── 2) Fetch & extend with firstName/lastName on mount
// //   useEffect(() => {
// //     if (!id) return;

// //     fetch(`/api/employees/${id}`)
// //       .then(async (res) => {
// //         if (!res.ok) throw new Error(await res.text());
// //         return res.json();
// //       })
// //       .then((data: any) => {
// //         // split the full “name” into two pieces
// //         const [firstName, ...rest] = data.name.split(" ");
// //         const lastName = rest.join(" ");

// //         setEmployee({
// //           id: data.id,
// //           name: data.name,
// //           employeeId: data.employeeId,
// //           department: data.department,
// //           designation: data.designation,
// //           type: data.type,
// //           status: data.status,
// //           avatar: data.avatar,
// //           // merge in the extra fields
// //           personalInfo: {
// //             firstName,
// //             lastName,
// //             email: data.personalInfo.email,
// //             phone: data.personalInfo.phone,
// //             dob: data.personalInfo.dob,
// //             gender: data.personalInfo.gender,
// //             nationality: data.personalInfo.nationality,
// //             maritalStatus: data.personalInfo.maritalStatus,
// //             address: data.personalInfo.address,
// //             city: data.personalInfo.city,
// //             state: data.personalInfo.state,
// //             zipCode: data.personalInfo.zipCode,
// //           },
// //           professional: {
// //             username: data.professional.username,
// //             joiningDate: data.professional.joiningDate,
// //             workingDays: data.professional.workingDays,
// //             officeLocation: data.professional.officeLocation,
// //           },
// //           documents: data.documents,
// //           accounts: data.accounts,
// //         });
// //       })
// //       .catch((err) => {
// //         console.error("Failed to load employee:", err);
// //         router.push("/employees");
// //       });
// //   }, [id, router]);

// //   // ─── 3) Dispatch update then navigate away
// //   const handleUpdate = async (payload: any) => {
// //     if (!id) return;
// //     await dispatch(updateEmployee({ id, data: payload }));
// //     router.push("/employees");
// //   };

// //   if (!employee) {
// //     return <p className="p-6">Loading employee…</p>;
// //   }

// //   return (
// //     <div className="p-6">
// //       <h1 className="text-2xl mb-6 font-bold">Edit Employee</h1>
// //       <EmployeeForm
// //         initialData={{
// //           // top-level fields
// //           employeeId: employee.employeeId,
// //           department: employee.department,
// //           designation: employee.designation,
// //           type: employee.type,
// //           status: employee.status,
// //           avatar: employee.avatar,
// //           name: employee.name,

// //           // embedded: personalInfo + first/last
// //           personalInfo: employee.personalInfo,

// //           // embedded: professional
// //           professional: employee.professional,

// //           // pass through the rest
// //           documents: employee.documents,
// //           accounts: employee.accounts,
// //         }}
// //         onSubmit={handleUpdate}
// //       />
// //     </div>
// //   );
// // }

// // src/app/(dashboard)/employees/[id]/edit/page.tsx

// "use client";

// import { useEffect, useState } from "react";
// import { useRouter, useParams } from "next/navigation";
// import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
// import {
//   fetchEmployeeById,
//   updateEmployee,
// } from "@/store/slices/employeeSlice";
// import EmployeeForm from "@/components/employees/EmployeeForm";

// type EditableEmployee = {
//   id: string;
//   name: string;
//   employeeId: string;
//   department: string;
//   designation: string;
//   type: string;
//   status: string;
//   avatar?: string;
//   personalInfo: {
//     firstName: string;
//     lastName: string;
//     email: string;
//     phone: string;
//     dob: string;
//     gender: string;
//     nationality: string;
//     maritalStatus: string;
//     address: string;
//     city: string;
//     state: string;
//     zipCode: string;
//   };
//   professional: {
//     username: string;
//     joiningDate: string;
//     workingDays: string;
//     officeLocation: string;
//   };
//   documents: Record<string, any>;
//   accounts: Record<string, any>;
// };

// export default function EditEmployeePage() {
//   const dispatch = useAppDispatch();
//   const params = useParams();
//   const id = params.id as string;
//   const router = useRouter();

//   const employee = useAppSelector((s) =>
//     s.employees.employees.find((e) => e.id === id)
//   );
//   const status = useAppSelector((s) => s.employees.status);

//   const [local, setLocal] = useState<EditableEmployee | null>(null);

//   useEffect(() => {
//     if (status === "idle") {
//       dispatch(fetchEmployeeById(id));
//     }
//   }, [status]);

//   useEffect(() => {
//     if (!employee) return;
//     const [firstName, ...rest] = employee.name.split(" ");
//     const lastName = rest.join(" ");
//     setLocal({
//       id: employee.id,
//       name: employee.name,
//       employeeId: employee.employeeId,
//       department: employee.department,
//       designation: employee.designation,
//       type: employee.type,
//       status: employee.status,
//       avatar: employee.avatar,
//       personalInfo: {
//         firstName,
//         lastName,
//         email: employee.personalInfo.email,
//         phone: employee.personalInfo.phone,
//         dob: employee.personalInfo.dob,
//         gender: employee.personalInfo.gender,
//         nationality: employee.personalInfo.nationality,
//         maritalStatus: employee.personalInfo.maritalStatus,
//         address: employee.personalInfo.address,
//         city: employee.personalInfo.city,
//         state: employee.personalInfo.state,
//         zipCode: employee.personalInfo.zipCode,
//       },
//       professional: {
//         username: employee.professionalInfo.username,
//         joiningDate: employee.professionalInfo.joiningDate,
//         workingDays: employee.professionalInfo.workingDays,
//         officeLocation: employee.professionalInfo.officeLocation,
//       },
//       documents: employee.documents,
//       accounts: employee.accountLinks,
//     });
//   }, [employee]);

//   const handleUpdate = async (payload: any) => {
//     await dispatch(updateEmployee({ id, data: payload }));
//     router.push("/employees");
//   };

//   if (!local) return <p className="p-6">Loading employee…</p>;

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl mb-6 font-bold">Edit Employee</h1>
//       <EmployeeForm initialData={local} onSubmit={handleUpdate} />
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import {
  fetchEmployeeById,
  updateEmployee,
} from "@/store/slices/employeeSlice";
import EmployeeForm from "@/components/employees/EmployeeForm";

type EditableEmployee = {
  id: string;
  name: string;
  employeeId: string;
  department: string;
  designation: string;
  type: string;
  status: string;
  avatar?: string;
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dob: string;
    gender: string;
    nationality: string;
    maritalStatus: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
  professional: {
    username: string;
    joiningDate: string;
    workingDays: string;
    officeLocation: string;
  };
  documents: Record<string, any>;
  accounts: Record<string, any>;
};

export default function EditEmployeePage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const employee = useAppSelector((s) =>
    s.employees.employees.find((e) => e.id === id)
  );
  const status = useAppSelector((s) => s.employees.status);

  const [editable, setEditable] = useState<EditableEmployee | null>(null);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchEmployeeById(id));
    }
  }, [status]);

  useEffect(() => {
    if (!employee) return;
    const [firstName, ...rest] = employee.name.split(" ");
    const lastName = rest.join(" ");
    setEditable({
      id: employee.id,
      name: employee.name,
      employeeId: employee.employeeId,
      department: employee.department,
      designation: employee.designation,
      type: employee.type,
      status: employee.status,
      avatar: employee.avatar,
      personalInfo: {
        firstName,
        lastName,
        email: employee.personalInfo.email,
        phone: employee.personalInfo.phone,
        dob: employee.personalInfo.dob,
        gender: employee.personalInfo.gender,
        nationality: employee.personalInfo.nationality,
        maritalStatus: employee.personalInfo.maritalStatus,
        address: employee.personalInfo.address,
        city: employee.personalInfo.city,
        state: employee.personalInfo.state,
        zipCode: employee.personalInfo.zipCode,
      },
      professional: {
        username: employee.professionalInfo.username,
        joiningDate: employee.professionalInfo.joiningDate,
        workingDays: employee.professionalInfo.workingDays,
        officeLocation: employee.professionalInfo.officeLocation,
      },
      documents: employee.documents,
      accounts: employee.accountLinks,
    });
  }, [employee]);

  const handleUpdate = async (payload: any) => {
    await dispatch(updateEmployee({ id, data: payload }));
    router.push("/employees");
  };

  if (!editable) {
    return <p className="p-6">Loading employee…</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-6 font-bold">Edit Employee</h1>
      <EmployeeForm
        initialData={{
          employeeId: editable.employeeId,
          department: editable.department,
          designation: editable.designation,
          type: editable.type,
          status: editable.status,
          avatar: editable.avatar,
          name: editable.name,
          personalInfo: editable.personalInfo,
          professional: editable.professional,
          documents: editable.documents,
          accounts: editable.accounts,
        }}
        onSubmit={handleUpdate}
      />
    </div>
  );
}
