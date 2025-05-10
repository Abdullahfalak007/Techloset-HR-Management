import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import {
  fetchEmployeeById,
  updateEmployee,
} from "@/store/slices/employeeSlice";

export type EditableEmployee = {
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

export function useEditEmployee() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { id: rawId } = useParams();
  const id = Array.isArray(rawId) ? rawId[0] : rawId!;

  const employee = useAppSelector((s) =>
    s.employees.employees.find((e) => e.id === id)
  );
  const [editable, setEditable] = useState<EditableEmployee | null>(null);

  // fetch on mount
  useEffect(() => {
    dispatch(fetchEmployeeById(id));
  }, [dispatch, id]);

  // map into form shape when loaded
  useEffect(() => {
    if (!employee) return;
    const [firstName = "", ...rest] = (employee.name || "").split(" ");
    const lastName = rest.join(" ");
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

  const handleUpdate = async (payload: any) => {
    await dispatch(updateEmployee({ id, data: payload }));
    router.push("/employees");
  };

  return { editable, handleUpdate };
}
