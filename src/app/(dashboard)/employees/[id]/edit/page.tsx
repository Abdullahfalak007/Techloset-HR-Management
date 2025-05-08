// // "use client";

// // import { useEffect, useState } from "react";
// // import { useRouter, useParams } from "next/navigation";
// // import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
// // import {
// //   fetchEmployeeById,
// //   updateEmployee,
// // } from "@/store/slices/employeeSlice";
// // import EmployeeForm from "@/components/employees/EmployeeForm";

// // type EditableEmployee = {
// //   id: string;
// //   name: string;
// //   employeeId: string;
// //   department: string;
// //   designation: string;
// //   type: string;
// //   status: string;
// //   avatar?: string;
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
// //   const dispatch = useAppDispatch();
// //   const router = useRouter();
// //   const params = useParams();
// //   const id = params.id as string;

// //   const employee = useAppSelector((s) =>
// //     s.employees.employees.find((e) => e.id === id)
// //   );
// //   const status = useAppSelector((s) => s.employees.status);

// //   const [editable, setEditable] = useState<EditableEmployee | null>(null);

// //   useEffect(() => {
// //     if (status === "idle") {
// //       dispatch(fetchEmployeeById(id));
// //     }
// //   }, [status]);

// //   useEffect(() => {
// //     if (!employee) return;
// //     const [firstName, ...rest] = employee.name.split(" ");
// //     const lastName = rest.join(" ");
// //     setEditable({
// //       id: employee.id,
// //       name: employee.name,
// //       employeeId: employee.employeeId,
// //       department: employee.department,
// //       designation: employee.designation,
// //       type: employee.type,
// //       status: employee.status,
// //       avatar: employee.avatar,
// //       personalInfo: {
// //         firstName,
// //         lastName,
// //         email: employee.personalInfo.email,
// //         phone: employee.personalInfo.phone,
// //         dob: employee.personalInfo.dob,
// //         gender: employee.personalInfo.gender,
// //         nationality: employee.personalInfo.nationality,
// //         maritalStatus: employee.personalInfo.maritalStatus,
// //         address: employee.personalInfo.address,
// //         city: employee.personalInfo.city,
// //         state: employee.personalInfo.state,
// //         zipCode: employee.personalInfo.zipCode,
// //       },
// //       professional: {
// //         username: employee.professionalInfo.username,
// //         joiningDate: employee.professionalInfo.joiningDate,
// //         workingDays: employee.professionalInfo.workingDays,
// //         officeLocation: employee.professionalInfo.officeLocation,
// //       },
// //       documents: employee.documents,
// //       accounts: employee.accountLinks,
// //     });
// //   }, [employee]);

// //   const handleUpdate = async (payload: any) => {
// //     await dispatch(updateEmployee({ id, data: payload }));
// //     router.push("/employees");
// //   };

// //   if (!editable) {
// //     return <p className="p-6">Loading employee…</p>;
// //   }

// //   return (
// //     <div className="p-6">
// //       <h1 className="text-2xl mb-6 font-bold">Edit Employee</h1>
// //       <EmployeeForm
// //         initialData={{
// //           employeeId: editable.employeeId,
// //           department: editable.department,
// //           designation: editable.designation,
// //           type: editable.type,
// //           status: editable.status,
// //           avatar: editable.avatar,
// //           name: editable.name,
// //           personalInfo: editable.personalInfo,
// //           professional: editable.professional,
// //           documents: editable.documents,
// //           accounts: editable.accounts,
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
//   const router = useRouter();
//   const params = useParams();
//   const id = params.id as string;

//   const employee = useAppSelector((s) =>
//     s.employees.employees.find((e) => e.id === id)
//   );
//   const status = useAppSelector((s) => s.employees.status);

//   const [editable, setEditable] = useState<EditableEmployee | null>(null);

//   useEffect(() => {
//     if (status === "idle") {
//       dispatch(fetchEmployeeById(id));
//     }
//   }, [status]);

//   useEffect(() => {
//     if (!employee) return;
//     const [firstName, ...rest] = employee.name.split(" ");
//     const lastName = rest.join(" ");
//     setEditable({
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

//   if (!editable) {
//     return <p className="p-6">Loading employee…</p>;
//   }

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl mb-6 font-bold">Edit Employee</h1>
//       <EmployeeForm
//         initialData={{
//           employeeId: editable.employeeId,
//           department: editable.department,
//           designation: editable.designation,
//           type: editable.type,
//           status: editable.status,
//           avatar: editable.avatar,
//           name: editable.name,
//           personalInfo: editable.personalInfo,
//           professional: editable.professional,
//           documents: editable.documents,
//           accounts: editable.accounts,
//         }}
//         onSubmit={handleUpdate}
//       />
//     </div>
//   );
// }
// src/app/(dashboard)/employees/[id]/edit/page.tsx
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
  professionalInfo: {
    username: string;
    joiningDate: string;
    workingDays: string;
    officeLocation: string;
  };
  documents: Record<string, any>;
  accountLinks: Record<string, any>;
};

export default function EditEmployeePage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id!;

  // grab whatever is in the store (might be the minimal list‐load or the full detail)
  const employee = useAppSelector((s) =>
    s.employees.employees.find((e) => e.id === id)
  );

  // local edit state
  const [editable, setEditable] = useState<EditableEmployee | null>(null);

  // 1️⃣ kick off the fetch exactly once on mount
  useEffect(() => {
    dispatch(fetchEmployeeById(id));
  }, [dispatch, id]);

  // 2️⃣ whenever `employee` changes (i.e. after fetch finishes),
  //     map it into our `editable` shape, using defaults if any piece is missing.
  useEffect(() => {
    if (!employee) return;

    // split the name
    const [firstName = "", ...rest] = (employee.name || "").split(" ");
    const lastName = rest.join(" ");

    // pull nested objects, defaulting to {}
    const pi = employee.personalInfo || {};
    const pr = (employee.professionalInfo as any) || {};

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
        email: pi.email || "",
        phone: pi.phone || "",
        dob: pi.dob || "",
        gender: pi.gender || "",
        nationality: pi.nationality || "",
        maritalStatus: pi.maritalStatus || "",
        address: pi.address || "",
        city: pi.city || "",
        state: pi.state || "",
        zipCode: pi.zipCode || "",
      },
      professionalInfo: {
        username: pr.username || "",
        joiningDate: pr.joiningDate || "",
        workingDays: pr.workingDays || "",
        officeLocation: pr.officeLocation || "",
      },
      documents: employee.documents || {},
      accountLinks: employee.accountLinks || {},
    });
  }, [employee]);

  // handle form submission
  const handleUpdate = async (payload: any) => {
    await dispatch(updateEmployee({ id, data: payload }));
    router.push("/employees");
  };

  // 3️⃣ if we still haven’t built our editable copy, show loader
  if (!editable) {
    return <p className="p-6">Loading employee…</p>;
  }

  // 4️⃣ render the form
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
          professional: {
            username: editable.professionalInfo.username,
            joiningDate: editable.professionalInfo.joiningDate,
            workingDays: editable.professionalInfo.workingDays,
            officeLocation: editable.professionalInfo.officeLocation,
          },
          documents: editable.documents,
          accounts: editable.accountLinks,
        }}
        onSubmit={handleUpdate}
      />
    </div>
  );
}
