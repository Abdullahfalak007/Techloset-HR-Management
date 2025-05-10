import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import { fetchProjects, patchProjectStatus } from "@/store/slices/projectSlice";

export function useAdminProjects() {
  const dispatch = useAppDispatch();
  const projects = useAppSelector((s) => s.projects.items);
  const loading = useAppSelector((s) => s.projects.loading);
  const [modalOpen, setModalOpen] = useState(false);

  const searchParams = useSearchParams();
  const q = searchParams.get("search")?.toLowerCase() || "";
  const filtered = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.assignee.name.toLowerCase().includes(q)
  );

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const markComplete = async (id: string) => {
    await dispatch(patchProjectStatus({ id, status: "COMPLETED" }));
  };

  const open = () => setModalOpen(true);
  const close = () => setModalOpen(false);
  const refresh = () => dispatch(fetchProjects());

  return { filtered, loading, modalOpen, open, close, markComplete, refresh };
}
