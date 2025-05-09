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
  accountLinks: {
    email: string;
    slackId: string;
    skypeId: string;
    githubId: string;
  };
};

export default function EditEmployeePage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { id: rawId } = useParams();
  const id = Array.isArray(rawId) ? rawId[0] : rawId!;

  // pull the employee record out of Redux (could be partial until we fetch)
  const employee = useAppSelector((s) =>
    s.employees.employees.find((e) => e.id === id)
  );

  const [editable, setEditable] = useState<EditableEmployee | null>(null);

  // 1️⃣ Fetch once on mount
  useEffect(() => {
    dispatch(fetchEmployeeById(id));
  }, [dispatch, id]);

  // 2️⃣ When `employee` arrives, map it into our edit form shape
  useEffect(() => {
    if (!employee) return;

    // split name
    const [firstName = "", ...rest] = (employee.name || "").split(" ");
    const lastName = rest.join(" ");

    // pull nested blobs out of the returned object
    // NOTE: the API returns `.professional` and `.accounts`, not `.professionalInfo` or `.accountLinks`
    const pi = employee.personalInfo || {};
    const pr = (employee as any).professional || {};
    const acc = (employee as any).accounts || {};

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
      accountLinks: {
        email: acc.email || "",
        slackId: acc.slackId || "",
        skypeId: acc.skypeId || "",
        githubId: acc.githubId || "",
      },
    });
  }, [employee]);

  // 3️⃣ While we build our `editable` object, show a loader
  if (!editable) {
    return <p className="p-6">Loading employee…</p>;
  }

  // 4️⃣ When form submits, dispatch update then navigate back
  const handleUpdate = async (payload: any) => {
    await dispatch(updateEmployee({ id, data: payload }));
    router.push("/employees");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-6 font-bold">Edit Employee</h1>
      <EmployeeForm
        initialData={{
          // top‐level
          employeeId: editable.employeeId,
          department: editable.department,
          designation: editable.designation,
          type: editable.type,
          status: editable.status,
          avatar: editable.avatar,
          name: editable.name,

          // personal & professional
          personalInfo: editable.personalInfo,
          professional: {
            username: editable.professionalInfo.username,
            joiningDate: editable.professionalInfo.joiningDate,
            workingDays: editable.professionalInfo.workingDays,
            officeLocation: editable.professionalInfo.officeLocation,
          },

          // documents & accounts
          documents: editable.documents,
          accounts: editable.accountLinks,
        }}
        onSubmit={handleUpdate}
      />
    </div>
  );
}
