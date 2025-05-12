// import { useEffect, useState } from "react";
// import { useSearchParams } from "next/navigation";
// import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
// import { fetchProjects, patchProjectStatus } from "@/store/slices/projectSlice";

// export function useAdminProjects() {
//   const dispatch = useAppDispatch();
//   const projects = useAppSelector((s) => s.projects.items);
//   const loading = useAppSelector((s) => s.projects.loading);
//   const [modalOpen, setModalOpen] = useState(false);

//   const searchParams = useSearchParams();
//   const q = searchParams.get("search")?.toLowerCase() || "";
//   const filtered = projects.filter(
//     (p) =>
//       p.title.toLowerCase().includes(q) ||
//       p.assignee.name.toLowerCase().includes(q)
//   );

//   useEffect(() => {
//     dispatch(fetchProjects());
//   }, [dispatch]);

//   const markComplete = async (id: string) => {
//     await dispatch(patchProjectStatus({ id, status: "COMPLETED" }));
//   };

//   const open = () => setModalOpen(true);
//   const close = () => setModalOpen(false);
//   const refresh = () => dispatch(fetchProjects());

//   return { filtered, loading, modalOpen, open, close, markComplete, refresh };
// }

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import { fetchProjects, patchProjectStatus } from "@/store/slices/projectSlice";

export function useAdminProjects() {
  const dispatch = useAppDispatch();
  const projects = useAppSelector((s) => s.projects.items);
  const loading = useAppSelector((s) => s.projects.loading);

  // — Filter —
  const searchParams = useSearchParams();
  const q = searchParams.get("search")?.toLowerCase() || "";
  const filtered = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.assignee.name.toLowerCase().includes(q)
  );

  // — Pagination —
  const pageSizeOptions = [6, 10, 15];
  const [perPage, setPerPage] = useState(pageSizeOptions[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));

  // clamp currentPage when filtered/perPage changes
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  const pageItems = filtered.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  // — Modal & Actions —
  const [modalOpen, setModalOpen] = useState(false);
  const open = () => setModalOpen(true);
  const close = () => setModalOpen(false);

  // mark complete
  const markComplete = async (id: string) => {
    await dispatch(patchProjectStatus({ id, status: "COMPLETED" }));
    dispatch(fetchProjects());
  };

  // initial fetch & refresh
  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);
  const refresh = () => dispatch(fetchProjects());

  return {
    loading,
    filtered, // full filtered list if you ever need it
    pageItems, // only the items for current page
    pageSizeOptions,
    perPage,
    setPerPage,
    currentPage,
    setCurrentPage,
    totalPages,
    modalOpen,
    open,
    close,
    markComplete,
    refresh,
  };
}
