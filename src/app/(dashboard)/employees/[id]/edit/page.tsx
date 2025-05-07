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
