import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import { fetchAttendanceRecords } from "@/store/slices/attendanceSlice";

export function useAttendanceOverview() {
  const dispatch = useAppDispatch();
  const records = useAppSelector((s) => s.attendance.records);
  const status = useAppSelector((s) => s.attendance.status);
  const loading = status === "loading";

  const searchParams = useSearchParams();
  const q = searchParams.get("search")?.toLowerCase() || "";

  const filtered = records.filter((r) =>
    [r.employee.name, r.employee.designation, r.employee.type].some((field) =>
      field.toLowerCase().includes(q)
    )
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAttendanceRecords());
    }
  }, [status, dispatch]);

  return { filtered, loading };
}
