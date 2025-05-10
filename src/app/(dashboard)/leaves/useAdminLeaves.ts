import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import { fetchLeaves, updateLeaveStatus } from "@/store/slices/leaveSlice";

export function useAdminLeaves() {
  const dispatch = useAppDispatch();
  const leaves = useAppSelector((s) => s.leaves.items);
  const loading = useAppSelector((s) => s.leaves.loading);

  const searchParams = useSearchParams();
  const q = searchParams.get("search")?.toLowerCase() || "";
  const filtered = leaves.filter((l) =>
    [(l as any).employee?.name || "", l.reason].some((field) =>
      field.toLowerCase().includes(q)
    )
  );

  useEffect(() => {
    dispatch(fetchLeaves());
  }, [dispatch]);

  const updateStatus = (id: string, status: "APPROVED" | "REJECTED") => {
    dispatch(updateLeaveStatus({ id, status }));
  };

  return { filtered, loading, updateStatus };
}
