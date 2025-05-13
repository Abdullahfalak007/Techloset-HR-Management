// src/app/(dashboard)/projects/page.tsx
"use client";

import { format } from "date-fns";
import { useAdminProjects } from "./useAdminProjects";
import SearchBar from "@/components/common/SearchBar";
import AddProjectModal from "@/components/projects/AddProjectModal";
import React from "react";
import Loader from "@/components/common/Loader";

const ITEMS_PER_PAGE_OPTIONS = [6, 10, 15];

export default function ProjectsPage() {
  const { filtered, loading, modalOpen, open, close, markComplete, refresh } =
    useAdminProjects();

  // ─── Pagination state ──────────────────────────────────────
  const [perPage, setPerPage] = React.useState(ITEMS_PER_PAGE_OPTIONS[0]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));

  // clamp currentPage if filtered/perPage changes
  React.useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  // slice out the items for this page
  const paginated = filtered.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  if (loading) return <Loader />;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <SearchBar placeholder="Search projects…" basePath="/projects" />
        <button
          onClick={open}
          className="ml-4 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--button-text)] px-4 py-2 rounded transition"
        >
          New Project
        </button>
      </div>

      {modalOpen && (
        <AddProjectModal
          onClose={() => {
            close();
            refresh();
          }}
          onSuccess={() => {
            close();
            refresh();
          }}
        />
      )}

      <div className="overflow-auto border border-[var(--border)] rounded-lg">
        <table className="min-w-full text-[var(--text-primary)] text-sm">
          <thead className="border-b border-[var(--border)]">
            <tr>
              {[
                "Title",
                "Assignee",
                "Start Date",
                "End Date",
                "Status",
                "Actions",
              ].map((h) => (
                <th key={h} className="px-4 py-3 text-left">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.map((p) => (
              <tr key={p.id} className="border-b border-[var(--border)]">
                <td className="px-4 py-3">{p.title}</td>
                <td className="px-4 py-3">{p.assignee.name}</td>
                <td className="px-4 py-3">
                  {format(new Date(p.startDate), "MMM d, yyyy")}
                </td>
                <td className="px-4 py-3">
                  {format(new Date(p.endDate), "MMM d, yyyy")}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      p.status === "COMPLETED"
                        ? "bg-[var(--success)]"
                        : "bg-[var(--warning)]"
                    } text-[var(--button-text)]`}
                  >
                    {p.status}
                  </span>
                </td>
                <td className="px-4 py-3 space-x-2">
                  {p.status !== "COMPLETED" && (
                    <button
                      onClick={() => markComplete(p.id)}
                      className="px-3 py-1 rounded bg-[var(--success)] text-[var(--button-text)] text-xs"
                    >
                      Mark Complete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ─── Pagination Controls ──────────────────────────────── */}
      <div className="flex justify-between items-center">
        <label className="text-sm">
          Show{" "}
          <select
            value={perPage}
            onChange={(e) => {
              setPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="border border-[var(--border)] rounded px-2 py-1 bg-[var(--surface)] hover:bg-[var(--surface-hover)]"
          >
            {ITEMS_PER_PAGE_OPTIONS.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>{" "}
          / page
        </label>

        <div className="space-x-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setCurrentPage(p)}
              className={`px-3 py-1 rounded ${
                p === currentPage
                  ? "bg-[var(--accent)] text-[var(--button-text)]"
                  : "hover:bg-[var(--surface-hover)]"
              } transition`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
