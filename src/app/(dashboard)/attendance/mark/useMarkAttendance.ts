import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import { fetchEmployees } from "@/store/slices/employeeSlice";
import { createAttendance } from "@/store/slices/attendanceSlice";

export type Employee = {
  id: string;
  name: string;
  avatar?: string;
  employeeId: string;
  department: string;
  designation: string;
  type: string;
  status: string;
};

export function useMarkAttendance() {
  const dispatch = useAppDispatch();
  const employees = useAppSelector((s) => s.employees.employees);
  const status = useAppSelector((s) => s.employees.status);
  const loading = status === "loading";

  const [selected, setSelected] = useState<Employee | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchEmployees());
    }
  }, [status, dispatch]);

  const open = (e: Employee) => {
    setSelected(e);
    setModalOpen(true);
  };
  const close = () => {
    setSelected(null);
    setModalOpen(false);
  };
  const onSubmit = async (payload: any) => {
    await dispatch(createAttendance(payload));
    close();
    router.refresh();
  };

  return { employees, loading, selected, modalOpen, open, close, onSubmit };
}
